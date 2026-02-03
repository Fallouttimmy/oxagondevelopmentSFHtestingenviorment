import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import { createServer } from 'http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
await registerRoutes(httpServer, app);

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
