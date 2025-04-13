import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "x-react/button";
import { IconHeart } from "x-react/icons";

interface ProductInfoGalleryProps {
  thumbnail?: string;
  title: string;
  discountPercentage?: number;
}

export const ProductInfoGallery = ({
  thumbnail,
  title,
  discountPercentage,
}: ProductInfoGalleryProps) => {
  return (
    <div
      className="relative aspect-square rounded-xl overflow-hidden bg-background border border-border dark:bg-content1"
      data-testid="product-gallery"
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized={true}
        />
      )}

      {discountPercentage && (
        <Badge
          className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 border-0 px-3 py-1 text-sm font-medium shadow-sm"
          data-testid="discount-badge"
        >
          {discountPercentage.toFixed(0)}% OFF
        </Badge>
      )}

      <Button
        variant="light"
        className="absolute top-3 right-3 size-10 rounded-full opacity-90 hover:opacity-100 border border-border shadow-sm transition-all duration-300 hover:scale-110"
        data-testid="favorite-button"
        radius="full"
      >
        <IconHeart className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
};
