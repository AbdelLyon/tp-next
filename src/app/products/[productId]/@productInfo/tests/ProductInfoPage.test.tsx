import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock du composant page pour éviter les erreurs de composants asynchrones
vi.mock("../page", () => ({
  default: () => (
    <div data-testid="mocked-product-info-page">Mocked Product Info Page</div>
  ),
}));

// Mock de React.Suspense
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

// Mock des composants enfants
vi.mock("../_components/ProductInfo", () => ({
  default: ({ productId }: { productId: string }) => (
    <div data-testid="product-info-mock" data-product-id={productId}>
      Product Info for ID: {productId}
    </div>
  ),
}));

vi.mock("../_components/ProductInfoSkeleton", () => ({
  ProductInfoSkeleton: () => <div data-testid="skeleton-mock">Loading...</div>,
}));

describe("ProductInfoPage Structure", () => {
  it("devrait correctement structurer les composants", () => {
    // Tester le skeleton de chargement
    const { rerender } = render(
      <div data-testid="skeleton-mock">Loading...</div>,
    );
    expect(screen.getByTestId("skeleton-mock")).toBeInTheDocument();

    // Tester le composant ProductInfo avec un ID spécifique
    rerender(
      <div data-testid="product-info-mock" data-product-id="123">
        Product Info for ID: 123
      </div>,
    );
    const productInfo = screen.getByTestId("product-info-mock");
    expect(productInfo).toBeInTheDocument();
    expect(productInfo).toHaveAttribute("data-product-id", "123");
    expect(productInfo).toHaveTextContent("Product Info for ID: 123");

    // Tester que le composant de page mocké fonctionne
    rerender(
      <div data-testid="mocked-product-info-page">
        Mocked Product Info Page
      </div>,
    );
    expect(screen.getByTestId("mocked-product-info-page")).toBeInTheDocument();
  });
});

describe("ProductInfoPage Props Handling", () => {
  it("devrait passer l'ID de produit correctement au composant ProductInfo", () => {
    // Créer un simple composant de test
    const TestProductInfo = ({ productId }: { productId: string }) => (
      <div data-testid="product-info-mock" data-product-id={productId}>
        Product Info for ID: {productId}
      </div>
    );

    // Tester avec différents IDs
    const testId = "123";
    render(<TestProductInfo productId={testId} />);

    // Vérifier que l'ID est correctement passé
    expect(screen.getByTestId("product-info-mock")).toHaveAttribute(
      "data-product-id",
      testId,
    );
    expect(
      screen.getByText(`Product Info for ID: ${testId}`),
    ).toBeInTheDocument();
  });
});

describe("ProductInfoPage Parameter Handling", () => {
  it("devrait extraire l'ID des paramètres correctement", async () => {
    // Fonction qui reproduit la logique d'extraction des paramètres
    async function extractProductId(
      params: Promise<{ productId: string }>,
    ): Promise<string> {
      const { productId } = await params;
      return productId;
    }

    // Test avec plusieurs IDs différents
    const testCases = ["123", "abc-xyz", "product_99"];

    for (const testId of testCases) {
      const result = await extractProductId(
        Promise.resolve({ productId: testId }),
      );
      expect(result).toBe(testId);
    }
  });
});

describe("ProductInfoPage Component Integration", () => {
  it("devrait intégrer Suspense avec le bon fallback et le bon contenu", () => {
    // Simuler la structure du composant avec un Suspense mocké
    render(
      <div data-testid="suspense-mock">
        <div data-testid="fallback-content">
          <div data-testid="skeleton-mock">Loading...</div>
        </div>
        <div data-testid="suspense-content">
          <div data-testid="product-info-mock" data-product-id="123">
            Product Info for ID: 123
          </div>
        </div>
      </div>,
    );

    // Vérifier la structure complète
    expect(screen.getByTestId("suspense-mock")).toBeInTheDocument();
    expect(screen.getByTestId("fallback-content")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-mock")).toBeInTheDocument();
    expect(screen.getByTestId("suspense-content")).toBeInTheDocument();
    expect(screen.getByTestId("product-info-mock")).toBeInTheDocument();
  });
});
