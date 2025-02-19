interface Pais {
  nome: string;
  sigla: string;
  id_pais: number;
}

interface Estado {
  id_pais: number;
  nome: string;
  sigla: string;
  id_estado: number;
  pais: Pais;
}

interface Municipio {
  nome: string;
  id_estado: number;
  id_municipio: number;
  is_capital: boolean;
  estado: Estado;
}

interface Endereco {
  id_ponto: number;
  bairro: string;
  numero: string | null;
  latitude: number;
  codigo_postal: string;
  id_municipio: number;
  logradouro: string;
  complemento: string | null;
  longitude: number;
  municipio: Municipio;
}

interface Tag {
  tag: string;
  id_tag: number;
  esquema: string;
  classificacao: string;
  tabela: string;
  cor: string | null;
}

interface TagPonto {
  id_tag: number;
  id_ponto: number;
  tag: Tag;
}

interface Concessao {
  id_ponto: number;
  id_concessao: number;
  id_concessao_ponto: number;
}

interface IPonto {
  praca: string;
  insert_data_horario: string;
  update_autor: string | null;
  nome: string;
  id_ponto: number;
  categoria: string;
  insert_autor: string;
  update_data_horario: string | null;
  concessoes: Concessao[];
  endereco: Endereco;
  tags: TagPonto[];
}