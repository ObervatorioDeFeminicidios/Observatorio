import { getFormData } from '@/actions/_form';
import { RegistrationForm } from '@/components/form/form';
import { Steps } from '@/components/form/steps';

export default async function Home() {
  const multiStepFormData = await getFormData();

  return (
    <section className="m-4 flex flex-col gap-8 md:gap-10 rounded-md border border-gray-300 p-4 md:p-6 ">
      <Steps steps={multiStepFormData} />
      <RegistrationForm steps={multiStepFormData} />
    </section>
  );
}
