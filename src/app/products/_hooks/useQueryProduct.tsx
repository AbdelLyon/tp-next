import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { productService } from "@/services/ProductService";
import { ProductModel } from "@/types/product";

export const useInfiniteProducts = () => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => {
      return productService.getProducts({ page: pageParam });
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
  });

  const products =
    query.data?.pages &&
    Object.values(
      query.data.pages.reduce((accumulator, page) => {
        return page.products.reduce((productMap, product) => {
          return {
            ...productMap,
            [product.id]: product,
          };
        }, accumulator);
      }, {} as Record<number, ProductModel>),
    );

  return {
    products,
    hasNextPageProducts: !!query.hasNextPage,
    fetchNextPageProducts: query.fetchNextPage,
    isFetchingNextPageProducts: query.isFetchingNextPage,
  };
};

export const useProduct = (productId: string | number) => {
  const query = useSuspenseQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId),
  });

  return {
    product: query.data,
    error: query.error,
  };
};
