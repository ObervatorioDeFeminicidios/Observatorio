import { FieldProps, Step } from '@/types';
import { FieldDate } from './field/date';
import { FieldInput } from './field/input';
import { FieldSelect } from './field/select';
import { FieldSelectMultiple } from './field/select-multiple';

type FormStepProps = {
  step: Step;
  form: FieldProps['form'];
};

export const FormStep = ({ step, form }: FormStepProps) => {
  return step.fields.map((formField, index) =>
    formField.type === 'text' || formField.type === 'int' ? (
      <FieldInput
        key={formField.id}
        stepIndex={step.id}
        formField={formField}
        formIndex={index}
        form={form}
      />
    ) : formField.type === 'date' ? (
      <FieldDate
        key={formField.id}
        formField={formField}
        form={form}
      />
    ) : formField.type === 'select-multiple' ? (
      <FieldSelectMultiple
        key={formField.id}
        formField={formField}
        form={form}
      />
    ) : (
      <FieldSelect
        key={formField.id}
        formField={formField}
        form={form}
      />
    ),
  );
};
