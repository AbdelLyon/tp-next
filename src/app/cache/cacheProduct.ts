import { productService } from "@/services/ProductService";
import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
   async ({ page, limit }: { page: number, limit?: number; }) => {

      console.log(`Fetching products for page ${page} at ${new Date().toISOString()}`);
      return productService.getProducts({ page, limit });
   },
   ['products'],
   {
      tags: ['products'],
      revalidate: 120,
   }
);

export const getProductById = unstable_cache(
   async (id: string) => {
      console.log(`Fetching product with ID ${id} at ${new Date().toISOString()}`);
      return productService.getProductById(id);
   },
   ['product'],
   {
      tags: ['product'],
      revalidate: 120,

   }
);