import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Botao } from '@/components/Botao';
import { ItemArte } from '@/components/ItemArte';
import { SeloModalidade } from '@/components/Selos';
import { Txt } from '@/components/Txt';
import { Vazio } from '@/components/Vazio';
import { useApp } from '@/store/AppContext';
import { cores, espaco, raio } from '@/theme/tokens';
import { rotuloStatusItem } from '@/utils/catalogo';

export default function Perfil() {
  const { usuario, itens, propostas, fonte, sair } = useApp();
  if (!usuario) return null;

  const meus = itens.filter((i) => i.donoId === usuario.id);
  const aceitas = propostas.filter((p) => p.status === 'aceita').length;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.cabecalho}>
        <Avatar nome={usuario.nome} tamanho={72} />
        <View style={{ flex: 1, gap: 2 }}>
          <Txt variante="titulo">{usuario.nome}</Txt>
          <Txt cor={cores.grafiteSuave}>{usuario.curso}</Txt>
          <Txt variante="pequeno" cor={cores.grafiteSuave}>
            {usuario.campus}
          </Txt>
        </View>
      </View>

      <View style={styles.numeros}>
        <Numero valor={meus.length} rotulo={meus.length === 1 ? 'anúncio' : 'anúncios'} />
        <Numero
          valor={usuario.trocasConcluidas}
          rotulo={usuario.trocasConcluidas === 1 ? 'troca concluída' : 'trocas concluídas'}
        />
        <Numero valor={aceitas} rotulo={aceitas === 1 ? 'proposta aceita' : 'propostas aceitas'} />
      </View>

      <Txt variante="subtitulo">Meus anúncios</Txt>
      {meus.length === 0 ? (
        <Vazio
          icone="tag-plus-outline"
          titulo="Nenhum anúncio ainda"
          texto="Anuncie algo que você não usa mais."
          acao={{ titulo: 'Anunciar um item', onPress: () => router.push('/anunciar') }}
        />
      ) : (
        meus.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push({ pathname: '/item/[id]', params: { id: item.id } })}
            style={styles.linhaItem}
            accessibilityRole="button"
          >
            <ItemArte item={item} tamanho={22} style={{ width: 48, height: 48 }} />
            <View style={{ flex: 1, gap: 4 }}>
              <Txt variante="corpoForte" numberOfLines={1}>
                {item.titulo}
              </Txt>
              <View style={{ flexDirection: 'row', gap: espaco.sm, alignItems: 'center' }}>
                <SeloModalidade modalidade={item.modalidade} />
                <Txt variante="pequeno" cor={cores.grafiteSuave}>
                  {rotuloStatusItem[item.status]}
                </Txt>
              </View>
            </View>
          </Pressable>
        ))
      )}

      <View style={styles.fonte}>
        <Txt variante="pequeno" cor={cores.grafiteSuave}>
          Fonte de dados: {fonte === 'supabase' ? 'Supabase (Postgres)' : 'mock local (JSON)'}
        </Txt>
      </View>
      <Botao
        titulo="Sair"
        tipo="secundario"
        onPress={() => {
          sair();
          router.replace('/');
        }}
      />
    </ScrollView>
  );
}

function Numero({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <View style={styles.numero}>
      <Txt variante="titulo" cor={cores.azulCaneta}>
        {valor}
      </Txt>
      <Txt variante="pequeno" cor={cores.grafiteSuave}>
        {rotulo}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  conteudo: { padding: espaco.lg, gap: espaco.lg, paddingBottom: espaco.xxl },
  cabecalho: { flexDirection: 'row', gap: espaco.lg, alignItems: 'center' },
  numeros: { flexDirection: 'row', gap: espaco.sm },
  numero: {
    flex: 1,
    backgroundColor: cores.branco,
    borderRadius: raio.campo,
    borderWidth: 1.5,
    borderColor: cores.linha,
    padding: espaco.md,
  },
  linhaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    backgroundColor: cores.branco,
    borderRadius: raio.campo,
    padding: espaco.sm,
    borderWidth: 1.5,
    borderColor: cores.linha,
  },
  fonte: { alignItems: 'center' },
});
