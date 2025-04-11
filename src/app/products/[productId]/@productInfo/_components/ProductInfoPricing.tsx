import { Separator } from "@/components/ui/separator";

interface ProductInfoPricingProps {
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
}

export const ProductInfoPricing = ({
  price,
  originalPrice,
  discountPercentage,
}: ProductInfoPricingProps) => {
  return (
    <>
      <div
        className="mt-4 flex items-baseline gap-3"
        data-testid="product-pricing"
      >
        <span className="text-3xl font-bold" data-testid="current-price">
          ${price.toFixed(2)}
        </span>
        {originalPrice && originalPrice > 0 && (
          <span className="text-lg line-through" data-testid="original-price">
            ${originalPrice.toFixed(2)}
          </span>
        )}
        {discountPercentage && originalPrice && (
          <span
            className="text-sm text-green-600 font-semibold bg-content2 px-2 py-0.5 rounded"
            data-testid="savings"
          >
            Save ${(originalPrice - price).toFixed(2)}
          </span>
        )}
      </div>

      <Separator className="my-5 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </>
  );
};
