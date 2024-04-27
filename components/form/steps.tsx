'use client';

import { useStepState } from '@/store/registration-form';
import { CurrentStep, NextStep, PreviousStep } from './step';

type StepProps = {
  steps: Step[];
};

export const Steps = ({ steps }: StepProps) => {
  const { currentStep } = useStepState();

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
