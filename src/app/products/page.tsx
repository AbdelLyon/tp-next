import { PageContainer } from "@/components/shared/PageContainer";
import { Products } from "./_components/Products";
import { ServerQueryProvider } from "@/providers/ServerQueryProvider";
import { getProducts } from "../cache/cacheProduct";

export default function ProductsPage() {
  return (
    <PageContainer>
      <ServerQueryProvider
        prefetchFn={async (queryClient) => {
          await queryClient.prefetchInfiniteQuery({
            queryKey: ["products"],
            queryFn: (context) =>
              getProducts({ page: context.pageParam as number }),
            initialPageParam: 1,
          });
        }}
      >
        <Products className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
      </ServerQueryProvider>
    </PageContainer>
  );
}
