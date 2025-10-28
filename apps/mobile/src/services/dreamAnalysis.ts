/**
 * Dream Analysis Service - Mobile Client
 *
 * This service provides a client-side interface for analyzing dreams
 * by calling the backend API endpoint.
 *
 * Usage:
 *   import { analyzeDream } from '@/services/dreamAnalysis';
 *
 *   const result = await analyzeDream({
 *     dreamText: "I was flying over a beautiful ocean...",
 *     metadata: { mood: "peaceful", tags: ["flying", "water"] }
 *   });
 */

import Constants from 'expo-constants';

// Types matching the backend service
export interface DreamAnalysisInput {
  dreamText: string;
  userId?: string;
  metadata?: {
    date?: string;
    mood?: string;
    tags?: string[];
  };
}

export interface DreamAnalysis {
  summary: string;
  themes: string[];
  emotions: string[];
  symbols: Array<{
    symbol: string;
    interpretation: string;
  }>;
  insights: string;
  disclaimer: string;
}

export interface DreamAnalysisResponse {
  analysis: DreamAnalysis;
  tokensUsed?: number;
  model?: string;
  isMock: boolean;
}

export interface DreamAnalysisError {
  error: string;
  details?: string;
  resetIn?: number;
}

// API Configuration
const getApiUrl = () => {
  // Check for custom API URL in expo constants/config
  const customUrl = Constants.expoConfig?.extra?.apiUrl;
  if (customUrl) {
    return customUrl;
  }

  // Default to localhost for development
  // In production, you would set this via app.config.js or environment variables
  if (__DEV__) {
    // For iOS simulator
    return 'http://localhost:3000';
    // For Android emulator, use: 'http://10.0.2.2:3000'
    // For physical device, use your computer's IP: 'http://192.168.1.X:3000'
  }

  // Production API URL - should be set in app.config.js
  return 'https://your-production-api.com';
};

const API_BASE_URL = getApiUrl();
const ANALYZE_ENDPOINT = `${API_BASE_URL}/api/dreams/analyze`;

/**
 * Analyze a dream using the backend API
 *
 * @param input - Dream text and optional metadata
 * @returns Dream analysis with themes, symbols, and insights
 * @throws Error if the API request fails
 */
export async function analyzeDream(
  input: DreamAnalysisInput
): Promise<DreamAnalysisResponse> {
  try {
    // Validate input
    if (!input.dreamText || input.dreamText.trim().length < 10) {
      throw new Error('Dream text must be at least 10 characters long');
    }

    const response = await fetch(ANALYZE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      // Handle error responses
      const errorData: DreamAnalysisError = await response.json();

      if (response.status === 429) {
        throw new Error(
          `Rate limit exceeded. Please try again in ${errorData.resetIn || 60} seconds.`
        );
      }

      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data: DreamAnalysisResponse = await response.json();
    return data;
  } catch (error) {
    // Network errors, timeout, etc.
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to the dream analysis service. Please check your internet connection.'
      );
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * Check the status of the dream analysis service
 *
 * @returns Service status information
 */
export async function checkServiceStatus(): Promise<{
  service: string;
  status: string;
  configured: boolean;
  mockMode: boolean;
}> {
  try {
    const response = await fetch(ANALYZE_ENDPOINT, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Service status check failed:', error);
    throw error;
  }
}

/**
 * Example usage function for testing
 */
export async function testDreamAnalysis() {
  try {
    console.log('Testing dream analysis service...');

    const result = await analyzeDream({
      dreamText:
        'I was flying over a vast ocean. The water was incredibly clear and blue. I felt completely free and peaceful. Suddenly, I noticed a beautiful island below and decided to land there.',
      metadata: {
        mood: 'peaceful',
        tags: ['flying', 'water', 'freedom'],
      },
    });

    console.log('Dream Analysis Result:', result);
    console.log('Summary:', result.analysis.summary);
    console.log('Themes:', result.analysis.themes);
    console.log('Emotions:', result.analysis.emotions);
    console.log('Is Mock:', result.isMock);

    return result;
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}
