import type { Categoria, Item, Modalidade } from '@/services/types';

export interface FiltroItens {
  busca?: string;
  categoria?: Categoria | null;
  modalidade?: Modalidade | null;
  /** Esconde anúncios deste usuário (o feed não mostra os próprios itens). */
  excluirDonoId?: string;
  /** Mostra só itens disponíveis. Padrão: true. */
  somenteDisponiveis?: boolean;
}

/** Remove acentos e caixa para a busca achar "calculo" em "Cálculo". */
export const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

export function filtrarItens(itens: Item[], filtro: FiltroItens = {}): Item[] {
  const termo = normalizar(filtro.busca ?? '');
  const somenteDisponiveis = filtro.somenteDisponiveis ?? true;

  return itens.filter((item) => {
    if (filtro.excluirDonoId && item.donoId === filtro.excluirDonoId) return false;
    if (somenteDisponiveis && item.status !== 'disponivel') return false;
    if (filtro.categoria && item.categoria !== filtro.categoria) return false;
    if (filtro.modalidade && item.modalidade !== filtro.modalidade) return false;
    if (termo) {
      const alvo = normalizar(`${item.titulo} ${item.descricao} ${item.aceitaEmTroca}`);
      if (!alvo.includes(termo)) return false;
    }
    return true;
  });
}
