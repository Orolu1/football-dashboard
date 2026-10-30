// Mirrors the current-season CSVs from open-matchday into data/live/ so the
// site serves its own copy. Run by .github/workflows/refresh-data.yml.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const SOURCE = 'https://raw.githubusercontent.com/oladeeayo/open-matchday/master/data';
const SEASON = '2627';
const COMPETITIONS = [
  'ENG_1_premier-league',
  'ESP_1_la-liga',
  'ITA_1_serie-a',
  'GER_1_bundesliga',
  'FRA_1_ligue-1',
  'UEFA_1_champions-league',
];
const KINDS = ['results', 'fixtures'];

const rows = (csv) => csv.trim().split('\n').length - 1;

let changed = 0;
let failed = 0;
for (const comp of COMPETITIONS) {
  await mkdir(`data/live/${comp}`, { recursive: true });
  for (const kind of KINDS) {
    const file = `data/live/${comp}/${kind}_${SEASON}.csv`;
    try {
      const res = await fetch(`${SOURCE}/${comp}/${kind}_${SEASON}.csv`, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw Error(`HTTP ${res.status}`);
      const csv = await res.text();
      if (!csv.startsWith('gw,')) throw Error('unexpected CSV format');
      const old = await readFile(file, 'utf8').catch(() => null);
      if (old === csv) continue;
      // Completed results only grow during a season; a shorter file means a bad upstream build.
      if (kind === 'results' && old && rows(csv) < rows(old)) throw Error(`row count dropped ${rows(old)} -> ${rows(csv)}`);
      await writeFile(file, csv);
      changed++;
      console.log(`updated ${file} (${rows(csv)} rows)`);
    } catch (e) {
      failed++;
      console.warn(`kept existing ${file}: ${e.message}`);
    }
  }
}

if (changed) await writeFile('data/live/meta.json', JSON.stringify({ updated: new Date().toISOString(), source: SOURCE }, null, 2) + '\n');
console.log(`${changed} file(s) updated, ${failed} failed`);
if (failed === COMPETITIONS.length * KINDS.length) process.exit(1);
