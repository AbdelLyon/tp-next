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
        <div className="col-span-2 rounded-2xl border dark:bg-content2 border-default-200 shadow-sm overflow-hidden">
          {productInfo}
        </div>
        <div className="rounded-lg shadow-sm ">{relatedProducts}</div>
      </div>
    </PageContainer>
  );
}
