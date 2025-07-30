import Fastify from 'fastify';
import dotenv from 'dotenv';
import { COUNT_INTERVAL, PORT } from './utils/const';
import { prisma } from './db';
import { piRoutes } from './routes/pi.routes';
dotenv.config();

const fastify = Fastify({ logger: true });
let piInterval: NodeJS.Timeout;

async function startPiLoop() {
  piInterval = setInterval(async () => {
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

