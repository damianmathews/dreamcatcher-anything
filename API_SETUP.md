# Dream Analysis API - Complete Setup Guide

**CRITICAL: This document ensures the AI features NEVER break again.**

## Current Working Configuration (DO NOT CHANGE)

### API Server
- **File**: `api-server.js` (root directory)
- **Port**: 3000
- **Network IP**: 192.168.1.224 (YOUR CURRENT IP)
- **Endpoints**:
  - `POST /api/dreams/analyze` - Analyze full dream text
  - `POST /api/dreams/chat` - Conversational AI chat
  - `GET /health` - Health check

### Mobile App Configuration
- **File**: `apps/mobile/src/services/dreamAnalysis.ts`
- **Line 66**: `return 'http://192.168.1.224:3000';`
- **File**: `apps/mobile/src/app/(tabs)/insights.jsx`
- **Line 269**: `fetch('http://192.168.1.224:3000/api/dreams/chat'...`
- **File**: `apps/mobile/src/app/(tabs)/test-api.jsx`
- **Line 20-21**: Points to correct IP and endpoint

### Environment Variables
- **File**: `apps/web/.env`
- **Required**: `OPENAI_API_KEY=sk-proj-...`
- **Optional**: `MOCK_MODE=false` (omit to use real OpenAI)

---

## How to Start the API Server

### For Real OpenAI (PRODUCTION)
```bash
cd ~/dreamcatcher-anything
node api-server.js
```

### For Testing Without API Costs (DEVELOPMENT)
```bash
cd ~/dreamcatcher-anything
MOCK_MODE=true node api-server.js
```

You'll see:
```
🚀 Dream Analysis API Server
   Mode: REAL OpenAI  (or MOCK)
   Port: 3000
   Network: http://192.168.1.224:3000

✅ Server running at:
   Local:   http://localhost:3000
   Network: http://192.168.1.224:3000
```

---

## If Your IP Address Changes

Your router occasionally reassigns IP addresses. If the AI stops working:

### 1. Find Your New IP
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Look for something like: `inet 192.168.1.XXX`

### 2. Update These 3 Files

**File 1**: `apps/mobile/src/services/dreamAnalysis.ts` (line 66)
```typescript
return 'http://192.168.1.XXX:3000';  // Replace XXX with your new IP
```

**File 2**: `apps/mobile/src/app/(tabs)/insights.jsx` (line 269)
```javascript
const response = await fetch('http://192.168.1.XXX:3000/api/dreams/chat', {
```

**File 3**: `apps/mobile/src/app/(tabs)/test-api.jsx` (line 20-21)
```javascript
addResult('Testing connection to http://192.168.1.XXX:3000...');
const response1 = await fetch('http://192.168.1.XXX:3000/api/dreams/analyze', {
```

### 3. Update API Server Display (line 29)
**File**: `api-server.js`
```javascript
console.log(`   Network: http://192.168.1.XXX:${PORT}\n`);
```

### 4. Restart Everything
```bash
# Kill old API server
pkill -f "node api-server.js"

# Start new API server
node api-server.js

# Reload mobile app (shake phone → Reload)
```

---

## Testing the API Works

### Test 1: API Endpoint
```bash
curl -X POST http://192.168.1.224:3000/api/dreams/analyze \
  -H "Content-Type: application/json" \
  -d '{"dreamText":"I was flying over an ocean"}'
```

**Expected Response**: JSON with `"isMock": false` and dream analysis

### Test 2: Chat Endpoint
```bash
curl -X POST http://192.168.1.224:3000/api/dreams/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What do tigers mean in dreams?"}]}'
```

**Expected Response**: JSON with `"isMock": false` and AI chat response

### Test 3: Mobile App
1. Open app in Expo Go
2. Go to **test-api** tab (bottom right)
3. Tap "Test API Connection"
4. Should see: `✅ SUCCESS: Got analysis (Mock: false)`

### Test 4: Chat Interface
1. Go to **Insights** tab → **AI Chat**
2. Type: "What does dreaming about flying mean?"
3. Should get a UNIQUE, detailed AI response
4. Ask another question - should get DIFFERENT response

---

## Common Issues & Fixes

### Issue 1: FetchError / Connection Timeout
**Cause**: Wrong IP address or server not running
**Fix**:
1. Check your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. Update all 3 files with correct IP
3. Restart API server

### Issue 2: AI Gives Same Response Every Time
**Cause**: Using MOCK_MODE or hardcoded responses
**Fix**:
1. Kill server: `pkill -f "node api-server.js"`
2. Start without MOCK_MODE: `node api-server.js`
3. Verify server says "Mode: REAL OpenAI"

### Issue 3: "Mock: true" in Test Results
**Cause**: Server running in MOCK_MODE
**Fix**: Restart server without `MOCK_MODE=true`

### Issue 4: Chat Not Responding
**Cause**: insights.jsx not calling API (using fake setTimeout)
**Fix**: Make sure line 258-304 in `insights.jsx` has:
```javascript
const response = await fetch('http://192.168.1.224:3000/api/dreams/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages }),
});
```

NOT:
```javascript
// Simulate AI response  ❌ WRONG
setTimeout(() => { ... }, 1500);
```

---

## Architecture Overview

### API Flow
```
Mobile App (Expo)
    ↓
dreamAnalysis.ts → http://192.168.1.224:3000
    ↓
api-server.js (Express)
    ↓
OpenAI GPT-4o-mini API
    ↓
Returns dream analysis
    ↓
Displays in mobile app
```

### Files That Call the API
1. ✅ `apps/mobile/src/services/dreamAnalysis.ts` - Dream analysis service
2. ✅ `apps/mobile/src/app/(tabs)/insights.jsx` - AI chat interface
3. ✅ `apps/mobile/src/app/(tabs)/test-api.jsx` - API testing screen

**ALL THREE must have the correct IP address.**

---

## Preventing Future Breakage

### DO:
- ✅ Use `node api-server.js` to start with real OpenAI
- ✅ Update all 3 mobile files when IP changes
- ✅ Test with curl after any changes
- ✅ Verify "Mode: REAL OpenAI" in server logs
- ✅ Check `isMock: false` in API responses

### DON'T:
- ❌ Use `MOCK_MODE=true` in production
- ❌ Hardcode fake responses with `setTimeout()`
- ❌ Use old IP addresses (192.168.1.236)
- ❌ Use wrong ports (4000, 8081, etc.)
- ❌ Use wrong endpoints (/chat instead of /dreams/chat)
- ❌ Commit without testing

---

## Cost Monitoring

Each API call costs approximately:
- **Dream Analysis**: ~400-500 tokens = $0.0001 (1/100th of a cent)
- **Chat Message**: ~300-400 tokens = $0.00008 (8/1000th of a cent)

At this rate, 10,000 messages = ~$1.00

Check your OpenAI usage at: https://platform.openai.com/usage

---

## Quick Troubleshooting Checklist

When AI features break:

- [ ] Is API server running? `lsof -iTCP:3000 -sTCP:LISTEN`
- [ ] Does server say "Mode: REAL OpenAI"?
- [ ] Is IP address correct? `ifconfig | grep inet`
- [ ] Do all 3 mobile files have correct IP?
- [ ] Does curl test work? (see Test 1 above)
- [ ] Is OpenAI API key valid in `.env`?
- [ ] Did you reload the mobile app?

---

**Last Updated**: 2025-10-30
**Status**: ✅ WORKING - Real OpenAI Connected
**Server**: http://192.168.1.224:3000
**Endpoints**: /api/dreams/analyze, /api/dreams/chat
