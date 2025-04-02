export interface IUser {
  telefone: string;
  insert_data_horario: string;
  id_externo_clerk: number;
  email: string;
  update_autor: string;
  observacao: string;
  update_data_horario: string;
  id_externo_retool: number;
  insert_autor: string;
  uuid_colaborador: string;
  sobrenome: string;
  nome: string;
  apelido: string;
  id_colaborador: number;
  data_nascimento: string;
  escolaridade: string;
  genero: string;
  formacao: string;
  arquivos: {
    url: string,
    categoria: string,
  }[]
}
