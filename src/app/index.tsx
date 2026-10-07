import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Botao } from '@/components/Botao';
import { Campo } from '@/components/Campo';
import { Logo } from '@/components/Logo';
import { Txt } from '@/components/Txt';
import { EMAIL_DEMO, useApp } from '@/store/AppContext';
import { cores, espaco } from '@/theme/tokens';
import { semErros, validarCadastro, type ErrosCadastro, type FormCadastro } from '@/utils/validacao';

/** Tela de entrada: conta demo ou cadastro rápido (sem senha no protótipo). */
export default function Entrar() {
  const { entrar, cadastrar, fonte } = useApp();
  const [modoCadastro, setModoCadastro] = useState(false);
  const [form, setForm] = useState<FormCadastro>({ nome: '', email: '', curso: '', campus: '' });
  const [erros, setErros] = useState<ErrosCadastro>({});
  const [enviando, setEnviando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const alterar = (campo: keyof FormCadastro) => (valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: undefined }));
  };

  async function usarDemo() {
    setEnviando(true);
    setFalha(null);
    try {
      const ok = await entrar(EMAIL_DEMO);
      if (ok) router.replace('/inicio');
      else setFalha('A conta demo não existe na base. Rode o supabase/seed.sql.');
    } catch (e) {
      setFalha(e instanceof Error ? e.message : 'Não foi possível entrar.');
    } finally {
      setEnviando(false);
    }
  }

  async function criarConta() {
    const v = validarCadastro(form);
    setErros(v);
    if (!semErros(v)) return;
    setEnviando(true);
    setFalha(null);
    try {
      await cadastrar({
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        curso: form.curso.trim(),
        campus: form.campus.trim(),
      });
      router.replace('/inicio');
    } catch (e) {
      setFalha(e instanceof Error ? e.message : 'Não foi possível criar a conta.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.tela}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
          <View style={styles.marca}>
            <Logo tamanho={88} />
            <Txt variante="display">TrocaJá</Txt>
          </View>
          <Txt variante="titulo">O que sobra na sua estante falta na de alguém do campus.</Txt>
          <Txt cor={cores.grafiteSuave}>
            Troque ou doe livros, calculadoras, jalecos e móveis com estudantes perto de você.
          </Txt>

          {modoCadastro ? (
            <View style={styles.form}>
              <Campo rotulo="Nome e sobrenome" value={form.nome} onChangeText={alterar('nome')} erro={erros.nome} autoComplete="name" />
              <Campo
                rotulo="E-mail"
                value={form.email}
                onChangeText={alterar('email')}
                erro={erros.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <Campo rotulo="Curso" value={form.curso} onChangeText={alterar('curso')} erro={erros.curso} placeholder="Ex.: Engenharia de Software" />
              <Campo rotulo="Campus" value={form.campus} onChangeText={alterar('campus')} erro={erros.campus} placeholder="Ex.: FIAP Paulista" />
              <Botao titulo="Criar conta" onPress={criarConta} carregando={enviando} testID="botao-criar-conta" />
              <Botao titulo="Já tenho conta demo" tipo="texto" onPress={() => setModoCadastro(false)} />
            </View>
          ) : (
            <View style={styles.form}>
              <Botao titulo="Entrar com a conta demo" onPress={usarDemo} carregando={enviando} testID="botao-demo" />
              <Botao titulo="Criar minha conta" tipo="secundario" onPress={() => setModoCadastro(true)} />
            </View>
          )}

          {falha && (
            <Txt variante="pequeno" cor={cores.vermelhoErro}>
              {falha}
            </Txt>
          )}
          <Txt variante="pequeno" cor={cores.grafiteSuave} style={styles.fonte}>
            Protótipo · dados {fonte === 'supabase' ? 'do Supabase' : 'mockados localmente'}
          </Txt>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.papel },
  conteudo: { padding: espaco.xl, gap: espaco.lg, flexGrow: 1, justifyContent: 'center', maxWidth: 520, width: '100%', alignSelf: 'center' },
  marca: { flexDirection: 'row', alignItems: 'center', gap: espaco.md, marginBottom: espaco.sm },
  form: { gap: espaco.md, marginTop: espaco.md },
  fonte: { textAlign: 'center', marginTop: espaco.md },
});
