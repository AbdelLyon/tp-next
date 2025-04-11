import { describe, it, expect, vi, beforeEach } from 'vitest';
import { productService } from '../ProductService';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ProductService', () => {
   beforeEach(() => {
      mockFetch.mockReset();
      vi.clearAllMocks();
   });

   describe('getProducts', () => {
      it('devrait retourner des produits avec pagination lorsque l\'appel API réussit', async () => {
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
            total: 100,
            skip: 0,
            limit: 8
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         const result = await productService.getProducts(1, 8);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=8&skip=0');
         expect(result.products).toEqual(mockResponse.products);
         expect(result.total).toBe(100);
         expect(result.limit).toBe(8);
         expect(result.skip).toBe(0);
      });

      it('devrait calculer le skip correctement pour différentes pages', async () => {
         const mockResponse = {
            products: [],
            total: 100,
            skip: 16,
            limit: 8
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         await productService.getProducts(3, 8);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=8&skip=16');
      });

      it('devrait lancer une erreur lorsque l\'appel API échoue', async () => {
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
         });

         await expect(productService.getProducts()).rejects.toThrow(
            'Failed to fetch paginated products:'
         );
      });

      it('devrait lancer une erreur lorsque la validation des données échoue', async () => {
         const invalidResponse = {
            products: [
               {
                  title: 'iPhone 12',
                  price: 'not a number'
               }
            ]
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidResponse
         });

         await expect(productService.getProducts()).rejects.toThrow('Failed to fetch paginated products:');
      });

      it('devrait lancer une erreur lorsque fetch échoue avec une erreur réseau', async () => {
         mockFetch.mockRejectedValueOnce(new Error('Network error'));

         await expect(productService.getProducts()).rejects.toThrow('Failed to fetch paginated products: Network error');
      });
   });

   describe('getProductById', () => {
      it('devrait retourner un produit lorsque l\'appel API réussit', async () => {
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

      it('devrait gérer correctement les ID sous forme de chaînes', async () => {
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

      it('devrait lancer une erreur lorsque l\'appel API échoue', async () => {
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found'
         });

         await expect(productService.getProductById(999)).rejects.toThrow(
            'Failed to fetch product with ID 999:'
         );
      });

      it('devrait lancer une erreur lorsque les données du produit sont invalides', async () => {
         const invalidProduct = {
            id: 1,
            title: 'iPhone 12'
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidProduct
         });

         await expect(productService.getProductById(1)).rejects.toThrow('Failed to fetch product with ID 1:');
      });
   });

   describe('getProductsByCategory', () => {
      it('devrait retourner des produits par catégorie avec pagination lorsque l\'appel API réussit', async () => {
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
            total: 10,
            skip: 0,
            limit: 8
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         const result = await productService.getProductsByCategory('smartphones', 1, 8);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/smartphones?limit=8&skip=0');
         expect(result.products).toEqual(mockResponse.products);
         expect(result.total).toBe(10);
      });

      it('devrait calculer le skip correctement pour différentes pages', async () => {
         const mockResponse = {
            products: [],
            total: 20,
            skip: 8,
            limit: 8
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         await productService.getProductsByCategory('smartphones', 2, 8);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/smartphones?limit=8&skip=8');
      });

      it('devrait encoder les noms de catégories avec des caractères spéciaux', async () => {
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
            total: 10,
            skip: 0,
            limit: 8
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
         });

         await productService.getProductsByCategory(categoryWithSpaces, 1, 8);

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/home%20decoration?limit=8&skip=0');
      });

      it('devrait lancer une erreur lorsque l\'appel API échoue', async () => {
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
         });

         await expect(productService.getProductsByCategory('smartphones', 1, 8)).rejects.toThrow(
            'Failed to fetch products in category "smartphones":'
         );
      });

      it('devrait lancer une erreur lorsque la réponse des produits est invalide', async () => {
         const invalidResponse = {
            products: [
               {
                  id: 1,
                  price: 999
               }
            ]
         };

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidResponse
         });

         await expect(productService.getProductsByCategory('smartphones', 1, 8)).rejects.toThrow(
            'Failed to fetch products in category "smartphones":'
         );
      });
   });

   describe('getCategories', () => {
      it('devrait retourner les catégories lorsque l\'appel API réussit', async () => {
         const mockCategoriesResponse = [
            { slug: "smartphones", name: "Smartphones", url: "https://example.com/smartphones" },
            { slug: "laptops", name: "Laptops", url: "https://example.com/laptops" },
            { slug: "fragrances", name: "Fragrances", url: "https://example.com/fragrances" }
         ];

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCategoriesResponse
         });

         const result = await productService.getCategories();

         expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/categories');
         expect(result).toEqual(mockCategoriesResponse);
      });

      it('devrait lancer une erreur lorsque l\'appel API échoue', async () => {
         mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
         });

         await expect(productService.getCategories()).rejects.toThrow(
            'Failed to fetch categories:'
         );
      });

      it('devrait lancer une erreur lorsque la validation des données échoue', async () => {
         const invalidData = "not an object";

         mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => invalidData
         });

         await expect(productService.getCategories()).rejects.toThrow(
            'Failed to fetch categories:'
         );
      });
   });
});