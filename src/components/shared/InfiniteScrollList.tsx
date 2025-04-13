// components/InfiniteScrollList.tsx
import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { IconLoader2 } from "x-react/icons";

import { mergeTailwindClasses } from "x-react/utils";

interface InfiniteScrollListProps<T> {
  items: T[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  renderItem: (item: T, index: number) => ReactNode;
  classNames?: {
    container?: string;
    list?: string;
  };
  rootMargin?: string;
  keyExtractor?: (item: T, index: number) => string | number;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function InfiniteScrollList<T>({
  items,
  onLoadMore,
  hasMore,
  isLoading,
  renderItem,
  classNames,
  rootMargin = "0px 0px 300px 0px",
  keyExtractor = (_, index) => index,
  containerProps = {},
}: InfiniteScrollListProps<T>) {
  const { ref } = useInView({
    rootMargin,
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        onLoadMore();
      }
    },
  });

  return (
    <div
      className={mergeTailwindClasses(
        "relative overflow-auto w-full pr-4",
        classNames?.container,
      )}
      {...containerProps}
    >
      <div className={classNames?.list}>
        {items.map((item, index) => (
          <React.Fragment key={keyExtractor(item, index)}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </div>

      {/* Élément observé qui déclenche le chargement */}
      <div ref={ref} className="h-10 flex items-center justify-center my-4">
        {isLoading && <IconLoader2 className="h-6 w-6 animate-spin" />}
      </div>

      {!hasMore && items.length > 0 && (
        <div className="text-center text-gray-500 py-4">Fin des résultats</div>
      )}
    </div>
  );
}
