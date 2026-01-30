
import { type User, type InsertUser, type Category, type Helpline } from "@shared/schema";
import { randomUUID } from "crypto";
import { categories, helplines } from "./data";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getHelplines(): Promise<Helpline[]>;
  getHelplinesByCategory(categoryId: string): Promise<Helpline[]>;
  getFeaturedHelplines(): Promise<Helpline[]>;
  searchHelplines(query: string): Promise<Helpline[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return categories.find((c) => c.slug === slug);
  }

  async getHelplines(): Promise<Helpline[]> {
    return helplines;
  }

  async getHelplinesByCategory(categoryId: string): Promise<Helpline[]> {
    return helplines.filter((h) => h.categoryId === categoryId);
  }

  async getFeaturedHelplines(): Promise<Helpline[]> {
    return helplines.filter((h) => h.isFeatured);
  }

  async searchHelplines(query: string): Promise<Helpline[]> {
    const lowerQuery = query.toLowerCase();
    return helplines.filter(
      (h) =>
        h.name.toLowerCase().includes(lowerQuery) ||
        h.descriptionNl.toLowerCase().includes(lowerQuery) ||
        h.description.toLowerCase().includes(lowerQuery) ||
        (h.phone && h.phone.includes(query))
    );
  }
}

export const storage = new MemStorage();
