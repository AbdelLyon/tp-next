import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductInfoPricing } from "../_components/ProductInfoPricing";

interface SeparatorProps {
  className?: string;
}

vi.mock("@/components/ui/separator", () => ({
  Separator: ({ className }: SeparatorProps) => (
    <hr className={className} data-testid="separator" />
  ),
}));

describe("ProductInfoPricing", () => {
  test("Devrait afficher le prix actuel correctement", () => {
    render(<ProductInfoPricing price={99.99} />);

    const currentPrice = screen.getByTestId("current-price");
    expect(currentPrice).toBeInTheDocument();
    expect(currentPrice.textContent).toBe("$99.99");
  });

  test("Ne devrait pas afficher le prix original si non fourni", () => {
    render(<ProductInfoPricing price={99.99} />);

    expect(screen.queryByTestId("original-price")).not.toBeInTheDocument();
  });

  test("Ne devrait pas afficher le prix original si égal à 0", () => {
    render(<ProductInfoPricing price={99.99} originalPrice={0} />);

    expect(screen.queryByTestId("original-price")).not.toBeInTheDocument();
  });

  test("Devrait afficher le prix original quand il est fourni et supérieur à 0", () => {
    render(<ProductInfoPricing price={79.99} originalPrice={119.99} />);

    const originalPrice = screen.getByTestId("original-price");
    expect(originalPrice).toBeInTheDocument();
    expect(originalPrice.textContent).toBe("$119.99");
  });

  test("Ne devrait pas afficher les économies si seulement le prix original est fourni", () => {
    render(<ProductInfoPricing price={79.99} originalPrice={119.99} />);

    expect(screen.queryByTestId("savings")).not.toBeInTheDocument();
  });

  test("Ne devrait pas afficher les économies si seulement le pourcentage de remise est fourni", () => {
    render(<ProductInfoPricing price={79.99} discountPercentage={20} />);

    expect(screen.queryByTestId("savings")).not.toBeInTheDocument();
  });

  test("Devrait afficher les économies quand le prix original et le pourcentage de remise sont fournis", () => {
    render(
      <ProductInfoPricing
        price={79.99}
        originalPrice={119.99}
        discountPercentage={33}
      />,
    );

    const savings = screen.getByTestId("savings");
    expect(savings).toBeInTheDocument();
    expect(savings.textContent).toBe("Save $40.00");
  });

  test("Devrait afficher le séparateur", () => {
    render(<ProductInfoPricing price={99.99} />);

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator.className).toContain("my-5");
    expect(separator.className).toContain("bg-gradient-to-r");
  });

  test("Devrait gérer correctement les prix avec des chiffres entiers", () => {
    render(
      <ProductInfoPricing
        price={100}
        originalPrice={150}
        discountPercentage={33}
      />,
    );

    expect(screen.getByTestId("current-price").textContent).toBe("$100.00");
    expect(screen.getByTestId("original-price").textContent).toBe("$150.00");
    expect(screen.getByTestId("savings").textContent).toBe("Save $50.00");
  });

  test("Devrait gérer correctement tous les props ensemble", () => {
    render(
      <ProductInfoPricing
        price={89.99}
        originalPrice={129.99}
        discountPercentage={30}
      />,
    );

    expect(screen.getByTestId("current-price").textContent).toBe("$89.99");
    expect(screen.getByTestId("original-price").textContent).toBe("$129.99");
    expect(screen.getByTestId("savings").textContent).toBe("Save $40.00");
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });
});
