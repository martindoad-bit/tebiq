import {
  MATERIAL_ENTITIES,
  getMaterialEntitiesForTopic,
  getMaterialEntityHref,
  type MaterialEntity,
} from './material-entities'
import {
  QUICK_REFERENCE_TOPICS,
  getQuickReferenceTopicHref,
} from '@/lib/quick-reference/topics'

export type MaterialSearchCandidateType = 'material' | 'procedure'

export interface MaterialSearchLinkedMaterial {
  id: string
  title: string
  href: string
}

export interface MaterialSearchCandidate {
  type: MaterialSearchCandidateType
  id: string
  title: string
  summary: string
  href: string
  score: number
  reason: string
  matchedTerms: string[]
  materials: MaterialSearchLinkedMaterial[]
}

export interface MaterialSearchResult {
  query: string
  normalizedQuery: string
  candidates: MaterialSearchCandidate[]
}

interface SearchOptions {
  limit?: number
}

interface ScoredCandidate {
  candidate: MaterialSearchCandidate
  score: number
  matchedTerms: Set<string>
  matchedFields: Set<string>
}

const QUERY_EXPANSIONS: Array<[RegExp, string[]]> = [
  [/日配|配偶|日本人.*配偶|结婚|再婚|离婚/, ['日本人配偶者', '配偶者', '戸籍', '身元保証', '婚姻']],
  [/永住|永久/, ['永住', '住民税', '国税', '年金', '健康保険', '身元保証']],
  [/税|纳税|納税|课税|課税|所得|完税|交税/, ['住民税', '課税', '納税', '国税', 'その3', '所得証明']],
  [/年金|nenkin/, ['年金', 'ねんきんネット', '納付', '被保険者記録']],
  [/保险|保険|健保|健康保険/, ['健康保険', '資格確認', 'マイナ保険証']],
  [/健康診断|健康诊断|健診|体检|体检报告|診断書/, ['健康診断', '雇入時健康診断', '定期健康診断', '診断書']],
  [/住址|住所|地址|搬家|住民|住民票/, ['住民票', '住所', '住居地']],
  [/公司|雇主|人事|工作|换工作|跳槽|转职|転職|内定/, ['在職証明', '雇用契約', '労働条件', '所属機関']],
  [/经管|经营|経営|管理|公司登记|法人|会社/, ['経営管理', '登記事項', '決算', '事業計画']],
  [/保证|保証|担保|身元/, ['身元保証', '保証人']],
  [/照片|写真|证件照/, ['写真', '証明写真']],
  [/护照|パスポート|在留卡|在留カード/, ['パスポート', '在留カード']],
  [/回国|帰国|出国|离开日本|離日/, ['帰国', '転出', '脱退一時金', '在留カード返納']],
]

const PROCEDURE_INTENT_PATTERN =
  /要什么|要啥|材料|清单|申请|更新|续签|变更|办理|准备|怎么交|需要哪些|必要書類|提出書類/

export function searchMaterials(
  query: string,
  options: SearchOptions = {},
): MaterialSearchResult {
  const limit = clampLimit(options.limit ?? 5)
  const normalizedQuery = normalize(query)
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return { query, normalizedQuery, candidates: [] }
  }

  const queryTerms = expandQueryTerms(query)
  const candidates = [
    ...scoreProcedures(query, normalizedQuery, queryTerms),
    ...scoreMaterials(query, normalizedQuery, queryTerms),
  ]
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || sortCandidateTie(a.candidate, b.candidate))
    .slice(0, limit)
    .map(item => ({
      ...item.candidate,
      score: roundScore(item.score),
      matchedTerms: Array.from(item.matchedTerms).slice(0, 6),
      reason: buildReason(item),
    }))

  return { query, normalizedQuery, candidates }
}

function scoreMaterials(
  query: string,
  normalizedQuery: string,
  queryTerms: string[],
): ScoredCandidate[] {
  return MATERIAL_ENTITIES.map(entity => {
    const scored = makeCandidate('material', entity.id, entity.title, entity.whatItIs, getMaterialEntityHref(entity.id), [
      toLinkedMaterial(entity),
      ...entity.relatedMaterials
        .map(id => MATERIAL_ENTITIES.find(item => item.id === id))
        .filter((item): item is MaterialEntity => Boolean(item))
        .slice(0, 3)
        .map(toLinkedMaterial),
    ])

    addTextScore(scored, entity.title, '材料名', normalizedQuery, queryTerms, 24)
    addTextScore(scored, entity.aliases.join(' '), '别称', normalizedQuery, queryTerms, 22)
    addTextScore(scored, entity.whatItIs, '说明', normalizedQuery, queryTerms, 8)
    addTextScore(scored, entity.whoIssues, '发行方', normalizedQuery, queryTerms, 6)
    addTextScore(scored, entity.whereToObtain, '取得方式', normalizedQuery, queryTerms, 6)
    addTextScore(scored, entity.commonMistakes.join(' '), '常见误区', normalizedQuery, queryTerms, 4)

    if (!PROCEDURE_INTENT_PATTERN.test(query) && /证明|証明|票|書|书|卡|カード|记录|記録/.test(query)) {
      scored.score += 4
    }

    return scored
  })
}

function scoreProcedures(
  query: string,
  normalizedQuery: string,
  queryTerms: string[],
): ScoredCandidate[] {
  const procedureIntent = PROCEDURE_INTENT_PATTERN.test(query)
  return QUICK_REFERENCE_TOPICS.map(topic => {
    const materials = getMaterialEntitiesForTopic(topic.id).slice(0, 6).map(toLinkedMaterial)
    const scored = makeCandidate(
      'procedure',
      topic.id,
      topic.title,
      topic.summary,
      getQuickReferenceTopicHref(topic.id),
      materials,
    )

    addTextScore(scored, topic.title, '清单名', normalizedQuery, queryTerms, 24)
    addTextScore(scored, (topic.aliases ?? []).join(' '), '别称', normalizedQuery, queryTerms, 20)
    addTextScore(scored, topic.summary, '说明', normalizedQuery, queryTerms, 8)
    addTextScore(scored, (topic.prepare ?? []).join(' '), '准备材料', normalizedQuery, queryTerms, 10)
    addTextScore(scored, topic.category, '类别', normalizedQuery, queryTerms, 4)

    if (procedureIntent) scored.score += 6
    if (materials.length > 0 && procedureIntent) scored.score += 3

    return scored
  })
}

function makeCandidate(
  type: MaterialSearchCandidateType,
  id: string,
  title: string,
  summary: string,
  href: string,
  materials: MaterialSearchLinkedMaterial[],
): ScoredCandidate {
  return {
    candidate: {
      type,
      id,
      title,
      summary,
      href,
      score: 0,
      reason: '',
      matchedTerms: [],
      materials: dedupeLinkedMaterials(materials),
    },
    score: 0,
    matchedTerms: new Set(),
    matchedFields: new Set(),
  }
}

function addTextScore(
  candidate: ScoredCandidate,
  text: string,
  field: string,
  normalizedQuery: string,
  queryTerms: string[],
  weight: number,
) {
  const normalizedText = normalize(text)
  if (!normalizedText) return

  if (normalizedText === normalizedQuery) {
    candidate.score += weight * 3
    candidate.matchedFields.add(field)
    candidate.matchedTerms.add(normalizedQuery)
    return
  }

  if (normalizedText.includes(normalizedQuery)) {
    candidate.score += weight * 2
    candidate.matchedFields.add(field)
    candidate.matchedTerms.add(normalizedQuery)
  } else if (normalizedQuery.includes(normalizedText) && normalizedText.length >= 4) {
    candidate.score += weight
    candidate.matchedFields.add(field)
    candidate.matchedTerms.add(normalizedText)
  }

  for (const term of queryTerms) {
    if (term.length < 2) continue
    if (normalizedText.includes(term)) {
      candidate.score += Math.max(2, Math.round(weight / 3))
      candidate.matchedFields.add(field)
      candidate.matchedTerms.add(term)
    }
  }
}

function expandQueryTerms(query: string): string[] {
  const base = query
    .split(/[\s,，、。/／｜|()（）「」『』【】\[\]・:：;；]+/)
    .map(normalize)
    .filter(term => term.length >= 2)

  const expansions = QUERY_EXPANSIONS.flatMap(([pattern, terms]) =>
    pattern.test(query) ? terms.map(normalize) : [],
  )

  const whole = normalize(query)
  return Array.from(new Set([whole, ...base, ...expansions].filter(Boolean)))
}

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, char =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    .replace(/\s+/g, '')
    .replace(/[·・,，、。.!！?？/／｜|()（）「」『』【】\[\]_:：;；\-—ー]/g, '')
    .trim()
}

function toLinkedMaterial(entity: MaterialEntity): MaterialSearchLinkedMaterial {
  return {
    id: entity.id,
    title: entity.title,
    href: getMaterialEntityHref(entity.id),
  }
}

function dedupeLinkedMaterials(
  materials: MaterialSearchLinkedMaterial[],
): MaterialSearchLinkedMaterial[] {
  const seen = new Set<string>()
  const result: MaterialSearchLinkedMaterial[] = []
  for (const material of materials) {
    if (seen.has(material.id)) continue
    seen.add(material.id)
    result.push(material)
  }
  return result
}

function buildReason(item: ScoredCandidate): string {
  const fields = Array.from(item.matchedFields).slice(0, 2)
  if (fields.length === 0) {
    return item.candidate.type === 'procedure' ? '和你的办事场景接近' : '和你的材料关键词接近'
  }
  const label = item.candidate.type === 'procedure' ? '清单' : '材料'
  return `${label}的${fields.join('、')}匹配`
}

function roundScore(score: number): number {
  return Math.round(score * 10) / 10
}

function clampLimit(limit: number): number {
  if (!Number.isFinite(limit)) return 5
  return Math.min(8, Math.max(1, Math.trunc(limit)))
}

function sortCandidateTie(a: MaterialSearchCandidate, b: MaterialSearchCandidate): number {
  if (a.type !== b.type) {
    return a.type === 'procedure' ? -1 : 1
  }
  return a.title.localeCompare(b.title, 'zh-Hans-CN')
}
