import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
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
  test("Devrait rendre le composant avec le titre", () => {
    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={["Electronics", "Home Decor", "Fashion"]}
      />,
    );

    expect(screen.getByTestId("category-list")).toBeInTheDocument();

    expect(screen.getByTestId("category-list-title")).toHaveTextContent(
      "Popular Categories",
    );
  });

  test("Devrait rendre toutes les catégories sous forme de badges", () => {
    const categories = ["Electronics", "Home Decor", "Fashion"];

    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={categories}
      />,
    );

    expect(screen.getByTestId("category-electronics")).toBeInTheDocument();
    expect(screen.getByTestId("category-home-decor")).toBeInTheDocument();
    expect(screen.getByTestId("category-fashion")).toBeInTheDocument();

    expect(screen.getByTestId("category-electronics")).toHaveTextContent(
      "Electronics",
    );
    expect(screen.getByTestId("category-home-decor")).toHaveTextContent(
      "Home Decor",
    );
    expect(screen.getByTestId("category-fashion")).toHaveTextContent("Fashion");
  });

  test("Ne devrait pas rendre de badges quand le tableau de catégories est vide", () => {
    render(<RelatedtCategoryList title="Popular Categories" categories={[]} />);

    expect(screen.getByTestId("category-list")).toBeInTheDocument();

    const badgeContainer = screen
      .getByTestId("category-list")
      .querySelector(".flex.flex-wrap");
    expect(badgeContainer).toBeEmptyDOMElement();
  });

  test("Devrait gérer un grand nombre de catégories", () => {
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

    manyCategories.forEach((category) => {
      const testId = `category-category-${category.toLowerCase().slice(9)}`;
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  test("Devrait avoir les classes CSS correctes", () => {
    render(
      <RelatedtCategoryList
        title="Popular Categories"
        categories={["Electronics"]}
      />,
    );

    expect(screen.getByTestId("category-list")).toHaveClass(
      "flex flex-col space-y-3",
    );

    expect(screen.getByTestId("category-list-title")).toHaveClass(
      "text-sm font-medium",
    );

    expect(screen.getByTestId("category-electronics")).toHaveClass(
      "cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300 py-1.5",
    );
  });

  test("Devrait gérer les caractères spéciaux dans les noms de catégories", () => {
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

    expect(screen.getByTestId("category-kids-&-baby")).toBeInTheDocument();
    expect(screen.getByTestId("category-home-&-garden")).toBeInTheDocument();
    expect(
      screen.getByTestId("category-sports-&-outdoors"),
    ).toBeInTheDocument();
  });
});
