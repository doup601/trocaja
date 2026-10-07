import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { Chip } from '@/components/Chip';
import { PropostaCard } from '@/components/PropostaCard';
import { Txt } from '@/components/Txt';
import { Vazio } from '@/components/Vazio';
import { useApp } from '@/store/AppContext';
import { cores, espaco } from '@/theme/tokens';

type Aba = 'recebidas' | 'enviadas';

export default function Trocas() {
  const { usuario, propostas, itens, usuarios, responderProposta, carregando, recarregar } = useApp();
  const [aba, setAba] = useState<Aba>('recebidas');
  const [falha, setFalha] = useState<string | null>(null);
  if (!usuario) return null;

  const lista = propostas.filter((p) =>
    aba === 'recebidas' ? p.paraUsuarioId === usuario.id : p.deUsuarioId === usuario.id,
  );
  const porId = (id: string | null) => (id ? itens.find((i) => i.id === id) : undefined);

  return (
    <View style={styles.tela}>
      <View style={styles.abas}>
        <Chip rotulo="Recebidas" ativo={aba === 'recebidas'} onPress={() => setAba('recebidas')} />
        <Chip rotulo="Enviadas" ativo={aba === 'enviadas'} onPress={() => setAba('enviadas')} />
      </View>
      {falha && (
        <Txt variante="pequeno" cor={cores.vermelhoErro} style={{ paddingHorizontal: espaco.lg }}>
          {falha}
        </Txt>
      )}
      <FlatList
        data={lista}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.lista}
        refreshControl={<RefreshControl refreshing={carregando} onRefresh={recarregar} tintColor={cores.azulCaneta} />}
        renderItem={({ item: p }) => {
          const recebida = p.paraUsuarioId === usuario.id;
          return (
            <PropostaCard
              proposta={p}
              recebida={recebida}
              item={porId(p.itemId)}
              oferecido={porId(p.itemOferecidoId)}
              outraPessoa={usuarios[recebida ? p.deUsuarioId : p.paraUsuarioId]}
              onResponder={async (status) => {
                setFalha(null);
                try {
                  await responderProposta(p.id, status);
                } catch (e) {
                  setFalha(e instanceof Error ? e.message : 'Não foi possível responder a proposta.');
                }
              }}
            />
          );
        }}
        ListEmptyComponent={
          aba === 'recebidas' ? (
            <Vazio
              icone="inbox-outline"
              titulo="Nenhuma proposta recebida"
              texto="Quando alguém quiser um item seu, a proposta aparece aqui."
              acao={{ titulo: 'Anunciar um item', onPress: () => router.push('/anunciar') }}
            />
          ) : (
            <Vazio
              icone="send-outline"
              titulo="Você ainda não propôs trocas"
              texto="Encontre algo no mural e toque em Propor troca."
              acao={{ titulo: 'Ver anúncios', onPress: () => router.push('/inicio') }}
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  abas: { flexDirection: 'row', gap: espaco.sm, paddingHorizontal: espaco.lg, paddingTop: espaco.sm, paddingBottom: espaco.md },
  lista: { padding: espaco.lg, paddingTop: 0, gap: espaco.md, paddingBottom: espaco.xxl },
});
