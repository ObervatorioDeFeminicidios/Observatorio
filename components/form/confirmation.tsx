import { API_ROUTES } from '@/app/api';
import { InsertDataResult } from '@/lib/definitions';
import {
  INITAL_RESULT,
  URL_CORTO_NOTICIA,
  VIOLENCIA_ASOCIADA,
} from '@/lib/form';
import { titleCase } from '@/lib/utils';
import { useFormStore } from '@/store/registration-form';
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { useParams, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useFormContext } from 'react-hook-form';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { LOCAL_STORAGE_KEY } from './form';

type ConfirmationProps = {
  data: any;
  setOpen: (value: boolean) => void;
};

export const Confirmation = ({ data, setOpen }: ConfirmationProps) => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isEditMode = !!params?.id;

  const [showResult, setShowResult] = React.useState(false);
  const [insertDataResult, setInsertDataResult] =
    React.useState<InsertDataResult>(INITAL_RESULT);
  const { resetForm } = useFormStore();
  const { getValues, reset } = useFormContext();
  const [pending, startTransition] = useTransition();

  const handleDataSubmit = async () => {
    const formData = getValues();
    console.log(formData);
    startTransition(async () => {
      const response = await fetch(API_ROUTES.register, {
        method: !isEditMode ? 'POST' : 'PUT',
        body: JSON.stringify(formData),
      });
      const result: InsertDataResult = await response.json();
      console.log('data ::: ', result);
      setInsertDataResult(result);
      setShowResult(true);
    });
  };

  return (
    <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-[500px] rounded-none">
      <DrawerHeader>
        <DrawerTitle className="text-primary">
          {!isEditMode
            ? 'Registro de Feminicidio'
            : 'Actualización de Feminicidio'}
        </DrawerTitle>
        {!showResult && (
          <DrawerDescription className="text-secondary-foreground">
            Revisa la información registrada:
          </DrawerDescription>
        )}
      </DrawerHeader>
      {!showResult ? (
        <>
          <ScrollArea className="m-4">
            {Object.keys(data).map(
              (label, index) =>
                typeof data[label] !== 'object' &&
                !label.startsWith('cod_') &&
                label !== VIOLENCIA_ASOCIADA &&
                label !== URL_CORTO_NOTICIA && (
                  <div
                    key={`${label}-${index}`}
                    className="flex flex-col items-start gap-2 p-4 text-sm"
                  >
                    <span className="font-medium text-muted-foreground">
                      {titleCase(label)}
                    </span>
                    <span className="font-extralight">
                      {data[label] !== '' ? data[label] : <br></br>}
                    </span>
                    <Separator />
                  </div>
                ),
            )}
          </ScrollArea>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {insertDataResult?.success ? (
            <>
              <CheckBadgeIcon className="h-[150px] fill-primary" />
              <p className="text-md text-secondary-foreground`">
                El registro ha sido {!isEditMode ? 'insertado' : 'actualizado'}{' '}
                exitosamente!
              </p>
              <Badge
                variant="outline"
                className="border-primary text-lg text-primary"
              >
                {!isEditMode ? insertDataResult.insertId : params.id}
              </Badge>
            </>
          ) : (
            <>
              <ExclamationTriangleIcon className="h-[150px] fill-destructive" />
              <p className="text-md text-destructive">
                Ups - Un error ocurrió al{' '}
                {!isEditMode ? 'insertar' : 'actualizar'} el registro!
              </p>
              <p className="text-sm text-secondary-foreground">
                Por favor, intenta más tarde o contacta al administrador
              </p>
            </>
          )}
        </div>
      )}
      <DrawerFooter>
        {!showResult && (
          <Button className="bg-primary" onClick={handleDataSubmit}>
            {!pending ? (
              <span>Confirmar</span>
            ) : (
              <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-primary" />
            )}
          </Button>
        )}
        <DrawerClose asChild>
          <Button
            variant="outline"
            className={
              !showResult
                ? 'text-secondary-foreground'
                : 'border-primary text-primary'
            }
            onClick={() => {
              if (showResult && insertDataResult && insertDataResult?.success) {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                reset();
                resetForm();
              }
              if (showResult && isEditMode && insertDataResult?.success) {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                reset();
                resetForm();
                router.push(API_ROUTES.history);
              }
              setShowResult(false);
              setInsertDataResult(INITAL_RESULT);
              setOpen(false);
            }}
          >
            {!showResult ? 'Cancelar' : 'Cerrar'}
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
