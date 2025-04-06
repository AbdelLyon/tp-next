import { Skeleton } from "@/components/ui/skeleton";

export const CategoriesSectionSkeleton = ({
  length = 5,
}: {
  length?: number;
}) => {
  return (
    <div className="rounded-lg border bg-card p-4 ">
      <Skeleton className="h-3 w-1/2 mb-4" />

      <Skeleton className="h-12 flex items-center rounded-lg p-2">
        <Skeleton className="h-2 w-4/6 ml-2 bg-primary/10 rounded-md" />
      </Skeleton>
      <div className="flex flex-col gap-4  mt-4">
        {[...Array(length)].map((_, index) => (
          <Skeleton
            key={index}
            className="h-12 flex items-center rounded-lg p-2"
          >
            <Skeleton className="h-2 w-4/6 ml-2 bg-primary/10 rounded-md" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
};
