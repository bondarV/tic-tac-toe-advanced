import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function loadPackageJson(rootDir = repoRoot) {
  return JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
}

export function normalizePath(value, rootDir = repoRoot) {
  if (value == null || value === '') {
    return undefined;
  }

  if (path.isAbsolute(value)) {
    // Redact paths outside the repository (e.g., /etc/..., C:\Windows\...)
    // to avoid leaking host directory structure.
    const relative = path.relative(rootDir, value);
    if (relative.startsWith('..')) {
      return undefined;
    }
    return relative === '' ? '.' : relative;
  }

  return value;
}

export function normalizeRepository(repository) {
  if (repository == null || repository === '') {
    return undefined;
  }

  if (typeof repository === 'string') {
    return repository;
  }

  if (typeof repository === 'object') {
    if (typeof repository.url === 'string' && repository.url !== '') {
      return repository.url;
    }

    // Do not fall back to repository.type (e.g., "git") as it is not a
    // meaningful repository location; return undefined instead.
    if (typeof repository.directory === 'string' && repository.directory !== '') {
      return repository.directory;
    }

    // For unrecognized object shapes, return undefined rather than
    // stringified object or misleading type.
    return undefined;
  }

  return String(repository);
}

export function formatLicenses(licenses) {
  if (Array.isArray(licenses)) {
    return licenses.join(', ');
  }

  if (licenses && typeof licenses === 'object') {
    return Object.values(licenses)
      .filter((value) => value != null && value !== '')
      .join(', ');
  }

  return licenses == null || licenses === '' ? 'UNKNOWN' : String(licenses);
}

export function resolveLicenseCheckerBinary(rootDir = repoRoot) {
  const binName = process.platform === 'win32' ? 'license-checker.cmd' : 'license-checker';
  return path.join(rootDir, 'node_modules', '.bin', binName);
}

export function buildReportLines(data, packageJson, rootDir = repoRoot) {
  const rootPackageName = `${packageJson.name}@${packageJson.version}`;
  const entries = Object.entries(data).sort(([left], [right]) => left.localeCompare(right));
  const lines = [];

  for (let idx = 0; idx < entries.length; idx += 1) {
    const [packageName, info = {}] = entries[idx];
    const isLastEntry = idx === entries.length - 1;
    const licensesValue = packageName === rootPackageName
      ? packageJson.license ?? formatLicenses(info.licenses)
      : formatLicenses(info.licenses);

    const fields = [
      ['licenses', licensesValue],
      ['repository', normalizeRepository(info.repository)],
      ['path', normalizePath(info.path, rootDir)],
      ['licenseFile', normalizePath(info.licenseFile, rootDir)],
    ].filter(([, value]) => value != null && value !== '');

    if (info.private) {
      fields.push(['private', 'true']);
    }

    lines.push(`${isLastEntry ? '└─' : '├─'} ${packageName}`);

    fields.forEach(([label, value], index) => {
      const branch = index === fields.length - 1 ? '└─' : '├─';
      lines.push(`│  ${branch} ${label}: ${value}`);
    });
  }

  return lines;
}

