import type { Orders } from "@prisma/client";
import { Prisma, OrderStatus } from "@prisma/client";
import { BaseRepositoryImpl } from "./base.repository";
import type { OrderWithRelations } from "../types/common";
import type {
  OrderQueryDto,
  CreateOrderDto,
  UpdateOrderDto,
} from "../models/dto/trading.dto";

export interface IOrderRepository {
  findById(id: string): Promise<OrderWithRelations | null>;
  findByUserId(
    userId: string,
    params: OrderQueryDto
  ): Promise<{ data: OrderWithRelations[]; meta: any }>;
  findMany(
    params: OrderQueryDto
  ): Promise<{ data: OrderWithRelations[]; meta: any }>;
  create(data: CreateOrderDto & { userId: string }): Promise<Orders>;
  update(id: string, data: UpdateOrderDto): Promise<Orders>;
  cancel(id: string, userId: string): Promise<Orders>;
  delete(id: string): Promise<boolean>;
  findMatchingOrders(order: Orders): Promise<OrderWithRelations[]>;
  updateStatus(id: string, status: OrderStatus): Promise<Orders>;
  findActiveOrdersByUser(userId: string): Promise<OrderWithRelations[]>;
}

export class OrderRepository
  extends BaseRepositoryImpl<Orders>
  implements IOrderRepository
{
  async findById(id: string): Promise<OrderWithRelations | null> {
    try {
      return await this.db.orders.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          buyCurrency: true,
          sellCurrency: true,
          trades: {
            orderBy: { executedAt: "desc" },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to find order by ID: ${error}`);
    }
  }

  async findByUserId(
    userId: string,
    params: OrderQueryDto
  ): Promise<{ data: OrderWithRelations[]; meta: any }> {
    try {
      const { status, type, side, currencyId, sortBy, sortOrder } = params;
      const { skip, take, page, limit } = this.buildPagination(params);

      const where: Prisma.OrdersWhereInput = {
        userId,
        ...(status && { status }),
        ...(type && { type }),
        ...(side && { side }),
        ...(currencyId && {
          OR: [{ buyCurrencyId: currencyId }, { sellCurrencyId: currencyId }],
        }),
      };

      const orderBy = this.buildOrderBy(sortBy, sortOrder);

      return await this.executeWithPagination(
        () =>
          this.db.orders.findMany({
            where,
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
              buyCurrency: true,
              sellCurrency: true,
              trades: true,
            },
            orderBy,
            skip,
            take,
          }),
        () => this.db.orders.count({ where }),
        { page, limit }
      );
    } catch (error) {
      throw new Error(`Failed to find orders by user ID: ${error}`);
    }
  }

  async findMany(
    params: OrderQueryDto
  ): Promise<{ data: OrderWithRelations[]; meta: any }> {
    try {
      const { status, type, side, currencyId, sortBy, sortOrder } = params;
      const { skip, take, page, limit } = this.buildPagination(params);

      const where: Prisma.OrdersWhereInput = {
        ...(status && { status }),
        ...(type && { type }),
        ...(side && { side }),
        ...(currencyId && {
          OR: [{ buyCurrencyId: currencyId }, { sellCurrencyId: currencyId }],
        }),
      };

      const orderBy = this.buildOrderBy(sortBy, sortOrder);

      return await this.executeWithPagination(
        () =>
          this.db.orders.findMany({
            where,
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
              buyCurrency: true,
              sellCurrency: true,
              trades: true,
            },
            orderBy,
            skip,
            take,
          }),
        () => this.db.orders.count({ where }),
        { page, limit }
      );
    } catch (error) {
      throw new Error(`Failed to find orders: ${error}`);
    }
  }

  async create(data: CreateOrderDto & { userId: string }): Promise<Orders> {
    try {
      return await this.db.orders.create({
        data: {
          userId: data.userId,
          type: data.type,
          side: data.side,
          buyCurrencyId: data.buyCurrencyId,
          sellCurrencyId: data.sellCurrencyId,
          amount: data.amount,
          price: data.price || null,
          status: OrderStatus.PENDING,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new Error("Invalid currency ID");
        }
      }
      throw new Error(`Failed to create order: ${error}`);
    }
  }

  async update(id: string, data: UpdateOrderDto): Promise<Orders> {
    try {
      return await this.db.orders.update({
        where: { id },
        data: {
          ...(data.amount && { amount: data.amount }),
          ...(data.price && { price: data.price }),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Order not found");
        }
      }
      throw new Error(`Failed to update order: ${error}`);
    }
  }

  async cancel(id: string, userId: string): Promise<Orders> {
    try {
      const order = await this.db.orders.findFirst({
        where: {
          id,
          userId,
          status: {
            in: [OrderStatus.PENDING, OrderStatus.PARTIALLY_FILLED],
          },
        },
      });

      if (!order) {
        throw new Error("Order not found or cannot be cancelled");
      }

      return await this.db.orders.update({
        where: { id },
        data: {
          status: OrderStatus.CANCELLED,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`Failed to cancel order: ${error}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.db.orders.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Order not found");
        }
      }
      throw new Error(`Failed to delete order: ${error}`);
    }
  }

  async findMatchingOrders(order: Orders): Promise<OrderWithRelations[]> {
    try {
      // Find opposite side orders with matching currencies
      const oppositeSide = order.side === "BUY" ? "SELL" : "BUY";

      const where: Prisma.OrdersWhereInput = {
        side: oppositeSide,
        buyCurrencyId: order.sellCurrencyId,
        sellCurrencyId: order.buyCurrencyId,
        status: OrderStatus.PENDING,
        userId: { not: order.userId }, // Can't match with own orders
      };

      // For limit orders, add price constraints
      if (order.price && order.type === "LIMIT") {
        if (order.side === "BUY") {
          // Buy order: match with sell orders at or below our buy price
          where.price = { lte: order.price };
        } else {
          // Sell order: match with buy orders at or above our sell price
          where.price = { gte: order.price };
        }
      }

      return await this.db.orders.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          buyCurrency: true,
          sellCurrency: true,
          trades: true,
        },
        orderBy: [
          { price: order.side === "BUY" ? "asc" : "desc" }, // Best price first
          { createdAt: "asc" }, // Time priority
        ],
      });
    } catch (error) {
      throw new Error(`Failed to find matching orders: ${error}`);
    }
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Orders> {
    try {
      return await this.db.orders.update({
        where: { id },
        data: {
          status,
          ...(status === OrderStatus.FILLED && { executedAt: new Date() }),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`Failed to update order status: ${error}`);
    }
  }

  async findActiveOrdersByUser(userId: string): Promise<OrderWithRelations[]> {
    try {
      return await this.db.orders.findMany({
        where: {
          userId,
          status: {
            in: [OrderStatus.PENDING, OrderStatus.PARTIALLY_FILLED],
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          buyCurrency: true,
          sellCurrency: true,
          trades: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw new Error(`Failed to find active orders by user: ${error}`);
    }
  }
}
