import { Auth, RequestConfig } from "rest-api-client";
import Cookies from "js-cookie";
import { z } from "zod";


// Schéma Zod pour l'utilisateur
const UserSchema = z.object({
   id: z.string(),
   username: z.string(),
   email: z.string().email(),
   roles: z.array(z.string()).optional(),
});

const AuthTokensSchema = z.object({
   accessToken: z.string(),
   refreshToken: z.string(),
   expiresAt: z.number()
});

// Type pour les credentials de connexion
const LoginCredentialsSchema = z.object({
   username: z.string(),
   password: z.string()
});

export const RegisterSchema = z.object({
   username: z.string()
      .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
      .max(20, { message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et des underscores" }),

   email: z.string()
      .email({ message: "Adresse email invalide" }),

   password: z.string()
      .min(4, { message: "Le mot de passe doit contenir au moins 12 caractères" }),
   // .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
   // .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule" })
   // .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
   // .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un caractère spécial" }),

   confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
   message: "Les mots de passe ne correspondent pas",
   path: ["confirmPassword"]
});

export type User = z.infer<typeof UserSchema>;
export type AuthTokens = z.infer<typeof AuthTokensSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;


export class AuthService extends Auth<User, LoginCredentials, RegisterData, AuthTokens> {
   constructor () {
      super("/auth", {
         user: UserSchema,
         credentials: LoginCredentialsSchema,
         registerData: RegisterSchema,
         tokens: AuthTokensSchema
      });
   }

   // Override de la méthode login pour stocker les tokens et l'utilisateur
   async login(
      credentials: LoginCredentials,
      options: Partial<RequestConfig> = {}
   ): Promise<{
      user: User;
      tokens: AuthTokens;
   }> {
      const { tokens, user } = await super.login(credentials, options);

      // Stockage des tokens dans les cookies
      this.storeTokens(tokens);

      // Stockage de l'utilisateur dans les cookies
      this.storeUser(user);

      return {
         tokens,
         user
      };
   }

   // Override de la méthode logout pour supprimer les tokens et l'utilisateur
   async logout(
      options: Partial<RequestConfig> = {}
   ): Promise<void> {
      console.log({ options });

      await super.logout(options);

      // Suppression des tokens et de l'utilisateur
      this.removeTokens();
      this.removeUser();
   }

   // Override de refreshToken pour mettre à jour les tokens
   async refreshToken(
      refreshToken: string,
      options: Partial<RequestConfig> = {}
   ): Promise<AuthTokens> {
      const newTokens = await super.refreshToken(refreshToken, options);

      // Mise à jour des tokens
      this.storeTokens(newTokens);

      return newTokens;
   }

   // Override de getCurrentUser pour utiliser les cookies si possible
   async getCurrentUser(
      options: Partial<RequestConfig> = {}
   ): Promise<User> {
      // Tenter de récupérer l'utilisateur depuis les cookies d'abord
      const storedUser = this.getStoredUser();
      if (storedUser) {
         return storedUser;
      }

      // Sinon, appeler la méthode parente
      const user = await super.getCurrentUser(options);

      // Stocker l'utilisateur récupéré
      this.storeUser(user);

      return user;
   }

   // Méthodes utilitaires pour la gestion des cookies

   // Stockage des tokens
   private storeTokens(tokens: AuthTokens): void {
      Cookies.set('access_token', tokens.accessToken, {
         expires: new Date(tokens.expiresAt),
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict'
      });
      Cookies.set('refresh_token', tokens.refreshToken, {
         expires: new Date(tokens.expiresAt),
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict'
      });
   }

   // Suppression des tokens
   private removeTokens(): void {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
   }

   // Stockage de l'utilisateur
   private storeUser(user: User): void {
      Cookies.set('user', JSON.stringify(user), {
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict'
      });
   }

   // Récupération de l'utilisateur stocké
   private getStoredUser(): User | null {
      const userCookie = Cookies.get('user');
      return userCookie ? JSON.parse(userCookie) : null;
   }

   // Suppression de l'utilisateur
   private removeUser(): void {
      Cookies.remove('user');
   }

   // Méthodes publiques pour vérifier l'authentification

   // Vérifie si un token existe
   public isAuthenticated(): boolean {
      return !!Cookies.get('access_token');
   }

   // Récupère le token d'accès
   public getAccessToken(): string | undefined {
      return Cookies.get('access_token');
   }

   // Récupère le token de refresh
   public getRefreshToken(): string | undefined {
      return Cookies.get('refresh_token');
   }
}