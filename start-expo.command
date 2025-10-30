#!/bin/bash
cd "$(dirname "$0")/apps/mobile"
echo "Starting Dreamcatcher Anything - Expo Development Server"
echo ""
echo "Make sure your phone is on the same WiFi network!"
echo "Your local IP: 192.168.1.236"
echo ""
npx expo start
