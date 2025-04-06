import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductInfoGallery } from "../_components/ProductInfoGallery";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  fill?: boolean;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  size?: string;
  "data-testid"?: string;
}

// Mock les composants importés
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    sizes,
    priority,
    unoptimized,
  }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      data-sizes={sizes}
      data-priority={priority ? "true" : "false"}
      data-unoptimized={unoptimized ? "true" : "false"}
      data-testid="product-image"
    />
  ),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, className, ...props }: BadgeProps) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, className, ...props }: ButtonProps) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("lucide-react", () => ({
  Heart: () => <div data-testid="heart-icon">♥</div>,
}));

describe("ProductInfoGallery", () => {
  it("devrait rendre le conteneur de la galerie avec les classes appropriées", () => {
    render(<ProductInfoGallery title="Produit Test" />);

    const gallery = screen.getByTestId("product-gallery");
    expect(gallery).toBeInTheDocument();
    expect(gallery.className).toContain("relative aspect-square rounded-xl");
  });

  it("devrait ne pas afficher l'image si aucun thumbnail n'est fourni", () => {
    render(<ProductInfoGallery title="Produit Test" />);

    expect(screen.queryByTestId("product-image")).not.toBeInTheDocument();
  });

  it("devrait afficher l'image avec les bonnes propriétés quand un thumbnail est fourni", () => {
    render(<ProductInfoGallery title="Produit Test" thumbnail="/image.jpg" />);

    const image = screen.getByTestId("product-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/image.jpg");
    expect(image).toHaveAttribute("alt", "Produit Test");
    expect(image).toHaveAttribute("data-priority", "true");
    expect(image).toHaveAttribute("data-unoptimized", "true");
  });

  it("devrait ne pas afficher de badge de remise si aucun pourcentage n'est fourni", () => {
    render(<ProductInfoGallery title="Produit Test" />);

    expect(screen.queryByTestId("discount-badge")).not.toBeInTheDocument();
  });

  it("devrait afficher le badge de remise avec le pourcentage correct quand il est fourni", () => {
    render(
      <ProductInfoGallery title="Produit Test" discountPercentage={15.5} />,
    );

    const discountBadge = screen.getByTestId("discount-badge");
    expect(discountBadge).toBeInTheDocument();
    expect(discountBadge.textContent).toBe("16% OFF");
  });

  it("devrait toujours afficher le bouton de favoris", () => {
    render(<ProductInfoGallery title="Produit Test" />);

    const favoriteButton = screen.getByTestId("favorite-button");
    expect(favoriteButton).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });

  it("devrait gérer correctement tous les props ensemble", () => {
    render(
      <ProductInfoGallery
        title="Produit Complet"
        thumbnail="/produit.jpg"
        discountPercentage={20}
      />,
    );

    expect(screen.getByTestId("product-image")).toBeInTheDocument();
    expect(screen.getByTestId("discount-badge")).toBeInTheDocument();
    expect(screen.getByTestId("discount-badge").textContent).toBe("20% OFF");
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });
});
