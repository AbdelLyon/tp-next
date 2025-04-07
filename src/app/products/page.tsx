import { Suspense } from "react";
import { productService } from "@/services/ProductService";
import { PageContainer } from "@/components/shared/PageContainer";
import { ProductsSkeleton } from "./_components/ProductSkeleton";
import { Products } from "./_components/Products";

async function ProductsContent() {
  // "use cache";
  const data = await productService.getProducts();

  return (
    <Products
      initialProducts={data.products}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    />
  );
}

export default function ProductsPage() {
  return (
    <PageContainer>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsContent />
      </Suspense>
    </PageContainer>
  );
}
