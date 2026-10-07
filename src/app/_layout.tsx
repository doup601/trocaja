import {
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_700Bold,
} from '@expo-google-fonts/figtree';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { AppProvider } from '@/store/AppContext';
import { cores, fontes } from '@/theme/tokens';

export default function RootLayout() {
  const [fontesProntas] = useFonts({
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_700Bold,
  });

  if (!fontesProntas) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: cores.papel }}>
        <ActivityIndicator color={cores.azulCaneta} />
      </View>
    );
  }

  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: cores.papel },
          headerShadowVisible: false,
          headerTintColor: cores.grafite,
          headerTitleStyle: { fontFamily: fontes.tituloMedio },
          headerBackTitle: 'Voltar',
          contentStyle: { backgroundColor: cores.papel },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="item/[id]" options={{ title: 'Anúncio' }} />
        <Stack.Screen name="propor/[id]" options={{ title: 'Propor troca', presentation: 'modal' }} />
      </Stack>
    </AppProvider>
  );
}
