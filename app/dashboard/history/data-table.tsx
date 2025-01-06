'use client';

import { fetchRegisters } from '@/actions/_form';
import { getColumns, initialFilters } from '@/components/table/columns';
import { ColumnFilter } from '@/components/table/filters/column-filter';
import { RowLoader } from '@/components/table/loaders/rows';
import { DataTablePagination } from '@/components/table/pagination';
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

const initialPagination: PaginationState = {
  pageIndex: initialFilters.pageIndex,
  pageSize: initialFilters.pageSize,
};

const initialColumnFilters: ColumnFiltersState = initialFilters.columnFilters;

export function DataTable() {
  const router = useRouter();

  // Adding the pagination with backend
  const [pagination, setPagination] =
    React.useState<PaginationState>(initialPagination);

  // Adding filtering with backend
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  // Fetching the registers
  const dataQuery = useQuery({
    queryKey: ['data', pagination, columnFilters],
    queryFn: () => fetchRegisters({ ...pagination, columnFilters }),
    placeholderData: keepPreviousData,
  });

  // Getting the columns structure
  const columns = React.useMemo(() => getColumns(router), []);

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
    onColumnFiltersChange: (updater) => {
      setPagination((prev) => ({
        ...prev,
        pageIndex: initialPagination.pageIndex,
      }));
      setColumnFilters(updater);
    },
    debugTable: false,
  });

  // Handling any errors
  if (dataQuery.error) return <div>Error: {dataQuery.error.message}</div>;

  return (
    <div className="flex h-full flex-col justify-between gap-4 sm:gap-6 lg:gap-8">
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap pb-2 font-semibold text-primary-foreground"
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
                className="min-h-full border-none px-6 py-4 text-xs"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-52">
                {dataQuery.isLoading ? (
                  <RowLoader />
                ) : (
                  'No se encontraron resultados'
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
