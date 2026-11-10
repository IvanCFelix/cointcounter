import { router } from 'expo-router';
import { ActivityIndicator, FlatList } from 'react-native';

import { sum } from '@/budget';
import { AppText, Card, CutRow, Screen } from '@/components';
import { useExpenses } from '@/data';
import { colors, space } from '@/theme';

export default function CutsScreen() {
  const { list, loading } = useExpenses('past');
  const months = [...new Set(list.map((e) => e.monthKey))].sort().reverse();
  const cuts = months.map((m) => {
    const items = list.filter((e) => e.monthKey === m);
    return { month: m, count: items.length, total: sum(items.map((e) => e.amount)) };
  });

  return (
    <Screen scroll={false} title="Cortes" subtitle="Tus meses cerrados">
      <FlatList
        data={cuts}
        keyExtractor={(c) => c.month}
        contentContainerStyle={{ gap: space.sm, paddingBottom: space.xl }}
        renderItem={({ item }) => <CutRow {...item} onPress={() => router.push(`/cut/${item.month}`)} />}
        ListEmptyComponent={
          <Card style={{ alignItems: 'center', paddingVertical: space.xxl }}>
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <AppText variant="title">Aún no hay cortes</AppText>
                <AppText color="muted" style={{ textAlign: 'center' }}>
                  Cada 1ro de mes el corte actual pasa aquí.
                </AppText>
              </>
            )}
          </Card>
        }
      />
    </Screen>
  );
}
