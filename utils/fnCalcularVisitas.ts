import { IProduto } from "@/app/types/IProduto";

export function fnCalcularVisitas(products: IProduto[], dias: number) {
  return products?.reduce((acc, item) => acc + item.qtd_fluxo_diario * dias, 0);
}
