import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import React, { ReactNode } from "react";

interface TooltipTesteProps {
  children: ReactNode;
  text: string;
}

// Componente que abstrai toda a configuração do Tooltip
// Esse componente recebe um children (Componente que será englobado pelo Tooltip)
// e recebe o texto para ser exibido no Tooltip
export default function TooltipMain({ children, text }: TooltipTesteProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <span>{text}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
