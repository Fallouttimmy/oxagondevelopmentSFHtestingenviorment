// @ts-ignore - @vercel/node types not fully available in serverless context
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import storage directly
// @ts-ignore - CommonJS require not recognized in strict TypeScript
const storage = require('../server/storage').storage;

// Handle all API routes directly
export default async (req: VercelRequest, res: VercelResponse) => {
  const pathname = req.url?.split('?')[0] || '/';
  const method = req.method || 'GET';

  try {
    // Set JSON content type
    res.setHeader('Content-Type', 'application/json');

    // GET /api/categories
    if (method === 'GET' && pathname === '/api/categories') {
      const categories = await storage.getCategories();
      return res.json(categories);
    }

    // GET /api/categories/:slug
    if (method === 'GET' && pathname.match(/^\/api\/categories\/[^/]+$/)) {
      const slug = pathname.split('/')[3];
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        res.status(404);
        return res.json({ error: 'Category not found' });
      }
      return res.json(category);
    }

    // GET /api/helplines/featured
    if (method === 'GET' && pathname === '/api/helplines/featured') {
      const helplines = await storage.getFeaturedHelplines();
      return res.json(helplines);
    }

    // GET /api/helplines/search/:query
    if (method === 'GET' && pathname.match(/^\/api\/helplines\/search\/[^/]+$/)) {
      const query = decodeURIComponent(pathname.split('/')[4]);
      const helplines = await storage.searchHelplines(query);
      return res.json(helplines);
    }

    // GET /api/helplines/category/:slug
    if (method === 'GET' && pathname.match(/^\/api\/helplines\/category\/[^/]+$/)) {
      const slug = pathname.split('/')[4];
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        res.status(404);
        return res.json({ error: 'Category not found' });
      }
      const helplines = await storage.getHelplinesByCategory(category.id);
      return res.json(helplines);
    }

    // GET /api/helplines
    if (method === 'GET' && pathname === '/api/helplines') {
      const helplines = await storage.getHelplines();
      return res.json(helplines);
    }

    // Route not found
    res.status(404);
    return res.json({ error: 'Not Found' });
  } catch (error: any) {
    // @ts-ignore - console not recognized when lib doesn't include DOM
    console.error('API Error:', error?.message || String(error));
    res.status(500);
    return res.json({ error: 'Internal Server Error' });
  }
};
