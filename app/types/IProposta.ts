import { IVeiculacao } from "../(sistema)/simulador/components/DialogCriarProposta";
import { UploadResult } from "../(sistema)/simulador/context/SimuladorContext";

export interface IProposta {
  nome: string;
  modelo: string;
  categoria: string;
  competencia_ano: number;
  competencia_mes: number;
  ano_preco_tabela: string;
  is_venda_direta: boolean;
  temperatura: string;
  fase: string;
  porcentagem_desconto: number;
  colaboradores: [
    {
      funcao: string;
      indice: number;
      id_colaborador: number | undefined;
    },
  ];
  empresas: [];
  notificacoes: [];
  arquivos: UploadResult[];
  comissoes: [];
  veiculacoes: IVeiculacao[];
}
