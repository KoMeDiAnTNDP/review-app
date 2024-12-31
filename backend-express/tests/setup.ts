import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env.test') });

const prisma = new PrismaClient();

beforeAll(async () => {
  // Ensure test database exists
  await prisma.$executeRaw`PRAGMA foreign_keys = ON`;
  await prisma.review.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});