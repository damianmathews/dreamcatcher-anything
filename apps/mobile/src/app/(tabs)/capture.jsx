import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import GradientBackground from "@/components/GradientBackground";

export default function CaptureScreen() {
  const insets = useSafeAreaInsets();
  const [dreamText, setDreamText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveDream = async () => {
    if (!dreamText.trim()) {
      Alert.alert(
        "Missing Content",
        "Please describe your dream before saving.",
      );
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      Alert.alert(
        "Dream Saved!",
        "Your dream has been saved and will be analyzed for insights.",
        [
          {
            text: "OK",
            onPress: () => {
              setDreamText("");
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save dream. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
        <StatusBar style="light" />

        {/* Header */}
        <View
          style={{
            paddingTop: insets.top + 24,
            paddingHorizontal: 24,
            paddingBottom: 32,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "600",
                color: "#ffffff",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Capture Your Dream
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#ffffff",
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              Just ramble. I'll organize it beautifully.
            </Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: insets.bottom + 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Dream Description */}
          <View style={{ marginBottom: 24 }}>
            <TextInput
              value={dreamText}
              onChangeText={setDreamText}
              placeholder="I was in this place and there were people... or maybe it was just one person? Anyway, it felt really strange and..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={12}
              textAlignVertical="top"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 24,
                padding: 24,
                color: "#1E293B",
                fontSize: 16,
                minHeight: 280,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 4,
              }}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSaveDream}
            disabled={isLoading}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              paddingVertical: 20,
              borderRadius: 24,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Sparkles color="#FF6B6B" size={20} />
            <Text
              style={{
                fontWeight: "600",
                color: "#FF6B6B",
                marginLeft: 8,
                fontSize: 18,
              }}
            >
              {isLoading ? "Capturing..." : "Capture Dream"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingAnimatedView>
    </GradientBackground>
  );
}
