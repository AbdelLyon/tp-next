import { User, UserSchema } from "@/models";
import { Mutation } from "rest-api-client/mutation";


export class UserMutatin extends Mutation<User> {
   constructor () {
      super("/users", UserSchema);
   }

}
