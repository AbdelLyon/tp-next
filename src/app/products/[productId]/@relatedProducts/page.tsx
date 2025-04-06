import { Suspense } from "react";
import RelatedProducts from "./_components/RelatedProducts";
import { ProductInfoSkeleton } from "../@productInfo/_components/ProductInfoSkeleton";

const RelatedProductsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  return (
    <Suspense fallback={<ProductInfoSkeleton />}>
      <RelatedProducts productId={productId} />
    </Suspense>
  );
};

export default RelatedProductsPage;
