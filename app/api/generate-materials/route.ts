import { NextResponse } from 'next/server'
import { judge, type AnsweredItem, type JudgeResult } from '@/lib/check/questions'
import { buildSummary } from '@/lib/check/summary'
import { GIJINKOKU_MATERIALS, type MaterialDetail } from '@/lib/check/materials'
import { getCurrentUser } from '@/lib/auth/session'
import { getProfile, type UserProfile } from '@/lib/auth/profile'

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

function profileSnapshot(p: UserProfile | null): ProfileSnapshot | null {
  if (!p) return null
  return {
    visaType: p.visaType,
    expiryDate: p.expiryDate,
    yearsInJapan: p.yearsInJapan,
    companyType: p.companyType,
    recentChanges: p.recentChanges,
  }
}

function buildAiSystemPrompt(
  result: JudgeResult,
  summary: string,
  profile: UserProfile | null,
): string {
  const trig = result.triggered.map(t => `- ${t.triggerLabel}（${t.severity}）`).join('\n') || '- 无触发风险项'
  const profilePart = profile
    ? `\n用户档案：
- 签证：${profile.visaType}
- 在留期限：${profile.expiryDate}
- 在日年数：${profile.yearsInJapan}
- 公司类别：${profile.companyType}
- 最近变化：${profile.recentChanges.join('、') || '无'}\n`
    : ''
  return `你是 TEBIQ 的行政书士助理。基于用户的问卷答案，生成一段 200 字以内的「你需要特别注意的地方」。

判定结果：${result.verdict}
风险触发项：
${trig}

摘要：${summary}
${profilePart}
要求：
1. 直接给出"需要特别注意的地方"，不要重复摘要
2. 200 字以内，分 2-3 个要点
3. 陈述事实，不做法律判断，不说"会被拒"
4. 复杂情况建议联系书士
5. 末尾不要加任何免责声明（程序会另行添加）`
}

async function callAi(systemPrompt: string): Promise<string> {
  const awsKey = process.env.AWS_ACCESS_KEY_ID
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
  if (!awsKey || !awsSecret) {
    return '请根据上方风险项逐条处理，材料齐全后再行递交。复杂情况建议咨询持牌行政书士。'
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
  return '请根据上方风险项逐条处理，材料齐全后再行递交。复杂情况建议咨询持牌行政书士。'
}

export async function POST(req: Request) {
  let body: { history?: AnsweredItem[]; visaType?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }
  const history = Array.isArray(body.history) ? body.history : []
  const visaType = typeof body.visaType === 'string' ? body.visaType : 'gijinkoku'
  if (history.length === 0) {
    return NextResponse.json({ error: 'history required' }, { status: 400 })
  }

  const result = judge(history)
  const summary = buildSummary(result.verdict, result, history)

  const user = await getCurrentUser()
  const profile = user ? await getProfile(user.phone) : null

  const personalizedNotes = await callAi(buildAiSystemPrompt(result, summary, profile))

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
    profileSnapshot: profileSnapshot(profile),
  }

  return NextResponse.json(payload)
}
