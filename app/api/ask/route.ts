import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { getProfile } from '@/lib/auth/profile'

export const dynamic = 'force-dynamic'

const DISCLAIMER = '本回答仅供参考，不构成法律意见'
const MODEL_ID = 'anthropic.claude-haiku-4-5-20251001-v1:0'

function buildSystemPrompt(profile: Awaited<ReturnType<typeof getProfile>>): string {
  if (!profile) {
    return `你是 TEBIQ 的签证和生活手续助理。

回答规则：
1. 陈述事实，不做法律判断
2. 150 字以内，末尾加"${DISCLAIMER}"
3. 复杂情况建议联系书士`
  }
  return `你是 TEBIQ 的签证和生活手续助理。

用户档案：
- 在留资格：${profile.visaType}
- 在留期限：${profile.expiryDate}
- 在日年数：${profile.yearsInJapan}
- 公司类别：${profile.companyType}
- 最近变化：${profile.recentChanges.join('、') || '无'}

回答规则：
1. 基于用户的具体情况回答，不要给泛泛的一般性建议
2. 陈述事实，不做法律判断
3. 150 字以内，末尾加"${DISCLAIMER}"
4. 复杂情况建议联系书士`
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await req.json()
    const question = String(body?.question ?? '').trim()
    if (!question) {
      return NextResponse.json({ error: '请输入问题' }, { status: 400 })
    }

    const profile = await getProfile(user.phone)
    const systemPrompt = buildSystemPrompt(profile)

    const awsKey = process.env.AWS_ACCESS_KEY_ID
    const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
    if (!awsKey || !awsSecret) {
      // Mock fallback
      return NextResponse.json({
        answer: `[Mock 回答] 你的问题已收到。AI 功能配置中，请稍后再试。${DISCLAIMER}`,
        mock: true,
      })
    }

    const AnthropicBedrock = (await import('@anthropic-ai/bedrock-sdk')).default
    const client = new AnthropicBedrock({
      awsAccessKey: awsKey,
      awsSecretKey: awsSecret,
      awsRegion: process.env.AWS_REGION ?? 'us-east-1',
    })
    const result = await client.messages.create({
      model: MODEL_ID,
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: 'user', content: question }],
    })
    const textBlock = result.content.find(b => b.type === 'text')
    const answer = textBlock && 'text' in textBlock ? textBlock.text : '抱歉，未能生成回答。'
    return NextResponse.json({ answer, mock: false })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '请求失败' },
      { status: 500 },
    )
  }
}
