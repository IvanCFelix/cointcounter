import { createElement } from 'react';

import { colors, font, radius, space } from '@/theme';


const toInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// The native picker has no web build; react-native-web renders a plain <input type="date">.
export function DateField({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  return createElement('input', {
    type: 'date',
    value: toInput(value),
    onChange: (e: { target: { value: string } }) => {
      const [y, m, d] = e.target.value.split('-').map(Number);
      if (y && m && d) onChange(new Date(y, m - 1, d));
    },
    style: {
      background: colors.raised, color: colors.text, border: 'none', borderRadius: radius.md, minHeight: 50, boxSizing: 'border-box',
      padding: `0 ${space.lg}px`, fontFamily: 'inherit', fontSize: font.body, colorScheme: 'dark',
    },
  });
}
