import { fluxos } from "./fluxos";

export default function fnCalcularGraficoGenero(pontos: number[]) {
  const dados = fluxos.filter((fluxo) => pontos.includes(fluxo.id_ponto));
  const masculino =
    (dados.reduce((acc, fluxo) => acc + fluxo.masc, 0) / dados.length) * 100;
  const feminino =
    (dados.reduce((acc, fluxo) => acc + fluxo.fem, 0) / dados.length) * 100;

  return [
    { name: "Masculino", value: masculino },
    { name: "Feminino", value: feminino },
  ];
}
