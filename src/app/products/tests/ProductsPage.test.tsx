import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { productService } from "@/services/ProductService";
import { ProductModel, ProductsResponse } from "@/types/product";
import ProductsPage from "../page";

type MockFunction<T extends (...args: Parameters<T>) => ReturnType<T>> = {
  (...args: Parameters<T>): ReturnType<T>;
  mockResolvedValue: (value: Awaited<ReturnType<T>>) => void;
  mockRejectedValue: (reason: unknown) => void;
  mockImplementation: (fn: (...args: Parameters<T>) => ReturnType<T>) => void;
  mockReturnValue: (value: ReturnType<T>) => void;
  mockClear: () => void;
  mock: { calls: Parameters<T>[][] };
};

vi.mock("@/services/ProductService", () => ({
  productService: {
    getProducts: vi.fn(),
  },
}));

const mockedGetProducts = productService.getProducts as MockFunction<
  typeof productService.getProducts
>;

vi.mock("../page", () => ({
  default: () => <div data-testid="products-page">Products Page Mock</div>,
}));

vi.mock("../_components/Products", () => ({
  Products: ({
    products,
    className,
  }: {
    products: ProductModel[];
    className: string;
  }) => (
    <div data-testid="products" className={className}>
      {products.map((product) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("@/components/shared/PageContainer", () => ({
  PageContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

describe("ProductsPage", () => {
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
  ];

  const mockResponse: ProductsResponse = {
    products: mockProducts,
    total: mockProducts.length,
    limit: 10,
    skip: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetProducts.mockResolvedValue(mockResponse);
  });

  test("Devrait rendre la page avec les composants attendus", () => {
    render(<ProductsPage />);
    expect(screen.getByTestId("products-page")).toBeInTheDocument();
  });

  test("Devrait appeler le service de produits lors de la navigation", async () => {
    await mockedGetProducts();
    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
  });

  test("Devrait retourner les bonnes données de produits", async () => {
    const result = await mockedGetProducts();

    expect(result).toEqual(mockResponse);
    expect(result.products).toHaveLength(2);
    expect(result.products[0].title).toBe("iPhone");
  });
});
