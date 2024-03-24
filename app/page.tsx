import { CheckIcon } from '@heroicons/react/24/solid';
import { steps } from './libs/multistep-form';

export default function Home() {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === 'complete' ? (
              <a href={step.href} className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800 dark:group-hover:bg-indigo-700">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {step.name}
                  </span>
                </span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                aria-current="step"
                className="flex items-center px-6 py-4 text-sm font-medium"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">
                    {step.id}
                  </span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {step.name}
                </span>
              </a>
            ) : (
              <a href={step.href} className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800 dark:group-hover:bg-indigo-700">
                    <span className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-500">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-500">
                    {step.name}
                  </span>
                </span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
