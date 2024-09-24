'use client';

import { Register } from '@/lib/definitions';
import { ColumnDef } from '@tanstack/react-table';

// export const columns: ColumnDef<Register>[] = [
//   { accessorKey: 'numero_violencia', header: 'ID' },
//   {
//     accessorKey: 'fecha_violencia',
//     header: 'Fecha Violencia',
//     cell: ({ row }) => (row.getValue('fecha_violencia') as string).split('T')[0],
//   },
//   { accessorKey: 'departamento', header: 'Departamento' },
//   { accessorKey: 'municipio', header: 'Municipio' },
//   { accessorKey: 'tipo_violencia', header: 'Tipo Violencia' },
//   { accessorKey: 'nombre_victima', header: 'Nombre Víctima' },
//   { accessorKey: 'edad_victima', header: 'Edad Víctima' },
//   { accessorKey: 'nacionalidad', header: 'Nationalidad' },
//   { accessorKey: 'identidad_genero', header: 'Identidad de Género' },
//   {
//     accessorKey: 'situacion_discapacidad_victima',
//     header: 'Situación Discapacidad',
//   },
//   { accessorKey: 'nombre_sujeto_feminicida', header: 'Nombre Feminicida' },
//   { accessorKey: 'edad_sujeto_feminicida', header: 'Edad Feminicida' },
//   { accessorKey: 'situacion_juridica_sf', header: 'Situación Jurídica' },
//   { accessorKey: 'parentesco_o_relacion', header: 'Parentesco/Relación' },
//   {
//     accessorKey: 'violencia_asociada',
//     header: 'Violencia Asociada',
//     cell: ({ row }) =>
//       row.original.violencia_asociada?.map((v) => v.label).join(', ') || 'N/A',
//   },
//   { accessorKey: 'link_noticia', header: 'Noticia' },
//   { accessorKey: 'titular', header: 'Titular' },
// ];

export const columns: ColumnDef<Register>[] = [
  { accessorKey: 'numero_violencia', header: 'Número' },
  {
    accessorKey: 'fecha_violencia',
    header: 'Fecha Violencia',
    cell: ({ row }) =>
      (row.getValue('fecha_violencia') as string).split('T')[0],
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
