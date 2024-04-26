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
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldProps = {
  formField: TransformedObject;
  form: UseFormReturn<FieldValues, any, undefined>;
};

export const FieldSelect = ({ formField, form }: FieldProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem className="flex items-baseline justify-between">
          <FormLabel className="max-w-[40%]">{formField.label}</FormLabel>
          <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      '!m-0 w-[300px] justify-between',
                      !field.value && 'text-muted-foreground',
                    )}
                    aria-expanded={open}
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
                  <CommandInput placeholder="Buscar..." className="h-9" />
                  <CommandEmpty>Ninguna opción se encontró.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="w-auto max-h-72 overflow-y-auto">
                      {(formField as SelectField).options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => {
                            form.setValue(formField.id, option.label);
                            form.setValue(`cod_${formField.id}`, option.value);
                            console.log(form.getValues())
                            setOpen(false);
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
                    </ScrollArea>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
