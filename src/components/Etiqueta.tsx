import { useState } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import type { Item } from '@/services/types';
import { rotuloCondicao } from '@/utils/catalogo';
import { cores, espaco } from '@/theme/tokens';
import { ItemArte } from './ItemArte';
import { SeloModalidade } from './Selos';
import { Txt } from './Txt';

const CHANFRO = 22; // corte diagonal dos cantos de cima
const TOPO = 30; // altura reservada para o furo da etiqueta

/** Contorno de etiqueta pendurada (hang tag) desenhado no tamanho real do card. */
function contorno(l: number, a: number) {
  const r = 12;
  return [
    `M${CHANFRO} 1`,
    `H${l - CHANFRO}`,
    `L${l - 1} ${CHANFRO}`,
    `V${a - r}`,
    `Q${l - 1} ${a - 1} ${l - r} ${a - 1}`,
    `H${r}`,
    `Q1 ${a - 1} 1 ${a - r}`,
    `V${CHANFRO}`,
    'Z',
  ].join(' ');
}

interface Props {
  item: Item;
  onPress: () => void;
  /** Inclinação leve, como etiquetas presas num mural. */
  inclinacao?: number;
}

export function Etiqueta({ item, onPress, inclinacao = 0 }: Props) {
  const [tam, setTam] = useState({ l: 0, a: 0 });
  const medir = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== tam.l || height !== tam.a) setTam({ l: width, a: height });
  };

  return (
    <Pressable
      testID={`etiqueta-${item.id}`}
      accessibilityRole="button"
      accessibilityLabel={`${item.titulo}, ${item.modalidade === 'troca' ? 'troca' : 'doação'}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { transform: [{ rotate: `${inclinacao}deg` }, { scale: pressed ? 0.98 : 1 }] },
      ]}
      onLayout={medir}
    >
      {tam.l > 0 && (
        <Svg width={tam.l} height={tam.a} style={StyleSheet.absoluteFill}>
          {/* sombra deslocada */}
          <Path d={contorno(tam.l, tam.a - 3)} fill={cores.grafite} transform="translate(0 3)" />
          <Path d={contorno(tam.l, tam.a - 3)} fill={cores.branco} stroke={cores.grafite} strokeWidth={1.5} />
          <Circle cx={tam.l / 2} cy={16} r={6} fill={cores.papel} stroke={cores.grafite} strokeWidth={1.5} />
        </Svg>
      )}
      <View style={styles.conteudo}>
        <ItemArte item={item} tamanho={40} style={styles.arte} />
        <Txt variante="corpoForte" numberOfLines={2} style={styles.titulo}>
          {item.titulo}
        </Txt>
        <View style={styles.rodape}>
          <SeloModalidade modalidade={item.modalidade} />
          <Txt variante="pequeno" cor={cores.grafiteSuave}>
            {rotuloCondicao(item.condicao)}
          </Txt>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 220 },
  conteudo: {
    flex: 1,
    paddingTop: TOPO,
    paddingHorizontal: espaco.md,
    paddingBottom: espaco.md + 3,
    gap: espaco.sm,
  },
  arte: { height: 84 },
  titulo: { minHeight: 44 },
  rodape: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
