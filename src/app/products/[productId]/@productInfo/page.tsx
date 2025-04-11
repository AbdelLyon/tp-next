import { Suspense } from "react";
import { ProductInfoSkeleton } from "./_components/ProductInfoSkeleton";
import ProductInfo from "./_components/ProductInfo";
import { getProductById } from "@/app/cache/cacheProduct";
import { PageContainer } from "@/components/shared/PageContainer";

const InitialProductInfo = async ({ productId }: { productId: string }) => {
  const product = await getProductById(productId);
  return <ProductInfo product={product} />;
};

const ProductInfoPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  return (
    <PageContainer>
      <Suspense fallback={<ProductInfoSkeleton />}>
        <InitialProductInfo productId={productId} />
      </Suspense>
    </PageContainer>
  );
};

export default ProductInfoPage;
