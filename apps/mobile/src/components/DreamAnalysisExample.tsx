/**
 * Dream Analysis Component - Example Implementation
 *
 * This is an example component showing how to integrate dream analysis
 * into your mobile app UI. Use this as a reference for building your
 * own dream analysis interface.
 *
 * Features demonstrated:
 * - Calling the analysis API
 * - Loading states
 * - Error handling
 * - Displaying results
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { analyzeDream, type DreamAnalysis } from '../services/dreamAnalysis';

export function DreamAnalysisExample() {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  const handleAnalyze = async () => {
    if (!dreamText.trim()) {
      setError('Please enter your dream');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeDream({
        dreamText,
        metadata: {
          date: new Date().toISOString(),
        },
      });

      setAnalysis(result.analysis);
      setIsMock(result.isMock);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze dream');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dream Analysis</Text>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Describe your dream:</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={6}
            value={dreamText}
            onChangeText={setDreamText}
            placeholder="I was flying over a vast ocean, feeling peaceful and free..."
            placeholderTextColor="#999"
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Analyze Dream</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Error Display */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Analysis Results */}
        {analysis && (
          <View style={styles.resultsContainer}>
            {isMock && (
              <View style={styles.mockBadge}>
                <Text style={styles.mockBadgeText}>MOCK MODE</Text>
              </View>
            )}

            {/* Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.text}>{analysis.summary}</Text>
            </View>

            {/* Themes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Themes</Text>
              {analysis.themes.map((theme, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.text}>{theme}</Text>
                </View>
              ))}
            </View>

            {/* Emotions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Emotions</Text>
              <View style={styles.tagContainer}>
                {analysis.emotions.map((emotion, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{emotion}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Symbols */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Symbols</Text>
              {analysis.symbols.map((symbol, index) => (
                <View key={index} style={styles.symbolCard}>
                  <Text style={styles.symbolTitle}>{symbol.symbol}</Text>
                  <Text style={styles.symbolText}>{symbol.interpretation}</Text>
                </View>
              ))}
            </View>

            {/* Insights */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Insights</Text>
              <Text style={styles.text}>{analysis.insights}</Text>
            </View>

            {/* Disclaimer */}
            <View style={styles.disclaimerContainer}>
              <Text style={styles.disclaimerText}>{analysis.disclaimer}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fcc',
  },
  errorText: {
    color: '#c00',
    fontSize: 14,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  mockBadge: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  mockBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 15,
    marginRight: 8,
    color: '#555',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
  },
  symbolCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  symbolTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  symbolText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  disclaimerContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },
});

export default DreamAnalysisExample;
