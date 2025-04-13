import { PageContainer } from "@/components/shared/PageContainer";
import { Products } from "./_components/Products";
import { ServerQueryProvider } from "@/providers/ServerQueryProvider";
import { getProducts } from "../../cache/cacheProduct";
import { authService } from "@/services/auth";

export default function ProductsPage() {
  return (
    <PageContainer>
      <button
        onClick={async () => {
          "use server";
          authService.logout();
        }}
      >
        ok
      </button>
      <ServerQueryProvider
        prefetchFn={async (queryClient) => {
          await queryClient.prefetchInfiniteQuery({
            queryKey: ["products"],
            queryFn: (context) => getProducts({ page: context.pageParam }),
            initialPageParam: 1,
          });
        }}
      >
        <Products className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" />
      </ServerQueryProvider>
    </PageContainer>
  );
}
