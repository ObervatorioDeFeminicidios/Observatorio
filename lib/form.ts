import { z } from 'zod';
import { InsertDataResult } from './definitions';
import { BaseFieldType, DataBaseField, DBResponse, OptionField, Step, TransformedObject } from '@/types';

export const FIRST_TABLE = 'feminicidios_tentativas';
export const SECOND_TABLE = 'feminicidios_violencia_asociada';
export const VIOLENCIA_ASOCIADA = 'violencia_asociada';
export const URL_CORTO_NOTICIA = 'url_corto_noticia';

interface ISchema {
  [key: string]: any;
}

export const INITAL_RESULT: InsertDataResult = {
  success: false,
  errors: '',
};

// Setting the schema of each field based on the type
const setFieldSchema = (schema: ISchema, field: TransformedObject) => {
  switch (field.type) {
    case 'text':
      schema[field.id] = field.nullable
        ? z.string().optional()
        : z
            .string()
            .trim()
            .min(1, { message: `${field.label} no puede estar vacío` });
      break;
    case 'select':
      schema[field.id] = field.nullable
        ? z.string().optional()
        : z.string().min(1, {
            message: `Debe elegir una opción para ${field.label}`,
          });
      break;
    case 'select-multiple':
      const arraySchema = z.array(
        z.object({ value: z.string(), label: z.string() }),
      );
      schema[field.id] = field.nullable
        ? z
            .union([
              arraySchema,
              z
                .string()
                .refine(() => false, {
                  message: `Debe elegir una opción para ${field.label}`,
                }),
            ])
            .optional()
        : z
            .union([
              arraySchema,
              z
                .string()
                .refine(() => false, {
                  message: `Debe elegir una opción para ${field.label}`,
                }),
            ])
            .refine((value) => Array.isArray(value), {
              message: `Debe elegir una opción para ${field.label}`,
            });
      break;
    case 'int':
      schema[field.id] = field.nullable
        ? z
            .number()
            .optional()
            .transform((v) => Number(v) || 0)
        : z
            .number({
              required_error: `${field.label} no puede estar vacío`,
              invalid_type_error: `Se esperaba un número`,
            })
            .transform((v) => Number(v) || 0);
      break;
    case 'date':
      schema[field.id] = field.nullable
        ? z.string().optional()
        : z.string({
            required_error: `${field.label} no puede estar vacío`,
            invalid_type_error: `Se esperaba una fecha`,
          });
      break;
    default:
      break;
  }
  return schema;
};

// Setting the schema of each step of the multistep form
export function getSchemaByStep(fields: TransformedObject[]) {
  return z.object(
    fields.reduce((schema: ISchema, field) => {
      return setFieldSchema(schema, field);
    }, {}),
  );
}

// Getting the general form schema
export function getSchema(steps: Step[]) {
  return z.object(
    steps.reduce((schema: ISchema, step) => {
      step.fields.forEach((field) => {
        return setFieldSchema(schema, field);
      });
      return schema;
    }, {}),
  );
}

// Getting the default values of the form fields
export function getDefaultValues(steps: Step[]) {
  return steps.reduce((values: { [key: string]: string }, step) => {
    step.fields.forEach((field) => {
      const predifenedIds = [
        'alias_sujeto_feminicida',
        'nombre_sujeto_feminicida',
        'edad_sujeto_feminicida',
      ];
      if (predifenedIds.includes(field.id)) {
        values[field.id] = 'Sin información';
      } else {
        values[field.id] = '';
      }
    });
    return values;
  }, {});
}

// Mutating the DB data in order to set the correct field type
export function mutateRawData(rawData: DataBaseField[]): DataBaseField[] {
  return rawData.map((field) => {
    const type: BaseFieldType =
      field.id === 'cod_violencia_asociada'
        ? 'select-multiple'
        : !!field?.options
          ? 'select'
          : field.type;

    return {
      ...field,
      type,
    };
  });
}

// Transforming the mutated data the get the list of options
export function transformObject(fields: DataBaseField[]): TransformedObject[] {
  const transfomedObjects: TransformedObject[] = [];

  fields.forEach((item) => {
    // Checking if the field id has the list of values -> cod_
    if (item.id.startsWith('cod_')) {
      const values = item?.options?.split(',');
      let options: OptionField[] = [];

      if (values) {
        // Matching the value with its corresponding label
        options = values.map((value, index) => ({
          value: parseInt(value.trim()),
          label:
            fields
              .find((obj) => obj.id === item.id.substring(4))
              ?.options?.split(',')
              [index]?.trim() || '',
        }));
      }

      // Coupling the field data with the defined schema
      const transformedObject: TransformedObject = {
        id: item.id.replace('cod_', ''),
        type: item.type as BaseFieldType,
        nullable: item.nullable === 'YES' ? true : false,
        updatable: item.updatable,
        label: item.label,
        options,
      };

      transfomedObjects.push(transformedObject);
    } else {
      // Checking if the field has no a list of options
      if (item.type !== 'select' && item.type !== 'select-multiple') {
        transfomedObjects.push({
          ...item,
          nullable: item.nullable === 'YES' ? true : false,
          options: [],
        });
      }
    }
  });

  return transfomedObjects;
}

// Custom comparison object to sort by type
export function compareByType(a: TransformedObject, b: TransformedObject) {
  // Defining the priority of order by type
  const typePriority: { [key: string]: number } = {
    date: 0,
    int: 1,
    text: 2,
    select: 3,
    'select-multiple': 4,
  };

  const priorityA = typePriority[a.type];
  const priorityB = typePriority[b.type];

  // Compare based on priority
  if (priorityA < priorityB) {
    return -1;
  } else if (priorityA > priorityB) {
    return 1;
  } else {
    // Equal priorities, maintain the original order
    return 0;
  }
}

// Getting the latest id of a list to identify the next id to be inserted
export function getLatestId(data: DBResponse): number {
  let latestId = null;

  for (let key in data) {
    if (key.startsWith('cod_')) {
      latestId = data[key] as number;
      break;
    }
  }

  return latestId || 0;
}
