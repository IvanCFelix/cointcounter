# CointCounter

Control de gastos personales (MVP). Expo SDK 58 + expo-router + Firebase (Auth anónima + Firestore).

## Configurar Firebase
1. Crea un proyecto en Firebase y registra una app **Web**.
2. Authentication → Sign-in method → habilita **Anónimo**.
3. Firestore Database → crea la base y publica las reglas de `firestore.rules`.
4. Copia los valores de la config web a `.env` (ver `.env.example`).

## Correr
```bash
npm install
npx expo start        # Expo Go en el teléfono
npm run web           # navegador
npm run check         # self-check de la lógica de presupuesto
npx tsc --noEmit && npx expo lint
```

## Estructura
- `src/app/` rutas (tabs: Gastos | + | Cortes, `budget`, `cut/[month]`, `onboarding`).
- `src/components/` librería atómica (`atoms/`, `molecules/`, `organisms/`), todo exportado desde `@/components`. Componentes nuevos van aquí y se agregan a `index.ts`.
- `src/theme.ts` paleta y tokens; `src/budget.ts` lógica pura (reparto 50/30/20 y modelos alternos, orden, alerta 80%); `src/data.ts` Firestore.

## Cortes
Cada gasto guarda `monthKey` (YYYY-MM) según su fecha; el corte actual es el mes en curso y los meses anteriores aparecen en **Cortes**. No hay cron.
