import { PageContainer } from "@/components/shared/PageContainer";

export default function CategoriesLayout({
  children,
  categoryList,
  productsByCategory,
}: {
  children: React.ReactNode;
  categoryList: React.ReactNode;
  productsByCategory: React.ReactNode;
}) {
  return (
    <PageContainer>
      {children}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">{categoryList}</div>
        <div className="lg:col-span-3">{productsByCategory}</div>
      </div>
    </PageContainer>
  );
}
