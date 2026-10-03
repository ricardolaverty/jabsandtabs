import "server-only";
import { PrismaClient } from "@prisma/client";

/** True when a database is configured. Without it the site uses src/data. */
export const hasDatabase = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "");

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Lazily creates a single PrismaClient (reused across hot reloads).
 * Returns null when DATABASE_URL is not set so callers can fall back.
 */
export function getPrisma(): PrismaClient | null {
  if (!hasDatabase) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
}
