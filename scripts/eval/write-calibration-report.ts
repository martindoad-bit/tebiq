#!/usr/bin/env tsx
import { readFileSync, writeFileSync } from 'node:fs'

interface CalibrationRow {
  case_id: string
  scenario: string
  question: string
  score: number
  vs_deepseek_judgment: string
  missing_points: string | null
}

interface JudgeRow {
  case_id: string
  score: string
  defect_flags: string
  vs_deepseek_judgment: string
  ideal_answer_skeleton: string
  confidence: string
  reasoning: string
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

function readJudgeCsv(path: string): JudgeRow[] {
  const rows = parseCsv(readFileSync(path, 'utf8'))
  if (rows.length < 2) return []
  const header = rows[0]
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {}
    header.forEach((key, i) => {
      obj[key] = row[i] ?? ''
    })
    return obj as unknown as JudgeRow
  })
}

function judgementMatch(founder: string, judge: string): boolean {
  return founder === judge
}

function main() {
  const calibrationPath = 'docs/qa/golden_set/v1_calibration.json'
  const judgePath = 'docs/qa/golden_set/v1_judge_output.csv'
  const outPath = 'docs/qa/calibration_v1.md'
  const calibration = JSON.parse(readFileSync(calibrationPath, 'utf8')) as CalibrationRow[]
  const judgeRows = readJudgeCsv(judgePath)
  const judgeByCase = new Map(judgeRows.map(row => [row.case_id, row]))

  const compared = calibration
    .map(founder => ({ founder, judge: judgeByCase.get(founder.case_id) ?? null }))
    .filter((row): row is { founder: CalibrationRow; judge: JudgeRow } => !!row.judge)
  const missing = calibration.filter(row => !judgeByCase.has(row.case_id))

  const scoreWithinOne = compared.filter(row => Math.abs(row.founder.score - Number(row.judge.score)) <= 1).length
  const vsMatches = compared.filter(row => judgementMatch(row.founder.vs_deepseek_judgment, row.judge.vs_deepseek_judgment)).length
  const scoreAgreement = compared.length === 0 ? null : Math.round((scoreWithinOne / compared.length) * 100)
  const vsAgreement = compared.length === 0 ? null : Math.round((vsMatches / compared.length) * 100)
  const status = missing.length === 0 && compared.length === calibration.length ? 'PASS' : 'BLOCKED'

  const lines = [
    '# Calibration V1',
    '',
    `date: 2026-05-10`,
    `status: ${status}`,
    '',
    '## Summary',
    '',
    `- founder calibration rows: ${calibration.length}`,
    `- judge output rows: ${judgeRows.length}`,
    `- comparable calibration rows: ${compared.length}`,
    `- missing judge rows for calibration: ${missing.length}`,
    `- score agreement (within ±1): ${scoreAgreement == null ? 'N/A' : `${scoreAgreement}%`}`,
    `- vs DeepSeek agreement: ${vsAgreement == null ? 'N/A' : `${vsAgreement}%`}`,
    '',
  ]

  if (missing.length > 0) {
    lines.push(
      '## Blocker',
      '',
      'The current judge output CSV contains only the 88 unannotated cases. It does not include the 12 founder calibration cases, so founder-vs-judge consistency cannot be measured yet.',
      '',
      '| missing case_id | founder score | founder vs DeepSeek | question |',
      '|---|---:|---|---|',
      ...missing.map(row => `| ${row.case_id} | ${row.score} | ${row.vs_deepseek_judgment} | ${row.question.replace(/\|/g, '/')} |`),
      '',
    )
  }

  if (compared.length > 0) {
    lines.push(
      '## Compared Rows',
      '',
      '| case_id | founder score | judge score | score delta | founder vs | judge vs | confidence |',
      '|---|---:|---:|---:|---|---|---:|',
      ...compared.map(row => {
        const judgeScore = Number(row.judge.score)
        return `| ${row.founder.case_id} | ${row.founder.score} | ${judgeScore} | ${judgeScore - row.founder.score} | ${row.founder.vs_deepseek_judgment} | ${row.judge.vs_deepseek_judgment} | ${row.judge.confidence} |`
      }),
      '',
    )
  }

  lines.push(
    '## Next Step',
    '',
    'Run the same Claude Sonnet judge on the 12 founder calibration cases and append/merge those rows into `docs/qa/golden_set/v1_judge_output.csv`, then rerun this report.',
    '',
  )

  writeFileSync(outPath, `${lines.join('\n')}\n`)
  console.log(JSON.stringify({
    outPath,
    status,
    calibrationRows: calibration.length,
    judgeRows: judgeRows.length,
    comparableRows: compared.length,
    missingRows: missing.length,
  }, null, 2))
}

main()
