import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedProductsHeader } from "../_components/RelatedProductsHeader";

describe("<RelatedProductsHeader />", () => {
  test("Devrait s'afficher correctement avec la prop de titre requise", () => {
    render(<RelatedProductsHeader title="Related Products" />);

    expect(screen.getByTestId("section-header")).toBeInTheDocument();

    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Related Products",
    );

    expect(screen.getByTestId("section-header")).toHaveClass(
      "flex items-center justify-between mb-5",
    );
  });

  test("Ne devrait pas afficher le lien d'action quand actionLink et actionText ne sont pas fournis", () => {
    render(<RelatedProductsHeader title="Related Products" />);

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  test("Devrait afficher le lien d'action quand actionLink et actionText sont fournis", () => {
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

    expect(actionLink).toHaveClass(
      "text-sm text-primary/80 hover:text-primary flex items-center gap-1 transition-colors",
    );
  });

  test("Devrait afficher l'icône quand une icône est fournie", () => {
    const testIcon = <span data-testid="test-icon">Icon</span>;

    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
        icon={testIcon}
      />,
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();

    const actionLink = screen.getByTestId("section-action-link");
    expect(actionLink).toContainElement(screen.getByTestId("test-icon"));
  });

  test("Ne devrait pas afficher le lien d'action quand seulement actionLink est fourni", () => {
    render(
      <RelatedProductsHeader title="Related Products" actionLink="/products" />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  test("Ne devrait pas afficher le lien d'action quand seulement actionText est fourni", () => {
    render(
      <RelatedProductsHeader title="Related Products" actionText="View All" />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  test("Devrait gérer les titres extrêmement longs", () => {
    const longTitle =
      "This is an extremely long title that should still render correctly without breaking the layout of the component and should be handled gracefully".repeat(
        2,
      );

    render(<RelatedProductsHeader title={longTitle} />);

    expect(screen.getByTestId("section-title")).toHaveTextContent(longTitle);
  });

  test("Ne devrait pas afficher le lien d'action quand actionLink est une chaîne vide", () => {
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink=""
        actionText="View All"
      />,
    );

    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  test("Ne devrait pas afficher le lien d'action quand actionText est une chaîne vide", () => {
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
