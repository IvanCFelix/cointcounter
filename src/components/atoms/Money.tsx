import { type ComponentProps } from 'react';

import { formatMoney } from '@/format';
import { AppText } from './AppText';

export function Money({ value, ...rest }: { value: number } & Omit<ComponentProps<typeof AppText>, 'children'>) {
  return <AppText bold {...rest}>{formatMoney(value)}</AppText>;
}
