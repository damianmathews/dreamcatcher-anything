/**
 * Dream Analysis API Server
 * Simple Express server for mobile app backend
 */

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Enable mock mode if specified
if (process.env.MOCK_MODE === 'true') {
  process.env.MOCK_MODE = 'true';
}

import { analyzeDream, getServiceInfo } from '../web/src/services/openai.ts';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(identifier) {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimit.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      resetIn: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count++;
  return { allowed: true };
}

// POST /api/dreams/analyze
app.post('/api/dreams/analyze', async (req, res) => {
  try {
    const serviceInfo = getServiceInfo();
    if (!serviceInfo.configured) {
      return res.status(503).json({
        error: 'Dream analysis service is not configured'
      });
    }

    const clientId = req.ip || 'default';
    const rateLimitResult = checkRateLimit(clientId);

    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        resetIn: rateLimitResult.resetIn
      });
    }

    if (!req.body.dreamText) {
      return res.status(400).json({ error: 'dreamText is required' });
    }

    const result = await analyzeDream(req.body);
    res.json(result);
  } catch (error) {
    console.error('[API] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/dreams/analyze - Status check
app.get('/api/dreams/analyze', (req, res) => {
  const serviceInfo = getServiceInfo();
  res.json({
    service: 'Dream Analysis API',
    status: serviceInfo.configured ? 'operational' : 'not configured',
    ...serviceInfo
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Dream Analysis API Server`);
  console.log(`   Local:   http://localhost:${PORT}/`);
  console.log(`   Network: http://192.168.1.236:${PORT}/\n`);
});
