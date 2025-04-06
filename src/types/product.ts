import { z } from "zod";


export const ProductSchema = z.object({
   id: z.number(),
   title: z.string(),
   description: z.string(),
   category: z.string().optional(),
   price: z.number(),
   discountPercentage: z.number().optional(),
   rating: z.number(),
   stock: z.number().optional(),
   tags: z.array(z.string()).optional(),
   brand: z.string().optional(),
   thumbnail: z.string().optional(),
   images: z.array(z.string()).optional(),
});

export const ProductsResponseSchema = z.object({
   products: z.array(ProductSchema),
   total: z.number().optional(),
   skip: z.number().optional(),
   limit: z.number().optional(),
});

export type ProductModel = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;


// Version plus riche pour une future évolution
export const CategorySchema = z.object({
   id: z.string(),
   name: z.string(),
   description: z.string().optional(),
   image: z.string().optional(),
   parentCategory: z.string().optional(),
});

export type CategoryModel = z.infer<typeof CategorySchema>;
export const CategoriesResponseSchema = z.array(CategorySchema);
export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>;