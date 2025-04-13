import { getProductById } from "@/cache/cacheProduct";
import ProductInfo from "./_components/ProductInfo";
import { PageContainer } from "@/components/shared/PageContainer";
import { ServerQueryProvider } from "@/providers/ServerQueryProvider";

const ProductInfoPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  return (
    <PageContainer>
      <ServerQueryProvider
        prefetchFn={async (queryClient) => {
          await queryClient.prefetchQuery({
            queryKey: ["product", productId],
            queryFn: () => getProductById(productId),
          });
        }}
      >
        <ProductInfo productId={productId} />
      </ServerQueryProvider>
    </PageContainer>
  );
};

export default ProductInfoPage;
