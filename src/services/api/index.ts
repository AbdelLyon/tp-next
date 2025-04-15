import { HttpClient, HttpConfig, ModelAttributes, MutationRequest, RelationDefinition } from "rest-api-client";
import { ProductQuery } from "./products/ProductQuery";
import { requestInterceptors, responseErrorInterceptors, responseSuccessInterceptors } from "./interceptors";
import { ProductMutatin } from "./products/ProductMutation";

// Définition des attributs de chaque entité
interface UserAttributes extends ModelAttributes {
   email: string;
   username: string;
   roles: string;
}

interface ApplicationAttributes extends ModelAttributes {
   domain: string;
   name: string;
   id: string;
}

interface ProfileAttributes extends ModelAttributes {
   id: string;
   role: string;
}

interface ClientAttributes extends ModelAttributes {
   name: string;
   age: number;

}


// Relations application avec client imbriqué
interface ApplicationRelations extends Record<string, unknown> {
   client: RelationDefinition<ClientAttributes, Record<string, unknown>>;
   profiles: RelationDefinition<ProfileAttributes, Record<string, unknown>>;

}

// Relations utilisateur avec applications et profils imbriqués
interface UserRelations extends Record<string, unknown> {
   applications: RelationDefinition<ApplicationAttributes, ApplicationRelations>;
   profiles: RelationDefinition<ProfileAttributes, Record<string, unknown>>;
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

// Initialiser le client HTTP
HttpClient.init({ httpConfig, instanceName: "api" });

// Exporter le service qui utilise le client HTTP
export const productQueryService = new ProductQuery();
export const productMutationService = new ProductMutatin();

// Création de la requête de mutation - version corrigée
const mutationRequest: MutationRequest<UserAttributes, UserRelations> = {
   mutate: [{
      operation: "create",
      attributes: {
         email: "test@gmail.com",
         username: 'name',
         roles: "Admin"
      },
      relations: {
         applications: {
            operation: "create",
            attributes: {
               domain: 'domain',
               id: "lkj",
               name: "appp"
            },
            relations: {
               client: {
                  operation: "create",
                  attributes: { age: 34, name: "client" }
               },
               profiles: {
                  operation: "attach",
                  key: "8"
               }
            }
         },
         profiles: {
            operation: "create",
            attributes: { id: "lsk", role: "mqslkm" }

         }
      }
   }]
};

// Exécution de la mutation
productMutationService.mutate(mutationRequest);