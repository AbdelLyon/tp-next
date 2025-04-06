import { CategoryModel } from "@/types/product";
import Link from "next/link";

interface CategoriesProps {
  categories: CategoryModel[];
  category: string | string[] | undefined;
}

export const CategoriesSection = ({
  categories,
  category,
}: CategoriesProps) => {
  console.log("CategoriesSection", category);
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="text-lg font-semibold mb-3">Filtrer par catégorie</h2>
      <ul className="space-y-1">
        <li>
          <Link
            href="/categories"
            className={`block py-2 px-3 rounded-md hover:bg-accent transition-colors ${
              !category ? "bg-primary/10 font-medium" : ""
            }`}
          >
            Toutes les catégories
          </Link>
        </li>
        {categories.map((cat, index) => (
          <li key={cat.id || index}>
            <Link
              href={`/categories?category=${encodeURIComponent(cat.name)}`}
              className={`block py-2 px-3 rounded-md hover:bg-accent transition-colors ${
                category === cat.name ? "bg-primary/10 font-medium" : ""
              }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSection;
