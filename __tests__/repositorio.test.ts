import { criarRepositorioMock } from '@/services/mockRepository';
import { paraItem, paraProposta } from '@/services/supabaseRepository';

describe('repositório mock', () => {
  it('lista itens do mais novo para o mais antigo', async () => {
    const repo = criarRepositorioMock({ latencia: 0 });
    const itens = await repo.listarItens();
    const datas = itens.map((i) => i.criadoEm);
    expect(datas).toEqual([...datas].sort().reverse());
  });

  it('encontra usuário por e-mail sem diferenciar maiúsculas', async () => {
    const repo = criarRepositorioMock({ latencia: 0 });
    const u = await repo.obterUsuarioPorEmail('  DEMO@trocaja.app ');
    expect(u?.id).toBe('u1');
  });

  it('cria item como disponível e com data', async () => {
    const repo = criarRepositorioMock({ latencia: 0 });
    const item = await repo.criarItem({
      donoId: 'u1',
      titulo: 'Fone com fio',
      descricao: 'Funciona bem.',
      categoria: 'eletronicos',
      condicao: 'usado',
      modalidade: 'doacao',
      aceitaEmTroca: '',
      cor: '#C9D4FF',
      campus: 'FIAP Paulista',
    });
    expect(item.status).toBe('disponivel');
    expect(Date.parse(item.criadoEm)).not.toBeNaN();
    expect((await repo.listarItens()).some((i) => i.id === item.id)).toBe(true);
  });

  it('aceitar uma proposta reserva o item e recusa as concorrentes', async () => {
    const repo = criarRepositorioMock({ latencia: 0 });
    // segunda proposta pendente para o mesmo Arduino (i6)
    const concorrente = await repo.criarProposta({
      itemId: 'i6',
      deUsuarioId: 'u6',
      paraUsuarioId: 'u1',
      itemOferecidoId: null,
      mensagem: 'Também quero!',
    });

    await repo.atualizarStatusProposta('p1', 'aceita');

    const itens = await repo.listarItens();
    expect(itens.find((i) => i.id === 'i6')?.status).toBe('reservado');
    const propostas = await repo.listarPropostasDoUsuario('u1');
    expect(propostas.find((p) => p.id === 'p1')?.status).toBe('aceita');
    expect(propostas.find((p) => p.id === concorrente.id)?.status).toBe('recusada');
  });

  it('cada instância começa limpa (testes não vazam estado)', async () => {
    const a = criarRepositorioMock({ latencia: 0 });
    await a.atualizarStatusProposta('p1', 'recusada');
    const b = criarRepositorioMock({ latencia: 0 });
    const p1 = (await b.listarPropostasDoUsuario('u1')).find((p) => p.id === 'p1');
    expect(p1?.status).toBe('pendente');
  });

  it('erro claro ao responder proposta inexistente', async () => {
    const repo = criarRepositorioMock({ latencia: 0 });
    await expect(repo.atualizarStatusProposta('nao-existe', 'aceita')).rejects.toThrow('não encontrada');
  });
});

describe('mapeamento Supabase (snake_case → camelCase)', () => {
  it('converte uma linha de itens', () => {
    const item = paraItem({
      id: 'i1',
      dono_id: 'u2',
      titulo: 'Livro',
      descricao: 'd',
      categoria: 'livros',
      condicao: 'novo',
      modalidade: 'troca',
      aceita_em_troca: 'outro livro',
      cor: '#FFF',
      campus: 'X',
      status: 'disponivel',
      criado_em: '2026-10-01T00:00:00Z',
    });
    expect(item).toMatchObject({ donoId: 'u2', aceitaEmTroca: 'outro livro', criadoEm: '2026-10-01T00:00:00Z' });
  });

  it('mantém item_oferecido_id nulo em pedidos de doação', () => {
    const p = paraProposta({
      id: 'p',
      item_id: 'i',
      de_usuario_id: 'a',
      para_usuario_id: 'b',
      item_oferecido_id: null,
      mensagem: '',
      status: 'pendente',
      criada_em: '2026-10-01T00:00:00Z',
    });
    expect(p.itemOferecidoId).toBeNull();
  });
});
