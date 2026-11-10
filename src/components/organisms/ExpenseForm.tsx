import { useState } from 'react';
import { View } from 'react-native';

import { type Payment, allCategories } from '@/budget';
import { type Expense, addCustomCategory } from '@/data';
import { parseAmount } from '@/format';
import { colors, font, space } from '@/theme';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Chip } from '../atoms/Chip';
import { TextField } from '../atoms/TextField';
import { ChipGroup } from '../molecules/ChipGroup';
import { DateField } from '../molecules/DateField';
import { FormField } from '../molecules/FormField';

const PAYMENTS = ['efectivo', 'debito', 'credito'] as const;
const PAYMENT_LABELS = { efectivo: 'Efectivo', debito: 'Débito', credito: 'Crédito' };
const MONTHS = ['1', '3', '6', '9', '12', '18', '24'] as const;
const MONTH_LABELS: Record<(typeof MONTHS)[number], string> = {
  '1': 'Una exhibición',
  '3': '3 meses',
  '6': '6 meses',
  '9': '9 meses',
  '12': '12 meses',
  '18': '18 meses',
  '24': '24 meses',
};

export type NewExpense = Omit<Expense, 'id' | 'monthKey'>;

type Props = { customCategories: string[]; onSubmit: (e: NewExpense) => Promise<void> };

export function ExpenseForm({ customCategories, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState<string | null>(null);
  const [subconcept, setSubconcept] = useState('');
  const [payment, setPayment] = useState<Payment>('efectivo');
  const [months, setMonths] = useState<(typeof MONTHS)[number]>('1');
  const [newCat, setNewCat] = useState<string | null>(null); // null = not adding a category
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    const value = parseAmount(amount);
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Escribe un título.';
    if (!(value > 0)) errs.amount = 'La cantidad debe ser mayor a 0.';
    if (!category) errs.category = 'Elige un tipo de gasto.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        amount: Math.round(value * 100) / 100,
        date,
        category: category!,
        subconcept: subconcept.trim() || null,
        payment,
        creditMonths: payment === 'credito' ? Number(months) : null,
      });
      setTitle('');
      setAmount('');
      setSubconcept('');
      setCategory(null);
      setDate(new Date());
      setPayment('efectivo');
      setMonths('1');
    } finally {
      setSaving(false);
    }
  };

  const saveCategory = async () => {
    const name = newCat?.trim();
    if (name) {
      await addCustomCategory(name);
      setCategory(name);
    }
    setNewCat(null);
  };

  return (
    <Card>
      <FormField label="Cantidad" error={errors.amount}>
        <TextField
          value={amount}
          onChangeText={setAmount}
          placeholder="$0.00"
          keyboardType="decimal-pad"
          style={{ fontSize: font.hero, fontWeight: '700', color: colors.primary, minHeight: 72 }}
        />
      </FormField>
      <FormField label="Título" error={errors.title}>
        <TextField value={title} onChangeText={setTitle} placeholder="Ej. Tacos con amigos" />
      </FormField>
      <FormField label="Fecha">
        <DateField value={date} onChange={setDate} />
      </FormField>
      <FormField label="Tipo de gasto" error={errors.category}>
        <ChipGroup options={allCategories(customCategories)} value={category} onChange={setCategory}>
          {newCat === null && <Chip label="+ Agregar" onPress={() => setNewCat('')} />}
        </ChipGroup>
        {newCat !== null && (
          <View style={{ flexDirection: 'row', gap: space.sm }}>
            <TextField
              style={{ flex: 1 }}
              autoFocus
              value={newCat}
              onChangeText={setNewCat}
              placeholder="Nuevo tipo de gasto"
              onSubmitEditing={saveCategory}
            />
            <Button title="Agregar" onPress={saveCategory} />
          </View>
        )}
      </FormField>
      <FormField label="Subconcepto (opcional)">
        <TextField value={subconcept} onChangeText={setSubconcept} placeholder="Ej. Cena" />
      </FormField>
      <FormField label="Método de pago">
        <ChipGroup options={PAYMENTS} labels={PAYMENT_LABELS} value={payment} onChange={setPayment} />
      </FormField>
      {payment === 'credito' && (
        <FormField label="Plazo">
          <ChipGroup options={MONTHS} labels={MONTH_LABELS} value={months} onChange={setMonths} />
        </FormField>
      )}
      <Button title="Guardar gasto" onPress={submit} loading={saving} />
    </Card>
  );
}
