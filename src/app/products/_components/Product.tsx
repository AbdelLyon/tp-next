import { ProductModel } from "@/types/product";
import Link from "next/link";
import { Image } from "x-react/image";
import { Card } from "x-react/card";
import { Chip } from "x-react/chip";

export const Product = ({ product }: { product: ProductModel }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full no-underline group"
    >
      <Card
        className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 border border-border hover:shadow-xl"
        title={product.title}
      >
        <div className="flex flex-col flex-grow space-y-4">
          <div className=" bg-content1  rounded-t-lg w-full flex justify-center ">
            <Image
              src={product.thumbnail}
              alt={product.title}
              className="transition-transform duration-500 group-hover:scale-105"
              width={170}
              height={170}
              radius="full"
              loading="lazy"
              sizes="200px"
            />
          </div>
          <div className="flex justify-between w-full">
            {product.discountPercentage && (
              <Chip className="bg-green-500 hover:bg-green-600 font-medium px-2 py-1">
                -{product.discountPercentage.toFixed(0)}%
              </Chip>
            )}
            {product.rating && (
              <Chip className="font-medium border border-border  ">
                <span className="text-amber-500 mr-1">★</span>
                {product.rating.toFixed(1)}
              </Chip>
            )}
          </div>
          <h2 className="text-lg font-semibold line-clamp-1 group-hover:text-primary mb-2 transition-colors duration-200">
            {product.title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-2 mt-2 flex-grow">
            {product.description}
          </p>

          <div className="mt-3 pt-3 flex justify-end border-t border-border ">
            <p className="font-bold  text-lg">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
