import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedProductsList } from "../_components/RelatedProductsList";

interface RelatedProductCardProps {
  product: ProductModel;
}

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

// Mock pour le composant RelatedProductCard
vi.mock("./RelatedProductCard", () => ({
  RelatedProductCard: ({ product }: RelatedProductCardProps) => (
    <div data-testid={`related-product-${product.id}`}>
      {product.title} - ${product.price.toFixed(2)}
    </div>
  ),
}));

const mockProducts = [
  {
    id: 1,
    title: "Test Product 1",
    description: "Description 1",
    price: 99.99,
    brand: "Brand 1",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Test Product 2",
    description: "Description 2",
    price: 149.99,
    brand: "Brand 2",
    rating: 4.2,
  },
  {
    id: 3,
    title: "Test Product 3",
    description: "Description 3",
    price: 79.99,
    brand: "Brand 3",
    rating: 4.8,
  },
];

describe("RelatedProductsList", () => {
  it("devrait afficher un message quand aucun produit n'est fourni", () => {
    render(<RelatedProductsList products={[]} />);

    const emptyMessage = screen.getByTestId("empty-products-message");
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage.textContent).toContain("No related products found");
  });

  it("devrait afficher la liste des produits quand des produits sont fournis", () => {
    render(<RelatedProductsList products={mockProducts} />);

    const productsList = screen.getByTestId("related-products-list");
    expect(productsList).toBeInTheDocument();
    expect(
      screen.queryByTestId("empty-products-message"),
    ).not.toBeInTheDocument();
  });

  it("devrait rendre un RelatedProductCard pour chaque produit", () => {
    render(<RelatedProductsList products={mockProducts} />);

    mockProducts.forEach((product: ProductModel) => {
      const productCard = screen.getByTestId(`related-product-${product.id}`);
      expect(productCard).toBeInTheDocument();
      expect(productCard.textContent).toContain(product.title);
      expect(productCard.textContent).toContain(`$${product.price.toFixed(2)}`);
    });

    const productCards = screen.getAllByTestId(/related-product-\d+/);
    expect(productCards.length).toBe(mockProducts.length);
  });

  it("devrait rendre la liste avec la classe CSS appropriée", () => {
    render(<RelatedProductsList products={mockProducts} />);

    const productsList = screen.getByTestId("related-products-list");
    expect(productsList.className).toContain("space-y-3");
  });
});
