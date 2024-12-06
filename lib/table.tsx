import { ColumnFiltersState } from '@tanstack/react-table';
import sql from 'sql-template-strings';

// Setting up the structure of the table columns which is ideal for lookups by key, which can be done efficiently and also we are improving maintainability by centralizing the column-related metadata here
export type TableColumn = {
  key: string;
  label: string;
  type: 'range' | 'select' | 'text' | 'none';
};

export type TableColumns = Record<string, TableColumn>;

export const tableColumns: TableColumns = {
  numero_violencia: { key: 'numero_violencia', label: 'Id', type: 'text' },
  fecha_violencia: {
    key: 'fecha_violencia',
    label: 'Fecha Violencia',
    type: 'none',
  },
  tipo_violencia: {
    key: 'tipo_violencia',
    label: 'Tipo Violencia',
    type: 'select',
  },
  nombre_victima: {
    key: 'nombre_victima',
    label: 'Nombre Víctima',
    type: 'text',
  },
  rango_edad_victima: {
    key: 'rango_edad_victima',
    label: 'Rango Edad',
    type: 'select',
  },
  departamento: { key: 'departamento', label: 'Departamento', type: 'select' },
  municipio: { key: 'municipio', label: 'Municipio', type: 'select' },
  barrio: { key: 'barrio', label: 'Barrio', type: 'text' },
  identidad_genero: {
    key: 'identidad_genero',
    label: 'Identidad de Género',
    type: 'select',
  },
  identidad_social: {
    key: 'identidad_social',
    label: 'Identidad Social',
    type: 'select',
  },
  identidad_etnica: {
    key: 'identidad_etnica',
    label: 'Identidad Étnica',
    type: 'select',
  },
  actividad_economica_victima: {
    key: 'actividad_economica_victima',
    label: 'Actividad Económica',
    type: 'select',
  },
  nombre_sujeto_feminicida: {
    key: 'nombre_sujeto_feminicida',
    label: 'Nombre Feminicida',
    type: 'text',
  },
  sujeto_feminicida: {
    key: 'sujeto_feminicida',
    label: 'Sujeto Feminicida',
    type: 'select',
  },
  parentesco_o_relacion: {
    key: 'parentesco_o_relacion',
    label: 'Parentesco',
    type: 'select',
  },
  metodo_eliminacion: {
    key: 'metodo_eliminacion',
    label: 'Método de Eliminación',
    type: 'select',
  },
  continuum_violencia_sf: {
    key: 'continuum_violencia_sf',
    label: 'Continuum',
    type: 'select',
  },
  lugar_encuentra_cadaver: {
    key: 'lugar_encuentra_cadaver',
    label: 'Lugar Encuentra Cuerpo',
    type: 'select',
  },
  link_noticia: { key: 'link_noticia', label: 'Noticia', type: 'none' },
};

// Helper function to generate SQL conditions dynamically, where the column filtering is centralized and easier to mantain
export const generateFilterConditions = (columnFilters: ColumnFiltersState) => {
  const queryParts = Object.values(tableColumns).flatMap(({ key, type }) => {
    const filterValue = columnFilters.find(
      (filter) => filter.id === key,
    )?.value;

    if (!filterValue) return [];

    let filterQuery;
    switch (type) {
      case 'select':
        filterQuery = sql`${key} = ${filterValue}`;
        break;
      case 'text':
        filterQuery = sql`${key} LIKE CONCAT('%', ${filterValue}, '%')`;
        break;
      default:
        return [];
    }

    return sql`AND ${filterQuery}`;
  });

  // Combine all query parts into a single SQL string
  const combinedQuery = queryParts.reduce(
    (acc, part) => sql`${acc} ${part}`,
    sql`WHERE 1 = 1`
  );

  console.log('Generated SQL Query Conditions:', combinedQuery.text);

  return combinedQuery;
};
