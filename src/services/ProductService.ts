import { CategoriesResponse, ProductModel, ProductSchema, ProductsResponse, ProductsResponseSchema } from "@/types/product";
import { BaseService } from "./BaseService";

class ProductService extends BaseService {
   constructor () {
      super("https://dummyjson.com");
   }

   private async delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   async getProducts(): Promise<ProductsResponse> {
      try {
         const data = await this.get<unknown>("/products");
         return ProductsResponseSchema.parse(data);

      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch products: ${error.message}`);
         }
         throw new Error("An unknown error occurred while fetching products");
      }
   }

   async getProductById(id: number | string): Promise<ProductModel> {
      try {
         const data = await this.get<unknown>(`/products/${id}`);
         return ProductSchema.parse(data);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch product with ID ${id}: ${error.message}`);
         }
         throw new Error(`An unknown error occurred while fetching product with ID ${id}`);
      }
   }

   async getProductsByCategory(category: string): Promise<ProductsResponse> {
      try {
         const data = await this.get<ProductsResponse>(`/products/category/${encodeURIComponent(category)}`);
         return ProductsResponseSchema.parse(data);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch products in category "${category}": ${error.message}`);
         }
         throw new Error(`An unknown error occurred while fetching products in category "${category}"`);
      }
   }

   async getCategories(): Promise<CategoriesResponse> {
      try {
         const data = await this.get<CategoriesResponse>("/products/categories");
         return data;
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch categories: ${error.message}`);
         }
         throw new Error("An unknown error occurred while fetching categories");
      }
   }
}

export const productService = new ProductService();