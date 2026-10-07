import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import type { Item } from '@/services/types';
import { iconeCategoria } from '@/utils/catalogo';
import { cores, raio } from '@/theme/tokens';

/**
 * Ilustração do anúncio: bloco na cor do item com o ícone da categoria.
 * Substitui fotos no protótipo (CP5 usa dados mockados, sem upload).
 */
export function ItemArte({ item, tamanho = 64, style }: { item: Item; tamanho?: number; style?: ViewStyle }) {
  return (
    <View style={[styles.base, { backgroundColor: item.cor }, style]}>
      <MaterialCommunityIcons
        name={iconeCategoria(item.categoria) as keyof typeof MaterialCommunityIcons.glyphMap}
        size={tamanho}
        color={cores.grafite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: raio.campo, alignItems: 'center', justifyContent: 'center' },
});
