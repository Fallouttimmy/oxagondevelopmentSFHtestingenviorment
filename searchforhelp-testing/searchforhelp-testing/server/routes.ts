import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/helplines", async (_req, res) => {
    try {
      const helplines = await storage.getHelplines();
      res.json(helplines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch helplines" });
    }
  });

  app.get("/api/helplines/featured", async (_req, res) => {
    try {
      const helplines = await storage.getFeaturedHelplines();
      res.json(helplines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured helplines" });
    }
  });

  app.get("/api/helplines/category/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const helplines = await storage.getHelplinesByCategory(category.id);
      res.json(helplines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch helplines" });
    }
  });

  app.get("/api/helplines/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      const helplines = await storage.searchHelplines(query);
      res.json(helplines);
    } catch (error) {
      res.status(500).json({ error: "Failed to search helplines" });
    }
  });

  return httpServer;
}
