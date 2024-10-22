'use client';

import { getRegisterData } from '@/actions/_form';
import { Form } from '@/components/ui/form';
import { getDefaultValues, getSchema, getSchemaByStep } from '@/lib/form';
import { useFormStore } from '@/store/registration-form';
import { Step } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormStep } from './form-step';
import { Navigation } from './navigation';

type RegistrationFormProps = {
  steps: Step[];
};

export const RegistrationForm = ({ steps }: RegistrationFormProps) => {
  const params = useParams<{ id: string }>();
  const isEditMode = !!params?.id;

  const { currentStep, updateFormSchemas } = useFormStore();
  const formSchema = React.useMemo(() => getSchema(steps), [steps]);
  const formRef = React.useRef<HTMLFormElement>(null);
  const totalSteps = steps.length;

  // State to handle loading state
  const [isLoading, setIsLoading] = React.useState(isEditMode);

  // Initialize form with zod resolver and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(steps),
  });

  const { reset } = form;

  // Fetch register data for edit mode (if params.id exists)
  React.useEffect(() => {
    const fetchRegisterData = async () => {
      if (isEditMode) {
        try {
          const response = await getRegisterData(params.id);
          console.log('Form response ::: ', response);
          if (response.success) {
            // Reset the form with the fetched data
            reset(response.results);
          } else {
            console.error('Error fetching register data:', response.errors);
          }
        } catch (error) {
          console.error('Failed to fetch register data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRegisterData();
  }, [params?.id, reset]);

  // Getting the multistep form schema by step
  React.useEffect(() => {
    updateFormSchemas({
      firstSchema: getSchemaByStep(steps[0].fields),
      secondSchema: getSchemaByStep(steps[1].fields),
      thirdSchema: getSchemaByStep(steps[2].fields),
      fourthSchema: getSchemaByStep(steps[3].fields),
    });
  }, []);

  // TODO: Implement skeleton
  if (isLoading) {
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
