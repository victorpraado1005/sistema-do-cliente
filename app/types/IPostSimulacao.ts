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
