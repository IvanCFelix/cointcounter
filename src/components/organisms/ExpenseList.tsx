import { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { type SortMode, sortExpenses, sum } from '@/budget';
import { useExpenses } from '@/data';
import { colors, space } from '@/theme';
import { AppText } from '../atoms/AppText';
import { Card } from '../atoms/Card';
import { Money } from '../atoms/Money';
import { ChipGroup } from '../molecules/ChipGroup';
import { ExpenseRow } from '../molecules/ExpenseRow';

const SORTS = ['reciente', 'antiguo', 'mayor', 'menor'] as const;
const SORT_LABELS: Record<SortMode, string> = {
  reciente: 'Más reciente',
  antiguo: 'Más antiguo',
  mayor: 'Mayor cantidad',
  menor: 'Menor cantidad',
};

export function ExpenseList({ month, title }: { month: string; title: string }) {
  const { list, loading } = useExpenses(month);
  const [sort, setSort] = useState<SortMode>('reciente');
  return (
    <FlatList
      data={sortExpenses(list, sort)}
      keyExtractor={(e) => e.id}
      renderItem={({ item }) => <ExpenseRow expense={item} />}
      contentContainerStyle={{ gap: space.sm, paddingBottom: space.xl }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Card style={{ marginBottom: space.md }}>
          <AppText variant="caption" bold>{title.toUpperCase()}</AppText>
          <View style={{ gap: space.xs }}>
            <AppText color="muted">Total del corte</AppText>
            <Money variant="hero" color="primary" value={sum(list.map((e) => e.amount))} />
            <AppText variant="caption">{list.length} {list.length === 1 ? 'gasto registrado' : 'gastos registrados'}</AppText>
          </View>
          <ChipGroup options={SORTS} labels={SORT_LABELS} value={sort} onChange={setSort} />
        </Card>
      }
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <AppText color="muted" style={{ textAlign: 'center', paddingVertical: space.xl }}>Sin gastos en este corte.</AppText>
        )
      }
    />
  );
}
