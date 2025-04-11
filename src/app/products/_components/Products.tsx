"use client";
import { useInfiniteProducts } from "../_hooks/useQueryProduct";
import { Product } from "./Product";
import { InfiniteScrollList } from "@/components/shared/InfiniteScrollList";

interface ProductsListProps {
  className?: string;
}

export const Products = ({ className }: ProductsListProps) => {
  const {
    products,
    fetchNextPageProducts,
    hasNextPageProducts,
    isFetchingNextPageProducts,
  } = useInfiniteProducts();

  return (
    <InfiniteScrollList
      items={products}
      onLoadMore={fetchNextPageProducts}
      hasMore={!!hasNextPageProducts}
      isLoading={isFetchingNextPageProducts}
      classNames={{
        list: className,
        container: "w-full",
      }}
      keyExtractor={(product) => product.id}
      renderItem={(product) => <Product product={product} />}
      containerProps={{
        style: { maxHeight: "calc(100vh - 200px)" },
      }}
    />
  );
};
