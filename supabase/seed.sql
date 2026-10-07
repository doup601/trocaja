-- Gerado por scripts/gerar-seed.js a partir de src/data/mock — não edite à mão.
-- Rode no SQL Editor do Supabase depois do schema.sql.

delete from propostas; delete from itens; delete from usuarios;

insert into usuarios (id, nome, email, curso, campus, trocas_concluidas) values
  ('u1', 'Lia Moreira', 'demo@trocaja.app', 'Engenharia de Software', 'FIAP Paulista', 3),
  ('u2', 'Caio Nakamura', 'caio@trocaja.app', 'Ciência da Computação', 'FIAP Paulista', 7),
  ('u3', 'Bianca Torres', 'bianca@trocaja.app', 'Arquitetura e Urbanismo', 'USP Butantã', 2),
  ('u4', 'Rafael Souza', 'rafael@trocaja.app', 'Medicina', 'Unifesp Vila Clementino', 5),
  ('u5', 'Júlia Andrade', 'julia@trocaja.app', 'Design', 'Mackenzie Higienópolis', 9),
  ('u6', 'Diego Lima', 'diego@trocaja.app', 'Sistemas de Informação', 'FIAP Paulista', 1);

insert into itens (id, dono_id, titulo, descricao, categoria, condicao, modalidade, aceita_em_troca, cor, campus, status, criado_em) values
  ('i1', 'u2', 'Cálculo Vol. 1 (Stewart)', '8ª edição, poucas marcações a lápis nos capítulos 2 e 3. Capa intacta.', 'livros', 'seminovo', 'troca', 'Livro de Física I ou de Álgebra Linear', '#C9D4FF', 'FIAP Paulista', 'disponivel', '2026-10-05T14:20:00.000Z'),
  ('i2', 'u3', 'Calculadora científica Casio fx-82', 'Funciona perfeitamente, troquei por uma gráfica. Vai sem a capa.', 'eletronicos', 'usado', 'troca', 'Fone com fio ou pen drive', '#FFF3A6', 'USP Butantã', 'disponivel', '2026-10-06T09:05:00.000Z'),
  ('i3', 'u4', 'Jaleco branco tamanho M', 'Usado só no primeiro semestre. Lavado e passado.', 'roupas', 'seminovo', 'doacao', '', '#FFD0E2', 'Unifesp Vila Clementino', 'disponivel', '2026-10-04T18:40:00.000Z'),
  ('i4', 'u5', 'Kit de canetas e marca-textos', '12 canetas fineliner e 6 marca-textos, ainda lacrados. Ganhei repetido.', 'material', 'novo', 'doacao', '', '#C8F0DF', 'Mackenzie Higienópolis', 'reservado', '2026-09-30T11:00:00.000Z'),
  ('i5', 'u6', 'Cadeira de escritório', 'Regulagem de altura funcionando, encosto com um rasgo pequeno. Retirada no campus.', 'moveis', 'usado', 'troca', 'Luminária de mesa', '#E3DAFF', 'FIAP Paulista', 'disponivel', '2026-10-01T16:30:00.000Z'),
  ('i6', 'u1', 'Arduino Uno + jumpers', 'Placa original, 40 jumpers e uma protoboard de 830 furos. Usei em um projeto de IoT.', 'eletronicos', 'seminovo', 'troca', 'Raspberry Pi Pico ou kit de sensores', '#C9D4FF', 'FIAP Paulista', 'disponivel', '2026-10-03T20:15:00.000Z'),
  ('i7', 'u1', 'Clean Code (Robert C. Martin)', 'Edição em português, algumas páginas grifadas.', 'livros', 'usado', 'troca', 'Qualquer livro de UX ou de design de interfaces', '#FFDCC2', 'FIAP Paulista', 'disponivel', '2026-09-28T13:45:00.000Z'),
  ('i8', 'u1', 'Mochila para notebook 15"', 'Compartimento acolchoado, um zíper lateral emperra às vezes.', 'outros', 'seminovo', 'doacao', '', '#FFF3A6', 'FIAP Paulista', 'disponivel', '2026-10-06T22:10:00.000Z'),
  ('i9', 'u2', 'Teclado mecânico compacto', 'Layout ABNT2, switches marrons. Uma tecla com o LED queimado.', 'eletronicos', 'seminovo', 'troca', 'Mouse sem fio + mousepad', '#E3DAFF', 'FIAP Paulista', 'disponivel', '2026-10-02T10:00:00.000Z'),
  ('i10', 'u3', 'Moletom da atlética (G)', 'Nunca usado, comprei no tamanho errado.', 'roupas', 'novo', 'troca', 'Camiseta de evento de tecnologia ou de design', '#FFD0E2', 'USP Butantã', 'disponivel', '2026-09-29T15:25:00.000Z'),
  ('i11', 'u4', 'Atlas de Anatomia (Netter)', '6ª edição. Lombada um pouco gasta, todas as páginas no lugar.', 'livros', 'usado', 'troca', 'Estetoscópio ou livro de Fisiologia', '#C8F0DF', 'Unifesp Vila Clementino', 'disponivel', '2026-09-27T08:50:00.000Z'),
  ('i12', 'u5', 'Prancheta A3 de desenho', 'Com régua paralela. Tem algumas marcas de estilete na superfície.', 'material', 'usado', 'doacao', '', '#FFDCC2', 'Mackenzie Higienópolis', 'disponivel', '2026-10-05T19:30:00.000Z'),
  ('i13', 'u6', 'Mesa dobrável', '80 × 60 cm, cabe em quarto de república. Retirada perto do metrô Consolação.', 'moveis', 'seminovo', 'doacao', '', '#C9D4FF', 'FIAP Paulista', 'disponivel', '2026-10-06T12:00:00.000Z'),
  ('i14', 'u2', 'Pen drive 64 GB', 'Lacrado, veio de brinde em um evento.', 'eletronicos', 'novo', 'doacao', '', '#FFF3A6', 'FIAP Paulista', 'disponivel', '2026-10-07T09:40:00.000Z'),
  ('i15', 'u3', 'Régua T e jogo de esquadros', 'Régua T de 80 cm e esquadros de 30° e 45°.', 'material', 'seminovo', 'troca', 'Papel vegetal A2', '#E3DAFF', 'USP Butantã', 'disponivel', '2026-09-26T17:10:00.000Z'),
  ('i16', 'u5', 'Luminária de mesa articulada', 'Lâmpada LED inclusa, braço articulado firme.', 'moveis', 'usado', 'troca', 'Fone de ouvido', '#FFD0E2', 'Mackenzie Higienópolis', 'reservado', '2026-09-25T14:00:00.000Z');

insert into propostas (id, item_id, de_usuario_id, para_usuario_id, item_oferecido_id, mensagem, status, criada_em) values
  ('p1', 'i6', 'u2', 'u1', 'i9', 'Oi! Tenho um teclado mecânico que pode te interessar. Posso levar na terça no intervalo.', 'pendente', '2026-10-06T21:00:00.000Z'),
  ('p2', 'i8', 'u4', 'u1', null, 'Minha mochila rasgou no meio do semestre, essa salvaria minha vida.', 'pendente', '2026-10-07T08:15:00.000Z'),
  ('p3', 'i5', 'u1', 'u6', 'i7', 'Não tenho luminária, mas topa o Clean Code pela cadeira?', 'pendente', '2026-10-05T10:30:00.000Z'),
  ('p4', 'i4', 'u1', 'u5', null, 'Posso buscar na sexta, se ainda estiver disponível.', 'aceita', '2026-10-01T09:00:00.000Z'),
  ('p5', 'i7', 'u3', 'u1', 'i15', 'Troco pelos meus esquadros, estão quase novos.', 'recusada', '2026-09-29T16:45:00.000Z'),
  ('p6', 'i16', 'u6', 'u5', null, 'Tenho um fone sobrando, podemos trocar.', 'aceita', '2026-09-26T12:00:00.000Z');
