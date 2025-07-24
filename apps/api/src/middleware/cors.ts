import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});
