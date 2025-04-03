import { fluxos } from "./fluxos";

export default function fnCalcularGraficoClasseSocial(pontos: number[]) {
  const dados = fluxos.filter((fluxo) => pontos.includes(fluxo.id_ponto));
  const classe_a =
    (dados.reduce((acc, fluxo) => acc + fluxo.classe_a, 0) / dados.length) *
    100;
  const classe_b =
    (dados.reduce((acc, fluxo) => acc + fluxo.classe_b, 0) / dados.length) *
    100;
  const classe_c =
    (dados.reduce((acc, fluxo) => acc + fluxo.classe_c, 0) / dados.length) *
    100;
  const classe_d =
    (dados.reduce((acc, fluxo) => acc + fluxo.classe_d, 0) / dados.length) *
    100;
  const classe_e =
    (dados.reduce((acc, fluxo) => acc + fluxo.classe_e, 0) / dados.length) *
    100;

  return [
    { name: "A", value: classe_a },
    { name: "B", value: classe_b },
    { name: "C", value: classe_c },
    { name: "D", value: classe_d },
    { name: "E", value: classe_e },
  ];
}
