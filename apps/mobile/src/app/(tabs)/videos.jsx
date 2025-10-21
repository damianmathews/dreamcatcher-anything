import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video, Play, Download, Share, Clock, Sparkles, Film } from 'lucide-react-native';

export default function DreamVideos() {
  const insets = useSafeAreaInsets();
  const [selectedDream, setSelectedDream] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const dreamVideos = [
    {
      id: 1,
      dreamTitle: "Flying Over Mountains",
      status: "completed",
      duration: "2:34",
      createdAt: "2 hours ago",
      thumbnail: "🏔️",
      style: "Cinematic",
      quality: "HD"
    },
    {
      id: 2,
      dreamTitle: "The Glass Library",
      status: "generating",
      progress: 65,
      estimatedTime: "3 min",
      thumbnail: "📚",
      style: "Surreal",
      quality: "HD"
    },
    {
      id: 3,
      dreamTitle: "Ocean of Stars",
      status: "completed",
      duration: "1:47",
      createdAt: "1 day ago",
      thumbnail: "🌌",
      style: "Dreamy",
      quality: "HD"
    }
  ];

  const availableDreams = [
    {
      id: 4,
      title: "Floating City",
      preview: "A magnificent city suspended in clouds with golden bridges...",
      date: "Yesterday",
      canGenerate: true
    },
    {
      id: 5,
      title: "Time Loop Café",
      preview: "I kept reliving the same conversation in a small café...",
      date: "2 days ago",
      canGenerate: true
    },
    {
      id: 6,
      title: "Shapeshifting Forest",
      preview: "Trees that changed into different animals as I walked...",
      date: "3 days ago",
      canGenerate: true
    }
  ];

  const videoStyles = [
    { id: 'cinematic', name: 'Cinematic', description: 'Movie-like with dramatic lighting' },
    { id: 'surreal', name: 'Surreal', description: 'Abstract and dreamlike visuals' },
    { id: 'dreamy', name: 'Dreamy', description: 'Soft, ethereal atmosphere' },
    { id: 'vivid', name: 'Vivid', description: 'Bright, saturated colors' }
  ];

  const handleGenerateVideo = (dreamId) => {
    setIsGenerating(true);
    
    // Mock video generation
    Alert.alert(
      'Generate Dream Film',
      'This will create a 1-3 minute film from your dream using AI video generation. Continue?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => setIsGenerating(false) },
        { 
          text: 'Generate', 
          onPress: () => {
            setTimeout(() => {
              setIsGenerating(false);
              Alert.alert('Video Generation Started', 'Your dream film is being created. You\'ll be notified when it\'s ready!');
            }, 1000);
          }
        }
      ]
    );
  };

  const handlePlayVideo = (video) => {
    Alert.alert('Play Video', `Playing "${video.dreamTitle}" - ${video.duration}`);
  };

  const handleShareVideo = (video) => {
    Alert.alert('Share Video', `Sharing "${video.dreamTitle}" with others.`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'generating': return '#fbbf24';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

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
          <Film color="#7c3aed" size={28} />
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginLeft: 12
          }}>
            Dream Films
          </Text>
        </View>
        <Text style={{ 
          fontSize: 16, 
          color: '#9ca3af'
        }}>
          Transform your dreams into cinematic experiences
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Generated Videos */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#ffffff',
            marginBottom: 16
          }}>
            Your Dream Films
          </Text>
          
          {dreamVideos.map((video) => (
            <View
              key={video.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: 4,
                borderLeftColor: getStatusColor(video.status)
              }}
            >
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                marginBottom: 12
              }}>
                <View style={{
                  backgroundColor: '#334155',
                  borderRadius: 8,
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  <Text style={{ fontSize: 24 }}>
                    {video.thumbnail}
                  </Text>
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '600', 
                    color: '#ffffff',
                    marginBottom: 4
                  }}>
                    {video.dreamTitle}
                  </Text>
                  
                  {video.status === 'completed' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Clock color="#9ca3af" size={14} />
                      <Text style={{ color: '#9ca3af', fontSize: 14, marginLeft: 4 }}>
                        {video.duration} • {video.createdAt}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{ color: '#fbbf24', fontSize: 14, fontWeight: '500' }}>
                        Generating... {video.progress}%
                      </Text>
                      <Text style={{ color: '#9ca3af', fontSize: 12 }}>
                        Est. {video.estimatedTime} remaining
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              
              <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={{
                    backgroundColor: '#7c3aed',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12
                  }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: '#ffffff',
                      fontWeight: '500'
                    }}>
                      {video.style}
                    </Text>
                  </View>
                  
                  <View style={{
                    backgroundColor: '#334155',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12
                  }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: '#9ca3af',
                      fontWeight: '500'
                    }}>
                      {video.quality}
                    </Text>
                  </View>
                </View>
                
                {video.status === 'completed' && (
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => handlePlayVideo(video)}
                      style={{
                        backgroundColor: '#10b981',
                        borderRadius: 8,
                        padding: 8
                      }}
                    >
                      <Play color="#ffffff" size={16} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => handleShareVideo(video)}
                      style={{
                        backgroundColor: '#6b7280',
                        borderRadius: 8,
                        padding: 8
                      }}
                    >
                      <Share color="#ffffff" size={16} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Generate New Video */}
        <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#ffffff',
            marginBottom: 16
          }}>
            Create New Film
          </Text>
          
          {availableDreams.map((dream) => (
            <View
              key={dream.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: 12,
                padding: 16,
                marginBottom: 12
              }}
            >
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 8
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: '#ffffff',
                  flex: 1
                }}>
                  {dream.title}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#9ca3af',
                  marginLeft: 12
                }}>
                  {dream.date}
                </Text>
              </View>
              
              <Text style={{ 
                fontSize: 14, 
                color: '#d1d5db',
                lineHeight: 20,
                marginBottom: 12
              }}>
                {dream.preview}
              </Text>
              
              <TouchableOpacity
                onPress={() => handleGenerateVideo(dream.id)}
                disabled={isGenerating}
                style={{
                  backgroundColor: isGenerating ? '#6b7280' : '#7c3aed',
                  borderRadius: 12,
                  padding: 12,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Sparkles color="#ffffff" size={16} />
                <Text style={{ 
                  color: '#ffffff', 
                  fontWeight: '600',
                  marginLeft: 8
                }}>
                  {isGenerating ? 'Generating...' : 'Generate Film'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Video Styles Info */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#ffffff',
            marginBottom: 16
          }}>
            Film Styles
          </Text>
          
          <View style={{
            backgroundColor: '#1e293b',
            borderRadius: 12,
            padding: 16
          }}>
            {videoStyles.map((style, index) => (
              <View key={style.id} style={{ marginBottom: index < videoStyles.length - 1 ? 12 : 0 }}>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: '#ffffff',
                  marginBottom: 4
                }}>
                  {style.name}
                </Text>
                <Text style={{ 
                  fontSize: 13, 
                  color: '#9ca3af',
                  lineHeight: 18
                }}>
                  {style.description}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={{
            backgroundColor: '#1e293b',
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
            borderLeftWidth: 4,
            borderLeftColor: '#3b82f6'
          }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: '#ffffff',
              marginBottom: 8
            }}>
              🎬 About Dream Films
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#d1d5db',
              lineHeight: 20
            }}>
              Our AI transforms your dream descriptions into 1-3 minute cinematic experiences. 
              Each film captures the essence, mood, and visual elements of your dream.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}