'use client';

import { fetchRegisters } from '@/actions/_form';
import { DataTablePagination } from '@/components/ui/data-table/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { columns } from './columns';
import { Register } from '@/lib/definitions';
import { initialPagination } from './page';

export function DataTable() {
  const [pagination, setPagination] = React.useState<PaginationState>(initialPagination);

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchRegisters(pagination),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: (dataQuery.data?.results as Register[]) ?? [],
    columns,
    rowCount: dataQuery.data?.totalRecords,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  if (dataQuery.error) return <div>Error: {dataQuery.error.message}</div>;

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
                  className="min-h-12 px-4 py-2 odd:bg-zinc-50 even:bg-gray-100
                  "
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
