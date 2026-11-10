import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { colors, radius, space } from '@/theme';
import { AppText } from './AppText';

type Props = PressableProps & { title: string; variant?: 'primary' | 'ghost' | 'danger'; loading?: boolean };

export function Button({ title, variant = 'primary', loading, disabled, style, ...rest }: Props) {
  const bg = { primary: colors.primary, danger: colors.danger, ghost: 'transparent' }[variant];
  const fg = variant === 'primary' ? 'onPrimary' : variant === 'danger' ? 'text' : 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={(s) => {
        const hovered = (s as { hovered?: boolean }).hovered; // web only (react-native-web)
        return [
          {
            backgroundColor: bg,
            borderColor: colors.primary,
            borderWidth: variant === 'ghost' ? 1.5 : 0,
            borderRadius: radius.md,
            minHeight: 52,
            paddingHorizontal: space.lg,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.4 : hovered ? 0.9 : 1,
            transform: [{ scale: s.pressed ? 0.97 : 1 }],
          },
          typeof style === 'function' ? style(s) : style,
        ];
      }}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={colors[fg]} />
      ) : (
        <AppText bold color={fg} style={{ fontSize: 16 }}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}
