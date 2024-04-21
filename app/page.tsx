import { RegistrationForm } from '@/components/form/form';
import { Steps } from '@/components/form/steps';
import { formData1 } from '@/lib/mock-data';

export default function Home() {
  const steps = [
    {
      id: 1,
      name: 'Información de la Víctima',
      fields: formData1,
    },
    {
      id: 2,
      name: 'Información 2',
      fields: formData1,
    },
    {
      id: 3,
      name: 'Información 3',
      fields: formData1,
    },
    {
      id: 4,
      name: 'Información 4',
      fields: formData1,
    },
  ]

  return (
    <section className="m-4 flex flex-col gap-10 divide-y divide-gray-300 rounded-md border border-gray-300 p-6 md:divide-y-0">
      <Steps steps={steps} />
      <RegistrationForm steps={steps} />
    </section>
  );
}
