import { productQueryService } from "@/services/api";
import { productService } from "@/services/ProductService";
import { unstable_cache } from "next/cache";

export const getProducts = unstable_cache(
   async ({ page, limit }: { page: number, limit?: number; }) => {
      return productQueryService.searchPaginate({ page, limit });
   },
   ['products'],
   {
      tags: ['products'],
      revalidate: 120,
   }
);

export const getProductById = unstable_cache(
   async (id: string) => {
      return productService.getProductById(id);
   },
   ['product'],
   {
      tags: ['product'],
      revalidate: 120,

   }
);