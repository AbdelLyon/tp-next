// CategoryList.tsx
import { Badge } from "@/components/ui/badge";

interface RelatedtCategoryListProps {
  title: string;
  categories: string[];
}

export const RelatedtCategoryList = ({
  title,
  categories,
}: RelatedtCategoryListProps) => {
  return (
    <div className="flex flex-col space-y-3" data-testid="category-list">
      <h3 className="text-sm font-medium" data-testid="category-list-title">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300 py-1.5"
            data-testid={`category-${category
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};
