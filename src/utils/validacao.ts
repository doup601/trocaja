import type { Categoria, Condicao, Modalidade } from '@/services/types';

export interface FormAnuncio {
  titulo: string;
  descricao: string;
  categoria: Categoria | null;
  condicao: Condicao | null;
  modalidade: Modalidade;
  aceitaEmTroca: string;
}

export type ErrosAnuncio = Partial<Record<keyof FormAnuncio, string>>;

export function validarAnuncio(f: FormAnuncio): ErrosAnuncio {
  const erros: ErrosAnuncio = {};
  const titulo = f.titulo.trim();
  if (titulo.length < 3) erros.titulo = 'Escreva um título com pelo menos 3 letras.';
  else if (titulo.length > 60) erros.titulo = 'Use até 60 caracteres no título.';
  if (f.descricao.trim().length < 10)
    erros.descricao = 'Conte o estado do item em pelo menos 10 caracteres.';
  if (!f.categoria) erros.categoria = 'Escolha uma categoria.';
  if (!f.condicao) erros.condicao = 'Escolha a condição do item.';
  if (f.modalidade === 'troca' && f.aceitaEmTroca.trim().length < 3)
    erros.aceitaEmTroca = 'Diga o que você aceita em troca.';
  return erros;
}

export interface FormCadastro {
  nome: string;
  email: string;
  curso: string;
  campus: string;
}

export type ErrosCadastro = Partial<Record<keyof FormCadastro, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarCadastro(f: FormCadastro): ErrosCadastro {
  const erros: ErrosCadastro = {};
  if (f.nome.trim().split(/\s+/).filter(Boolean).length < 2)
    erros.nome = 'Informe nome e sobrenome.';
  if (!EMAIL.test(f.email.trim())) erros.email = 'Informe um e-mail válido.';
  if (f.curso.trim().length < 2) erros.curso = 'Informe seu curso.';
  if (f.campus.trim().length < 2) erros.campus = 'Informe seu campus.';
  return erros;
}

export const semErros = (erros: object) => Object.keys(erros).length === 0;
