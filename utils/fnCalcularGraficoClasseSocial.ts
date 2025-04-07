import { fnCalcularUsuariosUnicosPorPonto } from "./CalcularUsuariosUnicos/fnCalcularUsuariosUnicosPorPonto";
import { fluxos } from "./fluxos";

export default function fnCalcularGraficoClasseSocial(
  pontos: number[],
  dias: number,
  isBonificadoPreenchido: boolean,
  pontos_bonificados?: number[],
  dias_bonificados?: number,
  dias_totais?: number
) {
  let classe_a = 0;
  let classe_b = 0;
  let classe_c = 0;
  let classe_d = 0;
  let classe_e = 0;

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

    const classe_a_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_a
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_a_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_a
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_a_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_a
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_b_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_b
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_b_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_b
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_b_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_b
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_c_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_c
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_c_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_c
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_c_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_c
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_d_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_d
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_d_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_d
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_d_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_d
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_e_pago = pontos_pagos
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_e
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_e_bonificado = pontos_boni
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_bonificados!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_e
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    const classe_e_pago_e_bonificado = pontos_pago_e_bonificados
      .map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(
          ponto,
          dias_totais!
        );
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_e
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    classe_a = classe_a_pago + classe_a_bonificado + classe_a_pago_e_bonificado;
    classe_b = classe_b_pago + classe_b_bonificado + classe_b_pago_e_bonificado;
    classe_c = classe_c_pago + classe_c_bonificado + classe_c_pago_e_bonificado;
    classe_d = classe_d_pago + classe_d_bonificado + classe_d_pago_e_bonificado;
    classe_e = classe_e_pago + classe_e_bonificado + classe_e_pago_e_bonificado;
  } else {
    classe_a = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_a
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    classe_b = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_b
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    classe_c = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_c
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    classe_d = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_d
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);

    classe_e = pontos
      ?.map((ponto) => {
        const usuarios_unicos = fnCalcularUsuariosUnicosPorPonto(ponto, dias);
        return (
          usuarios_unicos *
          fluxos.filter((fluxo) => fluxo.id_ponto === ponto)[0].classe_e
        );
      })
      .reduce((acc, ponto) => acc + ponto, 0);
  }

  const dados = [
    { name: "A", value: classe_a },
    { name: "B", value: classe_b },
    { name: "C", value: classe_c },
    { name: "D", value: classe_d },
    { name: "E", value: classe_e },
  ];

  const soma_total = dados.reduce((acc, { value }) => acc + value, 0);

  const percentuais = dados.map(({ name, value }) => ({
    name,
    value: Number(((value / soma_total) * 100).toFixed(2)),
  }));

  return percentuais;
}
