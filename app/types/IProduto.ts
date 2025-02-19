export interface IProduto {
  "id_concessao_ponto": number,
  "horario_funcionamento_inicio": String,
  "resolucao_pixels_largura":number,
  "qtd_faces":number,
  "qtd_segundos_insercao":number,
  "preco_segundo":number,
  "data_venda_termino"?: String,
  "insert_autor": String,
  "update_autor"?: Date,
  "id_produto": number,
  "horario_funcionamento_termino": String,
  "resolucao_pixels_altura":number,
  "qtd_segundos_loop":number,
  "qtd_impactos_diarios":number,
  "data_venda_inicio":String,
  "data_funcionamento_inicio": String,
  "insert_data_horario": String,
  "update_data_horario"? :String
}