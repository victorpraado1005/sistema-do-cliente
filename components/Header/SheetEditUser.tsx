import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@/app/(sistema)/context/UserContext";

interface SheetComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SheetComponent: React.FC<SheetComponentProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
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
            <Input className="w-72" value={user?.nome} disabled />
          </div>
          <div className="space-y-2">
            <p>E-mail:</p>
            <Input className="w-72" value={user?.email} disabled />
          </div>
        </div>
        <div className="mt-8">
          <Button className="bg-rzk_darker w-72 font-extrabold" disabled>
            Editar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
