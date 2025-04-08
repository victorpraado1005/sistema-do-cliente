import { fnCalcularUsuariosUnicosPorPonto } from "./CalcularUsuariosUnicos/fnCalcularUsuariosUnicosPorPonto";
import { fluxos } from "./fluxos";

export default function fnCalcularGraficoGenero(
  pontos: number[],
  dias: number,
  isBonificadoPreenchido: boolean,
  pontos_bonificados?: number[],
  dias_bonificados?: number,
  dias_totais?: number
) {
  let masculino = 0;
  let feminino = 0;

  if (isBonificadoPreenchido && pontos.length && pontos_bonificados?.length) {
    const pontos_pago_e_bonificados = pontos.filter((ponto) =>
      pontos_bonificados!.includes(ponto)
    );

    const pontos_pagos = pontos.filter(
      (ponto) => !pontos_pago_e_bonificados.includes(ponto)
    );

    const pontos_boni = pontos_bonificados!.filter(
      (ponto) => !pontos_pago_e_bonificados.includes(ponto)
    );

    const masc_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].masc
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const masc_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].masc
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const masc_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].masc
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const fem_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].fem
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const fem_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].fem
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const fem_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].fem
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    masculino = masc_pago + masc_bonificado + masc_pago_e_bonificado;
    feminino = fem_pago + fem_bonificado + fem_pago_e_bonificado;
  } else {
    masculino = pontos
      ?.map((ponto) => {
        const fluxoEncontrado = fluxos.find(
          (fluxo) => fluxo.id_ponto === ponto
        );
        if (!fluxoEncontrado) return 0;
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return usuarios_unicos * (fluxoEncontrado.masc || 0);
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    feminino = pontos
      ?.map((ponto) => {
        const fluxoEncontrado = fluxos.find(
          (fluxo) => fluxo.id_ponto === ponto
        );
        if (!fluxoEncontrado) return 0;
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return usuarios_unicos * (fluxoEncontrado.fem || 0);
      })
      .reduce((acc, ponto) => acc + ponto, 0);
  }

  const dados = [
    { name: "Masculino", value: masculino },
    { name: "Feminino", value: feminino },
  ];

  const soma_total = dados.reduce((acc, { value }) => acc + value, 0);

  const percentuais = dados.map(({ name, value }) => ({
    name,
    value: Number(((value / soma_total) * 100).toFixed(2)),
  }));

  return percentuais;
}
