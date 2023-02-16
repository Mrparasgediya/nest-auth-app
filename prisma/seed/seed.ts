import { PrismaClient } from '@prisma/client';
import { insertPowerList } from './power.seed';

export async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    await insertPowerList(prisma);
  } catch (e) {
    console.log(e);
  }
  await prisma.$disconnect();
}

main();
