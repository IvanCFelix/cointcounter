import { Text, type TextProps } from 'react-native';

import { colors, font } from '@/theme';

type Props = TextProps & { variant?: 'hero' | 'title' | 'body' | 'caption'; color?: keyof typeof colors; bold?: boolean };

export function AppText({ variant = 'body', color, bold, style, ...rest }: Props) {
  return (
    <Text
      style={[
        {
          color: colors[color ?? (variant === 'caption' ? 'muted' : 'text')],
          fontSize: font[variant],
          fontWeight: bold || variant === 'title' || variant === 'hero' ? '700' : '400',
        },
        style,
      ]}
      {...rest}
    />
  );
}
