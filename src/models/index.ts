import { z } from "zod";

// Schéma pour les rôles
export const RoleSchema = z.object({
   id: z.number(),
   name: z.string(),
   guard_name: z.string(),
   translate_name: z.string(),
   pivot: z.array(z.unknown()),
});

// Schéma pour le site
export const SiteSchema = z.object({
   id: z.string(),
   name: z.string(),
});

export const GatesSchema = z.object({
   authorized_to_update: z.boolean(),
   authorized_to_delete: z.boolean(),
});

export const ClientSchema = z.object({
   id: z.string(),
   name: z.string(),
   addresse: z.string()
});

// Schéma pour les contacts
export const ContactSchema = z.object({
   id: z.string(),
   firstname: z.string(),
   lastname: z.string(),
   email: z.string().email(),
   phone: z.string().nullable().optional(),
   position: z.string().optional(),
   client_id: z.string(),
});

// Schéma principal pour l'utilisateur
export const UserSchema = z.object({
   id: z.string(),
   site_id: z.string(),
   manager_id: z.string().nullable(),
   customer_id: z.null(),
   firstname: z.string(),
   lastname: z.string(),
   email: z.string().email(),
   phone_number: z.string().nullable(),
   timezone: z.string(),
   language: z.string(),
   remember_me: z.number(),
   cgu_accepted_at: z.string(),
   last_authenticated_at: z.string(),
   unique_identifier: z.string().nullable(),
   released_at: z.null(),
   number_managers_can_validate: z.number().nullable(),
   is_level_one_manager: z.boolean(),
   profession_id: z.null(),
   demo_request_at: z.string().nullable(),
   fcm_token: z.string().nullable(),
   enter_date: z.null(),
   role_id: z.number(),
   count_unread_articles: z.number(),
   has_same_circuit_in_conges: z.boolean(),
   has_same_circuit_in_ndf: z.boolean(),
   has_managed: z.boolean(),
   has_access_to_demo: z.boolean(),
   gates: GatesSchema,
   roles: z.array(RoleSchema),
   permissions: z.array(z.unknown()),
   applications: z.array(z.unknown()),
   site: SiteSchema,
   auto_user: z.null(),
   profiles: z.array(z.unknown()),
   divisions: z.array(z.unknown()),
   profession: z.null(),
   direct_manager: z.null(),
});

export const DepartmentSchema = z.object({
   id: z.string(),
   name: z.string(),
   code: z.string(),
   site_id: z.string(),
});


export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type Site = z.infer<typeof SiteSchema>;
export type Gates = z.infer<typeof GatesSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Department = z.infer<typeof DepartmentSchema>;