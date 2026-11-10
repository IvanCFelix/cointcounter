import { ExpenseList, Screen } from '@/components';
import { currentMonth } from '@/data';
import { formatMonth } from '@/format';

export default function ExpensesScreen() {
  const month = currentMonth();
  return (
    <Screen scroll={false} title="Gastos" subtitle="Lo que llevas gastado este mes">
      <ExpenseList month={month} title={`Corte de ${formatMonth(month)}`} />
    </Screen>
  );
}
