import { View } from 'react-native';

import type { Expense } from '@/data';
import { formatDate } from '@/format';
import { colors, radius, space } from '@/theme';
import { AppText } from '../atoms/AppText';
import { Badge, type Tone } from '../atoms/Badge';
import { CategoryIcon } from '../atoms/CategoryIcon';
import { Money } from '../atoms/Money';

const paymentLabel = (e: Expense) =>
  e.payment === 'credito'
    ? `Crédito · ${e.creditMonths && e.creditMonths > 1 ? `${e.creditMonths} meses` : 'una exhibición'}`
    : e.payment === 'debito' ? 'Débito' : 'Efectivo';

const PAYMENT_TONE: Record<Expense['payment'], Tone> = { efectivo: 'muted', debito: 'primary', credito: 'danger' };

export function ExpenseRow({ expense: e }: { expense: Expense }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.md,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: space.md,
      }}>
      <CategoryIcon category={e.category} />
      <View style={{ flex: 1, gap: space.xs }}>
        <AppText bold numberOfLines={1}>{e.title}</AppText>
        <AppText variant="caption" numberOfLines={1}>
          {e.subconcept ? `${e.category} · ${e.subconcept}` : e.category} · {formatDate(e.date)}
        </AppText>
        <Badge label={paymentLabel(e)} tone={PAYMENT_TONE[e.payment]} />
      </View>
      <Money value={e.amount} style={{ alignSelf: 'flex-start' }} />
    </View>
  );
}
