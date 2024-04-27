import { getFormData } from '@/actions/_form';
import { RegistrationForm } from '@/components/form/form';
import { Steps } from '@/components/form/steps';

export default async function Home() {
  const multiStepFormData = await getFormData();

  return (
    <section className="m-4 flex flex-col gap-10 divide-y divide-gray-300 rounded-md border border-gray-300 p-6 md:divide-y-0">
      <Steps steps={multiStepFormData} />
      <RegistrationForm steps={multiStepFormData} />
    </section>
  );
}
