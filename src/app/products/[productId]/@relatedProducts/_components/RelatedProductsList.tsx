// RelatedProductsList.tsx
import { ProductModel } from "@/types/product";
import { RelatedProductCard } from "./RelatedProductCard";

interface RelatedProductsListProps {
  products: ProductModel[];
}

export const RelatedProductsList = ({ products }: RelatedProductsListProps) => {
  return (
    <>
      {products.length > 0 ? (
        <div className="space-y-3" data-testid="related-products-list">
          {products.map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-10 rounded-md bg-gray-50/50 border border-dashed border-gray-200"
          data-testid="empty-products-message"
        >
          <p className="text-muted-foreground">No related products found</p>
        </div>
      )}
    </>
  );
};
