import { User, UserSchema } from "@/models";
import { Query } from "rest-api-client/query";

export class UserQuery extends Query<User> {
   constructor () {
      super("/users", UserSchema);
   }
}
