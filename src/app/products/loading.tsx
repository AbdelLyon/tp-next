import { PageContainer } from "@/components/shared/PageContainer";
import { ProductsSkeleton } from "./_components/ProductSkeleton";

const Loading = () => {
  return (
    <PageContainer>
      <ProductsSkeleton />;
    </PageContainer>
  );
};

export default Loading;
