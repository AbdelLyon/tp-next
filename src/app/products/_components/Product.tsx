import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ProductModel } from "@/types/product";
import Link from "next/link";

export const Product = ({ product }: { product: ProductModel }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full no-underline"
    >
      <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-1 pt-3 px-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-sm font-medium truncate">
              {product.title}
            </CardTitle>
            {product.rating && (
              <Badge variant="outline" className="text-xs scale-90">
                ★ {product.rating.toFixed(1)}
              </Badge>
            )}
          </div>
        </CardHeader>

        {product.thumbnail && (
          <div className="px-3 py-1">
            <div className="size-40 mx-auto relative overflow-hidden rounded">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={100}
                height={100}
                unoptimized={true}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        <CardContent className="py-2 px-3">
          <p className="text-xs text-gray-700 line-clamp-2">
            {product.description}
          </p>
          <p className="font-medium mt-2">
            ${product.price.toFixed(2)}
            {product.discountPercentage && (
              <span className="ml-1 text-xs text-green-600">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
