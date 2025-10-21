import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Logo({ size = 40, color = '#F4D03F' }) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Path
          d="M30 50 C30 25, 45 10, 70 10 C55 10, 40 25, 40 50 C40 75, 55 90, 70 90 C45 90, 30 75, 30 50 Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}