import { Column } from '@tanstack/react-table';
import { CustomColumnMeta } from '../columns';
import { Search } from './search';
import { Select } from './select';
import { DatePickerWithRange } from './date-range-picker';

export type ColumnFilterProps = {
  column: Column<any, unknown>;
};

/**
 * ColumnFilter is a component that renders a filter for a column based on the filterVariant.
 * @param column - The column to filter.
 * @returns A React component that renders a filter for the column.
 */
export const ColumnFilter: React.FC<ColumnFilterProps> = ({ column }) => {
  const { filterVariant } = (column.columnDef.meta ?? {}) as {
    filterVariant?: CustomColumnMeta['filterVariant'];
  };

  if (filterVariant === 'text') return <Search column={column} />;
  if (filterVariant === 'select') return <Select column={column} />;
  if (filterVariant === 'range') return <DatePickerWithRange column={column} />;
  if (filterVariant === 'none') return null;
};
