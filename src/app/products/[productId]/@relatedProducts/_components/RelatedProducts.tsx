// RelatedProducts.tsx
import { productService } from "@/services/ProductService";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductModel } from "@/types/product";
import { RelatedProductsList } from "./RelatedProductsList";
import { RelatedProductsHeader } from "./RelatedProductsHeader";
import { RelatedtCategoryList } from "./RelatedtCategoryList";

const RelatedProducts = async ({ productId }: { productId: string }) => {
  // Fonction isolée pour récupérer les produits associés
  // Cette fonction peut être facilement mockée pour les tests
  async function getRelatedProductsData(
    id: string,
  ): Promise<Array<ProductModel>> {
    const data = await productService.getProducts();
    return data.products
      .filter((product) => product.id !== Number(id))
      .slice(0, 4);
  }

  const relatedProducts = await getRelatedProductsData(productId);

  return (
    <>
      <RelatedProductsHeader
        title="You may also like"
        actionLink="/products"
        actionText="View all"
        icon={<ChevronRight className="h-3 w-3" />}
      />

      <RelatedProductsList products={relatedProducts} />

      <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <RelatedtCategoryList
        title="Popular Categories"
        categories={["Electronics", "Smartphones", "Laptops", "Beauty"]}
      />
    </>
  );
};

export default RelatedProducts;
