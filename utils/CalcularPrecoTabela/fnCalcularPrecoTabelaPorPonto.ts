import { IProduto } from "@/app/types/IProduto";
import { fnCalcularSegundosFuncionamento } from "../fnCalcularSegundosFuncionamento";
import { tabelaPreco } from "@/app/lib/tabelaPreco";

export function fnCalcularPrecoTabelaPorPonto(
  product: IProduto,
  dias: number,
  saturacao: number,
  anoTabelaPreco: string
) {
  const segundos_funcionamento = fnCalcularSegundosFuncionamento(
    product.horario_funcionamento_inicio,
    product.horario_funcionamento_termino
  );

  const tabela_preco = tabelaPreco.filter(
    (item) => item.ano === Number(anoTabelaPreco)
  )[0];

  return (
    segundos_funcionamento *
    (product.id_concessao_ponto === 12
      ? tabela_preco.preco_catarina
      : product.id_concessao_ponto === 47
        ? tabela_preco.preco_brasilia
        : tabela_preco.preco_terminal) *
    (1 / product.qtd_segundos_loop) *
    product.qtd_faces *
    dias *
    saturacao *
    product.qtd_segundos_insercao
  );
}
