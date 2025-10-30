import React, { useState, useRef, useCallback, memo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Brain,
  MessageCircle,
  Send,
  TrendingUp,
  Calendar,
  Sparkles,
  BarChart3,
  Target,
  Moon,
  Bird,
} from "lucide-react-native";
import GradientBackground from "@/components/GradientBackground";

// Separate ChatView component to prevent re-renders
const ChatView = memo(({ chatHistory, chatMessage, setChatMessage, handleSendMessage, insets, scrollViewRef }) => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={90}
  >
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {chatHistory.map((message) => (
        <View
          key={message.id}
          style={{
            alignSelf: message.type === "user" ? "flex-end" : "flex-start",
            backgroundColor: message.type === "user" ? "#000000" : "#ffffff",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            maxWidth: "85%",
            borderWidth: message.type === "ai" ? 1 : 0,
            borderColor: "#f3f4f6",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: message.type === "ai" ? 0.05 : 0,
            shadowRadius: 4,
            elevation: message.type === "ai" ? 2 : 0,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: message.type === "user" ? "#ffffff" : "#1f2937",
              lineHeight: 20,
              fontFamily: "Geist",
            }}
          >
            {message.message}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: message.type === "user" ? "#d1d5db" : "#9ca3af",
              marginTop: 6,
              fontFamily: "Geist",
            }}
          >
            {message.timestamp}
          </Text>
        </View>
      ))}
    </ScrollView>

    {/* Chat Input */}
    <View
      style={{
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 16,
        paddingTop: 16,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderColor: "#f3f4f6",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: "#f8fafc",
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: "#f3f4f6",
        }}
      >
        <TextInput
          value={chatMessage}
          onChangeText={setChatMessage}
          placeholder="Ask about your dreams..."
          placeholderTextColor="#9ca3af"
          multiline={false}
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
          blurOnSubmit={false}
          style={{
            flex: 1,
            color: "#1f2937",
            fontSize: 16,
            paddingVertical: 8,
          }}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={!chatMessage.trim()}
          style={{
            backgroundColor: chatMessage.trim() ? "#000000" : "#e5e7eb",
            borderRadius: 20,
            padding: 10,
            marginLeft: 8,
          }}
        >
          <Send color="#ffffff" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
));

ChatView.displayName = 'ChatView';

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const [activeView, setActiveView] = useState("overview"); // 'overview' or 'chat'
  const [chatMessage, setChatMessage] = useState("");
  const scrollViewRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "user",
      message: "What patterns do you see in my dreams?",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      type: "ai",
      message:
        "I notice recurring themes of flight and freedom in your recent dreams. This often represents a desire for liberation from current constraints. Your dreams also frequently feature natural landscapes, suggesting a connection to nature and peace.",
      timestamp: "2:34 PM",
    },
  ]);

  const insights = [
    {
      id: 1,
      title: "Dream Frequency",
      value: "4.2",
      unit: "dreams/week",
      trend: "+12%",
      positive: true,
      IconComponent: BarChart3,
    },
    {
      id: 2,
      title: "Recall Quality",
      value: "85%",
      unit: "accuracy",
      trend: "+5%",
      positive: true,
      IconComponent: Target,
    },
    {
      id: 3,
      title: "Top Theme",
      value: "Flying",
      unit: "6 dreams",
      trend: "Stable",
      positive: true,
      IconComponent: Bird,
    },
    {
      id: 4,
      title: "Sleep Quality",
      value: "7.8",
      unit: "/10",
      trend: "+0.3",
      positive: true,
      IconComponent: Moon,
    },
  ];

  const recentAnalyses = [
    {
      id: 1,
      dreamTitle: "Flying Over Mountains",
      insight:
        "Represents desire for freedom and elevated perspective on life challenges",
      confidence: 92,
      date: "Today",
    },
    {
      id: 2,
      dreamTitle: "The Glass Library",
      insight:
        "Symbolizes search for knowledge and transparent understanding of hidden truths",
      confidence: 88,
      date: "Yesterday",
    },
    {
      id: 3,
      dreamTitle: "Ocean of Stars",
      insight:
        "Indicates emotional depth combined with infinite possibilities and wonder",
      confidence: 85,
      date: "2 days ago",
    },
  ];

  const handleSendMessage = useCallback(() => {
    if (!chatMessage.trim()) return;

    const messageText = chatMessage.trim();
    const newMessage = {
      id: Date.now(),
      type: "user",
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Clear input first to prevent keyboard issues
    setChatMessage("");

    // Dismiss keyboard
    Keyboard.dismiss();

    // Then add message
    setChatHistory((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        message:
          "I understand you're curious about your dream patterns. Based on your recent dreams, I can provide personalized insights about your subconscious patterns and emotional state. What specific aspect would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatHistory((prev) => [...prev, aiResponse]);
    }, 1500);
  }, [chatMessage]);

  const OverviewView = () => (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Stats Grid */}
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: 16,
            fontFamily: "Geist",
          }}
        >
          Your Dream Analytics
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {insights.map((insight) => (
            <View
              key={insight.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 16,
                padding: 16,
                width: "48%",
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
                <insight.IconComponent color="#6b7280" size={20} />
                <View
                  style={{
                    backgroundColor: insight.positive ? "#f0fdf4" : "#fef2f2",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: insight.positive ? "#16a34a" : "#dc2626",
                      fontWeight: "500",
                      fontFamily: "Geist",
                    }}
                  >
                    {insight.trend}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: 2,
                  fontFamily: "Geist",
                }}
              >
                {insight.value}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginBottom: 4,
                  fontFamily: "Geist",
                }}
              >
                {insight.unit}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  fontWeight: "500",
                  fontFamily: "Geist",
                }}
              >
                {insight.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Analyses */}
      <View style={{ marginBottom: 32 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: 16,
            fontFamily: "Geist",
          }}
        >
          Recent AI Analysis
        </Text>

        {recentAnalyses.map((analysis) => (
          <View
            key={analysis.id}
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
                  fontFamily: "Geist",
                }}
              >
                {analysis.dreamTitle}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginLeft: 12,
                  fontFamily: "Geist",
                }}
              >
                {analysis.date}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                lineHeight: 20,
                marginBottom: 12,
                fontFamily: "Geist",
              }}
            >
              {analysis.insight}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#f8fafc",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#374151",
                    fontWeight: "500",
                    fontFamily: "Geist",
                  }}
                >
                  {analysis.confidence}% confidence
                </Text>
              </View>

              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#000000",
                    fontWeight: "500",
                    fontFamily: "Geist",
                  }}
                >
                  View Dream
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Chat CTA */}
      <TouchableOpacity
        onPress={() => setActiveView("chat")}
        style={{
          backgroundColor: "#000000",
          paddingVertical: 18,
          paddingHorizontal: 24,
          borderRadius: 16,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <MessageCircle color="#ffffff" size={18} />
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "600",
            marginLeft: 8,
            fontSize: 16,
            fontFamily: "Geist",
          }}
        >
          Ask AI About Your Dreams
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <GradientBackground>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 24,
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#f8fafc",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Brain color="#374151" size={16} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "600",
                color: "#ffffff",
              }}
            >
              Insights
            </Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f8fafc",
            borderRadius: 12,
            padding: 4,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveView("overview")}
            style={{
              flex: 1,
              backgroundColor:
                activeView === "overview" ? "#ffffff" : "transparent",
              paddingVertical: 8,
              borderRadius: 8,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: activeView === "overview" ? 0.05 : 0,
              shadowRadius: 2,
              elevation: activeView === "overview" ? 1 : 0,
            }}
          >
            <Text
              style={{
                color: activeView === "overview" ? "#1f2937" : "#6b7280",
                fontWeight: activeView === "overview" ? "600" : "500",
                fontSize: 14,
                fontFamily: "Geist",
              }}
            >
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveView("chat")}
            style={{
              flex: 1,
              backgroundColor:
                activeView === "chat" ? "#ffffff" : "transparent",
              paddingVertical: 8,
              borderRadius: 8,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: activeView === "chat" ? 0.05 : 0,
              shadowRadius: 2,
              elevation: activeView === "chat" ? 1 : 0,
            }}
          >
            <Text
              style={{
                color: activeView === "chat" ? "#1f2937" : "#6b7280",
                fontWeight: activeView === "chat" ? "600" : "500",
                fontSize: 14,
                fontFamily: "Geist",
              }}
            >
              AI Chat
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {activeView === "overview" ? (
        <OverviewView />
      ) : (
        <ChatView
          chatHistory={chatHistory}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          handleSendMessage={handleSendMessage}
          insets={insets}
          scrollViewRef={scrollViewRef}
        />
      )}
    </GradientBackground>
  );
}
