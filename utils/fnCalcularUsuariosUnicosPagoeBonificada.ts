import { fnCalcularUsuariosUnicos } from "./fnCalcularUsuariosUnicos";

// Função para chegar no valor final de usuários unicos de uma campanha Paga + Bonificada
// Nessa função é realizada a soma de todos os usuarios_unicos e o respectivo desconto
// de intersecção
export function fnCalcularUsuariosUnicosPagoeBonificada(
  pontos_pagos: number[],
  pontos_bonificados: number[],
  dias: number,
  dias_bonificados: number
) {
  const pontos_pago_e_bonificados = pontos_pagos.filter((ponto) =>
    pontos_bonificados.includes(ponto)
  );
  const dias_totais = dias + dias_bonificados;
  console.log(pontos_pago_e_bonificados);

  pontos_pagos = pontos_pagos.filter(
    (ponto) => !pontos_pago_e_bonificados.includes(ponto)
  );
  // console.log(pontos_pagos);
  pontos_bonificados = pontos_bonificados.filter(
    (ponto) => !pontos_pago_e_bonificados.includes(ponto)
  );
  // console.log(pontos_bonificados);

  const usuarios_unicos_pagos = fnCalcularUsuariosUnicos(pontos_pagos, dias);
  // console.log("usuarios unicos pagos: " + usuarios_unicos_pagos);
  const usuarios_unicos_bonificados = fnCalcularUsuariosUnicos(
    pontos_bonificados,
    dias_bonificados
  );
  // console.log("usuarios unicos boni: " + usuarios_unicos_bonificados);
  const usuarios_unicos_pagos_e_bonificados = fnCalcularUsuariosUnicos(
    pontos_pago_e_bonificados,
    dias_totais
  );
  console.log(
    "usuarios unicos pagos e boni: " + usuarios_unicos_pagos_e_bonificados
  );

  let usuarios_unicos =
    usuarios_unicos_pagos_e_bonificados +
    usuarios_unicos_pagos +
    usuarios_unicos_bonificados;

  const pontos = [...new Set(pontos_bonificados.concat(pontos_pagos))];

  console.log("usuarios unicos antes do desconto: " + usuarios_unicos);
  if (pontos.filter((ponto) => ponto != 12 && ponto != 21).length > 1) {
    usuarios_unicos = usuarios_unicos * 0.73;
    console.log("usuarios unicos depois do desconto: " + usuarios_unicos);
  }

  if (pontos.includes(12) && pontos.includes(21)) {
    usuarios_unicos = usuarios_unicos * 0.94;
  } else if (pontos.includes(12)) {
    usuarios_unicos = usuarios_unicos * 0.95;
  } else if (pontos.includes(21)) {
    usuarios_unicos = usuarios_unicos * 0.99;
  }

  return usuarios_unicos;
}
