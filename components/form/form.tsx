'use client';

import { fetchRegister } from '@/actions/_form';
import { Form } from '@/components/ui/form';
import { getDefaultValues, getSchema, getSchemaByStep } from '@/lib/form';
import { useFormStore } from '@/store/registration-form';
import { OptionField, Step } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormStep } from './form-step';
import { Navigation } from './navigation';

type RegistrationFormProps = {
  steps: Step[];
};

export const LOCAL_STORAGE_KEY = 'form-data';

export const RegistrationForm = ({ steps }: RegistrationFormProps) => {
  const params = useParams<{ id: string }>();
  const isEditMode = !!params?.id;

  const { currentStep, updateFormSchemas, updateInitialAssociatedViolences } =
    useFormStore();
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

  const { watch, reset } = form;
  const formData = watch();

  // Save form data to local storage on changes
  React.useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(handler);
  }, [formData]);

  // Load form data from local storage on component mount
  React.useEffect(() => {
    if (!isEditMode) {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        reset(JSON.parse(savedData));
      }
    }
  }, [reset, isEditMode]);

  // Add cleanup effect to clear localStorage when unmounting
  React.useEffect(() => {
    return () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    };
  }, []);

  // Handle form schemas and reset form values once data is fetched
  React.useEffect(() => {
    if (dataQuery.data?.results) {
      reset(dataQuery.data.results); // Reset form values with fetched data
      updateInitialAssociatedViolences(
        dataQuery.data.results.violencia_asociada as OptionField[],
      );
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

  if (dataQuery.isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="flex max-h-[87vh] flex-1 flex-col justify-between gap-10"
      >
        <div className="grid gap-4 overflow-y-auto md:grid-cols-2 md:gap-6">
          <FormStep step={steps[currentStep]} form={form} />
        </div>

        <Navigation totalSteps={totalSteps} formRef={formRef} />
      </form>
    </Form>
  );
};
