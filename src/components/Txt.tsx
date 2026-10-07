import { Text, type TextProps, type TextStyle } from 'react-native';
import { cores, fontes, tamanhos } from '@/theme/tokens';

type Variante = 'display' | 'titulo' | 'subtitulo' | 'corpo' | 'corpoForte' | 'pequeno' | 'rotulo';

const estilos: Record<Variante, TextStyle> = {
  display: { fontFamily: fontes.titulo, fontSize: tamanhos.display, lineHeight: 36, letterSpacing: -0.6 },
  titulo: { fontFamily: fontes.titulo, fontSize: tamanhos.titulo, lineHeight: 30, letterSpacing: -0.4 },
  subtitulo: { fontFamily: fontes.tituloMedio, fontSize: tamanhos.subtitulo, lineHeight: 25 },
  corpo: { fontFamily: fontes.texto, fontSize: tamanhos.corpo, lineHeight: 23 },
  corpoForte: { fontFamily: fontes.textoForte, fontSize: tamanhos.corpo, lineHeight: 22 },
  pequeno: { fontFamily: fontes.textoMedio, fontSize: tamanhos.pequeno, lineHeight: 18 },
  rotulo: { fontFamily: fontes.textoForte, fontSize: 14, lineHeight: 18 },
};

interface Props extends TextProps {
  variante?: Variante;
  cor?: string;
}

export function Txt({ variante = 'corpo', cor = cores.grafite, style, ...rest }: Props) {
  return <Text style={[estilos[variante], { color: cor }, style]} {...rest} />;
}
