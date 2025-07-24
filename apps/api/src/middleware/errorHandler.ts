import type { Context, ErrorHandler } from "hono";
import type { ApiErrorResponse } from "../types/index.js";

export const errorHandler: ErrorHandler = async (err, c) => {
  console.error("API Error:", err);

  const errorResponse: ApiErrorResponse = {
    success: false,
    error: err.message || "Internal Server Error",
    message: "An error occurred while processing your request",
  };

  const statusCode = (err as any).statusCode || 500;
  return c.json(errorResponse, statusCode);
};

export const notFoundHandler = (c: Context) => {
  const errorResponse: ApiErrorResponse = {
    success: false,
    error: "Not Found",
    message: `Route ${c.req.method} ${c.req.path} not found`,
  };

  return c.json(errorResponse, 404);
};
