import { OnboardingForm, Screen } from '@/components';
import { saveOnboarding } from '@/data';

// Answers are only stored for now; the root layout switches to the tabs once `onboarding` exists.
export default function OnboardingScreen() {
  return (
    <Screen title="CointCounter" subtitle="Cuéntanos un poco de ti para empezar.">
      <OnboardingForm onSubmit={saveOnboarding} />
    </Screen>
  );
}
