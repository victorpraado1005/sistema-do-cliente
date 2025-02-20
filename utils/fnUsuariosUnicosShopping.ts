export function fnUsuariosUnicosShopping(
  t: number | null,
  parametros_grupo_2_a: number | null | undefined
): number {
  return (parametros_grupo_2_a ?? 0) * (t ?? 0);
}
