// src/components/shared/ServerQueryProvider.tsx
import { ReactNode, Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

export interface ServerQueryProviderProps<TData> {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData, QueryKey, number>;
  initialPageParam?: number;
  pageSize?: number;
  children: ReactNode;
  fallback: ReactNode;
  isInfinite?: boolean;
}

async function HydratedQueryContent<TData>({
  queryKey,
  queryFn,
  initialPageParam = 1,
  children,
  isInfinite = false,
}: Omit<ServerQueryProviderProps<TData>, "fallback">) {
  const queryClient = new QueryClient();

  if (isInfinite) {
    await queryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam,
    });
  } else {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: ({ signal }) =>
        queryFn({
          pageParam: initialPageParam,
          queryKey,
          signal,
          meta: undefined,
          client: queryClient,
          direction: "forward",
        }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export function ServerQueryProvider<TData>({
  queryKey,
  queryFn,
  initialPageParam,
  children,
  fallback,
  isInfinite,
}: ServerQueryProviderProps<TData>) {
  return (
    <Suspense fallback={fallback}>
      <HydratedQueryContent
        queryKey={queryKey}
        queryFn={queryFn}
        initialPageParam={initialPageParam}
        isInfinite={isInfinite}
      >
        {children}
      </HydratedQueryContent>
    </Suspense>
  );
}
