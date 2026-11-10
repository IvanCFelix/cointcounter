import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { formatMonth } from '@/format';
import { colors, radius, space, tint } from '@/theme';
import { AppText } from '../atoms/AppText';
import { Badge } from '../atoms/Badge';
import { Money } from '../atoms/Money';

type Props = { month: string; total: number; count: number; onPress: () => void };

export function CutRow({ month, total, count, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver corte de ${formatMonth(month)}`}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.md,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: space.lg,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.md,
          backgroundColor: tint(colors.primary),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="receipt" size={22} color={colors.primary} />
      </View>
      <View style={{ flex: 1, gap: space.xs }}>
        <AppText bold>{formatMonth(month)}</AppText>
        <Money value={total} color="primary" variant="title" />
        <AppText variant="caption">{count} {count === 1 ? 'gasto' : 'gastos'}</AppText>
      </View>
      <View style={{ alignItems: 'flex-end', gap: space.md }}>
        <Badge label="Cerrado" />
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </View>
    </Pressable>
  );
}
