import { View } from 'react-native';

import { colors, radius, space, tint } from '@/theme';
import { AppText } from './AppText';

export type Tone = 'primary' | 'danger' | 'muted';

/** Status pill: tinted ground, coloured dot and label. */
export function Badge({ label, tone = 'muted' }: { label: string; tone?: Tone }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.xs + 2,
        backgroundColor: tint(colors[tone]),
        borderRadius: radius.pill,
        paddingHorizontal: space.sm + 2,
        paddingVertical: 3,
        alignSelf: 'flex-start',
      }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors[tone] }} />
      <AppText variant="caption" bold style={{ color: tone === 'primary' ? colors.primary : colors.text /* red text on its tint fails contrast; the dot carries it */ }}>
        {label}
      </AppText>
    </View>
  );
}
