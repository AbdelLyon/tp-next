import { CategoriesResponse, CategoriesResponseSchema, CategoryModel, ProductModel, ProductSchema, ProductsResponse, ProductsResponseSchema } from "@/types/product";
import { BaseService } from "./BaseService";

class ProductService extends BaseService {
   constructor () {
      super("https://dummyjson.com");
   }


   async getProducts(page: number = 1, limit: number = 8): Promise<ProductsResponse> {
      try {

         const skip = (page - 1) * limit;
         const data = await this.get<ProductModel[]>(`/products?limit=${limit}&skip=${skip}`);
         return ProductsResponseSchema.parse(data);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch paginated products: ${error.message}`);
         }
         throw new Error("An unknown error occurred while fetching paginated products");
      }
   }

   async getProductById(id: number | string): Promise<ProductModel> {
      try {

         const data = await this.get<ProductModel>(`/products/${id}`);
         return ProductSchema.parse(data);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch product with ID ${id}: ${error.message}`);
         }
         throw new Error(`An unknown error occurred while fetching product with ID ${id}`);
      }
   }

   async getProductsByCategory(category: string, page: number = 1, limit: number = 8): Promise<ProductsResponse> {
      try {

         const skip = (page - 1) * limit;
         const data = await this.get<ProductModel[]>(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`);
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

         const data = await this.get<CategoryModel[]>("/products/categories");
         return CategoriesResponseSchema.parse(data);
      } catch (error) {
         if (error instanceof Error) {
            throw new Error(`Failed to fetch categories: ${error.message}`);
         }
         throw new Error("An unknown error occurred while fetching categories");
      }
   }
}

export const productService = new ProductService();