import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, Filter, Play, Clock } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function DreamsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "recent", label: "Recent" },
    { id: "analyzed", label: "Analyzed" },
    { id: "videos", label: "Videos" },
  ];

  const dreams = [
    {
      id: 1,
      title: "Flying Over Mountains",
      date: "Today, 3:42 AM",
      preview:
        "I was soaring above snow-capped peaks with golden wings, feeling completely free...",
      hasAnalysis: true,
      hasVideo: true,
      videoThumbnail: "🏔️",
    },
    {
      id: 2,
      title: "The Glass Library",
      date: "Yesterday, 4:15 AM",
      preview:
        "Books made of crystal light, each one containing memories from different lives...",
      hasAnalysis: true,
      hasVideo: false,
    },
    {
      id: 3,
      title: "Ocean of Stars",
      date: "Oct 14, 2:58 AM",
      preview:
        "Swimming through space where stars were like luminous fish around me...",
      hasAnalysis: true,
      hasVideo: true,
      videoThumbnail: "🌌",
    },
    {
      id: 4,
      title: "Floating City",
      date: "Oct 13, 5:23 AM",
      preview:
        "A magnificent city suspended in clouds with golden bridges connecting towers...",
      hasAnalysis: false,
      hasVideo: false,
    },
    {
      id: 5,
      title: "Time Loop Café",
      date: "Oct 12, 3:17 AM",
      preview:
        "I kept reliving the same conversation in a small café, each time noticing new details...",
      hasAnalysis: true,
      hasVideo: false,
    },
  ];

  const filteredDreams = dreams.filter((dream) => {
    const matchesSearch =
      dream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dream.preview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "recent" && dream.date.includes("Today")) ||
      (selectedFilter === "analyzed" && dream.hasAnalysis) ||
      (selectedFilter === "videos" && dream.hasVideo);

    return matchesSearch && matchesFilter;
  });

  const DreamCard = ({ dream }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#f3f4f6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#1f2937",
            flex: 1,
            marginRight: 12,
          }}
        >
          {dream.title}
        </Text>

        {dream.hasVideo && (
          <TouchableOpacity
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: 8,
              padding: 6,
            }}
          >
            <Play color="#374151" size={12} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Clock color="#9ca3af" size={12} />
        <Text
          style={{
            fontSize: 13,
            color: "#9ca3af",
            marginLeft: 6,
          }}
        >
          {dream.date}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          color: "#6b7280",
          lineHeight: 20,
          marginBottom: 16,
        }}
      >
        {dream.preview}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          {dream.hasAnalysis && (
            <View
              style={{
                backgroundColor: "#f3f4f6",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Analyzed
              </Text>
            </View>
          )}

          {dream.hasVideo && (
            <View
              style={{
                backgroundColor: "#f3f4f6",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Video
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: "#000000",
              fontWeight: "500",
            }}
          >
            View
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 24,
          paddingHorizontal: 24,
          paddingBottom: 24,
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderColor: "#f3f4f6",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: 8,
          }}
        >
          Dreams
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#6b7280",
          }}
        >
          Your dream journal
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 20 }}>
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: "#f3f4f6",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Search color="#9ca3af" size={16} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search dreams..."
            placeholderTextColor="#9ca3af"
            style={{
              flex: 1,
              color: "#1f2937",
              fontSize: 16,
              paddingVertical: 16,
              paddingLeft: 12,
            }}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={{
                  backgroundColor:
                    selectedFilter === filter.id ? "#000000" : "#ffffff",
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedFilter === filter.id ? "#000000" : "#e5e7eb",
                }}
              >
                <Text
                  style={{
                    color: selectedFilter === filter.id ? "#ffffff" : "#6b7280",
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
        <Text
          style={{
            fontSize: 14,
            color: "#9ca3af",
          }}
        >
          {filteredDreams.length} dream{filteredDreams.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Dreams List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredDreams.map((dream) => (
          <DreamCard key={dream.id} dream={dream} />
        ))}

        {filteredDreams.length === 0 && (
          <View
            style={{
              alignItems: "center",
              paddingVertical: 60,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🌙</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              No dreams found
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#9ca3af",
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
