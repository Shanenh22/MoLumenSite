import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const rel = (p) => p.split(path.sep).join('/');
const exists = (p) => fs.existsSync(path.join(root, p));
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const size = (p) => fs.statSync(path.join(root, p)).size;

function walk(dir) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(child) : [rel(child)];
  });
}

const required = [
  'AGENTS.md',
  'CLAUDE.md',
  'MoLumen_OS/INDEX.md',
  'MoLumen_OS/PROJECT_STATE.md',
  'MoLumen_OS/BACKLOG.md',
  'MoLumen_OS/DECISIONS.md',
];
for (const file of required) {
  if (!exists(file)) failures.push(`missing canonical agent document: ${file}`);
}

const limits = {
  'AGENTS.md': 5000,
  'CLAUDE.md': 1200,
  'MoLumen_OS/PROJECT_STATE.md': 4500,
  'MoLumen_OS/BACKLOG.md': 5000,
  'MoLumen_OS/DECISIONS.md': 3500,
};
for (const [file, max] of Object.entries(limits)) {
  if (exists(file) && size(file) > max) failures.push(`${file} is ${size(file)} bytes; limit is ${max}`);
}

const copiedResources = walk('.claude/skills').filter((p) => p.includes('/resources/'));
if (copiedResources.length) {
  failures.push(`copied skill resources are not allowed: ${copiedResources.join(', ')}`);
}

if (exists('MoLumen_OS/prompts')) failures.push('legacy MoLumen_OS/prompts directory must stay retired');
if (exists('MoLumen_OS/PROJECT_MEMORY.md')) failures.push('PROJECT_MEMORY.md is retired; use PROJECT_STATE.md');

const liveInstructionFiles = [
  'AGENTS.md',
  'CLAUDE.md',
  ...walk('.claude').filter((p) => p.endsWith('.md')),
  ...walk('MoLumen_OS').filter(
    (p) => p.endsWith('.md') && !p.startsWith('MoLumen_OS/archive/'),
  ),
];

const forbidden = [
  ['retired project-memory path', /PROJECT_MEMORY\.md/g],
  ['legacy prompt path', /MoLumen_OS\/prompts\//g],
  ['deprecated MailerLite reference', /MailerLite/gi],
  ['GA measurement ID in operating prose', /\bG-[A-Z0-9]{6,}\b/g],
  ['embedded Kit UID in operating prose', /data-uid\s*=\s*["'][^"']+["']/gi],
];

for (const file of liveInstructionFiles) {
  const text = read(file);
  for (const [label, pattern] of forbidden) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) failures.push(`${label}: ${file}`);
  }
}

if (failures.length) {
  console.error('[agent-docs] FAILED');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`[agent-docs] OK — ${liveInstructionFiles.length} live instruction/reference files checked`);
