import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Category {
  id: string;
  name: string;
  nameNl: string;
  description: string;
  descriptionNl: string;
  icon: string;
  slug: string;
}

export interface Helpline {
  id: string;
  name: string;
  description: string;
  descriptionNl: string;
  phone?: string;
  website?: string;
  categoryId: string;
  hours?: string;
  hoursNl?: string;
  languages?: string[];
  isEmergency?: boolean;
  isFeatured?: boolean;
}

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  nameNl: z.string(),
  description: z.string(),
  descriptionNl: z.string(),
  icon: z.string(),
  slug: z.string(),
});

export const helplineSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  descriptionNl: z.string(),
  phone: z.string().optional(),
  website: z.string().optional(),
  categoryId: z.string(),
  hours: z.string().optional(),
  hoursNl: z.string().optional(),
  languages: z.array(z.string()).optional(),
  isEmergency: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export type CategoryType = z.infer<typeof categorySchema>;
export type HelplineType = z.infer<typeof helplineSchema>;
