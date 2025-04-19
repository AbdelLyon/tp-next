import { UserQuery } from "./users/UserQuery";
import { UserMutatin } from "./users/UserMutation";
import { Client, Department, Role, Site, User } from "@/models";
import { ApiService } from "./ApiService";


// Initialisation de l'API au premier import de ce module
ApiService.initialize();

export const userQueryService = new UserQuery();
export const userMutationService = new UserMutatin();

// Récupération des détails de configuration pour les utilisateurs
export const details = userQueryService.details();

// Exemple de recherche d'utilisateurs sans filtres (retourne tous les utilisateurs)
export const search = userQueryService.search({});

// Exemple de suppression d'un utilisateur par son ID
userMutationService.delete({
   resources: ['USR-12345']
});

/**
* Exemple de création d'un utilisateur avec relations complexes
* Cette requête crée un utilisateur complet avec toutes ses relations associées
* en une seule opération de mutation
*/
export const mutationRequest = userMutationService.entityBuilder()
   .createEntity<User, 'department' | 'client' | 'roles'>({
      firstname: "Alice",
      lastname: "Smith",
      email: "alice.smith@example.com",
      phone_number: "+33612345678",
      id: "USR-54321",

      // Relation avec le département
      department: userMutationService.relationBuilder().createRelation<Department>({
         code: "IT-DEV",
         id: "DEP-789",
         name: "Développement",
         site_id: "SITE-001",
      }),

      // Relation avec le client qui contient lui-même une relation avec un site
      client: userMutationService.relationBuilder().createRelation<Client, 'site'>({
         addresse: "42 rue des Serveurs, 69000 Lyon",
         id: "CLI-456",
         name: "TechSolutions SAS",

         // Relation imbriquée avec le site
         site: userMutationService.relationBuilder().createRelation<Site>({
            id: 'SITE-123',
            name: 'Siège Social Lyon'
         })
      }),

      // Relation avec les rôles de l'utilisateur
      roles: userMutationService.relationBuilder().createRelation<Role>({
         name: "Manager",
         id: "2"
      })
   }).mutate(); // Exécution immédiate de la mutation
