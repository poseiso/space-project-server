import { FastifyReply, FastifyRequest } from 'fastify';
import { getPi, updatePi } from '../services/pi.services';
import { pauseCalc, resetCalc, resumeCalc } from '../state';
import { DEFAULT_PI_DIGIT, DEFAULT_PI_VALUE } from '../utils/const';

export async function handleGetPi(req: FastifyRequest, res: FastifyReply) {
  try {
    const pi = await getPi();
    if (!pi) return res.status(404).send({ error: 'Pi not found' });
    res.send({ pi: pi.value, digits: pi.digits, updatedAt: pi.updatedAt });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed to fetch pi' }); 
  }
}

export async function handlePause(req: FastifyRequest, res: FastifyReply) {
  try {
    pauseCalc();
    res.send({ status: 'paused', timestamp: new Date().toISOString() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed pause pi calculation' }); 
  }
}

export async function handleResume(req: FastifyRequest, res: FastifyReply) {
  try {
    resumeCalc();
    res.send({ status: 'resumed', timestamp: new Date().toISOString() });
  } catch (error) {
    req.log.error(error)
    res.status(500).send({ error: 'Failed to resume pi calculation' }); 
  }
}

export async function handleReset(req: FastifyRequest, res: FastifyReply) {
  try {
    await updatePi(DEFAULT_PI_VALUE, DEFAULT_PI_DIGIT);
    resetCalc();
    res.send({ status: 'reset', pi: DEFAULT_PI_VALUE, digits: DEFAULT_PI_DIGIT, timestamp: new Date().toISOString() });
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
