import { DebouncedInput } from '@/util/debounced-input'
import React from 'react'
import { ColumnFilterProps } from './column-filter';

export const Search: React.FC<ColumnFilterProps> = ({ column }) => {
  const { header } = column.columnDef;
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      className="w-100 min-w-32 rounded border border-secondary p-1 text-xs font-light text-primary-foreground"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`${header}...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
}
