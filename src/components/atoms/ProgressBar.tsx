import { View } from 'react-native';

import { colors, radius } from '@/theme';

export const WARN_RATIO = 0.8;

export function ProgressBar({ value, limit, height = 8 }: { value: number; limit: number; height?: number }) {
  const ratio = limit > 0 ? value / limit : 0;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(ratio * 100) }}
      style={{ height, borderRadius: radius.pill, backgroundColor: colors.raised, overflow: 'hidden' }}>
      <View
        style={{
          width: `${Math.min(ratio, 1) * 100}%`,
          height: '100%',
          borderRadius: radius.pill,
          backgroundColor: ratio >= WARN_RATIO ? colors.danger : colors.primary,
        }}
      />
    </View>
  );
}
