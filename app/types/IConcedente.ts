export interface IConcedente {
  data_inicio: string;
  insert_autor: string;
  update_autor: string;
  id_empresa: number;
  id_concessao: number;
  data_termino: string;
  insert_data_horario: string;
  update_data_horario: string;
  empresa: {
    id_empresa: number;
    nome_kantar: string;
    insert_autor: string;
    update_data_horario: string;
    nome: string;
    observacao: string;
    insert_data_horario: string;
    update_autor: string;
  };
}
