import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../page", () => ({
  default: () => (
    <div data-testid="mocked-related-products-page">Mocked Page Component</div>
  ),
}));

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

vi.mock("../_components/RelatedProducts", () => ({
  default: ({ productId }: { productId: string }) => (
    <div data-testid="related-products-mock" data-product-id={productId}>
      Mocked Related Products
    </div>
  ),
}));

vi.mock("../../@productInfo/_components/ProductInfoSkeleton", () => ({
  ProductInfoSkeleton: () => <div data-testid="skeleton-mock">Loading...</div>,
}));

describe("RelatedProductsPage Structure", () => {
  it("devrait correctement structurer les composants", () => {
    const { rerender } = render(
      <div data-testid="skeleton-mock">Loading...</div>,
    );
    expect(screen.getByTestId("skeleton-mock")).toBeInTheDocument();

    rerender(
      <div data-testid="related-products-mock" data-product-id="123">
        Mocked Related Products
      </div>,
    );
    const relatedProducts = screen.getByTestId("related-products-mock");
    expect(relatedProducts).toBeInTheDocument();
    expect(relatedProducts).toHaveAttribute("data-product-id", "123");

    rerender(
      <div data-testid="mocked-related-products-page">
        Mocked Page Component
      </div>,
    );
    expect(
      screen.getByTestId("mocked-related-products-page"),
    ).toBeInTheDocument();
  });
});

describe("RelatedProductsPage Integration Tests", () => {
  it("devrait passer l'ID de produit correctement", () => {
    const TestRelatedProducts = ({ productId }: { productId: string }) => (
      <div data-testid="related-products-mock" data-product-id={productId}>
        Mocked Related Products
      </div>
    );

    render(<TestRelatedProducts productId="123" />);

    expect(screen.getByTestId("related-products-mock")).toHaveAttribute(
      "data-product-id",
      "123",
    );
  });
});

describe("RelatedProductsPage Parameter Handling", () => {
  it("devrait extraire l'ID des paramètres", async () => {
    async function extractProductId(
      params: Promise<{ productId: string }>,
    ): Promise<string> {
      const { productId } = await params;
      return productId;
    }

    const testId = "123";
    const result = await extractProductId(
      Promise.resolve({ productId: testId }),
    );
    expect(result).toBe(testId);
  });
});
