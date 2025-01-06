import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FieldProps } from '@/types';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export const FieldInput = ({
  stepIndex,
  formIndex,
  formField,
  form,
}: FieldProps) => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    field.onChange(
      formField.type !== 'int' ? e.target.value : Number(e.target.value),
    );

    if (field.name === 'direccion_hecho') {
      form.setValue(`direccion_vivienda_victima`, e.target.value, { shouldDirty: true });
    }
  };

  const isStepFourField = stepIndex === 4 && (formIndex as number) > 3;

  const itemClassName = cn(
    'mx-2',
    {
      'col-span-2': isStepFourField,
    },
  );

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem className={itemClassName}>
          <FormLabel className="text-secondary-foreground">
            {formField.label}
          </FormLabel>
          <FormControl>
            {!isStepFourField ? (
              <Input
                {...field}
                className="font-light"
                onChange={(e) => handleOnChange(e, field)}
                type={formField.type !== 'int' ? formField.type : 'number'}
              />
            ) : (
              <Textarea
                {...field}
                className="h-32 w-full resize-y overflow-auto break-words text-left"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
