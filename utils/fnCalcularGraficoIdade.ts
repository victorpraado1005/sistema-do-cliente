import { fnCalcularUsuariosUnicosPorPonto } from "./CalcularUsuariosUnicos/fnCalcularUsuariosUnicosPorPonto";
import { fluxos } from "./fluxos";

export default function fnCalcularGraficoIdade(
  pontos: number[],
  dias: number,
  isBonificadoPreenchido: boolean,
  pontos_bonificados?: number[],
  dias_bonificados?: number,
  dias_totais?: number
) {
  let _11a17 = 0;
  let _18a30 = 0;
  let _31a40 = 0;
  let _41a60 = 0;
  let _60_mais = 0;

  if (isBonificadoPreenchido) {
    const pontos_pago_e_bonificados = pontos.filter((ponto) =>
      pontos_bonificados!.includes(ponto)
    );

    const pontos_pagos = pontos.filter(
      (ponto) => !pontos_pago_e_bonificados.includes(ponto)
    );

    const pontos_boni = pontos_bonificados!.filter(
      (ponto) => !pontos_pago_e_bonificados.includes(ponto)
    );

    const _11a17_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["11_a_17"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _11a17_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["11_a_17"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _11a17_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["11_a_17"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _18a30_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["18_a_30"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _18a30_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["18_a_30"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _18a30_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["18_a_30"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _31a40_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["31_a_40"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _31a40_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["31_a_40"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _31a40_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["31_a_40"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _41a60_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["41_a_60"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _41a60_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["41_a_60"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _41a60_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["41_a_60"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _60_mais_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["60_mais"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _60_mais_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["60_mais"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const _60_mais_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["60_mais"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    _11a17 = _11a17_pago + _11a17_bonificado + _11a17_pago_e_bonificado;
    _18a30 = _18a30_pago + _18a30_bonificado + _18a30_pago_e_bonificado;
    _31a40 = _31a40_pago + _31a40_bonificado + _31a40_pago_e_bonificado;
    _41a60 = _41a60_pago + _41a60_bonificado + _41a60_pago_e_bonificado;
    _60_mais = _60_mais_pago + _60_mais_bonificado + _60_mais_pago_e_bonificado;
  } else {
    _11a17 = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["11_a_17"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    _18a30 = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["18_a_30"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    _31a40 = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["31_a_40"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    _41a60 = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["41_a_60"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    _60_mais = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0]["60_mais"]
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);
  }

  const dados = [
    { name: "11 - 17", value: _11a17 },
    { name: "18 - 30", value: _18a30 },
    { name: "31 - 40", value: _31a40 },
    { name: "41 - 60", value: _41a60 },
    { name: "60 +", value: _60_mais },
  ];

  const soma_total = dados.reduce((acc, { value }) => acc + value, 0);

  const percentuais = dados.map(({ name, value }) => ({
    name,
    value: Number(((value / soma_total) * 100).toFixed(2)),
  }));

  return percentuais;
}
