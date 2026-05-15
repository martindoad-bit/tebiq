#!/usr/bin/env tsx
/**
 * Check that a staged 0.8 release slice does not include research bulk,
 * local worktrees, or generated answer dumps.
 *
 * Usage:
 *   npx tsx scripts/qa/check-0-8-release-slice.ts
 *   npx tsx scripts/qa/check-0-8-release-slice.ts --all-changed
 */
import { execFileSync } from 'node:child_process'

interface Args {
  allChanged: boolean
}

const BLOCKED_PATTERNS: Array<{ label: string; re: RegExp }> = [
  { label: 'local claude worktree', re: /^\.claude\// },
  { label: 'knowledge atlas samples bulk', re: /^docs\/knowledge-atlas\/samples\// },
  { label: 'knowledge atlas batch29a bulk', re: /^docs\/knowledge-atlas\/phase2\/batch29a\// },
  { label: 'knowledge atlas batch29b bulk', re: /^docs\/knowledge-atlas\/phase2\/batch29b\// },
  { label: 'knowledge atlas workpacks bulk', re: /^docs\/knowledge-atlas\/workpacks\// },
  { label: 'legal-source candidate bulk', re: /^docs\/fact-cards\/legal-source-candidates\// },
  { label: 'legal-source engineering research bulk', re: /^docs\/fact-cards\/legal-source-engineering\// },
  { label: 'knowledge atlas answer report', re: /^docs\/eval\/KNOWLEDGE_ATLAS_PHASE.*_ANSWER_AB\.md$/ },
  { label: 'knowledge atlas answer result', re: /^docs\/eval\/knowledge-atlas-phase.*answer-ab-results\.json$/ },
  { label: 'production answer sidecar', re: /^docs\/eval\/tebiq-0\.8-.*production-answer-results\.json$/ },
  { label: 'legal-source eval result', re: /^docs\/eval\/legal-source-.*results\.json$/ },
  { label: 'local env file', re: /^\.env/ },
]

const REQUIRED_IF_RELEASING = [
  'middleware.ts',
  'lib/admin/access-control.ts',
  'lib/admin/access-control.test.ts',
  'lib/consultation/route-gates.ts',
  'lib/consultation/route-gates.test.ts',
  'lib/consultation/guardrail-validator.ts',
  'lib/consultation/guardrail-validator.test.ts',
  'app/api/internal/eval-lab/import-run/route.ts',
  'scripts/eval/preflight-provider-env.ts',
  'scripts/eval/run-loop2b-targeted.sh',
  'docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md',
]

function parseArgs(argv: string[]): Args {
  return { allChanged: argv.includes('--all-changed') }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const files = args.allChanged ? allChangedFiles() : stagedFiles()
  const blocked = files.flatMap(file => {
    const hit = BLOCKED_PATTERNS.find(pattern => pattern.re.test(file))
    return hit ? [{ file, reason: hit.label }] : []
  })

  const missing = REQUIRED_IF_RELEASING.filter(file => !existsInGitOrWorkingTree(file))

  console.log(`release_slice_check_mode=${args.allChanged ? 'all_changed' : 'staged'}`)
  console.log(`files_checked=${files.length}`)

  if (blocked.length > 0) {
    console.log('blocked_files=')
    for (const item of blocked) console.log(`  ${item.file} (${item.reason})`)
  }
  if (missing.length > 0) {
    console.log('missing_required_files=')
    for (const file of missing) console.log(`  ${file}`)
  }

  if (blocked.length > 0 || missing.length > 0) {
    console.log('release_slice_result=FAIL')
    process.exit(1)
  }

  console.log('release_slice_result=PASS')
}

function stagedFiles(): string[] {
  const out = execGit(['diff', '--cached', '--name-only'])
  return lines(out)
}

function allChangedFiles(): string[] {
  const tracked = lines(execGit(['diff', '--name-only']))
  const untracked = lines(execGit(['ls-files', '--others', '--exclude-standard']))
  return Array.from(new Set([...tracked, ...untracked])).sort()
}

function existsInGitOrWorkingTree(path: string): boolean {
  try {
    execFileSync('test', ['-e', path])
    return true
  } catch {
    try {
      execGit(['cat-file', '-e', `HEAD:${path}`])
      return true
    } catch {
      return false
    }
  }
}

function execGit(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' })
}

function lines(value: string): string[] {
  return value.split('\n').map(line => line.trim()).filter(Boolean).sort()
}

main()
