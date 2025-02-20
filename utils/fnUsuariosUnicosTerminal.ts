export function fnUsuariosUnicosTerminal(
  t: number | null,
  parametros_grupo_1_a: number | null,
  parametros_grupo_1_b: number | null,
  parametros_grupo_1_c: number | null
): number {
  return (
    (parametros_grupo_1_a ?? 0) *
    (1 -
      Math.exp(
        -((parametros_grupo_1_b ?? 0) * (t ?? 0) + (parametros_grupo_1_c ?? 0))
      ))
  );
}
