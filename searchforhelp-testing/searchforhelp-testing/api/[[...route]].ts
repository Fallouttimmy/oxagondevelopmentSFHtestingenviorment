import type { VercelRequest, VercelResponse } from '@vercel/node';

// @ts-ignore - Module resolution issue in Vercel build
import { storage } from '../server/storage';

// Handle all API routes directly
export default async (req: VercelRequest, res: VercelResponse) => {
  const url = req.url || '/';
  const method = req.method || 'GET';

  try {
    // Parse the URL to get the path and params
    const urlParts = url.split('?')[0].split('/').filter(Boolean);

    // GET /api/categories
    if (method === 'GET' && url === '/api/categories') {
      const categories = await storage.getCategories();
      return res.json(categories);
    }

    // GET /api/categories/:slug
    if (method === 'GET' && urlParts[1] === 'categories' && urlParts.length === 3) {
      const slug = urlParts[2];
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.json(category);
    }

    // GET /api/helplines
    if (method === 'GET' && url === '/api/helplines') {
      const helplines = await storage.getHelplines();
      return res.json(helplines);
    }

    // GET /api/helplines/featured
    if (method === 'GET' && url === '/api/helplines/featured') {
      const helplines = await storage.getFeaturedHelplines();
      return res.json(helplines);
    }

    // GET /api/helplines/search/:query
    if (method === 'GET' && urlParts[1] === 'helplines' && urlParts[2] === 'search' && urlParts.length === 4) {
      const query = decodeURIComponent(urlParts[3]);
      const helplines = await storage.searchHelplines(query);
      return res.json(helplines);
    }

    // GET /api/helplines/category/:slug
    if (method === 'GET' && urlParts[1] === 'helplines' && urlParts[2] === 'category' && urlParts.length === 4) {
      const slug = urlParts[3];
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      const helplines = await storage.getHelplinesByCategory(category.id);
      return res.json(helplines);
    }

    // Route not found
    res.status(404).json({ error: 'Not Found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
