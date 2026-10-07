import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import type { ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/store/AppContext';
import { cores, fontes } from '@/theme/tokens';

type NomeIcone = keyof typeof MaterialCommunityIcons.glyphMap;

const icone =
  (nome: NomeIcone) =>
  ({ color, size }: { color: ColorValue; size: number }) => (
    <MaterialCommunityIcons name={nome} color={color} size={size} />
  );

export default function TabsLayout() {
  const { usuario, propostas } = useApp();
  const insets = useSafeAreaInsets();
  if (!usuario) return <Redirect href="/" />;

  const pendentesRecebidas = propostas.filter(
    (p) => p.paraUsuarioId === usuario.id && p.status === 'pendente',
  ).length;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: cores.papel },
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: fontes.tituloMedio, color: cores.grafite },
        tabBarActiveTintColor: cores.azulCaneta,
        tabBarInactiveTintColor: cores.grafiteSuave,
        tabBarLabelStyle: { fontFamily: fontes.textoMedio, fontSize: 12, lineHeight: 16 },
        // Altura calculada: ícone + rótulo + área segura inferior do aparelho.
        tabBarStyle: {
          backgroundColor: cores.branco,
          borderTopColor: cores.linha,
          height: 62 + insets.bottom,
          paddingTop: 6,
          paddingBottom: 6 + insets.bottom,
        },
        sceneStyle: { backgroundColor: cores.papel },
      }}
    >
      <Tabs.Screen name="inicio" options={{ title: 'Início', headerShown: false, tabBarIcon: icone('tag-multiple') }} />
      <Tabs.Screen name="anunciar" options={{ title: 'Anunciar', tabBarIcon: icone('plus-box') }} />
      <Tabs.Screen
        name="trocas"
        options={{
          title: 'Trocas',
          tabBarIcon: icone('swap-horizontal-bold'),
          tabBarBadge: pendentesRecebidas > 0 ? pendentesRecebidas : undefined,
          tabBarBadgeStyle: { backgroundColor: cores.rosaMarcaTexto, color: cores.grafite },
        }}
      />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icone('account-circle') }} />
    </Tabs>
  );
}
