
import { fluxos } from "../fluxos";
import { fnUsuariosUnicosShopping } from "../fnUsuariosUnicosShopping";
import { fnUsuariosUnicosTerminal } from "../fnUsuariosUnicosTerminal";

export function fnCalcularUsuariosUnicosPorPonto(
  ponto: number,
  dias: number
) {
  const fluxo = fluxos.find((item) => item.id_ponto === ponto);

  if (fluxo?.Tipo === "Terminal") {
    return fnUsuariosUnicosTerminal(
      dias,
      fluxo.parametros_grupo_1_a,
      fluxo.parametros_grupo_1_b,
      fluxo.parametros_grupo_1_c
    );
  } else {
    return fnUsuariosUnicosShopping(dias, fluxo?.parametros_grupo_2_a);
  }

}
