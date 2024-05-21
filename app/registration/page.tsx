import { getFormData } from '@/actions/_form';
import { RegistrationForm } from '@/components/form/form';
import { Steps } from '@/components/form/steps';

export default async function Registration() {
  const multiStepFormData = await getFormData();

  return (
    <div className="container">
      <section className="flex flex-1 flex-col gap-8 rounded-md border border-gray-300 p-4 md:gap-10 md:p-6">
        <Steps steps={multiStepFormData} />
        <RegistrationForm steps={multiStepFormData} />
      </section>
    </div>
  );
}
