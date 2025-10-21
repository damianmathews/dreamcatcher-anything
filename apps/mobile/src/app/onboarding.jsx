import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/utils/auth/useAuth";
import { useRouter } from "expo-router";
import { Mic, Brain, Calendar } from "lucide-react-native";
import Logo from "@/components/Logo";

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const router = useRouter();

  const features = [
    {
      icon: <Mic size={24} color="#6366F1" />,
      title: "Record Dreams",
      description:
        "Capture your dreams with voice or text instantly upon waking",
    },
    {
      icon: <Brain size={24} color="#8B5CF6" />,
      title: "AI Analysis",
      description: "Get personalized insights into your subconscious patterns",
    },
    {
      icon: <Calendar size={24} color="#06B6D4" />,
      title: "Discover Patterns",
      description: "Track themes, emotions, and symbols across all your dreams",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 24,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo and Header */}
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <Logo size={80} />
          <Text
            style={{
              fontSize: 32,
              fontWeight: "600",
              color: "#1E293B",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 8,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Welcome to Dreamcatcher
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#64748B",
              textAlign: "center",
              lineHeight: 22,
              fontFamily: "Inter_400Regular",
            }}
          >
            Unlock the hidden wisdom of your subconscious mind
          </Text>
        </View>

        {/* Features */}
        <View style={{ marginBottom: 48 }}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                padding: 20,
                marginBottom: 16,
                borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
                borderWidth: 1,
                borderColor: "#F1F5F9",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#F8FAFC",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                {feature.icon}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#1E293B",
                    marginBottom: 4,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  {feature.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    lineHeight: 20,
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={{ gap: 12 }}>
          <Pressable
            onPress={() => signIn()}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#4F46E5" : "#5B21B6",
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 16,
              shadowColor: "#5B21B6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            })}
          >
            <Text
              style={{
                fontWeight: "600",
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Inter_600SemiBold",
              }}
            >
              Get Started
            </Text>
          </Pressable>

          <Pressable
            onPress={() => signIn()}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#F1F5F9" : "white",
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#E2E8F0",
            })}
          >
            <Text
              style={{
                color: "#475569",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Inter_400Regular",
              }}
            >
              I already have an account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
