import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Moon, Plus, Sparkles, Calendar } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function DreamsHome() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [recentDreams] = useState([
    {
      id: 1,
      title: "Flying Over Mountains",
      date: "Last night",
      preview: "I was soaring above snow-capped peaks with golden wings...",
      mood: "euphoric",
    },
    {
      id: 2,
      title: "The Glass Library",
      date: "2 days ago",
      preview: "Books made of crystal light, each one containing memories...",
      mood: "mysterious",
    },
    {
      id: 3,
      title: "Ocean of Stars",
      date: "3 days ago",
      preview: "Swimming through space where stars were like luminous fish...",
      mood: "peaceful",
    },
  ]);

  const getMoodColor = (mood) => {
    switch (mood) {
      case "euphoric":
        return "#fbbf24";
      case "mysterious":
        return "#8b5cf6";
      case "peaceful":
        return "#06b6d4";
      default:
        return "#6b7280";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0f23" }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Moon color="#7c3aed" size={28} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#ffffff",
              marginLeft: 12,
              fontFamily: "Inter_700Bold",
            }}
          >
            Dreamcatcher
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#9ca3af",
            fontStyle: "italic",
            fontFamily: "Inter_400Regular",
          }}
        >
          Capture what the night shows you
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: 16,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Quick Actions
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/capture")}
              style={{
                flex: 1,
                backgroundColor: "#7c3aed",
                borderRadius: 16,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Plus color="#ffffff" size={24} />
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginTop: 8,
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                New Dream
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/analysis")}
              style={{
                flex: 1,
                backgroundColor: "#1e293b",
                borderRadius: 16,
                padding: 20,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#334155",
              }}
            >
              <Sparkles color="#7c3aed" size={24} />
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginTop: 8,
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                Insights
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Dreams */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#ffffff",
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Recent Dreams
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/library")}>
              <Text
                style={{
                  color: "#7c3aed",
                  fontWeight: "500",
                  fontFamily: "Inter_500Medium",
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {recentDreams.map((dream) => (
            <TouchableOpacity
              key={dream.id}
              style={{
                backgroundColor: "#1e293b",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: 4,
                borderLeftColor: getMoodColor(dream.mood),
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
                    color: "#ffffff",
                    flex: 1,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  {dream.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#9ca3af",
                    marginLeft: 12,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {dream.date}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: "#d1d5db",
                  lineHeight: 20,
                  fontFamily: "Inter_400Regular",
                }}
              >
                {dream.preview}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: getMoodColor(dream.mood),
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#ffffff",
                      fontWeight: "500",
                      textTransform: "capitalize",
                      fontFamily: "Inter_500Medium",
                    }}
                  >
                    {dream.mood}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Preview */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#ffffff",
              marginBottom: 16,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Dream Patterns
          </Text>

          <View
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#9ca3af",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Dreams this week
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                5
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#9ca3af",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Most common theme
              </Text>
              <Text
                style={{
                  color: "#7c3aed",
                  fontWeight: "600",
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                Flying
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#9ca3af",
                  fontFamily: "Inter_400Regular",
                }}
              >
                Dream recall rate
              </Text>
              <Text
                style={{
                  color: "#10b981",
                  fontWeight: "600",
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                78%
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
