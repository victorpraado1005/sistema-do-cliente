function fnCalcularPopulacaoABD() {
  // População Diadema
  const populacao_diadema = 393237;
  const proporcao_populacao_ativa_diadema = 0.82;

  // População Santo André
  const populacao_santo_andre = 748919;
  const proporcao_populacao_ativa_santo_andre = 0.8584;

  // População São Bernardo
  const populacao_sao_bernardo = 810729;
  const proporcao_populacao_ativa_sao_bernardo = 0.8504;

  return (
    populacao_diadema * proporcao_populacao_ativa_diadema +
    populacao_santo_andre * proporcao_populacao_ativa_santo_andre +
    populacao_sao_bernardo * proporcao_populacao_ativa_sao_bernardo
  );
}

function fnCalcularPopulacaoSaoPaulo() {
  // População São Paulo
  const populacao_sao_paulo = 11451245;
  const proporcao_populacao_ativa_sao_paulo = 0.8425;

  return populacao_sao_paulo * proporcao_populacao_ativa_sao_paulo;
}

function fnCalcularPopulacaoRmr() {
  // População RMR -> (Região Metropolitana de Recife)
  const populacao_rmr = 3726442;
  const proporcao_populacao_ativa_rmr = 0.8295;

  return populacao_rmr * proporcao_populacao_ativa_rmr;
}

export function fnCalcularPop12Mais(pracas: string[]) {
  let populacao = 0;

  if (pracas.includes("São Paulo")) {
    populacao += fnCalcularPopulacaoSaoPaulo();
  }

  if (pracas.includes("ABD")) {
    populacao += fnCalcularPopulacaoABD();
  }

  if (pracas.includes("Recife")) {
    populacao += fnCalcularPopulacaoRmr();
  }

  return populacao;
}
