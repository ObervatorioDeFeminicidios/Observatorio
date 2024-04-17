'use client';

import { RegistrationForm } from '@/components/form/form';
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

  return (
    <section className="m-4 flex flex-col gap-10 divide-y divide-gray-300 rounded-md border border-gray-300 p-6 md:divide-y-0">
      <Steps steps={steps} currentStep={currentStep} />

      <RegistrationForm
        steps={steps}
        currentStep={currentStep}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </section>
  );
}
