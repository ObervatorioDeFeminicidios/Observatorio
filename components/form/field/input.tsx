import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldProps = {
  formField: TransformedObject;
  form: UseFormReturn<FieldValues, any, undefined>;
};

export const FieldInput = ({ formField, form }: FieldProps) => {
  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-secondary-foreground">
            {formField.label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              onChange={(e) =>
                field.onChange(
                  formField.type !== 'int'
                    ? e.target.value
                    : Number(e.target.value),
                )
              }
              type={formField.type !== 'int' ? formField.type : 'number'}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
