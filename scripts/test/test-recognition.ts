import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { recognizePhotoDocument, PhotoRecognitionError } from '../../lib/photo/bedrock'

interface SampleExpectation {
  file: string
  expectedType: string
  expectedIssuer: string
  expectedAmount?: number
  expectedDeadline?: string
}

const SAMPLE_DIR = path.join(process.cwd(), 'scripts/test/photo-recognition-samples')

const EXPECTATIONS: SampleExpectation[] = [
  {
    file: '01-juminzei-notice.png',
    expectedType: '住民税',
    expectedIssuer: '新宿区役所',
    expectedAmount: 48000,
    expectedDeadline: '2026-05-31',
  },
  {
    file: '02-kokumin-kenko-hoken.png',
    expectedType: '国民健康保険',
    expectedIssuer: '横浜市',
    expectedAmount: 23400,
    expectedDeadline: '2026-06-30',
  },
  {
    file: '03-nenkin-payment.png',
    expectedType: '国民年金',
    expectedIssuer: '日本年金機構',
    expectedAmount: 16980,
    expectedDeadline: '2026-05-15',
  },
  {
    file: '04-zairyu-card-renewal.png',
    expectedType: '在留カード',
    expectedIssuer: '出入国在留管理庁',
    expectedDeadline: '2026-07-10',
  },
  {
    file: '05-kakutei-shinkoku.png',
    expectedType: '確定申告',
    expectedIssuer: '税務署',
    expectedAmount: 72500,
    expectedDeadline: '2026-03-16',
  },
  {
    file: '06-gensen-choshu.png',
    expectedType: '源泉徴収票',
    expectedIssuer: '株式会社サンプル',
    expectedAmount: 4800000,
  },
  {
    file: '07-kazei-shomeisho.png',
    expectedType: '課税証明書',
    expectedIssuer: '大阪市役所',
    expectedAmount: 3820000,
  },
  {
    file: '08-immigration-fusei.png',
    expectedType: '資料提出通知書',
    expectedIssuer: '東京出入国在留管理局',
    expectedDeadline: '2026-05-08',
  },
  {
    file: '09-city-general-notice.png',
    expectedType: '市役所',
    expectedIssuer: '川口市役所',
  },
  {
    file: '10-bank-real-estate-contract.png',
    expectedType: '賃貸借契約書',
    expectedIssuer: '青山不動産株式会社',
    expectedAmount: 286000,
  },
]

function includesNormalized(actual: string | null | undefined, expected: string) {
  return String(actual ?? '').replace(/\s/g, '').includes(expected.replace(/\s/g, ''))
}

function scoreResult(result: Awaited<ReturnType<typeof recognizePhotoDocument>>['result'], expected: SampleExpectation) {
  const checks = [
    includesNormalized(result.docType, expected.expectedType),
    includesNormalized(result.issuer, expected.expectedIssuer),
  ]
  if (expected.expectedAmount !== undefined) checks.push(result.amount === expected.expectedAmount)
  if (expected.expectedDeadline) checks.push(result.deadline === expected.expectedDeadline)

  const passed = checks.filter(Boolean).length
  return {
    passed,
    total: checks.length,
    label: passed === checks.length ? 'pass' : passed >= Math.ceil(checks.length / 2) ? 'partial' : 'fail',
  }
}

async function main() {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('AWS Bedrock env is not configured; skipped live recognition test.')
    console.log('Run with: tsx --env-file=.env.local scripts/test/test-recognition.ts')
    return
  }

  const available = new Set(await readdir(SAMPLE_DIR))
  const rows = []
  for (const expected of EXPECTATIONS) {
    if (!available.has(expected.file)) {
      rows.push({ file: expected.file, error: 'missing sample' })
      continue
    }

    try {
      const bytes = await readFile(path.join(SAMPLE_DIR, expected.file))
      const output = await recognizePhotoDocument({
        bytes,
        mediaType: 'image/png',
        filename: expected.file,
      })
      const quality = scoreResult(output.result, expected)
      rows.push({
        file: expected.file,
        quality,
        result: output.result,
      })
    } catch (error) {
      rows.push({
        file: expected.file,
        error: error instanceof PhotoRecognitionError ? error.message : 'recognition failed',
      })
    }
  }

  console.log(JSON.stringify({ testedAt: new Date().toISOString(), rows }, null, 2))
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
