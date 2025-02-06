import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SheetComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SheetComponent: React.FC<SheetComponentProps> = ({ isOpen, onClose }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Minha Conta</SheetTitle>
          <SheetDescription>
            Aqui você pode editar suas informações de conta.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-4">
          <div className="space-y-2">
            <p>Nome:</p>
            <Input className="w-72" placeholder="Juliana Silva" />
          </div>
          <div className="space-y-2">
            <p>E-mail:</p>
            <Input
              className="w-72"
              placeholder="juliana@itau-comercial.com.br"
            />
          </div>
        </div>
        <div className="mt-8">
          <Button className="bg-rzk_darker w-72 font-extrabold">Salvar</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
