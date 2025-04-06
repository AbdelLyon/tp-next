import { Skeleton } from "@/components/ui/skeleton";

export const ProductsSectionSkeleton = () => {
  return (
    <>
      <div className="mb-4">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full overflow-y-auto">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
