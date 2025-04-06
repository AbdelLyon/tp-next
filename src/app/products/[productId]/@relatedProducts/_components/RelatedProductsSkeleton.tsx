import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const RelatedProductsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <Skeleton className="h-7 w-48 mb-4" />

      <div className="space-y-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex items-center gap-4 p-3">
                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <Skeleton className="h-full w-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-2" />
                  <div className="flex items-center justify-between mt-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>

      <Separator className="my-6" />

      <Skeleton className="h-5 w-36 mb-3" />
      <div className="flex flex-wrap gap-2">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 w-20 rounded-full" />
          ))}
      </div>
    </div>
  );
};
