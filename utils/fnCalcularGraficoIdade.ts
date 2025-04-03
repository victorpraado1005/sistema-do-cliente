import { fluxos } from "./fluxos";

export default function fnCalcularGraficoIdade(pontos: number[]) {
  const dados = fluxos.filter((fluxo) => pontos.includes(fluxo.id_ponto));
  const _11a17 =
    (dados.reduce((acc, fluxo) => acc + fluxo["11_a_17"], 0) / dados.length) *
    100;
  const _18a30 =
    (dados.reduce((acc, fluxo) => acc + fluxo["18_a_30"], 0) / dados.length) *
    100;
  const _31a40 =
    (dados.reduce((acc, fluxo) => acc + fluxo["31_a_40"], 0) / dados.length) *
    100;
  const _41a60 =
    (dados.reduce((acc, fluxo) => acc + fluxo["41_a_60"], 0) / dados.length) *
    100;
  const _60_mais =
    (dados.reduce((acc, fluxo) => acc + fluxo["60_mais"], 0) / dados.length) *
    100;

  return [
    { name: "11 - 17", value: _11a17 },
    { name: "18 - 30", value: _18a30 },
    { name: "31 - 40", value: _31a40 },
    { name: "41 - 60", value: _41a60 },
    { name: "60 +", value: _60_mais },
  ];
}
