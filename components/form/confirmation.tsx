import { postFormData } from '@/actions/_form';
import { titleCase } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
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

type ConfirmationProps = {
  data: any;
};

export const Confirmation = ({ data }: ConfirmationProps) => {
  const { formState, getValues } = useFormContext();

  const handleDataSubmit = async () => {
    const formData = getValues();
    console.log(formData);
    const response = await postFormData(formData);
    console.log('response ::: ', response);
  };

  return (
    <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-[500px] rounded-none">
      <DrawerHeader>
        <DrawerTitle className="text-primary">
          Registro de Feminicidio
        </DrawerTitle>
        <DrawerDescription className="text-secondary-foreground">
          Revisa la información registrada:
        </DrawerDescription>
      </DrawerHeader>
      <ScrollArea className="m-4">
        {Object.keys(data).map(
          (label, index) =>
            !label.startsWith('cod_') && (
              <div key={`${label}-${index}`}>
                <div className="flex items-center justify-between p-4 text-sm">
                  <span className="font-medium text-muted-foreground">
                    {titleCase(label)}
                  </span>
                  <span className="max-w-[45%] text-right font-extralight">
                    {data[label]}
                  </span>
                </div>
                <Separator />
              </div>
            ),
        )}
      </ScrollArea>
      <DrawerFooter>
        <Button className="bg-primary" onClick={handleDataSubmit}>
          Confirmar
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" className="text-secondary-foreground">
            Cancelar
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
