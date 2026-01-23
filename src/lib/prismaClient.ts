import "dotenv/config"
import { PrismaClient } from '@prisma/client';

// Evita múltiplas instâncias do Prisma no desenvolvimento (Hot Reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;