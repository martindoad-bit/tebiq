import { existsSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import {
  parseRuntimeBlock,
  runtimeBlockFromLegacySections,
  runtimeBlockToPromptBlock,
  type PracticalRuntimeBlock,
  type PracticalRuntimeBlockSource,
} from './runtime-block'

export interface PracticalCardMatch {
  practical_card_id: string
  title: string
  topic: string
  risk_level: string
  confidence: string
  source_type: string
  matched_keywords: string[]
  score: number
  prompt_block: string
  prompt_chars: number
  runtime_block: PracticalRuntimeBlock | null
  runtime_block_source: PracticalRuntimeBlockSource
  material_bridge: string[]
  source_urls: string[]
}

interface PracticalCard {
  practical_card_id: string
  title: string
  topic: string
  risk_level: string
  confidence: string
  source_type: string
  runtime_bucket: string
  body: string
  prompt_block: string
  prompt_chars: number
  runtime_block: PracticalRuntimeBlock | null
  runtime_block_source: PracticalRuntimeBlockSource
  material_bridge: string[]
  source_urls: string[]
  trigger_keywords: string[]
}

const PRACTICAL_CARDS_DIR = join(process.cwd(), 'docs/practical-cards/runtime-v1')
const MAX_PRACTICAL_MATCHES = 2

const TRIGGER_ALIASES: Record<string, readonly string[]> = {
  'practical-001': ['离婚', '離婚', '配偶者届出', '配偶者に関する届出', '14天', '14日', '6个月', '6か月', '配偶签证'],
  'practical-002': ['离婚后继续留', '離婚後', '定住者', '正当理由', '正当な理由', '离婚后签证'],
  'practical-004': ['再婚', '日配', '日本人配偶', '日本人の配偶者', '出轨', '不倫', '离婚后再婚', '更新还是变更', '変更还是更新'],
  'practical-007': ['技人国转职', '技人国换公司', '転職', '换公司', '契約機関', '14日届出', '所属机构'],
  'practical-008': ['技人国', '更新还是变更', '在留資格変更', '在留期間更新', '换工作', '不同职种'],
  'practical-009': ['技人国副业', '副业', '兼業', '资格外活动', '資格外活動', '兼职', '翻译副业'],
  'practical-010': ['永住申请', '永住審査', '高才永住', '源泉票', '源泉徴収票', '住民税', '社会保险', '社会保険', '年金', '公的义务', '税金', '滞纳', '未纳'],
  'practical-011': ['永住申请中', '永住申請中', '在留卡到期', '当前在留', '更新还要不要', '永住 pending'],
  'practical-014': ['家族滞在', '资格外活动', '資格外活動', 'アルバイト', '28小时', '28時間', '勤務先未定'],
  'practical-015': ['家族滞在', '扶养人', '本体者', '主在留者', '老公换公司', '配偶换公司', '扶养者'],
  'practical-016': ['不许可', '不許可', '特例期间', '特例期間', '再申请', '再申請', '补材料超期', '審査待ち'],
  'practical-017': ['搬家', '地址', '住所', '住居地', '転居', '在留卡地址', '14日'],
  'practical-019': ['高才', '高度専門職', '高度人才', '积分', 'ポイント', '奖金', 'ボーナス', '年収', '80分', '70分'],
  'practical-021': ['永住申请', '永住申請', '10年', '就劳5年', '就労5年', '在留歴', '居住要件'],
  'practical-030': ['在留取消', '取消', '取り消し', '22条', '活动不实', '活動不実施'],
  'practical-037': ['补件', '補正', '追加资料', '追加資料', '资料提出通知', '資料提出通知'],
  'practical-047': ['特定技能', '换公司', '転職', '同分野', '业务区分', '分野', '転職制限'],
  'practical-051': ['永住者配偶', '永住者の配偶者', '随便打工', '工作限制', '就労制限なし', '离婚后'],
  'practical-054': ['高度専門職', '高度人才', '积分计算', 'ポイント計算', '学歴', '年収', '奖金', '资格加分'],
  'practical-067': ['特定技能', '离职', '辞职', '辞めたい', '転職', '支援机构', '登録支援機関', '自己找工作', '先跑'],
  'practical-079': ['理由书', '理由書', '経緯書', '说明书', '不许可理由', '申請理由'],
  'practical-085': ['配偶者ビザ', '日配', '婚姻真实性', '偽装結婚', '真实婚姻', '交往经过', '質問書'],
  'practical-086': ['フリーランス', '自由职业', '个人事业主', '個人事業主', '业务委托', '業務委託'],
  'practical-109': ['技人国', '业务委托', '業務委託', '雇佣合同', '雇用なし', '委托契约', '委任'],
  'practical-112': ['高度専門職', '高才', '指定书', '指定書', '换公司', '機関変更', '先去新公司'],
  'practical-124': ['特定技能', '受入機関変更', '换公司', '転職', '空白期间', '空白期間', '新公司'],
  'practical-187': ['更新和变更', '更新还是变更', '在留期間更新', '在留資格変更', '手续选错', '変更と更新'],
  'practical-228': ['公司员转业务委托', '会社員', '业务委托', '業務委託', 'フリーランス', '自由职业', '正社员转委托'],
  'practical-296': ['健康诊断', '健康診断', '体检', '结核', '感染症', '特定技能材料'],
  'practical-335': ['特定技能', '转职', '転職', '雇主変更', '评价调书', '評価調書', '健康診断', '履历书', '履歴書'],
}

let cache: PracticalCard[] | null = null

function normalize(text: string): string {
  return text.toLowerCase()
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map(v => v.trim()).filter(Boolean)))
}

function extractSection(body: string, headingCandidates: readonly string[]): string {
  const lines = body.split(/\r?\n/)
  let start = -1
  for (let i = 0; i < lines.length; i += 1) {
    const heading = lines[i].match(/^##\s+(.+?)\s*$/)?.[1]?.trim()
    if (heading && headingCandidates.some(candidate => heading.includes(candidate))) {
      start = i + 1
      break
    }
  }
  if (start < 0) return ''
  const out: string[] = []
  for (let i = start; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) break
    out.push(lines[i])
  }
  return out.join('\n').trim()
}

function compactMarkdown(text: string, maxChars: number): string {
  const compacted = text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*>\s?/gm, '')
    .trim()
  return compacted.length > maxChars
    ? `${compacted.slice(0, maxChars).trim()}…`
    : compacted
}

function promptBlockFor(cardId: string, data: Record<string, unknown>, body: string): {
  prompt_block: string
  runtime_block: PracticalRuntimeBlock
  runtime_block_source: PracticalRuntimeBlockSource
} {
  const title = String(data.title ?? cardId)
  const topic = String(data.topic ?? '')
  const risk = String(data.risk_level ?? '')
  const parsedRuntimeBlock = parseRuntimeBlock(data, body)
  if (parsedRuntimeBlock.block && parsedRuntimeBlock.source) {
    const promptBlock = runtimeBlockToPromptBlock({
      cardId,
      title,
      topic,
      riskLevel: risk,
      block: parsedRuntimeBlock.block,
    })
    return {
      prompt_block: promptBlock,
      runtime_block: parsedRuntimeBlock.block,
      runtime_block_source: parsedRuntimeBlock.source,
    }
  }

  const safeWording = extractSection(body, ['可注入答案', '安全表述'])
  const facts = extractSection(body, ['核心事実', '核心事实'])
  const difference = extractSection(body, ['法条層', '法条层'])
  const l5 = extractSection(body, ['L5', '深水'])
  const materials = extractSection(body, ['材料'])
  const sourceUrls = extractUrls(body)
  const legacyRuntimeBlock = runtimeBlockFromLegacySections({
    userSituation: extractSection(body, ['用户場景', '用户场景', '用者場景']),
    shortAnswer: firstUsefulLine(safeWording || facts),
    practicalRule: compactMarkdown(safeWording || facts, 360),
    officialAnchor: firstUsefulLine(difference),
    risk: linesFromMarkdown(l5).slice(0, 3),
    materialBridge: linesFromMarkdown(materials).slice(0, 4),
    sourceUrls,
  })
  const factsForPrompt = safeWording ? '' : facts
  const parts = [
    safeWording && `可直接采用的实务口径：\n${compactMarkdown(safeWording, 460)}`,
    factsForPrompt && `核心事实：\n${compactMarkdown(factsForPrompt, 420)}`,
    difference && `法条/实务差异：\n${compactMarkdown(difference, 260)}`,
    materials && `材料提示：\n${compactMarkdown(materials, 220)}`,
    l5 && `高风险信号：\n${compactMarkdown(l5, 220)}`,
  ].filter(Boolean)

  const promptBlock = [
    `【实务卡 ${cardId}】${title}`,
    topic ? `主题：${topic}` : '',
    risk ? `风险级别：${risk}` : '',
    '',
    parts.join('\n\n'),
  ].filter(Boolean).join('\n')
  return {
    prompt_block: promptBlock,
    runtime_block: legacyRuntimeBlock,
    runtime_block_source: 'legacy_sections',
  }
}

function loadCards(): PracticalCard[] {
  if (cache) return cache
  if (!existsSync(PRACTICAL_CARDS_DIR)) {
    cache = []
    return cache
  }
  cache = readdirSync(PRACTICAL_CARDS_DIR)
    .filter(name => /^practical-\d+\.md$/.test(name))
    .map(name => {
      const file = join(PRACTICAL_CARDS_DIR, name)
      const parsed = matter(readFileSync(file, 'utf8'))
      const data = parsed.data as Record<string, unknown>
      const id = String(data.practical_card_id ?? name.replace(/\.md$/, ''))
      const aliases = TRIGGER_ALIASES[id] ?? []
      const title = String(data.title ?? id)
      const topic = String(data.topic ?? '')
      const scene = extractSection(parsed.content, ['用户場景', '用户场景', '用者場景'])
      const sceneKeywords = scene.match(/[一-龥ぁ-んァ-ヶーA-Za-z0-9]{2,}/g) ?? []
      const prompt = promptBlockFor(id, data, parsed.content)
      return {
        practical_card_id: id,
        title,
        topic,
        risk_level: String(data.risk_level ?? 'P1'),
        confidence: String(data.confidence ?? ''),
        source_type: String(data.source_type ?? ''),
        runtime_bucket: String(data.runtime_bucket ?? ''),
        body: parsed.content,
        prompt_block: prompt.prompt_block,
        prompt_chars: prompt.prompt_block.length,
        runtime_block: prompt.runtime_block,
        runtime_block_source: prompt.runtime_block_source,
        material_bridge: prompt.runtime_block.material_bridge,
        source_urls: prompt.runtime_block.source_urls,
        trigger_keywords: unique([...aliases, title, topic, ...sceneKeywords.slice(0, 30)]),
      }
    })
  return cache
}

export function matchPracticalCards(question: string): PracticalCardMatch[] {
  if (!question.trim()) return []
  const haystack = normalize(question)
  const raw = loadCards()
    .map(card => {
      const matched = card.trigger_keywords.filter(keyword => haystack.includes(normalize(keyword)))
      if (matched.length === 0) return null
      const highRiskBoost = card.risk_level === 'P0' ? 2 : card.risk_level === 'P1' ? 1 : 0
      return {
        card,
        matched,
        score: matched.length * 10 + highRiskBoost,
      }
    })
    .filter((item): item is { card: PracticalCard; matched: string[]; score: number } => Boolean(item))

  raw.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.card.practical_card_id.localeCompare(b.card.practical_card_id)
  })

  return raw.slice(0, MAX_PRACTICAL_MATCHES).map(item => ({
    practical_card_id: item.card.practical_card_id,
    title: item.card.title,
    topic: item.card.topic,
    risk_level: item.card.risk_level,
    confidence: item.card.confidence,
    source_type: item.card.source_type,
    matched_keywords: item.matched,
    score: item.score,
    prompt_block: item.card.prompt_block,
    prompt_chars: item.card.prompt_chars,
    runtime_block: item.card.runtime_block,
    runtime_block_source: item.card.runtime_block_source,
    material_bridge: item.card.material_bridge,
    source_urls: item.card.source_urls,
  }))
}

export function practicalMatchesToPromptContext(matches: readonly PracticalCardMatch[]): string | null {
  if (matches.length === 0) return null
  return [
    '以下是 TEBIQ 已沉淀的实务卡。它们不是装饰，请只在与用户问题直接相关时吸收。',
    '使用原则：官方事实和实务口径都要保留；如果手续形式与实质审查不同，要把两者分开说。',
    '不要为了引用实务卡而拉长答案；简单问题仍然简洁回答。',
    '',
    matches.map(match => match.prompt_block).join('\n\n---\n\n'),
  ].join('\n')
}

function firstUsefulLine(text: string): string {
  return linesFromMarkdown(text)[0] ?? ''
}

function linesFromMarkdown(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map(line => line
      .replace(/^\s*[-*]\s+/, '')
      .replace(/^\s*\d+[.)]\s+/, '')
      .replace(/^\s*#+\s+/, '')
      .trim())
    .filter(line => line.length > 0 && !/^```/.test(line))
}

function extractUrls(text: string): string[] {
  return unique(text.match(/https?:\/\/[^\s)）"'<>]+/g) ?? [])
}
