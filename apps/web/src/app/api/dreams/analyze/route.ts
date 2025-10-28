/**
 * Dream Analysis API Endpoint
 *
 * POST /api/dreams/analyze
 *
 * Analyzes dream content using OpenAI and returns structured insights.
 * Supports mock mode for development without API keys.
 */

import { analyzeDream, getServiceInfo, type DreamAnalysisInput } from '../../../../services/openai';

// Rate limiting configuration (basic in-memory implementation)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP

/**
 * Simple rate limiting check
 */
function checkRateLimit(identifier: string): { allowed: boolean; resetIn?: number } {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  if (!record || now > record.resetTime) {
    // New window
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

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (for proxied requests)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Fallback to a generic identifier
  return 'default-client';
}

/**
 * POST /api/dreams/analyze
 */
export async function POST(request: Request) {
  try {
    // Check if service is configured
    const serviceInfo = getServiceInfo();
    if (!serviceInfo.configured) {
      return new Response(
        JSON.stringify({
          error: 'Dream analysis service is not configured. Please add OPENAI_API_KEY to your environment variables or enable MOCK_MODE.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(clientId);

    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
          resetIn: rateLimitResult.resetIn,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.resetIn || 60),
          },
        }
      );
    }

    // Parse request body
    let body: DreamAnalysisInput;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate required fields
    if (!body.dreamText || typeof body.dreamText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'dreamText is required and must be a string' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Analyze the dream
    const result = await analyzeDream(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[Dream Analysis API] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze dream';

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * GET /api/dreams/analyze
 * Returns service status
 */
export async function GET() {
  const serviceInfo = getServiceInfo();

  return new Response(
    JSON.stringify({
      service: 'Dream Analysis API',
      status: serviceInfo.configured ? 'operational' : 'not configured',
      ...serviceInfo,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
