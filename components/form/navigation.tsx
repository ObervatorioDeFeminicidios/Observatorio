import React from 'react';
import { Button } from '@/components/ui/button';

type NavigationProps = {
  currentStep: number;
  totalSteps: number;
  handlePrevious: () => void;
  handleNext: () => void;
  onSubmit: (data: any) => void;
};

export const Navigation = ({
  currentStep,
  totalSteps,
  handlePrevious,
  handleNext,
  onSubmit,
}: NavigationProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="ghost"
        onClick={handlePrevious}
        disabled={currentStep === 0}
      >
        Atrás
      </Button>
      <Button
        className="bg-indigo-600 hover:bg-indigo-700"
        onClick={currentStep === totalSteps - 1 ? onSubmit : handleNext}
      >
        {currentStep === totalSteps - 1 ? 'Registrar' : 'Siguiente'}
      </Button>
    </div>
  );
};
