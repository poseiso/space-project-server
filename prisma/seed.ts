import { PrismaClient } from '@prisma/client';
import { DEFAULT_PI_DIGIT, DEFAULT_PI_VALUE, SINGLE_PI_ID } from '../src/utils/const';
const prisma = new PrismaClient();

async function seed() {
  await prisma.pi.upsert({
    where: { id: SINGLE_PI_ID },
    update: {},
    create: {
      id: SINGLE_PI_ID,
      value: DEFAULT_PI_VALUE,
      digits: DEFAULT_PI_DIGIT
    },
  });
  console.log('Seed complete');
}

seed().finally(() => prisma.$disconnect());
