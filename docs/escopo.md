# Documento de escopo — TrocaJá

## Problema

Todo semestre, estudantes compram material que usam por poucos meses: livros de disciplinas do ciclo básico, calculadoras científicas, jalecos, réguas T, cadeiras e mesas para a república. Quando a disciplina acaba, esses itens ficam parados em casa, enquanto calouros do mesmo campus compram tudo de novo.

Hoje a troca entre estudantes acontece em grupos de WhatsApp e murais físicos:

- os anúncios se perdem no meio das conversas e não há busca;
- não dá para saber se o item ainda está disponível;
- não há um jeito simples de propor "troco isto por aquilo";
- marketplaces gerais (venda com dinheiro, frete, desconhecidos de outras cidades) não combinam com quem quer só passar algo adiante para alguém do campus.

## Público-alvo

Estudantes de graduação em São Paulo, principalmente:

- **calouros**, que precisam montar o kit de material do curso gastando pouco;
- **veteranos**, que querem liberar espaço e ajudar quem está chegando;
- estudantes que moram em república ou longe da família, para quem um móvel ou uma mochila doada faz diferença no orçamento.

### Persona

**Lia, 20 anos, 3º semestre de Engenharia de Software.** Tem um Arduino e livros do primeiro ano parados na estante. Precisa de um kit de sensores para o projeto de IoT. Já tentou anunciar no grupo da turma, mas a mensagem sumiu em uma hora. Quer algo rápido, que mostre o que está disponível perto dela e organize as propostas.

## Proposta de valor

> O TrocaJá é o mural de trocas do campus: você anuncia o que não usa mais, encontra o que precisa com gente da sua faculdade e combina a troca ou a doação sem dinheiro envolvido.

- **Sem dinheiro:** só troca ou doação, o que reduz golpes e negociação.
- **Perto de você:** cada anúncio mostra o campus do dono.
- **Proposta estruturada:** você escolhe qual item seu oferece; o dono aceita ou recusa com um toque.
- **Estado sempre claro:** itens com troca combinada saem do mural automaticamente.

## Escopo do MVP (CP4 → CP6)

| Funcionalidade | CP5 (protótipo) | CP6 (final) |
| --- | --- | --- |
| Entrar com conta demo ou cadastro rápido | ✅ | Login real com Supabase Auth |
| Mural de anúncios com busca e filtros (modalidade e categoria) | ✅ | ✅ |
| Detalhe do anúncio com dono, campus e o que aceita em troca | ✅ | ✅ |
| Publicar anúncio (troca ou doação) com validação | ✅ | + foto pela câmera |
| Propor troca escolhendo um item próprio / pedir doação | ✅ | ✅ |
| Aceitar, recusar e cancelar propostas | ✅ | + notificação push |
| Perfil com anúncios e contadores | ✅ | + editar perfil |
| Dados mockados (JSON) e integração Supabase | ✅ | Só Supabase |

### Fora do escopo

- Venda com dinheiro, pagamento ou frete.
- Chat em tempo real (a combinação é pela mensagem da proposta).
- Moderação automática de anúncios.
