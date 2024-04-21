import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

type StepProps = {
  step: Step;
};

export const PreviousStep = ({ step }: StepProps) => {
  return (
    <a href='#' className="group flex w-full items-center">
      <span className="flex items-center px-6 py-4 text-sm font-medium">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800 dark:group-hover:bg-indigo-700">
          <CheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
        </span>
        <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
          {step.name}
        </span>
      </span>
    </a>
  );
};

export const CurrentStep = ({ step }: StepProps) => {
  return (
    <a
      href='#'
      aria-current="step"
      className="flex items-center px-6 py-4 text-sm font-medium"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
        <span className="text-indigo-600">{step.id}</span>
      </span>
      <span className="ml-4 text-sm font-medium text-indigo-600">
        {step.name}
      </span>
    </a>
  );
};

export const NextStep = ({ step }: StepProps) => {
  return (
    <a href='#' className="group flex items-center">
      <span className="flex items-center px-6 py-4 text-sm font-medium">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800 dark:group-hover:bg-indigo-700">
          <span className="text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-500">
            {step.id}
          </span>
        </span>
        <span className="ml-4 text-sm font-medium text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-500">
          {step.name}
        </span>
      </span>
    </a>
  );
};
