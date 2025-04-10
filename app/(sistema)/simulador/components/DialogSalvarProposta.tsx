"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSimulador } from "../context/SimuladorContext";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DialogSalvarProposta() {
  const {
    isModalSalvarPropostaOpen,
    setIsModalSalvarPropostaOpen,
    handleSalvarSimulacao,
    handleAtualizarSimulacao,
  } = useSimulador();

  const handleStatusDialogSalvarProposta = () => {
    if (isModalSalvarPropostaOpen) {
      setIsModalSalvarPropostaOpen(false);
    } else {
      setIsModalSalvarPropostaOpen(true);
    }
  };

  return (
    <Dialog
      open={isModalSalvarPropostaOpen}
      onOpenChange={handleStatusDialogSalvarProposta}
    >
      <DialogTrigger className="w-32 h-8 text-xs text-white bg-rzk_darker hover:bg-rzk_darker/90 hover:transition-all rounded-md flex items-center justify-center font-bold gap-2 outline-none">
        <Save className="size-4" />
        <strong>Salvar</strong>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <p className="text-2xl text-rzk_darker">Editar Simulação</p>
        </DialogTitle>
        <div className="flex flex-col gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-1 text-rzk_ligth">
            <span>Você esta editando uma Simulação já existente.</span>
            <span>Deseja atualizar os dados ou criar uma nova simulação?</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              className="bg-rzk_dark hover:bg-rzk_dark/90 font-bold"
              onClick={handleAtualizarSimulacao}
            >
              Atualizar
            </Button>
            <Button
              className="bg-rzk_green hover:bg-rzk_green/90 font-bold"
              onClick={handleSalvarSimulacao}
            >
              Nova Simulação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
