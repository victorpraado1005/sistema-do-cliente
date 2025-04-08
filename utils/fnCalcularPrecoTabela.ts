import { IProduto } from "@/app/types/IProduto";
import { fnCalcularSegundosFuncionamento } from "./fnCalcularSegundosFuncionamento";
import { tabelaPreco } from "@/app/lib/tabelaPreco";

export function fnCalcularPrecoTabela(
  products: IProduto[],
  dias: number,
  saturacao: number,
  anoTabelaPreco: string
) {
  const preco_tabela = products?.reduce((acc, item) => {
    const segundos_funcionamento = fnCalcularSegundosFuncionamento(
      item.horario_funcionamento_inicio,
      item.horario_funcionamento_termino
    );

    const tabela_preco = tabelaPreco.filter(
      (item) => item.ano === Number(anoTabelaPreco)
    )[0];

    return (
      acc +
      segundos_funcionamento *
        (item.id_concessao_ponto === 12
          ? tabela_preco.preco_catarina
          : item.id_concessao_ponto === 47
            ? tabela_preco.preco_brasilia
            : tabela_preco.preco_terminal) *
        (1 / item.qtd_segundos_loop) *
        item.qtd_faces *
        dias *
        saturacao *
        item.qtd_segundos_insercao
    );
  }, 0);

  return preco_tabela;
}
