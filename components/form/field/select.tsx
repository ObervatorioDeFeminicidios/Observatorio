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
import {
  FieldProps,
  OptionField,
  SelectField,
  TransformedObject,
} from '@/types';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { SelectEmpty } from './select-empty';

const filterOptions = (
  form: FieldProps['form'],
  formField: TransformedObject,
) => {
  const formValues = form.getValues();
  const hasOptions = formField.options && formField.options.length > 0;

  if (!hasOptions) {
    return formField.options || [];
  }

  switch (formField.id) {
    case 'municipio':
      return formValues.cod_departamento
        ? (formField.options as OptionField[]).filter(
            (option) => option.codDepartamento === formValues.cod_departamento,
          )
        : formField.options;
    case 'postal':
      if (formValues.cod_departamento) {
        return (formField.options as OptionField[]).filter(
          (option) => option.codDepartamento === formValues.cod_departamento,
        );
      }
      if (formValues.cod_municipio) {
        return (formField.options as OptionField[]).filter(
          (option) => option.codMunicipio === formValues.cod_municipio,
        );
      }
      return formField.options;
    case 'identidad_genero':
      if (formValues.cod_tipo_violencia === 1) {
        return (formField.options as OptionField[]).filter(
          (option) => [1, 4, 5].includes(option.value)
        );
      }
      if (formValues.cod_tipo_violencia === 3) {
        return (formField.options as OptionField[]).filter(
          (option) => [2, 3].includes(option.value)
        );
      }
      if (formValues.cod_tipo_violencia === 2) {
        return formField.options;
      }
      return formField.options;
    default:
      const currentLabel = formValues[formField.id];
      const newLabel = formField.options?.find(option => option.value === formValues[`cod_${formField.id}`])?.label;
      
      if (newLabel && currentLabel !== newLabel) {
        formValues[formField.id] = newLabel;
        form.setValue(formField.id, newLabel, { shouldDirty: true });
      }
      
      return formField.options;
  }
};

const resetDependentFields = (
  form: FieldProps['form'],
  dependentFields: string[],
) => {
  dependentFields.forEach((dependentField) => {
    form.setValue(dependentField, '', { shouldDirty: true });
    form.setValue(`cod_${dependentField}`, '', { shouldDirty: true });
  });
};

export const FieldSelect = ({ formField, form }: FieldProps) => {
  const [open, setOpen] = React.useState(false);

  // Filtering the municipality and postal code options
  const options = filterOptions(form, formField);

  // Setting the selected/added option
  const onSelectAdd = (option: OptionField) => {
    // Adding the new option to the options list
    const optionIsInOptions = options?.find(
      (item) => item.value === option.value,
    );
    if (!optionIsInOptions) options?.push(option);

    // Setting the new selected/added option
    form.setValue(formField.id, option.label, { shouldDirty: true });
    
    switch (formField.id) {
      case 'rango_edad_victima':
        form.setValue(`cod_${formField.id}`, option.value, { shouldDirty: true });

        // Set cod_clasifica_edad_victima based on cod_rango_edad_victima value
        if (option.value >= 1 && option.value <= 4) {
          form.setValue('cod_clasifica_edad_victima', 2, { shouldDirty: true });
        } else if (option.value >= 5 && option.value <= 18) {
          form.setValue('cod_clasifica_edad_victima', 1, { shouldDirty: true });
        } else if (option.value === 19) {
          form.setValue('cod_clasifica_edad_victima', 3, { shouldDirty: true });
        }
        break;
      case 'departamento':
        form.setValue(
          `cod_${formField.id}`,
          (option.value + '').padStart(2, '0'),
          { shouldDirty: true },
        );
        resetDependentFields(form, ['municipio', 'comuna', 'postal']);
        break;
      case 'municipio':
        form.setValue(
          `cod_${formField.id}`,
          (option.value + '').padStart(3, '0'),
          { shouldDirty: true },
        );
        resetDependentFields(form, ['comuna', 'postal']);
        break;
      case 'postal':
        form.setValue(
          `cod_${formField.id}`,
          (option.value + '').padStart(6, '0'),
          { shouldDirty: true },
        );
        break;
      default:
        form.setValue(
          `cod_${formField.id}`,
          option.value,
          { shouldDirty: true }
        );
        break;
    }
    setOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name={formField.id}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-between">
          <FormLabel className="text-secondary-foreground">
            {formField.label}
          </FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    'font-light',
                    !field.value && 'text-muted-foreground',
                  )}
                  aria-expanded={open}
                >
                  {field.value
                    ? (formField as SelectField).options.find(
                        (option) => option.label === field.value,
                      )?.label
                    : 'Selecione una opción...'}
                  <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-60" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Buscar..." className="h-9" />
                <CommandEmpty>
                  <SelectEmpty
                    fieldId={formField.id}
                    isUpdatable={formField.updatable}
                    closePopover={() => setOpen(false)}
                    onSelectAdd={onSelectAdd}
                  />
                </CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="max-h-72 w-auto overflow-y-auto">
                    {(options as OptionField[]).map((option, index) => (
                      <CommandItem
                        key={option.value + '-' + index}
                        value={option.label}
                        onSelect={() => onSelectAdd(option)}
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
        </FormItem>
      )}
    />
  );
};
