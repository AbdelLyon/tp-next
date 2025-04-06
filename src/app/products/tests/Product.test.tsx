import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll, afterEach } from "vitest";
import { Product } from "../_components/Product";
import { productService } from "@/services/ProductService";
import { ProductModel } from "@/types/product";
import { ReactNode } from "react";

// Types pour les props des composants mockés
type CommonProps = {
  children: ReactNode;
  className?: string;
};

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  unoptimized?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
  "data-testid"?: string;
};

type BadgeProps = CommonProps & {
  variant?: string;
  "data-variant"?: string;
};

// Mock des dépendances externes
vi.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
    />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ href, className, children }: LinkProps) => (
    <a href={href} className={className} data-testid="product-card">
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: CommonProps) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children, className }: CommonProps) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className }: CommonProps) => (
    <div data-testid="card-title" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: CommonProps) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant, className }: BadgeProps) => (
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

// Typage explicite pour les fonctions mockées du service
type MockProductService = {
  getProducts: ReturnType<typeof vi.fn>;
  getProductById: ReturnType<typeof vi.fn>;
};

vi.mock("@/services/ProductService", () => ({
  productService: {
    getProducts: vi.fn(),
    getProductById: vi.fn(),
  } as MockProductService,
}));

describe("<ProductCard />", () => {
  // Produit de test avec toutes les propriétés nécessaires
  const mockProduct: ProductModel = {
    id: 1,
    title: "iPhone 13",
    description: "Latest iPhone model with A15 Bionic chip",
    price: 999,
    rating: 4.5,
    brand: "Apple",
    thumbnail: "https://example.com/image.jpg",
    discountPercentage: 10,
    category: "smartphones",
    stock: 50,
    images: [],
  };

  // Configuration des mocks avant tous les tests
  beforeAll(() => {
    (
      productService.getProductById as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockProduct);

    (productService.getProducts as ReturnType<typeof vi.fn>).mockResolvedValue({
      products: [mockProduct],
      total: 1,
      limit: 10,
      skip: 0,
    });
  });

  // Nettoyage après chaque test pour éviter les effets de bord
  afterEach(() => {
    cleanup();
  });

  // Test de base : vérifier que le composant se rend correctement
  it("devrait se rendre correctement dans le DOM", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });

  // Test de structure : vérifier les composants principaux
  it("devrait contenir les composants Card, CardHeader et CardContent", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  // Test de style : vérifier les classes CSS du lien principal
  it("devrait avoir les classes CSS appropriées sur le lien principal", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("product-card")).toHaveClass(
      "block h-full no-underline",
    );
  });

  // Test de navigation : vérifier l'URL de redirection
  it("devrait rediriger vers la page détaillée du produit avec l'ID correct", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("product-card")).toHaveAttribute(
      "href",
      `/products/${mockProduct.id}`,
    );
  });

  // Test de contenu : vérifier le titre du produit
  it("devrait afficher le titre du produit", () => {
    render(<Product product={mockProduct} />);

    const title = screen.getByText(mockProduct.title);
    expect(title).toBeInTheDocument();

    // Vérification que le titre est dans un CardTitle avec la classe truncate
    const cardTitle = screen.getByTestId("card-title");
    expect(cardTitle).toHaveClass("text-sm font-medium truncate");
    expect(cardTitle).toHaveTextContent(mockProduct.title);
  });

  // Test conditionnel : vérifier l'absence de notation quand rating est absent/nul
  it("devrait ne pas afficher la note si elle n'existe pas", () => {
    // Création d'un produit sans notation
    const productWithoutRating = { ...mockProduct, rating: 0 };
    render(<Product product={productWithoutRating} />);
    const rating = screen.queryByText(/★/);
    expect(rating).not.toBeInTheDocument();
    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });

  // Test conditionnel : vérifier la présence de notation quand rating existe
  it("devrait afficher la note si elle existe", () => {
    render(<Product product={mockProduct} />);

    // Vérification que la notation est affichée avec le bon format
    const rating = screen.getByText(`★ ${mockProduct.rating.toFixed(1)}`);
    expect(rating).toBeInTheDocument();

    // Vérification que la notation est dans un Badge avec les bonnes classes
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("data-variant", "outline");
    expect(badge).toHaveClass("text-xs scale-90");
  });

  // Test conditionnel : vérifier l'absence d'image quand thumbnail est absent
  it("devrait ne pas afficher l'image miniature si elle n'existe pas", () => {
    // Création d'un produit sans image
    const productWithoutThumbnail = { ...mockProduct, thumbnail: "" };
    render(<Product product={productWithoutThumbnail} />);

    // Vérification que l'image n'est pas affichée
    const thumbnail = screen.queryByTestId("next-image");
    expect(thumbnail).not.toBeInTheDocument();
  });

  // Test conditionnel : vérifier la présence d'image quand thumbnail existe
  it("devrait afficher l'image miniature si elle existe", () => {
    render(<Product product={mockProduct} />);

    // Vérification que l'image est affichée avec les bons attributs
    const thumbnail = screen.getByTestId("next-image");
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute("src", mockProduct.thumbnail);
    expect(thumbnail).toHaveAttribute("alt", mockProduct.title);
    expect(thumbnail).toHaveAttribute("width", "100");
    expect(thumbnail).toHaveAttribute("height", "100");
    expect(thumbnail).toHaveClass("object-cover w-full h-full");
  });

  // Test de contenu : vérifier le conteneur de l'image
  it("devrait avoir un conteneur d'image correctement stylisé", () => {
    render(<Product product={mockProduct} />);

    // Vérification que le conteneur de l'image a les bonnes classes
    // Note: La structure DOM exacte pourrait varier, cet exemple est une approximation
    const image = screen.getByTestId("next-image");
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveClass(
      "size-40 mx-auto relative overflow-hidden rounded",
    );
  });

  // Test de contenu : vérifier la description du produit
  it("devrait afficher la description du produit avec troncature", () => {
    render(<Product product={mockProduct} />);

    // Vérification que la description est affichée
    const description = screen.getByText(mockProduct.description);
    expect(description).toBeInTheDocument();

    // Vérification que la description a les bonnes classes pour la troncature
    expect(description).toHaveClass("text-xs text-gray-700 line-clamp-2");
  });

  // Test de contenu : vérifier l'affichage du prix
  it("devrait afficher le prix du produit correctement formaté", () => {
    render(<Product product={mockProduct} />);

    // Vérification que le prix est affiché avec le format correct
    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toBeInTheDocument();

    // Vérification que le conteneur du prix a les bonnes classes
    expect(price).toHaveClass("font-medium mt-2");
  });

  // Test conditionnel : vérifier la présence du pourcentage de réduction
  it("devrait afficher le pourcentage de réduction si celui-ci existe", () => {
    render(<Product product={mockProduct} />);

    // Vérification que la réduction est affichée avec le format correct
    const discount = screen.getByText(
      `-${mockProduct.discountPercentage!.toFixed(0)}%`,
    );
    expect(discount).toBeInTheDocument();

    // Vérification que la réduction a les bonnes classes
    expect(discount).toHaveClass("ml-1 text-xs text-green-600");
  });

  // Test conditionnel : vérifier l'absence du pourcentage de réduction
  it("devrait ne pas afficher le pourcentage de réduction s'il n'existe pas", () => {
    // Test avec une valeur de réduction à 0
    const productWithoutDiscount = { ...mockProduct, discountPercentage: 0 };
    render(<Product product={productWithoutDiscount} />);

    // Vérification qu'aucune réduction n'est affichée
    const discount = screen.queryByText(/-0%/);
    expect(discount).not.toBeInTheDocument();

    // Test avec réduction undefined (après nettoyage)
    cleanup();
    const productWithUndefinedDiscount: ProductModel = {
      ...mockProduct,
      discountPercentage: undefined,
    };
    render(<Product product={productWithUndefinedDiscount} />);

    // Vérification qu'aucune réduction n'est affichée
    const undefinedDiscount = screen.queryByText(/-\d+%/);
    expect(undefinedDiscount).not.toBeInTheDocument();
  });

  // Test de style : vérifier les classes CSS de la Card
  it("devrait avoir les bonnes classes CSS sur le composant Card", () => {
    render(<Product product={mockProduct} />);

    // Vérification des classes CSS sur la Card
    const card = screen.getByTestId("card");
    expect(card).toHaveClass(
      "h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-200",
    );
  });

  // Test de style : vérifier les classes CSS du CardHeader
  it("devrait avoir les bonnes classes CSS sur le CardHeader", () => {
    render(<Product product={mockProduct} />);

    // Vérification des classes CSS sur le CardHeader
    const header = screen.getByTestId("card-header");
    expect(header).toHaveClass("pb-1 pt-3 px-3");
  });

  // Test de style : vérifier les classes CSS du CardContent
  it("devrait avoir les bonnes classes CSS sur le CardContent", () => {
    render(<Product product={mockProduct} />);

    // Vérification des classes CSS sur le CardContent
    const content = screen.getByTestId("card-content");
    expect(content).toHaveClass("py-2 px-3");
  });

  // Test avec données extrêmes : titre très long
  it("devrait gérer correctement un titre très long avec troncature", () => {
    // Produit avec un titre extrêmement long
    const productWithLongTitle: ProductModel = {
      ...mockProduct,
      title:
        "This is an extremely long product title that should be truncated in the display to ensure proper layout and aesthetics".repeat(
          2,
        ),
    };

    render(<Product product={productWithLongTitle} />);

    // Vérification que le titre est présent et tronqué
    const title = screen.getByTestId("card-title");
    expect(title).toHaveClass("truncate");
    expect(title).toHaveTextContent(productWithLongTitle.title);
  });

  // Test avec données extrêmes : description très longue
  it("devrait gérer correctement une description très longue avec troncature", () => {
    // Produit avec une description extrêmement longue
    const productWithLongDescription: ProductModel = {
      ...mockProduct,
      description:
        "This is an extremely long product description that should be truncated to just two lines in the display. ".repeat(
          10,
        ),
    };

    render(<Product product={productWithLongDescription} />);

    // Vérification que la description est présente et tronquée
    const description = screen.getByText(
      /This is an extremely long product description/,
    );
    expect(description).toHaveClass("line-clamp-2");
  });
});
