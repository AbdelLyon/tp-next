import { Badge } from "@/components/ui/badge";

interface ProductInfoDetailsProps {
  description: string;
  tags?: string[];
}

export const ProductInfoDetails = ({
  description,
  tags,
}: ProductInfoDetailsProps) => {
  return (
    <>
      <p className="leading-relaxed" data-testid="product-description">
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5" data-testid="product-tags">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className=" bg-content1  hover:opacity-80 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};
