'use client';

import { RegistrationForm } from '@/components/form/form';
import { Navigation } from '@/components/form/navigation';
import { Steps } from '@/components/form/steps';
import React from 'react';
import { steps } from './libs/multistep-form';

export default function Home() {
  const [previousStep, setPreviousStep] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const onSubmit = (values) => {
    console.log('onSubmit values ::: ', values);
  };

  return (
    <section className="m-4 flex min-h-svh flex-col justify-between gap-8 divide-y divide-gray-300 rounded-md border border-gray-300 p-6 md:divide-y-0">
      <Steps steps={steps} currentStep={currentStep} />

      <RegistrationForm
        steps={steps}
        currentStep={currentStep}
        onSubmit={onSubmit}
      />

      <Navigation
        currentStep={currentStep}
        totalSteps={steps.length}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        onSubmit={onSubmit}
      />
    </section>
  );
}
