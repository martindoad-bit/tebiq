/**
 * scripts/context/check-context-impact.ts
 *
 * Context Impact Checker — warns when a PR touches sensitive paths
 * but the PR body is missing context impact declarations.
 *
 * Not a hard blocker. Output is advisory — paste into PR body before merge.
 *
 * Usage:
 *   npx tsx scripts/context/check-context-impact.ts [base-branch]
 *
 * Defaults to comparing against origin/main.
 */

import { execSync } from 'child_process'

const BASE = process.argv[2] ?? 'origin/main'

// Paths that require context impact evaluation when touched
const SENSITIVE_PATHS: Record<string, string> = {
  'lib/answer/': 'Answer path changed — 10-question regression required',
  'app/answer/': 'Answer page changed — 10-question regression required',
  'lib/eval-lab/': 'Eval Lab logic changed — check golden case schema',
  'app/internal/eval-lab/': 'Eval Lab UI changed — check schema + storage format',
  'db/schema': 'DB schema changed — migration required, check rollback',
  'lib/db/schema': 'DB schema changed — migration required, check rollback',
  'drizzle/': 'Drizzle migration file changed — check rollback plan',
  'migrations/': 'Migration file changed — check rollback plan',
  'docs/domain/': 'Domain docs changed — DOMAIN-CC review required',
  'docs/product/': 'Product docs changed — update TEBIQ_CURRENT_STATE.md',
  'app/my/': 'My page changed — check user-facing matter display',
  'lib/matters/': 'Matters logic changed — check matter card rendering',
}

// Fields that must appear in PR body when sensitive paths are touched
const REQUIRED_FIELDS = [
  'Context impact:',
  'Current State update:',
  'Decision Log update:',
  'QA Gates update:',
  'Domain review needed:',
  'User-facing answer path changed:',
  'Eval data / Comparison Gate req:',
  'Product-owner decision needed:',
]

function getChangedFiles(): string[] {
  try {
    const output = execSync(`git diff --name-only ${BASE}...HEAD`, {
      encoding: 'utf-8',
    })
    return output.trim().split('\n').filter(Boolean)
  } catch {
    console.error(`ERROR: Could not diff against ${BASE}. Run: git fetch origin first.`)
    process.exit(1)
  }
}

function getPRBody(): string {
  try {
    const output = execSync('gh pr view --json body -q .body', {
      encoding: 'utf-8',
    })
    return output.trim()
  } catch {
    return ''
  }
}

function main() {
  const changedFiles = getChangedFiles()
  const prBody = getPRBody()

  const triggered: { path: string; reason: string }[] = []

  for (const file of changedFiles) {
    for (const [sensitivePath, reason] of Object.entries(SENSITIVE_PATHS)) {
      if (file.startsWith(sensitivePath)) {
        triggered.push({ path: file, reason })
        break
      }
    }
  }

  if (triggered.length === 0) {
    console.log('✓ No sensitive paths touched. No context impact check required.')
    process.exit(0)
  }

  console.log('\n⚠️  CONTEXT IMPACT WARNING')
  console.log('─'.repeat(60))
  console.log('The following sensitive paths were touched:\n')
  for (const { path, reason } of triggered) {
    console.log(`  • ${path}`)
    console.log(`    → ${reason}`)
  }

  const missingFields: string[] = []
  for (const field of REQUIRED_FIELDS) {
    if (!prBody.includes(field)) {
      missingFields.push(field)
    }
  }

  if (missingFields.length > 0) {
    console.log('\n⚠️  PR body is missing the following context impact fields:')
    for (const f of missingFields) {
      console.log(`  • ${f} yes/no`)
    }
    console.log('\nAdd to your PR body:')
    console.log('─'.repeat(60))
    console.log('## Context impact')
    for (const f of REQUIRED_FIELDS) {
      console.log(`- ${f} yes/no`)
    }
    console.log('─'.repeat(60))
    console.log('\nThis is a WARNING, not a hard block. Fix before requesting review.\n')
    process.exit(0)
  }

  console.log('\n✓ PR body contains context impact declarations.')
  process.exit(0)
}

main()
