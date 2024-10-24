'use client';

import { Register } from '@/lib/definitions';
import { TableFilters } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

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

export const columns: CustomColumnDef<Register>[] = [
  { accessorKey: 'numero_violencia', header: 'Número' },
  {
    accessorKey: 'fecha_violencia',
    header: 'Fecha Violencia',
    cell: ({ row }) =>
      (row.getValue('fecha_violencia') as Date)?.toISOString()?.split('T')[0],
    meta: {
      filterVariant: 'none'
    }
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
      const newsLinks: string = row.getValue('link_noticia');

      if (!newsLinks.startsWith('https')) {
        return <span>{newsLinks}</span>;
      }

      const linkArray = newsLinks.split('https').filter(Boolean);

      return (
        <>
          {linkArray.length > 0 && linkArray.map((link, index) => (
            <a
              key={index}
              className="text-blue-600 hover:underline"
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
      filterVariant: 'none'
    }
  },
];
