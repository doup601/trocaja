import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import type { Item, Proposta, StatusProposta, Usuario } from '@/services/types';
import { cores, espaco, raio } from '@/theme/tokens';
import { tempoRelativo } from '@/utils/formatadores';
import { Botao } from './Botao';
import { ItemArte } from './ItemArte';
import { SeloStatus } from './Selos';
import { Txt } from './Txt';

interface Props {
  proposta: Proposta;
  recebida: boolean;
  item?: Item;
  oferecido?: Item;
  outraPessoa?: Usuario;
  onResponder: (status: StatusProposta) => void;
}

export function PropostaCard({ proposta, recebida, item, oferecido, outraPessoa, onResponder }: Props) {
  const nome = outraPessoa?.nome ?? 'Alguém';
  const titulo = recebida
    ? `${nome} quer ${item ? `seu ${item.titulo}` : 'um item seu'}`
    : `Você pediu ${item?.titulo ?? 'um item'} a ${nome}`;

  return (
    <View style={styles.card} testID={`proposta-${proposta.id}`}>
      <View style={styles.topo}>
        <SeloStatus status={proposta.status} />
        <Txt variante="pequeno" cor={cores.grafiteSuave}>
          {tempoRelativo(proposta.criadaEm)}
        </Txt>
      </View>
      <Txt variante="corpoForte">{titulo}</Txt>

      <View style={styles.troca}>
        {item && <ItemArte item={item} tamanho={22} style={styles.mini} />}
        <MaterialCommunityIcons name="swap-horizontal-bold" size={22} color={cores.grafite} />
        {oferecido ? (
          <View style={styles.oferta}>
            <ItemArte item={oferecido} tamanho={22} style={styles.mini} />
            <Txt variante="pequeno" style={{ flex: 1 }} numberOfLines={2}>
              {oferecido.titulo}
            </Txt>
          </View>
        ) : (
          <Txt variante="pequeno" cor={cores.grafiteSuave} style={{ flex: 1 }}>
            Pedido de doação, sem item em troca
          </Txt>
        )}
      </View>

      {!!proposta.mensagem && <Txt cor={cores.grafiteSuave}>“{proposta.mensagem}”</Txt>}

      {proposta.status === 'pendente' &&
        (recebida ? (
          <View style={styles.acoes}>
            <Botao titulo="Recusar" tipo="perigo" onPress={() => onResponder('recusada')} style={{ flex: 1 }} />
            <Botao titulo="Aceitar" onPress={() => onResponder('aceita')} style={{ flex: 1 }} testID={`aceitar-${proposta.id}`} />
          </View>
        ) : (
          <Botao titulo="Cancelar proposta" tipo="texto" onPress={() => onResponder('cancelada')} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.branco,
    borderRadius: raio.etiqueta,
    borderWidth: 1.5,
    borderColor: cores.linha,
    padding: espaco.lg,
    gap: espaco.md,
  },
  topo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  troca: { flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  oferta: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: espaco.sm },
  mini: { width: 44, height: 44 },
  acoes: { flexDirection: 'row', gap: espaco.md },
});
