import { IProduto } from "@/app/types/IProduto";

export function fnCalcularImpactos(
  selectedProducts: IProduto[],
  dias: number,
  saturacao: number
) {
  return selectedProducts
    ?.map((product) => {
      const impactos_diarios = product.qtd_impactos_diarios;

      return impactos_diarios * dias * saturacao;
    })
    .reduce((acc, item) => acc + item, 0);
}
