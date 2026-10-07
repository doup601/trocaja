import { criarRepositorioMock } from './mockRepository';
import type { Repositorio } from './types';

export * from './types';

/**
 * Escolhe a fonte de dados:
 * - com EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY no .env → Supabase
 * - sem elas → mock local (JSON), para rodar o protótipo sem configurar nada.
 */
export function criarRepositorio(): Repositorio {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const chave = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (url && chave) {
    // require dinâmico: o cliente do Supabase só é carregado quando configurado.
    const { criarRepositorioSupabase } =
      require('./supabaseRepository') as typeof import('./supabaseRepository');
    return criarRepositorioSupabase(url, chave);
  }
  return criarRepositorioMock();
}
