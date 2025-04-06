
export abstract class BaseService {
   protected baseUrl: string;

   constructor (baseUrl: string) {
      this.baseUrl = baseUrl;
   }

   protected async get<T>(endpoint: string): Promise<T> {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {

         throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      return await response.json() as T;
   }

}