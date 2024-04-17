import { Button } from '@/components/ui/button';

type NavigationProps = {
  currentStep: number;
  totalSteps: number;
  handlePrevious: () => void;
  handleNext: () => void;
};

export const Navigation = ({
  currentStep,
  totalSteps,
  handlePrevious,
  handleNext,
}: NavigationProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="ghost"
        onClick={handlePrevious}
        disabled={currentStep === 0}
      >
        Atrás
      </Button>

      {currentStep !== totalSteps - 1 ? (
        <Button
          className="bg-indigo-600 hover:bg-indigo-700"
          type="button"
          onClick={handleNext}
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
