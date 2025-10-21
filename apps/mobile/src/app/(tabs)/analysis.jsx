import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Brain, TrendingUp, Eye, Heart, Zap, Calendar, BarChart3 } from 'lucide-react-native';

export default function DreamAnalysis() {
  const insets = useSafeAreaInsets();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const timeframes = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  const insights = [
    {
      id: 1,
      type: 'pattern',
      title: 'Recurring Theme: Flight',
      description: 'You\'ve dreamed about flying 4 times this week. This often represents a desire for freedom or escape from constraints.',
      confidence: 85,
      icon: '🕊️',
      color: '#06b6d4'
    },
    {
      id: 2,
      type: 'emotion',
      title: 'Emotional Trend: Increasing Positivity',
      description: 'Your dream emotions have become 40% more positive over the past month, suggesting improved mental well-being.',
      confidence: 92,
      icon: '📈',
      color: '#10b981'
    },
    {
      id: 3,
      type: 'symbol',
      title: 'Symbol Analysis: Water',
      description: 'Water appears frequently in your dreams, often symbolizing emotional depth and subconscious thoughts.',
      confidence: 78,
      icon: '🌊',
      color: '#3b82f6'
    },
    {
      id: 4,
      type: 'timing',
      title: 'Sleep Pattern Insight',
      description: 'Your most vivid dreams occur during 3-5 AM, indicating healthy REM sleep cycles.',
      confidence: 88,
      icon: '⏰',
      color: '#8b5cf6'
    }
  ];

  const dreamStats = {
    totalDreams: 23,
    averageLength: 156,
    recallRate: 78,
    mostCommonMood: 'Peaceful',
    longestStreak: 12
  };

  const themes = [
    { name: 'Flying', count: 8, percentage: 35 },
    { name: 'Water', count: 6, percentage: 26 },
    { name: 'People', count: 5, percentage: 22 },
    { name: 'Animals', count: 4, percentage: 17 }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f23' }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 20, 
        paddingHorizontal: 20,
        paddingBottom: 20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Brain color="#7c3aed" size={28} />
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginLeft: 12
          }}>
            Dream Insights
          </Text>
        </View>
        <Text style={{ 
          fontSize: 16, 
          color: '#9ca3af'
        }}>
          AI-powered analysis of your subconscious patterns
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Timeframe Selector */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View style={{ 
            flexDirection: 'row', 
            backgroundColor: '#1e293b',
            borderRadius: 12,
            padding: 4
          }}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe.id}
                onPress={() => setSelectedTimeframe(timeframe.id)}
                style={{
                  flex: 1,
                  backgroundColor: selectedTimeframe === timeframe.id ? '#7c3aed' : 'transparent',
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={{ 
                  color: selectedTimeframe === timeframe.id ? '#ffffff' : '#9ca3af',
                  fontWeight: selectedTimeframe === timeframe.id ? '600' : '400'
                }}>
                  {timeframe.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#ffffff',
            marginBottom: 16
          }}>
            Dream Statistics
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 12 
          }}>
            <View style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              padding: 16,
              flex: 1,
              minWidth: '45%'
            }}>
              <Text style={{ color: '#7c3aed', fontSize: 24, fontWeight: 'bold' }}>
                {dreamStats.totalDreams}
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: 14 }}>
                Total Dreams
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              padding: 16,
              flex: 1,
              minWidth: '45%'
            }}>
              <Text style={{ color: '#10b981', fontSize: 24, fontWeight: 'bold' }}>
                {dreamStats.recallRate}%
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: 14 }}>
                Recall Rate
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              padding: 16,
              flex: 1,
              minWidth: '45%'
            }}>
              <Text style={{ color: '#fbbf24', fontSize: 24, fontWeight: 'bold' }}>
                {dreamStats.averageLength}
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: 14 }}>
                Avg. Words
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              padding: 16,
              flex: 1,
              minWidth: '45%'
            }}>
              <Text style={{ color: '#06b6d4', fontSize: 24, fontWeight: 'bold' }}>
                {dreamStats.longestStreak}
              </Text>
              <Text style={{ color: '#9ca3af', fontSize: 14 }}>
                Day Streak
              </Text>
            </View>
          </View>
        </View>

        {/* AI Insights */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#ffffff',
            marginBottom: 16
          }}>
            AI Insights
          </Text>
          
          {insights.map((insight) => (
            <View
              key={insight.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: 4,
                borderLeftColor: insight.color
              }}
            >
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                marginBottom: 8
              }}>
                <Text style={{ fontSize: 20, marginRight: 8 }}>
                  {insight.icon}
                </Text>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: '#ffffff',
                  flex: 1
                }}>
                  {insight.title}
                </Text>
                <View style={{
                  backgroundColor: insight.color,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#ffffff',
                    fontWeight: '500'
                  }}>
                    {insight.confidence}%
                  </Text>
                </View>
              </View>
              
              <Text style={{ 
                fontSize: 14, 
                color: '#d1d5db',
                lineHeight: 20
              }}>
                {insight.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Common Themes */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#ffffff',
            marginBottom: 16
          }}>
            Common Themes
          </Text>
          
          <View style={{
            backgroundColor: '#1e293b',
            borderRadius: 12,
            padding: 16
          }}>
            {themes.map((theme, index) => (
              <View key={theme.name} style={{ marginBottom: index < themes.length - 1 ? 16 : 0 }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8
                }}>
                  <Text style={{ color: '#ffffff', fontWeight: '500' }}>
                    {theme.name}
                  </Text>
                  <Text style={{ color: '#9ca3af' }}>
                    {theme.count} dreams
                  </Text>
                </View>
                
                <View style={{
                  backgroundColor: '#334155',
                  borderRadius: 4,
                  height: 8,
                  overflow: 'hidden'
                }}>
                  <View style={{
                    backgroundColor: '#7c3aed',
                    height: '100%',
                    width: `${theme.percentage}%`,
                    borderRadius: 4
                  }} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Generate New Analysis */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#7c3aed',
              borderRadius: 16,
              padding: 18,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Zap color="#ffffff" size={20} />
            <Text style={{ 
              color: '#ffffff', 
              fontWeight: '600',
              marginLeft: 8,
              fontSize: 16
            }}>
              Generate New Analysis
            </Text>
          </TouchableOpacity>
          
          <View style={{
            backgroundColor: '#1e293b',
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
            borderLeftWidth: 4,
            borderLeftColor: '#fbbf24'
          }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: '#ffffff',
              marginBottom: 8
            }}>
              🧠 About AI Analysis
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#d1d5db',
              lineHeight: 20
            }}>
              Our AI analyzes patterns in your dreams using advanced natural language processing. 
              Insights are based on psychological research and dream symbolism studies.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}