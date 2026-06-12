// ─── Tipos centrais do domínio ───────────────────────────────────────────────

export interface Edicao {
  id: string
  ano: number
  nome: string
  tema: string
  data: string
  descricao: string
  objetivos: string
  foto_capa: string
  publicado: boolean
  created_at: string
}

export interface Noticia {
  id: string
  titulo: string
  resumo: string
  conteudo: string
  imagem_capa: string
  categoria: CategoriaNoticia
  edicao_id: string | null
  data_publicacao: string
  publicado: boolean
  created_at: string
}

export type CategoriaNoticia =
  | 'educacao'
  | 'agricultura'
  | 'cultura'
  | 'sustentabilidade'
  | 'empreendedorismo'
  | 'galeria'
  | 'eventos'

export interface Produto {
  id: string
  nome: string
  descricao: string
  imagem: string
  categoria: string
  escola: string
  turma: string
  conteudo_pedagogico: string
  edicao_id: string | null
  publicado: boolean
  created_at: string
}

export interface Escola {
  id: string
  nome: string
  localidade: string
  foto: string
  professores: string
  turmas: string
  descricao_participacao: string
  publicado: boolean
  created_at: string
}

export interface FotoGaleria {
  id: string
  titulo: string
  legenda: string
  url: string
  edicao_id: string | null
  categoria: string
  destaque: boolean
  created_at: string
}

export interface Depoimento {
  id: string
  nome: string
  papel: string
  texto: string
  foto: string
  edicao_id: string | null
  publicado: boolean
  created_at: string
}

export interface ConfigSite {
  id: string
  nome_projeto: string
  subtitulo: string
  texto_apresentacao: string
  email_contato: string
  telefone: string
  endereco: string
  facebook: string
  instagram: string
  youtube: string
  imagem_hero: string
  updated_at: string
}
