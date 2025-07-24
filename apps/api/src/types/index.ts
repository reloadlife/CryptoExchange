import type { Context } from "hono";
import type { Trade } from "@crypto-exchange/shared";

export interface AppContext extends Context {}

export interface TradeService {
  getAllTrades(): Promise<Trade[]>;
  getTradeById(id: string): Promise<Trade | null>;
  createTrade(trade: Omit<Trade, "id" | "timestamp">): Promise<Trade>;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  details?: unknown;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
