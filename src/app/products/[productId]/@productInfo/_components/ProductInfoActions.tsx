"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";

export const ProductInfoActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8" data-testid="product-actions">
      <Button
        size="lg"
        className="font-medium bg-primary hover:opacity-80 shadow-sm hover:shadow transition-all duration-300 rounded-lg"
        data-testid="add-to-cart-button"
        onClick={() => console.log("Add to cart button clicked")}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="font-medium border-primary text-primary hover:opacity-80 transition-colors duration-300 rounded-lg"
        data-testid="buy-now-button"
        onClick={() => console.log("Buy now button clicked")}
      >
        Buy Now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
