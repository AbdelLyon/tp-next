"use client";

import { Tabs, type TabItem } from "x-react/tabs";
import { IconCheck, IconStar, IconSortZA } from "x-react/icons";

import { Button } from "@/components/ui/button";
import { ProductModel } from "@/types/product";

interface ProductInfoTabsProps {
  product: ProductModel;
}

export const ProductInfoTabs = ({ product }: ProductInfoTabsProps) => {
  const tabs: TabItem[] = [
    {
      key: "details",
      title: "Details",
      content: <DetailsTab description={product.description} />,
      titleValue: "Product Details", // tooltip
    },
    {
      key: "specifications",
      title: "Specifications",
      content: <SpecificationsTab product={product} />,
      titleValue: "Technical Specifications", // tooltip
    },
    {
      key: "reviews",
      title: "Reviews",
      content: <ReviewsTab />,
      titleValue: "Customer Reviews", // tooltip
    },
  ];

  const handleTabChange = (key: string) => {
    console.log(`Active tab: ${key}`);
  };

  return (
    <Tabs
      items={tabs}
      defaultActiveTab="details"
      onTabChange={handleTabChange}
      color="primary"
      variant="bordered"
      radius="md"
    />
  );
};

// Les sous-composants restent les mêmes
const DetailsTab = ({ description }: { description: string }) => (
  <div className="bg-content1 p-4">
    <h3 className="font-medium text-lg mb-3">Product Details</h3>
    <div className="space-y-4">
      <p>{description}</p>
      <p>{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 text-primary">
            <IconSortZA className="h-5 w-5" />
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
            <IconCheck className="h-5 w-5" />
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
  <div className="space-y-3 bg-content1 rounded-lg overflow-hidden">
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
            <IconStar className="h-3 w-3 ml-1 text-amber-400 fill-amber-400" />
          </>
        ) : (
          "N/A"
        )}
      </span>
    </div>
  </div>
);

const ReviewsTab = () => (
  <div className="flex flex-col items-center justify-center p-10 text-center opacity-80 rounded-lg">
    <div className="h-16 w-16 rounded-full mb-4 flex items-center justify-center">
      <IconStar className="h-8 w-8" />
    </div>
    <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
    <p className="max-w-md mb-6">
      Be the first to share your experience with this product. Your feedback
      helps others make better purchase decisions.
    </p>
    <Button className="bg-primary hover:bg-primary/90">Write a Review</Button>
  </div>
);
