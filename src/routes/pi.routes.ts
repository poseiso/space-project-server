import { FastifyInstance } from 'fastify';

export async function piRoutes(fastify: FastifyInstance) {
  fastify.get('/health', (_,__)=>{});

  fastify.get('/pi', (_,__)=>{});
  fastify.post('/pi/pause', (_,__)=>{});
  fastify.post('/pi/resume', (_,__)=>{});
  fastify.post('/pi/reset', (_,__)=>{});
}
