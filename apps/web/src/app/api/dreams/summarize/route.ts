/**
 * Dream Summarization API Endpoint
 *
 * POST /api/dreams/summarize
 *
 * Analyzes multiple dreams to identify patterns and insights.
 */

import { summarizeDreams } from '../../../../services/openai';

/**
 * POST /api/dreams/summarize
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
    if (!body.dreams || !Array.isArray(body.dreams) || body.dreams.length === 0) {
      return new Response(
        JSON.stringify({ error: 'dreams array is required and must not be empty' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate dream objects
    for (const dream of body.dreams) {
      if (!dream.title || !dream.description || !dream.date) {
        return new Response(
          JSON.stringify({ error: 'Each dream must have title, description, and date' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Summarize dreams
    const result = await summarizeDreams(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[Dream Summarization API] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to summarize dreams';

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
