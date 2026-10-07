import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { cores, espaco, fontes, raio, tamanhos } from '@/theme/tokens';
import { Txt } from './Txt';

interface Props extends TextInputProps {
  rotulo: string;
  erro?: string;
  dica?: string;
}

export function Campo({ rotulo, erro, dica, style, multiline, ...rest }: Props) {
  return (
    <View style={styles.bloco}>
      <Txt variante="rotulo">{rotulo}</Txt>
      <TextInput
        accessibilityLabel={rotulo}
        placeholderTextColor={cores.grafiteSuave}
        multiline={multiline}
        style={[styles.input, multiline && styles.multilinha, !!erro && styles.inputErro, style]}
        {...rest}
      />
      {erro ? (
        <Txt variante="pequeno" cor={cores.vermelhoErro}>
          {erro}
        </Txt>
      ) : dica ? (
        <Txt variante="pequeno" cor={cores.grafiteSuave}>
          {dica}
        </Txt>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: { gap: espaco.xs + 2 },
  input: {
    minHeight: 48,
    backgroundColor: cores.branco,
    borderWidth: 1.5,
    borderColor: cores.linha,
    borderRadius: raio.campo,
    paddingHorizontal: espaco.md,
    fontFamily: fontes.texto,
    fontSize: tamanhos.corpo,
    color: cores.grafite,
  },
  multilinha: { minHeight: 96, paddingTop: espaco.md, textAlignVertical: 'top' },
  inputErro: { borderColor: cores.vermelhoErro },
});
