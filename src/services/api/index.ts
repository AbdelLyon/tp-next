import { UserQuery } from "./users/UserQuery";
import { UserMutatin } from "./users/UserMutation";
// import { Client, Department, Role, Site, User } from "@/models";
import { ApiService } from "./ApiService";


// Initialisation de l'API au premier import de ce module
ApiService.initialize();

export const userQueryService = new UserQuery();
export const userMutationService = new UserMutatin();
