import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RelatedtCategoryList } from "../_components/RelatedtCategoryList";
vi.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    className,
    "data-testid": dataTestId,
    ...rest
  }: {
    children: React.ReactNode;
    className?: string;
    "data-testid"?: string;
    variant?: string;
  }) => (
    <div className={className} data-testid={dataTestId} {...rest}>
      {children}
    </div>
  ),
}));
describe("<RelatedtCategoryList />", () => {
  // Test snapshot
  it("should match snapshot", () => {
    const { container } = render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={["Electronics", "Home Decor", "Fashion"]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  // Test du rendu de base
  it("should render the component with title", () => {
    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={["Electronics", "Home Decor", "Fashion"]}
      />,
    );

    // Vérifie que le conteneur principal est présent
    expect(screen.getByTestId("category-list")).toBeInTheDocument();

    // Vérifie que le titre est correctement affiché
    expect(screen.getByTestId("category-list-title")).toHaveTextContent(
      "Popular Categories",
    );
  });

  // Test du rendu des catégories
  it("should render all categories as badges", () => {
    const categories = ["Electronics", "Home Decor", "Fashion"];

    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={categories}
      />,
    );

    // Vérifie que chaque catégorie est rendue
    expect(screen.getByTestId("category-electronics")).toBeInTheDocument();
    expect(screen.getByTestId("category-home-decor")).toBeInTheDocument();
    expect(screen.getByTestId("category-fashion")).toBeInTheDocument();

    // Vérifie que le texte de chaque badge correspond à la catégorie
    expect(screen.getByTestId("category-electronics")).toHaveTextContent(
      "Electronics",
    );
    expect(screen.getByTestId("category-home-decor")).toHaveTextContent(
      "Home Decor",
    );
    expect(screen.getByTestId("category-fashion")).toHaveTextContent("Fashion");
  });

  // Test avec une liste vide de catégories
  it("should not render any badges when categories array is empty", () => {
    render(<RelatedtCategoryList title="Popular Categories" categories={[]} />);

    // Vérifie que le conteneur principal est présent
    expect(screen.getByTestId("category-list")).toBeInTheDocument();

    // Vérifie qu'aucun badge n'est rendu
    const badgeContainer = screen
      .getByTestId("category-list")
      .querySelector(".flex.flex-wrap");
    expect(badgeContainer).toBeEmptyDOMElement();
  });

  // Test avec un grand nombre de catégories
  it("should handle a large number of categories", () => {
    const manyCategories = Array.from(
      { length: 10 },
      (_, i) => `Category-${i}`,
    );

    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={manyCategories}
      />,
    );

    // Vérifie que toutes les catégories sont rendues
    manyCategories.forEach((category) => {
      const testId = `category-category-${category.toLowerCase().slice(9)}`;
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  // Test des classes CSS appliquées
  it("should have correct CSS classes", () => {
    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={["Electronics"]}
      />,
    );

    // Vérifie les classes du conteneur principal
    expect(screen.getByTestId("category-list")).toHaveClass(
      "flex flex-col space-y-3",
    );

    // Vérifie les classes du titre
    expect(screen.getByTestId("category-list-title")).toHaveClass(
      "text-sm font-medium",
    );

    // Vérifie les classes du badge
    expect(screen.getByTestId("category-electronics")).toHaveClass(
      "cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300 py-1.5",
    );
  });

  // Test pour vérifier que les caractères spéciaux dans les noms de catégories sont correctement gérés
  it("should handle special characters in category names", () => {
    const specialCategories = [
      "Kids & Baby",
      "Home & Garden",
      "Sports & Outdoors",
    ];

    render(
      <RelatedtCategoryList
        title="Special Categories"
        categories={specialCategories}
      />,
    );

    // Vérifie que les catégories avec des caractères spéciaux sont correctement rendues
    // Utiliser les data-testid tels qu'ils apparaissent réellement dans le DOM
    expect(screen.getByTestId("category-kids-&-baby")).toBeInTheDocument();
    expect(screen.getByTestId("category-home-&-garden")).toBeInTheDocument();
    expect(
      screen.getByTestId("category-sports-&-outdoors"),
    ).toBeInTheDocument();
  });
});
