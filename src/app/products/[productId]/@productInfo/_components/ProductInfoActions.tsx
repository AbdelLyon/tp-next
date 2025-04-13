"use client";
import { Button } from "x-react/button";
import { IconShoppingCartCopy, IconArrowRight } from "x-react/icons";

export const ProductInfoActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8" data-testid="product-actions">
      <Button
        size="lg"
        data-testid="add-to-cart-button"
        onPress={() => console.log("Add to cart button clicked")}
        startContent={<IconShoppingCartCopy className="mr-2 h-4 w-4" />}
      >
        Add to Cart
      </Button>
      <Button
        size="lg"
        variant="bordered"
        data-testid="buy-now-button"
        onPress={() => console.log("Buy now button clicked")}
        startContent={<IconArrowRight className="ml-2 h-4 w-4" />}
      >
        Buy Now
      </Button>
    </div>
  );
};
