import { HttpClient, HttpConfig, MutationRequest, RelationDefinition } from "rest-api-client";
import { ProductQuery } from "./products/ProductQuery";
import { requestInterceptors, responseErrorInterceptors, responseSuccessInterceptors } from "./interceptors";
import { ProductMutatin } from "./products/ProductMutation";
import { Site, User, Client, Contact, Department } from "@/models";

type UserAttributes = Pick<User, 'firstname' | 'lastname' | 'email'>;
interface RolesAttributes {
   name: "Admin" | "Manager" | "Comercial";
}
type SiteAttributes = Omit<Site, 'id'>;
type ClientAttributes = Omit<Client, 'id'>;
type ContactAttributes = Omit<Contact, 'id' | 'client_id'>;
type DepartmentAttributes = Omit<Department, 'id' | 'site_id'>;


interface UserRelations {
   client: RelationDefinition<ClientAttributes> & {
      relations?: {
         site: RelationDefinition<SiteAttributes> & {
            relations?: {
               departments: RelationDefinition<DepartmentAttributes> | Array<RelationDefinition<DepartmentAttributes>>;
            };
         };
         contacts: RelationDefinition<ContactAttributes> | Array<RelationDefinition<ContactAttributes>>;
      };
   };
   roles: RelationDefinition<RolesAttributes>;
}

const httpConfig: HttpConfig = {
   baseURL: "https://dummyjson.com",
   timeout: 10000,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   maxRetries: 2,
   interceptors: {
      request: requestInterceptors,
      response: {
         success: responseSuccessInterceptors,
         error: responseErrorInterceptors
      }
   }
};

HttpClient.init({ httpConfig, instanceName: "api" });



const mutationRequest: MutationRequest<UserAttributes, UserRelations> = {
   mutate: [{
      operation: "update",
      key: "mlkds",
      attributes: {
         email: "test@gmail.com",
         firstname: 'majax',
         lastname: "abdel",
      },
      relations: {
         client: {
            operation: "update",
            key: "smdlk",
            attributes: {
               addresse: "123 Rue du Commerce",
               name: "Entreprise ABC"
            },
            relations: {
               site: {
                  operation: "update",
                  key: "mmsdlk",

                  attributes: {
                     name: "Siège social"
                  },
                  relations: {
                     departments: {
                        operation: "detach",
                        key: "lmqksd",
                     }
                  }
               },
               contacts:
               {
                  operation: "update",
                  key: "mlskd",
                  attributes: {
                     firstname: "Jean",
                     lastname: "Dupont",
                     email: "jean.dupont@entrepriseabc.com",
                     position: "Directeur Commercial",
                  }
               },
            }
         },
         roles: {
            operation: "update",
            key: "msdk",
            attributes: {
               name: "Comercial"
            }
         }
      }
   }]
};

export const productQueryService = new ProductQuery();
export const productMutationService = new ProductMutatin();
productMutationService.mutate(mutationRequest);