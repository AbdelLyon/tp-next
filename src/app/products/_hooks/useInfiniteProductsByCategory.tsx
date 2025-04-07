// _hooks/useInfiniteProductsByCategory.tsx
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/ProductService";
import { ProductModel } from "@/types/product";

export const useInfiniteProductsByCategory = (
  initialProducts: ProductModel[],
  category: string,
) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ["products", "category", category],

    queryFn: ({ pageParam = 1 }) => {
      return productService.getProductsByCategory(category, pageParam, 8);
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
    staleTime: initialProducts.length > 0 ? 60000 : 0, // 1 minute
  });

  const productsByCategory = query.data?.pages
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
    productsByCategory,
    hasNextPageProductsByCategory: !!query.hasNextPage,
    fetchNextPageProductsByCategory: query.fetchNextPage,
    isFetchingNextPageProductsByCategory: query.isFetchingNextPage,
    isFetchingProductByCategory: query.isFetching,
  };
};
