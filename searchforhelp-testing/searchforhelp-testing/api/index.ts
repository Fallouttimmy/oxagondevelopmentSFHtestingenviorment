import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../../server/routes';

const app = express();
app.use(express.json());

const server = await registerRoutes(null as any, app);

export default async (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
