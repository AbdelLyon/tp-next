// src/app/products/tests/InfiniteScrollList.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { InfiniteScrollList } from "@/components/shared/InfiniteScrollList";
import { useInView } from "react-intersection-observer";

// Type pour la fonction onChange
type OnChangeFunction = (inView: boolean) => void;

// Interface pour étendre le mock de useInView
interface UseInViewMock {
  triggerChange: OnChangeFunction;
}

// Cast du mock useInView avec son type étendu
const useInViewMocked = useInView as unknown as UseInViewMock &
  typeof useInView;

// Mock du hook useInView
vi.mock("react-intersection-observer", () => ({
  useInView: vi
    .fn()
    .mockImplementation(({ onChange }: { onChange: OnChangeFunction }) => {
      useInViewMocked.triggerChange = onChange;
      return {
        ref: () => {},
      };
    }),
}));

describe("<InfiniteScrollList />", () => {
  type TestItem = {
    id: number;
    name: string;
  };

  const mockItems: TestItem[] = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("devrait rendre tous les éléments fournis", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={false}
        renderItem={(item) => (
          <div data-testid={`item-${item.id}`}>{item.name}</div>
        )}
      />,
    );

    mockItems.forEach((item) => {
      expect(screen.getByTestId(`item-${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test("devrait appliquer les classes CSS personnalisées", () => {
    const { container } = render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
        classNames={{
          container: "custom-container-class",
          list: "custom-list-class",
        }}
      />,
    );

    const containerEl = container.firstChild as HTMLElement;
    expect(containerEl).toHaveClass("custom-container-class");

    const listEl = containerEl.firstChild as HTMLElement;
    expect(listEl).toHaveClass("custom-list-class");
  });

  test("devrait afficher le loader quand isLoading est true", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={true}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    // Recherche l'élément avec la classe animate-spin
    const loadingIndicator = document.querySelector(".animate-spin");
    expect(loadingIndicator).toBeInTheDocument();
  });

  test("devrait afficher 'Fin des résultats' quand hasMore est false", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={false}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    expect(screen.getByText("Fin des résultats")).toBeInTheDocument();
  });

  test("ne devrait pas afficher 'Fin des résultats' quand la liste est vide", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={[]}
        onLoadMore={mockOnLoadMore}
        hasMore={false}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    expect(screen.queryByText("Fin des résultats")).not.toBeInTheDocument();
  });

  test("devrait utiliser le keyExtractor personnalisé s'il est fourni", () => {
    const customKeyExtractor = vi.fn(
      (item: TestItem) => `custom-key-${item.id}`,
    );

    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
        keyExtractor={customKeyExtractor}
      />,
    );

    expect(customKeyExtractor).toHaveBeenCalledTimes(mockItems.length);
    mockItems.forEach((item, index) => {
      expect(customKeyExtractor).toHaveBeenCalledWith(item, index);
    });
  });

  test("devrait appeler onLoadMore quand l'élément est visible et hasMore est true", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    // Simuler l'intersection de l'élément observé
    useInViewMocked.triggerChange(true);

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  test("ne devrait pas appeler onLoadMore quand hasMore est false", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={false}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    // Simuler l'intersection de l'élément observé
    useInViewMocked.triggerChange(true);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  test("ne devrait pas appeler onLoadMore quand isLoading est true", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={true}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    // Simuler l'intersection de l'élément observé
    useInViewMocked.triggerChange(true);

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });

  test("devrait appliquer les props de conteneur personnalisés", () => {
    render(
      <InfiniteScrollList<TestItem>
        items={mockItems}
        onLoadMore={mockOnLoadMore}
        hasMore={true}
        isLoading={false}
        renderItem={(item) => <div>{item.name}</div>}
        containerProps={{
          style: { maxHeight: "500px" },
          // @ts-expect-error - data-testid is not included in default HTMLElement props
          "data-testid": "custom-container",
        }}
      />,
    );

    const containerEl = screen.getByTestId("custom-container");
    expect(containerEl).toBeInTheDocument();
    expect(containerEl.style.maxHeight).toBe("500px");
  });
});
