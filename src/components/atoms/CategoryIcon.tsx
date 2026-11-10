import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import { View } from 'react-native';

import { CATEGORIES, type Group } from '@/budget';
import { colors, radius, tint } from '@/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<string, IconName> = {
  Comida: 'fast-food',
  Despensa: 'basket',
  Gasolina: 'speedometer',
  'Mantenimiento vehículo': 'car-sport',
  'Pago de servicio': 'flash',
  Salud: 'medkit',
  Escuela: 'school',
  Tarea: 'document-text',
  Ropa: 'shirt',
  Salida: 'wine',
  Entretenimiento: 'game-controller',
  Belleza: 'sparkles',
  'Gastos varios': 'pricetags',
  Ahorro: 'wallet',
  Emergencia: 'shield-checkmark',
};

const GROUP_COLOR: Record<Group, string> = { necesidades: colors.primary, deseos: colors.danger, ahorro: colors.muted };

/** Rounded tile with the category's icon, tinted by its budget group. */
export function CategoryIcon({ category, size = 44 }: { category: string; size?: number }) {
  const color = GROUP_COLOR[CATEGORIES[category] ?? 'deseos'];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.md,
        backgroundColor: tint(color),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons name={ICONS[category] ?? 'pricetag'} size={size * 0.5} color={color} />
    </View>
  );
}
