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
import { Register } from '@/lib/definitions';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { columns, initialPagination } from './columns';
import { useRouter } from 'next/navigation';

export function DataTable() {
  const router = useRouter();

  // Adding the pagination with backend
  const [pagination, setPagination] =
    React.useState<PaginationState>(initialPagination);

  // Fetching the registers
  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchRegisters(pagination),
    placeholderData: keepPreviousData,
  });

  // Setting up the table with the registers
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

  // Handling any errors
  if (dataQuery.error) return <div>Error: {dataQuery.error.message}</div>;

  // Handle row click to navigate to the dynamic route
  const handleRowClick = (rowId: number) => {
    router.push(`/dashboard/registers/${rowId}`);
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
                  className="min-h-12 px-4 py-2 odd:bg-zinc-50 even:bg-gray-100 cursor-pointer
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
