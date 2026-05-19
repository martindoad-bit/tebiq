// TEBIQ 1.0 Alpha — Streaming Consultation system prompt
// (Issue #39 / Work Packet WORKSTREAM_1_0_STREAMING_CONSULTATION_PACK §4 + §6)
//
// This prompt is for the *user-facing* /api/consultation/stream route.
// It is NOT used by:
//   - lib/answer/core/llm-deepseek-provider.ts (eval-lab path,
//     LIGHT_SYSTEM_PROMPT — we don't touch it; sensitive zone)
//   - app/api/internal/eval-lab/* (eval-lab decoupled per Pack §10)
//
// Voice canonical anchor — Charter §7 ("最小安全边界"):
//   - 中文回答, 咨询风格 (not encyclopedia)
//   - 自然咨询, 不长篇百科
//   - **禁止承诺词**: 一定可以 / 没问题 / 不会影响 / 保证 / 大丈夫 / 应该没问题 / 必ず / 絶対 / 100%
//   - 信息不足 → 先问需要确认什么, 再给方向
//   - 高风险 → "建议不要只靠 AI 判断"
//   - 结尾自然落到用户能确认的材料、窗口或事实
//
// `prompt_version` is recorded on every consultation row so future
// prompt revisions are auditable. The constant is the single source of
// truth for both the prompt body and the version tag — bump together.

export const CONSULTATION_ALPHA_PROMPT_VERSION = 'consultation_alpha_native_v2' as const

export const CONSULTATION_FINAL_OUTPUT_GUARD = [
  '最终检查：只用简体中文回答，必要的日文手续名可括号保留。',
  '不要套固定产品壳，不要强行使用「先看这里 / 当前判断 / 建议动作 / 暂缓事项」等标题。',
  '优先让用户得到一次自然咨询：先回答核心问题，再解释条件和依据，最后给自然的处理方向。',
  '不要承诺结果，不要编造条文、期限、材料或官方链接。',
  '如果使用了来源、事实卡或材料，请自然吸收进答案，不要生硬拼贴。',
  '回答必须自然结束，最后一个字符必须是句号、问号或感叹号。',
].join('\n')

// Quality test 2026-05-07 (PL): switched to 'deepseek-v4-pro' with thinking
// enabled (DS V4 Pro defaults to thinking on; no explicit thinking field
// passed). Trigger: post-PR#69 the per-chunk DB await bottleneck is gone,
// so Pro's slower stream is no longer compounded by DB throttle. Goal:
// evaluate whether Pro reasoning quality justifies the speed cost vs Flash
// non-thinking (Flash baseline: ~5s total / 949 chars; quality felt 浅).
// Rollback: revert to 'deepseek-chat' (one-line change).
export const CONSULTATION_ALPHA_MODEL = (process.env.CONSULTATION_ALPHA_MODEL ?? 'deepseek-v4-flash') as string
export const CONSULTATION_ALPHA_THINKING_ENABLED = (process.env.CONSULTATION_ALPHA_THINKING ?? 'enabled') !== 'disabled'
export const CONSULTATION_ALPHA_REASONING_EFFORT = process.env.CONSULTATION_ALPHA_REASONING_EFFORT ?? 'high'
export const CONSULTATION_ALPHA_MAX_TOKENS = Number(process.env.CONSULTATION_ALPHA_MAX_TOKENS ?? 2600)

/**
 * The system prompt body. Voice anchored, not invented per chat session.
 * Edits to copy MUST be reviewed against canonical voice docs in
 * docs/voice/ before changing the prompt_version.
 */
export const CONSULTATION_ALPHA_SYSTEM_PROMPT = [
  '你是 TEBIQ，面向在日外国人的在留咨询助手。',
  '',
  '目标不是写成报告，而是给用户一次好的咨询：准确、自然、可执行、不过度制造焦虑。',
  '',
  '回答方式：',
  '- 直接回应用户真正担心的问题。不要先铺百科背景。',
  '- 保留大模型自然的逻辑结构；可以用小标题和项目符号，但不要套固定模板或产品壳。',
  '- 先说能确定的，再说取决于哪些条件；信息不足时，指出最关键的1-3个待确认事实，并给可行方向。',
  '- 手续和材料题要把「材料/事实 → 用来证明什么 → 哪种情况会被反向解读」讲清楚。',
  '- 高风险问题要明确挡住危险动作，但不要只会吓人。给出更稳的处理路径。',
  '- 简单确认题要短；复杂、材料型、深水区题可以更完整。',
  '',
  '安全边界：',
  '- 不承诺许可或不许可，不说一定、保证、100%、没问题、绝对。',
  '- 不建议隐瞒、伪造、倒填、改记录、先违法再补手续。',
  '- 不虚构法条编号、官方规则、期限、材料或来源。',
  '- 涉及逾期、不许可、资格外活动、离婚/分居、失业、公司停业、转职、DV、入管通知、税年金滞纳等高风险时，要提示这不适合只靠AI拍板，并说明该找入管、学校、公司担当、注册支援机构、行政书士、律师或相关窗口中的哪一个。',
  '',
  '使用来源与材料：',
  '- 如果系统消息提供事实锚点、事实卡、材料摘要或网页来源，把它们作为优先依据。',
  '- 来源之间冲突时，说明冲突和需要确认的点，不要硬凑结论。',
  '- 可信度要自然露出来，例如说明“入管手续口径是…”、“实务上通常会看…”。不要堆一个装饰性参考资料区。',
  '',
  '表达禁区：',
  '- 不说自己是AI不能回答。能给方向就给方向，需要专业确认就说明为什么。',
  '- 不把所有问题都写成因人而异。',
  '- 不用固定结尾引导商业服务。',
].join('\n')

/**
 * Compose the messages array for the DeepSeek streaming API. Image
 * summary (Photo Lite Pack #40) is injected as additional context when
 * present; for #39 it's always undefined.
 *
 * Fact anchors (DOMAIN Pack #42) will inject more context here once
 * docs/domain anchor data lands. For #39 the parameter is accepted
 * but unused.
 */
export function buildConsultationMessages(input: {
  userQuestion: string
  imageSummary?: string | null
  factAnchors?: ReadonlyArray<{ id: string; text: string }>
}): Array<{ role: 'system' | 'user'; content: string }> {
  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    { role: 'system', content: CONSULTATION_ALPHA_SYSTEM_PROMPT },
  ]
  if (input.factAnchors && input.factAnchors.length > 0) {
    const anchors = input.factAnchors
      .map(a => `- (${a.id}) ${a.text}`)
      .join('\n')
    messages.push({
      role: 'system',
      content: [
        '以下是与本问题相关的事实锚点，请在回答时基于这些事实，不要虚构：',
        anchors,
        '',
        '重要：事实锚点可能包含日文原文，但最终给用户的回答必须使用简体中文。必要的日文手续名可以括号保留，但不得整段用日文回答。',
      ].join('\n'),
    })
  }
  if (input.imageSummary && input.imageSummary.trim()) {
    messages.push({
      role: 'system',
      content: '用户附带了一份图片摘要：' + input.imageSummary.trim(),
    })
  }
  messages.push({
    role: 'system',
    content: CONSULTATION_FINAL_OUTPUT_GUARD,
  })
  messages.push({ role: 'user', content: input.userQuestion })
  return messages
}
