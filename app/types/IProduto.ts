export interface IProduto {
  id_concessao_ponto: number;
  horario_funcionamento_inicio: string;
  resolucao_pixels_largura: number;
  qtd_faces: number;
  qtd_segundos_insercao: number;
  preco_segundo: number;
  data_venda_termino?: string;
  insert_autor: string;
  update_autor?: Date;
  id_produto: number;
  horario_funcionamento_termino: string;
  resolucao_pixels_altura: number;
  qtd_segundos_loop: number;
  qtd_impactos_diarios: number;
  data_venda_inicio: string;
  data_funcionamento_inicio: string;
  insert_data_horario: string;
  update_data_horario?: string;
}
