import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Botao } from '@/components/Botao';
import { Campo } from '@/components/Campo';
import { ItemArte } from '@/components/ItemArte';
import { Txt } from '@/components/Txt';
import { Vazio } from '@/components/Vazio';
import { useApp } from '@/store/AppContext';
import { cores, espaco, raio } from '@/theme/tokens';

function avisar(titulo: string, texto: string) {
  if (Platform.OS === 'web') window.alert(`${titulo}\n\n${texto}`);
  else Alert.alert(titulo, texto);
}

export default function Propor() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { itens, usuario, usuarios, proporTroca } = useApp();
  const item = itens.find((i) => i.id === id);
  const [oferecido, setOferecido] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  if (!item || !usuario) {
    return <Vazio icone="tag-off-outline" titulo="Anúncio não encontrado" texto="Volte e escolha outro item." />;
  }

  const ehTroca = item.modalidade === 'troca';
  const meusItens = itens.filter((i) => i.donoId === usuario.id && i.status === 'disponivel');
  const dono = usuarios[item.donoId];

  async function enviar() {
    if (!item) return;
    if (ehTroca && !oferecido) return setErro('Escolha um dos seus itens para oferecer.');
    if (mensagem.trim().length < 5) return setErro('Escreva uma mensagem curta para o dono do item.');
    setErro(null);
    setEnviando(true);
    try {
      await proporTroca(item, ehTroca ? oferecido : null, mensagem);
      avisar('Proposta enviada', `${dono?.nome ?? 'O dono'} vai ver sua proposta na aba Trocas.`);
      router.back();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível enviar a proposta.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: ehTroca ? 'Propor troca' : 'Pedir doação' }} />
      <View style={styles.alvo}>
        <ItemArte item={item} tamanho={28} style={{ width: 56, height: 56 }} />
        <View style={{ flex: 1 }}>
          <Txt variante="pequeno" cor={cores.grafiteSuave}>
            Você quer
          </Txt>
          <Txt variante="corpoForte">{item.titulo}</Txt>
        </View>
      </View>

      {ehTroca && (
        <View style={{ gap: espaco.sm }}>
          <Txt variante="subtitulo">O que você oferece?</Txt>
          <Txt variante="pequeno" cor={cores.grafiteSuave}>
            {dono?.nome.split(' ')[0] ?? 'O dono'} aceita: {item.aceitaEmTroca}
          </Txt>
          {meusItens.length === 0 ? (
            <Vazio
              icone="tag-plus-outline"
              titulo="Você ainda não tem itens para oferecer"
              texto="Anuncie algo seu primeiro e depois volte para propor a troca."
              acao={{ titulo: 'Anunciar um item', onPress: () => router.replace('/anunciar') }}
            />
          ) : (
            meusItens.map((meu) => {
              const ativo = oferecido === meu.id;
              return (
                <Pressable
                  key={meu.id}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: ativo }}
                  onPress={() => setOferecido(meu.id)}
                  style={[styles.opcao, ativo && styles.opcaoAtiva]}
                >
                  <ItemArte item={meu} tamanho={22} style={{ width: 44, height: 44 }} />
                  <Txt variante="corpoForte" style={{ flex: 1 }}>
                    {meu.titulo}
                  </Txt>
                  <MaterialCommunityIcons
                    name={ativo ? 'radiobox-marked' : 'radiobox-blank'}
                    size={24}
                    color={ativo ? cores.azulCaneta : cores.grafiteSuave}
                  />
                </Pressable>
              );
            })
          )}
        </View>
      )}

      <Campo
        rotulo="Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
        placeholder={ehTroca ? 'Ex.: Posso entregar na terça, no intervalo.' : 'Conte por que o item ajudaria você.'}
      />
      {erro && (
        <Txt variante="pequeno" cor={cores.vermelhoErro}>
          {erro}
        </Txt>
      )}
      <Botao titulo="Enviar proposta" onPress={enviar} carregando={enviando} testID="botao-enviar-proposta" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  conteudo: { padding: espaco.lg, gap: espaco.lg, paddingBottom: espaco.xxl },
  alvo: { flexDirection: 'row', alignItems: 'center', gap: espaco.md },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    padding: espaco.sm,
    borderRadius: raio.campo,
    borderWidth: 1.5,
    borderColor: cores.linha,
    backgroundColor: cores.branco,
  },
  opcaoAtiva: { borderColor: cores.azulCaneta },
});
