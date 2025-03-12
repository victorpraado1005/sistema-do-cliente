import { IProduto } from "@/app/types/IProduto";

export function fnCalcularImpactosPorPonto(
  product: IProduto,
  dias: number,
  saturacao: number
) {
  const impactos_diarios = product.qtd_impactos_diarios;

  return impactos_diarios * dias * saturacao;

}
