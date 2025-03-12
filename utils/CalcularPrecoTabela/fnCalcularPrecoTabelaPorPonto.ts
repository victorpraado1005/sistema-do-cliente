import { IProduto } from "@/app/types/IProduto";
import { fnCalcularSegundosFuncionamento } from "../fnCalcularSegundosFuncionamento";

export function fnCalcularPrecoTabelaPorPonto(
  product: IProduto,
  dias: number,
  saturacao: number
) {
  const segundos_funcionamento = fnCalcularSegundosFuncionamento(
    product.horario_funcionamento_inicio,
    product.horario_funcionamento_termino
  );

  return segundos_funcionamento *
    (product.id_concessao_ponto === 12 ? 0.187074829931972 : 0.075) *
    (1 / product.qtd_segundos_loop) *
    product.qtd_faces *
    dias *
    saturacao *
    product.qtd_segundos_insercao
}
