import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBackground({ children, style }) {
  return (
    <LinearGradient
      colors={["#FF6B6B", "#FFA07A", "#FFB6A3", "#B8C5E0", "#6DD5ED", "#4A90E2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}
