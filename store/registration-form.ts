import { create } from 'zustand';

interface StepState {
  previousStep: number;
  currentStep: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const TOTAL_STEPS = 4;

export const useStepState = create<StepState>()((set) => ({
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
