"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "x-react/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg border border-border">
      {/* Image container */}
      <div className="bg-skeleton rounded-t-lg w-full flex justify-center p-4">
        <Skeleton className="size-[170px] rounded-full " />
      </div>

      {/* Tags/Chips */}
      <div className="flex justify-between w-full px-4 mt-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        {/* Discount chip */}
        <Skeleton className="h-6 w-14 rounded-full" />
        {/* Rating chip */}
      </div>

      {/* Title */}
      <div className="px-4 mt-4">
        <Skeleton className="h-6 w-4/5" />
      </div>

      {/* Description */}
      <div className="px-4 mt-4 flex-grow">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 " />
      </div>

      {/* Price section */}
      <div className="mt-3 pt-3 px-4 flex justify-end border-t border-border pb-4">
        <Skeleton className="h-6 w-20" />
      </div>
    </Card>
  );
};

export const ProductsSkeleton = ({ columns = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(columns * 2)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
};
