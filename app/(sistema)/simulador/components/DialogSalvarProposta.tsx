import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSimulador } from "../context/SimuladorContext";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";
import { IVeiculacao } from "./DialogCriarProposta";
import { fetchSimulacao, postSimulacao } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

interface FormValues {
  nome: string;
}

export interface IPostSimulacao {
  id_colaborador: number;
  nome: string;
  desconto: number;
  ano_preco_tabela: number;
  veiculacoes: {
    qtd_segundos_veiculacao: number;
    saturacao: number;
    qtd_segundos_insercao: number;
    is_bonificacao: boolean;
    produtos: number[];
  }[];
}

export default function DialogSalvarProposta() {
  const queryClient = useQueryClient();
  const {
    valores,
    selectedTabelaPreco,
    selectedProducts,
    selectedProductsBonificados,
    setSelectedPontos,
    setSelectedPontosBonificados,
    isBonificadoPreenchido,
    setNameSimulacao,
    reset,
  } = useSimulador();
  const { data: user } = useUserData();
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      nome: "",
    },
  });

  const { nome } = watch();

  const [formData, setFormData] = React.useState<FormValues | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isNomePreenchido, setIsNomePreenchido] =
    React.useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setFormData(data);
    let veiculacoes: IVeiculacao[] = [];

    if (valores.dias && selectedProducts.length) {
      const veiculacao_paga = {
        qtd_segundos_veiculacao: valores.dias * 86400,
        saturacao: valores.saturacao,
        qtd_segundos_insercao: 10,
        is_bonificacao: false,
        produtos: selectedProducts.map((produto) => produto.id_produto),
      };

      veiculacoes = veiculacoes.concat(veiculacao_paga);
    }

    if (isBonificadoPreenchido && selectedProductsBonificados.length) {
      const veiculacao_bonificada = {
        qtd_segundos_veiculacao: valores.dias_bonificados * 86400,
        saturacao: valores.saturacao_bonificada,
        qtd_segundos_insercao: 10,
        is_bonificacao: true,
        produtos: selectedProductsBonificados.map(
          (produto) => produto.id_produto
        ),
      };

      veiculacoes = veiculacoes.concat(veiculacao_bonificada);
    }

    const simulacao: IPostSimulacao = {
      nome: data.nome,
      id_colaborador: user?.id_colaborador!,
      ano_preco_tabela: Number(selectedTabelaPreco),
      desconto: valores.desconto,
      veiculacoes,
    };

    try {
      const res = await postSimulacao(simulacao);
      if (res) {
        toast.success("Simulação criada com sucesso!");
      }
      setOpen(false);
      setNameSimulacao(data.nome);
      //reset();
      //setSelectedPontos([]);
      //setSelectedPontosBonificados([]);
      await queryClient.fetchQuery({
        queryKey: ["simulacao", user?.id_colaborador],
        queryFn: ({ queryKey }) => {
          const [, id_colaborador] = queryKey;
          return fetchSimulacao({ id_colaborador });
        },
      });
    } catch {
      toast.error("Houve um erro ao criar a Simulação!", {
        description: "Tente novamente mais tarde.",
      });
    }
  };

  return (
    <div className="w-32 h-8 text-xs text-rzk_dark">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full h-full text-white bg-rzk_darker hover:bg-rzk_darker/90 hover:transition-all rounded-md flex items-center justify-center font-bold gap-2 outline-none">
          <Save className="size-4" />
          <strong>Salvar</strong>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <p className="font-bold text-xl text-center">Salvar Simulação</p>
          </DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-2"
          >
            <div className="flex items-center gap-4 w-full">
              <label htmlFor="nome" className="font-medium">
                Nome da Simulação:
              </label>
              <Input
                id="nome"
                type="text"
                {...register("nome", {
                  required: "O campo nome da proposta é obrigatório",
                })}
                required
                onChange={(e) => {
                  setIsNomePreenchido(e.target.value.trim() !== "");
                }}
                className="input w-[280px]"
              />
            </div>

            <Button
              type="submit"
              className="w-[180px] m-auto bg-rzk_green hover:bg-rzk_green/85"
              disabled={!isNomePreenchido}
            >
              Salvar Simulação
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
