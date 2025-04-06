import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductInfoTabs } from "../_components/ProductInfoTabs";

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

interface IconProps {
  className?: string;
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
};

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ defaultValue, className, children, ...props }: TabsProps) => (
    <div data-default-value={defaultValue} className={className} {...props}>
      {children}
    </div>
  ),
  TabsList: ({ className, children }: TabsListProps) => (
    <div data-testid="tabs-list" className={className}>
      {children}
    </div>
  ),
  TabsTrigger: ({ value, className, children }: TabsTriggerProps) => (
    <button
      data-testid={`tabs-trigger-${value}`}
      data-value={value}
      className={className}
    >
      {children}
    </button>
  ),
  TabsContent: ({ value, className, children }: TabsContentProps) => (
    <div
      data-testid={`tabs-content-${value}`}
      data-value={value}
      className={className}
    >
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ className, children }: ButtonProps) => (
    <button data-testid="button" className={className}>
      {children}
    </button>
  ),
}));

let starIconIndex = 0;
let zapIconIndex = 0;
let checkIconIndex = 0;

vi.mock("lucide-react", () => ({
  Star: ({ className }: IconProps) => {
    const index = starIconIndex++;
    return (
      <span data-testid={`star-icon-${index}`} className={className}>
        ★
      </span>
    );
  },
  Zap: ({ className }: IconProps) => {
    const index = zapIconIndex++;
    return (
      <span data-testid={`zap-icon-${index}`} className={className}>
        ⚡
      </span>
    );
  },
  Check: ({ className }: IconProps) => {
    const index = checkIconIndex++;
    return (
      <span data-testid={`check-icon-${index}`} className={className}>
        ✓
      </span>
    );
  },
}));

describe("ProductInfoTabs", () => {
  beforeEach(() => {
    starIconIndex = 0;
    zapIconIndex = 0;
    checkIconIndex = 0;
  });

  it('devrait rendre le composant Tabs avec la valeur par défaut "details"', () => {
    const { container } = render(<ProductInfoTabs product={mockProduct} />);

    const tabsElement = container.querySelector('[data-testid="product-tabs"]');
    expect(tabsElement).toBeInTheDocument();
  });

  it("devrait rendre les trois onglets avec le texte correct", () => {
    render(<ProductInfoTabs product={mockProduct} />);

    const detailsTrigger = screen.getByTestId("tabs-trigger-details");
    const specificationsTrigger = screen.getByTestId(
      "tabs-trigger-specifications",
    );
    const reviewsTrigger = screen.getByTestId("tabs-trigger-reviews");

    expect(detailsTrigger).toBeInTheDocument();
    expect(detailsTrigger.textContent).toBe("Details");

    expect(specificationsTrigger).toBeInTheDocument();
    expect(specificationsTrigger.textContent).toBe("Specifications");

    expect(reviewsTrigger).toBeInTheDocument();
    expect(reviewsTrigger.textContent).toBe("Reviews");
  });

  it("devrait rendre le contenu de l'onglet Details avec la description du produit", () => {
    render(<ProductInfoTabs product={mockProduct} />);

    const detailsContent = screen.getByTestId("tabs-content-details");
    expect(detailsContent).toBeInTheDocument();
    expect(detailsContent.textContent).toContain("Product Details");
    expect(detailsContent.textContent).toContain(
      "This is a test product description",
    );

    // Vérifier les icônes et les sections des fonctionnalités
    expect(screen.getByTestId("zap-icon-0")).toBeInTheDocument();
    expect(screen.getByTestId("check-icon-0")).toBeInTheDocument();
    expect(detailsContent.textContent).toContain("Premium Quality");
    expect(detailsContent.textContent).toContain("Customer Satisfaction");
  });

  it("devrait rendre le contenu de l'onglet Specifications avec les détails techniques", () => {
    render(<ProductInfoTabs product={mockProduct} />);

    const specificationsContent = screen.getByTestId(
      "tabs-content-specifications",
    );
    expect(specificationsContent).toBeInTheDocument();
    expect(specificationsContent.textContent).toContain(
      "Technical Specifications",
    );

    expect(specificationsContent.textContent).toContain("Brand");
    expect(specificationsContent.textContent).toContain("Test Brand");
    expect(specificationsContent.textContent).toContain("Category");
    expect(specificationsContent.textContent).toContain("Electronics");
    expect(specificationsContent.textContent).toContain("Stock");
    expect(specificationsContent.textContent).toContain("42 units");
    expect(specificationsContent.textContent).toContain("Rating");
    expect(specificationsContent.textContent).toContain("4.5");

    const starIcon = screen.getAllByTestId(/star-icon-\d+/)[0];
    expect(starIcon).toBeInTheDocument();
  });

  it('devrait rendre le contenu de l\'onglet Reviews avec le message "No Reviews Yet"', () => {
    render(<ProductInfoTabs product={mockProduct} />);

    const reviewsContent = screen.getByTestId("tabs-content-reviews");
    expect(reviewsContent).toBeInTheDocument();
    expect(reviewsContent.textContent).toContain("No Reviews Yet");
    expect(reviewsContent.textContent).toContain(
      "Be the first to share your experience",
    );

    const writeReviewButton = screen.getByTestId("button");
    expect(writeReviewButton).toBeInTheDocument();
    expect(writeReviewButton.textContent).toBe("Write a Review");

    const reviewStarIcon = screen
      .getAllByTestId(/star-icon-\d+/)
      .find((el) => el.closest('[data-testid="tabs-content-reviews"]'));
    expect(reviewStarIcon).toBeInTheDocument();
  });

  it("devrait gérer correctement un produit sans marque ni catégorie", () => {
    const productWithoutDetails = {
      ...mockProduct,
      brand: undefined,
      category: undefined,
    };

    render(<ProductInfoTabs product={productWithoutDetails} />);

    const specificationsContent = screen.getByTestId(
      "tabs-content-specifications",
    );
    expect(specificationsContent.textContent).toContain("N/A");
  });

  it("devrait gérer correctement un produit sans notation", () => {
    const productWithoutRating = {
      ...mockProduct,
      rating: 0,
    };

    render(<ProductInfoTabs product={productWithoutRating} />);

    const specificationsContent = screen.getByTestId(
      "tabs-content-specifications",
    );
    expect(specificationsContent.textContent).toContain("Rating");
    expect(specificationsContent.textContent).toContain("N/A");
  });
});
