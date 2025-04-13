import { RequestConfig, RequestInterceptor, ResponseErrorInterceptor, ResponseSuccessInterceptor } from "rest-api-client";
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export const requestInterceptors: RequestInterceptor[] = [
   async (config: RequestConfig) => {
      console.log({ requestInterceptor: config });

      // Exclure certaines routes de l'ajout automatique du token
      const excludedRoutes = [
         '/auth/login',
         '/auth/register',
         '/auth/refresh-token'
      ];

      if (excludedRoutes.some(route => config.url.includes(route))) {
         return config;
      }


      let token: string | undefined;


      // Côté client, utiliser js-cookie pour obtenir le token
      token = Cookies.get('access_token');

      // Côté serveur, obtenir le token depuis l'API de cookies de Next.js
      try {
         token = Cookies.get('access_token');
      } catch (error) {
         console.error("Erreur lors de l'accès aux cookies:", error);
      }


      // Ajouter le token s'il existe
      if (token) {
         config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
         };
      }

      return config;
   }
];

export const responseErrorInterceptors: ResponseErrorInterceptor[] = [
   (error) => {
      console.error('API Error:', {
         status: error.status,
         url: error.config?.url,
         message: error.message
      });

      // Gestion des erreurs de réseau
      if (!error.response) {
         toast.error('Problème de connexion. Vérifiez votre réseau.');
         return Promise.reject(error);
      }

      // Gestion des erreurs d'authentification
      if (error.status === 401) {
         toast.error('Session expirée. Veuillez vous reconnecter.');

         // Suppression des tokens
         Cookies.remove('access_token');
         Cookies.remove('refresh_token');

         // Redirection vers la page de connexion
         if (typeof window !== 'undefined') {
            window.location.href = '/login';
         }
      }

      // Gestion d'autres types d'erreurs
      switch (error.status) {
         case 403:
            toast.error('Accès refusé');
            break;
         case 404:
            toast.error('Ressource non trouvée');
            break;
         case 500:
            toast.error('Erreur serveur. Réessayez plus tard.');
            break;
         default:
            toast.error('Une erreur est survenue');
      }

      return Promise.reject(error);
   }
];

export const responseSuccessInterceptors: ResponseSuccessInterceptor[] = [
   (response) => {
      console.log(`[API] Réponse ${response.status} de ${response.url}`);

      // Option d'ajouter des logs ou des notifications pour des routes spécifiques
      const logRoutes = [
         '/some/specific/route'
      ];

      if (logRoutes.some(route => response.url.includes(route))) {
         toast.success('Action réussie');
      }

      return response;
   }
];