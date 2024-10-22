'use client';

import { fetchRegister } from '@/actions/_form';
import { Form } from '@/components/ui/form';
import { getDefaultValues, getSchema, getSchemaByStep } from '@/lib/form';
import { useFormStore } from '@/store/registration-form';
import { OptionField, Step } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormStep } from './form-step';
import { Navigation } from './navigation';
import { useQuery } from '@tanstack/react-query';

type RegistrationFormProps = {
  steps: Step[];
};

export const RegistrationForm = ({ steps }: RegistrationFormProps) => {
  const params = useParams<{ id: string }>();
  const isEditMode = !!params?.id;

  const { currentStep, updateFormSchemas, updateInitialAssociatedViolences } = useFormStore();
  const formSchema = React.useMemo(() => getSchema(steps), [steps]);
  const formRef = React.useRef<HTMLFormElement>(null);
  const totalSteps = steps.length;

  // Fetching the register
  const dataQuery = useQuery({
    queryKey: ['data', params.id],
    queryFn: () => fetchRegister(params.id),
    enabled: isEditMode,
  });

  // Initialize form with zod resolver and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: !isEditMode ? getDefaultValues(steps) : undefined,
  });

  const { reset } = form;

  // Handle form schemas and reset form values once data is fetched
  React.useEffect(() => {
    if (dataQuery.data?.results) {
      reset(dataQuery.data.results); // Reset form values with fetched data
      updateInitialAssociatedViolences(dataQuery.data.results.violencia_asociada as OptionField[]);
    }
  }, [dataQuery.data, reset, updateInitialAssociatedViolences]);

  // Updating the multistep form schema by step and default data
  React.useEffect(() => {
    updateFormSchemas({
      firstSchema: getSchemaByStep(steps[0].fields),
      secondSchema: getSchemaByStep(steps[1].fields),
      thirdSchema: getSchemaByStep(steps[2].fields),
      fourthSchema: getSchemaByStep(steps[3].fields),
    });
  }, [steps, updateFormSchemas]);

  // TODO: Implement skeleton
  if (dataQuery.isLoading) {
    return <div>Loading...</div>;
  }

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
