import type { Orders, Trade } from "@prisma/client";
import { OrderStatus, OrderType } from "@prisma/client";
import {
  OrderRepository,
  type IOrderRepository,
} from "../repositories/order.repository";
import {
  UserRepository,
  type IUserRepository,
} from "../repositories/user.repository";
import type {
  CreateOrderDto,
  UpdateOrderDto,
  OrderQueryDto,
  TradeQueryDto,
} from "../models/dto/trading.dto";
import type {
  ServiceResult,
  OrderWithRelations,
  TradeWithRelations,
} from "../types/common";
import { AppError } from "../types/common";
import { prisma } from "../config/database";
import logger from "../config/logger";

export interface ITradingService {
  createOrder(
    userId: string,
    data: CreateOrderDto
  ): Promise<ServiceResult<Orders>>;
  updateOrder(
    userId: string,
    orderId: string,
    data: UpdateOrderDto
  ): Promise<ServiceResult<Orders>>;
  cancelOrder(userId: string, orderId: string): Promise<ServiceResult<Orders>>;
  getUserOrders(
    userId: string,
    params: OrderQueryDto
  ): Promise<ServiceResult<{ data: OrderWithRelations[]; meta: any }>>;
  getAllOrders(
    params: OrderQueryDto
  ): Promise<ServiceResult<{ data: OrderWithRelations[]; meta: any }>>;
  getOrderById(orderId: string): Promise<ServiceResult<OrderWithRelations>>;
  getUserTrades(
    userId: string,
    params: TradeQueryDto
  ): Promise<ServiceResult<{ data: TradeWithRelations[]; meta: any }>>;
  executeOrder(order: Orders): Promise<ServiceResult<Trade[]>>;
  matchOrders(newOrder: Orders): Promise<Trade[]>;
}

export class TradingService implements ITradingService {
  constructor(
    private orderRepository: IOrderRepository = new OrderRepository(),
    private userRepository: IUserRepository = new UserRepository()
  ) {}

  async createOrder(
    userId: string,
    data: CreateOrderDto
  ): Promise<ServiceResult<Orders>> {
    try {
      logger.info("Creating new order", { userId, orderData: data });

      // Validate user exists
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      // Validate currencies are different
      if (data.buyCurrencyId === data.sellCurrencyId) {
        return {
          success: false,
          error: "Buy and sell currencies must be different",
        };
      }

      // Create order
      const order = await this.orderRepository.create({
        ...data,
        userId,
      });

      logger.info("Order created successfully", { orderId: order.id, userId });

      // Try to execute the order immediately
      const executionResult = await this.executeOrder(order);
      if (!executionResult.success) {
        logger.warn("Order execution failed", {
          orderId: order.id,
          error: executionResult.error,
        });
      }

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      logger.error("Order creation failed", {
        error: error.message,
        userId,
        data,
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Order creation failed",
      };
    }
  }

  async updateOrder(
    userId: string,
    orderId: string,
    data: UpdateOrderDto
  ): Promise<ServiceResult<Orders>> {
    try {
      logger.info("Updating order", { userId, orderId, updateData: data });

      // Verify order belongs to user and is updatable
      const existingOrder = await this.orderRepository.findById(orderId);
      if (!existingOrder) {
        return {
          success: false,
          error: "Order not found",
        };
      }

      if (existingOrder.userId !== userId) {
        return {
          success: false,
          error: "Unauthorized to update this order",
        };
      }

      if (existingOrder.status !== OrderStatus.PENDING) {
        return {
          success: false,
          error: "Only pending orders can be updated",
        };
      }

      // Update order
      const updatedOrder = await this.orderRepository.update(orderId, data);

      logger.info("Order updated successfully", { orderId, userId });

      return {
        success: true,
        data: updatedOrder,
      };
    } catch (error) {
      logger.error("Order update failed", {
        error: error.message,
        userId,
        orderId,
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Order update failed",
      };
    }
  }

  async cancelOrder(
    userId: string,
    orderId: string
  ): Promise<ServiceResult<Orders>> {
    try {
      logger.info("Cancelling order", { userId, orderId });

      const cancelledOrder = await this.orderRepository.cancel(orderId, userId);

      logger.info("Order cancelled successfully", { orderId, userId });

      return {
        success: true,
        data: cancelledOrder,
      };
    } catch (error) {
      logger.error("Order cancellation failed", {
        error: error.message,
        userId,
        orderId,
      });
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Order cancellation failed",
      };
    }
  }

  async getUserOrders(
    userId: string,
    params: OrderQueryDto
  ): Promise<ServiceResult<{ data: OrderWithRelations[]; meta: any }>> {
    try {
      const result = await this.orderRepository.findByUserId(userId, params);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      logger.error("Failed to get user orders", {
        error: error.message,
        userId,
      });
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get user orders",
      };
    }
  }

  async getAllOrders(
    params: OrderQueryDto
  ): Promise<ServiceResult<{ data: OrderWithRelations[]; meta: any }>> {
    try {
      const result = await this.orderRepository.findMany(params);

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      logger.error("Failed to get orders", { error: error.message });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get orders",
      };
    }
  }

  async getOrderById(
    orderId: string
  ): Promise<ServiceResult<OrderWithRelations>> {
    try {
      const order = await this.orderRepository.findById(orderId);

      if (!order) {
        return {
          success: false,
          error: "Order not found",
        };
      }

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      logger.error("Failed to get order by ID", {
        error: error.message,
        orderId,
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get order",
      };
    }
  }

  async getUserTrades(
    userId: string,
    params: TradeQueryDto
  ): Promise<ServiceResult<{ data: TradeWithRelations[]; meta: any }>> {
    try {
      // This would use a TradeRepository - simplified for now
      const { page = 1, limit = 20 } = params;
      const skip = (page - 1) * limit;

      const where = {
        OR: [{ buyUserId: userId }, { sellUserId: userId }],
      };

      const [trades, total] = await Promise.all([
        prisma.trade.findMany({
          where,
          include: {
            buyOrder: true,
            buyUser: {
              select: { id: true, username: true },
            },
            buyCurrency: true,
            sellCurrency: true,
          },
          orderBy: { executedAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.trade.count({ where }),
      ]);

      const meta = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      };

      return {
        success: true,
        data: { data: trades as TradeWithRelations[], meta },
      };
    } catch (error) {
      logger.error("Failed to get user trades", {
        error: error.message,
        userId,
      });
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get user trades",
      };
    }
  }

  async executeOrder(order: Orders): Promise<ServiceResult<Trade[]>> {
    try {
      logger.info("Executing order", { orderId: order.id });

      if (order.type === OrderType.MARKET) {
        // For market orders, execute immediately at best available price
        const trades = await this.matchOrders(order);

        if (trades.length > 0) {
          // Update order status based on execution
          const totalExecuted = trades.reduce(
            (sum, trade) => sum + Number(trade.amount),
            0
          );
          const status =
            totalExecuted >= Number(order.amount)
              ? OrderStatus.FILLED
              : OrderStatus.PARTIALLY_FILLED;

          await this.orderRepository.updateStatus(order.id, status);
        }

        return {
          success: true,
          data: trades,
        };
      } else {
        // For limit orders, only execute if price conditions are met
        const trades = await this.matchOrders(order);

        if (trades.length > 0) {
          const totalExecuted = trades.reduce(
            (sum, trade) => sum + Number(trade.amount),
            0
          );
          const status =
            totalExecuted >= Number(order.amount)
              ? OrderStatus.FILLED
              : OrderStatus.PARTIALLY_FILLED;

          await this.orderRepository.updateStatus(order.id, status);
        }

        return {
          success: true,
          data: trades,
        };
      }
    } catch (error) {
      logger.error("Order execution failed", {
        error: error.message,
        orderId: order.id,
      });
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Order execution failed",
      };
    }
  }

  async matchOrders(newOrder: Orders): Promise<Trade[]> {
    try {
      const matchingOrders = await this.orderRepository.findMatchingOrders(
        newOrder
      );
      const trades: Trade[] = [];

      let remainingAmount = Number(newOrder.amount);

      for (const matchingOrder of matchingOrders) {
        if (remainingAmount <= 0) break;

        const tradeAmount = Math.min(
          remainingAmount,
          Number(matchingOrder.amount)
        );
        const tradePrice =
          Number(matchingOrder.price) || Number(newOrder.price) || 0;

        // Create trade record
        const trade = await prisma.trade.create({
          data: {
            buyOrderId:
              newOrder.side === "BUY" ? newOrder.id : matchingOrder.id,
            sellOrderId:
              newOrder.side === "SELL" ? newOrder.id : matchingOrder.id,
            buyUserId:
              newOrder.side === "BUY" ? newOrder.userId : matchingOrder.userId,
            sellUserId:
              newOrder.side === "SELL" ? newOrder.userId : matchingOrder.userId,
            buyCurrencyId: newOrder.buyCurrencyId,
            sellCurrencyId: newOrder.sellCurrencyId,
            amount: tradeAmount,
            price: tradePrice,
            executedAt: new Date(),
          },
        });

        trades.push(trade);
        remainingAmount -= tradeAmount;

        // Update matching order status
        const matchingOrderRemainingAmount =
          Number(matchingOrder.amount) - tradeAmount;
        if (matchingOrderRemainingAmount <= 0) {
          await this.orderRepository.updateStatus(
            matchingOrder.id,
            OrderStatus.FILLED
          );
        } else {
          await this.orderRepository.updateStatus(
            matchingOrder.id,
            OrderStatus.PARTIALLY_FILLED
          );
          // In a real system, you'd also update the remaining amount
        }

        logger.info("Trade executed", {
          tradeId: trade.id,
          buyOrderId: trade.buyOrderId,
          sellOrderId: trade.sellOrderId,
          amount: tradeAmount,
          price: tradePrice,
        });
      }

      return trades;
    } catch (error) {
      logger.error("Order matching failed", {
        error: error.message,
        orderId: newOrder.id,
      });
      throw new AppError("Order matching failed", 500, "ORDER_MATCHING_ERROR");
    }
  }
}
