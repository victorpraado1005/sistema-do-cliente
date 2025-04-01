import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSimulador } from "../context/SimuladorContext";
import { useUserData } from "@/hooks/useUserData";

interface FormValues {
  nome: string;
  modelo: string;
  status: string;
  categoria: string;
  mes_competencia: number;
  ano_competencia: number;
}

const meses = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

export default function DialogCriarProposta() {
  const { resultados, valores, selectedTabelaPreco, selectedProducts, selectedProductsBonificados } = useSimulador();
  const { data: user } = useUserData();
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      nome: "",
      modelo: "Por inserção",
      status: "Frio",
      categoria: "Padrão",
      mes_competencia: new Date().getMonth() + 1,
      ano_competencia: new Date().getFullYear(),
    },
  });

  // Observa o valor da categoria
  const { categoria, modelo, status, mes_competencia, ano_competencia } =
    watch();

  const [formData, setFormData] = React.useState<FormValues | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    const proposta = {
      nome: data.nome,
      modelo: data.modelo,
      categoria: data.categoria,
      ano_competencia: data.ano_competencia,
      mes_competencia: data.mes_competencia,
      ano_preco_tabela: selectedTabelaPreco,
      temperatura: data.status,
      fase: 'Cadastrada',
      porcentagem_desconto: valores.desconto,
      colaboradores: [
        {
          funcao: 'Executivo de vendas',
          indice: 0,
          id_colaborador: user?.id_colaborador
        }
      ],
      empresas: null,
      notificacoes: null,
      arquivos: null,
      comissoes: null,
      veiculacoes: []
    }
    console.log(proposta);
  };

  return (
    <div className="w-32 h-8 text-xs text-rzk_dark">
      <Dialog>
        <DialogTrigger className="w-full h-full text-white bg-rzk_green hover:bg-rzk_green/80 rounded-md flex items-center justify-center font-bold gap-2 outline-none">
          <CirclePlus className="size-4" />
          <strong>Criar Proposta</strong>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <p className="font-bold text-xl">Cadastrar Proposta</p>
          </DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 w-full">
              <label htmlFor="nome" className="font-medium">Proposta:</label>
              <Input
                id="nome"
                type="text"
                {...register("nome")}
                className="input w-full"
              />
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <label htmlFor="modelo" className="font-medium">Modelo:</label>
                <Select
                  value={modelo}
                  onValueChange={(value: string) => setValue("modelo", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Selecionar Modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Por inserção">Por inserção</SelectItem>
                    <SelectItem value="Por impacto">Por impacto</SelectItem>
                    <SelectItem value="Programática">Programática</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="categoria" className="font-medium">Categoria:</label>
                <Select
                  value={categoria}
                  onValueChange={(value: string) => setValue("categoria", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Selecionar Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Padrão">Padrão</SelectItem>
                    <SelectItem value="Pacote">Pacote</SelectItem>
                    <SelectItem value="Permuta">Permuta</SelectItem>
                    <SelectItem value="Corteisa">Cortesia</SelectItem>
                    <SelectItem value="Programática">Programática</SelectItem>
                    <SelectItem value="Programática por leilão">
                      Programática por leilão
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4 items-end justify-between">
              <div className="flex items-center gap-4">
                <label htmlFor="status" className="font-medium">Status:</label>
                <Select
                  value={status}
                  onValueChange={(value: string) => setValue("status", value)}
                >
                  <SelectTrigger className="w-[90px]">
                    <SelectValue placeholder="Selecionar o Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frio">Frio</SelectItem>
                    <SelectItem value="Morno">Morno</SelectItem>
                    <SelectItem value="Quente">Quente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-medium">Competência:</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <label htmlFor="mes" className="font-medium">Mês:</label>
                    <Select
                      value={mes_competencia.toString()}
                      onValueChange={(value: string) =>
                        setValue("mes_competencia", Number(value))
                      }
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Selecione o mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {meses.map((mes) => (
                          <SelectItem key={mes.value} value={mes.value.toString()}>
                            {mes.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor="mes" className="font-medium">Ano:</label>
                    <Select
                      value={ano_competencia.toString()}
                      onValueChange={(value: string) =>
                        setValue("ano_competencia", Number(value))
                      }
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>


            <Button type="submit" className="w-[180px] m-auto bg-rzk_green hover:bg-rzk_green/85 mt-2">
              Criar Proposta
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
