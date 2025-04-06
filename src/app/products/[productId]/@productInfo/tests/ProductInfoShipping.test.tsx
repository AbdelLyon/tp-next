import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductInfoShipping } from "../_components/ProductInfoShipping";

interface IconProps {
  className?: string;
}

vi.mock("lucide-react", () => ({
  Truck: ({ className }: IconProps) => (
    <span data-testid="truck-icon" className={className}>
      🚚
    </span>
  ),
  Shield: ({ className }: IconProps) => (
    <span data-testid="shield-icon" className={className}>
      🛡️
    </span>
  ),
  Package: ({ className }: IconProps) => (
    <span data-testid="package-icon" className={className}>
      📦
    </span>
  ),
}));

describe("ProductInfoShipping", () => {
  it("devrait rendre le conteneur principal avec les classes appropriées", () => {
    render(<ProductInfoShipping />);

    const container = screen.getByTestId("shipping-info");
    expect(container).toBeInTheDocument();
    expect(container.className).toContain("mt-8");
    expect(container.className).toContain("bg-gray-50");
    expect(container.className).toContain("p-4");
    expect(container.className).toContain("rounded-lg");
  });

  it("devrait afficher l'information sur la livraison gratuite avec l'icône de camion", () => {
    render(<ProductInfoShipping />);

    const truckIcon = screen.getByTestId("truck-icon");
    expect(truckIcon).toBeInTheDocument();
    expect(
      screen.getByText("Free shipping on orders over $50"),
    ).toBeInTheDocument();
  });

  it("devrait afficher l'information sur la garantie avec l'icône de bouclier", () => {
    render(<ProductInfoShipping />);

    const shieldIcon = screen.getByTestId("shield-icon");
    expect(shieldIcon).toBeInTheDocument();
    expect(screen.getByText("30-day money-back guarantee")).toBeInTheDocument();
  });

  it("devrait afficher l'information sur l'emballage avec l'icône de colis", () => {
    render(<ProductInfoShipping />);

    const packageIcon = screen.getByTestId("package-icon");
    expect(packageIcon).toBeInTheDocument();
    expect(
      screen.getByText("Secure packaging and delivery"),
    ).toBeInTheDocument();
  });

  it("devrait afficher trois informations d'expédition au total", () => {
    render(<ProductInfoShipping />);

    const items = screen
      .getAllByRole("generic")
      .filter(
        (el) =>
          el.className &&
          el.className.includes("flex items-center gap-3 text-sm"),
      );
    expect(items).toHaveLength(3);
  });

  it("devrait afficher les trois icônes avec la taille appropriée", () => {
    render(<ProductInfoShipping />);

    const icons = [
      screen.getByTestId("truck-icon"),
      screen.getByTestId("shield-icon"),
      screen.getByTestId("package-icon"),
    ];

    icons.forEach((icon) => {
      expect(icon).toBeInTheDocument();
      expect(icon.className).toContain("h-4");
      expect(icon.className).toContain("w-4");
    });
  });

  it("devrait avoir des conteneurs d'icônes circulaires avec la bonne couleur de fond", () => {
    render(<ProductInfoShipping />);

    const iconContainers = screen
      .getAllByRole("generic")
      .filter(
        (el) =>
          el.className &&
          el.className.includes("h-8 w-8 rounded-full bg-primary/10"),
      );

    expect(iconContainers).toHaveLength(3);
    iconContainers.forEach((container) => {
      expect(container.className).toContain("bg-primary/10");
      expect(container.className).toContain("text-primary");
      expect(container.className).toContain("flex items-center justify-center");
    });
  });
});
