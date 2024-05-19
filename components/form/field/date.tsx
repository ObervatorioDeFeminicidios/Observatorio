import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const FieldDate = ({ formField, form }: FieldProps) => {
  const [open, setOpen] = React.useState(false);
  const { setValue } = useFormContext();

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-end gap-2">
          <FormLabel className="text-secondary-foreground">
            {formField.label}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? field.value : <span>YYYY-MM-DD</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-60" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                locale={es}
                selected={field.value}
                onSelect={(value) => {
                  const formattedValue = value && format(value, 'yyyy-MM-dd');
                  field.onChange(value);
                  if (formField.id === 'fecha_violencia') {
                    setValue('fecha_violencia', formattedValue);
                    setValue('ano', Number(formattedValue?.split('-')[0]));
                    setValue('mes', Number(formattedValue?.split('-')[1]));
                  }
                  setOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
