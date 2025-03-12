import { IProduto } from "@/app/types/IProduto";
import { fnCalcularVisitasPorPonto } from "./CalcularVisitas/fnCalcularVisitasPorPonto";
import { fnCalculcarInsercoesPorPonto } from "./CalculcarInsercoes/fnCalcularInsercoesPorPonto";
import { fnCalcularImpactosPorPonto } from "./CalcularImpactos/fnCalcularImpactosPorPonto";
import { fnCalcularPrecoTabelaPorPonto } from "./CalcularPrecoTabela/fnCalcularPrecoTabelaPorPonto";

// [
//   {
//     id_ponto: 8,
//     nome: 'Ana rosa',
//     usuarios_unicos,
//     alcance,
//     freq.media,
//     trp,
//   }
// ]

export function fnDadosTabelaPaga(products: IProduto[], dias: number, desconto: number, saturacao: number) {
  let dados_tabela = []

  return products?.map(produto => {
    const visitas = fnCalcularVisitasPorPonto(produto, dias);
    const insercoes = fnCalculcarInsercoesPorPonto(produto, dias, saturacao)
    const impactos = fnCalcularImpactosPorPonto(produto, dias, saturacao)
    const preco_tabela = fnCalcularPrecoTabelaPorPonto(produto, dias, saturacao)
    const investimento = preco_tabela * (1 - desconto / 100);

    return {
      visitas,
      insercoes,
      impactos,
      preco_tabela,
      investimento
    }
  })
}