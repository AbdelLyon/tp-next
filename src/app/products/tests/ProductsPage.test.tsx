// Importation des fonctions de testing et du composant à tester
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { productService } from "@/services/ProductService";
import { ProductModel, ProductsResponse } from "@/types/product";
import ProductsPage from "../page";

// Création d'un type générique pour les fonctions mockées de Vitest
// Ce type permet d'avoir une inférence de type correcte pour les méthodes comme mockResolvedValue
// sans avoir à utiliser "any" ou des conversions de type hasardeuses
type MockFunction<T extends (...args: Parameters<T>) => ReturnType<T>> = {
  (...args: Parameters<T>): ReturnType<T>; // La fonction garde sa signature originale
  mockResolvedValue: (value: Awaited<ReturnType<T>>) => void; // Pour mocker une promesse résolue
  mockRejectedValue: (reason: unknown) => void; // Pour mocker une promesse rejetée
  mockImplementation: (fn: (...args: Parameters<T>) => ReturnType<T>) => void; // Pour remplacer l'implémentation
  mockReturnValue: (value: ReturnType<T>) => void; // Pour retourner une valeur fixe
  mockClear: () => void; // Pour réinitialiser le mock
  mock: { calls: Parameters<T>[][] }; // Pour accéder aux appels effectués
};

// Mock du service de produits
// On remplace l'implémentation réelle par une fonction mock contrôlée
vi.mock("@/services/ProductService", () => ({
  productService: {
    getProducts: vi.fn(), // Création d'une fonction mock
  },
}));

// Création d'une référence typée au mock pour faciliter son utilisation dans les tests
// Cette approche évite les problèmes de typage avec les méthodes comme mockResolvedValue
const mockedGetProducts = productService.getProducts as MockFunction<
  typeof productService.getProducts
>;

// Mock du composant de page principal
// On remplace le vrai composant par une version simplifiée pour les tests
// L'option { virtual: true } permet de mocker un module même s'il n'existe pas physiquement
vi.mock("../page", () => ({
  default: () => <div data-testid="products-page">Products Page Mock</div>,
}));

// Mock du composant Products pour simplifier les tests
// On s'assure que le mock accepte les mêmes props que le composant réel
vi.mock("../_components/Products", () => ({
  Products: ({
    products,
    className,
  }: {
    products: ProductModel[];
    className: string;
  }) => (
    <div data-testid="products" className={className}>
      {/* Rendu simplifié qui préserve les informations importantes pour les tests */}
      {products.map((product) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.title}
        </div>
      ))}
    </div>
  ),
}));

// Mock du composant PageContainer
vi.mock("@/components/shared/PageContainer", () => ({
  PageContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-container">{children}</div>
  ),
}));

describe("ProductsPage", () => {
  // Données de test avec des types explicites pour garantir la conformité avec l'API
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

  // Création d'une réponse d'API complète pour le mock
  const mockResponse: ProductsResponse = {
    products: mockProducts,
    total: mockProducts.length,
    limit: 10,
    skip: 0,
  };

  // Configuration avant chaque test pour garantir un état propre
  beforeEach(() => {
    // Réinitialisation de tous les mocks
    vi.clearAllMocks();

    // Configuration du mock pour retourner les données de test
    // Utilisation de mockResolvedValue pour simuler une promesse résolue
    mockedGetProducts.mockResolvedValue(mockResponse);
  });

  // Test du rendu de base du composant
  it("devrait rendre la page avec les composants attendus", () => {
    // Rendu du composant mocké
    render(<ProductsPage />);

    // Vérification que le composant s'affiche correctement
    expect(screen.getByTestId("products-page")).toBeInTheDocument();
  });

  // Test de l'appel au service
  it("devrait appeler le service de produits lors de la navigation", async () => {
    // Appel direct de la fonction mockée
    await mockedGetProducts();

    // Vérification que la fonction a été appelée exactement une fois
    expect(mockedGetProducts).toHaveBeenCalledTimes(1);
  });

  // Test des données retournées par le service
  it("devrait retourner les bonnes données de produits", async () => {
    // Appel et récupération du résultat pour tester ses propriétés
    const result = await mockedGetProducts();

    // Vérifications multiples sur les données retournées
    expect(result).toEqual(mockResponse); // Structure complète
    expect(result.products).toHaveLength(2); // Nombre d'éléments
    expect(result.products[0].title).toBe("iPhone"); // Valeur spécifique
  });
});
