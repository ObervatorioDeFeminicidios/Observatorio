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
import { useCommandState } from 'cmdk';

type SelectEmptyProps = {
  fieldId: string;
  closePopover: () => void;
};

export const SelectEmpty = ({ fieldId, closePopover }: SelectEmptyProps) => {
  const search = useCommandState((state) => state.search);

  const handlePutListOption = async () => {
    const data: OptionIntoList = {
      id: fieldId,
      value: search,
    };
    const response = await putListOption(data);
    console.log('response ::: ', response);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="font-light text-muted-foreground">
        Ninguna opción se encontró
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-2">
          <span>Desea crear la opción:</span>
          <Badge variant="outline">{search}</Badge>
        </div>
        <div className="flex justify-center gap-2">
          <Button variant="ghost" size="sm" onClick={closePopover}>
            Cancelar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700" size="sm">
                Crear
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-indigo-600">
                  ¿Está completamente seguro?
                </DialogTitle>
                <DialogDescription>
                  Tenga en cuenta que esta acción es irreversible. Asegúrese de
                  que la ortografía es correcta antes de continuar.
                </DialogDescription>
              </DialogHeader>
              <div className="flex">
                <Badge variant="default" className="text-lg">
                  {search}
                </Badge>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={handlePutListOption}
                >
                  Crear
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
