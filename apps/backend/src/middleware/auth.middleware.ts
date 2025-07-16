import type { Context, Next } from "hono";
import { AuthService } from "../services/auth.service";
import { AppError } from "../types/common";
import logger from "../config/logger";

export interface AuthContext extends Context {
  get: Context["get"] & {
    (key: "user"): any;
  };
  set: Context["set"] & {
    (key: "user", value: any): void;
  };
}

export const authMiddleware = async (c: AuthContext, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
      throw new AppError(
        "Authorization header is required",
        401,
        "UNAUTHORIZED"
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Invalid authorization format. Use 'Bearer <token>'",
        401,
        "UNAUTHORIZED"
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      throw new AppError("Token is required", 401, "UNAUTHORIZED");
    }

    const authService = new AuthService();
    const verificationResult = await authService.verifyToken(token);

    if (!verificationResult.success) {
      throw new AppError(
        verificationResult.error || "Token verification failed",
        401,
        "UNAUTHORIZED"
      );
    }

    // Set user in context for use in route handlers
    c.set("user", verificationResult.data);

    logger.debug("User authenticated successfully", {
      userId: verificationResult.data?.userId,
      email: verificationResult.data?.email,
    });

    await next();
  } catch (error) {
    logger.warn("Authentication failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      path: c.req.path,
      method: c.req.method,
    });

    if (error instanceof AppError) {
      return c.json(
        {
          success: false,
          error: error.message,
          code: error.code,
        },
        error.statusCode
      );
    }

    return c.json(
      {
        success: false,
        error: "Authentication failed",
        code: "AUTHENTICATION_ERROR",
      },
      401
    );
  }
};

export const optionalAuthMiddleware = async (c: AuthContext, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);

      if (token) {
        const authService = new AuthService();
        const verificationResult = await authService.verifyToken(token);

        if (verificationResult.success) {
          c.set("user", verificationResult.data);
        }
      }
    }

    await next();
  } catch (error) {
    // For optional auth, we don't fail on auth errors
    logger.debug("Optional authentication failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    await next();
  }
};
