import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { getProfile } from '@/lib/auth/profile'

export const dynamic = 'force-dynamic'

const DISCLAIMER = '本回答仅供参考，不构成法律意见'

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

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      // Mock fallback：未配 API key 时返回占位提示
      return NextResponse.json({
        answer: `[Mock 回答] 你的问题已收到。这是一个待接入 Claude API 的演示回应。配置 ANTHROPIC_API_KEY 后会切换到真实回答。${DISCLAIMER}`,
        mock: true,
      })
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })
    const result = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
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
