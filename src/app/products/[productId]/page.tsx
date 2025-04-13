import { getProductById } from "@/cache/cacheProduct";
import { IconArrowLeft } from "x-react/icons";

import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.productId);

  return {
    title: `${product.title} | Shop`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Shop`,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

const ProductDetailsPage = async () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 px-4 p-3 border border-border rounded-lg bg-content1 text-sm font-medium hover:opacity-80 transition-colors duration-200 mb-6"
    >
      <IconArrowLeft size={14} strokeWidth={2.5} />
      <span>Back to products</span>
    </Link>
  );
};

export default ProductDetailsPage;
