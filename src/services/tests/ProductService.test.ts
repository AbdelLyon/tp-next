import { describe, it, expect, vi, beforeEach } from 'vitest';
import { productService } from '../ProductService';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ProductService', () => {
   // Réinitialiser les mocks avant chaque test
   beforeEach(() => {
      mockFetch.mockReset();
   });

   describe('getProducts', () => {
      it('should return products when API call is successful', async () => {
         // Mock de données de réponse valides conformes au schéma
         const mockResponse = {
            products: [
               {
                  id: 1,
                  title: 'iPhone 12',
                  description: 'Latest iPhone with A14 Bionic',
                  price: 999,
                  rating: 4.5,
                  brand: 'Apple',
                  category: 'smartphones',
                  thumbnail: 'image.jpg',
                  images: ['img1.jpg', 'img2.jpg'],
                  stock: 50,
                  discountPercentage: 10,
                  tags: ['premium', 'smartphone']
               }
            ],
            total: 1,
            skip: 0,
            limit: 10
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         const result = await productService.getProducts();

         // Vérifications
         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products');
         expect(result).toEqual(mockResponse);
         expect(result.products[0].title).toBe('iPhone 12');
         expect(result.products[0].price).toBe(999);
      });

      it('should throw error when API call fails', async () => {
         // Mock pour simuler un échec d'API
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
         });

         // Vérification que la méthode lance bien une erreur
         await expect(productService.getProducts()).rejects.toThrow(
            'Failed to fetch products: API request failed with status 500: Internal Server Error'
         );
      });

      it('should throw error when data validation fails', async () => {
         // Mock de données de réponse invalides
         const invalidResponse = {
            products: [
               {
                  // Manque id et d'autres champs obligatoires
                  title: 'iPhone 12',
                  price: 'not a number' // Invalide, devrait être un nombre
               }
            ]
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidResponse
         });

         // Pas besoin de mocker parse ici, on veut tester la validation réelle
         await expect(productService.getProducts()).rejects.toThrow('Failed to fetch products:');
      });

      it('should throw error when fetch fails with network error', async () => {
         mockFetch.mockRejectedValueOnce(new Error('Network error'));

         await expect(productService.getProducts()).rejects.toThrow('Failed to fetch products: Network error');
      });
   });

   describe('getProductById', () => {
      it('should return a product when API call is successful', async () => {
         const mockProduct = {
            id: 1,
            title: 'iPhone 12',
            description: 'Latest iPhone with A14 Bionic',
            price: 999,
            rating: 4.5,
            brand: 'Apple',
            category: 'smartphones',
            thumbnail: 'image.jpg',
            stock: 50
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
         });

         const result = await productService.getProductById(1);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/1');
         expect(result).toEqual(mockProduct);
         expect(result.id).toBe(1);
         expect(result.title).toBe('iPhone 12');
      });

      it('should handle string IDs correctly', async () => {
         const mockProduct = {
            id: 1,
            title: 'iPhone 12',
            description: 'Description',
            price: 999,
            rating: 4.5
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
         });

         await productService.getProductById('1');

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/1');
      });

      it('should throw error when API call fails', async () => {
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found'
         });

         await expect(productService.getProductById(999)).rejects.toThrow(
            'Failed to fetch product with ID 999: API request failed with status 404: Not Found'
         );
      });

      it('should throw error when product data is invalid', async () => {
         const invalidProduct = {
            // Manque des champs obligatoires
            id: 1,
            title: 'iPhone 12'
            // Manque description, price, rating
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidProduct
         });

         await expect(productService.getProductById(1)).rejects.toThrow('Failed to fetch product with ID 1:');
      });
   });

   describe('getProductsByCategory', () => {
      it('should return products when API call is successful', async () => {
         const mockResponse = {
            products: [
               {
                  id: 1,
                  title: 'iPhone 12',
                  description: 'Latest iPhone',
                  price: 999,
                  rating: 4.5,
                  category: 'smartphones'
               }
            ],
            total: 1,
            skip: 0,
            limit: 10
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         const result = await productService.getProductsByCategory('smartphones');

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/smartphones');
         expect(result).toEqual(mockResponse);
         expect(result.products[0].category).toBe('smartphones');
      });

      it('should URL encode category names with special characters', async () => {
         const categoryWithSpaces = 'home decoration';
         const mockResponse = {
            products: [
               {
                  id: 1,
                  title: 'Sofa',
                  description: 'Comfortable sofa',
                  price: 499,
                  rating: 4.2,
                  category: 'home decoration'
               }
            ],
            total: 1,
            skip: 0,
            limit: 10
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         await productService.getProductsByCategory(categoryWithSpaces);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/home%20decoration');
      });

      it('should throw error when API call fails', async () => {
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
         });

         await expect(productService.getProductsByCategory('smartphones')).rejects.toThrow(
            'Failed to fetch products in category "smartphones": API request failed with status 500: Internal Server Error'
         );
      });

      it('should throw error when products response is invalid', async () => {
         const invalidResponse = {
            products: [
               {
                  id: 1,
                  // Manque title, description et d'autres champs obligatoires
                  price: 999
               }
            ]
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidResponse
         });

         await expect(productService.getProductsByCategory('smartphones')).rejects.toThrow(
            'Failed to fetch products in category "smartphones":'
         );
      });
   });
});