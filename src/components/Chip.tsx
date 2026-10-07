import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { cores, espaco, raio } from '@/theme/tokens';
import { Txt } from './Txt';

interface Props {
  rotulo: string;
  ativo: boolean;
  onPress: () => void;
  icone?: string;
}

export function Chip({ rotulo, ativo, onPress, icone }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: ativo }}
      onPress={onPress}
      style={[styles.chip, ativo && styles.ativo]}
    >
      {icone && (
        <MaterialCommunityIcons
          name={icone as keyof typeof MaterialCommunityIcons.glyphMap}
          size={16}
          color={ativo ? cores.branco : cores.grafite}
        />
      )}
      <Txt variante="rotulo" cor={ativo ? cores.branco : cores.grafite}>
        {rotulo}
      </Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: espaco.md,
    height: 36,
    borderRadius: raio.pilula,
    borderWidth: 1.5,
    borderColor: cores.grafite,
    backgroundColor: cores.branco,
  },
  ativo: { backgroundColor: cores.grafite },
});
