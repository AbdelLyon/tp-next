// Importation des fonctions de test de Vitest
import { describe, expect, it } from "vitest";
// Importation des utilitaires de test de React Testing Library
import { render, screen } from "@testing-library/react";
import { RelatedProductsHeader } from "../_components/RelatedProductsHeader";
// Importation du composant que nous allons tester

// Groupe de tests pour le composant RelatedProductsHeader
describe("<RelatedProductsHeader />", () => {
  // Test 1: Vérifier que le composant se rend correctement avec le props title obligatoire
  it("renders correctly with required title prop", () => {
    // Rendu du composant avec seulement le titre
    render(<RelatedProductsHeader title="Related Products" />);

    // Vérifier que le conteneur principal existe
    expect(screen.getByTestId("section-header")).toBeInTheDocument();

    // Vérifier que le titre s'affiche correctement avec le texte fourni
    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Related Products",
    );

    // Vérifier que le conteneur a les classes CSS correctes
    expect(screen.getByTestId("section-header")).toHaveClass(
      "flex items-center justify-between mb-5",
    );
  });

  // Test 2: Vérifier que le lien d'action ne s'affiche pas quand actionLink et actionText ne sont pas fournis
  it("does not render action link when actionLink and actionText are not provided", () => {
    // Rendu du composant avec seulement le titre
    render(<RelatedProductsHeader title="Related Products" />);

    // Vérifier qu'aucun lien d'action n'est présent
    // queryByTestId retourne null si l'élément n'est pas trouvé, contrairement à getByTestId qui génère une erreur
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test 3: Vérifier que le lien d'action s'affiche correctement quand actionLink et actionText sont fournis
  it("renders action link when actionLink and actionText are provided", () => {
    // Rendu du composant avec titre, lien et texte d'action
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
      />,
    );

    // Vérifier que le lien d'action est présent
    const actionLink = screen.getByTestId("section-action-link");
    expect(actionLink).toBeInTheDocument();

    // Vérifier que le texte du lien correspond à la prop actionText
    expect(actionLink).toHaveTextContent("View All");

    // Vérifier que l'attribut href du lien correspond à la prop actionLink
    expect(actionLink).toHaveAttribute("href", "/products");

    // Vérifier que le lien a les classes CSS correctes
    expect(actionLink).toHaveClass(
      "text-sm text-primary/80 hover:text-primary flex items-center gap-1 transition-colors",
    );
  });

  // Test 4: Vérifier que l'icône s'affiche correctement quand icon est fourni
  it("renders icon when icon is provided", () => {
    // Création d'une icône de test avec un data-testid pour faciliter la vérification
    const testIcon = <span data-testid="test-icon">Icon</span>;

    // Rendu du composant avec toutes les props, y compris l'icône
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText="View All"
        icon={testIcon}
      />,
    );

    // Vérifier que l'icône est présente dans le document
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();

    // Vérifier que l'icône est à l'intérieur du lien d'action
    const actionLink = screen.getByTestId("section-action-link");
    expect(actionLink).toContainElement(screen.getByTestId("test-icon"));
  });

  // Test 5: Vérifier que le lien d'action ne s'affiche pas si seulement actionLink est fourni
  it("does not render action link when only actionLink is provided", () => {
    // Rendu du composant avec titre et lien d'action, mais sans texte d'action
    render(
      <RelatedProductsHeader title="Related Products" actionLink="/products" />,
    );

    // Vérifier qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test 6: Vérifier que le lien d'action ne s'affiche pas si seulement actionText est fourni
  it("does not render action link when only actionText is provided", () => {
    // Rendu du composant avec titre et texte d'action, mais sans lien d'action
    render(
      <RelatedProductsHeader title="Related Products" actionText="View All" />,
    );

    // Vérifier qu'aucun lien d'action n'est présent
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test 7: Vérifier que le composant gère correctement les titres très longs
  it("handles extremely long titles", () => {
    // Création d'un titre très long
    const longTitle =
      "This is an extremely long title that should still render correctly without breaking the layout of the component and should be handled gracefully".repeat(
        2,
      );

    // Rendu du composant avec un titre très long
    render(<RelatedProductsHeader title={longTitle} />);

    // Vérifier que le titre long est affiché correctement
    expect(screen.getByTestId("section-title")).toHaveTextContent(longTitle);
  });

  // Test 8: Vérifier que le composant gère correctement une chaîne vide pour actionLink
  it("does not render action link when actionLink is empty string", () => {
    // Rendu du composant avec un actionLink vide
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink=""
        actionText="View All"
      />,
    );

    // Vérifier qu'aucun lien d'action n'est présent car actionLink est falsy (chaîne vide)
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });

  // Test 9: Vérifier que le composant gère correctement une chaîne vide pour actionText
  it("does not render action link when actionText is empty string", () => {
    // Rendu du composant avec un actionText vide
    render(
      <RelatedProductsHeader
        title="Related Products"
        actionLink="/products"
        actionText=""
      />,
    );

    // Vérifier qu'aucun lien d'action n'est présent car actionText est falsy (chaîne vide)
    expect(screen.queryByTestId("section-action-link")).not.toBeInTheDocument();
  });
});
