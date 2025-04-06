import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductInfoDetails } from "../_components/ProductInfoDetails";

vi.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="badge" className={className}>
      {children}
    </div>
  ),
}));

describe("ProductInfoDetails", () => {
  it("devrait afficher correctement la description", () => {
    render(
      <ProductInfoDetails description="Ceci est une description de produit" />,
    );

    const descriptionElement = screen.getByTestId("product-description");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).toBe(
      "Ceci est une description de produit",
    );
  });

  it("devrait ne pas afficher de tags quand ils ne sont pas fournis", () => {
    render(
      <ProductInfoDetails description="Ceci est une description de produit" />,
    );

    expect(screen.queryByTestId("product-tags")).not.toBeInTheDocument();
  });

  it("devrait ne pas afficher de tags quand un tableau vide est fourni", () => {
    render(
      <ProductInfoDetails
        description="Ceci est une description de produit"
        tags={[]}
      />,
    );

    expect(screen.queryByTestId("product-tags")).not.toBeInTheDocument();
  });

  it("devrait afficher correctement les tags quand ils sont fournis", () => {
    const tags = ["Tag1", "Tag2", "Tag3"];
    render(
      <ProductInfoDetails
        description="Ceci est une description de produit"
        tags={tags}
      />,
    );

    const tagsContainer = screen.getByTestId("product-tags");
    expect(tagsContainer).toBeInTheDocument();

    const badgeElements = screen.getAllByTestId("badge");
    expect(badgeElements).toHaveLength(3);
    expect(badgeElements[0].textContent).toBe("Tag1");
    expect(badgeElements[1].textContent).toBe("Tag2");
    expect(badgeElements[2].textContent).toBe("Tag3");
  });
});
