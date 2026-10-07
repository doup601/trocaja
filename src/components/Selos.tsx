import { StyleSheet, View } from 'react-native';
import type { Modalidade, StatusProposta } from '@/services/types';
import { rotuloModalidade, rotuloStatusProposta } from '@/utils/catalogo';
import { cores } from '@/theme/tokens';
import { Txt } from './Txt';

/** Selo de modalidade pintado como marca-texto: amarelo = troca, rosa = doação. */
export function SeloModalidade({ modalidade }: { modalidade: Modalidade }) {
  return (
    <View
      style={[
        styles.marcaTexto,
        { backgroundColor: modalidade === 'troca' ? cores.marcaTexto : cores.rosaMarcaTexto },
      ]}
    >
      <Txt variante="rotulo">{rotuloModalidade(modalidade)}</Txt>
    </View>
  );
}

const corStatus: Record<StatusProposta, string> = {
  pendente: cores.grafiteSuave,
  aceita: cores.verdeOk,
  recusada: cores.vermelhoErro,
  cancelada: cores.grafiteSuave,
};

export function SeloStatus({ status }: { status: StatusProposta }) {
  return (
    <View style={styles.status}>
      <View style={[styles.ponto, { backgroundColor: corStatus[status] }]} />
      <Txt variante="pequeno" cor={corStatus[status]}>
        {rotuloStatusProposta[status]}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  marcaTexto: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 3,
    transform: [{ rotate: '-1.5deg' }],
  },
  status: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ponto: { width: 8, height: 8, borderRadius: 4 },
});
