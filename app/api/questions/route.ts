import { err } from '@/lib/api/response'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST() {
  return err(
    'legacy_question_api_disabled',
    '请使用 /api/consultation/stream 生成咨询回答',
    410,
  )
}
