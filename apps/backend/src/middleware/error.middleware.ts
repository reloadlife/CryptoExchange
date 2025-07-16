import type { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"
import env from "../config/env"
import logger from "../config/logger"
import { AppError } from "../types/common"

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    logger.error("Unhandled error occurred", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      path: c.req.path,
      method: c.req.method,
      userAgent: c.req.header("user-agent"),
    })

    // Handle different types of errors
    if (error instanceof AppError) {
      return c.json(
        {
          success: false,
          error: error.message,
          code: error.code,
          ...(env.NODE_ENV === "development" && { stack: error.stack }),
        },
        error.statusCode
      )
    }

    if (error instanceof HTTPException) {
      return c.json(
        {
          success: false,
          error: error.message,
          code: "HTTP_EXCEPTION",
        },
        error.status
      )
    }

    // Handle validation errors (Zod errors)
    if (error.name === "ZodError") {
      const zodError = error as any
      const validationErrors = zodError.errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      }))

      return c.json(
        {
          success: false,
          error: "Validation failed",
          code: "VALIDATION_ERROR",
          errors: validationErrors,
        },
        400
      )
    }

    // Handle Prisma errors
    if (error.constructor.name === "PrismaClientKnownRequestError") {
      const prismaError = error as any

      switch (prismaError.code) {
        case "P2002":
          return c.json(
            {
              success: false,
              error: "Unique constraint violation",
              code: "DUPLICATE_ENTRY",
              field: prismaError.meta?.target?.[0] || "unknown",
            },
            409
          )
        case "P2025":
          return c.json(
            {
              success: false,
              error: "Record not found",
              code: "NOT_FOUND",
            },
            404
          )
        case "P2003":
          return c.json(
            {
              success: false,
              error: "Foreign key constraint violation",
              code: "INVALID_REFERENCE",
            },
            400
          )
        default:
          break
      }
    }

    // Generic error fallback
    const statusCode = 500
    const message =
      env.NODE_ENV === "production"
        ? "Internal server error"
        : error instanceof Error
          ? error.message
          : "Unknown error"

    return c.json(
      {
        success: false,
        error: message,
        code: "INTERNAL_ERROR",
        ...(env.NODE_ENV === "development" && {
          stack: error instanceof Error ? error.stack : undefined,
        }),
      },
      statusCode
    )
  }
}

export const notFoundHandler = (c: Context) => {
  return c.json(
    {
      success: false,
      error: `Route ${c.req.method} ${c.req.path} not found`,
      code: "NOT_FOUND",
    },
    404
  )
}
