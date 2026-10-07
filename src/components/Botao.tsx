import { ActivityIndicator, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { cores, espaco, raio } from '@/theme/tokens';
import { Txt } from './Txt';

type Tipo = 'primario' | 'secundario' | 'perigo' | 'texto';

interface Props {
  titulo: string;
  onPress: () => void;
  tipo?: Tipo;
  carregando?: boolean;
  desabilitado?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const fundo: Record<Tipo, string> = {
  primario: cores.azulCaneta,
  secundario: cores.branco,
  perigo: cores.branco,
  texto: 'transparent',
};
const texto: Record<Tipo, string> = {
  primario: cores.branco,
  secundario: cores.azulCaneta,
  perigo: cores.vermelhoErro,
  texto: cores.azulCaneta,
};

export function Botao({ titulo, onPress, tipo = 'primario', carregando, desabilitado, style, testID }: Props) {
  const inativo = desabilitado || carregando;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!inativo, busy: !!carregando }}
      onPress={onPress}
      disabled={inativo}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: fundo[tipo] },
        tipo === 'secundario' && { borderColor: cores.azulCaneta, borderWidth: 2 },
        tipo === 'perigo' && { borderColor: cores.vermelhoErro, borderWidth: 2 },
        tipo === 'primario' && styles.sombra,
        pressed && { transform: [{ translateY: 2 }], shadowOffset: { width: 0, height: 1 } },
        inativo && { opacity: 0.55 },
        style,
      ]}
    >
      <View style={styles.conteudo}>
        {carregando && <ActivityIndicator color={texto[tipo]} />}
        <Txt variante="corpoForte" cor={texto[tipo]}>
          {titulo}
        </Txt>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    borderRadius: raio.campo,
    paddingHorizontal: espaco.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Sombra "dura" deslocada, como etiqueta colada no mural.
  sombra: {
    shadowColor: cores.grafite,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  conteudo: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
});
