/**
 * Dream Chat API Endpoint
 *
 * POST /api/dreams/chat
 *
 * Enables conversational interaction about dream insights.
 */

import { chatAboutDream } from '../../../../services/openai';

/**
 * POST /api/dreams/chat
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
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'messages array is required and must not be empty' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Chat with AI
    const result = await chatAboutDream(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[Dream Chat API] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to process chat';

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
