import { z } from 'zod';

export function getSchema(steps: Step[]) {
  return z.object(
    steps.reduce((schema: { [key: string]: any }, step) => {
      step.fields.forEach((field) => {
        switch (field.type) {
          case 'text':
          case 'select':
            schema[field.id] = z.string();
            break;
          case 'int':
            schema[field.id] = z.string();
            break;
          case 'date':
            schema[field.id] = z.string();
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
  return steps.reduce(
    (values: { [key: string]: string }, step) => {
      step.fields.forEach((field) => {
        values[field.id] = '';
      });
      return values;
    },
    {},
  );
}
