import Fastify from 'fastify';
import { piRoutes } from './routes/pi.routes';
import { prisma } from './db';
import { calculatePiToDigits, getPi, updatePi } from './services/pi.services';
import { isPaused } from './state';
import { COUNT_INTERVAL, MAX_DIGITS, PORT } from './utils/const';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });
let piInterval: NodeJS.Timeout;

async function startPiLoop() {
  piInterval = setInterval(async () => {
    try {
      if (!isPaused) {
        const record = await getPi();
        if (record) {

          if (record.digits >= MAX_DIGITS) return;

          const nextDigits = record.digits + 1;
          const newValue = calculatePiToDigits(nextDigits);
          await updatePi(newValue, nextDigits);
        }
      }
    } catch (err) {
      console.error("Loop error:", err);
    }
  }, COUNT_INTERVAL);
}

fastify.register(piRoutes);

fastify.addHook('onClose', async () => {
  clearInterval(piInterval);
  await prisma.$disconnect();
});

fastify.listen({ port: PORT }, async (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${PORT}`);
  startPiLoop();
});

