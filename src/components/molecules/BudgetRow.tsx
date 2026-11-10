import { View } from 'react-native';

import { formatMoney } from '@/format';
import { space } from '@/theme';
import { AppText } from '../atoms/AppText';
import { CategoryIcon } from '../atoms/CategoryIcon';
import { ProgressBar, WARN_RATIO } from '../atoms/ProgressBar';

export function BudgetRow({ label, spent, limit }: { label: string; spent: number; limit: number }) {
  const warn = limit > 0 && spent >= limit * WARN_RATIO;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
      <CategoryIcon category={label} size={36} />
      <View style={{ flex: 1, gap: space.xs + 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: space.sm }}>
          <AppText numberOfLines={1} style={{ flexShrink: 1 }}>{label}</AppText>
          <AppText variant="caption" color={warn ? 'danger' : 'muted'}>
            {formatMoney(spent)} / {formatMoney(limit)}
          </AppText>
        </View>
        <ProgressBar value={spent} limit={limit} height={6} />
      </View>
    </View>
  );
}
