'use client';

import { API_ROUTES } from '@/app/api';
import { Button } from '@/components/ui/button';
import { Register } from '@/lib/definitions';
import { TableColumn, tableColumns } from '@/lib/table';
import { TableFilters } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Extend the ColumnMeta to include the filterVariant property
export type CustomColumnMeta = {
  filterVariant?: TableColumn['type'];
};

// Extend the ColumnDef to include the CustomColumnMeta
export type CustomColumnDef<TData> = ColumnDef<TData, unknown> & {
  meta?: CustomColumnMeta;
};

export const initialFilters: TableFilters = {
  pageIndex: 0,
  pageSize: 30,
  columnFilters: [],
};

/**
 * formatDate is a function that returns a formatted date string.
 * @param dateKey - The date to format.
 * @returns A formatted date string.
 */
const formatDate = (dateKey: any) => {
  if (!dateKey) return '-';

  try {
    const date = new Date(dateKey);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return '-';
  }
}

/**
 * getColumns is a function that returns the columns for the table.
 * @param router - The router to navigate to the register page.
 * @returns An array of CustomColumnDef objects.
 */
export function getColumns(
  router: AppRouterInstance,
): CustomColumnDef<Register>[] {
  const columns: CustomColumnDef<Register>[] = [
    {
      accessorKey: tableColumns.numero_violencia.key,
      header: tableColumns.numero_violencia.label,
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="w-full border-primary text-primary"
          onClick={() =>
            router.push(
              `${API_ROUTES.registers}/${row.getValue(tableColumns.numero_violencia.key)}`,
            )
          }
        >
          {row.getValue(tableColumns.numero_violencia.key)}
        </Button>
      ),
      meta: {
        filterVariant: tableColumns.numero_violencia.type,
      },
    },
    {
      accessorKey: tableColumns.fecha_violencia.key,
      header: tableColumns.fecha_violencia.label,
      cell: ({ row }) => {
        const formatted = formatDate(row.getValue(tableColumns.fecha_violencia.key));
        return <div className="whitespace-nowrap">{formatted}</div>;
      },
      meta: {
        filterVariant: tableColumns.fecha_violencia.type,
      },
    },
    {
      accessorKey: tableColumns.tipo_violencia.key,
      header: tableColumns.tipo_violencia.label,
      meta: {
        filterVariant: tableColumns.tipo_violencia.type,
      },
    },
    {
      accessorKey: tableColumns.nombre_victima.key,
      header: tableColumns.nombre_victima.label,
      meta: {
        filterVariant: tableColumns.nombre_victima.type,
      },
    },
    {
      accessorKey: tableColumns.rango_edad_victima.key,
      header: tableColumns.rango_edad_victima.label,
      meta: {
        filterVariant: tableColumns.rango_edad_victima.type,
      },
    },
    {
      accessorKey: tableColumns.departamento.key,
      header: tableColumns.departamento.label,
      meta: {
        filterVariant: tableColumns.departamento.type,
      },
    },
    {
      accessorKey: tableColumns.municipio.key,
      header: tableColumns.municipio.label,
      meta: {
        filterVariant: tableColumns.municipio.type,
      },
    },
    {
      accessorKey: tableColumns.barrio.key,
      header: tableColumns.barrio.label,
      meta: {
        filterVariant: tableColumns.barrio.type,
      },
    },
    {
      accessorKey: tableColumns.identidad_genero.key,
      header: tableColumns.identidad_genero.label,
      meta: {
        filterVariant: tableColumns.identidad_genero.type,
      },
    },
    {
      accessorKey: tableColumns.identidad_social.key,
      header: tableColumns.identidad_social.label,
      meta: {
        filterVariant: tableColumns.identidad_social.type,
      },
    },
    {
      accessorKey: tableColumns.identidad_etnica.key,
      header: tableColumns.identidad_etnica.label,
      meta: {
        filterVariant: tableColumns.identidad_etnica.type,
      },
    },
    {
      accessorKey: tableColumns.actividad_economica_victima.key,
      header: tableColumns.actividad_economica_victima.label,
      meta: {
        filterVariant: tableColumns.actividad_economica_victima.type,
      },
    },
    {
      accessorKey: tableColumns.nombre_sujeto_feminicida.key,
      header: tableColumns.nombre_sujeto_feminicida.label,
      meta: {
        filterVariant: tableColumns.nombre_sujeto_feminicida.type,
      },
    },
    {
      accessorKey: tableColumns.sujeto_feminicida.key,
      header: tableColumns.sujeto_feminicida.label,
      meta: {
        filterVariant: tableColumns.sujeto_feminicida.type,
      },
    },
    {
      accessorKey: tableColumns.parentesco_o_relacion.key,
      header: tableColumns.parentesco_o_relacion.label,
      meta: {
        filterVariant: tableColumns.parentesco_o_relacion.type,
      },
    },
    {
      accessorKey: tableColumns.metodo_eliminacion.key,
      header: tableColumns.metodo_eliminacion.label,
      meta: {
        filterVariant: tableColumns.metodo_eliminacion.type,
      },
    },
    {
      accessorKey: tableColumns.continuum_violencia_sf.key,
      header: tableColumns.continuum_violencia_sf.label,
      meta: {
        filterVariant: tableColumns.continuum_violencia_sf.type,
      },
    },
    {
      accessorKey: tableColumns.lugar_encuentra_cadaver.key,
      header: tableColumns.lugar_encuentra_cadaver.label,
      meta: {
        filterVariant: tableColumns.lugar_encuentra_cadaver.type,
      },
    },
    {
      accessorKey: tableColumns.link_noticia.key,
      header: tableColumns.link_noticia.label,
      cell: ({ row }) => {
        const newsLinks: string = row.getValue(tableColumns.link_noticia.key);

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
        filterVariant: tableColumns.link_noticia.type,
      },
    },
  ];

  return columns;
}
