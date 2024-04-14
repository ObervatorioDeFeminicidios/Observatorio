import { Step } from '@/app/libs/multistep-form';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { FieldInput } from './field/input';
import { FieldSelect } from './field/select';

type RegistrationFormProps = {
  steps: Step[];
  currentStep: number;
  onSubmit: (data: any) => void;
};

export const RegistrationForm = ({
  steps,
  currentStep,
  onSubmit,
}: RegistrationFormProps) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8"
      >
        {steps[currentStep].fields.map((formField, index) =>
          formField.type !== 'select' ? (
            <FieldInput key={formField.id} formField={formField} form={form} />
          ) : (
            <FieldSelect key={formField.id} formField={formField} form={form} />
          ),
        )}
      </form>
    </Form>
  );
};
