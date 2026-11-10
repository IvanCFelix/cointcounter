import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { type Frequency, sum, totalsByCategory } from '@/budget';
import { type Budget, type Expense, addFunds } from '@/data';
import { parseAmount } from '@/format';
import { colors, radius, space } from '@/theme';
import { AppText } from '../atoms/AppText';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { ProgressBar } from '../atoms/ProgressBar';
import { TextField } from '../atoms/TextField';
import { BudgetRow } from '../molecules/BudgetRow';
import { ChipGroup } from '../molecules/ChipGroup';
import { FormField } from '../molecules/FormField';
import { Money } from '../atoms/Money';

export const FREQUENCIES = ['semanal', 'quincenal', 'mensual'] as const;
export const FREQUENCY_LABELS: Record<Frequency, string> = { semanal: 'Semanal', quincenal: 'Quincenal', mensual: 'Mensual' };

type Props = { month: string; budget: Budget; expenses: Expense[] };

export function BudgetCard({ month, budget, expenses }: Props) {
  const [adding, setAdding] = useState(false);
  const [amount, setAmount] = useState('');
  const [freq, setFreq] = useState<Frequency>(budget.frequency ?? 'mensual');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const spent = sum(expenses.map((e) => e.amount));
  const remaining = budget.pool - spent;
  const byCat = totalsByCategory(expenses);
  const allocations = Object.entries(budget.allocations ?? {}).filter(([, v]) => v > 0);

  const load = async () => {
    const v = parseAmount(amount);
    if (!(v > 0)) return setError('Ingresa una cantidad mayor a 0.');
    setSaving(true);
    try {
      await addFunds(month, v, freq);
      setAmount('');
      setError(null);
      setAdding(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <AppText variant="caption" bold>PRESUPUESTO GENERAL</AppText>
      <View style={{ gap: space.xs }}>
        <AppText color="muted">Disponible</AppText>
        <Money variant="hero" value={remaining} color={remaining < 0 ? 'danger' : 'primary'} />
      </View>
      <ProgressBar value={spent} limit={budget.pool} height={10} />
      <View style={{ flexDirection: 'row', gap: space.sm }}>
        {[
          ['Presupuesto', budget.pool],
          ['Gastado', spent],
        ].map(([label, value]) => (
          <View key={label} style={{ flex: 1, backgroundColor: colors.raised, borderRadius: radius.md, padding: space.md, gap: 2 }}>
            <AppText variant="caption">{label}</AppText>
            <Money value={value as number} />
          </View>
        ))}
      </View>

      {adding ? (
        <View style={{ gap: space.md }}>
          <FormField label="Cantidad a cargar" error={error}>
            <TextField value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" autoFocus />
          </FormField>
          <FormField label="Frecuencia">
            <ChipGroup options={FREQUENCIES} labels={FREQUENCY_LABELS} value={freq} onChange={setFreq} />
          </FormField>
          <AppText variant="caption">Semanal se multiplica ×4 y quincenal ×2 para el corte mensual.</AppText>
          <View style={{ flexDirection: 'row', gap: space.sm }}>
            <Button style={{ flex: 1 }} variant="ghost" title="Cancelar" onPress={() => setAdding(false)} />
            <Button style={{ flex: 1 }} title="Cargar" onPress={load} loading={saving} />
          </View>
        </View>
      ) : (
        <Button variant="ghost" title="Cargar dinero" onPress={() => setAdding(true)} />
      )}

      {budget.pool > 0 && (
        <Button
          title={allocations.length ? 'Editar presupuesto' : 'Generar presupuesto'}
          onPress={() => router.push('/budget')}
        />
      )}

      {allocations.length > 0 && (
        <View style={{ gap: space.md }}>
          <AppText variant="title">Por categoría</AppText>
          {allocations.map(([cat, limit]) => (
            <BudgetRow key={cat} label={cat} spent={byCat[cat] ?? 0} limit={limit} />
          ))}
        </View>
      )}
    </Card>
  );
}
