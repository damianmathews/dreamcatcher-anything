import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TestAPIScreen() {
  const insets = useSafeAreaInsets();
  const [results, setResults] = useState([]);
  const [testing, setTesting] = useState(false);

  const addResult = (message) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setTesting(true);
    setResults([]);

    try {
      // Test 1: Dream analysis endpoint
      addResult('Testing connection to http://192.168.1.224:3000...');
      const response1 = await fetch('http://192.168.1.224:3000/api/dreams/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dreamText: 'I was flying over a vast ocean, feeling free and peaceful. The sky was endless and blue.'
        })
      });
      addResult(`Response status: ${response1.status}`);

      if (response1.ok) {
        const data1 = await response1.json();
        addResult(`✅ SUCCESS: Got analysis (Mock: ${data1.isMock})`);
        addResult(`Summary: ${data1.analysis.summary.substring(0, 80)}...`);
        addResult(`Themes: ${data1.analysis.themes.join(', ')}`);
        if (data1.tokensUsed) {
          addResult(`Tokens used: ${data1.tokensUsed}`);
        }
      } else {
        const error1 = await response1.text();
        addResult(`❌ ERROR: ${error1}`);
      }
    } catch (error) {
      addResult(`❌ CATCH ERROR: ${error.message}`);
      addResult(`Error type: ${error.constructor.name}`);
      addResult(`This usually means the server is not reachable at the IP address.`);
    }

    setTesting(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', paddingTop: insets.top + 20 }}>
      <Text style={{ fontSize: 24, fontWeight: '600', paddingHorizontal: 20, marginBottom: 20 }}>
        API Connection Test
      </Text>

      <TouchableOpacity
        onPress={testConnection}
        disabled={testing}
        style={{
          backgroundColor: testing ? '#94A3B8' : '#6366F1',
          marginHorizontal: 20,
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        {testing ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
            Test API Connection
          </Text>
        )}
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {results.map((result, index) => (
          <Text
            key={index}
            style={{
              fontSize: 13,
              color: '#1E293B',
              marginBottom: 8,
              fontFamily: 'monospace',
            }}
          >
            {result}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
