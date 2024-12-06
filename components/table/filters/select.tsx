import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { OptionField, TransformedObject } from '@/types';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { ColumnFilterProps } from './column-filter';

const mockedfilters: Partial<TransformedObject>[] = [
  {
    id: 'tipo_violencia',
    options: [
      {
        value: 1,
        label: 'Feminicidio',
      },
      {
        value: 2,
        label: 'Feminicidio en grado de tentativa',
      },
      {
        value: 3,
        label: 'Transfeminicidio',
      },
    ],
  },
  {
    id: 'identidad_genero',
    options: [
      {
        value: 1,
        label: 'Mujer Cis',
      },
      {
        value: 2,
        label: 'Mujer Trans',
      },
      {
        value: 3,
        label: 'Hombre Trans',
      },
      {
        value: 4,
        label: 'Sin información',
      },
      {
        value: 5,
        label: 'No Binario',
      },
    ],
  },
];

export const Select: React.FC<ColumnFilterProps> = ({ column }) => {
  const [open, setOpen] = React.useState(false);

  const { header } = column.columnDef;

  // Getting the applied filter for an specific column
  const columnFilterValue = column.getFilterValue() as string;

  // Getting the options list for the column
  const columnId = column.id;
  const options =
    mockedfilters.find((filters) => filters.id === columnId)?.options || [];

  // console.log('Select filter data ::: ', {
  //   columnFilterValue,
  //   columnId,
  //   options,
  // });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'max-h-6',
            'min-w-32',
            'justify-between',
            'font-light',
            'border-secondary',
            'p-1',
            'text-xs',
            'text-primary-foreground',
            !columnFilterValue && 'text-muted-foreground',
          )}
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {columnFilterValue || `${header}...`}
          <ChevronUpDownIcon className="ml-1 h-4 w-4 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar..." className="h-6" />
          <CommandEmpty>
            <p className="font-light text-muted-foreground">
              Ninguna opción se encontró
            </p>
          </CommandEmpty>
          <CommandGroup>
            <ScrollArea className="max-h-72 w-auto overflow-y-auto">
              {(options as OptionField[]).map((option, index) => (
                <CommandItem
                  key={option.value + '-' + index}
                  value={option.label}
                  onSelect={(label) => {
                    const isOptionSelected =
                      option.label.toLowerCase() === columnFilterValue;
                    column.setFilterValue(!isOptionSelected ? label : '');
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      option.label.toLowerCase() === columnFilterValue
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
  );
};
