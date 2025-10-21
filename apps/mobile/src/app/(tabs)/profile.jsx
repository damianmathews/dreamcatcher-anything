import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Settings,
  Crown,
  Moon,
  Sun,
  LogOut,
  HelpCircle,
  Mail,
  Star,
  Zap,
} from "lucide-react-native";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { data: user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState("profile"); // 'profile', 'subscription', 'settings'

  const subscriptionTiers = [
    {
      id: "free",
      name: "Free Trial",
      price: "$0",
      period: "forever",
      features: [
        "1 dream video",
        "1 analysis",
        "Basic insights",
        "Mobile access",
      ],
      popular: false,
      current: true,
    },
    {
      id: "dreamer",
      name: "Dreamer",
      price: "$2.99",
      period: "month",
      yearlyPrice: "$29.99",
      features: [
        "Unlimited analysis",
        "Advanced patterns",
        "Emotional tracking",
        "Weekly reports",
        "Journal & calendar",
        "Symbol dictionary",
      ],
      popular: true,
      current: false,
    },
    {
      id: "visionary",
      name: "Visionary",
      price: "$19.99",
      period: "month",
      yearlyPrice: "$199.99",
      features: [
        "Everything in Dreamer",
        "10 videos/month",
        "HD visualizations",
        "Personal AI coach",
        "Lucid dreaming prep",
        "Export & share",
        "Priority email support",
      ],
      popular: false,
      current: false,
    },
    {
      id: "transcendent",
      name: "Transcendent",
      price: "$49.99",
      period: "month",
      yearlyPrice: "$499.99",
      features: [
        "Everything in Visionary",
        "25 videos/month",
        "20-second videos",
        "4K quality",
        "Advanced lucid training",
        "Dream collaboration",
        "Priority chat support",
      ],
      popular: false,
      current: false,
    },
    {
      id: "infinite",
      name: "Infinite",
      price: "$97.99",
      period: "month",
      yearlyPrice: "$999.99",
      features: [
        "60 videos/month",
        "30-second cinematic",
        "White-glove setup",
        "Custom features",
        "API access",
        "Dedicated support",
        "Research tools",
        "Community access",
      ],
      popular: false,
      current: false,
    },
  ];

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of Dreamcatcher?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: signOut },
      ],
    );
  };

  const handleSubscribe = (tier) => {
    Alert.alert(
      `Upgrade to ${tier.name}`,
      `This will upgrade your subscription to ${tier.name} for ${tier.price}/${tier.period}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Subscribe",
          onPress: () =>
            Alert.alert("Coming Soon", "Subscription integration coming soon!"),
        },
      ],
    );
  };

  const ProfileView = () => (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* User Profile */}
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          alignItems: "center",
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
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#f8fafc",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <User color="#374151" size={32} />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: 4,
            fontFamily: "Geist",
          }}
        >
          {user?.name || "Dream Explorer"}
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#6b7280",
            marginBottom: 16,
            fontFamily: "Geist",
          }}
        >
          {user?.email || "user@example.com"}
        </Text>

        <View
          style={{
            backgroundColor: "#f0fdf4",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#dcfce7",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#16a34a",
              fontWeight: "500",
              fontFamily: "Geist",
            }}
          >
            Free Trial
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#f3f4f6",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Geist" }}>🌙</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1f2937",
              marginTop: 8,
              fontFamily: "Geist",
            }}
          >
            23
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#6b7280",
              textAlign: "center",
              fontFamily: "Geist",
            }}
          >
            Dreams Captured
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#f3f4f6",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Geist" }}>🎬</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1f2937",
              marginTop: 8,
              fontFamily: "Geist",
            }}
          >
            3
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#6b7280",
              textAlign: "center",
              fontFamily: "Geist",
            }}
          >
            Videos Created
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#f3f4f6",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Geist" }}>🧠</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1f2937",
              marginTop: 8,
              fontFamily: "Geist",
            }}
          >
            18
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#6b7280",
              textAlign: "center",
              fontFamily: "Geist",
            }}
          >
            AI Insights
          </Text>
        </View>
      </View>

      {/* Menu Options */}
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#f3f4f6",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
          marginBottom: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => setActiveView("subscription")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#f3f4f6",
          }}
        >
          <Crown color="#374151" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#1f2937",
              marginLeft: 12,
              flex: 1,
              fontFamily: "Geist",
            }}
          >
            Subscription
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#6b7280",
              fontFamily: "Geist",
            }}
          >
            Free Trial
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveView("settings")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#f3f4f6",
          }}
        >
          <Settings color="#374151" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#1f2937",
              marginLeft: 12,
              flex: 1,
              fontFamily: "Geist",
            }}
          >
            Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#f3f4f6",
          }}
        >
          <HelpCircle color="#374151" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#1f2937",
              marginLeft: 12,
              flex: 1,
              fontFamily: "Geist",
            }}
          >
            Help & Support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
          }}
        >
          <LogOut color="#ef4444" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#ef4444",
              marginLeft: 12,
              flex: 1,
              fontFamily: "Geist",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const SubscriptionView = () => (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      {subscriptionTiers.map((tier) => (
        <View
          key={tier.id}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            borderWidth: tier.popular ? 2 : 1,
            borderColor: tier.popular ? "#000000" : "#f3f4f6",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          {tier.popular && (
            <View
              style={{
                backgroundColor: "#000000",
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 12,
                alignSelf: "flex-start",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "#ffffff",
                  fontWeight: "600",
                  fontFamily: "Geist",
                }}
              >
                MOST POPULAR
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: 4,
                  fontFamily: "Geist",
                }}
              >
                {tier.name}
              </Text>

              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "700",
                    color: "#1f2937",
                    fontFamily: "Geist",
                  }}
                >
                  {tier.price}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginLeft: 4,
                    fontFamily: "Geist",
                  }}
                >
                  {tier.period !== "forever" ? `/${tier.period}` : ""}
                </Text>
              </View>

              {tier.yearlyPrice && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginTop: 2,
                    fontFamily: "Geist",
                  }}
                >
                  or {tier.yearlyPrice}/year (save 17%)
                </Text>
              )}
            </View>

            {tier.current && (
              <View
                style={{
                  backgroundColor: "#f0fdf4",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#dcfce7",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: "#16a34a",
                    fontWeight: "500",
                    fontFamily: "Geist",
                  }}
                >
                  CURRENT
                </Text>
              </View>
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            {tier.features.map((feature, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: "#f0fdf4",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#16a34a",
                      fontFamily: "Geist",
                    }}
                  >
                    ✓
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    flex: 1,
                    fontFamily: "Geist",
                  }}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {!tier.current && (
            <TouchableOpacity
              onPress={() => handleSubscribe(tier)}
              style={{
                backgroundColor: tier.popular ? "#000000" : "#f8fafc",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                borderWidth: tier.popular ? 0 : 1,
                borderColor: "#e5e7eb",
              }}
            >
              <Text
                style={{
                  color: tier.popular ? "#ffffff" : "#1f2937",
                  fontWeight: "600",
                  fontSize: 16,
                  fontFamily: "Geist",
                }}
              >
                {tier.id === "free" ? "Current Plan" : "Upgrade"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );

  const SettingsView = () => (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: insets.bottom + 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#f3f4f6",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
          marginBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#f3f4f6",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isDarkMode ? (
              <Moon color="#374151" size={20} />
            ) : (
              <Sun color="#374151" size={20} />
            )}
            <Text
              style={{
                fontSize: 16,
                color: "#1f2937",
                marginLeft: 12,
                fontFamily: "Geist",
              }}
            >
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#f3f4f6", true: "#000000" }}
            thumbColor={isDarkMode ? "#ffffff" : "#ffffff"}
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderColor: "#f3f4f6",
          }}
        >
          <Star color="#374151" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#1f2937",
              marginLeft: 12,
              flex: 1,
              fontFamily: "Geist",
            }}
          >
            Rate Dreamcatcher
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Mail color="#374151" size={20} />
          <Text
            style={{
              fontSize: 16,
              color: "#1f2937",
              marginLeft: 12,
              flex: 1,
              fontFamily: "Geist",
            }}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 12,
          color: "#9ca3af",
          textAlign: "center",
          fontFamily: "Geist",
        }}
      >
        Dreamcatcher v1.0.0{"\n"}
        Made with ✨ for dreamers everywhere
      </Text>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 24,
          paddingHorizontal: 24,
          paddingBottom: 16,
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderColor: "#f3f4f6",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          {activeView !== "profile" && (
            <TouchableOpacity
              onPress={() => setActiveView("profile")}
              style={{ marginRight: 12 }}
            >
              <Text
                style={{ fontSize: 16, color: "#374151", fontFamily: "Geist" }}
              >
                ←
              </Text>
            </TouchableOpacity>
          )}

          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: "#1f2937",
              fontFamily: "Geist",
            }}
          >
            {activeView === "profile" && "Profile"}
            {activeView === "subscription" && "Subscription"}
            {activeView === "settings" && "Settings"}
          </Text>
        </View>
      </View>

      {/* Content */}
      {activeView === "profile" && <ProfileView />}
      {activeView === "subscription" && <SubscriptionView />}
      {activeView === "settings" && <SettingsView />}
    </View>
  );
}
