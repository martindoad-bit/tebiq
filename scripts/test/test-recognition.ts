import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import {
  detectImageFormat,
  PhotoRecognitionError,
  recognizePhotoDocument,
} from '../../lib/photo/bedrock'
import type { PhotoRecognitionResult } from '../../lib/photo/types'
import type { PhotoUserContext } from '../../lib/photo/user-context'

interface SampleExpectation {
  file: string
  expectedType: string
  expectedIssuer: string
  expectedAmount?: string
  expectedDeadline?: string
}

const SAMPLE_DIR = path.join(process.cwd(), 'scripts/test/photo-recognition-samples')

const EXPECTATIONS: SampleExpectation[] = [
  {
    file: '01-juminzei-notice.png',
    expectedType: '住民税',
    expectedIssuer: '新宿区役所',
    expectedAmount: '48000',
    expectedDeadline: '2026-05-31',
  },
  {
    file: '02-kokumin-kenko-hoken.png',
    expectedType: '国民健康保険',
    expectedIssuer: '横浜市',
    expectedAmount: '23400',
    expectedDeadline: '2026-06-30',
  },
  {
    file: '03-nenkin-payment.png',
    expectedType: '国民年金',
    expectedIssuer: '日本年金機構',
    expectedAmount: '16980',
    expectedDeadline: '2026-05-15',
  },
]

function includesNormalized(actual: string | null | undefined, expected: string) {
  return String(actual ?? '').replace(/\s|,|円/g, '').includes(expected.replace(/\s|,|円/g, ''))
}

function scoreResult(result: PhotoRecognitionResult, expected?: SampleExpectation) {
  if (!expected) return { label: 'not_scored', passed: 0, total: 0 }
  const checks = [
    includesNormalized(result.docType, expected.expectedType),
    includesNormalized(result.issuer, expected.expectedIssuer),
  ]
  if (expected.expectedAmount !== undefined) {
    checks.push(includesNormalized(result.amount, expected.expectedAmount))
  }
  if (expected.expectedDeadline) checks.push(result.deadline === expected.expectedDeadline)

  const passed = checks.filter(Boolean).length
  return {
    passed,
    total: checks.length,
    label: passed === checks.length ? 'pass' : passed >= Math.ceil(checks.length / 2) ? 'partial' : 'fail',
  }
}

function fakeUserContext(userId: string | undefined): PhotoUserContext | null {
  if (!userId) return null
  return {
    visaType: 'gijinkoku',
    daysToVisaExpiry: 60,
    hasRecentQuizResult: true,
    recentDocumentTypes: ['住民税通知', '在留期間更新'],
    recentDocuments: [
      { issuer: '新宿区役所', docType: '住民税通知' },
      { issuer: '東京出入国在留管理局', docType: '在留期間更新のお知らせ' },
    ],
  }
}

function readableSummary(result: PhotoRecognitionResult, userContextInjected: boolean) {
  return {
    type: result.docType ?? '未识别',
    issuer: result.issuer ?? '不明',
    confidence: result.recognitionConfidence,
    isEnvelope: result.isEnvelope,
    deadline: result.deadline,
    amount: result.amount,
    needsExpertAdvice: result.needsExpertAdvice,
    userContextInjected,
    contextHints: result.contextHints ?? [],
  }
}

async function recognizeOne(filePath: string, expected?: SampleExpectation) {
  const bytes = await readFile(filePath)
  const detected = detectImageFormat(bytes)
  const output = await recognizePhotoDocument({
    bytes,
    mediaType: detected.mediaType,
    filename: path.basename(filePath),
    userContext: fakeUserContext(process.env.USER_ID),
  })
  return {
    file: filePath,
    detectedFormat: detected.kind,
    model: output.modelId,
    mediaTypeSent: output.mediaType,
    recognition: output.result,
    summary: readableSummary(output.result, output.userContextInjected),
    quality: scoreResult(output.result, expected),
  }
}

async function main() {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('AWS Bedrock env is not configured; skipped live recognition test.')
    console.log('Run with: IMAGE=/path/to/photo.jpg USER_ID=test_user_001 npx tsx scripts/test/test-recognition.ts')
    return
  }

  const explicitImage = process.env.IMAGE ?? process.argv[2]
  if (explicitImage) {
    const result = await recognizeOne(path.resolve(explicitImage))
    console.log(JSON.stringify({ testedAt: new Date().toISOString(), result }, null, 2))
    return
  }

  const available = new Set(await readdir(SAMPLE_DIR).catch(() => []))
  const rows = []
  for (const expected of EXPECTATIONS) {
    if (!available.has(expected.file)) {
      rows.push({ file: expected.file, error: 'missing sample' })
      continue
    }

    try {
      rows.push(await recognizeOne(path.join(SAMPLE_DIR, expected.file), expected))
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
