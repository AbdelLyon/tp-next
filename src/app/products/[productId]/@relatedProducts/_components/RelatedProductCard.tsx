import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductModel } from "@/types/product";
import { Star } from "lucide-react";
import { mergeTailwindClasses } from "x-react/utils";

interface RelatedProductCardProps {
  product: ProductModel;
}

export const RelatedProductCard = ({ product }: RelatedProductCardProps) => {
  const originalPrice = product.discountPercentage
    ? product.price * (1 + product.discountPercentage / 100)
    : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block"
      data-testid={`related-product-${product.id}`}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border border-border bg-content1 hover:border-primary/20">
        <div className="flex items-center gap-4 p-3">
          <ProductThumbnail
            thumbnail={product.thumbnail}
            title={product.title}
            discountPercentage={product.discountPercentage}
          />

          <div className="flex-1 min-w-0">
            <h3
              className="font-medium text-sm line-clamp-1"
              data-testid="product-title"
            >
              {product.title}
            </h3>

            {product.brand && (
              <p
                className="text-xs text-muted-foreground line-clamp-1 mt-0.5"
                data-testid="product-brand"
              >
                {product.brand}
              </p>
            )}

            <ProductRating rating={product.rating} />

            <div className="flex items-center justify-between mt-2">
              <ProductPrice
                price={product.price}
                originalPrice={originalPrice}
              />

              <Badge
                variant="outline"
                className="text-xs bg-primary/5 text-primary border-border group-hover:bg-primary/10 transition-colors duration-300"
                data-testid="view-badge"
              >
                View
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const ProductThumbnail = ({
  thumbnail,
  title,
  discountPercentage,
}: {
  thumbnail?: string;
  title: string;
  discountPercentage?: number;
}) => (
  <div
    className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-content-2"
    data-testid="product-thumbnail"
  >
    {thumbnail ? (
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="80px"
        unoptimized={true}
      />
    ) : (
      <Skeleton className="h-full w-full" />
    )}
    {discountPercentage && (
      <div
        className="absolute top-0 right-0 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-bl-md"
        data-testid="discount-badge"
      >
        -{discountPercentage.toFixed(0)}%
      </div>
    )}
  </div>
);

const ProductRating = ({ rating }: { rating?: number }) => (
  <>
    {rating && (
      <div
        className="flex items-center gap-0.5 mt-1.5"
        data-testid="product-rating"
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={mergeTailwindClasses(
              "h-3 w-3",
              i < Math.floor(rating ?? 0)
                ? "text-amber-400 fill-amber-400"
                : i < rating
                ? "text-amber-400 fill-amber-400 opacity-50"
                : "",
            )}
            data-testid={`star-${i}`}
          />
        ))}
        <span className="text-xs ml-1">{rating.toFixed(1)}</span>
      </div>
    )}
  </>
);

const ProductPrice = ({
  price,
  originalPrice,
}: {
  price: number;
  originalPrice: number | null;
}) => (
  <div className="flex items-baseline gap-1.5" data-testid="product-price">
    <span className="font-medium text-sm" data-testid="current-price">
      ${price.toFixed(2)}
    </span>
    {originalPrice && (
      <span className="text-xs line-through" data-testid="original-price">
        ${originalPrice.toFixed(2)}
      </span>
    )}
  </div>
);
