import { PageContainer } from "@/components/shared/PageContainer";
import { ProductsSkeleton } from "./_components/ProductSkeleton";
import { Products } from "./_components/Products";
import { productService } from "@/services/ProductService";
import { ServerQueryProvider } from "@/providers/ServerQueryProvider";
import { ProductsResponse } from "@/types/product";

export default function ProductsPage() {
  return (
    <PageContainer>
      <ServerQueryProvider<ProductsResponse>
        queryKey={["products"]}
        queryFn={({ pageParam = 1 }) =>
          productService.getProducts(pageParam, 8)
        }
        initialPageParam={1}
        isInfinite={true}
        fallback={<ProductsSkeleton />}
      >
        <Products className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
      </ServerQueryProvider>
    </PageContainer>
  );
}
