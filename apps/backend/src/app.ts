import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { timing } from "hono/timing";
import { prettyJSON } from "hono/pretty-json";

// Import configurations
import env from "./config/env";
import { database } from "./config/database";
import logger from "./config/logger";

// Import middleware
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import { authMiddleware } from "./middleware/auth.middleware";

// Import routes (we'll create these)
import { AuthService } from "./services/auth.service";
import { TradingService } from "./services/trading.service";
import { validateBody } from "./middleware/validation.middleware";
import { RegisterDto, LoginDto } from "./models/dto/auth.dto";
import { CreateOrderDto } from "./models/dto/trading.dto";

// Create Hono app
const app = new Hono();

// Global middleware
app.use("*", errorHandler);
app.use("*", honoLogger());
app.use("*", timing());

// CORS configuration
app.use(
  "*",
  cors({
    origin: env.CORS_ORIGIN.split(","),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Pretty JSON in development
if (env.NODE_ENV === "development") {
  app.use("*", prettyJSON());
}

// Health check endpoint
app.get("/health", async (c) => {
  const dbHealthy = await database.healthCheck();

  return c.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: env.NODE_ENV,
    services: {
      database: dbHealthy ? "healthy" : "unhealthy",
    },
  });
});

// API v1 routes
const api = new Hono();

// Auth routes
const authService = new AuthService();

api.post("/auth/register", validateBody(RegisterDto), async (c) => {
  const body = c.get("validatedBody");
  const result = await authService.register(body);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      400
    );
  }

  return c.json({
    success: true,
    data: result.data,
    message: "Registration successful",
  });
});

api.post("/auth/login", validateBody(LoginDto), async (c) => {
  const body = c.get("validatedBody");
  const result = await authService.login(body);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      401
    );
  }

  return c.json({
    success: true,
    data: result.data,
    message: "Login successful",
  });
});

api.get("/auth/me", authMiddleware, async (c) => {
  const user = c.get("user");

  return c.json({
    success: true,
    data: {
      userId: user.userId,
      email: user.email,
    },
    message: "User information retrieved",
  });
});

// Trading routes
const tradingService = new TradingService();

api.post("/orders", authMiddleware, validateBody(CreateOrderDto), async (c) => {
  const user = c.get("user");
  const body = c.get("validatedBody");

  const result = await tradingService.createOrder(user.userId, body);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      400
    );
  }

  return c.json({
    success: true,
    data: result.data,
    message: "Order created successfully",
  });
});

api.get("/orders", authMiddleware, async (c) => {
  const user = c.get("user");
  const query = c.req.query();

  const result = await tradingService.getUserOrders(user.userId, query as any);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      400
    );
  }

  return c.json({
    success: true,
    data: result.data.data,
    meta: result.data.meta,
    message: "Orders retrieved successfully",
  });
});

api.get("/orders/:id", authMiddleware, async (c) => {
  const orderId = c.req.param("id");

  const result = await tradingService.getOrderById(orderId);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      404
    );
  }

  return c.json({
    success: true,
    data: result.data,
    message: "Order retrieved successfully",
  });
});

api.delete("/orders/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const orderId = c.req.param("id");

  const result = await tradingService.cancelOrder(user.userId, orderId);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      400
    );
  }

  return c.json({
    success: true,
    data: result.data,
    message: "Order cancelled successfully",
  });
});

api.get("/trades", authMiddleware, async (c) => {
  const user = c.get("user");
  const query = c.req.query();

  const result = await tradingService.getUserTrades(user.userId, query as any);

  if (!result.success) {
    return c.json(
      {
        success: false,
        error: result.error,
      },
      400
    );
  }

  return c.json({
    success: true,
    data: result.data.data,
    meta: result.data.meta,
    message: "Trades retrieved successfully",
  });
});

// Mount API routes
app.route("/api/v1", api);

// Handle 404
app.notFound(notFoundHandler);

// Application lifecycle
export const startServer = async (port: number = env.PORT) => {
  try {
    // Connect to database
    await database.connect();

    logger.info("🚀 Crypto Exchange API starting...", {
      port,
      environment: env.NODE_ENV,
      nodeVersion: process.version,
    });

    return app;
  } catch (error) {
    logger.error("Failed to start server", { error: error.message });
    process.exit(1);
  }
};

export const stopServer = async () => {
  try {
    await database.disconnect();
    logger.info("✅ Server stopped gracefully");
  } catch (error) {
    logger.error("Error during server shutdown", { error: error.message });
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info("SIGINT received, shutting down gracefully...");
  await stopServer();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully...");
  await stopServer();
  process.exit(0);
});

export default app;
