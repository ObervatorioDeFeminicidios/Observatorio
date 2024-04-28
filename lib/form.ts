import { z } from 'zod';

interface ISchema {
  [key: string]: any;
}

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
}

export function getSchemaByStep(fields: TransformedObject[]) {
  return z.object(
    fields.reduce((schema: ISchema, field) => {
      return setFieldSchema(schema, field);
    }, {}),
  );
}

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

export function getDefaultValues(steps: Step[]) {
  return steps.reduce((values: { [key: string]: string }, step) => {
    step.fields.forEach((field) => {
      values[field.id] = '';
    });
    return values;
  }, {});
}
