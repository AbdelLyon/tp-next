// _hooks/useInfiniteProducts.tsx
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/ProductService";
import { ProductModel } from "@/types/product";

export const useInfiniteProducts = (initialProducts: ProductModel[]) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam = 1 }) => {
      return productService.getProducts(pageParam, 8);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      if (
        typeof lastPage.skip !== "number" ||
        typeof lastPage.limit !== "number" ||
        typeof lastPage.total !== "number"
      ) {
        return undefined;
      }

      return lastPage.skip + lastPage.limit < lastPage.total
        ? nextPage
        : undefined;
    },
    initialData: {
      pages: [
        {
          products: initialProducts,
          total: initialProducts.length > 8 ? 100 : initialProducts.length,
          skip: 0,
          limit: 8,
        },
      ],
      pageParams: [1],
    },
    // Désactiver le refetch initial si les données initiales sont disponibles
    // staleTime: initialProducts.length > 0 ? 60000 : 0, // 1 minute
  });

  const products = query.data?.pages
    ? Object.values(
        query.data.pages.reduce((accumulator, page) => {
          return page.products.reduce((productMap, product) => {
            return {
              ...productMap,
              [product.id]: product,
            };
          }, accumulator);
        }, {} as Record<number, ProductModel>),
      )
    : initialProducts;

  return {
    products,
    hasNextPageProducts: !!query.hasNextPage,
    fetchNextPageProducts: query.fetchNextPage,
    isFetchingNextPageProducts: query.isFetchingNextPage,
  };
};
