export function fnCalcularSegundosFuncionamento(
  horarioInicio: string,
  horarioTermino: string
): number {
  // Converter as strings para objetos Date
  const [horaInicio, minutoInicio] = horarioInicio.split(":").map(Number);
  const [horaTermino, minutoTermino] = horarioTermino.split(":").map(Number);

  // Converter os horários para segundos dentro do dia
  const segundosInicio = horaInicio * 3600 + minutoInicio * 60;
  const segundosTermino = horaTermino * 3600 + minutoTermino * 60;

  // Calcular a diferença de tempo
  const qtdSegundos =
    segundosTermino -
    segundosInicio +
    (segundosInicio > segundosTermino ? 86400 : 0);

  return qtdSegundos;
}
