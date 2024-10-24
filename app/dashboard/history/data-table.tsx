'use client';

import { fetchRegisters } from '@/actions/_form';
import { API_ROUTES } from '@/app/api';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Register } from '@/lib/definitions';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ColumnFilter } from './column-filter';
import { columns, initialPagination } from './columns';

export function DataTable() {
  const router = useRouter();

  // Adding the pagination with backend
  const [pagination, setPagination] =
    React.useState<PaginationState>(initialPagination);

  // Adding filtering with backend
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // Fetching the registers
  const dataQuery = useQuery({
    queryKey: ['data', pagination, columnFilters],
    queryFn: () => fetchRegisters({ ...pagination, columnFilters }),
    placeholderData: keepPreviousData,
  });

  // Setting up the table with the registers
  const table = useReactTable({
    data: (dataQuery.data?.results as Register[]) ?? [],
    columns,
    rowCount: dataQuery.data?.totalRecords,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    state: {
      pagination,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    debugTable: true,
  });

  // Handling any errors
  if (dataQuery.error) return <div>Error: {dataQuery.error.message}</div>;

  // Handle row click to navigate to the dynamic route
  const handleRowClick = (rowId: number) => {
    router.push(`${API_ROUTES.registers}/${rowId}`);
  };

  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap pb-4 font-semibold text-zinc-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <ColumnFilter column={header.column} />
                        </div>
                      ) : null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="min-h-12 cursor-pointer px-4 py-2 odd:bg-zinc-50 even:bg-gray-100
                  "
                  onClick={() => handleRowClick(row.original.numero_violencia)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
