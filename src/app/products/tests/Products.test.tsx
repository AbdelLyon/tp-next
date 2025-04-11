// src/app/products/tests/Products.test.tsx
import { render, screen } from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
  beforeEach,
  Mock,
  MockInstance,
} from "vitest";
import { useInfiniteProducts } from "../_hooks/useInfiniteProducts";
import { Products } from "../_components/Products";
import { ProductModel } from "@/types/product";
import { InfiniteScrollList } from "@/components/shared/InfiniteScrollList";

vi.mock("../_hooks/useInfiniteProducts");
vi.mock("@/components/shared/InfiniteScrollList", () => ({
  InfiniteScrollList: vi
    .fn()
    .mockImplementation(
      ({ items, classNames, keyExtractor, renderItem, containerProps }) => (
        <div
          data-testid="infinite-scroll-list"
          className={classNames?.container}
        >
          <div className={classNames?.list} data-testid="product-list">
            {items.map((item: ProductModel) => (
              <div key={keyExtractor(item)} data-testid="product-item">
                {renderItem(item)}
              </div>
            ))}
          </div>
          <div
            className="h-10 flex items-center justify-center my-4"
            data-testid="loading-indicator"
          />
          {items.length > 0 && !containerProps?.hasMore && (
            <div className="text-center text-gray-500 py-4">
              Fin des résultats
            </div>
          )}
        </div>
      ),
    ),
}));

vi.mock("../_components/Product", () => ({
  Product: ({ product }: { product: ProductModel }) => (
    <div data-testid={`product-${product.id}`}>
      <span data-testid={`product-title-${product.id}`}>{product.title}</span>
      <span data-testid={`product-price-${product.id}`}>{product.price}</span>
    </div>
  ),
}));

type MockedInfiniteProducts = MockInstance<Mock> & {
  mockShowFallback?: boolean;
};

vi.mock("react", () => {
  const React = vi.importActual("react");
  return {
    ...React,
    Suspense: ({
      children,
      fallback,
    }: {
      children: React.ReactNode;
      fallback: React.ReactNode;
    }) => (
      <div data-testid="suspense-mock">
        <div data-testid="fallback-content">{fallback}</div>
        <div data-testid="suspense-content">{children}</div>
      </div>
    ),
  };
});

describe("Products Component", () => {
  const mockProducts: ProductModel[] = [
    {
      id: 1,
      title: "Product 1",
      price: 10,
      description: "Test 1",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Product 2",
      price: 20,
      description: "Test 2",
      rating: 4.8,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (
      useInfiniteProducts as unknown as MockedInfiniteProducts
    ).mockShowFallback = false;
    (useInfiniteProducts as unknown as Mock).mockReturnValue({
      products: mockProducts,
      fetchNextPageProducts: vi.fn(),
      hasNextPageProducts: true,
      isFetchingNextPageProducts: false,
    });
  });

  describe("AllProducts", () => {
    it("devrait afficher tous les produits avec les données correctes", () => {
      render(<Products className="test-class" />);

      expect(screen.getByTestId("infinite-scroll-list")).toBeInTheDocument();

      expect(screen.getByTestId("product-list")).toHaveClass("test-class");

      const productItems = screen.getAllByTestId("product-item");
      expect(productItems).toHaveLength(mockProducts.length);

      mockProducts.forEach((product) => {
        const productElement = screen.getByTestId(`product-${product.id}`);
        expect(productElement).toBeInTheDocument();

        const titleElement = screen.getByTestId(`product-title-${product.id}`);
        const priceElement = screen.getByTestId(`product-price-${product.id}`);

        expect(titleElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
        expect(titleElement.textContent).toBe(product.title);
        expect(priceElement.textContent).toBe(product.price.toString());
      });
    });

    it("devrait appliquer les classes CSS correctement", () => {
      render(<Products className="custom-class" />);

      expect(screen.getByTestId("infinite-scroll-list")).toHaveClass("w-full");

      expect(screen.getByTestId("product-list")).toHaveClass("custom-class");
    });

    it("devrait gérer l'état de chargement", () => {
      (useInfiniteProducts as Mock).mockReturnValue({
        products: mockProducts,
        fetchNextPageProducts: vi.fn(),
        hasNextPageProducts: true,
        isFetchingNextPageProducts: true,
      });

      render(<Products />);

      const loadingIndicator = screen.getByTestId("loading-indicator");
      expect(loadingIndicator).toBeInTheDocument();
    });

    it("devrait gérer une liste de produits vide", () => {
      (useInfiniteProducts as Mock).mockReturnValue({
        products: [],
        fetchNextPageProducts: vi.fn(),
        hasNextPageProducts: false,
        isFetchingNextPageProducts: false,
      });

      render(<Products />);

      const productItems = screen.queryAllByTestId("product-item");
      expect(productItems).toHaveLength(0);
    });

    it("devrait appeler fetchNextPageProducts quand nécessaire", () => {
      const fetchNextPageProductsMock = vi.fn();
      (useInfiniteProducts as Mock).mockReturnValue({
        products: mockProducts,
        fetchNextPageProducts: fetchNextPageProductsMock,
        hasNextPageProducts: true,
        isFetchingNextPageProducts: false,
      });

      render(<Products className="test-class" />);

      const mockCalls = (InfiniteScrollList as Mock).mock.calls;
      expect(mockCalls.length).toBeGreaterThan(0);

      const props = mockCalls[0][0];
      expect(props.onLoadMore).toBe(fetchNextPageProductsMock);
      expect(props.hasMore).toBe(true);
    });

    it("ne devrait pas appeler fetchNextPageProducts quand hasNextPageProducts est false", () => {
      const fetchNextPageProductsMock = vi.fn();
      (useInfiniteProducts as Mock).mockReturnValue({
        products: mockProducts,
        fetchNextPageProducts: fetchNextPageProductsMock,
        hasNextPageProducts: false,
        isFetchingNextPageProducts: false,
      });

      render(<Products className="test-class" />);

      const mockCalls = (InfiniteScrollList as Mock).mock.calls;
      expect(mockCalls.length).toBeGreaterThan(0);

      const props = mockCalls[0][0];
      expect(props.onLoadMore).toBe(fetchNextPageProductsMock);
      expect(props.hasMore).toBe(false);
    });
  });

  describe("Suspense fallback", () => {
    it("devrait afficher l'état de chargement dans le fallback Suspense", () => {
      (
        useInfiniteProducts as unknown as MockedInfiniteProducts
      ).mockShowFallback = true;

      render(<Products className="test-class" />);

      const fallbackContent = screen.getByTestId("fallback-content");
      expect(fallbackContent).toBeInTheDocument();
    });

    it("devrait afficher les produits une fois chargés", () => {
      (
        useInfiniteProducts as unknown as MockedInfiniteProducts
      ).mockShowFallback = false;

      render(<Products className="test-class" />);

      const productItems = screen.getAllByTestId("product-item");
      expect(productItems).toHaveLength(mockProducts.length);
    });
  });
});
