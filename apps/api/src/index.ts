import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { apiRoutes } from "./routes/index.js";
import type { ApiSuccessResponse } from "./types/index.js";

const app = new Hono();

app.use("/*", corsMiddleware);

app.onError(errorHandler);
app.notFound(notFoundHandler);

app.get("/", (c) => {
  const response: ApiSuccessResponse<{
    message: string;
    version: string;
    status: string;
  }> = {
    success: true,
    data: {
      message: "Crypto Exchange API",
      version: "1.0.0",
      status: "running",
    },
  };

  return c.json(response);
});

app.route("/api", apiRoutes);

export default {
  port: 3001,
  fetch: app.fetch,
};
