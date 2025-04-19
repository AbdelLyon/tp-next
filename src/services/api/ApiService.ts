// src/api/ApiService.ts
import { HttpClient } from "rest-api-client/http";
import { apiConfig } from "./apiConfig";

export class ApiService {
   private static initialized = false;

   static initialize(): void {
      if (this.initialized) return;

      HttpClient.init({ httpConfig: apiConfig, instanceName: "api" });
      this.initialized = true;
      console.log('API initialized');
   }
}