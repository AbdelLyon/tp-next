import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, vi, beforeAll, afterEach } from "vitest";
import { Product } from "../_components/Product";
import { productService } from "@/services/ProductService";
import { ProductModel } from "@/types/product";
import { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  unoptimized?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
  "data-testid"?: string;
};

type BadgeProps = CommonProps & {
  variant?: string;
  "data-variant"?: string;
};

vi.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
    />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ href, className, children }: LinkProps) => (
    <a href={href} className={className} data-testid="product-card">
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: CommonProps) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children, className }: CommonProps) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className }: CommonProps) => (
    <div data-testid="card-title" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: CommonProps) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant, className }: BadgeProps) => (
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

type MockProductService = {
  getProducts: ReturnType<typeof vi.fn>;
  getProductById: ReturnType<typeof vi.fn>;
};

vi.mock("@/services/ProductService", () => ({
  productService: {
    getProducts: vi.fn(),
    getProductById: vi.fn(),
  } as MockProductService,
}));

describe("<ProductCard />", () => {
  const mockProduct: ProductModel = {
    id: 1,
    title: "iPhone 13",
    description: "Latest iPhone model with A15 Bionic chip",
    price: 999,
    rating: 4.5,
    brand: "Apple",
    thumbnail: "https://example.com/image.jpg",
    discountPercentage: 10,
    category: "smartphones",
    stock: 50,
    images: [],
  };

  beforeAll(() => {
    (
      productService.getProductById as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockProduct);

    (productService.getProducts as ReturnType<typeof vi.fn>).mockResolvedValue({
      products: [mockProduct],
      total: 1,
      limit: 10,
      skip: 0,
    });
  });

  afterEach(() => {
    cleanup();
  });

  test("Devrait se rendre correctement dans le DOM", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });

  test("Devrait contenir les composants Card, CardHeader et CardContent", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
  });

  test("Devrait avoir les classes CSS appropriées sur le lien principal", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("product-card")).toHaveClass(
      "block h-full no-underline",
    );
  });

  test("Devrait rediriger vers la page détaillée du produit avec l'ID correct", () => {
    render(<Product product={mockProduct} />);
    expect(screen.getByTestId("product-card")).toHaveAttribute(
      "href",
      `/products/${mockProduct.id}`,
    );
  });

  test("Devrait afficher le titre du produit", () => {
    render(<Product product={mockProduct} />);

    const title = screen.getByText(mockProduct.title);
    expect(title).toBeInTheDocument();

    const cardTitle = screen.getByTestId("card-title");
    expect(cardTitle).toHaveClass("text-sm font-medium truncate");
    expect(cardTitle).toHaveTextContent(mockProduct.title);
  });

  test("Ne devrait pas afficher la note si elle n'existe pas", () => {
    const productWithoutRating = { ...mockProduct, rating: 0 };
    render(<Product product={productWithoutRating} />);
    const rating = screen.queryByText(/★/);
    expect(rating).not.toBeInTheDocument();
    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();
  });

  test("Devrait afficher la note si elle existe", () => {
    render(<Product product={mockProduct} />);

    const rating = screen.getByText(`★ ${mockProduct.rating.toFixed(1)}`);
    expect(rating).toBeInTheDocument();

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveAttribute("data-variant", "outline");
    expect(badge).toHaveClass("text-xs scale-90");
  });

  test("Ne devrait pas afficher l'image miniature si elle n'existe pas", () => {
    const productWithoutThumbnail = { ...mockProduct, thumbnail: "" };
    render(<Product product={productWithoutThumbnail} />);

    const thumbnail = screen.queryByTestId("next-image");
    expect(thumbnail).not.toBeInTheDocument();
  });

  test("Devrait afficher l'image miniature si elle existe", () => {
    render(<Product product={mockProduct} />);

    const thumbnail = screen.getByTestId("next-image");
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute("src", mockProduct.thumbnail);
    expect(thumbnail).toHaveAttribute("alt", mockProduct.title);
    expect(thumbnail).toHaveAttribute("width", "100");
    expect(thumbnail).toHaveAttribute("height", "100");
    expect(thumbnail).toHaveClass("object-cover w-full h-full");
  });

  test("Devrait avoir un conteneur d'image correctement stylisé", () => {
    render(<Product product={mockProduct} />);

    const image = screen.getByTestId("next-image");
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveClass(
      "size-40 mx-auto relative overflow-hidden rounded",
    );
  });

  test("Devrait afficher la description du produit avec troncature", () => {
    render(<Product product={mockProduct} />);

    const description = screen.getByText(mockProduct.description);
    expect(description).toBeInTheDocument();

    expect(description).toHaveClass("text-xs text-gray-700 line-clamp-2");
  });

  test("Devrait afficher le prix du produit correctement formaté", () => {
    render(<Product product={mockProduct} />);

    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toBeInTheDocument();

    expect(price).toHaveClass("font-medium mt-2");
  });

  test("Devrait afficher le pourcentage de réduction si celui-ci existe", () => {
    render(<Product product={mockProduct} />);

    const discount = screen.getByText(
      `-${mockProduct.discountPercentage!.toFixed(0)}%`,
    );
    expect(discount).toBeInTheDocument();

    expect(discount).toHaveClass("ml-1 text-xs text-green-600");
  });

  test("Ne devrait pas afficher le pourcentage de réduction s'il n'existe pas", () => {
    const productWithoutDiscount = { ...mockProduct, discountPercentage: 0 };
    render(<Product product={productWithoutDiscount} />);

    const discount = screen.queryByText(/-0%/);
    expect(discount).not.toBeInTheDocument();

    cleanup();
    const productWithUndefinedDiscount: ProductModel = {
      ...mockProduct,
      discountPercentage: undefined,
    };
    render(<Product product={productWithUndefinedDiscount} />);

    const undefinedDiscount = screen.queryByText(/-\d+%/);
    expect(undefinedDiscount).not.toBeInTheDocument();
  });

  test("Devrait avoir les bonnes classes CSS sur le composant Card", () => {
    render(<Product product={mockProduct} />);

    const card = screen.getByTestId("card");
    expect(card).toHaveClass(
      "h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-200",
    );
  });

  test("Devrait avoir les bonnes classes CSS sur le CardHeader", () => {
    render(<Product product={mockProduct} />);

    const header = screen.getByTestId("card-header");
    expect(header).toHaveClass("pb-1 pt-3 px-3");
  });

  test("Devrait avoir les bonnes classes CSS sur le CardContent", () => {
    render(<Product product={mockProduct} />);

    const content = screen.getByTestId("card-content");
    expect(content).toHaveClass("py-2 px-3");
  });

  test("Devrait gérer correctement un titre très long avec troncature", () => {
    const productWithLongTitle: ProductModel = {
      ...mockProduct,
      title:
        "This is an extremely long product title that should be truncated in the display to ensure proper layout and aesthetics".repeat(
          2,
        ),
    };

    render(<Product product={productWithLongTitle} />);

    const title = screen.getByTestId("card-title");
    expect(title).toHaveClass("truncate");
    expect(title).toHaveTextContent(productWithLongTitle.title);
  });

  test("Devrait gérer correctement une description très longue avec troncature", () => {
    const productWithLongDescription: ProductModel = {
      ...mockProduct,
      description:
        "This is an extremely long product description that should be truncated to just two lines in the display. ".repeat(
          10,
        ),
    };

    render(<Product product={productWithLongDescription} />);

    const description = screen.getByText(
      /This is an extremely long product description/,
    );
    expect(description).toHaveClass("line-clamp-2");
  });
});
