/**
 * Simple Express API Server for Dream Analysis
 * Runs on port 3000
 */

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config({ path: './apps/web/.env' });

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI (with mock mode support)
const MOCK_MODE = process.env.MOCK_MODE === 'true';
const openai = MOCK_MODE ? null : new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 second timeout
  maxRetries: 2,
});

console.log(`\n🚀 Dream Analysis API Server`);
console.log(`   Mode: ${MOCK_MODE ? 'MOCK (no API key needed)' : 'REAL OpenAI'}`);
console.log(`   Port: ${PORT}`);
console.log(`   Network: http://192.168.1.224:${PORT}\n`);

// Mock response generator
function getMockAnalysis(dreamText) {
  return {
    analysis: {
      summary: `This dream appears to explore themes of ${dreamText.includes('fly') ? 'freedom and elevation' : 'exploration and discovery'}. The imagery suggests a journey of personal growth.`,
      themes: ['Freedom', 'Exploration', 'Personal Growth', 'Transformation'],
      emotions: ['Peace', 'Wonder', 'Curiosity', 'Joy'],
      symbols: [
        {
          symbol: dreamText.includes('water') || dreamText.includes('ocean') ? 'Water' : 'Sky',
          interpretation: 'Represents the subconscious mind and emotional depth'
        },
        {
          symbol: 'Journey',
          interpretation: 'Symbolizes life transitions and personal evolution'
        }
      ],
      insights: 'Your dream suggests you are in a phase of personal transformation. The peaceful nature of the dream indicates comfort with change.',
      disclaimer: 'This is a symbolic interpretation for entertainment purposes only. Dreams are highly personal and subjective.'
    },
    isMock: true,
    model: 'mock-analyzer-v1'
  };
}

// POST /api/dreams/analyze
app.post('/api/dreams/analyze', async (req, res) => {
  try {
    const { dreamText } = req.body;

    if (!dreamText || dreamText.trim().length < 10) {
      return res.status(400).json({
        error: 'dreamText is required and must be at least 10 characters'
      });
    }

    // Mock mode
    if (MOCK_MODE) {
      console.log('📝 Analyzing dream (MOCK MODE):', dreamText.substring(0, 50) + '...');
      const mockResponse = getMockAnalysis(dreamText);
      return res.json(mockResponse);
    }

    // Real OpenAI mode
    console.log('📝 Analyzing dream with OpenAI:', dreamText.substring(0, 50) + '...');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a dream interpretation assistant. Analyze dreams and provide structured insights about themes, emotions, symbols, and their meanings. Be thoughtful and insightful but remember this is for entertainment purposes only.'
        },
        {
          role: 'user',
          content: `Analyze this dream and provide insights:\n\n${dreamText}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'dream_analysis',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              summary: { type: 'string' },
              themes: {
                type: 'array',
                items: { type: 'string' }
              },
              emotions: {
                type: 'array',
                items: { type: 'string' }
              },
              symbols: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    symbol: { type: 'string' },
                    interpretation: { type: 'string' }
                  },
                  required: ['symbol', 'interpretation'],
                  additionalProperties: false
                }
              },
              insights: { type: 'string' },
              disclaimer: { type: 'string' }
            },
            required: ['summary', 'themes', 'emotions', 'symbols', 'insights', 'disclaimer'],
            additionalProperties: false
          }
        }
      },
      temperature: 0.7,
    });

    const analysis = JSON.parse(completion.choices[0].message.content);

    res.json({
      analysis,
      tokensUsed: completion.usage.total_tokens,
      model: completion.model,
      isMock: false
    });

  } catch (error) {
    console.error('❌ Error analyzing dream:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code
    });
    res.status(500).json({
      error: 'Failed to analyze dream',
      details: error.message,
      type: error.type || 'unknown'
    });
  }
});

// POST /api/dreams/chat - Chat endpoint for conversational AI
app.post('/api/dreams/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'messages array is required'
      });
    }

    // Mock mode
    if (MOCK_MODE) {
      console.log('💬 Chat request (MOCK MODE)');
      return res.json({
        message: "I'm analyzing your dreams and understanding your patterns. Each dream you share helps me provide more personalized insights about your subconscious mind and emotional journey.",
        isMock: true
      });
    }

    // Real OpenAI mode
    console.log('💬 Chat request with OpenAI:', messages[messages.length - 1].content.substring(0, 50) + '...');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a dream interpretation assistant and therapist. Help users understand their dreams by providing insightful, empathetic responses about dream symbolism, patterns, and psychological meanings. Be warm, supportive, and conversational.'
        },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 300,
    });

    res.json({
      message: completion.choices[0].message.content,
      tokensUsed: completion.usage.total_tokens,
      model: completion.model,
      isMock: false
    });

  } catch (error) {
    console.error('❌ Error in chat:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message
    });
  }
});

// GET /api/dreams/analyze - Status check
app.get('/api/dreams/analyze', (req, res) => {
  res.json({
    service: 'Dream Analysis API',
    status: 'operational',
    mode: MOCK_MODE ? 'mock' : 'openai',
    configured: MOCK_MODE || !!process.env.OPENAI_API_KEY
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at:`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://192.168.1.224:${PORT}`);
  console.log(`\nTest with:`);
  console.log(`   curl -X POST http://localhost:${PORT}/api/dreams/analyze -H "Content-Type: application/json" -d '{"dreamText":"I was flying over an ocean"}'`);
});
