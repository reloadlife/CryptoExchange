import type { Context, Next } from "hono";
import type { ZodSchema } from "zod";
import { AppError } from "../types/common";

interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const validate = (schemas: ValidationSchemas) => {
  return async (c: Context, next: Next) => {
    try {
      // Validate request body
      if (schemas.body) {
        let body: any;
        try {
          body = await c.req.json();
        } catch (error) {
          throw new AppError(
            "Invalid JSON in request body",
            400,
            "INVALID_JSON"
          );
        }

        const bodyValidation = schemas.body.safeParse(body);
        if (!bodyValidation.success) {
          const errors = bodyValidation.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code,
          }));

          throw new AppError(
            "Request body validation failed",
            400,
            "VALIDATION_ERROR",
            {
              errors,
            }
          );
        }

        // Store validated data in context
        c.set("validatedBody", bodyValidation.data);
      }

      // Validate query parameters
      if (schemas.query) {
        const query = c.req.query();
        const queryValidation = schemas.query.safeParse(query);

        if (!queryValidation.success) {
          const errors = queryValidation.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code,
          }));

          throw new AppError(
            "Query parameters validation failed",
            400,
            "VALIDATION_ERROR",
            {
              errors,
            }
          );
        }

        c.set("validatedQuery", queryValidation.data);
      }

      // Validate path parameters
      if (schemas.params) {
        const params = c.req.param();
        const paramsValidation = schemas.params.safeParse(params);

        if (!paramsValidation.success) {
          const errors = paramsValidation.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code,
          }));

          throw new AppError(
            "Path parameters validation failed",
            400,
            "VALIDATION_ERROR",
            {
              errors,
            }
          );
        }

        c.set("validatedParams", paramsValidation.data);
      }

      await next();
    } catch (error) {
      if (error instanceof AppError) {
        return c.json(
          {
            success: false,
            error: error.message,
            code: error.code,
            ...(error.details && { errors: error.details.errors }),
          },
          error.statusCode
        );
      }

      throw error;
    }
  };
};

// Convenience functions for common validation scenarios
export const validateBody = (schema: ZodSchema) => validate({ body: schema });
export const validateQuery = (schema: ZodSchema) => validate({ query: schema });
export const validateParams = (schema: ZodSchema) =>
  validate({ params: schema });

// Helper to get validated data from context
export const getValidatedData = (c: Context) => ({
  body: c.get("validatedBody"),
  query: c.get("validatedQuery"),
  params: c.get("validatedParams"),
});
