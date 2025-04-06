import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ProductModel } from "../../../types/product";
import { Products } from "../_components/Products";

vi.mock("../_components/Product", () => ({
  Product: ({ product }: { product: ProductModel }) => (
    <div data-testid={`product-${product.id}`}>{product.title}</div>
  ),
}));

describe("<Products />", () => {
  const mockProducts: ProductModel[] = [
    {
      id: 1,
      title: "iPhone",
      price: 999,
      description: "Apple smartphone",
      rating: 4.5,
    },
    {
      id: 2,
      title: "MacBook",
      price: 1299,
      description: "Apple laptop",
      rating: 4.8,
    },
    {
      id: 3,
      title: "iPad",
      price: 799,
      description: "Apple tablet",
      rating: 4.6,
    },
  ];

  test("Devrait rendre une grille avec les classes CSS appropriées", () => {
    const { container } = render(<Products products={mockProducts} />);

    const grid = container.firstChild;
    expect(grid).toHaveClass(
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
    );
  });

  test("Devrait rendre un composant Product pour chaque produit", () => {
    render(<Products products={mockProducts} />);

    mockProducts.forEach((product) => {
      const productElement = screen.getByTestId(`product-${product.id}`);
      expect(productElement).toBeInTheDocument();
      expect(productElement).toHaveTextContent(product.title);
    });
  });

  test("Devrait gérer le cas d'une liste vide de produits", () => {
    const { container } = render(<Products products={[]} />);

    const grid = container.firstChild;
    expect(grid?.childNodes.length).toBe(0);
  });

  test("Devrait gérer une grande quantité de produits", () => {
    const manyProducts = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Product ${index + 1}`,
      price: 100 + index,
      description: `Description ${index + 1}`,
      rating: 4 + Math.random(),
    }));

    render(<Products products={manyProducts} />);

    manyProducts.forEach((product) => {
      const productElement = screen.getByTestId(`product-${product.id}`);
      expect(productElement).toBeInTheDocument();
      expect(productElement).toHaveTextContent(product.title);
    });
  });
});
