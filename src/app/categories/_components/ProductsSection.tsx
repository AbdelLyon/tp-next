import { Products } from "@/app/products/_components/Products";
import { ProductModel } from "@/types/product";
type ProductsSectionProps = {
  products: ProductModel[];
  category?: string | string[];
};

const ProductsSection = async ({
  products,
  category,
}: ProductsSectionProps) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {category ? `Produits dans "${category}"` : "Produits populaires"}
        </h2>
        <p className="text-sm text-gray-600">
          {products.length} produits trouvés
        </p>
      </div>
      <Products
        products={products}
        className="md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-full overflow-y-auto"
      />
    </>
  );
};

export default ProductsSection;
