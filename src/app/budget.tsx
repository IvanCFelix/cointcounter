import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { AllocationEditor, Screen } from '@/components';
import { currentMonth, saveAllocations, useBudget, useUserDoc } from '@/data';
import { colors } from '@/theme';

export default function BudgetScreen() {
  const month = currentMonth();
  const budget = useBudget(month);
  const { loading, data } = useUserDoc();

  return (
    <Screen>
      {!budget || loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <AllocationEditor
          pool={budget.pool}
          customCategories={data?.customCategories ?? []}
          initialModel={budget.model}
          initial={budget.allocations}
          onSave={async (model, allocations) => {
            await saveAllocations(month, model, allocations);
            router.back();
          }}
        />
      )}
    </Screen>
  );
}
