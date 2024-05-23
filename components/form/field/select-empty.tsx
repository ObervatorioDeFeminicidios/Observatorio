import { putListOption } from '@/actions/_form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { InsertDataResult } from '@/lib/definitions';
import { INITAL_RESULT } from '@/lib/form';
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { useCommandState } from 'cmdk';
import React, { useTransition } from 'react';

type SelectEmptyProps = {
  fieldId: string;
  isUpdatable: boolean;
  closePopover: () => void;
  onSelectAdd: (option: Option) => void;
};

export const SelectEmpty = ({
  fieldId,
  isUpdatable,
  closePopover,
  onSelectAdd,
}: SelectEmptyProps) => {
  const [showResult, setShowResult] = React.useState(false);
  const [insertDataResult, setInsertDataResult] =
    React.useState<InsertDataResult>(INITAL_RESULT);
  const [pending, startTransition] = useTransition();
  const search = useCommandState((state) => state.search);

  const handlePutListOption = async () => {
    const data: OptionIntoList = {
      id: fieldId,
      value: search,
    };
    startTransition(async () => {
      const response: InsertDataResult = await putListOption(data);
      console.log('response ::: ', response);
      setInsertDataResult(response);
      setShowResult(true);
      onSelectAdd(response.result as Option);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="font-light text-muted-foreground">
        Ninguna opción se encontró
      </p>
      {isUpdatable && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            <span>Desea crear la opción:</span>
            <Badge variant="outline">{search}</Badge>
            <span>?</span>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary"
              onClick={closePopover}
            >
              Cancelar
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary" size="sm">
                  Crear
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {!showResult && (
                    <>
                      <DialogTitle className="text-primary">
                        ¿Está completamente seguro?
                      </DialogTitle>
                      <DialogDescription className="text-secondary-foreground">
                        Tenga en cuenta que esta acción es irreversible.
                        Asegúrese de que la ortografía es correcta antes de
                        continuar.
                      </DialogDescription>
                    </>
                  )}
                </DialogHeader>
                <section className="flex">
                  {!showResult ? (
                    <Badge
                      variant="outline"
                      className="border-primary text-lg text-primary"
                    >
                      {search}
                    </Badge>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                      {insertDataResult.success ? (
                        <>
                          <CheckBadgeIcon className="h-[100px] fill-primary" />
                          <p className="text-md text-secondary-foreground`">
                            El registro ha sido insertado exitosamente!
                          </p>
                        </>
                      ) : (
                        <>
                          <ExclamationTriangleIcon className="h-[100px] fill-destructive" />
                          <p className="text-md text-destructive">
                            Ups - Un error ocurrió al insertar el registro!
                          </p>
                          <p className="text-sm text-secondary-foreground">
                            Por favor, intente más tarde o contacte al
                            administrador.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </section>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant={!showResult ? 'ghost' : 'outline'}
                      className={
                        !showResult
                          ? 'text-secondary-foreground'
                          : 'border-primary text-primary'
                      }
                      onClick={() => {
                        setInsertDataResult(INITAL_RESULT);
                        setShowResult(false);
                      }}
                    >
                      {!showResult ? 'Cancelar' : 'Cerrar'}
                    </Button>
                  </DialogClose>
                  {!showResult && (
                    <Button
                      className="bg-primary"
                      onClick={handlePutListOption}
                    >
                      {!pending ? (
                        <span>Confirmar</span>
                      ) : (
                        <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-primary" />
                      )}
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};
