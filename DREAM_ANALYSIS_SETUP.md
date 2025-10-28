# Dream Analysis Setup Guide

This guide will help you set up the OpenAI-powered dream analysis feature for your Dreamcatcher app.

## Overview

The dream analysis feature provides AI-powered insights into dreams, including:
- **Summary**: A concise overview of the dream's narrative
- **Themes**: Key psychological themes present in the dream
- **Emotions**: Emotional tones detected in the dream
- **Symbols**: Common dream symbols and their interpretations
- **Insights**: Deeper psychological patterns and connections

## Architecture

```
┌─────────────────┐
│   Mobile App    │
│  (React Native) │
└────────┬────────┘
         │
         │ HTTP POST /api/dreams/analyze
         │
         ▼
┌─────────────────┐
│   Web Backend   │
│ (React Router)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  OpenAI Service │
│   (GPT-4o-mini) │
└─────────────────┘
```

## Quick Start

### Option 1: Mock Mode (No API Key Required)

Perfect for development and testing without OpenAI costs.

1. **Create `.env` file in `apps/web/`**:
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

2. **Enable mock mode**:
   ```env
   MOCK_MODE=true
   ```

3. **Start the web server**:
   ```bash
   cd apps/web
   npm run dev
   ```

4. **Test the API**:
   ```bash
   curl http://localhost:3000/api/dreams/analyze \
     -H "Content-Type: application/json" \
     -d '{"dreamText": "I was flying over an ocean feeling free and peaceful"}'
   ```

### Option 2: Production Setup (OpenAI API)

For real AI-powered dream analysis in production.

## Step-by-Step Setup

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)
5. **IMPORTANT**: Store it securely - you won't be able to see it again!

### 2. Configure Environment Variables

1. **Navigate to the web backend**:
   ```bash
   cd apps/web
   ```

2. **Copy the example environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` and add your OpenAI API key**:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=sk-your-actual-api-key-here

   # Disable mock mode for production
   MOCK_MODE=false

   # Optional: Customize the model and parameters
   OPENAI_MODEL=gpt-4o-mini
   OPENAI_MAX_TOKENS=2000
   OPENAI_TEMPERATURE=0.7
   ```

### 3. Install Dependencies

```bash
# In apps/web directory
npm install
```

The OpenAI SDK (`openai` package) should already be installed.

### 4. Start the Backend Server

```bash
cd apps/web
npm run dev
```

The server should start on `http://localhost:3000` (or the port specified in your config).

### 5. Test the API Endpoint

**Check service status**:
```bash
curl http://localhost:3000/api/dreams/analyze
```

Expected response:
```json
{
  "service": "Dream Analysis API",
  "status": "operational",
  "configured": true,
  "mockMode": false,
  "model": "gpt-4o-mini",
  "hasApiKey": true
}
```

**Analyze a dream**:
```bash
curl -X POST http://localhost:3000/api/dreams/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "dreamText": "I was flying over a vast ocean. The water was incredibly clear and blue. I felt completely free and peaceful.",
    "metadata": {
      "mood": "peaceful",
      "tags": ["flying", "water"]
    }
  }'
```

Expected response:
```json
{
  "analysis": {
    "summary": "...",
    "themes": ["Freedom and transcendence", "..."],
    "emotions": ["Peaceful", "Liberated"],
    "symbols": [
      {
        "symbol": "Flying",
        "interpretation": "..."
      }
    ],
    "insights": "...",
    "disclaimer": "..."
  },
  "tokensUsed": 450,
  "model": "gpt-4o-mini",
  "isMock": false
}
```

## Mobile App Integration

### 1. Configure API URL

Edit `apps/mobile/app.config.js` (or create it) to set your API URL:

```javascript
export default {
  expo: {
    // ... other config
    extra: {
      apiUrl: process.env.API_URL || 'http://localhost:3000'
    }
  }
}
```

**For different platforms**:
- **iOS Simulator**: `http://localhost:3000`
- **Android Emulator**: `http://10.0.2.2:3000`
- **Physical Device**: `http://YOUR_COMPUTER_IP:3000` (e.g., `http://192.168.1.100:3000`)
- **Production**: `https://your-production-api.com`

### 2. Use in Your App

```typescript
import { analyzeDream } from '@/services/dreamAnalysis';

// In your component or function
async function handleAnalyzeDream(dreamText: string) {
  try {
    const result = await analyzeDream({
      dreamText,
      metadata: {
        mood: 'peaceful',
        tags: ['flying', 'water']
      }
    });

    console.log('Summary:', result.analysis.summary);
    console.log('Themes:', result.analysis.themes);
    console.log('Emotions:', result.analysis.emotions);
    console.log('Symbols:', result.analysis.symbols);

    // Display the analysis in your UI
    setAnalysis(result.analysis);
  } catch (error) {
    console.error('Analysis failed:', error);
    // Show error to user
  }
}
```

## Configuration Options

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes* | - | Your OpenAI API key (*not required in mock mode) |
| `MOCK_MODE` | No | `false` | Enable mock responses without API calls |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | OpenAI model to use |
| `OPENAI_MAX_TOKENS` | No | `2000` | Maximum tokens per response |
| `OPENAI_TEMPERATURE` | No | `0.7` | Creativity level (0.0-1.0) |

### Model Options

**Recommended Models**:
- `gpt-4o-mini` (default): Fast, cost-effective, good quality
- `gpt-4o`: Best quality, higher cost
- `gpt-3.5-turbo`: Faster, lower cost, decent quality

**Cost Estimates** (as of 2024):
- `gpt-4o-mini`: ~$0.00015 per dream analysis
- `gpt-4o`: ~$0.0015 per dream analysis
- `gpt-3.5-turbo`: ~$0.0001 per dream analysis

## API Reference

### POST /api/dreams/analyze

Analyzes dream content and returns structured insights.

**Request Body**:
```typescript
{
  dreamText: string;           // Required: The dream description
  userId?: string;             // Optional: User identifier
  metadata?: {                 // Optional: Additional context
    date?: string;             // Dream date
    mood?: string;             // User's mood
    tags?: string[];           // User-defined tags
  };
}
```

**Response** (200 OK):
```typescript
{
  analysis: {
    summary: string;           // Brief overview
    themes: string[];          // Key themes
    emotions: string[];        // Detected emotions
    symbols: Array<{           // Dream symbols
      symbol: string;
      interpretation: string;
    }>;
    insights: string;          // Deeper analysis
    disclaimer: string;        // Legal disclaimer
  };
  tokensUsed?: number;         // API usage (if real API)
  model?: string;              // Model used
  isMock: boolean;             // Whether mock mode was used
}
```

**Error Responses**:
- `400 Bad Request`: Invalid input
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: API not configured

### GET /api/dreams/analyze

Returns the status of the dream analysis service.

**Response** (200 OK):
```json
{
  "service": "Dream Analysis API",
  "status": "operational",
  "configured": true,
  "mockMode": false,
  "model": "gpt-4o-mini",
  "hasApiKey": true
}
```

## Features

### ✅ Mock Mode
- Full functionality without API keys
- Realistic responses based on keyword detection
- Zero cost for development and testing
- Enable with `MOCK_MODE=true`

### ✅ Rate Limiting
- 10 requests per minute per IP address
- Prevents API abuse and cost overruns
- Automatic reset after time window
- Returns `429` status when exceeded

### ✅ Content Validation
- Minimum 10 characters
- Maximum 10,000 characters
- Proper error messages
- Type checking

### ✅ Error Handling
- Graceful fallback to mock mode
- Detailed error messages
- Network error detection
- OpenAI API error handling

## Troubleshooting

### "Service not configured" error

**Problem**: The API returns a 503 error saying the service is not configured.

**Solution**:
1. Check that your `.env` file exists in `apps/web/`
2. Verify your `OPENAI_API_KEY` is set correctly
3. Or enable `MOCK_MODE=true` for development
4. Restart your server after changing `.env`

### "Invalid API key" error

**Problem**: OpenAI returns a 401 error.

**Solution**:
1. Verify your API key is correct (starts with `sk-`)
2. Check that you haven't exceeded your OpenAI usage limits
3. Ensure your OpenAI account has billing enabled
4. Generate a new API key if needed

### "Rate limit exceeded" error

**Problem**: You're making too many requests.

**Solution**:
1. Wait for the rate limit window to reset (shown in error)
2. Implement request queuing in your app
3. Consider caching analyses for the same dream
4. Contact support if you need higher limits

### Mobile app can't connect to API

**Problem**: Fetch fails with network error.

**Solution**:
1. **iOS Simulator**: Use `http://localhost:3000`
2. **Android Emulator**: Use `http://10.0.2.2:3000`
3. **Physical Device**:
   - Ensure device is on the same network
   - Use your computer's local IP
   - Check firewall settings
4. Verify the backend server is running
5. Test the API with `curl` first

### Response is in mock mode unexpectedly

**Problem**: `isMock: true` even though you set an API key.

**Solution**:
1. Check that `MOCK_MODE=false` in `.env`
2. Verify the `.env` file is in the correct location
3. Restart your server after changing `.env`
4. Check for typos in environment variable names

## Security Best Practices

### 🔒 Protecting Your API Key

1. **Never commit `.env` files to git**
   - The `.env` file is in `.gitignore` by default
   - Use `.env.example` for documentation only

2. **Use environment variables in production**
   - Set variables through your hosting platform
   - Never hardcode keys in source code

3. **Rotate keys regularly**
   - Generate new keys periodically
   - Revoke old keys in OpenAI dashboard

4. **Monitor usage**
   - Set up usage alerts in OpenAI dashboard
   - Review API logs regularly

### 🔒 Backend Security

The API includes several security features:
- Rate limiting per IP address
- Content validation and sanitization
- No sensitive data in error messages
- Proper HTTP status codes

## Cost Management

### Estimating Costs

For `gpt-4o-mini` (recommended):
- ~$0.00015 per dream analysis
- ~$1.50 per 10,000 analyses
- ~$15 per 100,000 analyses

### Reducing Costs

1. **Use mock mode in development**
   - Enable `MOCK_MODE=true` for testing
   - Only use real API for production

2. **Implement caching**
   - Cache analyses for the same dream text
   - Store analyses locally in the app

3. **Set usage limits**
   - Monitor OpenAI dashboard
   - Set spending limits in OpenAI account
   - Implement stricter rate limiting

4. **Optimize prompts**
   - Reduce `OPENAI_MAX_TOKENS` if responses are too long
   - Use shorter system prompts

## Next Steps

1. **Integrate with your UI**
   - Create a "Analyze Dream" button
   - Display analysis in a nice format
   - Add loading and error states

2. **Store analyses**
   - Save analyses to local database
   - Associate with dream entries
   - Enable offline access

3. **Add features**
   - Dream journal with analysis history
   - Pattern detection across multiple dreams
   - Shareable dream insights

4. **Optimize**
   - Add caching layer
   - Implement retry logic
   - Add analytics

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review API logs in your terminal
3. Test with `curl` to isolate frontend issues
4. Check OpenAI dashboard for API issues

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [OpenAI Pricing](https://openai.com/pricing)
- [OpenAI Usage Limits](https://platform.openai.com/account/limits)

---

**Note**: This implementation includes a disclaimer that AI analysis is for entertainment and self-reflection only, not professional psychological advice.
