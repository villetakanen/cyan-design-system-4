#!/usr/bin/env node
const { execSync } = require('child_process');
const { readdirSync, readFileSync, statSync } = require('fs');
const path = require('path');

function normalize(p) {
  if (!p) return p;
  return p.replace(/^\.\//, '').replace(/\\\\/g, '/');
}

const repoRoot = process.cwd();
const packagesDir = path.join(repoRoot, 'packages');
let failures = 0;

console.log('Scanning packages for `types` field...');
let pkgNamesChecked = 0;
for (const name of readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, name);
  try {
    if (!statSync(pkgPath).isDirectory()) continue;
  } catch (_err) {
    continue;
  }

  const pkgJsonPath = path.join(pkgPath, 'package.json');
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
  } catch (_err) {
    continue;
  }

  if (!pkg.types) continue;
  pkgNamesChecked++;
  const expected = normalize(pkg.types);
  console.log(
    `\nChecking ${pkg.name || name}: expecting types at '${expected}'`,
  );

  try {
    // npm pack --dry-run will run prepare scripts and show the tarball contents
    // npm prints the tarball listing to stderr as "npm notice", so capture stderr too by redirecting it to stdout
    const out = execSync('npm pack --dry-run 2>&1', {
      cwd: pkgPath,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    const normalizedOut = out.replace(/\\r\\n/g, '\n');

    // Diagnostic output: show what we're looking for and what .d.ts files are present in the pack output
    const expectedBasename = path.posix.basename(expected);
    const hasExpected =
      normalizedOut.includes(expected) ||
      normalizedOut.includes(`./${expected}`) ||
      normalizedOut.includes(expectedBasename);
    const dtsLines = normalizedOut
      .split('\n')
      .filter((l) => l.includes('.d.ts'))
      .slice(0, 200);
    console.log(`    expected: '${expected}'`);
    console.log(`    expected basename: '${expectedBasename}'`);
    if (dtsLines.length) {
      console.log('    .d.ts files found in pack output:');
      for (const l of dtsLines) console.log('      ' + l);
    } else {
      console.log('    no .d.ts files found in pack output');
    }

    if (hasExpected) {
      console.log(`  OK: pack contains '${expected}'`);
    } else {
      console.error(
        `  FAIL: pack did not include '${expected}'. Pack output snippet:`,
      );
      const lines = normalizedOut.split('\n').slice(0, 200).join('\n');
      console.error(lines);
      failures++;
    }
  } catch (err) {
    console.error(
      `  ERROR running npm pack for ${name}:`,
      err?.message ?? String(err),
    );
    failures++;
  }
}

console.log('\nVerification complete.');
if (pkgNamesChecked === 0) {
  console.log('No packages with a `types` field found — nothing to check.');
}
if (failures > 0) {
  console.error(`${failures} package(s) failed types validation.`);
  process.exit(1);
}
console.log('All checked packages include their declared types in npm pack.');
