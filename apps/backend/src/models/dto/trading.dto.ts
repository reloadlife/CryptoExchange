import { OrderSide, OrderStatus, OrderType } from "@prisma/client"
import { z } from "zod"

// Create Order DTO
export const CreateOrderDto = z
  .object({
    type: z.nativeEnum(OrderType),
    side: z.nativeEnum(OrderSide),
    buyCurrencyId: z.string().uuid("Invalid buy currency ID"),
    sellCurrencyId: z.string().uuid("Invalid sell currency ID"),
    amount: z.number().positive("Amount must be positive"),
    price: z.number().positive("Price must be positive").optional(),
  })
  .refine(
    (data) => {
      // Market orders don't need price, limit orders do
      if (data.type === OrderType.MARKET) {
        return true
      }
      return data.price !== undefined && data.price > 0
    },
    {
      message: "Price is required for limit orders",
      path: ["price"],
    }
  )

export type CreateOrderDto = z.infer<typeof CreateOrderDto>

// Update Order DTO
export const UpdateOrderDto = z
  .object({
    amount: z.number().positive("Amount must be positive").optional(),
    price: z.number().positive("Price must be positive").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })

export type UpdateOrderDto = z.infer<typeof UpdateOrderDto>

// Cancel Order DTO
export const CancelOrderDto = z.object({
  orderId: z.string().uuid("Invalid order ID"),
})

export type CancelOrderDto = z.infer<typeof CancelOrderDto>

// Order Query DTO
export const OrderQueryDto = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
  type: z.nativeEnum(OrderType).optional(),
  side: z.nativeEnum(OrderSide).optional(),
  currencyId: z.string().uuid().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(["createdAt", "amount", "price", "status"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export type OrderQueryDto = z.infer<typeof OrderQueryDto>

// Trade Query DTO
export const TradeQueryDto = z.object({
  currencyId: z.string().uuid().optional(),
  orderId: z.string().uuid().optional(),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(["executedAt", "amount", "price"]).default("executedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
})

export type TradeQueryDto = z.infer<typeof TradeQueryDto>

// Order Response DTO
export const OrderResponseDto = z.object({
  id: z.string(),
  type: z.nativeEnum(OrderType),
  side: z.nativeEnum(OrderSide),
  buyCurrency: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
  sellCurrency: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
  amount: z.number(),
  price: z.number().nullable(),
  status: z.nativeEnum(OrderStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
  executedAt: z.date().nullable(),
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
})

export type OrderResponseDto = z.infer<typeof OrderResponseDto>

// Trade Response DTO
export const TradeResponseDto = z.object({
  id: z.string(),
  buyOrderId: z.string(),
  sellOrderId: z.string(),
  buyUser: z.object({
    id: z.string(),
    username: z.string(),
  }),
  sellUser: z.object({
    id: z.string(),
    username: z.string(),
  }),
  buyCurrency: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
  sellCurrency: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
  amount: z.number(),
  price: z.number(),
  executedAt: z.date(),
})

export type TradeResponseDto = z.infer<typeof TradeResponseDto>

// Market Data DTO
export const MarketDataDto = z.object({
  symbol: z.string(),
  price: z.number(),
  change24h: z.number(),
  volume24h: z.number(),
  high24h: z.number().optional(),
  low24h: z.number().optional(),
  lastUpdate: z.date(),
})

export type MarketDataDto = z.infer<typeof MarketDataDto>

// Order Book DTO
export const OrderBookDto = z.object({
  symbol: z.string(),
  bids: z.array(
    z.object({
      price: z.number(),
      amount: z.number(),
      total: z.number(),
    })
  ),
  asks: z.array(
    z.object({
      price: z.number(),
      amount: z.number(),
      total: z.number(),
    })
  ),
  lastUpdate: z.date(),
})

export type OrderBookDto = z.infer<typeof OrderBookDto>
