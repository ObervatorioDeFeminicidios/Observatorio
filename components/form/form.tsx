'use client';

import { Form } from '@/components/ui/form';
import { getDefaultValues, getSchema, getSchemaByStep } from '@/lib/form';
import { useFormStore } from '@/store/registration-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormStep } from './form-step';
import { Navigation } from './navigation';
import { Step } from '@/types';

type RegistrationFormProps = {
  steps: Step[];
};

export const RegistrationForm = ({ steps }: RegistrationFormProps) => {
  const { currentStep, updateFormSchemas } =
    useFormStore();
  const formSchema = getSchema(steps);
  const defaultValues = getDefaultValues(steps);
  const formRef = React.useRef<HTMLFormElement>(null);
  const totalSteps = steps.length;

  // Getting the multistep form schema by step
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
          <FormStep step={steps[currentStep]} form={form} />
        </div>

        <Navigation totalSteps={totalSteps} formRef={formRef} />
      </form>
    </Form>
  );
};
