import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { useInfiniteScroll } from "./useInfinitScroll";

vi.mock("react-intersection-observer", () => ({
  useInView: vi.fn(),
}));

describe("useInfiniteScroll", () => {
  const mockOnLoadMore = vi.fn();
  const mockInViewReturn = {
    ref: vi.fn(),
    inView: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useInView as Mock).mockReturnValue(mockInViewReturn);
    vi.useFakeTimers();
  });

  it("devrait initialiser correctement avec les valeurs par défaut", () => {
    const { result } = renderHook(() => useInfiniteScroll());

    expect(result.current.ref).toBe(mockInViewReturn.ref);
    expect(result.current.inView).toBe(false);
    expect(result.current.containerRef.current).toBe(null);

    expect(useInView).toHaveBeenCalledWith({
      threshold: 0.1,
      rootMargin: "0px 0px 250px 0px",
      triggerOnce: false,
      skip: false,
      onChange: expect.any(Function),
    });
  });

  it("devrait utiliser les props personnalisées lorsqu'elles sont fournies", () => {
    const customProps = {
      hasMore: true,
      isEnabled: true,
      threshold: 0.5,
      rootMargin: "100px",
      triggerOnce: true,
      debounceTime: 200,
      onLoadMore: mockOnLoadMore,
    };

    renderHook(() => useInfiniteScroll(customProps));

    expect(useInView).toHaveBeenCalledWith({
      threshold: 0.5,
      rootMargin: "100px",
      triggerOnce: true,
      skip: false,
      onChange: expect.any(Function),
    });
  });

  it("devrait désactiver le hook si isEnabled est false", () => {
    renderHook(() => useInfiniteScroll({ isEnabled: false }));

    expect(useInView).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: true,
      }),
    );
  });

  it("devrait désactiver le hook si hasMore est false", () => {
    renderHook(() => useInfiniteScroll({ hasMore: false }));

    expect(useInView).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: true,
      }),
    );
  });

  it("devrait appeler onLoadMore lorsque l'élément est en vue", () => {
    let capturedOnChange: ((inView: boolean) => void) | null = null;

    (useInView as Mock).mockImplementation(({ onChange }) => {
      capturedOnChange = onChange;
      return {
        ref: vi.fn(),
        inView: true,
      };
    });

    renderHook(() => useInfiniteScroll({ onLoadMore: mockOnLoadMore }));

    expect(capturedOnChange).not.toBeNull();

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });
    }

    expect(mockOnLoadMore).not.toHaveBeenCalled();

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });
    }

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });

  it("devrait respecter le temps de debounce", () => {
    let capturedOnChange: ((inView: boolean) => void) | null = null;

    (useInView as Mock).mockImplementation(({ onChange }) => {
      capturedOnChange = onChange;
      return {
        ref: vi.fn(),
        inView: true,
      };
    });

    renderHook(() =>
      useInfiniteScroll({
        onLoadMore: mockOnLoadMore,
        debounceTime: 200,
      }),
    );

    expect(capturedOnChange).not.toBeNull();

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });
    }

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });
    }

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });
    }

    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });
    }

    // Maintenant devrait être appelé à nouveau
    expect(mockOnLoadMore).toHaveBeenCalledTimes(2);
  });

  it("ne devrait pas appeler onLoadMore si hasMore est false", () => {
    let capturedOnChange: ((inView: boolean) => void) | null = null;

    (useInView as Mock).mockImplementation(({ onChange }) => {
      capturedOnChange = onChange;
      return {
        ref: vi.fn(),
        inView: true,
      };
    });

    renderHook(() =>
      useInfiniteScroll({
        onLoadMore: mockOnLoadMore,
        hasMore: false,
      }),
    );

    if (capturedOnChange) {
      act(() => {
        capturedOnChange?.(true);
      });

      act(() => {
        capturedOnChange?.(true);
      });
    }

    expect(mockOnLoadMore).not.toHaveBeenCalled();
  });
});
