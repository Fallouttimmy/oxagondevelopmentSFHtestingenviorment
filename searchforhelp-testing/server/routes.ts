import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Middleware to log all API requests
  app.use("/api", (req, _res, next) => {
    console.log(`[API Request] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      console.log(`[API Success] /api/categories - Found ${categories.length} categories`);
      res.json(categories);
    } catch (error) {
      console.error(`[API Error] /api/categories:`, error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        console.log(`[API Warning] /api/categories/${slug} - Not found`);
        return res.status(404).json({ error: "Category not found" });
      }
      console.log(`[API Success] /api/categories/${slug} - Found ${category.name}`);
      res.json(category);
    } catch (error) {
      console.error(`[API Error] /api/categories/${req.params.slug}:`, error);
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/helplines", async (_req, res) => {
    try {
      const helplines = await storage.getHelplines();
      console.log(`[API Success] /api/helplines - Found ${helplines.length} helplines`);
      res.json(helplines);
    } catch (error) {
      console.error(`[API Error] /api/helplines:`, error);
      res.status(500).json({ error: "Failed to fetch helplines" });
    }
  });

  app.get("/api/helplines/featured", async (_req, res) => {
    try {
      const helplines = await storage.getFeaturedHelplines();
      console.log(`[API Success] /api/helplines/featured - Found ${helplines.length} featured helplines`);
      res.json(helplines);
    } catch (error) {
      console.error(`[API Error] /api/helplines/featured:`, error);
      res.status(500).json({ error: "Failed to fetch featured helplines" });
    }
  });

  app.get("/api/helplines/category/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        console.log(`[API Warning] /api/helplines/category/${slug} - Category not found`);
        return res.status(404).json({ error: "Category not found" });
      }
      const helplines = await storage.getHelplinesByCategory(category.id);
      console.log(`[API Success] /api/helplines/category/${slug} - Found ${helplines.length} helplines`);
      res.json(helplines);
    } catch (error) {
      console.error(`[API Error] /api/helplines/category/${req.params.slug}:`, error);
      res.status(500).json({ error: "Failed to fetch helplines" });
    }
  });

  app.get("/api/helplines/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      const helplines = await storage.searchHelplines(query);
      console.log(`[API Success] /api/helplines/search/${query} - Found ${helplines.length} results`);
      res.json(helplines);
    } catch (error) {
      console.error(`[API Error] /api/helplines/search/${req.params.query}:`, error);
      res.status(500).json({ error: "Failed to search helplines" });
    }
  });

  return httpServer;
}
