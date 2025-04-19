// src/api/ApiService.ts
import { HttpConfig } from "rest-api-client/http";
import { requestInterceptors, responseErrorInterceptors, responseSuccessInterceptors } from "./interceptors";

export const apiConfig: HttpConfig = {
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
