'use client';

import { Step } from '@/app/libs/multistep-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FieldInput } from './field/input';
import { FieldSelect } from './field/select';
import { Navigation } from './navigation';

type RegistrationFormProps = {
  steps: Step[];
  currentStep: number;
  handlePrevious: () => void;
  handleNext: () => void;
};

export const RegistrationForm = ({
  steps,
  currentStep,
  handlePrevious,
  handleNext,
}: RegistrationFormProps) => {
  const totalSteps = steps.length;

  const formSchema = z.object(
    steps.reduce((schema: { [key: string]: any }, step) => {
      step.fields.forEach((field) => {
        switch (field.type) {
          case 'text':
          case 'select':
            schema[field.id] = z.string();
            break;
          case 'int':
            schema[field.id] = z.string();
            break;
          case 'date':
            schema[field.id] = z.string();
            break;
          default:
            break;
        }
      });
      return schema;
    }, {}),
  );

  const defaultValues = steps.reduce(
    (values: { [key: string]: string }, step) => {
      step.fields.forEach((field) => {
        values[field.id] = '';
      });
      return values;
    },
    {},
  );

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

        <Navigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </form>
    </Form>
  );
};
