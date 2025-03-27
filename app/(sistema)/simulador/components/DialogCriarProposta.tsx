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
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      nome: "",
      modelo: "Por inserção",
      status: "Frio",
      categoria: "",
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
    console.log("Dados do formulário:", data);
  };

  return (
    <div className="w-32 h-8 text-xs">
      <Dialog>
        <DialogTrigger className="w-full h-full text-white bg-rzk_green hover:bg-rzk_green/80 rounded-md flex items-center justify-center font-bold gap-2 outline-none">
          <CirclePlus className="size-4" />
          <strong>Criar Proposta</strong>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <p>Formulário de Proposta</p>
          </DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="nome">Nome da Proposta:</label>
              <Input
                id="nome"
                type="text"
                {...register("nome")}
                className="input w-[300px]"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="modelo">Modelo:</label>
              <Select
                value={modelo}
                onValueChange={(value: string) => setValue("modelo", value)}
              >
                <SelectTrigger className="w-[140px] bg-gray-100">
                  <SelectValue placeholder="Selecionar Modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Por inserção">Por inserção</SelectItem>
                  <SelectItem value="Por impacto">Por impacto</SelectItem>
                  <SelectItem value="Programática">Programática</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="status">Status:</label>
              <Select
                value={status}
                onValueChange={(value: string) => setValue("status", value)}
              >
                <SelectTrigger className="w-[140px] bg-gray-100">
                  <SelectValue placeholder="Selecionar o Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frio">Frio</SelectItem>
                  <SelectItem value="Morno">Morno</SelectItem>
                  <SelectItem value="Quente">Quente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="categoria">Categoria:</label>
              <Select
                value={categoria}
                onValueChange={(value: string) => setValue("categoria", value)}
              >
                <SelectTrigger className="w-[140px] bg-gray-100">
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
            <div className="flex items-center gap-4">
              <label htmlFor="mes">Mês de Competência:</label>
              <Select
                value={mes_competencia.toString()}
                onValueChange={(value: string) =>
                  setValue("mes_competencia", Number(value))
                }
              >
                <SelectTrigger className="w-[140px] bg-gray-100">
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
            <div className="flex items-center gap-4">
              <label htmlFor="mes">Ano de Competência:</label>
              <Select
                value={ano_competencia.toString()}
                onValueChange={(value: string) =>
                  setValue("ano_competencia", Number(value))
                }
              >
                <SelectTrigger className="w-[140px] bg-gray-100">
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
            <button type="submit" className="btn">
              Salvar
            </button>
          </form>
          {formData && (
            <div className="mt-4">
              <h3>Dados Capturados:</h3>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
