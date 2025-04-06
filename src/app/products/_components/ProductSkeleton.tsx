import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-1 pt-3 px-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-8 rounded-full" />
        </div>
      </CardHeader>

      <div className="px-3 py-1">
        <div className="size-40 mx-auto relative overflow-hidden rounded">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <CardContent className="py-2 px-3">
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-4 w-16 mt-2" />
      </CardContent>
    </Card>
  );
};

export const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
};
