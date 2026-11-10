import { Alert } from 'react-native';

import { crossed, monthKey, totalsByCategory } from '@/budget';
import { ExpenseForm, type NewExpense, Screen, WARN_RATIO } from '@/components';
import { addExpense, currentMonth, useBudget, useExpenses, useUserDoc } from '@/data';
import { formatMoney, formatMonth } from '@/format';

export default function AddExpenseScreen() {
  const month = currentMonth();
  const { data: user } = useUserDoc();
  const { list } = useExpenses(month);
  const budget = useBudget(month);

  const submit = async (e: NewExpense) => {
    await addExpense(e);
    const limit = budget?.allocations?.[e.category] ?? 0;
    // Alerts only apply to the current cut, which is the one the saved budget belongs to.
    if (monthKey(e.date) !== month || !limit) return Alert.alert('Gasto guardado');
    const before = totalsByCategory(list)[e.category] ?? 0;
    const after = before + e.amount;
    if (crossed(before, after, limit, 1)) {
      Alert.alert('Presupuesto superado', `Ya gastaste ${formatMoney(after)} de ${formatMoney(limit)} en ${e.category}.`);
    } else if (crossed(before, after, limit, WARN_RATIO)) {
      Alert.alert('Cuidado', `Llevas el ${Math.round((after / limit) * 100)}% del presupuesto de ${e.category}.`);
    } else {
      Alert.alert('Gasto guardado');
    }
  };

  return (
    <Screen title="Nuevo gasto" subtitle={formatMonth(month)}>
      <ExpenseForm customCategories={user?.customCategories ?? []} onSubmit={submit} />
    </Screen>
  );
}
