type BaseField = {
  id: string;
  label: string;
  nullable: boolean;
};

type BaseFieldType = 'text' | 'int' | 'date';

type DataBaseField = BaseField & {
  type: BaseFieldType;
  options: string | null;
};

type SelectField = {
  type: 'select';
  options: {value: number, label: string}[];
}

type Field =
  | (BaseField & {type: BaseFieldType})
  | (BaseField & SelectField);
