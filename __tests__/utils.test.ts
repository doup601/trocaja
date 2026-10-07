import itensJson from '@/data/mock/itens.json';
import type { Item } from '@/services/types';
import { filtrarItens, normalizar } from '@/utils/filtros';
import { iniciais, primeiroNome, tempoRelativo } from '@/utils/formatadores';
import { semErros, validarAnuncio, validarCadastro } from '@/utils/validacao';

const itens = itensJson as Item[];

describe('filtrarItens', () => {
  it('por padrão esconde itens reservados', () => {
    const resultado = filtrarItens(itens);
    expect(resultado.every((i) => i.status === 'disponivel')).toBe(true);
    expect(resultado).toHaveLength(14);
  });

  it('busca ignora acentos e maiúsculas', () => {
    const resultado = filtrarItens(itens, { busca: 'CALCULO' });
    expect(resultado.map((i) => i.id)).toEqual(['i1']);
  });

  it('busca também no campo "aceita em troca"', () => {
    const resultado = filtrarItens(itens, { busca: 'raspberry' });
    expect(resultado.map((i) => i.id)).toEqual(['i6']);
  });

  it('combina categoria e modalidade', () => {
    const resultado = filtrarItens(itens, { categoria: 'eletronicos', modalidade: 'doacao' });
    expect(resultado.map((i) => i.id)).toEqual(['i14']);
  });

  it('não mostra os próprios anúncios no feed', () => {
    const resultado = filtrarItens(itens, { excluirDonoId: 'u1' });
    expect(resultado.some((i) => i.donoId === 'u1')).toBe(false);
  });

  it('normalizar remove acentos e espaços nas pontas', () => {
    expect(normalizar('  Ção Á ')).toBe('cao a');
  });
});

describe('formatadores', () => {
  const agora = new Date('2026-10-07T12:00:00.000Z');

  it.each([
    ['2026-10-07T11:59:30.000Z', 'agora'],
    ['2026-10-07T11:45:00.000Z', 'há 15 min'],
    ['2026-10-07T09:00:00.000Z', 'há 3 h'],
    ['2026-10-06T10:00:00.000Z', 'ontem'],
    ['2026-10-03T12:00:00.000Z', 'há 4 dias'],
  ])('tempoRelativo(%s) → %s', (iso, esperado) => {
    expect(tempoRelativo(iso, agora)).toBe(esperado);
  });

  it('tempoRelativo mostra a data quando passa de uma semana', () => {
    expect(tempoRelativo('2026-09-20T15:00:00.000Z', agora)).toMatch(/^\d{2}\/\d{2}$/);
  });

  it('iniciais usa primeiro e último nome', () => {
    expect(iniciais('Lia Moreira')).toBe('LM');
    expect(iniciais('Pedro Gaspar Fernandes Ferrari')).toBe('PF');
    expect(iniciais('Caio')).toBe('CA');
    expect(iniciais('   ')).toBe('?');
  });

  it('primeiroNome', () => {
    expect(primeiroNome('Júlia Andrade')).toBe('Júlia');
  });
});

describe('validarAnuncio', () => {
  const valido = {
    titulo: 'Calculadora HP 12C',
    descricao: 'Funciona bem, sem a capa.',
    categoria: 'eletronicos' as const,
    condicao: 'usado' as const,
    modalidade: 'troca' as const,
    aceitaEmTroca: 'Pen drive',
  };

  it('aceita um anúncio completo', () => {
    expect(semErros(validarAnuncio(valido))).toBe(true);
  });

  it('exige o que aceita em troca só quando é troca', () => {
    expect(validarAnuncio({ ...valido, aceitaEmTroca: '' }).aceitaEmTroca).toBeDefined();
    expect(validarAnuncio({ ...valido, modalidade: 'doacao', aceitaEmTroca: '' })).toEqual({});
  });

  it('aponta todos os campos obrigatórios vazios', () => {
    const erros = validarAnuncio({
      titulo: 'a',
      descricao: '',
      categoria: null,
      condicao: null,
      modalidade: 'troca',
      aceitaEmTroca: '',
    });
    expect(Object.keys(erros).sort()).toEqual(['aceitaEmTroca', 'categoria', 'condicao', 'descricao', 'titulo']);
  });
});

describe('validarCadastro', () => {
  it('pede sobrenome e e-mail válido', () => {
    const erros = validarCadastro({ nome: 'Pedro', email: 'pedro@', curso: 'ES', campus: 'Paulista' });
    expect(erros.nome).toBeDefined();
    expect(erros.email).toBeDefined();
    expect(erros.curso).toBeUndefined();
  });
});
