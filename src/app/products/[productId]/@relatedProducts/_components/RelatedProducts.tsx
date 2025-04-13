"use client";

import { RelatedProductCard } from "./RelatedProductCard";
import { ProductModel } from "@/types/product";

export const RelatedProducts = ({
  className,
  products,
}: {
  className?: string;
  products: ProductModel[];
}) => {
  return (
    <div className={className}>
      {products.length > 0 ? (
        <div
          className="space-y-3 rounded-xl"
          data-testid="related-products-list"
        >
          {products.slice(0, 6).map((product) => (
            <RelatedProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-10 rounded-md border border-dashed border-border"
          data-testid="empty-products-message"
        >
          <p className="text-muted-foreground">No related products found</p>
        </div>
      )}
    </div>
  );
};
