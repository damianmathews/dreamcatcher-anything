import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Archive, Search, Calendar, Filter, Grid, List, Clock, Tag } from 'lucide-react-native';

export default function DreamLibrary() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');

  const filters = [
    { id: 'all', label: 'All Dreams' },
    { id: 'recent', label: 'Recent' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'analyzed', label: 'Analyzed' },
  ];

  const moods = [
    { id: 'all', label: 'All Moods', color: '#6b7280' },
    { id: 'peaceful', label: 'Peaceful', color: '#06b6d4' },
    { id: 'euphoric', label: 'Euphoric', color: '#fbbf24' },
    { id: 'mysterious', label: 'Mysterious', color: '#8b5cf6' },
    { id: 'scary', label: 'Scary', color: '#ef4444' },
  ];

  const dreams = [
    {
      id: 1,
      title: "Flying Over Mountains",
      date: "Oct 15, 2025",
      time: "3:42 AM",
      preview: "I was soaring above snow-capped peaks with golden wings, feeling completely free...",
      mood: "euphoric",
      tags: ["flying", "mountains", "freedom"],
      wordCount: 234,
      hasAnalysis: true,
      hasVideo: true,
      isFavorite: false
    },
    {
      id: 2,
      title: "The Glass Library",
      date: "Oct 14, 2025",
      time: "4:15 AM",
      preview: "Books made of crystal light, each one containing memories from different lives...",
      mood: "mysterious",
      tags: ["books", "crystal", "memories"],
      wordCount: 189,
      hasAnalysis: true,
      hasVideo: false,
      isFavorite: true
    },
    {
      id: 3,
      title: "Ocean of Stars",
      date: "Oct 13, 2025",
      time: "2:58 AM",
      preview: "Swimming through space where stars were like luminous fish around me...",
      mood: "peaceful",
      tags: ["ocean", "stars", "swimming"],
      wordCount: 156,
      hasAnalysis: true,
      hasVideo: true,
      isFavorite: false
    },
    {
      id: 4,
      title: "Floating City",
      date: "Oct 12, 2025",
      time: "5:23 AM",
      preview: "A magnificent city suspended in clouds with golden bridges connecting towers...",
      mood: "euphoric",
      tags: ["city", "clouds", "architecture"],
      wordCount: 298,
      hasAnalysis: false,
      hasVideo: false,
      isFavorite: true
    },
    {
      id: 5,
      title: "Time Loop Café",
      date: "Oct 11, 2025",
      time: "3:17 AM",
      preview: "I kept reliving the same conversation in a small café, each time noticing new details...",
      mood: "mysterious",
      tags: ["café", "time", "conversation"],
      wordCount: 167,
      hasAnalysis: true,
      hasVideo: false,
      isFavorite: false
    }
  ];

  const getMoodColor = (mood) => {
    const moodObj = moods.find(m => m.id === mood);
    return moodObj ? moodObj.color : '#6b7280';
  };

  const filteredDreams = dreams.filter(dream => {
    const matchesSearch = dream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dream.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dream.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'recent' && new Date(dream.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                         (selectedFilter === 'favorites' && dream.isFavorite) ||
                         (selectedFilter === 'analyzed' && dream.hasAnalysis);
    
    const matchesMood = selectedMood === 'all' || dream.mood === selectedMood;
    
    return matchesSearch && matchesFilter && matchesMood;
  });

  const DreamCard = ({ dream, isGrid = false }) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#1e293b',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: getMoodColor(dream.mood),
        ...(isGrid && { width: '48%' })
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
        {dream.isFavorite && (
          <Text style={{ fontSize: 16, marginLeft: 8 }}>⭐</Text>
        )}
      </View>
      
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
      }}>
        <Clock color="#9ca3af" size={12} />
        <Text style={{ 
          fontSize: 12, 
          color: '#9ca3af',
          marginLeft: 4
        }}>
          {dream.date} • {dream.time}
        </Text>
      </View>
      
      {!isGrid && (
        <Text style={{ 
          fontSize: 14, 
          color: '#d1d5db',
          lineHeight: 20,
          marginBottom: 12
        }}>
          {dream.preview}
        </Text>
      )}
      
      <View style={{ 
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 12
      }}>
        {dream.tags.slice(0, isGrid ? 2 : 3).map((tag) => (
          <View
            key={tag}
            style={{
              backgroundColor: '#334155',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12
            }}
          >
            <Text style={{ 
              fontSize: 11, 
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              #{tag}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{
            backgroundColor: getMoodColor(dream.mood),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12
          }}>
            <Text style={{ 
              fontSize: 11, 
              color: '#ffffff',
              fontWeight: '500',
              textTransform: 'capitalize'
            }}>
              {dream.mood}
            </Text>
          </View>
          
          {dream.hasAnalysis && (
            <View style={{
              backgroundColor: '#7c3aed',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 8
            }}>
              <Text style={{ fontSize: 10, color: '#ffffff' }}>AI</Text>
            </View>
          )}
          
          {dream.hasVideo && (
            <View style={{
              backgroundColor: '#10b981',
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 8
            }}>
              <Text style={{ fontSize: 10, color: '#ffffff' }}>🎬</Text>
            </View>
          )}
        </View>
        
        <Text style={{ 
          fontSize: 11, 
          color: '#6b7280'
        }}>
          {dream.wordCount} words
        </Text>
      </View>
    </TouchableOpacity>
  );

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
          <Archive color="#7c3aed" size={28} />
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#ffffff',
            marginLeft: 12
          }}>
            Dream Library
          </Text>
        </View>
        <Text style={{ 
          fontSize: 16, 
          color: '#9ca3af'
        }}>
          Your personal collection of dreams and insights
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{
          backgroundColor: '#1e293b',
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: '#334155'
        }}>
          <Search color="#9ca3af" size={20} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search dreams, tags, or content..."
            placeholderTextColor="#6b7280"
            style={{
              flex: 1,
              color: '#ffffff',
              fontSize: 16,
              paddingVertical: 16,
              paddingLeft: 12
            }}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={{
                  backgroundColor: selectedFilter === filter.id ? '#7c3aed' : '#1e293b',
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: selectedFilter === filter.id ? '#7c3aed' : '#334155'
                }}
              >
                <Text style={{ 
                  color: selectedFilter === filter.id ? '#ffffff' : '#9ca3af',
                  fontWeight: selectedFilter === filter.id ? '600' : '400',
                  fontSize: 14
                }}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Mood Filter & View Toggle */}
      <View style={{ 
        paddingHorizontal: 20, 
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                onPress={() => setSelectedMood(mood.id)}
                style={{
                  backgroundColor: selectedMood === mood.id ? mood.color : '#1e293b',
                  borderRadius: 16,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderWidth: 1,
                  borderColor: selectedMood === mood.id ? mood.color : '#334155'
                }}
              >
                <Text style={{ 
                  color: '#ffffff',
                  fontWeight: selectedMood === mood.id ? '600' : '400',
                  fontSize: 12
                }}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <View style={{ 
          flexDirection: 'row', 
          backgroundColor: '#1e293b',
          borderRadius: 8,
          marginLeft: 12
        }}>
          <TouchableOpacity
            onPress={() => setViewMode('list')}
            style={{
              backgroundColor: viewMode === 'list' ? '#7c3aed' : 'transparent',
              borderRadius: 6,
              padding: 8
            }}
          >
            <List color="#ffffff" size={16} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setViewMode('grid')}
            style={{
              backgroundColor: viewMode === 'grid' ? '#7c3aed' : 'transparent',
              borderRadius: 6,
              padding: 8
            }}
          >
            <Grid color="#ffffff" size={16} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Count */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <Text style={{ 
          fontSize: 14, 
          color: '#9ca3af'
        }}>
          {filteredDreams.length} dream{filteredDreams.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Dreams List/Grid */}
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ 
          paddingHorizontal: 20,
          ...(viewMode === 'grid' && {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          })
        }}>
          {filteredDreams.map((dream) => (
            <DreamCard 
              key={dream.id} 
              dream={dream} 
              isGrid={viewMode === 'grid'} 
            />
          ))}
        </View>
        
        {filteredDreams.length === 0 && (
          <View style={{
            alignItems: 'center',
            paddingVertical: 40,
            paddingHorizontal: 20
          }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🌙</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '600', 
              color: '#ffffff',
              marginBottom: 8,
              textAlign: 'center'
            }}>
              No dreams found
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#9ca3af',
              textAlign: 'center',
              lineHeight: 20
            }}>
              Try adjusting your search or filters to find your dreams
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}