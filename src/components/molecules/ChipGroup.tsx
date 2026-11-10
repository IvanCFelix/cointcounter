import { type ReactNode } from 'react';
import { View } from 'react-native';

import { space } from '@/theme';
import { Chip } from '../atoms/Chip';

type Props<T extends string> = {
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
  labels?: Partial<Record<T, string>>;
  children?: ReactNode; // extra trailing items, e.g. "+ Agregar"
};

export function ChipGroup<T extends string>({ options, value, onChange, labels, children }: Props<T>) {
  return (
    <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
      {options.map((o) => (
        <Chip key={o} label={labels?.[o] ?? o} selected={o === value} onPress={() => onChange(o)} />
      ))}
      {children}
    </View>
  );
}
