import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';

import { TabBarAddButton } from '@/components';
import { colors } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopWidth: 0, height: 64, paddingTop: 6 },
        tabBarLabelStyle: { fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Gastos', tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color as string} size={size} /> }}
      />
      <Tabs.Screen
        name="presupuesto"
        options={{ title: 'Presupuesto', tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color as string} size={size} /> }}
      />
      <Tabs.Screen name="add" options={{ title: 'Nuevo', tabBarButton: (props) => <TabBarAddButton {...props} /> }} />
      <Tabs.Screen
        name="cuts"
        options={{ title: 'Cortes', tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color as string} size={size} /> }}
      />
    </Tabs>
  );
}
