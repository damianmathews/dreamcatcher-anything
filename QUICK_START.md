# Quick Start - Dream Analysis

Get the dream analysis feature up and running in 5 minutes!

## Option 1: Mock Mode (Fastest - No API Key)

```bash
# 1. Navigate to web backend
cd apps/web

# 2. Create .env file
cp .env.example .env

# 3. Edit .env and set:
# MOCK_MODE=true

# 4. Install dependencies (if not already done)
npm install

# 5. Start server
npm run dev

# 6. Test it!
curl -X POST http://localhost:3000/api/dreams/analyze \
  -H "Content-Type: application/json" \
  -d '{"dreamText": "I was flying over an ocean feeling peaceful"}'
```

✅ **Done!** Mock responses work without any API keys.

## Option 2: Real OpenAI API

```bash
# 1. Get API key from https://platform.openai.com/api-keys

# 2. Navigate to web backend
cd apps/web

# 3. Create .env file
cp .env.example .env

# 4. Edit .env and add:
OPENAI_API_KEY=sk-your-actual-key-here
MOCK_MODE=false

# 5. Install dependencies (if not already done)
npm install

# 6. Start server
npm run dev

# 7. Test it!
curl -X POST http://localhost:3000/api/dreams/analyze \
  -H "Content-Type: application/json" \
  -d '{"dreamText": "I was flying over an ocean feeling peaceful"}'
```

✅ **Done!** Real AI-powered dream analysis is live!

## Use in Mobile App

```typescript
import { analyzeDream } from '@/services/dreamAnalysis';

const result = await analyzeDream({
  dreamText: "Your dream here...",
});

console.log(result.analysis.summary);
console.log(result.analysis.themes);
console.log(result.analysis.emotions);
```

## Common Issues

**Can't connect from mobile app?**
- iOS Simulator: Use `http://localhost:3000`
- Android Emulator: Use `http://10.0.2.2:3000`
- Physical Device: Use `http://YOUR_LOCAL_IP:3000`

**"Service not configured"?**
- Set `MOCK_MODE=true` in `.env`, or
- Add valid `OPENAI_API_KEY` to `.env`
- Restart server after changes

## Full Documentation

See [DREAM_ANALYSIS_SETUP.md](./DREAM_ANALYSIS_SETUP.md) for complete setup, troubleshooting, and configuration options.
