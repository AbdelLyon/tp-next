import { Suspense } from "react";
import { productService } from "@/services/ProductService";
import { CategoriesSection } from "../_components/CategoriesSection";
import { CategoriesSectionSkeleton } from "../_components/CategoriesSectionSkeleton";

async function CategoriesContent({ category }: { category?: string }) {
  const categories = await productService.getCategories();
  return (
    <CategoriesSection categories={categories} category={category ?? ""} />
  );
}

const Categories = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const { category } = await searchParams;
  return (
    <Suspense fallback={<CategoriesSectionSkeleton length={10} />}>
      <CategoriesContent category={category} />
    </Suspense>
  );
};

export default Categories;
