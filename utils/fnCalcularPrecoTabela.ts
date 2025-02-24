import { IProduto } from "@/app/types/IProduto";
import { fnCalcularSegundosFuncionamento } from "./fnCalcularSegundosFuncionamento";

export function fnCalcularPrecoTabela(
  products: IProduto[],
  dias: number,
  saturacao: number
) {
  return products?.reduce((acc, item) => {
    const segundos_funcionamento = fnCalcularSegundosFuncionamento(
      item.horario_funcionamento_inicio,
      item.horario_funcionamento_termino
    );

    return (
      acc +
      segundos_funcionamento *
        (item.id_concessao_ponto === 12 ? 0.187074829931972 : 0.075) *
        (1 / item.qtd_segundos_loop) *
        item.qtd_faces *
        dias *
        saturacao *
        item.qtd_segundos_insercao
    );
  }, 0);
}
