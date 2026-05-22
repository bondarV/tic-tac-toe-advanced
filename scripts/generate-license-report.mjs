import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  buildReportLines,
  loadPackageJson,
  repoRoot,
  resolveLicenseCheckerBinary,
} from './license-report-utils.mjs';

const reportPath = path.join(repoRoot, 'license-report.txt');
const packageJson = loadPackageJson(repoRoot);
const licenseCheckerBinary = resolveLicenseCheckerBinary(repoRoot);

let rawOutput;
try {
  rawOutput = execFileSync(
    licenseCheckerBinary,
    ['--json', '--relativeLicensePath'],
    {
      cwd: repoRoot,
      encoding: 'utf8',
      env: {
        ...process.env,
        NO_COLOR: '1',
      },
      stdio: ['ignore', 'pipe', 'inherit'],
    },
  );
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error(
      `Error: license-checker binary not found at ${licenseCheckerBinary}\n` +
      'Please run: npm install\n' +
      'Or ensure license-checker is installed as a devDependency.',
    );
  } else {
    console.error(`Error running license-checker: ${error.message}`);
  }
  process.exit(1);
}

const data = JSON.parse(rawOutput);
const lines = buildReportLines(data, packageJson, repoRoot);

writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote sanitized license report to ${path.relative(repoRoot, reportPath)}`);

