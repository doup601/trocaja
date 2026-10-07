# Telas e fluxos de navegação — TrocaJá

Navegação com **Expo Router** (rotas por arquivo em `src/app/`): uma pilha (Stack) na raiz e quatro abas (Tabs) depois do login.

## Mapa de rotas

| Rota | Arquivo | Tela |
| --- | --- | --- |
| `/` | `src/app/index.tsx` | Entrar (conta demo ou cadastro) |
| `/inicio` | `src/app/(tabs)/inicio.tsx` | Mural de anúncios, busca e filtros |
| `/anunciar` | `src/app/(tabs)/anunciar.tsx` | Formulário de novo anúncio |
| `/trocas` | `src/app/(tabs)/trocas.tsx` | Propostas recebidas e enviadas |
| `/perfil` | `src/app/(tabs)/perfil.tsx` | Dados do usuário e meus anúncios |
| `/item/[id]` | `src/app/item/[id].tsx` | Detalhe do anúncio |
| `/propor/[id]` | `src/app/propor/[id].tsx` | Propor troca / pedir doação (modal) |

## Fluxo principal

```mermaid
flowchart TD
    A[Entrar] -->|conta demo ou cadastro| B[Início: mural]
    B -->|toca numa etiqueta| C[Detalhe do anúncio]
    C -->|Propor troca / Pedir doação| D[Modal: escolher item + mensagem]
    D -->|Enviar proposta| C
    B -.aba.-> E[Anunciar]
    E -->|Publicar anúncio| C
    B -.aba.-> F[Trocas]
    F -->|Aceitar| G[Item reservado + outras propostas recusadas]
    F -->|Recusar / Cancelar| F
    B -.aba.-> H[Perfil]
    H -->|toca num anúncio| C
    H -->|Sair| A
```

## Regras de negócio refletidas nas telas

- O mural mostra só itens **disponíveis** e esconde os anúncios do próprio usuário.
- A busca ignora acentos e maiúsculas e procura em título, descrição e "aceita em troca".
- Em **troca**, a pessoa precisa oferecer um item seu disponível; em **doação**, só a mensagem.
- Não é possível propor duas vezes para o mesmo item enquanto a primeira estiver pendente.
- **Aceitar** uma proposta reserva o item e recusa as outras propostas pendentes para ele.
- O badge da aba Trocas conta as propostas **recebidas pendentes**.

## Telas (protótipo rodando no navegador)

| Entrar | Início | Busca "calculo" |
| --- | --- | --- |
| ![](img/prints/01-entrar.png) | ![](img/prints/02-inicio.png) | ![](img/prints/03-busca.png) |

| Detalhe | Propor troca | Proposta enviada |
| --- | --- | --- |
| ![](img/prints/04-detalhe.png) | ![](img/prints/05-propor.png) | ![](img/prints/06-proposta-enviada.png) |

| Trocas recebidas | Proposta aceita | Enviadas |
| --- | --- | --- |
| ![](img/prints/07-trocas-recebidas.png) | ![](img/prints/08-trocas-aceita.png) | ![](img/prints/09-trocas-enviadas.png) |

| Validação do anúncio | Anúncio preenchido | Anúncio publicado |
| --- | --- | --- |
| ![](img/prints/10-anunciar-validacao.png) | ![](img/prints/11-anunciar-preenchido.png) | ![](img/prints/12-anuncio-publicado.png) |

| Perfil |
| --- |
| ![](img/prints/13-perfil.png) |

Vídeo do fluxo completo: [`img/fluxo-cp5.mp4`](img/fluxo-cp5.mp4).

## Rodando com o Supabase

| Perfil com fonte Supabase | Tabela `itens` com o anúncio criado no app |
| --- | --- |
| ![](img/prints/14-supabase-perfil.png) | ![](img/prints/15-supabase-table-editor.png) |
