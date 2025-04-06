import { productService } from "@/services/ProductService";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = await params;
  const product = await productService.getProductById(
    Number(resolvedParams.productId),
  );

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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200 mb-6"
    >
      <ArrowLeft size={14} strokeWidth={2.5} />
      <span>Back to products</span>
    </Link>
  );
};

export default ProductDetailsPage;
