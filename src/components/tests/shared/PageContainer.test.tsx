import { PageContainer } from "@/components/shared/PageContainer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("<PageContainer />", () => {
  it("devrait rendre correctement ses enfants", () => {
    render(
      <PageContainer>
        <div data-testid="test-child">Test Content</div>
      </PageContainer>,
    );

    const childElement = screen.getByTestId("test-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Test Content");
  });

  it("devrait avoir les classes CSS appropriées pour assurer la mise en page responsive", () => {
    const { container } = render(
      <PageContainer>
        <div>Test Content</div>
      </PageContainer>,
    );

    const containerDiv = container.firstChild;

    expect(containerDiv).toHaveClass("container mx-auto px-4 sm:px-6 lg:px-8");
  });

  it("devrait s'adapter à différents types de contenu", () => {
    const { rerender } = render(<PageContainer>Simple text</PageContainer>);
    expect(screen.getByText("Simple text")).toBeInTheDocument();

    rerender(
      <PageContainer>
        <h1>Heading</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </PageContainer>,
    );

    expect(screen.getByText("Heading")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
