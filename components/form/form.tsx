'use client';

import { Form } from '@/components/ui/form';
import { getDefaultValues, getSchema } from '@/lib/form';
import { useStepState } from '@/store/registration-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FieldInput } from './field/input';
import { FieldSelect } from './field/select';
import { Navigation } from './navigation';

type RegistrationFormProps = {
  steps: Step[];
};

export const RegistrationForm = ({ steps }: RegistrationFormProps) => {
  const { currentStep } = useStepState();
  const formSchema = getSchema(steps);
  const defaultValues = getDefaultValues(steps);
  const totalSteps = steps.length;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values) => {
    console.log('onSubmit values ::: ', values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="grid grid-cols-2 gap-8">
          {steps[currentStep].fields.map((formField, index) =>
            formField.type !== 'select' ? (
              <FieldInput
                key={formField.id}
                formField={formField}
                form={form}
              />
            ) : (
              <FieldSelect
                key={formField.id}
                formField={formField}
                form={form}
              />
            ),
          )}
        </div>

        <Navigation totalSteps={totalSteps} />
      </form>
    </Form>
  );
};
