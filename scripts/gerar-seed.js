/**
 * Gera supabase/seed.sql e mock-api/db.json a partir dos JSON de src/data/mock.
 * Assim o banco, o json-server e o mock local usam exatamente os mesmos dados.
 * Uso: npm run gerar:seed
 */
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const ler = (nome) => JSON.parse(fs.readFileSync(path.join(raiz, 'src/data/mock', `${nome}.json`), 'utf8'));

const usuarios = ler('usuarios');
const itens = ler('itens');
const propostas = ler('propostas');

const sql = (v) => (v === null || v === undefined ? 'null' : typeof v === 'number' ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
const snake = (k) => k.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);

function inserts(tabela, linhas) {
  const colunas = Object.keys(linhas[0]);
  const valores = linhas.map((l) => `  (${colunas.map((c) => sql(l[c])).join(', ')})`).join(',\n');
  return `insert into ${tabela} (${colunas.map(snake).join(', ')}) values\n${valores};\n`;
}

const seed = [
  '-- Gerado por scripts/gerar-seed.js a partir de src/data/mock — não edite à mão.',
  '-- Rode no SQL Editor do Supabase depois do schema.sql.',
  '',
  'delete from propostas; delete from itens; delete from usuarios;',
  '',
  inserts('usuarios', usuarios),
  inserts('itens', itens),
  inserts('propostas', propostas),
].join('\n');

fs.writeFileSync(path.join(raiz, 'supabase/seed.sql'), seed);
fs.mkdirSync(path.join(raiz, 'mock-api'), { recursive: true });
fs.writeFileSync(path.join(raiz, 'mock-api/db.json'), JSON.stringify({ usuarios, itens, propostas }, null, 2) + '\n');
console.log(`seed.sql e db.json gerados: ${usuarios.length} usuários, ${itens.length} itens, ${propostas.length} propostas.`);
