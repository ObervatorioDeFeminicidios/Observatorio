'use client';

import { API_ROUTES } from '@/app/api';
import { Button } from '@/components/ui/button';
import { Register } from '@/lib/definitions';
import { TableFilters } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Extend the ColumnMeta to include the filterVariant property
export type CustomColumnMeta = {
  filterVariant?: 'range' | 'select' | 'text' | 'none';
};

// Extend the ColumnDef to include the CustomColumnMeta
type CustomColumnDef<TData> = ColumnDef<TData, unknown> & {
  meta?: CustomColumnMeta;
};

export const initialFilters: TableFilters = {
  pageIndex: 0,
  pageSize: 10,
  columnFilters: [],
};

export function getColumns(
  router: AppRouterInstance,
): CustomColumnDef<Register>[] {
  const columns: CustomColumnDef<Register>[] = [
    {
      accessorKey: 'numero_violencia',
      header: 'Número',
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() =>
            router.push(
              `${API_ROUTES.registers}/${row.getValue('numero_violencia')}`,
            )
          }
        >
          {row.getValue('numero_violencia')}
        </Button>
      ),
    },
    {
      accessorKey: 'fecha_violencia',
      header: 'Fecha Violencia',
      cell: ({ row }) =>
        (row.getValue('fecha_violencia') as Date)?.toISOString()?.split('T')[0],
      meta: {
        filterVariant: 'none',
      },
    },
    { accessorKey: 'tipo_violencia', header: 'Tipo Violencia' },
    { accessorKey: 'nombre_victima', header: 'Nombre Víctima' },
    { accessorKey: 'departamento', header: 'Departamento' },
    { accessorKey: 'municipio', header: 'Municipio' },
    { accessorKey: 'identidad_genero', header: 'Identidad de Género' },
    { accessorKey: 'identidad_social', header: 'Identidad Social' },
    { accessorKey: 'identidad_etnica', header: 'Identidad Étnica' },
    { accessorKey: 'metodo_eliminacion', header: 'Método de Eliminación' },
    {
      accessorKey: 'actividad_economica_victima',
      header: 'Actividad Económica',
    },
    {
      accessorKey: 'lugar_encuentra_cadaver',
      header: 'Lugar Encuentra Cuerpo',
    },
    { accessorKey: 'nombre_sujeto_feminicida', header: 'Nombre Feminicida' },
    {
      accessorKey: 'link_noticia',
      header: 'Noticia',
      cell: ({ row }) => {
        const newsLinks: string = row.getValue('link_noticia');

        if (!newsLinks.startsWith('https')) {
          return <span>{newsLinks}</span>;
        }

        const linkArray = newsLinks.split('https').filter(Boolean);

        return (
          <>
            {linkArray.length > 0 &&
              linkArray.map((link, index) => (
                <a
                  key={index}
                  className="whitespace-nowrap text-blue-600 hover:underline"
                  href={`https${link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https${link}`}
                </a>
              ))}
          </>
        );
      },
      meta: {
        filterVariant: 'none',
      },
    },
  ];

  return columns;
}
