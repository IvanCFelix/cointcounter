import { View, type ViewProps } from 'react-native';

import { colors, radius, shadow, space } from '@/theme';

export function Card({ style, ...rest }: ViewProps) {
  return (
    <View
      style={[{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: space.lg, gap: space.md, ...shadow }, style]}
      {...rest}
    />
  );
}
