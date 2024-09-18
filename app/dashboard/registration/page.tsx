import { getFormData } from '@/actions/_form';
import { RegistrationForm } from '@/components/form/form';
import { Steps } from '@/components/form/steps';

export default async function Registration() {
  const multiStepFormData = await getFormData();

  return (
    <section className="flex flex-col gap-6 md:gap-8">
      <Steps steps={multiStepFormData} />
      <RegistrationForm steps={multiStepFormData} />
    </section>
  );
}
