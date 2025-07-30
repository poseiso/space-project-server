import { FastifyInstance } from 'fastify';
import { handleGetPi, handlePause, handleResume, handleReset, healthCheck } from '../controllers/pi.controllers'

export async function piRoutes(fastify: FastifyInstance) {
  fastify.get('/health', healthCheck);

  fastify.get('/pi', handleGetPi);
  fastify.post('/pi/pause', handlePause);
  fastify.post('/pi/resume', handleResume);
  fastify.post('/pi/reset', handleReset);
}
