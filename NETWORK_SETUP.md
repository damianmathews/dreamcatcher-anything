# Network Setup for Dream Analysis API

## Current Issue

The API server runs successfully on `localhost:3000` but cannot be accessed from your phone at `192.168.1.236:3000` due to macOS firewall blocking external connections.

## Quick Fix Options

### Option 1: Disable Mac Firewall (Temporary)
1. Open System Settings > Network > Firewall
2. Turn off Firewall temporarily
3. Restart the API server: `MOCK_MODE=true node api-server.js`
4. Test from phone - should work now

### Option 2: Allow Node in Firewall
1. Open System Settings > Network > Firewall > Options
2. Click "+" and add Node.js
3. Set to "Allow incoming connections"
4. Restart API server

### Option 3: Use Expo Tunnel (Not Yet Implemented)
Update `apps/mobile/src/services/dreamAnalysis.ts` to use Expo's tunneling feature.

## Verified Working

✅ API server works on `localhost:3000`
✅ Keyboard fix working in mobile app
✅ Mock mode returns dream analysis instantly
❌ Network firewall blocks `192.168.1.236:3000` from phone

## Test Command

Test that API works locally:
```bash
curl -X POST http://localhost:3000/api/dreams/analyze \
  -H "Content-Type: application/json" \
  -d '{"dreamText":"test dream"}'
```

Should return JSON with dream analysis.
