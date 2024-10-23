'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useFormStore } from '@/store/registration-form';
import { CurrentStep, NextStep, PreviousStep } from './step';
import { Step } from '@/types';

type StepProps = {
  steps: Step[];
};

export const Steps = ({ steps }: StepProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { currentStep } = useFormStore();

  return (
    <>
      <nav aria-label="Progress" className="w-full self-center">
        <ol role="list" className="flex justify-evenly">
          {steps.map((step, index) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {currentStep > index ? (
                <PreviousStep step={step} isDesktop={isDesktop} />
              ) : currentStep === index ? (
                <CurrentStep step={step} isDesktop={isDesktop} />
              ) : (
                <NextStep step={step} isDesktop={isDesktop} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {!isDesktop && (
        <span className="self-center text-lg font-medium text-primary">
          {steps[currentStep].name}
        </span>
      )}
    </>
  );
};
