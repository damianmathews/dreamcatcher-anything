import React, { useState, useRef } from "react";
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
import { Mic, MicOff, Save } from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function CaptureScreen() {
  const insets = useSafeAreaInsets();
  const [dreamText, setDreamText] = useState("");
  const [dreamTitle, setDreamTitle] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      Alert.alert(
        "Recording Stopped",
        "Your voice recording has been converted to text.",
      );
    } else {
      setIsRecording(true);
      Alert.alert(
        "Recording Started",
        "Speak your dream clearly. Tap the microphone again to stop.",
      );
    }
  };

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
              setDreamTitle("");
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
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar style="dark" />

        {/* Header */}
        <View
          style={{
            paddingTop: insets.top + 24,
            paddingHorizontal: 24,
            paddingBottom: 32,
            backgroundColor: "#ffffff",
            borderBottomWidth: 1,
            borderColor: "#f1f5f9",
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "300",
                color: "#1E293B",
                marginBottom: 8,
              }}
            >
              Dreamcatcher
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 4,
              }}
            >
              Capture Your Dreams
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#64748B",
                textAlign: "center",
              }}
            >
              Tap into your subconscious while memories are fresh
            </Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 24,
            paddingBottom: insets.bottom + 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Voice Recording */}
          <View style={{ marginBottom: 24, alignItems: "center" }}>
            <TouchableOpacity
              onPress={handleVoiceRecord}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: isRecording ? "#DC2626" : "#6366F1",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: isRecording ? "#DC2626" : "#6366F1",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
                marginBottom: 16,
              }}
            >
              {isRecording ? (
                <MicOff color="#ffffff" size={32} />
              ) : (
                <Mic color="#ffffff" size={32} />
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: isRecording ? "#DC2626" : "#1E293B",
                marginBottom: 4,
              }}
            >
              {isRecording ? "Recording..." : "Tap to Record"}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                textAlign: "center",
              }}
            >
              {isRecording
                ? "Speak naturally about your dream"
                : "Instantly convert speech to text"}
            </Text>
          </View>

          {/* Dream Title */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 8,
              }}
            >
              Dream Title
            </Text>
            <TextInput
              value={dreamTitle}
              onChangeText={setDreamTitle}
              placeholder="Give your dream a title..."
              placeholderTextColor="#94A3B8"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 16,
                color: "#1E293B",
                fontSize: 16,
                borderWidth: 1,
                borderColor: "#E2E8F0",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            />
          </View>

          {/* Dream Description */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1E293B",
                marginBottom: 8,
              }}
            >
              Dream Description
            </Text>
            <TextInput
              value={dreamText}
              onChangeText={setDreamText}
              placeholder="Describe your dream in detail... What did you see, feel, or experience?"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 16,
                color: "#1E293B",
                fontSize: 16,
                minHeight: 140,
                borderWidth: 1,
                borderColor: "#E2E8F0",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSaveDream}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#94A3B8" : "#6366F1",
              paddingVertical: 18,
              borderRadius: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              shadowColor: "#6366F1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Save color="#ffffff" size={18} />
            <Text
              style={{
                fontWeight: "600",
                color: "#ffffff",
                marginLeft: 8,
                fontSize: 16,
              }}
            >
              {isLoading ? "Saving..." : "Save Dream"}
            </Text>
          </TouchableOpacity>

          {/* Tips - Benefits Focused */}
          <View
            style={{
              backgroundColor: "#FEF7FF",
              borderRadius: 16,
              padding: 20,
              marginTop: 24,
              borderWidth: 1,
              borderColor: "#E9D5FF",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#6B21A8",
                marginBottom: 12,
              }}
            >
              💡 Unlock Your Subconscious
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#7C3AED",
                lineHeight: 20,
              }}
            >
              • Record immediately to capture hidden insights{"\n"}• Include
              emotions and colors for deeper understanding{"\n"}• Don't edit
              yourself—raw thoughts reveal more{"\n"}• Even fragments unlock
              powerful patterns
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
