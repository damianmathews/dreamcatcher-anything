/**
 * Dream Capture Assistant API Endpoint
 *
 * POST /api/dreams/capture
 *
 * Transforms rambling dream descriptions into structured summaries.
 * Perfect for stream-of-consciousness dream recording.
 */

import { summarizeDreamRamble } from '../../../../services/openai';

/**
 * POST /api/dreams/capture
 */
export async function POST(request) {
  try {
    // Parse request body
    let body;
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
    if (!body.rambleText || typeof body.rambleText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'rambleText is required and must be a string' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Summarize the ramble
    const result = await summarizeDreamRamble(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[Dream Capture API] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to process dream';

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
