import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelatedProductsHeader } from "../../@relatedProducts/_components/RelatedProductsHeader";

describe("<RelatedProductsHeader />", () => {
  it("Devrait rendre le composant avec le titre", () => {
    render(<RelatedProductsHeader title="Related Products" />);

    expect(screen.getByTestId("section-header")).toBeInTheDocument();

    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Related Products",
    );
  });

  it("Ne devrait pas rendre le lien d'action quand actionLink et actionText ne sont pas fournis", () => {
    render(<RelatedProductsHeader title="Related Products" />);

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  it("Devrait rendre le lien d'action quand actionLink et actionText sont fournis", () => {
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
      />,
    );

    const actionLink = screen.getByTestId("section-action-link");

    expect(actionLink).toBeInTheDocument();

    expect(actionLink).toHaveTextContent("View All");

    expect(actionLink).toHaveAttribute("href", "/products");
  });

  it("Devrait rendre l'icône quand une icône est fournie", () => {
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
        icon={<span data-testid="test-icon">Icon</span>}
      />,
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("Ne devrait pas rendre le lien d'action quand seulement actionLink est fourni", () => {
    render(
      <RelatedProductsHeader title="Related Products" actionLink="/products" />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  it("Ne devrait pas rendre le lien d'action quand seulement actionText est fourni", () => {
    render(
      <RelatedProductsHeader title="Related Products" actionText="View All" />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  it("Devrait avoir les classes CSS correctes", () => {
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
      />,
    );

    const sectionHeader = screen.getByTestId("section-header");
    const sectionTitle = screen.getByTestId("section-title");
    const actionLink = screen.getByTestId("section-action-link");

    expect(sectionHeader).toHaveClass("flex items-center justify-between mb-5");

    expect(sectionTitle).toHaveClass(
      "text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
    );

    expect(actionLink).toHaveClass(
      "text-sm text-primary/80 hover:text-primary flex items-center gap-1 transition-colors",
    );
  });

  it("Devrait gérer correctement un titre long", () => {
    const longTitle =
      "This is a very long title that should still render correctly".repeat(3);

    render(<RelatedProductsHeader title={longTitle} />);

    expect(screen.getByTestId("section-title")).toHaveTextContent(longTitle);
  });

  it("Ne devrait pas rendre le lien d'action quand actionLink est une chaîne vide", () => {
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink=""
        actionText="View All"
      />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  it("Ne devrait pas rendre le lien d'action quand actionText est une chaîne vide", () => {
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText=""
      />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });
});
