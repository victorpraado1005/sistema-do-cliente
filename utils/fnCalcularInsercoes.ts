import { IProduto } from "@/app/types/IProduto";
import { fnCalcularSegundosFuncionamento } from "./fnCalcularSegundosFuncionamento";

export function fnCalculcarInsercoes(
  selectedProducts: IProduto[],
  dias: number,
  saturacao: number
) {
  return selectedProducts
    ?.map((product) => {
      const horario_inicio = product.horario_funcionamento_inicio;
      const horario_termino = product.horario_funcionamento_termino;

      const segundos_funcionamento = fnCalcularSegundosFuncionamento(
        horario_inicio,
        horario_termino
      );

      const insercoes_diarias =
        segundos_funcionamento / product.qtd_segundos_loop;

      return insercoes_diarias * product.qtd_faces * dias * saturacao;
    })
    .reduce((acc, item) => acc + item, 0);
}
