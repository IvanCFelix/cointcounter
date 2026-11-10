import { useState } from 'react';
import { View } from 'react-native';

import { type ModelName, MODELS, allCategories, generateAllocations, sum } from '@/budget';
import { formatMoney, parseAmount } from '@/format';
import { space } from '@/theme';
import { AppText } from '../atoms/AppText';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { TextField } from '../atoms/TextField';
import { ChipGroup } from '../molecules/ChipGroup';
import { FormField } from '../molecules/FormField';

const MODEL_NAMES = Object.keys(MODELS) as ModelName[];
const MODEL_HINTS: Record<ModelName, string> = {
  '50/30/20': 'Estándar equilibrado: 50% necesidades, 30% deseos, 20% ahorro.',
  '70/20/10': 'Ingresos ajustados: 70% gastos, 30% ahorro e inversión.',
  '60/20/20': 'Costos fijos altos: 60% necesidades, 20% deseos, 20% ahorro.',
  '40/20/40': 'Ahorro agresivo: 40% necesidades, 20% deseos, 40% ahorro.',
};

type Props = {
  pool: number;
  customCategories: string[];
  initialModel?: ModelName;
  initial?: Record<string, number>;
  onSave: (model: ModelName, allocations: Record<string, number>) => Promise<void>;
};

const toStrings = (a: Record<string, number>) => Object.fromEntries(Object.entries(a).map(([k, v]) => [k, String(v)]));

export function AllocationEditor({ pool, customCategories, initialModel, initial, onSave }: Props) {
  const [model, setModel] = useState<ModelName>(initialModel ?? '50/30/20');
  const [values, setValues] = useState<Record<string, string>>(toStrings(initial ?? {}));
  const [saving, setSaving] = useState(false);

  const cats = allCategories(customCategories);
  const parsed = Object.fromEntries(cats.map((c) => [c, parseAmount(values[c] || '0')]));
  const invalid = cats.some((c) => !(parsed[c] >= 0));
  const total = sum(Object.values(parsed).filter((v) => v >= 0));

  const save = async () => {
    setSaving(true);
    try {
      await onSave(model, parsed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ gap: space.lg }}>
      <Card>
        <AppText variant="title">Modelo</AppText>
        <ChipGroup options={MODEL_NAMES} value={model} onChange={setModel} />
        <AppText variant="caption">{MODEL_HINTS[model]}</AppText>
        <Button
          title="Generar presupuesto"
          onPress={() => setValues(toStrings(generateAllocations(pool, model, customCategories)))}
        />
      </Card>
      <Card>
        <AppText variant="title">Por categoría</AppText>
        <AppText color={total > pool ? 'danger' : 'muted'}>
          Asignado {formatMoney(total)} de {formatMoney(pool)}
        </AppText>
        {cats.map((c) => (
          <FormField key={c} label={c} error={parsed[c] >= 0 ? null : 'Cantidad inválida'}>
            <TextField
              value={values[c] ?? ''}
              placeholder="0"
              keyboardType="decimal-pad"
              onChangeText={(t) => setValues((v) => ({ ...v, [c]: t }))}
            />
          </FormField>
        ))}
        <Button title="Guardar presupuesto" onPress={save} loading={saving} disabled={invalid} />
      </Card>
    </View>
  );
}
