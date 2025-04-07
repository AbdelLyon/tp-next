import { Suspense } from "react";
import { ProductInfoSkeleton } from "./_components/ProductInfoSkeleton";
import ProductInfo from "./_components/ProductInfo";

const ProductInfoPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  // "use cache";
  const { productId } = await params;
  return (
    <Suspense fallback={<ProductInfoSkeleton />}>
      <ProductInfo productId={productId} />
    </Suspense>
  );
};

export default ProductInfoPage;
