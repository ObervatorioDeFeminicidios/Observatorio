import { z } from 'zod';
import { create } from 'zustand';

type FormSchemas = {
  firstSchema: z.Schema | null;
  secondSchema: z.Schema | null;
  thirdSchema: z.Schema | null;
  fourthSchema: z.Schema | null;
};

type FormData = {
  [key: string]: string | number;
};

interface FormState {
  formSchemas: FormSchemas;
  updateFormSchemas: (formSchemas: FormSchemas) => void;
  formData: FormData;
  updateFormData: (newData: FormData) => void;
  previousStep: number;
  currentStep: number;
  resetForm: () => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const TOTAL_STEPS = 4;

export const useFormStore = create<FormState>()((set) => ({
  formSchemas: {
    firstSchema: null,
    secondSchema: null,
    thirdSchema: null,
    fourthSchema: null,
  },
  updateFormSchemas: (formSchemas) => set(() => ({ formSchemas })),
  formData: {},
  updateFormData: (newData) =>
    set((state) => ({
      formData: { ...state.formData, ...newData },
    })),
  previousStep: 0,
  currentStep: 0,
  resetForm: () =>
    set({
      previousStep: 0,
      currentStep: 0,
      formData: {},
    }),
  handlePreviousStep: () =>
    set((state) => {
      if (state.currentStep > 0) {
        return {
          ...state,
          previousStep: state.currentStep,
          currentStep: state.currentStep - 1,
        };
      } else {
        return state;
      }
    }),
  handleNextStep: () =>
    set((state) => {
      if (state.currentStep < TOTAL_STEPS) {
        return {
          ...state,
          previousStep: state.currentStep,
          currentStep: state.currentStep + 1,
        };
      } else {
        return state;
      }
    }),
}));

// Selector function to detect whether is the last step or no
export const useIsLastStep = () => {
  const { currentStep } = useFormStore((state) => ({
    currentStep: state.currentStep,
  }));

  return currentStep === TOTAL_STEPS - 1;
};
