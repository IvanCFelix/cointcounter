import { BudgetCard, Screen } from '@/components';
import { currentMonth, useBudget, useExpenses } from '@/data';
import { formatMonth } from '@/format';

export default function BudgetOverviewScreen() {
  const month = currentMonth();
  const { list } = useExpenses(month);
  const budget = useBudget(month);
  return (
    <Screen title="Presupuesto" subtitle={formatMonth(month)}>
      <BudgetCard month={month} budget={budget ?? { pool: 0 }} expenses={list} />
    </Screen>
  );
}
