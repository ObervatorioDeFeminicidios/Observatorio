import { Button } from '@/components/ui/button';
import { useFormStore, useIsLastStep } from '@/store/registration-form';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Drawer, DrawerTrigger } from '../ui/drawer';
import { Confirmation } from './confirmation';

type NavigationProps = {
  totalSteps: number;
  formRef: React.RefObject<HTMLFormElement>;
};

export const Navigation = ({ totalSteps, formRef }: NavigationProps) => {
  const [open, setOpen] = React.useState(false);
  const {
    currentStep,
    handlePreviousStep,
    handleNextStep,
    formSchemas: { firstSchema, secondSchema, thirdSchema, fourthSchema },
    updateFormData,
  } = useFormStore();
  const isLastStep = useIsLastStep();
  const { getValues, setError, clearErrors } = useFormContext();

  // Validate the current form data against the zod schema and set the errors
  const validateSchema = (schema: z.Schema) => {
    // Getting the form data
    const formData = getValues();

    // Reseting the errors
    clearErrors();

    // Validating the data
    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        // Setting the error for the field that failed validation
        setError(issue.path[0].toString(), {
          type: 'manual',
          message: issue.message,
        });
      });
    } else {
      // If it's not the last step, navigate to the next step or open the drawer
      if (!isLastStep) {
        updateFormData(formData);
        handleNextStep();

        // Scroll to the top and focus the first form field
        if (formRef.current) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const firstInput = formRef.current.querySelector('input');
          if (firstInput) firstInput.focus();
        }
      } else {
        setOpen(true);
      }
    }
  };

  const handleNextOnClick = () => {
    // Validating the form schema before navigating
    switch (currentStep) {
      case 0:
        if (firstSchema) validateSchema(firstSchema);
        break;
      case 1:
        if (secondSchema) validateSchema(secondSchema);
        break;
      case 2:
        if (thirdSchema) validateSchema(thirdSchema);
        break;
      case 3:
        if (fourthSchema) validateSchema(fourthSchema);
        break;
      default:
        break;
    }
  };

  const handlePreviousOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    handlePreviousStep();
  };

  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="ghost"
        className="text-secondary-foreground"
        onClick={handlePreviousOnClick}
        disabled={currentStep === 0}
      >
        Atrás
      </Button>

      {currentStep !== totalSteps - 1 ? (
        <Button
          className="bg-primary"
          type="button"
          onClick={handleNextOnClick}
        >
          Siguiente
        </Button>
      ) : (
        <Drawer direction="right" open={open}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="border-primary text-primary"
              type="button"
              onClick={handleNextOnClick}
            >
              Registrar
            </Button>
          </DrawerTrigger>
          <Confirmation data={getValues()} setOpen={setOpen} />
        </Drawer>
      )}
    </div>
  );
};
