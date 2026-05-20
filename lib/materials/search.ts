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

export interface MaterialSearchGuidance {
  id: string
  title: string
  summary: string
  href: string
  reason: string
  matchedTerms: string[]
  severity: 'ask-first' | 'check-first'
}

export interface MaterialSearchResult {
  query: string
  normalizedQuery: string
  candidates: MaterialSearchCandidate[]
  procedureCandidates: MaterialSearchCandidate[]
  materialCandidates: MaterialSearchCandidate[]
  guidance: MaterialSearchGuidance[]
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

const VISIBLE_GROUP_MIN_SCORE = 10

const COMPLEX_GUIDANCE_RULES: Array<{
  id: string
  pattern: RegExp
  title: string
  summary: string
  reason: string
  severity: MaterialSearchGuidance['severity']
}> = [
  {
    id: 'spouse-divorce-remarriage',
    pattern: /離婚|离婚|再婚|出轨|不倫|分居|別居|dv|家暴/i,
    title: '先确认手续方向，再看材料',
    summary:
      '配偶者相关问题如果包含离婚、再婚、分居或 DV，不要直接套普通续签清单。先确认是届出、更新、变更还是其他路径，再准备材料。',
    reason: '包含配偶者关系变化或安全风险词',
    severity: 'ask-first',
  },
  {
    id: 'business-manager-disposition',
    pattern: /经管|経営|经营|管理|公司.*休眠|休眠|注销|廃業|清算|转让|譲渡|赤字|亏损|3000万|500万/i,
    title: '经营管理问题先确认适用规则',
    summary:
      '经营管理涉及公司状态、2025 年改正、过渡期和个案经营实态。材料可以先看，但不要只按清单判断能否更新或变更。',
    reason: '包含经营管理或公司处置词',
    severity: 'ask-first',
  },
  {
    id: 'immigration-result-notice',
    pattern: /不许可|不許可|补件|補正|追加資料|通知|はがき|特例期間|期限过了|期限切れ|超期|overstay/i,
    title: '先看通知和期限',
    summary:
      '入管通知、不许可、补件或期限相关问题通常先看通知种类和日期。材料清单只能辅助，建议先确认当前期限和处理方向。',
    reason: '包含通知、不许可、补件或期限风险词',
    severity: 'ask-first',
  },
  {
    id: 'work-scope-change',
    pattern: /换工作|换公司|跳槽|转职|転職|新公司|内定|职务|職務|兼职|副业|資格外|先上班|开始工作/i,
    title: '先确认工作范围和申请状态',
    summary:
      '换工作、兼职、副业或先上班的问题，不只是材料问题。先确认当前在留资格允许的活动范围，再看需要哪些合同或证明。',
    reason: '包含工作范围或申请中开始活动词',
    severity: 'check-first',
  },
]

export function searchMaterials(
  query: string,
  options: SearchOptions = {},
): MaterialSearchResult {
  const limit = clampLimit(options.limit ?? 5)
  const normalizedQuery = normalize(query)
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return {
      query,
      normalizedQuery,
      candidates: [],
      procedureCandidates: [],
      materialCandidates: [],
      guidance: [],
    }
  }

  const queryTerms = expandQueryTerms(query)
  const scored = [
    ...scoreProcedures(query, normalizedQuery, queryTerms),
    ...scoreMaterials(query, normalizedQuery, queryTerms),
  ]
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || sortCandidateTie(a.candidate, b.candidate))

  const toCandidate = (item: ScoredCandidate): MaterialSearchCandidate => ({
    ...item.candidate,
    score: roundScore(item.score),
    matchedTerms: Array.from(item.matchedTerms).slice(0, 6),
    reason: buildReason(item),
  })

  const candidates = scored.slice(0, limit).map(toCandidate)
  const procedureCandidates = scored
    .filter(item => item.candidate.type === 'procedure')
    .filter(item => item.score >= VISIBLE_GROUP_MIN_SCORE)
    .slice(0, Math.min(3, limit))
    .map(toCandidate)
  const materialCandidates = scored
    .filter(item => item.candidate.type === 'material')
    .filter(item => item.score >= VISIBLE_GROUP_MIN_SCORE)
    .slice(0, Math.min(5, limit))
    .map(toCandidate)
  const guidance = buildGuidance(query, queryTerms)

  return { query, normalizedQuery, candidates, procedureCandidates, materialCandidates, guidance }
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

function buildGuidance(query: string, queryTerms: string[]): MaterialSearchGuidance[] {
  return COMPLEX_GUIDANCE_RULES
    .filter(rule => rule.pattern.test(query))
    .slice(0, 2)
    .map(rule => ({
      id: rule.id,
      title: rule.title,
      summary: rule.summary,
      href: `/ai-consultation?q=${encodeURIComponent(query)}`,
      reason: rule.reason,
      matchedTerms: queryTerms.slice(0, 5),
      severity: rule.severity,
    }))
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
