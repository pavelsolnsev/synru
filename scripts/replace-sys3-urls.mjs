/**
 * Заменяет литералы https://sys3.ru/... и https://dev.sys3.ru/... на synergyApi / synergyRu.
 * Запуск: node scripts/replace-sys3-urls.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SKIP_DIRS = new Set(['node_modules', '.nuxt', '.output', 'dist', '.git']);
const EXT = new Set(['.vue', '.ts', '.js', '.mts']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(name))) out.push(p);
  }
  return out;
}

const IMPORT_LINE = "import { synergyApi, synergyRu } from '~/utils/mediaCdn';\n";

function ensureImport(content, needsApi, needsRu) {
  if (!needsApi && !needsRu) return content;
  if (content.includes("from '~/utils/mediaCdn'") || content.includes('from "~/utils/mediaCdn"')) return content;
  const m = content.match(/^import\s/m);
  if (!m) return IMPORT_LINE + content;
  const firstNl = content.indexOf('\n');
  if (firstNl === -1) return IMPORT_LINE + content;
  return content.slice(0, firstNl + 1) + IMPORT_LINE + content.slice(firstNl + 1);
}

function transformFile(filePath) {
  let s = fs.readFileSync(filePath, 'utf8');
  const orig = s;

  let needsApi = false;
  let needsRu = false;

  // 'https://sys3.ru/synergy-api/PATH' or dev.
  s = s.replace(/(['"])https:\/\/(?:dev\.)?sys3\.ru\/synergy-api\/([^'"]+)\1/g, (_m, _q, rest) => {
    needsApi = true;
    const safe = String(rest).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `synergyApi('${safe}')`;
  });

  // "https://sys3.ru/synergy-api/PATH"
  s = s.replace(/(["])https:\/\/(?:dev\.)?sys3\.ru\/synergy-api\/([^'"]+)\1/g, (_m, _q, rest) => {
    needsApi = true;
    const safe = String(rest).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `synergyApi("${safe}")`;
  });

  // synergy-ru single-quoted
  s = s.replace(/(['"])https:\/\/(?:dev\.)?sys3\.ru\/synergy-ru\/([^'"]+)\1/g, (_m, _q, rest) => {
    needsRu = true;
    const safe = String(rest).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `synergyRu('${safe}')`;
  });

  // synergy-ru double-quoted
  s = s.replace(/(["])https:\/\/(?:dev\.)?sys3\.ru\/synergy-ru\/([^'"]+)\1/g, (_m, _q, rest) => {
    needsRu = true;
    const safe = String(rest).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `synergyRu("${safe}")`;
  });

  if (s === orig) return false;

  s = ensureImport(s, needsApi, needsRu);
  if (needsRu && !needsApi && s.includes('synergyRu') && !s.includes('synergyApi')) {
    s = s.replace(
      "import { synergyApi, synergyRu } from '~/utils/mediaCdn';",
      "import { synergyRu } from '~/utils/mediaCdn';",
    );
  }
  if (needsApi && !needsRu) {
    s = s.replace(
      "import { synergyApi, synergyRu } from '~/utils/mediaCdn';",
      "import { synergyApi } from '~/utils/mediaCdn';",
    );
  }

  fs.writeFileSync(filePath, s, 'utf8');
  return true;
}

const dirs = ['components', 'pages', 'utils', 'constants', 'composables', 'server', 'types', 'middleware', 'layouts', 'plugins'];
let n = 0;
for (const d of dirs) {
  const full = path.join(root, d);
  for (const f of walk(full)) {
    if (transformFile(f)) {
      n++;
      console.log('updated', path.relative(root, f));
    }
  }
}
console.log('done, files changed:', n);
