import { HttpClient, HttpConfig } from "rest-api-client/http";

import { AuthService } from "./AuthService";
import { authResponseErrorInterceptor, authResponseSuccessInterceptor } from "./interceptors";

const httpConfig: HttpConfig = {
   baseURL: "https://dummyjson.com",
   timeout: 10000,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   maxRetries: 2,
   interceptors: {

      response: {
         success: authResponseSuccessInterceptor,
         error: authResponseErrorInterceptor
      }
   }
};

HttpClient.init({ httpConfig, instanceName: "auth" });


export const authService = new AuthService();

