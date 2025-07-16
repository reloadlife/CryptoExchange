import type {
  User,
  Orders,
  Trade,
  CryptoCurrency,
  OrderType,
  OrderSide,
  OrderStatus,
} from "@prisma/client";

// Base response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  meta?: {
    pagination?: PaginationMeta;
    timestamp: string;
    version: string;
  };
}

// Pagination interfaces
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error interfaces
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "INTERNAL_ERROR",
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Authentication interfaces
export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest {
  user: User;
}

// Database entities with relations
export interface UserWithRelations extends User {
  orders?: Orders[];
  trades?: Trade[];
  _count?: {
    orders: number;
    trades: number;
  };
}

export interface OrderWithRelations extends Orders {
  user: User;
  buyCurrency: CryptoCurrency;
  sellCurrency: CryptoCurrency;
  trades?: Trade[];
}

export interface TradeWithRelations extends Trade {
  buyOrder: Orders;
  buyUser: User;
  buyCurrency: CryptoCurrency;
  sellCurrency: CryptoCurrency;
}

// Market data interfaces
export interface MarketPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  lastUpdate: Date;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastUpdate: Date;
}

// Service interfaces
export interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ApiError[];
}

// Repository interfaces
export interface BaseRepository<T> {
  findById(id: string): Promise<T | null>;
  findMany(params?: any): Promise<T[]>;
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Export Prisma types for convenience
export type {
  User,
  Orders,
  Trade,
  CryptoCurrency,
  OrderType,
  OrderSide,
  OrderStatus,
};

export default {};
