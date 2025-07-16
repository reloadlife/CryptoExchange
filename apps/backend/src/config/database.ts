import { PrismaClient } from "@prisma/client"
import env from "./env"

// Global Prisma client instance
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

class DatabaseManager {
  private static instance: DatabaseManager
  private _prisma: PrismaClient

  private constructor() {
    this._prisma =
      globalThis.__prisma ||
      new PrismaClient({
        log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
        errorFormat: "pretty",
      })

    if (env.NODE_ENV !== "production") {
      globalThis.__prisma = this._prisma
    }
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }

  public get prisma(): PrismaClient {
    return this._prisma
  }

  public async connect(): Promise<void> {
    try {
      await this._prisma.$connect()
      console.log("✅ Database connected successfully")
    } catch (error) {
      console.error("❌ Database connection failed:", error)
      throw error
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this._prisma.$disconnect()
      console.log("✅ Database disconnected successfully")
    } catch (error) {
      console.error("❌ Database disconnection failed:", error)
      throw error
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this._prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error("❌ Database health check failed:", error)
      return false
    }
  }

  public async runMigrations(): Promise<void> {
    try {
      // In production, migrations should be run separately
      if (env.NODE_ENV !== "production") {
        console.log("🔄 Running database migrations...")
        // Prisma migrations are typically run via CLI
        // This is just for development convenience
      }
    } catch (error) {
      console.error("❌ Migration failed:", error)
      throw error
    }
  }
}

// Export singleton instance
export const database = DatabaseManager.getInstance()
export const prisma = database.prisma

export default database
