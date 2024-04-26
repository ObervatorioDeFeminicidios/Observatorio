import { titleCase } from '@/lib/utils';
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
import { useFormContext } from 'react-hook-form';

type ConfirmationProps = {
  data: any;
};

export const Confirmation = ({ data }: ConfirmationProps) => {
  const { handleSubmit } = useFormContext();

  const handleDataSubmit = () => {
    handleSubmit(formData => {
      console.log(formData)
    })()
  }

  return (
    <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-[500px] rounded-none">
      <DrawerHeader>
        <DrawerTitle className='text-indigo-600'>Registro de Feminicidio</DrawerTitle>
        <DrawerDescription>Revisa la información registrada:</DrawerDescription>
      </DrawerHeader>
      <ScrollArea className="m-4">
        {Object.keys(data).map(
          (label, index) =>
            !label.startsWith('cod_') && (
              <div key={`${label}-${index}`}>
                <div className="text-sm flex items-center justify-between p-4">
                  <span className="font-light text-muted-foreground">
                    {titleCase(label)}
                  </span>
                  <span className="font-extralight">{data[label]}</span>
                </div>
                <Separator />
              </div>
            ),
        )}
      </ScrollArea>
      <DrawerFooter>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleDataSubmit}>
          Confirmar
        </Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
