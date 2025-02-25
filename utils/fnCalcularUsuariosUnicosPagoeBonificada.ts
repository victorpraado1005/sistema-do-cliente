import { fnCalcularUsuariosUnicos } from "./fnCalcularUsuariosUnicos";

export function fnCalcularUsuariosUnicosPagoeBonificada(pontos_pagos: number[], pontos_bonificados: number[], dias: number, dias_bonificados: number) {
  const pontos_pago_e_bonificados = pontos_pagos.filter(ponto => pontos_bonificados.includes(ponto));
  const dias_totais = dias + dias_bonificados

  pontos_pagos = pontos_pagos.filter(ponto => !pontos_pago_e_bonificados.includes(ponto))
  pontos_bonificados = pontos_bonificados.filter(ponto => !pontos_pago_e_bonificados.includes(ponto))

  const usuarios_unicos_pagos = fnCalcularUsuariosUnicos(pontos_pagos, dias)
  console.log('usuarios unicos pagos: ' + usuarios_unicos_pagos)
  const usuarios_unicos_bonificados = fnCalcularUsuariosUnicos(pontos_bonificados, dias_bonificados)
  console.log('usuarios unicos boni: ' + usuarios_unicos_bonificados)
  const usuarios_unicos_pagos_e_bonificados = fnCalcularUsuariosUnicos(pontos_pago_e_bonificados, dias_totais)
  console.log('usuarios unicos pagos e boni: ' + usuarios_unicos_pagos_e_bonificados)

  return usuarios_unicos_pagos + usuarios_unicos_bonificados + usuarios_unicos_pagos_e_bonificados
}