import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { ProductInfoSkeleton } from "../_components/ProductInfoSkeleton";

interface SkeletonProps {
  className?: string;
}

interface SeparatorProps {
  className?: string;
}

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

// Mocks pour les composants utilisés
vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: SkeletonProps) => (
    <div data-testid="skeleton" className={className}></div>
  ),
}));

vi.mock("@/components/ui/separator", () => ({
  Separator: ({ className }: SeparatorProps) => (
    <hr data-testid="separator" className={className} />
  ),
}));

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ defaultValue, children }: TabsProps) => (
    <div data-testid="tabs" data-default-value={defaultValue}>
      {children}
    </div>
  ),
  TabsList: ({ className, children }: TabsListProps) => (
    <div data-testid="tabs-list" className={className}>
      {children}
    </div>
  ),
  TabsTrigger: ({ value, children }: TabsTriggerProps) => (
    <button data-testid={`tabs-trigger-${value}`} data-value={value}>
      {children}
    </button>
  ),
  TabsContent: ({ value, className, children }: TabsContentProps) => (
    <div
      data-testid={`tabs-content-${value}`}
      data-value={value}
      className={className}
    >
      {children}
    </div>
  ),
}));

describe("ProductInfoSkeleton", () => {
  it("devrait correspondre au snapshot", () => {
    const { container } = render(<ProductInfoSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
