import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

interface ProductModel {
  id: number;
  title: string;
  description: string;
  price: number;
  brand?: string;
  category?: string;
  stock?: number;
  rating?: number;
  thumbnail?: string;
  discountPercentage?: number;
}

vi.mock("@/services/ProductService", () => {
  return {
    productService: {
      getProducts: vi.fn().mockResolvedValue({
        products: [
          {
            id: 1,
            title: "Test Product 1",
            description: "Description 1",
            price: 99.99,
            brand: "Brand 1",
            category: "Electronics",
            rating: 4.5,
          },
          {
            id: 2,
            title: "Test Product 2",
            description: "Description 2",
            price: 149.99,
            brand: "Brand 2",
            category: "Smartphones",
            rating: 4.2,
          },
          {
            id: 3,
            title: "Test Product 3",
            description: "Description 3",
            price: 79.99,
            brand: "Brand 3",
            category: "Laptops",
            rating: 4.8,
          },
          {
            id: 4,
            title: "Test Product 4",
            description: "Description 4",
            price: 129.99,
            brand: "Brand 4",
            category: "Beauty",
            rating: 4.0,
          },
          {
            id: 5,
            title: "Current Product",
            description: "Current Description",
            price: 199.99,
            brand: "Current Brand",
            category: "Current Category",
            rating: 4.7,
          },
        ],
      }),
    },
  };
});

vi.mock("lucide-react", () => ({
  ChevronRight: ({ className }: { className?: string }) => (
    <span data-testid="chevron-right-icon" className={className}>
      →
    </span>
  ),
}));

vi.mock("@/components/ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr data-testid="separator" className={className} />
  ),
}));

vi.mock("../_components/RelatedProductsHeader", () => ({
  RelatedProductsHeader: ({
    title,
    actionLink,
    actionText,
    icon,
  }: {
    title: string;
    actionLink?: string;
    actionText?: string;
    icon?: React.ReactNode;
  }) => (
    <div data-testid="related-products-header">
      <h2>{title}</h2>
      {actionLink && actionText && (
        <a href={actionLink} data-testid="action-link">
          {actionText} {icon}
        </a>
      )}
    </div>
  ),
}));

vi.mock("../_components/RelatedProductsList", () => ({
  RelatedProductsList: ({ products }: { products: ProductModel[] }) => (
    <div data-testid="related-products-list">
      {products.length} products
      {products.map((product) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../_components/RelatedtCategoryList", () => ({
  RelatedtCategoryList: ({
    title,
    categories,
  }: {
    title: string;
    categories: string[];
  }) => (
    <div data-testid="related-category-list">
      <h3>{title}</h3>
      <ul>
        {categories.map((category) => (
          <li key={category} data-testid={`category-${category}`}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  ),
}));

// Importer le composant APRÈS tous les mocks
import RelatedProducts from "../_components/RelatedProducts";

describe("RelatedProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait rendre le composant RelatedProductsHeader avec les props corrects", async () => {
    render(await RelatedProducts({ productId: "5" }));

    const header = screen.getByTestId("related-products-header");
    expect(header).toBeInTheDocument();
    expect(header.textContent).toContain("You may also like");

    const actionLink = screen.getByTestId("action-link");
    expect(actionLink).toBeInTheDocument();
    expect(actionLink).toHaveAttribute("href", "/products");
    expect(actionLink.textContent).toContain("View all");
    expect(screen.getByTestId("chevron-right-icon")).toBeInTheDocument();
  });

  it("devrait filtrer le produit actuel et afficher uniquement les produits connexes", async () => {
    render(await RelatedProducts({ productId: "5" }));

    const productsList = screen.getByTestId("related-products-list");
    expect(productsList).toBeInTheDocument();
    expect(productsList.textContent).toContain("4 products");

    expect(screen.queryByTestId("product-5")).not.toBeInTheDocument();

    expect(screen.getByTestId("product-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-2")).toBeInTheDocument();
    expect(screen.getByTestId("product-3")).toBeInTheDocument();
    expect(screen.getByTestId("product-4")).toBeInTheDocument();
  });

  it("devrait rendre le séparateur avec la classe CSS appropriée", async () => {
    render(await RelatedProducts({ productId: "5" }));

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator.className).toContain("my-6");
    expect(separator.className).toContain("bg-gradient-to-r");
  });

  it("devrait rendre le composant RelatedtCategoryList avec les catégories correctes", async () => {
    render(await RelatedProducts({ productId: "5" }));

    const categoryList = screen.getByTestId("related-category-list");
    expect(categoryList).toBeInTheDocument();
    expect(categoryList.textContent).toContain("Popular Categories");

    expect(screen.getByTestId("category-Electronics")).toBeInTheDocument();
    expect(screen.getByTestId("category-Smartphones")).toBeInTheDocument();
    expect(screen.getByTestId("category-Laptops")).toBeInTheDocument();
    expect(screen.getByTestId("category-Beauty")).toBeInTheDocument();
  });

  it("devrait appeler le service de produits pour obtenir les données", async () => {
    const { productService } = await import("@/services/ProductService");

    render(await RelatedProducts({ productId: "5" }));

    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  });
});
