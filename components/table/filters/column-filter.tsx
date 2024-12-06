import { Column } from '@tanstack/react-table';
import { CustomColumnMeta } from '../columns';
import { Search } from './search';
import { Select } from './select';

export type ColumnFilterProps = {
  column: Column<any, unknown>;
};

export const ColumnFilter: React.FC<ColumnFilterProps> = ({ column }) => {
  const { filterVariant } = (column.columnDef.meta ?? {}) as {
    filterVariant?: CustomColumnMeta['filterVariant'];
  };

  if (filterVariant === 'text') return <Search column={column} />;
  if (filterVariant === 'select') return <Select column={column} />;
  if (filterVariant === 'none') return null;
};
