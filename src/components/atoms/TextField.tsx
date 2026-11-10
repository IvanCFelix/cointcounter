import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { colors, font, radius, space } from '@/theme';

export function TextField({ style, onFocus, onBlur, ...rest }: TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={[
        {
          color: colors.text,
          fontSize: font.body,
          backgroundColor: colors.raised,
          borderRadius: radius.md,
          borderWidth: 1.5,
          borderColor: focused ? colors.primary : 'transparent',
          minHeight: 50,
          paddingHorizontal: space.lg,
          paddingVertical: space.md,
        },
        style,
      ]}
      {...rest}
    />
  );
}
