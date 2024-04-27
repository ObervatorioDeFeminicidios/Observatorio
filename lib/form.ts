import { z } from 'zod';

export function getSchemaByStep(fields: TransformedObject[]) {
  return z.object(
    fields.reduce((schema: { [key: string]: any }, field) => {
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
                .string()
                .optional()
                .transform((v) => Number(v) || 0)
            : z
                .string({
                  required_error: `${field.label} no puede estar vacío`,
                  invalid_type_error: `Se esperaba un número`,
                })
                .transform((v) => Number(v) || 0);
          break;
        case 'date':
          schema[field.id] = field.nullable
            ? z
                .date()
                .optional()
                .transform((d) => d?.toISOString().split('T')[0] || null)
            : z
                .date({
                  required_error: `${field.label} no puede estar vacío`,
                  invalid_type_error: `Se esperaba una fecha`,
                })
                .transform((d) => d?.toISOString().split('T')[0] || null);
          break;
        default:
          break;
      }
      return schema;
    }, {}),
  );
}

export function getSchema(steps: Step[]) {
  return z.object(
    steps.reduce((schema: { [key: string]: any }, step) => {
      step.fields.forEach((field) => {
        switch (field.type) {
          case 'text':
            schema[field.id] = field.nullable
              ? z.string().optional()
              : z.string().trim().min(1);
            break;
          case 'select':
            schema[`cod_${field.id}`] = field.nullable
              ? z.number().optional()
              : z.number();
            schema[field.id] = field.nullable
              ? z.string().optional()
              : z.string();
            break;
          case 'int':
            schema[field.id] = field.nullable
              ? z.string().optional()
              : z.string();
            break;
          case 'date':
            schema[field.id] = field.nullable ? z.date().optional() : z.date();
            break;
          default:
            break;
        }
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
