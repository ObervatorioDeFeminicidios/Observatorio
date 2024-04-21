import { Field, SelectField } from '@/app/libs/multistep-form';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldProps = {
  formField: Field;
  form: UseFormReturn<FieldValues, any, undefined>;
};

export const FieldSelect = ({ formField, form }: FieldProps) => {
  return (
    <FormField
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
                    ? (formField as SelectField).options.find(
                        (option) => option.label === field.value,
                      )?.label
                    : 'Select option...'}
                  <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search option..." className="h-9" />
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {(formField as SelectField).options.map((option) => (
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
  );
};