import { PaginationState, ColumnFiltersState } from '@tanstack/react-table';

type BaseField = {
  id: string;
  label: string;
  length: number | null;
  nullable: 'YES' | 'NO';
  updatable: boolean;
};

interface OptionField {
  value: number;
  label: string;
  codDepartamento?: string;
  codMunicipio?: string;
}

interface OptionIntoList {
  id: string;
  value: string;
}

type BaseFieldType = 'text' | 'int' | 'date' | 'select' | 'select-multiple';

type DataBaseField = BaseField & {
  type: BaseFieldType;
  options: string | null;
};

type MunicipalityPostalCodeType = OptionField & {
  codDepartamento: string;
  codMunicipio: string;
  municipio: string;
  codPostal: string;
  limite: string;
  postal: string;
};

type SelectField = {
  type: 'select';
  options: OptionField[];
};

type Field = (BaseField & { type: BaseFieldType }) | (BaseField & SelectField);

interface DBObject {
  id: string;
  type: string;
  nullable: 'YES' | 'NO';
  label: string;
  options: string;
}

type TransformedObject = {
  id: string;
  label: string;
  nullable: boolean;
  updatable: boolean;
  type: BaseFieldType;
  options?: OptionField[];
};

type Step = {
  id: number;
  name: string;
  fields: Array<TransformedObject>;
};

type FieldProps = {
  formField: TransformedObject;
  form: UseFormReturn<FieldValues, any, undefined>;
};

type DBResponse = { [key: string]: string | number };

export type TableFilters = PaginationState & {
  columnFilters: ColumnFiltersState
};
