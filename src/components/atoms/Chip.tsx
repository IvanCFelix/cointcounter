import { Pressable } from 'react-native';

import { colors, radius, space } from '@/theme';
import { AppText } from './AppText';

type Props = { label: string; selected?: boolean; onPress?: () => void };

export function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: selected ? colors.primary : colors.raised,
        borderRadius: radius.pill,
        minHeight: 40,
        justifyContent: 'center',
        paddingHorizontal: space.lg,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}>
      <AppText bold={selected} color={selected ? 'onPrimary' : 'text'} style={{ fontSize: 13 }}>
        {label}
      </AppText>
    </Pressable>
  );
}
