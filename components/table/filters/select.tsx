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
import { OptionField } from '@/types';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { ColumnFilterProps } from './column-filter';
import { useQuery } from '@tanstack/react-query';
import { fetchSelectFilters } from '@/actions/_form';

/**
 * Select is a component that renders a select input for a column.
 * @param column - The column to select.
 * @returns A React component that renders a select input for the column.
 */
export const Select: React.FC<ColumnFilterProps> = ({ column }) => {
  const [open, setOpen] = React.useState(false);
  const { header } = column.columnDef;
  const columnId = column.id;

  // Getting the applied filter for an specific column
  const columnFilterValue = column.getFilterValue() as string;

  // Fetching the select options for the table filters
  const { data: selectFiltersData} = useQuery({
    queryKey: ['selectFilters'],
    queryFn: fetchSelectFilters,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  // Getting the options list for the column
  const options = React.useMemo(
    () =>
      selectFiltersData?.results?.find((filters) => filters.id === columnId)
        ?.options || [],
    [selectFiltersData, columnId],
  );

  const handleSelect = React.useCallback(
    (label: string, option: OptionField ) => {
      const isOptionSelected = option.label.toLowerCase() === columnFilterValue;
      column.setFilterValue(!isOptionSelected ? label : '');
      setOpen(false);
    },
    [column, columnFilterValue],
  );

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
                  onSelect={(label) => handleSelect(label, option)}
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
