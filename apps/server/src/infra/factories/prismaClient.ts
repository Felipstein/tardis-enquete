import { prisma } from '../database/prisma';

export function factoryPrismaClient() {
  return prisma;
}
