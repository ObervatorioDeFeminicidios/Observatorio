import { Step } from '@/app/libs/multistep-form';
import React from 'react';
import { CurrentStep, NextStep, PreviousStep } from './step';

type StepProps = {
  steps: Step[];
  currentStep: number;
};

export const Steps = ({ steps, currentStep }: StepProps) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="md:flex">
        {steps.map((step, index) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {currentStep > index ? (
              <PreviousStep step={step} />
            ) : currentStep === index ? (
              <CurrentStep step={step} />
            ) : (
              <NextStep step={step} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
