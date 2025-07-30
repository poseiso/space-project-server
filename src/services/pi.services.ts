import { prisma } from '../db';
import { SINGLE_PI_ID } from '../utils/const';

export async function getPi() {
  return prisma.pi.findUnique({ where: { id: SINGLE_PI_ID } });
}

export async function updatePi(value: string, digits: number) {
  return prisma.pi.update({ where: { id: SINGLE_PI_ID }, data: { value, digits } });
}

export function calculatePiToDigits(n: number): string {
  // compute pi
  return '3.1';
}
