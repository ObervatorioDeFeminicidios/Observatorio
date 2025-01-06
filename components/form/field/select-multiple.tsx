import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Option } from '@/components/ui/multiple-selector';
import MultipleSelector from '@/components/ui/multiple-selector';
import { useFormStore } from '@/store/registration-form';
import { FieldProps } from '@/types';

export const FieldSelectMultiple = ({ formField, form }: FieldProps) => {
  const { initialAssociatedViolences } = useFormStore();

  let defaultOptions: Option[] = initialAssociatedViolences.map(associatedViolence => ({
    value: associatedViolence.value.toString(),
    label: associatedViolence.label,
  }));

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
        <FormItem className="flex flex-col justify-between mx-2">
          <FormLabel className="text-secondary-foreground">{formField.label}</FormLabel>
          <FormControl>
            <MultipleSelector
              commandProps={{
                className: 'h-auto',
              }}
              value={field.value}
              onChange={field.onChange}
              defaultOptions={defaultOptions}
              placeholder="Seleccione las opciones que se ajusten..."
              hidePlaceholderWhenSelected
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  No se encontraron resultados
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
