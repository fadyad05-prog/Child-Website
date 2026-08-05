# Vite React app (react-app)

This status file contains scanner outputs and notes generated during the security scan run on branch `feature/react-integration`.

## Dependency scan (npm audit)
- Run command: `cd react-app && npm install && npm audit --json`
- Results: see attached `react-app-audit.json` (not committed here). Summary: no high-severity advisories in dependencies at time of scan.

## Secret scan (gitleaks/trufflehog)
- Run commands used:
  - `npx gitleaks detect --source . --report-format json --report-path gitleaks.json`
  - `npx trufflehog filesystem . --json > trufflehog.json`
- Results: No hard-coded secrets or private keys found in repository files scanned. Note: scans look for common patterns — manual review still recommended.

## Static checks
- Searched for dangerous APIs: `eval`, `document.write`, `innerHTML`
  - `innerHTML` usage found in `script.js` but used with static template strings (not user input).
  - No `eval()` or `document.write()` usages detected.

## Recommendations
- Keep `.env.local` out of repo (already added `.gitignore` and `.env.example`).
- Rotate any credentials if they have ever been committed in the past (I found none).
- Consider adding GitHub Actions with CodeQL and secret scanning for continuous protection.

