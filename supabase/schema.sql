-- TrocaJá — schema do Supabase (Postgres)
-- Rode no SQL Editor do projeto Supabase ANTES do seed.sql.

drop table if exists propostas;
drop table if exists itens;
drop table if exists usuarios;

create table usuarios (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  email text not null unique,
  curso text not null,
  campus text not null,
  trocas_concluidas integer not null default 0
);

create table itens (
  id text primary key default gen_random_uuid()::text,
  dono_id text not null references usuarios(id) on delete cascade,
  titulo text not null check (char_length(titulo) between 3 and 60),
  descricao text not null default '',
  categoria text not null check (categoria in ('livros','eletronicos','material','roupas','moveis','outros')),
  condicao text not null check (condicao in ('novo','seminovo','usado')),
  modalidade text not null check (modalidade in ('troca','doacao')),
  aceita_em_troca text not null default '',
  cor text not null default '#C9D4FF',
  campus text not null,
  status text not null default 'disponivel' check (status in ('disponivel','reservado','trocado')),
  criado_em timestamptz not null default now()
);

create table propostas (
  id text primary key default gen_random_uuid()::text,
  item_id text not null references itens(id) on delete cascade,
  de_usuario_id text not null references usuarios(id) on delete cascade,
  para_usuario_id text not null references usuarios(id) on delete cascade,
  item_oferecido_id text references itens(id) on delete set null,
  mensagem text not null default '',
  status text not null default 'pendente' check (status in ('pendente','aceita','recusada','cancelada')),
  criada_em timestamptz not null default now(),
  check (de_usuario_id <> para_usuario_id)
);

create index itens_criado_em_idx on itens (criado_em desc);
create index propostas_de_idx on propostas (de_usuario_id);
create index propostas_para_idx on propostas (para_usuario_id);

-- Row Level Security
-- ATENÇÃO: leitura, criação e atualização abertas para o protótipo (CP5), que não usa Supabase Auth.
-- Na CP6, com login real, troque por políticas baseadas em auth.uid().
alter table usuarios enable row level security;
alter table itens enable row level security;
alter table propostas enable row level security;

create policy "prototipo_usuarios" on usuarios for all to anon using (true) with check (true);
create policy "prototipo_itens" on itens for all to anon using (true) with check (true);
create policy "prototipo_propostas" on propostas for all to anon using (true) with check (true);

-- Nenhum DELETE pelo app: políticas restritivas bloqueiam exclusão para o papel anon.
create policy "prototipo_sem_delete_usuarios" on usuarios as restrictive for delete to anon using (false);
create policy "prototipo_sem_delete_itens" on itens as restrictive for delete to anon using (false);
create policy "prototipo_sem_delete_propostas" on propostas as restrictive for delete to anon using (false);
