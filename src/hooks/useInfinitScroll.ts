import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

export interface UseInfiniteScrollProps {
   isEnabled?: boolean;
   hasMore?: boolean;
   threshold?: number;
   rootMargin?: string;
   triggerOnce?: boolean;
   debounceTime?: number;
   onLoadMore?: () => void;
}

export interface UseInfiniteScrollReturn {
   containerRef: React.RefObject<HTMLElement | null>;
   ref: (node: Element | null) => void;
   inView: boolean;
}

export const useInfiniteScroll = (
   props: UseInfiniteScrollProps = {}
): UseInfiniteScrollReturn => {
   const {
      hasMore = true,
      isEnabled = true,
      threshold = 0.1,
      rootMargin = '0px 0px 250px 0px',
      triggerOnce = false,
      debounceTime = 100,
      onLoadMore,
   } = props;

   const containerRef = useRef<HTMLElement>(null);
   const isLoadingRef = useRef(false);
   const initialRender = useRef(true);

   // Utiliser le hook useInView de react-intersection-observer
   const { ref, inView } = useInView({
      threshold,
      rootMargin,
      triggerOnce,
      skip: !isEnabled || !hasMore,
      onChange: (inView) => {
         if (inView && !initialRender.current && !isLoadingRef.current && hasMore && onLoadMore) {
            isLoadingRef.current = true;
            onLoadMore();

            setTimeout(() => {
               isLoadingRef.current = false;
            }, debounceTime);
         }

         if (initialRender.current) {
            initialRender.current = false;
         }
      },
   });


   return {
      containerRef,
      ref,
      inView,
   };
};