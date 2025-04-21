import { z } from "zod";

// Schéma pour les rôles
export const RoleSchema = z.object({
   id: z.string().uuid(),
   name: z.enum(['Admin', 'Manager', 'User'])
});

// Schéma pour le site
export const SiteSchema = z.object({
   id: z.string().uuid(),
   name: z.string(),
});

export const ClientSchema = z.object({
   id: z.string().uuid(),
   name: z.string(),
   addresse: z.string(),
   site: SiteSchema.nullable().optional(),
});

// Schéma pour les contacts
export const ContactSchema = z.object({
   id: z.string().uuid(),
   firstname: z.string(),
   lastname: z.string(),
   phone: z.string().nullable().optional(),
   client_id: z.string(),
});

export const DepartmentSchema = z.object({
   id: z.string().uuid(),
   name: z.string(),
   code: z.string(),
});

export const UserSchema = z.object({
   id: z.string().uuid(),
   firstname: z.string(),
   lastname: z.string(),
   email: z.string().email(),
   phone_number: z.string().nullable(),
   client: ClientSchema.nullable().optional(),
   department: DepartmentSchema.optional(),
   roles: RoleSchema.nullable().default({ name: "User", id: '1' }).optional(),
});



export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type Site = z.infer<typeof SiteSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Department = z.infer<typeof DepartmentSchema>;