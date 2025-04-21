"use client";
import { Client, Department, Role, Site, User } from "@/models";
import { userMutationService } from "../services/api/index";
import { useEffect } from "react";
const ProductsPage = () => {
  useEffect(() => {
    // Récupération des détails de configuration pour les utilisateurs
    // export const details = userQueryService.details();

    // Exemple de recherche d'utilisateurs sans filtres (retourne tous les utilisateurs)

    // userQueryService.search({
    //   filters: [
    //     {
    //       field: "test",
    //       operator: "=",
    //       value: "coucou",
    //     },
    //   ],
    // });

    // Exemple de suppression d'un utilisateur par son ID
    // userMutationService.forceDelete({
    //   resources: ["USR-12345"],
    // });

    /**
     * Exemple de création d'un utilisateur avec relations complexes
     * Cette requête crée un utilisateur complet avec toutes ses relations associées
     * en une seule opération de mutation
     */

    userMutationService.model
      .update<User>("mlkm", {
        relations: {
          department: userMutationService.relation.detach("mlk"),
        },
      })
      .mutate();

    userMutationService.model
      .create<User, "department" | "client" | "roles">({
        attributes: {
          firstname: "Alice",
          lastname: "Smith",
          email: "alice.smith@example.com",
          phone_number: "+33612345678",
          id: "USR-54321",
        },
        relations: {
          // Relation avec le département
          // department: userMutationService.relation.attach("smlmsld"),
          department: userMutationService.relation.add<Department>({
            attributes: {
              code: "mlk",
              id: "mlk",
              name: "qsd",
            },
          }),

          // Relation avec le client qui contient lui-même une relation avec un site
          client: userMutationService.relation.add<Client, "site">({
            attributes: {
              addresse: "42 rue des Serveurs, 69000 Lyon",
              id: "CLI-456",
              name: "TechSolutions SAS",
            },
            relations: {
              // Relation imbriquée avec le site
              site: userMutationService.relation.add<Site>({
                attributes: {
                  id: "SITE-123",
                  name: "Siège Social Lyon",
                },
              }),
            },
          }),

          // Relation avec les rôles de l'utilisateur
          roles: userMutationService.relation.add<Role>({
            attributes: {
              id: "1",
              name: "Admin",
            },
          }),
        },
      })
      .mutate();
  }, []);

  return <div className="container mx-auto py-8">HOME</div>;
};

export default ProductsPage;
