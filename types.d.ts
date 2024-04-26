type BaseField = {
  id: string;
  label: string;
  length: number | null;
  nullable: 'YES' | 'NO';
};

interface Option {
  value: number;
  label: string;
}

interface OptionIntoList {
  id: string;
  value: string;
}

type BaseFieldType = 'text' | 'int' | 'date' | 'select';

type DataBaseField = BaseField & {
  type: BaseFieldType;
  options: string | null;
};

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
  type: BaseFieldType;
  options?: Option[];
};

type Step = {
  id: number;
  name: string;
  fields: Array<TransformedObject>;
};

type DBResponse = { [key: string]: string | number };
