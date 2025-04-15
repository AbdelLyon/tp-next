import { User, UserSchema } from "@/services/auth/AuthService";
import { Mutation } from "rest-api-client";


export class ProductMutatin extends Mutation<User> {
   constructor () {
      super("/products", UserSchema);
   }
}
