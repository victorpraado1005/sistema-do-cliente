import { fluxos } from "./fluxos";
import { fnUsuariosUnicosShopping } from "./fnUsuariosUnicosShopping";
import { fnUsuariosUnicosTerminal } from "./fnUsuariosUnicosTerminal";

// Função que apenas calcula os usuários unicos de uma lista de pontos
// Utilizado para apenas calcular os usuarios, sem fazer desconto de intersecção
// Para campanhas Pagas + Bonificadas
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

  return usuarios_unicos;
}
