import { PrismaClient } from '@prisma/client';

export async function insertPowerList(prisma: PrismaClient) {
  await prisma.power.createMany({
    data: [
      {
        name: 'grass',
      },
      {
        name: 'fire',
      },
      {
        name: 'thunder',
      },
    ],
  });
}
