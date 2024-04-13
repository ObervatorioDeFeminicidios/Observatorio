'use client';

import React from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { steps } from './libs/multistep-form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export default function Home() {
  const [previousStep, setPreviousStep] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const form = useForm();

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
      {/* Steps */}
      <nav aria-label="Progress">
        <ol role="list" className="md:flex">
          {steps.map((step, index) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {currentStep > index ? (
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
              ) : currentStep === index ? (
                <a
                  href={step.href}
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
              ) : (
                <a href={step.href} className="group flex items-center">
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
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8"
        >
          {steps[currentStep].fields.map((formField, index) =>
            formField.type !== 'select' ? (
              <FormField
                key={formField.id}
                control={form.control}
                name={formField.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                key={formField.id}
                control={form.control}
                name={formField.id}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <FormLabel>{formField.label}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[300px] justify-between !m-0',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? formField.options.find(
                                  (option) => option.label === field.value,
                                )?.label
                              : 'Select option...'}
                            <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search option..."
                            className="h-9"
                          />
                          <CommandEmpty>No option found.</CommandEmpty>
                          <CommandGroup>
                            {formField.options.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.label}
                                onSelect={() => {
                                  form.setValue(formField.id, option.label);
                                }}
                              >
                                {option.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    option.label === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ),
          )}
        </form>
      </Form>

      {/* Navigation */}
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
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Siguiente
        </Button>
      </div>
    </section>
  );
}
