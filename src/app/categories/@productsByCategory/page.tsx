import { Suspense } from "react";
import { productService } from "@/services/ProductService";
import ProductsSection from "../_components/ProductsSection";
import { ProductsSectionSkeleton } from "../_components/ProductsSectionSkeleton";

async function ProductsContent({ category }: { category?: string }) {
  const products = category
    ? (await productService.getProductsByCategory(category as string)).products
    : (await productService.getProducts()).products.slice(0, 8);

  return <ProductsSection products={products} category={category} />;
}

const ProductsByCategory = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;
  return (
    <Suspense fallback={<ProductsSectionSkeleton />}>
      <ProductsContent category={category} />
    </Suspense>
  );
};

export default ProductsByCategory;
