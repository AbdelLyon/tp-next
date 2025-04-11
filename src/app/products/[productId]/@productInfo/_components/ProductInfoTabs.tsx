import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductModel } from "@/types/product";

interface ProductInfoTabsProps {
  product: ProductModel;
}

export const ProductInfoTabs = ({ product }: ProductInfoTabsProps) => {
  return (
    <Tabs defaultValue="details" className="mt-6" data-testid="product-tabs">
      <TabsList className="grid w-full grid-cols-3 rounded-lg bg-content1 p-1">
        <TabsTrigger
          value="details"
          className="rounded-md data-[state=active]:bg-content2 data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className="rounded-md data-[state=active]:bg-content2 data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-md data-[state=active]:bg-content2 data-[state=active]:text-primary data-[state=active]:shadow-sm"
        >
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="pt-2">
        <DetailsTab description={product.description} />
      </TabsContent>

      <TabsContent value="specifications" className="pt-2">
        <SpecificationsTab product={product} />
      </TabsContent>

      <TabsContent value="reviews" className="pt-2">
        <ReviewsTab />
      </TabsContent>
    </Tabs>
  );
};

// Sous-composants pour chaque onglet
const DetailsTab = ({ description }: { description: string }) => (
  <div className="bg-content1 p-4">
    <h3 className="font-medium text-lg mb-3">Product Details</h3>
    <div className="space-y-4">
      <p>{description}</p>
      <p>{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Premium Quality</h4>
            <p className="text-sm">
              Experience superior craftsmanship and durability with our
              high-quality materials.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 text-primary">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Customer Satisfaction</h4>
            <p className="text-sm">
              Our products are backed by exceptional customer service and
              support.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SpecificationsTab = ({ product }: { product: ProductModel }) => (
  <>
    <h3 className="font-medium text-lg mb-4">Technical Specifications</h3>
    <div className="space-y-3 bg-content2 rounded-lg border border-default-200 overflow-hidden">
      <div className="grid grid-cols-2 gap-4 p-3 hover:opacity-80 transition-colors">
        <span className="font-medium">Brand</span>
        <span className="font-medium">{product.brand || "N/A"}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 p-3 hover:opacity-80 transition-colors">
        <span className="font-medium">Category</span>
        <span className="font-medium">{product.category || "N/A"}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 p-3 hover:opacity-80 transition-colors">
        <span className="font-medium">Warranty</span>
        <span className="font-medium">12 Months</span>
      </div>
      <div className="grid grid-cols-2 gap-4 p-3 hover:opacity-80 transition-colors">
        <span className="font-medium">In Stock</span>
        <span className="font-medium">{product.stock || 0} units</span>
      </div>
      <div className="grid grid-cols-2 gap-4 p-3 hover:opacity-80 transition-colors">
        <span className="font-medium">Rating</span>
        <span className="font-medium flex items-center">
          {product.rating ? (
            <>
              {product.rating.toFixed(1)}
              <Star className="h-3 w-3 ml-1 text-amber-400 fill-amber-400" />
            </>
          ) : (
            "N/A"
          )}
        </span>
      </div>
    </div>
  </>
);

const ReviewsTab = () => (
  <div className="flex flex-col items-center justify-center p-10 text-center opacity-80 rounded-lg border border-default-200">
    <div className="h-16 w-16 rounded-full  mb-4 flex items-center justify-center">
      <Star className="h-8 w-8" />
    </div>
    <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
    <p className="max-w-md mb-6">
      Be the first to share your experience with this product. Your feedback
      helps others make better purchase decisions.
    </p>
    <Button className="bg-primary hover:bg-primary/90">Write a Review</Button>
  </div>
);
