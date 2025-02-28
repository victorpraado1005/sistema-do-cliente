import { IProduto } from "@/app/types/IProduto";

export function fnCalcularVisitasPagasEBonificadas(
  products_pagos: IProduto[],
  dias: number,
  products_bonificados: IProduto[],
  dias_bonificados: number
) {
  console.log(JSON.stringify(products_pagos));
  console.log(JSON.stringify(products_bonificados));

  // Criando um conjunto (Set) com os ids_concessao_ponto dos produtos bonificados
  const ids_concessao_ponto = new Set(
    products_bonificados.map((item) => item.id_concessao_ponto)
  );

  // Filtrando produtos pagos que também estão nos bonificados
  const products_pagos_e_bonificados = products_pagos.filter((item) =>
    ids_concessao_ponto.has(item.id_concessao_ponto)
  );
  console.log(JSON.stringify(products_pagos_e_bonificados));
  const dias_totais = dias + dias_bonificados;

  // Criar um novo Set para armazenar os ids que precisam ser removidos
  const ids_pagos_e_bonificados = new Set(
    products_pagos_e_bonificados.map((item) => item.id_concessao_ponto)
  );

  // Filtrar os produtos pagos removendo os que estão no Set de ids pagos e bonificados
  products_pagos = products_pagos.filter(
    (ponto) => !ids_pagos_e_bonificados.has(ponto.id_concessao_ponto)
  );

  // Filtrar os produtos bonificados removendo os que estão no Set de ids pagos e bonificados
  products_bonificados = products_bonificados.filter(
    (ponto) => !ids_pagos_e_bonificados.has(ponto.id_concessao_ponto)
  );

  const visitas_pagas = products_pagos?.reduce(
    (acc, item) => acc + item.qtd_fluxo_diario * dias,
    0
  );
  const visitas_bonificadas = products_bonificados?.reduce(
    (acc, item) => acc + item.qtd_fluxo_diario * dias_bonificados,
    0
  );
  const visitas_bonificadas_e_pagas = products_pagos_e_bonificados?.reduce(
    (acc, item) => acc + item.qtd_fluxo_diario * dias_totais,
    0
  );

  return visitas_pagas + visitas_bonificadas + visitas_bonificadas_e_pagas;
}
