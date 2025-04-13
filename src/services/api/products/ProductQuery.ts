import { ProductModel, ProductSchema } from "@/types/product";
import { Query } from "rest-api-client";


export class ProductQuery extends Query<ProductModel> {
   constructor () {
      super("/products", ProductSchema);
   }
}
