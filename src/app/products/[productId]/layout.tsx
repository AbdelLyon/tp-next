import { PageContainer } from "@/components/shared/PageContainer";

export default function Layout({
  children,
  productInfo,
  relatedProducts,
}: {
  children: React.ReactNode;
  productInfo: React.ReactNode;
  relatedProducts: React.ReactNode;
}) {
  return (
    <PageContainer>
      {children}
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          {productInfo}
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6 bg-gradient-to-b from-white to-gray-50">
          {relatedProducts}
        </div>
      </div>
    </PageContainer>
  );
}
