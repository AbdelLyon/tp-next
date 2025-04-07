import { ServerError } from "@/errors/SercerError";

// Ensuite, modifiez votre BaseService
export abstract class BaseService {
   protected baseUrl: string;

   constructor (baseUrl: string) {
      this.baseUrl = baseUrl;
   }

   protected async get<T>(endpoint: string): Promise<T> {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
         if (response.status === 500) {
            throw new ServerError(
               `Le serveur a rencontré une erreur interne (${response.status})`,
               500
            );
         }

         throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      return await response.json() as T;
   }
}