import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProductInfoSkeleton = () => {
  return (
    <div className="rounded-lg border border-default-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 dark:bg-content2">
          <Skeleton className="h-full w-full" />
          <div className="absolute top-3 left-3">
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="absolute top-3 right-3">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col">
          <Skeleton className="h-9 w-4/5 mb-2" />
          <Skeleton className="h-5 w-1/3 mb-4" />

          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-24 rounded-full ml-2" />
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="p-6">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <Skeleton className="h-6 w-40 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
