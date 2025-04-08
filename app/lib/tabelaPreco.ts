interface ITabelaPreco {
  ano: number;
  preco_terminal: number;
  preco_catarina: number;
  preco_brasilia: number;
}

export const tabelaPreco: ITabelaPreco[] = [
  {
    ano: 2024,
    preco_terminal: 0.065,
    preco_catarina: 0.187074829931972,
    preco_brasilia: 0.15,
  },
  {
    ano: 2025,
    preco_terminal: 0.075,
    preco_catarina: 0.187074829931972,
    preco_brasilia: 0.15,
  },
];
