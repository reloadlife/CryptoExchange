import type { PrismaClient } from "@prisma/client"
import { prisma } from "../config/database"
import type { BaseRepository, PaginationMeta, PaginationParams } from "../types/common"

export abstract class BaseRepositoryImpl<T> implements BaseRepository<T> {
  protected db: PrismaClient

  constructor() {
    this.db = prisma
  }

  abstract findById(id: string): Promise<T | null>
  abstract findMany(params?: any): Promise<T[]>
  abstract create(data: any): Promise<T>
  abstract update(id: string, data: any): Promise<T>
  abstract delete(id: string): Promise<boolean>

  protected buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
    const totalPages = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  }

  protected buildOrderBy(sortBy?: string, sortOrder?: "asc" | "desc") {
    if (!sortBy) return undefined

    return {
      [sortBy]: sortOrder || "desc",
    }
  }

  protected buildPagination(params: PaginationParams) {
    const page = params.page || 1
    const limit = Math.min(params.limit || 20, 100) // Max 100 items per page
    const skip = (page - 1) * limit

    return {
      skip,
      take: limit,
      page,
      limit,
    }
  }

  protected async executeWithPagination<TData>(
    findManyQuery: () => Promise<TData[]>,
    countQuery: () => Promise<number>,
    paginationParams: PaginationParams
  ) {
    const { page, limit } = this.buildPagination(paginationParams)

    const [data, total] = await Promise.all([findManyQuery(), countQuery()])

    const meta = this.buildPaginationMeta(page, limit, total)

    return {
      data,
      meta,
    }
  }
}
