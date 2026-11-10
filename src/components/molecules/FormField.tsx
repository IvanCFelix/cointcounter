import { type ReactNode } from 'react';
import { View } from 'react-native';

import { space } from '@/theme';
import { AppText } from '../atoms/AppText';

export function FormField({ label, error, children }: { label: string; error?: string | null; children: ReactNode }) {
  return (
    <View style={{ gap: space.xs + 2 }}>
      <AppText variant="caption" bold>{label}</AppText>
      {children}
      {error ? <AppText variant="caption" color="danger">{error}</AppText> : null}
    </View>
  );
}
