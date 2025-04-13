import { HttpClient, HttpConfig } from "rest-api-client";
import { ProductQuery } from "./products/ProductQuery";
import { requestInterceptors, responseErrorInterceptors, responseSuccessInterceptors } from "./interceptors";

const httpConfig: HttpConfig = {
   baseURL: "https://dummyjson.com",
   timeout: 10000,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   maxRetries: 2,
   // 5. Combiner tous les intercepteurs
   interceptors: {
      request: requestInterceptors,
      response: {
         success: responseSuccessInterceptors,
         error: responseErrorInterceptors
      }
   }

};

// 6. Initialiser le client HTTP
HttpClient.init({ httpConfig, instanceName: "api" });

// 8. Exporter le service qui utilise le client HTTP
export const productQueryService = new ProductQuery();