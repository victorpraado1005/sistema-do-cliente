import { fnCalcularUsuariosUnicos } from "./fnCalcularUsuariosUnicos";
import { fnCalcularUsuariosUnicosShopping } from "./fnCalcularUsuariosUnicosShopping";
import { fnCalcularUsuariosUnicosTerminais } from "./fnCalcularUsuariosUnicosTerminais";

// Função para chegar no valor final de usuários unicos de uma campanha Paga + Bonificada
// Nessa função é realizada a soma de todos os usuarios_unicos e o respectivo desconto
// de intersecção
export function fnCalcularUsuariosUnicosPagoeBonificada(
  pontos_pagos: number[],
  pontos_bonificados: number[],
  dias: number,
  dias_bonificados: number
) {
  const pontos = [...new Set(pontos_pagos.concat(pontos_bonificados))]

  const pontos_pago_e_bonificados = pontos_pagos.filter((ponto) =>
    pontos_bonificados.includes(ponto)
  )
  const pontos_pago_e_bonificados_shopping = pontos_pago_e_bonificados.filter(ponto => ponto === 12 || ponto === 21)
  const pontos_pago_e_bonificados_terminais = pontos_pago_e_bonificados.filter(ponto => ponto != 12 && ponto != 21);
  const dias_totais = dias + dias_bonificados;

  pontos_pagos = pontos_pagos.filter(
    (ponto) => !pontos_pago_e_bonificados.includes(ponto)
  );
  const pontos_pagos_terminais = pontos_pagos.filter(ponto => ponto != 12 && ponto != 21);
  const pontos_pagos_shopping = pontos_pagos.filter(ponto => ponto === 12 || ponto === 21);

  pontos_bonificados = pontos_bonificados.filter(
    (ponto) => !pontos_pago_e_bonificados.includes(ponto)
  );
  const pontos_bonificados_terminais = pontos_bonificados.filter(ponto => ponto != 12 && ponto != 21);
  const pontos_bonificados_shopping = pontos_bonificados.filter(ponto => ponto === 12 || ponto === 21);

  const usuarios_unicos_pagos_terminais = fnCalcularUsuariosUnicosTerminais(pontos_pagos_terminais, dias)
  console.log(usuarios_unicos_pagos_terminais)
  const usuarios_unicos_bonificados_terminais = fnCalcularUsuariosUnicosTerminais(pontos_bonificados_terminais, dias_bonificados)
  const usuarios_unicos_pagos_e_bonificados_terminais = fnCalcularUsuariosUnicosTerminais(pontos_pago_e_bonificados_terminais, dias_totais)

  const usuarios_unicos_pagos_shopping = fnCalcularUsuariosUnicosShopping(pontos_pagos_shopping, dias)
  const usuarios_unicos_bonificados_shopping = fnCalcularUsuariosUnicosShopping(pontos_bonificados_shopping, dias_bonificados)
  const usuarios_unicos_pagos_e_bonificados_shopping = fnCalcularUsuariosUnicosShopping(pontos_pago_e_bonificados_shopping, dias_totais)

  let usuarios_unicos_terminais = usuarios_unicos_pagos_terminais + usuarios_unicos_bonificados_terminais + usuarios_unicos_pagos_e_bonificados_terminais
  let usuarios_unicos_shopping = usuarios_unicos_pagos_shopping + usuarios_unicos_bonificados_shopping + usuarios_unicos_pagos_e_bonificados_shopping

  // Verificando se existe mais que 1 ponto além de shopping's
  if (pontos.filter(ponto => ponto != 12 && ponto != 21).length > 1) {
    usuarios_unicos_terminais = usuarios_unicos_terminais * 0.73
  }

  if (pontos.includes(12) && pontos.includes(21) && pontos.filter(ponto => ponto != 12 && ponto != 21).length >= 1) {
    usuarios_unicos_shopping = usuarios_unicos_shopping * 0.94
  } else if (pontos.includes(12) && pontos.filter(ponto => ponto != 12 && ponto != 21).length >= 1) {
    usuarios_unicos_shopping = usuarios_unicos_shopping * 0.99
  } else if (pontos.includes(21) && pontos.filter(ponto => ponto != 12 && ponto != 21).length >= 1) {
    usuarios_unicos_shopping = usuarios_unicos_shopping * 0.95
  }

  return usuarios_unicos_terminais + usuarios_unicos_shopping


  //const usuarios_unicos_pagos = fnCalcularUsuariosUnicos(pontos_pagos, dias);
  // console.log("usuarios unicos pagos: " + usuarios_unicos_pagos);
  // const usuarios_unicos_bonificados = fnCalcularUsuariosUnicos(
  //   pontos_bonificados,
  //   dias_bonificados
  // );
  // console.log("usuarios unicos boni: " + usuarios_unicos_bonificados);
  // const usuarios_unicos_pagos_e_bonificados = fnCalcularUsuariosUnicos(
  //   pontos_pago_e_bonificados,
  //   dias_totais
  // );
  // console.log(
  //   "usuarios unicos pagos e boni: " + usuarios_unicos_pagos_e_bonificados
  // );

  // let usuarios_unicos =
  //   usuarios_unicos_pagos_e_bonificados +
  //   usuarios_unicos_pagos +
  //   usuarios_unicos_bonificados;

  // const pontos = [...new Set(pontos_bonificados.concat(pontos_pagos).concat(pontos_pago_e_bonificados))];

  // console.log('antes de descontar tudo: ' + usuarios_unicos)

  // //console.log("usuarios unicos antes do desconto: " + usuarios_unicos);
  // if (pontos.filter((ponto) => ponto != 12 && ponto != 21).length > 1) {
  //   console.log('descontou 27%');
  //   usuarios_unicos = usuarios_unicos * 0.73;
  //   // console.log("usuarios unicos depois do desconto: " + usuarios_unicos);
  // }

  // if (pontos.includes(12) && pontos.includes(21) && pontos.filter((ponto) => ponto != 12 && ponto != 21).length > 1) {
  //   usuarios_unicos = usuarios_unicos * 0.94;
  //   console.log('descontou + 6%');
  // } else if (pontos.includes(21) && pontos.filter((ponto) => ponto != 12 && ponto != 21).length > 1) {
  //   usuarios_unicos = usuarios_unicos * 0.95;
  //   console.log('descontou + 5%');
  // } else if (pontos.includes(12) && pontos.filter((ponto) => ponto != 12 && ponto != 21).length > 1) {
  //   usuarios_unicos = usuarios_unicos * 0.99;
  //   console.log('descontou + 1%');
  // }

  // return usuarios_unicos;
}
