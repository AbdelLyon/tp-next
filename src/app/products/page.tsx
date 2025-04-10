import { PageContainer } from "@/components/shared/PageContainer";
import { ProductsSkeleton } from "./_components/ProductSkeleton";
import { Products } from "./_components/Products";
import { ServerQueryProvider } from "@/providers/ServerQueryProvider";
import { ProductsResponse } from "@/types/product";
import { cachedGetProducts } from "../cache";
import { Suspense } from "react";

export default async function ProductsPage() {
  return (
    <PageContainer>
      <ServerQueryProvider<ProductsResponse>
        queryKey={["products"]}
        queryFn={({ pageParam = 1 }) => cachedGetProducts(pageParam, 8)}
        initialPageParam={1}
        isInfinite={true}
        fallback={<ProductsSkeleton />}
      >
        <Suspense fallback={<ProductsSkeleton />}>
          <Products className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
        </Suspense>
      </ServerQueryProvider>
    </PageContainer>
  );
}
