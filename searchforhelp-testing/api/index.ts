import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
let routesInitialized = false;

async function ensureRoutes() {
  if (routesInitialized) {
    return;
  }
  await registerRoutes(httpServer, app);
  routesInitialized = true;
}

export default (req: VercelRequest, res: VercelResponse) => {
  return ensureRoutes().then(() => app(req, res));
};
