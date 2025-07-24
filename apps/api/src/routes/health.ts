import { Hono } from "hono";
import type { Context } from "hono";
import type { ApiSuccessResponse } from "../types/index.js";

const health = new Hono();

health.get("/", (c: Context) => {
  const response: ApiSuccessResponse<{
    status: string;
    timestamp: string;
  }> = {
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
  };

  return c.json(response);
});

export { health };
