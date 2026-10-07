import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { cores, espaco } from '@/theme/tokens';
import { Botao } from './Botao';
import { Txt } from './Txt';

interface Props {
  icone: string;
  titulo: string;
  texto: string;
  acao?: { titulo: string; onPress: () => void };
}

/** Estado vazio: sempre diz o que fazer em seguida. */
export function Vazio({ icone, titulo, texto, acao }: Props) {
  return (
    <View style={styles.bloco}>
      <MaterialCommunityIcons
        name={icone as keyof typeof MaterialCommunityIcons.glyphMap}
        size={44}
        color={cores.azulCaneta}
      />
      <Txt variante="subtitulo" style={styles.centro}>
        {titulo}
      </Txt>
      <Txt cor={cores.grafiteSuave} style={styles.centro}>
        {texto}
      </Txt>
      {acao && <Botao titulo={acao.titulo} onPress={acao.onPress} tipo="secundario" />}
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: { alignItems: 'center', gap: espaco.md, paddingVertical: espaco.xxl, paddingHorizontal: espaco.xl },
  centro: { textAlign: 'center' },
});
