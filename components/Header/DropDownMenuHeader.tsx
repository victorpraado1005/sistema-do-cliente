import { ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DropdownMenuComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenSheet: () => void;
}

const DropdownMenuComponent: React.FC<DropdownMenuComponentProps> = ({
  isOpen,
  onOpenChange,
  onOpenSheet,
}) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 text-rzk_darker">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onOpenSheet}>
            <User />
            <span>Minha Conta</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;
