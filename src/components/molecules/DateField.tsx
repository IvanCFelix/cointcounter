import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, Pressable } from 'react-native';

import { colors, radius, space } from '@/theme';
import { formatDate } from '@/format';
import { AppText } from '../atoms/AppText';

type Props = { value: Date; onChange: (d: Date) => void };



export function DateField({ value, onChange }: Props) {
  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker value={value} mode="date" display="compact" themeVariant="dark" accentColor={colors.primary}
        style={{ alignSelf: 'flex-start' }} onValueChange={(_, d) => onChange(d)} />
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => DateTimePickerAndroid.open({ value, mode: 'date', onValueChange: (_, d) => onChange(d) })}
      style={{ backgroundColor: colors.raised, borderRadius: radius.md, minHeight: 50, justifyContent: 'center', paddingHorizontal: space.lg }}>
      <AppText>{formatDate(value)}</AppText>
    </Pressable>
  );
}
