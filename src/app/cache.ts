import { productService } from "@/services/ProductService";
import { unstable_cache } from "next/cache";

export const cachedGetProducts = unstable_cache(
   async (page: number, limit: number) => {

      console.log(`Fetching products for page ${page} at ${new Date().toISOString()}`);
      return productService.getProducts(page, limit);
   },
   ['products'],
   {
      tags: ['products'],
      revalidate: 10,
   }
);