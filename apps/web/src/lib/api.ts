import { createApiClient } from "@crypto-exchange/sdk";

export const apiClient = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
});

export { type ApiError } from "@crypto-exchange/sdk";
