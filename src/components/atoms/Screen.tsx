import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, space } from '@/theme';
import { AppText } from './AppText';

type Props = {
  children: ReactNode;
  /** false for screens that render their own FlatList. */
  scroll?: boolean;
  /** Title inside the yellow header band. Screens with a stack header omit it and get a plain band. */
  title?: string;
  subtitle?: string;
};

/** Yellow band with a rounded bottom; the first card overlaps it (negative marginTop on the body). */
function Band({ title, subtitle }: Pick<Props, 'title' | 'subtitle'>) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        borderBottomLeftRadius: radius.lg,
        borderBottomRightRadius: radius.lg,
        paddingTop: title ? insets.top + space.lg : 0,
        paddingHorizontal: space.lg,
        paddingBottom: title ? space.xxl + space.xl : space.xxl,
        gap: space.xs,
      }}>
      {title ? (
        <AppText variant="hero" color="onPrimary" role="heading">
          {title}
        </AppText>
      ) : null}
      {subtitle ? <AppText color="onPrimary" style={{ opacity: 0.8 }}>{subtitle}</AppText> : null}
    </View>
  );
}

export function Screen({ children, scroll = true, title, subtitle }: Props) {
  const body = { paddingHorizontal: space.lg, gap: space.lg, marginTop: -space.xxl };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {scroll ? (
        <ScrollView keyboardShouldPersistTaps="handled">
          <Band title={title} subtitle={subtitle} />
          <View style={[body, { paddingBottom: space.xl }]}>{children}</View>
        </ScrollView>
      ) : (
        <>
          <Band title={title} subtitle={subtitle} />
          <View style={[body, { flex: 1 }]}>{children}</View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}
