import { ReactNode } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/getQueryClient";

interface QueryDataProviderProps {
  children: ReactNode;
  prefetchFn: (queryClient: ReturnType<typeof getQueryClient>) => Promise<void>;
}

export const ServerQueryProvider = async ({
  children,
  prefetchFn,
}: QueryDataProviderProps) => {
  const queryClient = getQueryClient();

  await prefetchFn(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
