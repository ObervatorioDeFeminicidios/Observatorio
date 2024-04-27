import { z } from 'zod';
import { create } from 'zustand';

type FormSchemas = {
  firstSchema: z.Schema | null;
  secondSchema: z.Schema | null;
  thirdSchema: z.Schema | null;
  fourthSchema: z.Schema | null;
};

interface StepState {
  formSchemas: FormSchemas;
  updateFormSchemas: (formSchemas: FormSchemas) => void;
  previousStep: number;
  currentStep: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const TOTAL_STEPS = 4;

export const useStepState = create<StepState>()((set) => ({
  formSchemas: {
    firstSchema: null,
    secondSchema: null,
    thirdSchema: null,
    fourthSchema: null,
  },
  updateFormSchemas: (formSchemas) => set(() => ({ formSchemas })),
  previousStep: 0,
  currentStep: 0,
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
