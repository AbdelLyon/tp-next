import { productService } from "@/services/ProductService";
import { ProductInfoGallery } from "./ProductInfoGallery";
import { ProductInfoHeader } from "./ProductInfoHeader";
import { ProductInfoPricing } from "./ProductInfoPricing";
import { ProductInfoDetails } from "./ProductInfoDetails";
import { ProductInfoActions } from "./ProductInfoActions";
import { ProductInfoShipping } from "./ProductInfoShipping";
import { ProductInfoTabs } from "./ProductInfoTabs";

const ProductInfo = async ({ productId }: { productId: string }) => {
  const product = await productService.getProductById(productId);

  const originalPrice = product.discountPercentage
    ? product.price * (1 + product.discountPercentage / 100)
    : 0;

  const stockLevel =
    product.stock !== undefined
      ? product.stock > 20
        ? "high"
        : product.stock > 5
        ? "medium"
        : product.stock > 0
        ? "low"
        : "out"
      : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <ProductInfoGallery
          thumbnail={product.thumbnail}
          title={product.title}
          discountPercentage={product.discountPercentage}
        />

        <div className="flex flex-col">
          <ProductInfoHeader
            brand={product.brand}
            title={product.title}
            rating={product.rating}
            stockLevel={stockLevel}
            stock={product.stock}
          />

          <ProductInfoPricing
            price={product.price}
            originalPrice={originalPrice}
            discountPercentage={product.discountPercentage}
          />

          <ProductInfoDetails
            description={product.description}
            tags={product.tags}
          />

          <ProductInfoActions />

          <ProductInfoShipping />
        </div>
      </div>

      <div className="px-6 pb-6">
        <ProductInfoTabs product={product} />
      </div>
    </>
  );
};

export default ProductInfo;
