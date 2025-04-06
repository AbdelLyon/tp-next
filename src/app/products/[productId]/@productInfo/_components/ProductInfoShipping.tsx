import { Truck, Shield, Package } from "lucide-react";

export const ProductInfoShipping = () => {
  return (
    <div
      className="mt-8 space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100"
      data-testid="shipping-info"
    >
      <div className="flex items-center gap-3 text-sm">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Truck className="h-4 w-4" />
        </div>
        <span>Free shipping on orders over $50</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Shield className="h-4 w-4" />
        </div>
        <span>30-day money-back guarantee</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Package className="h-4 w-4" />
        </div>
        <span>Secure packaging and delivery</span>
      </div>
    </div>
  );
};
