// Builds assets/site-*.css (Tailwind, only the classes each page uses) and assets/icons.js
// (only the Lucide icons the pages use). Run: npm ci && npm run build
// A GitHub Action runs this on every push that changes a page, so new classes or icons just work.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { build, transform } from 'esbuild';
import * as lucide from 'lucide';

const pages = { home: 'index.html', podcast: 'podcast.html', chapter: 'chapter-one.html' };

// 1. CSS
for (const [name] of Object.entries(pages)) {
  execFileSync('npx', ['tailwindcss', '-c', `tools/tailwind.${name}.config.js`, '-i', 'tools/tailwind-input.css',
    '-o', `assets/site-${name}.css`], { stdio: 'inherit' });
  // esbuild minifies without changing colour values (Tailwind's own --minify rounds some colours)
  const css = readFileSync(`assets/site-${name}.css`, 'utf8');
  writeFileSync(`assets/site-${name}.css`, (await transform(css, { loader: 'css', minify: true })).code);
}

// 2. Icons: every data-lucide="name" in the pages, plus names set from scripts
const pascal = (s) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
const names = new Set();
for (const file of Object.values(pages)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/data-lucide="([a-z0-9-]+)"/g)) names.add(m[1]);
  for (const m of html.matchAll(/data-lucide="' \+ \(isMenuOpen \? '([a-z0-9-]+)' : '([a-z0-9-]+)'\)/g)) { names.add(m[1]); names.add(m[2]); }
  for (const m of html.matchAll(/\bicon:\s*"([a-z0-9-]+)"/g)) names.add(m[1]);
}
// Lucide 1.x removed brand logos, so these two are kept here (shapes from Lucide 0.x)
const custom = {
  Instagram: [['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5' }],
              ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }],
              ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5' }]],
  Linkedin: [['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
             ['rect', { width: '4', height: '12', x: '2', y: '9' }],
             ['circle', { cx: '4', cy: '4', r: '2' }]],
};
const imports = [], entries = [], missing = [];
for (const n of [...names].sort()) {
  const P = pascal(n);
  if (custom[P]) entries.push(`${P}: ${JSON.stringify(custom[P])}`);
  else if (lucide[P]) { imports.push(P); entries.push(P); }
  else missing.push(n);
}
if (missing.length) { console.error('Unknown icons:', missing.join(', ')); process.exit(1); }
writeFileSync('tools/.icons-entry.mjs',
  `import { createIcons, ${imports.join(', ')} } from 'lucide';\n` +
  `const icons = { ${entries.join(', ')} };\n` +
  `window.lucide = { createIcons: (opts = {}) => createIcons({ ...opts, icons: { ...icons, ...(opts.icons || {}) } }) };\n`);
await build({ entryPoints: ['tools/.icons-entry.mjs'], bundle: true, minify: true, format: 'iife', outfile: 'assets/icons.js', logLevel: 'warning' });
console.log(`Icons: ${names.size} (${[...names].sort().join(', ')})`);
