import { IProduto } from "@/app/types/IProduto";

export function fnCalcularVisitasPorPonto(product: IProduto, dias: number) {
  return product.qtd_fluxo_diario * dias
}
