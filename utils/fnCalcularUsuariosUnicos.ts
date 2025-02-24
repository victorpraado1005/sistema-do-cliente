import { fluxos } from "./fluxos";
import { fnUsuariosUnicosShopping } from "./fnUsuariosUnicosShopping";
import { fnUsuariosUnicosTerminal } from "./fnUsuariosUnicosTerminal";

export function fnCalcularUsuariosUnicos(
  selectedPontos: number[],
  dias: number
) {
  let usuarios_unicos = 0;
  // Cálculo de usuarios unicos
  usuarios_unicos = selectedPontos
    ?.map((ponto) => {
      const fluxo = fluxos.find((item) => item.id_ponto === ponto);

      let total = 0;

      if (fluxo?.Tipo === "Terminal") {
        total = fnUsuariosUnicosTerminal(
          dias,
          fluxo.parametros_grupo_1_a,
          fluxo.parametros_grupo_1_b,
          fluxo.parametros_grupo_1_c
        );
      }

      return total;
    })
    .reduce((acc, total) => acc + total, 0);

  if (
    fluxos.filter(
      (fluxo) =>
        selectedPontos.includes(fluxo.id_ponto) && fluxo.Tipo === "Terminal"
    ).length > 1
  ) {
    usuarios_unicos = usuarios_unicos * 0.73;
  }

  usuarios_unicos += selectedPontos
    ?.map((ponto) => {
      const fluxo = fluxos.find((item) => item.id_ponto === ponto);

      let total = 0;

      if (fluxo?.Tipo === "Shopping") {
        total = fnUsuariosUnicosShopping(dias, fluxo?.parametros_grupo_2_a);
      }

      return total;
    })
    .reduce((acc, total) => acc + total, 0);

  if (
    // Possui os 2 Shopping's + Terminais
    fluxos.filter((fluxo) => selectedPontos.includes(12)).length > 0 &&
    fluxos.filter((fluxo) => selectedPontos.includes(21)).length > 0 &&
    selectedPontos.filter((item) => item != 12 && item != 21).length >= 1
  ) {
    usuarios_unicos = usuarios_unicos * 0.94;
  } else if (
    // Possui apenas Catarina + Terminais
    fluxos.filter((fluxo) => selectedPontos.includes(12)).length > 0 &&
    selectedPontos.filter((item) => item != 12 && item != 21).length >= 1
  ) {
    usuarios_unicos = usuarios_unicos * 0.95;
  } else if (
    // Possui apenas Raposo + Terminais
    fluxos.filter((fluxo) => selectedPontos.includes(21)).length > 0 &&
    selectedPontos.filter((item) => item != 12 && item != 21).length >= 1
  ) {
    usuarios_unicos = usuarios_unicos * 0.99;
  }

  return usuarios_unicos;
}
