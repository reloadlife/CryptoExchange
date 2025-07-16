import type { User } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { BaseRepositoryImpl } from "./base.repository";
import type { UserWithRelations, PaginationParams } from "../types/common";
import type { UsersQueryDto } from "../models/dto/user.dto";

export interface IUserRepository {
  findById(id: string): Promise<UserWithRelations | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findMany(
    params: UsersQueryDto
  ): Promise<{ data: UserWithRelations[]; meta: any }>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<boolean>;
  exists(email: string, username: string, excludeId?: string): Promise<boolean>;
  getUserStats(userId: string): Promise<{
    totalOrders: number;
    totalTrades: number;
    totalVolume: number;
    joinedDaysAgo: number;
  }>;
}

export class UserRepository
  extends BaseRepositoryImpl<User>
  implements IUserRepository
{
  async findById(id: string): Promise<UserWithRelations | null> {
    try {
      return await this.db.user.findUnique({
        where: { id },
        include: {
          orders: {
            orderBy: { createdAt: "desc" },
            take: 10, // Latest 10 orders
          },
          trades: {
            orderBy: { executedAt: "desc" },
            take: 10, // Latest 10 trades
          },
          _count: {
            select: {
              orders: true,
              trades: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to find user by ID: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error}`);
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({
        where: { username },
      });
    } catch (error) {
      throw new Error(`Failed to find user by username: ${error}`);
    }
  }

  async findMany(
    params: UsersQueryDto
  ): Promise<{ data: UserWithRelations[]; meta: any }> {
    try {
      const { search, sortBy, sortOrder } = params;
      const { skip, take, page, limit } = this.buildPagination(params);

      const where: Prisma.UserWhereInput = search
        ? {
            OR: [
              { email: { contains: search, mode: "insensitive" } },
              { username: { contains: search, mode: "insensitive" } },
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
            ],
          }
        : {};

      const orderBy = this.buildOrderBy(sortBy, sortOrder);

      return await this.executeWithPagination(
        () =>
          this.db.user.findMany({
            where,
            include: {
              _count: {
                select: {
                  orders: true,
                  trades: true,
                },
              },
            },
            orderBy,
            skip,
            take,
          }),
        () => this.db.user.count({ where }),
        { page, limit }
      );
    } catch (error) {
      throw new Error(`Failed to find users: ${error}`);
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.db.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("User with this email or username already exists");
        }
      }
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.db.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Username already exists");
        }
        if (error.code === "P2025") {
          throw new Error("User not found");
        }
      }
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.db.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("User not found");
        }
      }
      throw new Error(`Failed to delete user: ${error}`);
    }
  }

  async exists(
    email: string,
    username: string,
    excludeId?: string
  ): Promise<boolean> {
    try {
      const where: Prisma.UserWhereInput = {
        OR: [{ email }, { username }],
      };

      if (excludeId) {
        where.NOT = { id: excludeId };
      }

      const count = await this.db.user.count({ where });
      return count > 0;
    } catch (error) {
      throw new Error(`Failed to check user existence: ${error}`);
    }
  }

  async getUserStats(userId: string): Promise<{
    totalOrders: number;
    totalTrades: number;
    totalVolume: number;
    joinedDaysAgo: number;
  }> {
    try {
      const user = await this.db.user.findUnique({
        where: { id: userId },
        select: { createdAt: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const [orderCount, tradeCount, tradeVolume] = await Promise.all([
        this.db.orders.count({ where: { userId } }),
        this.db.trade.count({ where: { buyUserId: userId } }),
        this.db.trade.aggregate({
          where: { buyUserId: userId },
          _sum: { amount: true },
        }),
      ]);

      const joinedDaysAgo = Math.floor(
        (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        totalOrders: orderCount,
        totalTrades: tradeCount,
        totalVolume: Number(tradeVolume._sum.amount) || 0,
        joinedDaysAgo,
      };
    } catch (error) {
      throw new Error(`Failed to get user stats: ${error}`);
    }
  }
}
