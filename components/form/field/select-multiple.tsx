import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Option } from '@/components/ui/multiple-selector';
import MultipleSelector from '@/components/ui/multiple-selector';

export const FieldSelectMultiple = ({ formField, form }: FieldProps) => {
  let defaultOptions: Option[] = [];

  if (formField.options) {
    defaultOptions = formField.options.map((option) => ({
      value: option.value.toString(),
      label: option.label,
    }));
  }

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-between">
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <MultipleSelector
              value={field.value}
              onChange={field.onChange}
              defaultOptions={defaultOptions}
              placeholder="Seleccione las opciones que se ajusten..."
              hidePlaceholderWhenSelected
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
