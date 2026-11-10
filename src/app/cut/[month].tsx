import { Stack, useLocalSearchParams } from 'expo-router';

import { ExpenseList, Screen } from '@/components';
import { formatMonth } from '@/format';

export default function CutScreen() {
  const { month } = useLocalSearchParams<{ month: string }>();
  return (
    <Screen scroll={false}>
      <Stack.Screen options={{ title: formatMonth(month) }} />
      <ExpenseList month={month} title="Gastos del corte" />
    </Screen>
  );
}
