import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const ProductInfoSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* ProductInfoGallery Skeleton */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-background border border-border dark:bg-content1">
          <Skeleton className="h-full w-full" />
          <div className="absolute top-3 left-3">
            <Skeleton className="h-6 w-16 rounded-md" /> {/* Discount badge */}
          </div>
          <div className="absolute top-3 right-3">
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Heart icon */}
          </div>
        </div>

        <div className="flex flex-col">
          {/* ProductInfoHeader Skeleton */}
          <div className="flex flex-col space-y-2 mb-4">
            <Skeleton className="h-5 w-32" /> {/* Brand */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                <Skeleton className="h-5 w-5" /> {/* Star 1 */}
                <Skeleton className="h-5 w-5" /> {/* Star 2 */}
                <Skeleton className="h-5 w-5" /> {/* Star 3 */}
                <Skeleton className="h-5 w-5" /> {/* Star 4 */}
                <Skeleton className="h-5 w-5" /> {/* Star 5 */}
              </div>
              <Skeleton className="h-5 w-10" /> {/* Rating number */}
              <Skeleton className="h-6 w-20 rounded-full ml-2" />{" "}
              {/* In stock badge */}
            </div>
          </div>

          {/* ProductInfoPricing Skeleton */}
          <div className="mt-4 flex items-baseline gap-3">
            <Skeleton className="h-10 w-28" /> {/* Current Price $19.99 */}
            <Skeleton className="h-6 w-20" /> {/* Original Price $21.09 */}
            <Skeleton className="h-6 w-28 rounded-md" /> {/* Save $1.10 */}
          </div>

          <Separator className="my-5" />

          {/* ProductInfoDetails Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-full" /> {/* Description line 2 */}
            <Skeleton className="h-4 w-3/4" /> {/* Description line 3 */}
            <div className="flex flex-wrap gap-2 mt-5">
              <Skeleton className="h-7 w-20 rounded-md" /> {/* Tag 1 */}
              <Skeleton className="h-7 w-24 rounded-md" /> {/* Tag 2 */}
            </div>
          </div>

          {/* ProductInfoActions Skeleton */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Skeleton className="h-12 w-full rounded-md" />{" "}
            {/* Add to Cart button */}
            <Skeleton className="h-12 w-full rounded-md" />{" "}
            {/* Buy Now button */}
          </div>

          {/* ProductInfoShipping Skeleton */}
          <div className="mt-8 space-y-3 p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-md" /> {/* Truck icon */}
              <Skeleton className="h-4 w-60" /> {/* Free shipping text */}
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-md" /> {/* Shield icon */}
              <Skeleton className="h-4 w-56" /> {/* 30-day guarantee text */}
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-md" /> {/* Package icon */}
              <Skeleton className="h-4 w-52" /> {/* Secure packaging text */}
            </div>
          </div>
        </div>
      </div>

      {/* ProductInfoTabs Skeleton */}
      <div className="pt-20 pb-10">
        <div className="flex border-b border-border">
          <Skeleton className="h-10 w-24 mx-2" /> {/* Details tab (active) */}
          <Skeleton className="h-10 w-32 mx-2" /> {/* Specifications tab */}
          <Skeleton className="h-10 w-24 mx-2" /> {/* Reviews tab */}
        </div>
        <div className="p-4 mt-4">
          <Skeleton className="h-6 w-40 mb-3" /> {/* Product Details header */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" /> {/* Content line 1 */}
            <Skeleton className="h-4 w-full" /> {/* Content line 2 */}
            <Skeleton className="h-4 w-3/4" /> {/* Content line 3 */}
          </div>
        </div>
      </div>
    </>
  );
};
