import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoHeaderProps {
  brand?: string;
  title: string;
  rating?: number;
  stockLevel: "high" | "medium" | "low" | "out" | null;
  stock?: number;
}

export const ProductInfoHeader = ({
  brand,
  title,
  rating,
  stockLevel,
  stock,
}: ProductInfoHeaderProps) => {
  return (
    <div className="flex flex-col space-y-2 mb-4" data-testid="product-header">
      {brand && (
        <span
          className="text-sm font-medium text-primary/80"
          data-testid="product-brand"
        >
          {brand}
        </span>
      )}

      <h1
        className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
        data-testid="product-title"
      >
        {title}
      </h1>

      <div className="flex items-center gap-2 mt-1">
        {rating && (
          <div className="flex items-center" data-testid="product-rating">
            {[...Array(5)].map((_, i) => {
              const difference = rating - i;
              return (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    difference >= 1
                      ? "text-amber-400 fill-amber-400"
                      : difference >= 0.5
                      ? "text-amber-400 fill-amber-400 opacity-60"
                      : "text-gray-200",
                  )}
                />
              );
            })}
            <span className="text-sm ml-1.5 text-gray-600 font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        )}

        {stockLevel && (
          <Badge
            variant={stockLevel === "out" ? "destructive" : "outline"}
            className={cn(
              "ml-2",
              stockLevel === "high" &&
                "bg-green-50 text-green-700 border-green-200",
              stockLevel === "medium" &&
                "bg-blue-50 text-blue-700 border-blue-200",
              stockLevel === "low" &&
                "bg-amber-50 text-amber-700 border-amber-200",
            )}
            data-testid="stock-badge"
          >
            {stockLevel === "high" ? (
              <>
                <Check className="inline-block h-3 w-3 mr-1" /> In stock
              </>
            ) : stockLevel === "medium" ? (
              `In Stock (${stock})`
            ) : stockLevel === "low" ? (
              `Low Stock (${stock})`
            ) : (
              "Out of stock"
            )}
          </Badge>
        )}
      </div>
    </div>
  );
};
