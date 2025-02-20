import { z } from "zod";

export const simuladorSchema = z.object({
  desconto: z
    .number()
    .min(0, "O desconto não pode ser negativo")
    .max(100, "O desconto não pode ser maior que 100"),
  saturacao: z.number().min(0.1, "A saturação deve ser maior que 0"),
  dias: z
    .number({ required_error: "O campo é obrigatório" })
    .int("O valor deve ser um número inteiro")
    .min(0, "O valor mínimo é 1"),
  pontos: z.array(z.number()),
  pracas: z.array(z.string()),
  // bonificado
  dias_bonificados: z
    .number()
    .int("O valor deve ser um número inteiro")
    .min(0, "O valor mínimo é 1"),
  saturacao_bonificada: z.number().min(0.1, "A saturação deve ser maior que 0"),
  pontos_bonificados: z.array(z.number()),
});
