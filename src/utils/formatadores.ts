const MINUTO = 60_000;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;

/** "agora", "há 5 min", "há 3 h", "ontem", "há 4 dias" ou a data (dd/mm). */
export function tempoRelativo(iso: string, agora: Date = new Date()): string {
  const diff = agora.getTime() - new Date(iso).getTime();
  if (diff < MINUTO) return 'agora';
  if (diff < HORA) return `há ${Math.floor(diff / MINUTO)} min`;
  if (diff < DIA) return `há ${Math.floor(diff / HORA)} h`;
  const dias = Math.floor(diff / DIA);
  if (dias === 1) return 'ontem';
  if (dias < 7) return `há ${dias} dias`;
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/** "Lia Moreira" → "LM"; "Caio" → "CA". */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

/** "Lia Moreira" → "Lia". */
export const primeiroNome = (nome: string) => nome.trim().split(/\s+/)[0] ?? nome;
