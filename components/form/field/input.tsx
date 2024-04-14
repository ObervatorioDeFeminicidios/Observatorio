import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Field } from '@/app/libs/multistep-form';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type FieldProps = {
  formField: Field;
  form: UseFormReturn<FieldValues, any, undefined>;
}

export const FieldInput = ({formField, form}: FieldProps) => {
  return (
    <FormField
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
  )
}
