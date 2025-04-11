import { PageContainer } from "@/components/shared/PageContainer";
import { ProductsSkeleton } from "./_components/ProductSkeleton";
import { Products } from "./_components/Products";
import { ServerQueryProvider } from "@/providers/ServerQueryProvider";
import { ProductsResponse } from "@/types/product";
import { getProducts } from "../cache/cacheProduct";
import { Suspense } from "react";

const InitialProducts = async () => {
  return (
    <ServerQueryProvider<ProductsResponse>
      queryKey={["products"]}
      queryFn={({ pageParam = 1 }) => getProducts({ page: pageParam })}
      initialPageParam={1}
      isInfinite={true}
      fallback={<ProductsSkeleton />}
    >
      <Products className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
    </ServerQueryProvider>
  );
};

export default async function ProductsPage() {
  return (
    <PageContainer>
      <Suspense fallback={<ProductsSkeleton />}>
        <InitialProducts />
      </Suspense>
    </PageContainer>
  );
}
