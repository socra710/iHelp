import { PrismaClient } from '@prisma/client';

// PrismaClient는 개발 환경에서 여러 인스턴스가 생성되는 것을 방지하기 위해 전역 변수로 선언
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
