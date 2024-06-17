type BaseField = {
  id: string;
  label: string;
  length: number | null;
  nullable: 'YES' | 'NO';
  updatable: boolean,
};

interface Option {
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

type MunicipalityPostalCodeType = Option & {
  codDepartamento: string;
  codMunicipio: string;
  municipio: string;
  codPostal: string;
  limite: string;
  postal: string;
}

type SelectField = {
  type: 'select';
  options: Option[];
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
  options?: Option[];
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
