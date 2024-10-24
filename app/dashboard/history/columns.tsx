'use client';

import { Register } from '@/lib/definitions';
import { ColumnDef, PaginationState } from '@tanstack/react-table';

// Extend the ColumnMeta to include the filterVariant property
export type CustomColumnMeta = {
  filterVariant?: 'range' | 'select' | 'text';
};

// Extend the ColumnDef to include the CustomColumnMeta
type CustomColumnDef<TData> = ColumnDef<TData, unknown> & {
  meta?: CustomColumnMeta;
};

export const initialPagination: PaginationState = { pageIndex: 0, pageSize: 10 };

export const columns: CustomColumnDef<Register>[] = [
  { accessorKey: 'numero_violencia', header: 'Número' },
  {
    accessorKey: 'fecha_violencia',
    header: 'Fecha Violencia',
    cell: ({ row }) =>
      (row.getValue('fecha_violencia') as Date)?.toISOString()?.split('T')[0],
  },
  { accessorKey: 'tipo_violencia', header: 'Tipo Violencia' },
  { accessorKey: 'nombre_victima', header: 'Nombre Víctima' },
  { accessorKey: 'departamento', header: 'Departamento' },
  { accessorKey: 'municipio', header: 'Municipio' },
  { accessorKey: 'identidad_genero', header: 'Identidad de Género' },
  { accessorKey: 'identidad_social', header: 'Identidad Social' },
  { accessorKey: 'identidad_etnica', header: 'Identidad Étnica' },
  { accessorKey: 'metodo_eliminacion', header: 'Método de Eliminación' },
  { accessorKey: 'actividad_economica_victima', header: 'Actividad Económica' },
  { accessorKey: 'lugar_encuentra_cadaver', header: 'Lugar Encuentra Cuerpo' },
  { accessorKey: 'nombre_sujeto_feminicida', header: 'Nombre Feminicida' },
  {
    accessorKey: 'link_noticia',
    header: 'Noticia',
    cell: ({ row }) => {
      const newsLink: string = row.getValue('link_noticia');

      if (!newsLink.startsWith('https')) {
        return <span>{newsLink}</span>;
      }

      return (
        <a
          href={newsLink}
          className="text-blue-600 hover:underline whitespace-nowrap"
          target="_blank"
        >
          {newsLink}
        </a>
      );
    },
  },
];
