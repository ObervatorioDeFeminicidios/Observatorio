import { Button } from '@/components/ui/button';
import { useStepState } from '@/store/registration-form';

type NavigationProps = {
  totalSteps: number;
};

export const Navigation = ({ totalSteps }: NavigationProps) => {
  const { currentStep, handlePreviousStep, handleNextStep } = useStepState();

  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="ghost"
        onClick={handlePreviousStep}
        disabled={currentStep === 0}
      >
        Atrás
      </Button>

      {currentStep !== totalSteps - 1 ? (
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          type="button"
          onClick={handleNextStep}
        >
          Siguiente
        </Button>
      ) : (
        <Button className="bg-indigo-600 hover:bg-indigo-700" type="submit">
          Registrar
        </Button>
      )}
    </div>
  );
};
