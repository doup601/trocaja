import Svg, { Circle, Path } from 'react-native-svg';
import { cores } from '@/theme/tokens';

/** Símbolo do TrocaJá (mesmo desenho de assets/brand/logo-mark.svg). */
export function Logo({ tamanho = 40 }: { tamanho?: number }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 512 512" accessibilityLabel="TrocaJá">
      <Path d="M176 96 H336 L428 188 V420 Q428 456 392 456 H120 Q84 456 84 420 V188 Z" fill={cores.azulCaneta} />
      <Circle cx={256} cy={160} r={24} fill={cores.papel} stroke={cores.grafite} strokeWidth={8} />
      <Path d="M256 168 C 246 96, 300 56, 356 42" fill="none" stroke={cores.grafite} strokeWidth={12} strokeLinecap="round" />
      <Path d="M146 300 H332" fill="none" stroke={cores.marcaTexto} strokeWidth={36} strokeLinecap="round" />
      <Path d="M300 258 L352 300 L300 342" fill="none" stroke={cores.marcaTexto} strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M366 388 H180" fill="none" stroke={cores.branco} strokeWidth={36} strokeLinecap="round" />
      <Path d="M212 346 L160 388 L212 430" fill="none" stroke={cores.branco} strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
