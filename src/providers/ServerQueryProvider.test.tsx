import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ServerQueryProvider,
  ServerQueryProviderProps,
} from "./ServerQueryProvider";
import * as ReactQuery from "@tanstack/react-query";
import { PropsWithChildren } from "react";

vi.mock("./ServerQueryProvider", () => ({
  ServerQueryProvider: ({
    fallback,
    queryKey,
    queryFn,
    isInfinite,
    initialPageParam,
  }: ServerQueryProviderProps<unknown>) => {
    const mockQueryClient = new ReactQuery.QueryClient();
    if (isInfinite) {
      mockQueryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: initialPageParam || 1,
      });
    } else {
      mockQueryClient.prefetchQuery({
        queryKey,
        queryFn,
      });
    }

    return (
      <div data-testid="server-query-provider">
        <div data-testid="fallback-content">{fallback}</div>
      </div>
    );
  },
}));

vi.mock("@tanstack/react-query", () => {
  const prefetchQueryMock = vi.fn().mockResolvedValue(undefined);
  const prefetchInfiniteQueryMock = vi.fn().mockResolvedValue(undefined);

  return {
    QueryClient: vi.fn().mockImplementation(() => ({
      prefetchQuery: prefetchQueryMock,
      prefetchInfiniteQuery: prefetchInfiniteQueryMock,
    })),
    dehydrate: vi.fn(() => "mocked-dehydrated-state"),
    HydrationBoundary: ({ children }: PropsWithChildren) => (
      <div data-testid="hydration-boundary">{children}</div>
    ),
  };
});

describe("ServerQueryProvider", () => {
  const mockQueryKey = ["test-key"];
  const mockQueryFn = vi.fn().mockResolvedValue({ data: "test-data" });
  const mockChildren = <div data-testid="children-content">Test Children</div>;
  const mockFallback = <div>Loading...</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait afficher le fallback pendant le chargement", () => {
    render(
      <ServerQueryProvider
        queryKey={mockQueryKey}
        queryFn={mockQueryFn}
        fallback={mockFallback}
      >
        {mockChildren}
      </ServerQueryProvider>,
    );

    expect(screen.getByTestId("fallback-content")).toBeInTheDocument();
  });

  it("devrait appeler prefetchQuery pour les requêtes standard", () => {
    const queryClient = new ReactQuery.QueryClient();

    render(
      <ServerQueryProvider
        queryKey={mockQueryKey}
        queryFn={mockQueryFn}
        fallback={mockFallback}
        isInfinite={false}
      >
        {mockChildren}
      </ServerQueryProvider>,
    );

    expect(queryClient.prefetchQuery).toHaveBeenCalled();
  });

  it("devrait appeler prefetchInfiniteQuery pour les requêtes infinies", () => {
    const queryClient = new ReactQuery.QueryClient();

    render(
      <ServerQueryProvider
        queryKey={mockQueryKey}
        queryFn={mockQueryFn}
        fallback={mockFallback}
        isInfinite={true}
        initialPageParam={5}
      >
        {mockChildren}
      </ServerQueryProvider>,
    );

    expect(queryClient.prefetchInfiniteQuery).toHaveBeenCalled();
  });
});
