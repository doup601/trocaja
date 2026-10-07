import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@/components/Avatar';
import { Chip } from '@/components/Chip';
import { Etiqueta } from '@/components/Etiqueta';
import { Txt } from '@/components/Txt';
import { Vazio } from '@/components/Vazio';
import type { Categoria, Modalidade } from '@/services/types';
import { useApp } from '@/store/AppContext';
import { cores, espaco, fontes, raio, tamanhos } from '@/theme/tokens';
import { categorias } from '@/utils/catalogo';
import { filtrarItens } from '@/utils/filtros';
import { primeiroNome } from '@/utils/formatadores';

// Inclinações alternadas: as etiquetas parecem presas à mão no mural.
const INCLINACOES = [-1.2, 0.8, 0.6, -0.9];

export default function Inicio() {
  const { usuario, itens, carregando, erro, recarregar } = useApp();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [modalidade, setModalidade] = useState<Modalidade | null>(null);

  const visiveis = useMemo(
    () => filtrarItens(itens, { busca, categoria, modalidade, excluirDonoId: usuario?.id }),
    [itens, busca, categoria, modalidade, usuario?.id],
  );

  if (!usuario) return null;
  const temFiltro = !!busca || !!categoria || !!modalidade;

  const cabecalho = (
    <View style={styles.cabecalho}>
      <View style={styles.saudacao}>
        <Txt variante="titulo" style={{ flex: 1 }}>
          Oi, {primeiroNome(usuario.nome)}. O que vai passar adiante hoje?
        </Txt>
        <Avatar nome={usuario.nome} tamanho={44} />
      </View>

      <View style={styles.busca}>
        <MaterialCommunityIcons name="magnify" size={22} color={cores.grafiteSuave} />
        <TextInput
          accessibilityLabel="Buscar anúncios"
          placeholder="Buscar livro, calculadora, jaleco…"
          placeholderTextColor={cores.grafiteSuave}
          value={busca}
          onChangeText={setBusca}
          style={styles.buscaInput}
          returnKeyType="search"
        />
      </View>

      <View style={styles.linhaFiltro}>
        <Chip rotulo="Tudo" ativo={!modalidade} onPress={() => setModalidade(null)} />
        <Chip rotulo="Troca" ativo={modalidade === 'troca'} onPress={() => setModalidade('troca')} />
        <Chip rotulo="Doação" ativo={modalidade === 'doacao'} onPress={() => setModalidade('doacao')} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.linhaFiltro}>
        {categorias.map((c) => (
          <Chip
            key={c.id}
            rotulo={c.rotulo}
            icone={c.icone}
            ativo={categoria === c.id}
            onPress={() => setCategoria(categoria === c.id ? null : c.id)}
          />
        ))}
      </ScrollView>

      {erro && (
        <Txt variante="pequeno" cor={cores.vermelhoErro}>
          {erro} Puxe a lista para baixo para tentar de novo.
        </Txt>
      )}
      <Txt variante="pequeno" cor={cores.grafiteSuave}>
        {visiveis.length} {visiveis.length === 1 ? 'anúncio disponível' : 'anúncios disponíveis'}
      </Txt>
    </View>
  );

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <FlatList
        data={visiveis}
        keyExtractor={(i) => i.id}
        numColumns={2}
        ListHeaderComponent={cabecalho}
        columnWrapperStyle={styles.coluna}
        contentContainerStyle={styles.lista}
        refreshControl={<RefreshControl refreshing={carregando} onRefresh={recarregar} tintColor={cores.azulCaneta} />}
        renderItem={({ item, index }) => {
          const etiqueta = (
            <Etiqueta
              item={item}
              inclinacao={INCLINACOES[index % INCLINACOES.length]}
              onPress={() => router.push({ pathname: '/item/[id]', params: { id: item.id } })}
            />
          );
          // Última etiqueta sozinha na linha: mantém a largura de meia coluna.
          const sozinha = visiveis.length % 2 === 1 && index === visiveis.length - 1;
          return sozinha ? (
            <View style={[styles.coluna, { flex: 1, flexDirection: 'row' }]}>
              {etiqueta}
              <View style={{ flex: 1 }} />
            </View>
          ) : (
            etiqueta
          );
        }}
        ListEmptyComponent={
          carregando ? null : temFiltro ? (
            <Vazio
              icone="tag-search-outline"
              titulo="Nada com esse filtro"
              texto="Tente outra palavra ou limpe os filtros para ver todos os anúncios."
              acao={{ titulo: 'Limpar filtros', onPress: () => { setBusca(''); setCategoria(null); setModalidade(null); } }}
            />
          ) : (
            <Vazio
              icone="tag-plus-outline"
              titulo="Ainda não há anúncios"
              texto="Seja a primeira pessoa do campus a anunciar algo."
              acao={{ titulo: 'Anunciar um item', onPress: () => router.push('/anunciar') }}
            />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  lista: { padding: espaco.lg, gap: espaco.lg, paddingBottom: espaco.xxl },
  coluna: { gap: espaco.md },
  cabecalho: { gap: espaco.md, marginBottom: espaco.sm },
  saudacao: { flexDirection: 'row', alignItems: 'flex-start', gap: espaco.md },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    backgroundColor: cores.branco,
    borderRadius: raio.campo,
    borderWidth: 1.5,
    borderColor: cores.grafite,
    paddingHorizontal: espaco.md,
    height: 50,
  },
  // outlineWidth: remove o contorno de foco duplicado no navegador (a caixa já tem borda).
  buscaInput: { flex: 1, fontFamily: fontes.texto, fontSize: tamanhos.corpo, color: cores.grafite, height: '100%', outlineWidth: 0 },
  linhaFiltro: { flexDirection: 'row', gap: espaco.sm },
});
