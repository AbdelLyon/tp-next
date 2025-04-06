import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedProductCard } from "../_components/RelatedProductCard";
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface BadgeProps {
  variant?: string;
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
}

interface SkeletonProps {
  className?: string;
}

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
}

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  unoptimized?: boolean;
}

interface IconProps {
  className?: string;
  "data-testid"?: string;
}

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description",
  price: 99.99,
  brand: "Test Brand",
  category: "Electronics",
  stock: 42,
  rating: 4.5,
  thumbnail: "/test-image.jpg",
  discountPercentage: 20,
};

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined)[]) => args.filter(Boolean).join(" "),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, className, sizes, unoptimized }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-sizes={sizes}
      data-unoptimized={unoptimized ? "true" : "false"}
      data-testid="product-image"
    />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ href, className, children, ...props }: LinkProps) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ className, children }: CardProps) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ variant, className, children, ...props }: BadgeProps) => (
    <span data-variant={variant} className={className} {...props}>
      {children}
    </span>
  ),
}));

vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: SkeletonProps) => (
    <div data-testid="skeleton" className={className}></div>
  ),
}));

vi.mock("lucide-react", () => ({
  Star: ({ className, "data-testid": dataTestId }: IconProps) => (
    <span data-testid={dataTestId} className={className}>
      ★
    </span>
  ),
}));

describe("RelatedProductCard", () => {
  it("devrait rendre un lien vers la page détaillée du produit", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const linkElement = screen.getByTestId(`related-product-${mockProduct.id}`);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/products/${mockProduct.id}`);
  });

  it("devrait afficher le titre du produit", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const titleElement = screen.getByTestId("product-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("Test Product");
  });

  it("devrait afficher la marque du produit quand elle est fournie", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const brandElement = screen.getByTestId("product-brand");
    expect(brandElement).toBeInTheDocument();
    expect(brandElement.textContent).toBe("Test Brand");
  });

  it("devrait ne pas afficher la marque quand elle n'est pas fournie", () => {
    const productWithoutBrand = { ...mockProduct, brand: undefined };
    render(<RelatedProductCard product={productWithoutBrand} />);

    expect(screen.queryByTestId("product-brand")).not.toBeInTheDocument();
  });

  it("devrait afficher l'image du produit quand elle est fournie", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const imageElement = screen.getByTestId("product-image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/test-image.jpg");
    expect(imageElement).toHaveAttribute("alt", "Test Product");
  });

  it("devrait afficher un skeleton quand aucune image n'est fournie", () => {
    const productWithoutImage = { ...mockProduct, thumbnail: undefined };
    render(<RelatedProductCard product={productWithoutImage} />);

    expect(screen.queryByTestId("product-image")).not.toBeInTheDocument();
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("devrait afficher le badge de remise quand un pourcentage de remise est fourni", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const discountBadge = screen.getByTestId("discount-badge");
    expect(discountBadge).toBeInTheDocument();
    expect(discountBadge.textContent).toBe("-20%");
  });

  it("devrait ne pas afficher le badge de remise quand aucun pourcentage de remise n'est fourni", () => {
    const productWithoutDiscount = {
      ...mockProduct,
      discountPercentage: undefined,
    };
    render(<RelatedProductCard product={productWithoutDiscount} />);

    expect(screen.queryByTestId("discount-badge")).not.toBeInTheDocument();
  });

  it("devrait afficher la notation avec les étoiles quand elle est fournie", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const ratingElement = screen.getByTestId("product-rating");
    expect(ratingElement).toBeInTheDocument();

    expect(screen.getByTestId("star-0")).toBeInTheDocument();
    expect(screen.getByTestId("star-1")).toBeInTheDocument();
    expect(screen.getByTestId("star-2")).toBeInTheDocument();
    expect(screen.getByTestId("star-3")).toBeInTheDocument();
    expect(screen.getByTestId("star-4")).toBeInTheDocument();

    expect(ratingElement.textContent).toContain("4.5");
  });

  it("devrait ne pas afficher la notation quand elle n'est pas fournie", () => {
    const productWithoutRating = { ...mockProduct, rating: 0 };
    render(<RelatedProductCard product={productWithoutRating} />);

    expect(screen.queryByTestId("product-rating")).not.toBeInTheDocument();
  });

  it("devrait afficher le prix actuel", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const priceElement = screen.getByTestId("current-price");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement.textContent).toBe("$99.99");
  });

  it("devrait afficher le prix original calculé quand un pourcentage de remise est fourni", () => {
    render(<RelatedProductCard product={mockProduct} />);

    const originalPriceElement = screen.getByTestId("original-price");
    expect(originalPriceElement).toBeInTheDocument();
    expect(originalPriceElement.textContent).toBe("$119.99");
  });

  it("devrait ne pas afficher le prix original quand aucun pourcentage de remise n'est fourni", () => {
    const productWithoutDiscount = {
      ...mockProduct,
      discountPercentage: undefined,
    };
    render(<RelatedProductCard product={productWithoutDiscount} />);

    expect(screen.queryByTestId("original-price")).not.toBeInTheDocument();
  });

  it('devrait afficher le badge "View"', () => {
    render(<RelatedProductCard product={mockProduct} />);

    const viewBadge = screen.getByTestId("view-badge");
    expect(viewBadge).toBeInTheDocument();
    expect(viewBadge.textContent).toBe("View");
  });
});
