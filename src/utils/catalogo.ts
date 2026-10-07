import type { Categoria, Condicao, Modalidade, StatusItem, StatusProposta } from '@/services/types';

/** Nomes de ícone do MaterialCommunityIcons (@expo/vector-icons). */
export const categorias: { id: Categoria; rotulo: string; icone: string }[] = [
  { id: 'livros', rotulo: 'Livros', icone: 'book-open-page-variant' },
  { id: 'eletronicos', rotulo: 'Eletrônicos', icone: 'chip' },
  { id: 'material', rotulo: 'Material', icone: 'pencil-ruler' },
  { id: 'roupas', rotulo: 'Roupas', icone: 'tshirt-crew' },
  { id: 'moveis', rotulo: 'Móveis', icone: 'desk-lamp' },
  { id: 'outros', rotulo: 'Outros', icone: 'package-variant' },
];

export const condicoes: { id: Condicao; rotulo: string }[] = [
  { id: 'novo', rotulo: 'Novo' },
  { id: 'seminovo', rotulo: 'Seminovo' },
  { id: 'usado', rotulo: 'Usado' },
];

export const modalidades: { id: Modalidade; rotulo: string }[] = [
  { id: 'troca', rotulo: 'Troca' },
  { id: 'doacao', rotulo: 'Doação' },
];

/** Tons claros usados como fundo da ilustração de cada anúncio. */
export const coresDeItem = ['#C9D4FF', '#FFF3A6', '#FFD0E2', '#C8F0DF', '#E3DAFF', '#FFDCC2'];

export const rotuloCategoria = (c: Categoria) => categorias.find((x) => x.id === c)?.rotulo ?? c;
export const iconeCategoria = (c: Categoria) =>
  categorias.find((x) => x.id === c)?.icone ?? 'package-variant';
export const rotuloCondicao = (c: Condicao) => condicoes.find((x) => x.id === c)?.rotulo ?? c;
export const rotuloModalidade = (m: Modalidade) => (m === 'troca' ? 'Troca' : 'Doação');

export const rotuloStatusItem: Record<StatusItem, string> = {
  disponivel: 'Disponível',
  reservado: 'Reservado',
  trocado: 'Trocado',
};

export const rotuloStatusProposta: Record<StatusProposta, string> = {
  pendente: 'Aguardando resposta',
  aceita: 'Aceita',
  recusada: 'Recusada',
  cancelada: 'Cancelada',
};
