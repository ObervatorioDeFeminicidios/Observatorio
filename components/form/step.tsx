import { CheckIcon } from '@heroicons/react/24/solid';

type StepProps = {
  step: Step;
  isDesktop: boolean;
};

export const PreviousStep = ({ step, isDesktop }: StepProps) => {
  return (
    <span className="flex w-full items-center px-6 py-4 text-sm font-medium">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
        <CheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
      </span>
      {isDesktop && (
        <span className="ml-4 text-sm font-medium text-primary">
          {step.name}
        </span>
      )}
    </span>
  );
};

export const CurrentStep = ({ step, isDesktop }: StepProps) => {
  return (
    <div
      aria-current="step"
      className="flex items-center px-6 py-4 text-sm font-medium"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
        <span className="font-medium text-primary">{step.id}</span>
      </span>
      {isDesktop && (
        <span className="ml-4 text-sm font-medium text-primary">
          {step.name}
        </span>
      )}
    </div>
  );
};

export const NextStep = ({ step, isDesktop }: StepProps) => {
  return (
    <div className="flex items-center px-6 py-4 text-sm font-medium">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
        <span className="font-light text-gray-300">{step.id}</span>
      </span>
      {isDesktop && (
        <span className="ml-4 text-sm font-normal text-gray-400">
          {step.name}
        </span>
      )}
    </div>
  );
};
