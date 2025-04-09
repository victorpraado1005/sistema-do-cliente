import { IProduto } from "@/app/types/IProduto";
import { fnCalcularVisitasPorPonto } from "./CalcularVisitas/fnCalcularVisitasPorPonto";
import { fnCalculcarInsercoesPorPonto } from "./CalculcarInsercoes/fnCalcularInsercoesPorPonto";
import { fnCalcularImpactosPorPonto } from "./CalcularImpactos/fnCalcularImpactosPorPonto";
import { fnCalcularPrecoTabelaPorPonto } from "./CalcularPrecoTabela/fnCalcularPrecoTabelaPorPonto";
import { IConcessaoPonto } from "@/app/types/IConcessaoPonto";
import { fnCalcularUsuariosUnicosPorPonto } from "./CalcularUsuariosUnicos/fnCalcularUsuariosUnicosPorPonto";
import { fnCalcularPop12Mais } from "./fnCalcularPop12Mais";
import { fnCalcularAlcance } from "./fnCalcularAlcance";
import { fnCalcularFrequenciaMedia } from "./fnCalcularFrequenciaMedia";
import { fnCalculcarTRP } from "./fnCalcularTRP";

export function fnDadosTabela(
  products: IProduto[],
  dias: number,
  desconto: number,
  saturacao: number,
  concessoes_ponto: IConcessaoPonto[],
  pontos: IPonto[],
  isBonificado?: boolean
) {
  return products?.map((produto) => {
    const id_ponto = concessoes_ponto.filter(
      (item) => item.id_concessao_ponto === produto.id_concessao_ponto
    )[0].id_ponto;
    const ponto = pontos.filter((ponto) => ponto.id_ponto === id_ponto)[0];
    const nome_ponto = ponto.nome;
    const praca = [ponto.praca];
    const faces = produto.qtd_faces;
    const visitas = fnCalcularVisitasPorPonto(produto, dias);
    const insercoes = fnCalculcarInsercoesPorPonto(produto, dias, saturacao);
    const impactos = fnCalcularImpactosPorPonto(produto, dias, saturacao);
    const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(id_ponto, dias);
    const pop_12_mais = fnCalcularPop12Mais(praca);
    const alcance = fnCalcularAlcance(usuarios_unicos, pop_12_mais);
    const freq_media = fnCalcularFrequenciaMedia(impactos, usuarios_unicos);
    const trp = fnCalculcarTRP(freq_media, alcance);
    const preco_tabela = fnCalcularPrecoTabelaPorPonto(
      produto,
      dias,
      saturacao
    );

    let investimento = 0;
    if (!isBonificado) {
      investimento = preco_tabela * (1 - desconto / 100);
    }

    return {
      id_ponto,
      nome_ponto,
      dias,
      faces,
      visitas,
      insercoes,
      impactos,
      usuarios_unicos,
      alcance,
      freq_media: Math.round(freq_media),
      trp,
      preco_tabela,
      investimento,
    };
  });
}
