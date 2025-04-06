import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RelatedProductsHeader } from "../../@relatedProducts/_components/RelatedProductsHeader";

describe("<RelatedProductsHeader />", () => {
  // Premier test: vérifie que le composant se rend correctement avec le titre
  it("should render the component with title", () => {
    // Rendu du composant dans le DOM virtuel pour les tests
    render(<RelatedProductsHeader title="Related Products" />);

    // Vérifie que l'élément conteneur principal est présent
    expect(screen.getByTestId("section-header")).toBeInTheDocument();

    // Vérifie que le titre est correctement affiché
    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Related Products",
    );
  });

  // Test pour vérifier que le lien d'action n'est pas rendu sans les props nécessaires
  it("should not render action link when actionLink and actionText are not provided", () => {
    // Rendu du composant avec seulement le titre
    render(<RelatedProductsHeader title="Related Products" />);

    // Vérifie qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test pour vérifier que le lien d'action est rendu avec les bonnes props
  it("should render action link when actionLink and actionText are provided", () => {
    // Rendu du composant avec titre, lien et texte d'action
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
      />,
    );

    // Récupération du lien d'action
    const actionLink = screen.getByTestId("section-action-link");

    // Vérifie que le lien est présent
    expect(actionLink).toBeInTheDocument();

    // Vérifie que le texte du lien est correct
    expect(actionLink).toHaveTextContent("View All");

    // Vérifie que l'attribut href est correct
    expect(actionLink).toHaveAttribute("href", "/products");
  });

  // Test pour vérifier que l'icône est correctement rendue
  it("should render icon when icon is provided", () => {
    // Rendu du composant avec une icône de test
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
        icon={<span data-testid="test-icon">Icon</span>}
      />,
    );

    // Vérifie que l'icône est présente
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  // Test pour vérifier que le lien n'est pas rendu avec seulement actionLink
  it("should not render action link when only actionLink is provided", () => {
    // Rendu du composant avec seulement actionLink
    render(
      <RelatedProductsHeader title="Related Products" actionLink="/products" />,
    );

    // Vérifie qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test pour vérifier que le lien n'est pas rendu avec seulement actionText
  it("should not render action link when only actionText is provided", () => {
    // Rendu du composant avec seulement actionText
    render(
      <RelatedProductsHeader title="Related Products" actionText="View All" />,
    );

    // Vérifie qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test pour vérifier que les classes CSS sont correctement appliquées
  it("should have correct CSS classes", () => {
    // Rendu du composant
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
      />,
    );

    // Récupération des éléments
    const sectionHeader = screen.getByTestId("section-header");
    const sectionTitle = screen.getByTestId("section-title");
    const actionLink = screen.getByTestId("section-action-link");

    // Vérifie les classes du conteneur principal
    expect(sectionHeader).toHaveClass("flex items-center justify-between mb-5");

    // Vérifie les classes du titre
    expect(sectionTitle).toHaveClass(
      "text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
    );

    // Vérifie les classes du lien d'action
    expect(actionLink).toHaveClass(
      "text-sm text-primary/80 hover:text-primary flex items-center gap-1 transition-colors",
    );
  });

  // Test pour vérifier que le composant gère correctement un titre long
  it("should handle long title correctly", () => {
    // Création d'un titre très long
    const longTitle =
      "This is a very long title that should still render correctly".repeat(3);

    // Rendu du composant avec un titre long
    render(<RelatedProductsHeader title={longTitle} />);

    // Vérifie que le titre long est correctement affiché
    expect(screen.getByTestId("section-title")).toHaveTextContent(longTitle);
  });

  // Test pour vérifier que le lien n'est pas rendu avec une chaîne vide pour actionLink
  it("should not render action link when actionLink is empty string", () => {
    // Rendu du composant avec actionLink vide
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink=""
        actionText="View All"
      />,
    );

    // Vérifie qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test pour vérifier que le lien n'est pas rendu avec une chaîne vide pour actionText
  it("should not render action link when actionText is empty string", () => {
    // Rendu du composant avec actionText vide
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText=""
      />,
    );

    // Vérifie qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  it("should match snapshot", () => {
    // Rendre le composant avec différentes configurations
    const { container: basicComponent } = render(
      <RelatedProductsHeader title="Related Products" />,
    );

    const { container: withActionLink } = render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
        icon={<span data-testid="test-icon">Icon</span>}
      />,
    );

    // Vérifier que le rendu correspond aux snapshots enregistrés
    expect(basicComponent).toMatchSnapshot();
    expect(withActionLink).toMatchSnapshot();
  });
});
