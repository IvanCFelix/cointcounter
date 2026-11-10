import Ionicons from '@expo/vector-icons/Ionicons';
import type { BottomTabBarButtonProps } from 'expo-router/js-tabs';
import { Pressable, View } from 'react-native';

import { colors } from '@/theme';

export function TabBarAddButton({ onPress, accessibilityState }: BottomTabBarButtonProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Nuevo gasto"
        accessibilityState={accessibilityState}
        onPress={onPress}
        style={({ pressed }) => ({
          width: 60,
          height: 60,
          borderRadius: 30,
          marginTop: -22,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 4,
          borderColor: colors.surface,
          transform: [{ scale: pressed ? 0.92 : 1 }],
          shadowColor: colors.primary,
          shadowOpacity: 0.45,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        })}>
        <Ionicons name="add" size={32} color={colors.onPrimary} />
      </Pressable>
    </View>
  );
}
