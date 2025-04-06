import Link from "next/link";
import { ReactNode } from "react";

interface RelatedProductsHeaderProps {
  title: string;
  actionLink?: string;
  actionText?: string;
  icon?: ReactNode;
}

export const RelatedProductsHeader = ({
  title,
  actionLink,
  actionText,
  icon,
}: RelatedProductsHeaderProps) => {
  return (
    <div
      className="flex items-center justify-between mb-5"
      data-testid="section-header"
    >
      <h2
        className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        data-testid="section-title"
      >
        {title}
      </h2>

      {actionLink && actionText && (
        <Link
          href={actionLink}
          className="text-sm text-primary/80 hover:text-primary flex items-center gap-1 transition-colors"
          data-testid="section-action-link"
        >
          {actionText} {icon}
        </Link>
      )}
    </div>
  );
};
