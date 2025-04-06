import { Suspense } from "react";
import { productService } from "@/services/ProductService";
import { Products } from "./_components/Products";
import { PageContainer } from "@/components/shared/PageContainer";
import { ProductsSkeleton } from "./_components/ProductSkeleton";

// Créez un composant de contenu séparé
async function ProductsContent() {
  const data = await productService.getProducts();
  return (
    <Products
      products={data.products}
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
