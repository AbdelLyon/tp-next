import { Suspense } from "react";
import { RelatedProducts } from "./_components/RelatedProducts";
import { getProducts } from "@/app/cache/cacheProduct";
import { RelatedProductsSkeleton } from "./_components/RelatedProductsSkeleton";

const InitialProducts = async () => {
  const productsData = await getProducts({ page: 1 });
  return <RelatedProducts products={productsData.products} />;
};

const RelatedProductsPage = async () => {
  return (
    <Suspense fallback={<RelatedProductsSkeleton />}>
      <InitialProducts />
    </Suspense>
  );
};

export default RelatedProductsPage;
