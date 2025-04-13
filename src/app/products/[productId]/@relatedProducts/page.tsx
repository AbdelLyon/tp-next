import { PageContainer } from "@/components/shared/PageContainer";
import { getQueryClient } from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { RelatedProducts } from "./_components/RelatedProducts";
import { getProducts } from "@/cache/cacheProduct";

const ProductsPage = async () => {
  const queryClient = getQueryClient();

  const data = await getProducts({ page: 1 });

  return (
    <PageContainer>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RelatedProducts
          products={data.products}
          className="grid grid-cols-1"
        />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default ProductsPage;
