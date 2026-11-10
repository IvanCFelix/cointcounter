import { DarkTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import { AppText } from '@/components';
import { useAuthUser, useUserDoc } from '@/data';
import { firebaseConfigured } from '@/firebase';
import { colors, space } from '@/theme';

const theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg, card: colors.bg, primary: colors.primary, text: colors.text },
};

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: space.xl }}>
      {children}
    </View>
  );
}

function Routes() {
  const { loading, data } = useUserDoc();
  if (loading) return <Centered><ActivityIndicator color={colors.primary} /></Centered>;
  const onboarded = !!data?.onboarding;
  return (
    <Stack screenOptions={{ headerTintColor: colors.onPrimary, headerStyle: { backgroundColor: colors.primary }, headerTitleStyle: { fontWeight: '700' }, headerShadowVisible: false }}>
      <Stack.Protected guard={onboarded}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="budget" options={{ title: 'Presupuesto' }} />
        <Stack.Screen name="cut/[month]" options={{ title: 'Corte' }} />
      </Stack.Protected>
      <Stack.Protected guard={!onboarded}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

function AuthGate() {
  const { user, error } = useAuthUser();
  if (user) return <Routes key={user.uid} />;
  return (
    <Centered>
      {error ? (
        <AppText color="danger">No se pudo conectar con Firebase: {error}</AppText>
      ) : (
        <ActivityIndicator color={colors.primary} />
      )}
    </Centered>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <StatusBar style="light" />
      {firebaseConfigured ? (
        <AuthGate />
      ) : (
        <Centered>
          <AppText variant="title" color="primary">Falta configurar Firebase</AppText>
          <AppText color="muted" style={{ textAlign: 'center', marginTop: space.md }}>
            Llena CointCounter/.env con la config web de tu proyecto (ver .env.example) y reinicia con
            &quot;npx expo start -c&quot;.
          </AppText>
        </Centered>
      )}
    </ThemeProvider>
  );
}
