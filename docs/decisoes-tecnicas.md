# Decisões técnicas — TrocaJá

## Stack

| Camada | Escolha | Versão |
| --- | --- | --- |
| Framework | Expo (React Native) com TypeScript | SDK 57 · RN 0.86 · React 19.2 |
| Navegação | Expo Router (rotas por arquivo) | 57 |
| Ícones | `@expo/vector-icons` (MaterialCommunityIcons) | 15 |
| Gráficos vetoriais | `react-native-svg` (logo e contorno das etiquetas) | 15 |
| Fontes | `@expo-google-fonts` (Bricolage Grotesque, Figtree) + `expo-font` | — |
| Banco de dados | Supabase (Postgres) via `@supabase/supabase-js` | 2 |
| Testes | Jest + `jest-expo` + React Native Testing Library | Jest 29 · RNTL 14 |
| Web | `react-native-web` (mesmo código roda no navegador) | 0.21 |

## Arquitetura

```
src/
├── app/            rotas (Expo Router): cada arquivo é uma tela
├── components/     componentes visuais reutilizáveis (Etiqueta, Botao, Campo…)
├── data/mock/      dados mockados em JSON (usuários, itens, propostas)
├── services/       camada de dados: contrato + implementações mock e Supabase
├── store/          estado global (React Context)
├── theme/          tokens de design (cores, fontes, espaçamentos)
└── utils/          funções puras: filtros, formatação, validação, catálogo
```

### Camada de dados com Repository

As telas nunca acessam o banco diretamente. Elas usam o `AppContext`, que conversa com a interface `Repositorio` (`src/services/types.ts`). Existem duas implementações:

- `mockRepository.ts`: lê os JSON de `src/data/mock`, guarda em memória e simula latência de rede (250 ms).
- `supabaseRepository.ts`: mesmas operações no Postgres do Supabase, convertendo `snake_case` ↔ `camelCase`.

`src/services/index.ts` escolhe a implementação: **com** as variáveis `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` no `.env`, usa Supabase; **sem** elas, usa o mock. Assim o protótipo roda sem nenhuma configuração e a troca para o banco real não muda nenhuma tela. O Perfil mostra qual fonte está ativa.

**Por quê:** a CP5 pede ao mesmo tempo dados mockados e integração com banco. O padrão Repository atende os dois sem duplicar lógica, e na CP6 basta desligar o mock.

### Dados mockados

- 6 estudantes, 16 anúncios (troca e doação, 6 categorias, 3 condições, 2 reservados) e 6 propostas em todos os status.
- O script `npm run gerar:seed` gera `supabase/seed.sql` e `mock-api/db.json` a partir dos mesmos JSON, então mock, Supabase e json-server nunca divergem.
- `npm run mock:api` sobe o json-server em `http://localhost:3001` como alternativa de API mock REST.

### Estado global com Context

O app tem um único domínio pequeno (usuário, itens, propostas), então React Context + `useState` é suficiente. Bibliotecas como Redux ou Zustand seriam peso extra nesta fase.

### Supabase sem Auth na CP5

O protótipo usa "login" por e-mail sem senha para facilitar a demonstração, por isso as políticas de RLS em `supabase/schema.sql` estão abertas para o papel `anon`. **Isso é intencional e documentado só para o protótipo.** Na CP6 o plano é usar Supabase Auth e trocar as políticas por regras com `auth.uid()`.

Pelo mesmo motivo o cliente Supabase é criado com `persistSession: false` e não instalamos `expo-sqlite` para guardar sessão.

### Ilustração no lugar de fotos

Cada anúncio tem uma cor e o ícone da categoria em vez de foto. Mantém o protótipo leve, sem upload nem armazenamento de imagens, e reforça a identidade visual. Fotos pela câmera entram na CP6 (`expo-image-picker` + Supabase Storage).

### Etiqueta desenhada com SVG

O card de anúncio mede o próprio tamanho (`onLayout`) e desenha o contorno de etiqueta com `react-native-svg`. Assim os cantos chanfrados ficam corretos em qualquer largura de tela.

## Problemas encontrados e soluções

| Problema | Solução |
| --- | --- |
| `expo install` não alcançava a API da Expo na rede da faculdade/sandbox | `EXPO_OFFLINE=1 npx expo install …` usa a tabela de versões que já vem no pacote `expo` |
| RNTL 14 tornou `render`, `fireEvent` e `act` assíncronos | Todos os testes usam `await render(...)`; dependência `test-renderer@1.2` (React 19.2) |
| `expo-font` exige `expo-asset`, que não veio instalado | O teste de componente acusou; adicionamos `expo-asset` (no Android o app quebraria sem ele) |
| Rótulos das abas cortados no web | Altura da barra calculada como `62 + insets.bottom` com `useSafeAreaInsets` |
| Contorno de foco duplicado no campo de busca (web) | `outlineWidth: 0` no `TextInput`, que já tem borda própria |
