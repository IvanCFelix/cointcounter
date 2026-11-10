import { useState } from 'react';

import type { Frequency } from '@/budget';
import type { Onboarding } from '@/data';
import { parseAmount } from '@/format';
import { AppText } from '../atoms/AppText';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { TextField } from '../atoms/TextField';
import { ChipGroup } from '../molecules/ChipGroup';
import { FormField } from '../molecules/FormField';
import { FREQUENCIES, FREQUENCY_LABELS } from './BudgetCard';

export function OnboardingForm({ onSubmit }: { onSubmit: (o: Onboarding) => Promise<void> }) {
  const [salary, setSalary] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('quincenal');
  const [gasoline, setGasoline] = useState('');
  const [fixedExpenses, setFixed] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    const s = parseAmount(salary || '0');
    const g = parseAmount(gasoline || '0');
    if (!(s >= 0) || !(g >= 0)) return setError('Revisa las cantidades.');
    setSaving(true);
    try {
      await onSubmit({ salary: s, frequency, gasoline: g, fixedExpenses: fixedExpenses.trim() });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <AppText variant="title">Tu sueldo</AppText>
      <FormField label="¿Cuánto es tu salario?" error={error}>
        <TextField value={salary} onChangeText={setSalary} keyboardType="decimal-pad" placeholder="0.00" />
      </FormField>
      <FormField label="¿Es semanal, quincenal o mensual?">
        <ChipGroup options={FREQUENCIES} labels={FREQUENCY_LABELS} value={frequency} onChange={setFrequency} />
      </FormField>
      <FormField label="¿Cuánto gastas en gasolina?">
        <TextField value={gasoline} onChangeText={setGasoline} keyboardType="decimal-pad" placeholder="0.00" />
      </FormField>
      <FormField label="¿Tienes algún gasto fijo que tomar en cuenta?">
        <TextField value={fixedExpenses} onChangeText={setFixed} placeholder="Ej. Renta $5,000, Internet $500" multiline />
      </FormField>
      <Button title="Continuar" onPress={submit} loading={saving} />
    </Card>
  );
}
