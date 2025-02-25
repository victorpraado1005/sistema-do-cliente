export function fnCalculcarDescontoMedio(preco_tabela_pago: number, preco_tabela_total: number, desconto: number) {
  const valor_pago = preco_tabela_pago * (1 - desconto / 100)

  return (1 - (valor_pago / preco_tabela_total)) * 100
}