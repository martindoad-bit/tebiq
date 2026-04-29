import { NextResponse } from 'next/server'
import { judge, type AnsweredItem, type JudgeResult } from '@/lib/check/questions/gijinkoku'
import { buildSummary } from '@/lib/check/summary'
import { GIJINKOKU_MATERIALS, type MaterialDetail } from '@/lib/check/materials'
import { getCurrentUser } from '@/lib/auth/session'
import type { Member } from '@/lib/db/schema'
import { err } from '@/lib/api/response'
import { db } from '@/lib/db'
import { purchases } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { isSubscriptionActive } from '@/lib/db/queries/subscriptions'

export const dynamic = 'force-dynamic'

const MODEL_ID = 'anthropic.claude-haiku-4-5-20251001-v1:0'

interface MaterialItem {
  category: string
  name: string
  where: string
  whatToBring: string
  duration: string
  cost: string
  online: string
  pitfall: string
}

interface GenerateResponse {
  generatedAt: string
  visaType: string
  verdict: JudgeResult['verdict']
  summary: string
  personalizedNotes: string
  triggered: { triggerLabel: string; severity: 'red' | 'yellow'; fixHint: string; selfFix: boolean }[]
  materials: MaterialItem[]
  profileSnapshot: ProfileSnapshot | null
}

interface ProfileSnapshot {
  visaType: string
  expiryDate: string
  yearsInJapan: string
  companyType: string
  recentChanges: string[]
}

function flattenMaterials(): MaterialItem[] {
  const out: MaterialItem[] = []
  for (const group of GIJINKOKU_MATERIALS) {
    for (const m of group.materials) {
      out.push(toMaterialItem(group.category, m))
    }
  }
  return out
}

function toMaterialItem(category: string, m: MaterialDetail): MaterialItem {
  return {
    category,
    name: m.name,
    where: m.where,
    whatToBring: m.whatToBring.join('、'),
    duration: m.duration,
    cost: m.cost,
    online: m.online ? `是${m.onlineNote ? ` · ${m.onlineNote}` : ''}` : '否',
    pitfall: m.pitfall,
  }
}

function profileSnapshot(m: Member | null): ProfileSnapshot | null {
  if (!m) return null
  return {
    visaType: m.visaType ?? '',
    expiryDate: m.visaExpiry ?? '',
    yearsInJapan: m.arrivedAt ?? '',
    companyType: m.companyType ?? '',
    recentChanges: m.recentChanges ? Object.keys(m.recentChanges) : [],
  }
}

function buildAiSystemPrompt(
  result: JudgeResult,
  summary: string,
  member: Member | null,
): string {
  const trig = result.triggered.map(t => `- ${t.triggerLabel}（${t.severity}）`).join('\n') || '- 无触发准备事项'
  const profilePart = member
    ? `\n用户档案：
- 国籍：${member.nationality ?? '未填'}
- 签证：${member.visaType ?? '未填'}
- 在留期限：${member.visaExpiry ?? '未填'}
- 来日年月：${member.arrivedAt ?? '未填'}
- 公司类别：${member.companyType ?? '未填'}
- 行业：${member.currentJobIndustry ?? '未填'}\n`
    : ''
  return `你是 TEBIQ 的在日手续助理。基于用户的问卷答案，生成一段 200 字以内的「你需要特别注意的地方」。

判定结果：${result.verdict}
待确认事项触发项：
${trig}

摘要：${summary}
${profilePart}
要求：
1. 直接给出"需要特别注意的地方"，不要重复摘要
2. 200 字以内，分 2-3 个要点
3. 陈述事实，不做法律判断，不说"会被拒"
4. 复杂情况建议咨询专家
5. 末尾不要加任何免责声明（程序会另行添加）`
}

async function callAi(systemPrompt: string): Promise<string> {
  const awsKey = process.env.AWS_ACCESS_KEY_ID
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
  if (!awsKey || !awsSecret) {
    return '请根据上方准备事项逐条处理，材料齐全后再行递交。复杂情况建议咨询专家。'
  }
  try {
    const AnthropicBedrock = (await import('@anthropic-ai/bedrock-sdk')).default
    const client = new AnthropicBedrock({
      awsAccessKey: awsKey,
      awsSecretKey: awsSecret,
      awsRegion: process.env.AWS_REGION ?? 'us-east-1',
    })
    const out = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: '请生成「你需要特别注意的地方」段落。' }],
    })
    const block = out.content.find(b => b.type === 'text')
    if (block && 'text' in block) return block.text
  } catch {
    /* fall-through to fallback */
  }
  return '请根据上方准备事项逐条处理，材料齐全后再行递交。复杂情况建议咨询专家。'
}

export async function POST(req: Request) {
  let body: { history?: AnsweredItem[]; visaType?: string; quizResultId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }
  const history = Array.isArray(body.history) ? body.history : []
  const visaType = typeof body.visaType === 'string' ? body.visaType : 'gijinkoku'
  const quizResultId = typeof body.quizResultId === 'string' ? body.quizResultId : undefined
  if (history.length === 0) {
    return NextResponse.json({ error: 'history required' }, { status: 400 })
  }

  // Block 11: the old ¥980 material package is no longer sold.
  // Existing paid purchases still work; new access comes from archive yearly.
  const user = await getCurrentUser()
  const paid = await hasPaidMaterialPackage(user?.familyId ?? null, quizResultId)
  if (!paid) {
    return err('payment_required', '请先开通档案保留', 402)
  }

  const result = judge(history)
  const summary = buildSummary(result.verdict, result, history)

  const personalizedNotes = await callAi(buildAiSystemPrompt(result, summary, user))

  const payload: GenerateResponse = {
    generatedAt: new Date().toISOString(),
    visaType,
    verdict: result.verdict,
    summary,
    personalizedNotes,
    triggered: result.triggered.map(t => ({
      triggerLabel: t.triggerLabel,
      severity: t.severity,
      fixHint: t.fixHint,
      selfFix: t.selfFix,
    })),
    materials: flattenMaterials(),
    profileSnapshot: profileSnapshot(user),
  }

  return NextResponse.json(payload)
}

/**
 * Returns true if the request can access the paid material package.
 *
 * - If a familyId is provided, any paid material_package row on that family
 *   counts (membership-style access).
 * - Else, if a quizResultId is provided, look for a paid material_package
 *   row whose metadata.quizResultId matches (one-shot access for the result
 *   page right after Stripe Checkout).
 *
 * Webhook (`checkout.session.completed`, mode=payment) is what creates the
 * paid row; see `app/api/stripe/webhook/route.ts`.
 */
async function hasPaidMaterialPackage(
  familyId: string | null,
  quizResultId: string | undefined,
): Promise<boolean> {
  if (familyId) {
    if (await isSubscriptionActive(familyId)) return true
    const rows = await db
      .select({ id: purchases.id })
      .from(purchases)
      .where(
        and(
          eq(purchases.familyId, familyId),
          eq(purchases.product, 'material_package'),
          eq(purchases.status, 'paid'),
        ),
      )
      .limit(1)
    if (rows.length > 0) return true
  }
  if (quizResultId) {
    const rows = await db
      .select({ id: purchases.id, metadata: purchases.metadata })
      .from(purchases)
      .where(
        and(
          eq(purchases.product, 'material_package'),
          eq(purchases.status, 'paid'),
        ),
      )
    for (const r of rows) {
      const m = r.metadata as { quizResultId?: string } | null
      if (m?.quizResultId && m.quizResultId === quizResultId) return true
    }
  }
  return false
}
