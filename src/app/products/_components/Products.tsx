"use client";

import { ProductModel } from "@/types/product";
import { Product } from "./Product";
import { useInfiniteProducts } from "../_hooks/useInfiniteProducts";
import { InfiniteScrollList } from "@/components/shared/InfiniteScrollList";
import { useSearchParams } from "next/navigation";
import { useInfiniteProductsByCategory } from "../_hooks/useInfiniteProductsByCategory";
import { Suspense } from "react";

interface ProductsListProps {
  initialProducts: ProductModel[];
  className?: string;
}

// Composant qui affiche tous les produits
function AllProducts({ initialProducts, className }: ProductsListProps) {
  const {
    products,
    fetchNextPageProducts,
    hasNextPageProducts,
    isFetchingNextPageProducts,
  } = useInfiniteProducts(initialProducts);

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
}

// Composant qui affiche les produits par catégorie
function CategoryProducts({
  initialProducts,
  category,
  className,
}: ProductsListProps & { category: string }) {
  const {
    productsByCategory,
    fetchNextPageProductsByCategory,
    hasNextPageProductsByCategory,
    isFetchingNextPageProductsByCategory,
  } = useInfiniteProductsByCategory(initialProducts, category);

  return (
    <InfiniteScrollList
      items={productsByCategory}
      onLoadMore={fetchNextPageProductsByCategory}
      hasMore={!!hasNextPageProductsByCategory}
      isLoading={isFetchingNextPageProductsByCategory}
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
}

// Composant principal avec deux Suspense séparés
export const Products = ({ initialProducts, className }: ProductsListProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  console.log("searchParams", category);

  if (category) {
    return (
      <Suspense
        fallback={
          <div className="w-full text-center py-4">
            Chargement des produits par catégorie...
          </div>
        }
      >
        <CategoryProducts
          initialProducts={initialProducts}
          category={category}
          className={className}
        />
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full text-center py-4">
          Chargement de tous les produits...
        </div>
      }
    >
      <AllProducts initialProducts={initialProducts} className={className} />
    </Suspense>
  );
};
