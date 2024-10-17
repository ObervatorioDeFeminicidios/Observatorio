import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldProps } from '@/types';

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
              className="font-light"
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
