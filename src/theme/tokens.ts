/**
 * Tokens de design do TrocaJá.
 * Referência visual: mural de avisos do campus — caneta azul, marca-texto e etiquetas de troca.
 */
export const cores = {
  azulCaneta: '#1F3FD1',
  azulCanetaEscuro: '#152C96',
  marcaTexto: '#F4E04D',
  rosaMarcaTexto: '#FF6FA5',
  papel: '#F3F5F9',
  branco: '#FFFFFF',
  grafite: '#22252E',
  grafiteSuave: '#5B6070',
  linha: '#DCE1EB',
  verdeOk: '#159A6C',
  vermelhoErro: '#C8352B',
} as const;

export const fontes = {
  titulo: 'BricolageGrotesque_800ExtraBold',
  tituloMedio: 'BricolageGrotesque_700Bold',
  texto: 'Figtree_400Regular',
  textoMedio: 'Figtree_500Medium',
  textoForte: 'Figtree_700Bold',
} as const;

/** Escala tipográfica (razão ~1,25). */
export const tamanhos = {
  pequeno: 13,
  corpo: 16,
  subtitulo: 20,
  titulo: 25,
  display: 31,
} as const;

export const espaco = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const raio = {
  campo: 10,
  etiqueta: 14,
  pilula: 999,
} as const;
