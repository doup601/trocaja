import { StyleSheet, View } from 'react-native';
import { iniciais } from '@/utils/formatadores';
import { cores } from '@/theme/tokens';
import { Txt } from './Txt';

export function Avatar({ nome, tamanho = 40 }: { nome: string; tamanho?: number }) {
  return (
    <View
      style={[styles.base, { width: tamanho, height: tamanho, borderRadius: tamanho / 2 }]}
      accessibilityLabel={`Foto de ${nome}`}
    >
      <Txt variante="rotulo" cor={cores.branco} style={{ fontSize: tamanho * 0.38 }}>
        {iniciais(nome)}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { backgroundColor: cores.azulCaneta, alignItems: 'center', justifyContent: 'center' },
});
