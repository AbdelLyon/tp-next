import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductInfoHeader } from "../_components/ProductInfoHeader";

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
  "data-testid"?: string;
}

interface IconProps {
  className?: string;
}

// Mock pour le module cn
vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined)[]) => args.filter(Boolean).join(" "),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, className, ...props }: BadgeProps) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
}));

vi.mock("lucide-react", () => ({
  Star: ({ className }: IconProps) => (
    <span data-testid="star-icon" className={className}>
      ★
    </span>
  ),
  Check: ({ className }: IconProps) => (
    <span data-testid="check-icon" className={className}>
      ✓
    </span>
  ),
}));

describe("ProductInfoHeader", () => {
  it("devrait afficher le titre du produit", () => {
    render(<ProductInfoHeader title="Produit Test" stockLevel={null} />);

    const titleElement = screen.getByTestId("product-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe("Produit Test");
  });

  it("devrait ne pas afficher la marque si elle n'est pas fournie", () => {
    render(<ProductInfoHeader title="Produit Test" stockLevel={null} />);

    expect(screen.queryByTestId("product-brand")).not.toBeInTheDocument();
  });

  it("devrait afficher la marque quand elle est fournie", () => {
    render(
      <ProductInfoHeader
        title="Produit Test"
        brand="Marque Test"
        stockLevel={null}
      />,
    );

    const brandElement = screen.getByTestId("product-brand");
    expect(brandElement).toBeInTheDocument();
    expect(brandElement.textContent).toBe("Marque Test");
  });

  it("devrait ne pas afficher la notation si elle n'est pas fournie", () => {
    render(<ProductInfoHeader title="Produit Test" stockLevel={null} />);

    expect(screen.queryByTestId("product-rating")).not.toBeInTheDocument();
  });

  it("devrait afficher la notation avec 5 étoiles quand elle est fournie", () => {
    render(
      <ProductInfoHeader title="Produit Test" rating={4.5} stockLevel={null} />,
    );

    const ratingElement = screen.getByTestId("product-rating");
    expect(ratingElement).toBeInTheDocument();
    expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
    expect(ratingElement.textContent).toContain("4.5");
  });

  it("devrait ne pas afficher le badge de stock si stockLevel est null", () => {
    render(<ProductInfoHeader title="Produit Test" stockLevel={null} />);

    expect(screen.queryByTestId("stock-badge")).not.toBeInTheDocument();
  });

  it('devrait afficher "In stock" avec une icône de vérification quand stockLevel est "high"', () => {
    render(<ProductInfoHeader title="Produit Test" stockLevel="high" />);

    const stockBadge = screen.getByTestId("stock-badge");
    expect(stockBadge).toBeInTheDocument();
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
    expect(stockBadge.textContent).toContain("In stock");
  });

  it('devrait afficher "In Stock (X)" quand stockLevel est "medium"', () => {
    render(
      <ProductInfoHeader title="Produit Test" stockLevel="medium" stock={42} />,
    );

    const stockBadge = screen.getByTestId("stock-badge");
    expect(stockBadge).toBeInTheDocument();
    expect(stockBadge.textContent).toBe("In Stock (42)");
  });

  it('devrait afficher "Low Stock (X)" quand stockLevel est "low"', () => {
    render(
      <ProductInfoHeader title="Produit Test" stockLevel="low" stock={5} />,
    );

    const stockBadge = screen.getByTestId("stock-badge");
    expect(stockBadge).toBeInTheDocument();
    expect(stockBadge.textContent).toBe("Low Stock (5)");
  });

  it('devrait afficher "Out of stock" quand stockLevel est "out"', () => {
    render(<ProductInfoHeader title="Produit Test" stockLevel="out" />);

    const stockBadge = screen.getByTestId("stock-badge");
    expect(stockBadge).toBeInTheDocument();
    expect(stockBadge.textContent).toBe("Out of stock");
  });

  it("devrait gérer correctement tous les props ensemble", () => {
    render(
      <ProductInfoHeader
        title="Produit Complet"
        brand="Marque Premium"
        rating={4.8}
        stockLevel="low"
        stock={3}
      />,
    );

    expect(screen.getByTestId("product-brand").textContent).toBe(
      "Marque Premium",
    );
    expect(screen.getByTestId("product-title").textContent).toBe(
      "Produit Complet",
    );
    expect(screen.getByTestId("product-rating")).toBeInTheDocument();
    expect(screen.getByTestId("product-rating").textContent).toContain("4.8");
    expect(screen.getByTestId("stock-badge").textContent).toBe("Low Stock (3)");
  });
});
