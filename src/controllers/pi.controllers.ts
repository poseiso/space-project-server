import { FastifyReply, FastifyRequest } from 'fastify';

export async function handleGetPi(req: FastifyRequest, res: FastifyReply) {
  try {
    res.send({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed to fetch pi' }); 
  }
}

export async function handlePause(req: FastifyRequest, res: FastifyReply) {
  try {
    res.send({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed pause pi calculation' }); 
  }
}

export async function handleResume(req: FastifyRequest, res: FastifyReply) {
  try {
    res.send({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed to resume pi calculation' }); 
  }
}

export async function handleReset(req: FastifyRequest, res: FastifyReply) {
  try {
    res.send({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed to reset pi calculation' }); 
  }
}

export async function healthCheck(req: FastifyRequest, res: FastifyReply) {
  try {
    res.send({ status: 'ok', uptime: process.uptime() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Health check failed' }); 
  }
}
