import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { type Request, Response, NextFunction } from 'express';

// @ts-ignore - Module resolution issue in Vercel build
import { registerRoutes } from '../server/routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
function log(message: string, source = 'express') {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const pathname = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (pathname.startsWith('/api')) {
      let logLine = `${req.method} ${pathname} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

// Initialize routes
let initialized = false;
const initializeRoutes = async () => {
  if (initialized) return;
  
  try {
    await registerRoutes(null as any, app);
    initialized = true;
  } catch (error) {
    console.error('Failed to initialize routes:', error);
  }
};

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error('API Error:', err);
  res.status(status).json({ message });
});

// Export for Vercel - handles /api routes
export default async (req: VercelRequest, res: VercelResponse) => {
  // Initialize routes once
  await initializeRoutes();
  
  // Return 404 for non-API routes (these are handled by api/index.ts)
  if (!req.url?.startsWith('/api')) {
    return res.status(404).json({ error: 'Not Found' });
  }

  // Handle API requests
  return app(req, res);
};
