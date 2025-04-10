export interface IVeiculacaoPut {
  qtd_segundos_veiculacao: number;
  saturacao: number;
  qtd_segundos_insercao: number;
  is_bonificacao: boolean;
  produtos: {
    id_produto: number;
    id_veiculacao: number;
  }[];
}
[];
