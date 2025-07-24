import type { Trade, User } from "@crypto-exchange/shared";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TradeWithCalculations extends Trade {
  totalValue: string;
  fee: string;
  formattedPrice: string;
}

export interface CreateTradeRequest {
  userId?: string;
  pair: string;
  amount: number;
  price: number;
  type: "buy" | "sell";
}

export interface CreateTradeResponse
  extends ApiResponse<TradeWithCalculations> {}

export interface GetTradesResponse
  extends ApiResponse<{
    trades: TradeWithCalculations[];
    count: number;
  }> {}

export interface GetTradeResponse extends ApiResponse<TradeWithCalculations> {}

export interface HealthResponse
  extends ApiResponse<{
    status: string;
    timestamp: string;
  }> {}

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: unknown;
}

export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}
