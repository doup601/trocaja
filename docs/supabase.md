# Configurando o Supabase — TrocaJá

Sem esta configuração o app funciona com os dados mockados. Siga os passos abaixo para usar o banco real.

> **Projeto do grupo:** `trocaja` (região São Paulo, `sa-east-1`), URL `https://hgezneeuwitggrkudenh.supabase.co`, já com schema e seed aplicados (6 usuários, 16 itens, 6 propostas), mais 1 anúncio criado pelo app no teste de integração. Para rodar o app contra ele, só falta o passo 3 com a *publishable key*, que o grupo compartilha por fora do repositório. Os passos 1 e 2 servem para quem quiser montar um banco próprio.

## 1. Criar o projeto

1. Entre em [supabase.com](https://supabase.com) e crie um projeto (plano gratuito).
2. Anote a senha do banco em um lugar seguro (não vai para o repositório).

## 2. Criar as tabelas e carregar os dados

1. No painel do projeto, abra **SQL Editor**.
2. Cole o conteúdo de [`supabase/schema.sql`](../supabase/schema.sql) e execute.
3. Cole o conteúdo de [`supabase/seed.sql`](../supabase/seed.sql) e execute.
4. Em **Table Editor** devem aparecer `usuarios` (6), `itens` (16) e `propostas` (6).

> O schema e o seed foram testados em Postgres antes da entrega: as constraints recusam título com menos de 3 letras e proposta para si mesmo.

## 3. Ligar o app ao projeto

1. No painel, abra **Project Settings → API** (ou **Connect**) e copie a **Project URL** e a **publishable key** (em projetos antigos, a chave `anon public`).
2. Na raiz do repositório, copie o modelo:

   ```bash
   cp .env.example .env
   ```

3. Preencha:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

4. Reinicie o Metro limpando o cache: `npx expo start --clear`.
5. Entre com a conta demo e abra **Perfil**: o rodapé deve dizer **Fonte de dados: Supabase (Postgres)**.

> A chave publishable é pública por definição (vai dentro do app), mas o arquivo `.env` está no `.gitignore` para manter cada ambiente separado. **Nunca** coloque a chave `service_role` no app.

## 4. Conferir a integração

- Publique um anúncio no app → ele aparece na tabela `itens`.
- Aceite uma proposta na aba Trocas → `propostas.status` vira `aceita` e o item vira `reservado`.

## Regerar o seed

Se mudarem os JSON em `src/data/mock`, rode `npm run gerar:seed` e execute o novo `seed.sql`.
