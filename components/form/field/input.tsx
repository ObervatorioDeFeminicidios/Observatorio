import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldProps } from '@/types';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export const FieldInput = ({ formField, form }: FieldProps) => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    field.onChange(
      formField.type !== 'int' ? e.target.value : Number(e.target.value),
    );

    if (field.name === 'direccion_vivienda_victima') {
      form.setValue(`direccion_hecho`, e.target.value);
    }
  };

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
              onChange={(e) => handleOnChange(e, field)}
              type={formField.type !== 'int' ? formField.type : 'number'}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
