#!/usr/bin/env tsx
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { listEvalQuestions, upsertEvalJudgement } from '@/lib/db/queries/eval-lab'

interface Args {
  csv: string
  judgeName: string
  judgeModel: string
  dryRun: boolean
}

interface CsvJudgement {
  case_id: string
  score: string
  defect_flags: string
  vs_deepseek_judgment: string
  ideal_answer_skeleton: string
  confidence: string
  reasoning: string
}

const REQUIRED_COLUMNS = [
  'case_id',
  'score',
  'defect_flags',
  'vs_deepseek_judgment',
  'ideal_answer_skeleton',
  'confidence',
  'reasoning',
] as const

function parseArgs(argv: string[]): Args {
  const out: Args = {
    csv: 'docs/qa/golden_set/v1_judge_output.csv',
    judgeName: 'aql_judge_claude_sonnet',
    judgeModel: 'claude-sonnet',
    dryRun: false,
  }
  for (const arg of argv) {
    if (arg === '--dry-run') out.dryRun = true
    else if (arg.startsWith('--csv=')) out.csv = arg.slice('--csv='.length)
    else if (arg.startsWith('--judge-name=')) out.judgeName = arg.slice('--judge-name='.length)
    else if (arg.startsWith('--judge-model=')) out.judgeModel = arg.slice('--judge-model='.length)
  }
  return out
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"'
        i += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
      continue
    }
    if (char === '"') inQuotes = true
    else if (char === ',') {
      row.push(field)
      field = ''
    } else if (char === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (char !== '\r') {
      field += char
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter(r => r.some(v => v.trim() !== ''))
}

function readCsv(path: string): CsvJudgement[] {
  const rows = parseCsv(readFileSync(path, 'utf8'))
  if (rows.length < 2) return []
  const header = rows[0]
  for (const col of REQUIRED_COLUMNS) {
    if (!header.includes(col)) throw new Error(`CSV missing required column: ${col}`)
  }
  return rows.slice(1).map((row, index) => {
    if (row.length !== header.length) {
      throw new Error(`CSV row ${index + 2} has ${row.length} columns; expected ${header.length}`)
    }
    const obj: Record<string, string> = {}
    header.forEach((key, i) => {
      obj[key] = row[i] ?? ''
    })
    return obj as unknown as CsvJudgement
  })
}

function parseDefectFlags(value: string): string[] {
  const trimmed = value.trim()
  if (!trimmed || /^none$/i.test(trimmed)) return []
  return trimmed
    .split(/[|;]+/)
    .map(v => v.trim())
    .filter(Boolean)
}

function normalizeScore(score: number): number {
  return score <= 5 ? score * 20 : score
}

function activeLearningReasons(input: {
  scoreNormalized: number
  confidence: number
  vsDeepseekJudgment: string
}): string[] {
  const reasons: string[] = []
  if (input.confidence < 0.6) reasons.push('confidence < 0.6')
  if (input.scoreNormalized < 60) reasons.push('score < 60')
  if (input.vsDeepseekJudgment === 'regression') reasons.push('vs_deepseek_judgment = regression')
  return reasons
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const csvPath = resolve(args.csv)
  const rows = readCsv(csvPath)
  const seen = new Set<string>()
  for (const row of rows) {
    if (seen.has(row.case_id)) throw new Error(`duplicate case_id in CSV: ${row.case_id}`)
    seen.add(row.case_id)
  }

  const questions = await listEvalQuestions()
  const byStarterTag = new Map(questions.map(q => [q.starterTag, q]))
  const prepared = rows.map(row => {
    const question = byStarterTag.get(row.case_id)
    if (!question) throw new Error(`case_id not found in eval_questions.starter_tag: ${row.case_id}`)
    const score = Number(row.score)
    const confidence = Number(row.confidence)
    if (!Number.isFinite(score)) throw new Error(`invalid score for ${row.case_id}: ${row.score}`)
    if (!Number.isFinite(confidence)) throw new Error(`invalid confidence for ${row.case_id}: ${row.confidence}`)
    const scoreNormalized = normalizeScore(score)
    const reasons = activeLearningReasons({
      scoreNormalized,
      confidence,
      vsDeepseekJudgment: row.vs_deepseek_judgment,
    })
    return {
      questionId: question.id,
      caseId: row.case_id,
      judgeName: args.judgeName,
      judgeModel: args.judgeModel,
      score,
      scoreNormalized,
      defectFlags: parseDefectFlags(row.defect_flags),
      vsDeepseekJudgment: row.vs_deepseek_judgment,
      idealAnswerSkeleton: row.ideal_answer_skeleton,
      confidence: confidence.toFixed(2),
      reasoning: row.reasoning,
      activeLearningRed: reasons.length > 0,
      activeLearningReasons: reasons,
      sourceCsvPath: args.csv,
    }
  })

  if (args.dryRun) {
    console.log(JSON.stringify({
      dryRun: true,
      rows: prepared.length,
      activeLearningRed: prepared.filter(r => r.activeLearningRed).length,
      judgeName: args.judgeName,
      judgeModel: args.judgeModel,
    }, null, 2))
    return
  }

  let written = 0
  for (const row of prepared) {
    await upsertEvalJudgement(row)
    written += 1
  }
  console.log(JSON.stringify({
    ok: true,
    written,
    activeLearningRed: prepared.filter(r => r.activeLearningRed).length,
    judgeName: args.judgeName,
    judgeModel: args.judgeModel,
  }, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
  })
