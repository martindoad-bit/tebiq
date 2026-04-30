import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { FREQUENT_QA_SEEDS, type AnswerSeed } from './answer-seeds'
import {
  ANSWER_BOUNDARY_NOTE,
  type AnswerResult,
  type AnswerSection,
  type AnswerSource,
} from './types'
import { matchDecisionQuery } from '@/lib/decision/cards'
import type { DecisionCard, DecisionOption, SourceRef } from '@/lib/decision/types'

interface BuildAnswerInput {
  questionText: string
  visaType?: string | null
}

interface KnowledgeSeed {
  slug: string
  title: string
  visaType: string | null
  dimensionKey: string | null
  body: string
  sourcePath: string
}

let knowledgeCache: Promise<KnowledgeSeed[]> | null = null

export async function buildAnswer(input: BuildAnswerInput): Promise<AnswerResult> {
  const questionText = clean(input.questionText)
  const normalized = normalize(questionText)

  const qaSeed = bestQaSeed(normalized)
  if (qaSeed) {
    return sanitizeAnswer(seedToAnswer(qaSeed, questionText))
  }

  const decisionMatch = await matchDecisionQuery(questionText)
  if (decisionMatch.card) {
    return sanitizeAnswer(decisionCardToAnswer(decisionMatch.card, questionText))
  }

  const knowledge = await bestKnowledgeSeed(normalized, input.visaType)
  if (knowledge) {
    return sanitizeAnswer(knowledgeSeedToAnswer(knowledge, questionText))
  }

  return sanitizeAnswer(ruleBasedAnswer(questionText, normalized))
}

function decisionCardToAnswer(card: DecisionCard, questionText: string): AnswerResult {
  const sections: AnswerSection[] = []
  if (card.userState.summary) {
    sections.push({ heading: '当前处境', body: String(card.userState.summary) })
  }
  if (card.decisionOptions.length) {
    sections.push({
      heading: '候选选项',
      body: optionsToText(card.decisionOptions),
    })
  }
  if (card.recommendedAction) {
    sections.push({ heading: '推荐方向', body: card.recommendedAction })
  }
  if (card.whyNotOtherOptions.length) {
    sections.push({
      heading: '为什么不是其他选项',
      body: optionsToText(card.whyNotOtherOptions),
    })
  }
  if (card.bodyMarkdown) {
    sections.push({ heading: '补充说明', body: plainMarkdown(card.bodyMarkdown).slice(0, 1200) })
  }

  return {
    ok: true,
    answer_type: 'matched',
    answer_level: card.answerLevel,
    review_status: 'reviewed',
    title: card.title,
    summary: card.recommendedAction || card.fallback || `已整理与「${questionText.slice(0, 48)}」相关的手续方向。`,
    sections: sections.length ? sections : [{ heading: '已整理内容', body: card.fallback ?? card.title }],
    next_steps: card.steps.length
      ? card.steps.map(step => `${step.label}${step.detail ? `：${step.detail}` : ''}`).slice(0, 5)
      : defaultNextSteps(questionText),
    related_links: [{ title: 'Decision Lab', href: `/decision-lab/${card.slug}` }],
    sources: card.sourceRefs.map(sourceRefToSource),
    query_id: null,
    answer_id: null,
    matched_card_id: card.id,
    boundary_note: card.boundaryNote ?? ANSWER_BOUNDARY_NOTE,
  }
}

function seedToAnswer(seed: AnswerSeed, _questionText: string): AnswerResult {
  return {
    ok: true,
    answer_type: seed.answerType ?? 'matched',
    answer_level: seed.answerLevel,
    review_status: 'reviewed',
    title: seed.title,
    summary: seed.summary,
    sections: seed.sections,
    next_steps: seed.nextSteps,
    related_links: seed.relatedLinks ?? [],
    sources: seed.sources,
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function knowledgeSeedToAnswer(seed: KnowledgeSeed, _questionText: string): AnswerResult {
  const parsedSections = markdownSections(seed.body)
  const sections = parsedSections.length > 0
    ? parsedSections.slice(0, 4)
    : [{ heading: '整理内容', body: plainMarkdown(seed.body).slice(0, 1000) }]
  const related = seed.visaType && seed.dimensionKey
    ? [{ title: '打开对应检查项', href: `/check/${seed.visaType}/${seed.dimensionKey}` }]
    : [{ title: '续签材料准备检查', href: '/check' }]
  return {
    ok: true,
    answer_type: 'matched',
    answer_level: 'L2',
    review_status: 'reviewed',
    title: seed.title,
    summary: `这个问题和「${seed.title}」相关。先按材料准备维度确认事实，再决定是否需要人工确认。`,
    sections,
    next_steps: [
      '先确认这件事是否属于你的当前在留资格和申请阶段。',
      '把相关通知、证明书、合同或缴纳记录放到同一处。',
      '如果材料里有期限，先按官方文书期限处理。',
    ],
    related_links: related,
    sources: [{ title: seed.title, source_grade: 'B' }],
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function ruleBasedAnswer(questionText: string, normalized: string): AnswerResult {
  if (needsExpertChecklist(normalized)) {
    return cannotDetermineAnswer(questionText)
  }

  return {
    ok: true,
    answer_type: 'draft',
    answer_level: 'L2',
    review_status: 'unreviewed',
    title: '初步整理，尚未人工复核',
    summary:
      '当前问题没有命中已整理答案。TEBIQ 先按一般手续整理方式给出确认路径，并把问题送入后台复核。',
    sections: [
      {
        heading: '先确认这是什么类型的问题',
        body: '把问题拆成三类信息：发件机构或窗口、你当前在留资格、这件事要求你在什么期限前做什么。',
      },
      {
        heading: '需要先收集的材料',
        body: '相关通知原件、在留卡、住民票或税/社保记录、公司或学校给出的书面说明。没有原件时，先保存截图和发送日期。',
      },
      {
        heading: '现在可以做的动作',
        body: '先确认官方窗口、期限和材料清单。不要根据单一句子判断申请结果；需要个别判断时，把材料带给专业人士确认。',
      },
    ],
    next_steps: defaultNextSteps(questionText),
    related_links: [
      { title: '拍照识别文书', href: '/photo' },
      { title: '续签材料准备检查', href: '/check' },
    ],
    sources: [],
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function cannotDetermineAnswer(_questionText: string): AnswerResult {
  return {
    ok: true,
    answer_type: 'cannot_determine',
    answer_level: 'L4',
    review_status: 'needs_expert',
    title: '这个情况需要进一步确认',
    summary:
      '这个问题涉及个别事实或材料不足，不能直接给出方向。你可以先确认下面的信息，再决定下一步。',
    sections: [
      {
        heading: '为什么不能直接判断',
        body: '同一句问题在不同在留资格、不同时间点、不同文书状态下，处理方向可能不同。TEBIQ 不替你判断申请结果。',
      },
      {
        heading: '先确认的信息',
        body: '当前在留资格、到期日、相关文书的发件机构、文书日期、是否已有处分/督促/未纳/公司异常记录。',
      },
      {
        heading: '材料准备',
        body: '保留原文书、缴纳记录、公司或学校说明、窗口沟通记录。涉及期限时，以文书上的官方期限优先。',
      },
    ],
    next_steps: [
      '确认当前在留资格和到期日。',
      '确认是否有官方文书、期限、金额或处分记录。',
      '把相关材料拍照归档，再带材料咨询行政書士等专业人士。',
    ],
    related_links: [
      { title: '拍照识别文书', href: '/photo' },
      { title: '我的提醒', href: '/timeline' },
    ],
    sources: [],
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function bestQaSeed(normalized: string): AnswerSeed | null {
  const ranked = FREQUENT_QA_SEEDS
    .map(seed => ({ seed, ...rankKeywords(normalized, seed.keywords) }))
    .filter(item => item.matches >= 2)
    .sort((a, b) => b.score - a.score)
  return ranked[0]?.seed ?? null
}

async function bestKnowledgeSeed(normalized: string, visaType?: string | null): Promise<KnowledgeSeed | null> {
  const seeds = await loadKnowledgeSeeds()
  const ranked = seeds
    .map(seed => ({ seed, score: scoreKnowledge(normalized, seed, visaType) }))
    .filter(item => item.score >= 4)
    .sort((a, b) => b.score - a.score)
  return ranked[0]?.seed ?? null
}

function loadKnowledgeSeeds(): Promise<KnowledgeSeed[]> {
  knowledgeCache ??= readKnowledgeSeeds()
  return knowledgeCache
}

async function readKnowledgeSeeds(): Promise<KnowledgeSeed[]> {
  const dirs = [
    path.join(process.cwd(), 'docs/answer-seed'),
    path.join(process.cwd(), 'docs/knowledge-seed/check-dimensions'),
    path.join(process.cwd(), 'docs/knowledge-seed/dimensions-visa-specific'),
  ]
  const files = (await Promise.all(dirs.map(dir => listMarkdownFiles(dir).catch(() => [])))).flat()
  const seeds: KnowledgeSeed[] = []
  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    const parsed = matter(raw)
    const title = stringOrDefault(parsed.data.title, path.basename(file, path.extname(file)))
    const slug = stringOrDefault(parsed.data.slug, path.basename(file, path.extname(file)))
    seeds.push({
      slug,
      title,
      visaType: stringOrNull(parsed.data.visa_type ?? parsed.data.visaType),
      dimensionKey: stringOrNull(parsed.data.dimension_key ?? parsed.data.dimensionKey),
      body: parsed.content.trim(),
      sourcePath: file,
    })
  }
  return seeds
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listMarkdownFiles(fullPath)
    if (!entry.isFile()) return []
    return /\.md$/i.test(entry.name) ? [fullPath] : []
  }))
  return nested.flat()
}

function markdownSections(markdown: string): AnswerSection[] {
  const lines = plainMarkdown(markdown).split('\n')
  const sections: AnswerSection[] = []
  let current: AnswerSection | null = null
  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/)
    if (headingMatch) {
      if (current?.body.trim()) sections.push({ ...current, body: current.body.trim() })
      current = { heading: headingMatch[1].trim(), body: '' }
      continue
    }
    if (current) {
      current.body += `${line}\n`
    }
  }
  if (current?.body.trim()) sections.push({ ...current, body: current.body.trim().slice(0, 1100) })
  return sections.filter(section => section.body.length >= 20)
}

function optionsToText(options: DecisionOption[]): string {
  return options.map(item => `- ${item.label}${item.detail ? `：${item.detail}` : ''}`).join('\n')
}

function sourceRefToSource(source: SourceRef): AnswerSource {
  return {
    title: source.title,
    url: source.url,
    source_grade: source.source_grade ?? source.sourceGrade,
  }
}

function defaultNextSteps(questionText: string): string[] {
  return [
    '确认相关文书、窗口或公司/学校发出的原始说明。',
    '记录日期、期限、金额、发件机构和你当前在留资格。',
    questionText.includes('期限') || questionText.includes('到期')
      ? '先处理文书上的期限，再补充解释材料。'
      : '如果无法确认窗口或材料，先拍照归档并咨询专业人士。',
  ]
}

function scoreKnowledge(normalized: string, seed: KnowledgeSeed, visaType?: string | null): number {
  const haystack = normalize(`${seed.title} ${seed.slug} ${seed.dimensionKey ?? ''} ${seed.body.slice(0, 1400)}`)
  const tokens = queryTokens(normalized)
  let score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0)
  if (seed.visaType && visaType && seed.visaType === visaType) score += 2
  if (seed.title && normalized.includes(normalize(seed.title).slice(0, 4))) score += 3
  return score
}

function rankKeywords(normalized: string, keywords: string[]): { score: number; matches: number } {
  let score = 0
  let matches = 0
  for (const keyword of keywords) {
    if (!normalized.includes(normalize(keyword))) continue
    matches += 1
    score += normalize(keyword).length >= 4 ? 3 : 2
  }
  return { score, matches }
}

function queryTokens(normalized: string): string[] {
  const compact = normalized.replace(/[^A-Za-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, ' ')
  const words = compact.split(/\s+/).filter(token => token.length >= 2)
  const grams: string[] = []
  for (let i = 0; i < normalized.length - 1; i += 1) {
    const gram = normalized.slice(i, i + 2)
    if (/[A-Za-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(gram)) grams.push(gram)
  }
  return Array.from(new Set([...words, ...grams])).slice(0, 80)
}

function needsExpertChecklist(normalized: string): boolean {
  return [
    '逮捕',
    '处分',
    '処分',
    '犯罪',
    '罰金',
    '交通違反',
    '饮酒',
    '飲酒',
    '不法',
    '超时',
    '雇错',
    '签证不符',
    '公司异常',
    '资本金不够',
  ].some(keyword => normalized.includes(normalize(keyword)))
}

function plainMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '- ')
    .trim()
}

function sanitizeAnswer(answer: AnswerResult): AnswerResult {
  return {
    ...answer,
    title: sanitizeCopy(answer.title),
    summary: sanitizeCopy(answer.summary),
    sections: answer.sections.map(section => ({
      heading: sanitizeCopy(section.heading),
      body: sanitizeCopy(section.body),
    })),
    next_steps: answer.next_steps.map(sanitizeCopy),
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function sanitizeCopy(value: string): string {
  return value
    .replaceAll('拒签概率', '审查不利可能性')
    .replaceAll('一定通过', '不能保证通过')
    .replaceAll('一定不通过', '需要进一步确认')
    .replaceAll('一定被拒', '可能产生不利影响')
    .replaceAll('必定拒签', '可能产生不利影响')
    .replaceAll('高危', '需重点确认')
    .replaceAll('危险', '需确认')
    .replaceAll('AI 判断', '系统整理')
    .replaceAll('自动判定', '自动整理')
    .replaceAll('秒懂', '整理')
    .replaceAll('太棒了', '已完成')
    .replaceAll('限时优惠', '当前方案')
    .replaceAll('马上升级', '查看方案')
}

function normalize(input: string): string {
  return clean(input).toLowerCase()
}

function clean(input: string): string {
  return input.trim().replace(/\s+/g, ' ').slice(0, 4000)
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function stringOrDefault(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}
