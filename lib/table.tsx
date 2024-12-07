import { ColumnFiltersState } from '@tanstack/react-table';
import sql from 'sql-template-strings';

// Setting up the structure of the table columns which is ideal for lookups by key, which can be done efficiently and also we are improving maintainability by centralizing the column-related metadata here
export type TableColumn = {
  key: string;
  label: string;
  type: 'range' | 'select' | 'text' | 'none';
};

export type TableColumns = Record<string, TableColumn>;

//tableColumns is an object that contains the columns for the table.
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
  departamento: { key: 'departamento', label: 'Departamento', type: 'text' },
  municipio: { key: 'municipio', label: 'Municipio', type: 'text' },
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
    type: 'text',
  },
  lugar_encuentra_cadaver: {
    key: 'lugar_encuentra_cadaver',
    label: 'Lugar Encuentra Cuerpo',
    type: 'select',
  },
  link_noticia: { key: 'link_noticia', label: 'Noticia', type: 'none' },
};

// Helper function to generate SQL statements for the select filters
export const generateSelectFilters = () => {
  // This will store the column names that are of type 'select'
  let columnNames = sql``;

  // This will store the SQL statements for the select filters
  const columnswithOptions = Object.values(tableColumns).filter(({ type }) => type === 'select');
  const sqlStatements = Object.values(columnswithOptions).flatMap(({ key }, index) => {
    if (index !== 0) columnNames = columnNames.append(',');
    columnNames = columnNames.append(`'${key}','cod_${key}'`);

    let idColumn = '';
    switch (key) {
      case 'rango_edad_victima':
        idColumn = 'rango_edad'
        break;
      case 'lugar_encuentra_cadaver':
        idColumn = 'lugar'
        break;
      default:
        idColumn = key;
        break;
    }

    let selectFilterQuery = sql``;
    selectFilterQuery = selectFilterQuery.append(`WHEN COLUMN_NAME = 'cod_${key}' THEN (SELECT GROUP_CONCAT(cod_${idColumn}) FROM ${idColumn})`);
    selectFilterQuery = selectFilterQuery.append(`WHEN COLUMN_NAME = '${key}' THEN (SELECT GROUP_CONCAT(${idColumn}) FROM ${idColumn})`);
    return selectFilterQuery;
  });

  // Combine all query parts using append
  const columnOptionsQuery = sqlStatements.length > 0
    ? sqlStatements.reduce((acc, part, index) => {
      if (index === 0) {
        return acc.append(sql`CASE `).append(part);
      }
      if (index === sqlStatements.length - 1) {
        return acc.append(part).append(sql` END AS 'options'`);
      }
      return acc.append(part);
    }, sql``)
    : sql``;

  return {
    columnNames,
    columnOptionsQuery,
  };
};

// Helper function to generate SQL conditions dynamically, where the column filtering is centralized and easier to mantain
export const generateFilterConditions = (columnFilters: ColumnFiltersState) => {
  const sqlStatements = Object.values(tableColumns).flatMap(({ key, type }) => {
    const filterValue = columnFilters.find(
      (filter) => filter.id === key,
    )?.value;

    if (!filterValue) return [];

    let filterQuery = sql``;
    switch (type) {
      case 'select':
        filterQuery = filterQuery.append(`${key} = `).append(sql`${filterValue}`);
        break;
      case 'text':
        filterQuery = filterQuery
          .append(`${key} LIKE CONCAT('%', `)
          .append(sql`${filterValue}`)
          .append(`, '%')`);
        break;
      default:
        return [];
    }

    return filterQuery;
  });

  // Combine all query parts using append
  const query = sqlStatements.length > 0
    ? sqlStatements.reduce((acc, part) => acc.append(' AND ').append(part), sql``)
    : sql``;

  return query;
};
