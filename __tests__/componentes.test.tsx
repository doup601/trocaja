import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import itensJson from '@/data/mock/itens.json';
import { Botao } from '@/components/Botao';
import { Etiqueta } from '@/components/Etiqueta';
import { criarRepositorioMock } from '@/services/mockRepository';
import type { Item } from '@/services/types';
import { AppProvider, EMAIL_DEMO, useApp } from '@/store/AppContext';

const itens = itensJson as Item[];

describe('<Etiqueta />', () => {
  it('mostra título, modalidade e condição e responde ao toque', async () => {
    const onPress = jest.fn();
    await render(<Etiqueta item={itens[0]} onPress={onPress} />);
    expect(screen.getByText('Cálculo Vol. 1 (Stewart)')).toBeTruthy();
    expect(screen.getByText('Troca')).toBeTruthy();
    expect(screen.getByText('Seminovo')).toBeTruthy();
    await fireEvent.press(screen.getByTestId('etiqueta-i1'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('mostra "Doação" em itens doados', async () => {
    await render(<Etiqueta item={itens[2]} onPress={() => {}} />);
    expect(screen.getByText('Doação')).toBeTruthy();
  });
});

describe('<Botao />', () => {
  it('não dispara quando desabilitado', async () => {
    const onPress = jest.fn();
    await render(<Botao titulo="Enviar" onPress={onPress} desabilitado testID="b" />);
    await fireEvent.press(screen.getByTestId('b'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

/** Componente de teste que expõe o contexto para os asserts. */
let ctx: ReturnType<typeof useApp>;
function Espiao() {
  ctx = useApp();
  return <Text>{ctx.usuario?.nome ?? 'deslogado'}</Text>;
}

describe('AppContext (fluxo principal com mock)', () => {
  // RNTL 14: render é assíncrono.
  const montar = () =>
    render(
      <AppProvider repositorio={criarRepositorioMock({ latencia: 0 })}>
        <Espiao />
      </AppProvider>,
    );

  it('entra com a conta demo e carrega itens e propostas', async () => {
    await montar();
    expect(screen.getByText('deslogado')).toBeTruthy();
    await act(async () => {
      await ctx.entrar(EMAIL_DEMO);
    });
    await waitFor(() => expect(screen.getByText('Lia Moreira')).toBeTruthy());
    expect(ctx.itens).toHaveLength(16);
    expect(ctx.propostas.length).toBeGreaterThan(0);
  });

  it('anuncia um item com o campus do usuário', async () => {
    await montar();
    await act(async () => {
      await ctx.entrar(EMAIL_DEMO);
    });
    let novo: Item | undefined;
    await act(async () => {
      novo = await ctx.anunciar({
        titulo: 'Fone com fio',
        descricao: 'Funciona bem.',
        categoria: 'eletronicos',
        condicao: 'usado',
        modalidade: 'doacao',
        aceitaEmTroca: '',
        cor: '#C9D4FF',
      });
    });
    expect(novo?.campus).toBe('FIAP Paulista');
    expect(ctx.itens[0].id).toBe(novo?.id);
  });

  it('propor troca cria proposta pendente para o dono do item', async () => {
    await montar();
    await act(async () => {
      await ctx.entrar(EMAIL_DEMO);
    });
    const calculo = ctx.itens.find((i) => i.id === 'i1')!;
    await act(async () => {
      await ctx.proporTroca(calculo, 'i7', 'Troco pelo Clean Code.');
    });
    expect(ctx.propostas[0]).toMatchObject({ itemId: 'i1', paraUsuarioId: 'u2', status: 'pendente', itemOferecidoId: 'i7' });
  });

  it('e-mail desconhecido não entra', async () => {
    await montar();
    let ok = true;
    await act(async () => {
      ok = await ctx.entrar('ninguem@x.com');
    });
    expect(ok).toBe(false);
    expect(screen.getByText('deslogado')).toBeTruthy();
  });
});
