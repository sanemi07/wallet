import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

// Prefer env already provided by the host app, then fall back to the db package .env.
if (!process.env.DATABASE_URL) {
  const candidateEnvPaths = [
    path.resolve(currentDir, "../../.env"),
    path.resolve(currentDir, "../../../packages/database/.env"),
  ];

  for (const envPath of candidateEnvPaths) {
    if (!existsSync(envPath)) continue;

    loadEnv({ path: envPath });

    if (process.env.DATABASE_URL) break;
  }
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
