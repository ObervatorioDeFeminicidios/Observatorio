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
import { FieldValues, useFormContext } from 'react-hook-form';
import { SelectEmpty } from './select-empty';

const filterOptions = (
  formValues: FieldValues,
  formField: TransformedObject,
) => {
  const hasOptions = formField.options && formField.options.length > 0;

  if (!hasOptions) {
    return formField.options || [];
  }

  switch (formField.id) {
    case 'municipio':
      return formValues.cod_departamento
        ? (formField.options as Option[]).filter(
            (option) => option.codDepartamento === formValues.cod_departamento,
          )
        : formField.options;
    case 'postal':
      if (formValues.cod_departamento) {
        return (formField.options as Option[]).filter(
          (option) => option.codDepartamento === formValues.cod_departamento,
        );
      }
      if (formValues.cod_municipio) {
        return (formField.options as Option[]).filter(
          (option) => option.codMunicipio === formValues.cod_municipio,
        );
      }
      return formField.options;
    default:
      return formField.options;
  }
};

const resetDependentFields = (
  form: FieldProps['form'],
  dependentFields: string[],
) => {
  dependentFields.forEach((dependentField) => {
    form.setValue(dependentField, '');
    form.setValue(`cod_${dependentField}`, '');
  });
};

export const FieldSelect = ({ formField, form }: FieldProps) => {
  const [open, setOpen] = React.useState(false);
  const { getValues } = useFormContext();

  // Filtering the municipality and postal code options
  const options = filterOptions(getValues(), formField);

  // Setting the selected/added option
  const onSelectAdd = (option: Option) => {
    console.log('onSelectAdd option :: ', option);
    // Adding the new option to the options list
    const optionIsInOptions = options?.find(
      (item) => item.value === option.value,
    );
    if (!optionIsInOptions) options?.push(option);

    // Setting the new selected/added option
    form.setValue(formField.id, option.label);
    switch (formField.id) {
      case 'departamento':
        form.setValue(
          `cod_${formField.id}`,
          (option.value + '').padStart(2, '0'),
        );
        // Reseting the minicipality and postal fields
        resetDependentFields(form, ['municipio', 'postal']);
        break;
      case 'municipio':
        form.setValue(
          `cod_${formField.id}`,
          (option.value + '').padStart(3, '0'),
        );
        // Reseting the postal field
        resetDependentFields(form, ['postal']);
        break;
      case 'postal':
        form.setValue(
          `cod_${formField.id}`,
          (option.value + '').padStart(6, '0'),
        );
        break;
      default:
        form.setValue(`cod_${formField.id}`, option.value);
        break;
    }
    console.log(form.getValues());
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
                    {(options as Option[]).map((option, index) => (
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
