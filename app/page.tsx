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
import { Steps } from '@/components/form/steps';
import { Navigation } from '@/components/form/navigation';

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
      <Steps steps={steps} currentStep={currentStep} />

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
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>{formField.label}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              '!m-0 w-[300px] justify-between',
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
