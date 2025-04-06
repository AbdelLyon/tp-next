import { Product } from "./Product";
import { ProductModel } from "../../../types/product";
import { cn } from "@/lib/utils";
type ProductsProps = {
  products: ProductModel[];
  className?: string;
};

export const Products = ({ products, className }: ProductsProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        className,
      )}
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
