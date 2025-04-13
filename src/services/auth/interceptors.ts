import { ResponseSuccessInterceptor, ResponseErrorInterceptor } from "rest-api-client";
import { toast } from "sonner"; // Optionnel, pour les notifications

export const authResponseSuccessInterceptor: ResponseSuccessInterceptor[] = [
   (response) => {
      // Logging des réponses réussies
      console.log(`[API Success] ${response.status} - ${response.url}`);

      // Option d'affichage de notification de succès pour certaines routes
      const successRoutes = [
         '/auth/login',
         '/auth/register',
         '/auth/logout'
      ];

      if (successRoutes.some(route => response.url.includes(route))) {
         switch (true) {
            case response.url.includes('/login'):
               toast.success('Connexion réussie');
               break;
            case response.url.includes('/register'):
               toast.success('Inscription réussie');
               break;
            case response.url.includes('/logout'):
               toast.success('Déconnexion réussie');
               break;
         }
      }

      return response;
   }
];

export const authResponseErrorInterceptor: ResponseErrorInterceptor[] = [
   (error) => {
      // Logging des erreurs
      console.error('[API Error]', {
         status: error.status,
         url: error.config?.url,
         message: error.message
      });

      // Gestion des différents types d'erreurs
      switch (error.status) {
         case 400:
            toast.error('Requête invalide');
            break;
         case 401:
            toast.error('Non autorisé. Veuillez vous reconnecter.');

            // Redirection vers la page de connexion
            if (typeof window !== 'undefined') {
               window.location.href = '/login';
            }
            break;
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