'use client';

import { Form } from '@/components/ui/form';
import { getDefaultValues, getSchema, getSchemaByStep } from '@/lib/form';
import { useStepState } from '@/store/registration-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FieldDate } from './field/date';
import { FieldInput } from './field/input';
import { FieldSelect } from './field/select';
import { FieldSelectMultiple } from './field/select-multiple';
import { Navigation } from './navigation';

type RegistrationFormProps = {
  steps: Step[];
};

export const RegistrationForm = ({ steps }: RegistrationFormProps) => {
  const { currentStep, updateFormSchemas } = useStepState();
  const formSchema = getSchema(steps);
  const defaultValues = getDefaultValues(steps);
  const formRef = React.useRef<HTMLFormElement>(null);
  const totalSteps = steps.length;

  // Getting the multi step form schema by step
  React.useEffect(() => {
    updateFormSchemas({
      firstSchema: getSchemaByStep(steps[0].fields),
      secondSchema: getSchemaByStep(steps[1].fields),
      thirdSchema: getSchemaByStep(steps[2].fields),
      fourthSchema: getSchemaByStep(steps[3].fields),
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="flex flex-1 flex-col justify-between gap-10"
      >
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {steps[currentStep].fields.map((formField) =>
            formField.type === 'text' || formField.type === 'int' ? (
              <FieldInput
                key={formField.id}
                formField={formField}
                form={form}
              />
            ) : formField.type === 'date' ? (
              <FieldDate key={formField.id} formField={formField} form={form} />
            ) : formField.type === 'select-multiple' ? (
              <FieldSelectMultiple
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

        <Navigation totalSteps={totalSteps} formRef={formRef} />
      </form>
    </Form>
  );
};
