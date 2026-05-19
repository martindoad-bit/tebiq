export type WebContextSourceType = 'official' | 'practice'

export interface WebContextSource {
  id: string
  title: string
  organization: string
  url: string
  type: WebContextSourceType
  triggers: string[]
  fallbackSummary: string
}

export interface WebContextMatch {
  source: WebContextSource
  snippets: string[]
  fetched: boolean
}

const WEB_CONTEXT_TIMEOUT_MS = Number(process.env.CONSULTATION_WEB_CONTEXT_TIMEOUT_MS ?? 2600)
const MAX_SOURCES = Number(process.env.CONSULTATION_WEB_CONTEXT_MAX_SOURCES ?? 3)
const MAX_SNIPPET_CHARS = 520
const CACHE_TTL_MS = 10 * 60 * 1000

const cache = new Map<string, { expiresAt: number; text: string | null }>()

export const WEB_CONTEXT_SOURCES: ReadonlyArray<WebContextSource> = Object.freeze([
  {
    id: 'isa-spouse-notification',
    title: '配偶者に関する届出',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html',
    type: 'official',
    triggers: ['日配', '配偶', '離婚', '离婚', '死別', '死别', '再婚', '14日', '届出'],
    fallbackSummary: '日本人配偶者等など配偶者身分者が離婚・死別した場合は、事由発生日から14日以内に出入国在留管理庁長官へ届出が必要。',
  },
  {
    id: 'practice-spouse-remarriage-ubiq',
    title: '配偶者ビザ更新・離婚後再婚の実務説明',
    organization: '行政書士実務サイト',
    url: 'https://ubiq.jp/practices/spouse-extension/',
    type: 'practice',
    triggers: ['日配', '配偶', '離婚', '离婚', '再婚', '更新', '変更', '变更'],
    fallbackSummary: '日本人配偶者等保有者が日本人と離婚後、別の日本人と再婚した場合、手続名称自体は在留期間更新申請に該当するが、実務上は変更許可申請に近い審査になると説明。',
  },
  {
    id: 'isa-spouse-japanese',
    title: '日本人の配偶者等（配偶者）',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese01.html?hl=ja',
    type: 'official',
    triggers: ['日配', '日本人配偶', '配偶者', '更新', '课税', '納税', '纳税', '身元保証', '保证', '住民票'],
    fallbackSummary: '在留期間更新では、滞在費用を支弁する方の直近1年分の住民税課税/非課税証明書及び納税証明書、日本人配偶者の身元保証書、住民票等を確認する。',
  },
  {
    id: 'isa-business-manager-2025',
    title: '経営・管理 2025年改正',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/resources/10_00237.html',
    type: 'official',
    triggers: ['経営管理', '经管', '经营管理', '500万', '3000万', '三千万', '改正', '新规', '2025', '2028', '过渡'],
    fallbackSummary: '2025年10月16日施行の経営・管理基準見直しでは、事業規模、常勤職員、日本語能力、経営経験・学歴、専門家確認付き事業計画等が論点になる。旧500万円理解のまま断定しない。',
  },
  {
    id: 'isa-gijinkoku',
    title: '技術・人文知識・国際業務',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html',
    type: 'official',
    triggers: ['技人国', '人文', '国際業務', '国际业务', '业务委托', '業務委託', '翻译', '通訳', '工作范围', '転職', '转职'],
    fallbackSummary: '技術・人文知識・国際業務は、専門性と活動内容の一致、契約機関との関係、職務内容を確認する在留資格。職種名だけでなく実際の業務内容が重要。',
  },
  {
    id: 'isa-hsp-points',
    title: '高度専門職・高度人材ポイント制',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja',
    type: 'official',
    triggers: ['高才', '高度専門職', '高度人才', '积分', 'ポイント', '80分', '70分', '奖金', '年収', '机构变更', '機関変更'],
    fallbackSummary: '高度専門職ではポイント合計と活動機関の関係が重要。入国後にポイントが下がった時点で直ちに在留不可になるわけではないが、更新時や機関変更時の確認が必要。',
  },
  {
    id: 'isa-dependent',
    title: '家族滞在',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/status/dependent.html',
    type: 'official',
    triggers: ['家族滞在', '扶养', '扶養', '老公换公司', '丈夫换公司', '配偶换公司', '资格外活动', '資格外活動'],
    fallbackSummary: '家族滞在は扶養を受ける配偶者又は子としての日常的活動を行う在留資格。更新では扶養者の在留状況、在職、課税・納税等を確認する。',
  },
  {
    id: 'isa-shikakugai',
    title: '資格外活動許可',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html?hl=en',
    type: 'official',
    triggers: ['资格外活动', '資格外活動', '打工', 'アルバイト', '28小时', '28時間', '家族滞在', '留学'],
    fallbackSummary: '資格外活動許可には包括許可と個別許可があり、家族滞在や留学の就労は許可の種類、時間、活動内容の制限を確認する。',
  },
  {
    id: 'isa-ssw',
    title: '特定技能',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html',
    type: 'official',
    triggers: ['特定技能', '特技', '登録支援', '支援机关', '受入', '换公司', '転職', '辞职', '健康診断', '评价调书'],
    fallbackSummary: '特定技能で所属機関を変更する場合は、在留資格変更許可申請が必要。受入機関・登録支援機関・本人それぞれの書類準備が関係する。',
  },
  {
    id: 'isa-eijuu',
    title: '永住許可申請',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/procedures/16-4.html',
    type: 'official',
    triggers: ['永住', '永久', '年金', '国民年金', '纳税', '納税', 'その3', '健康保険', '身元保証', '保证人'],
    fallbackSummary: '永住許可申請では、素行、独立生計、国益適合、納税・年金・健康保険等の公的義務履行、現在の在留期間管理などを確認する。',
  },
  {
    id: 'isa-tokureikikan',
    title: '特例期間',
    organization: '出入国在留管理庁',
    url: 'https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html',
    type: 'official',
    triggers: ['特例期間', '特例期', '申请中', '申請中', '期限过了', '在留期限', '不许可', '不許可', '出国'],
    fallbackSummary: '在留期間の満了前に更新又は変更申請をした場合の特例期間は、結果受領や在留期間満了からの期間に関係する。出国や不許可後は個別確認が必要。',
  },
  {
    id: 'nta-nozei-sono3',
    title: '納税証明書その3',
    organization: '国税庁',
    url: 'https://www.nta.go.jp/taxes/nozei/nozei-shomei/01.htm',
    type: 'official',
    triggers: ['国税', 'その3', '納税証明その3', '纳税证明其三', '税务署', '税務署'],
    fallbackSummary: '国税の納税証明書その3は税務署・e-Tax系の書類であり、市区町村が出す住民税の課税・納税証明とは別物。',
  },
  {
    id: 'nenkin-net',
    title: 'ねんきんネット',
    organization: '日本年金機構',
    url: 'https://www.nenkin.go.jp/n_net/index.html',
    type: 'official',
    triggers: ['年金', 'ねんきんネット', '纳付记录', '納付記録', '被保険者記録', '永住年金'],
    fallbackSummary: '年金記録は、ねんきんネット等で確認できる。永住や在留手続では納付状況の説明が重要になる。',
  },
  {
    id: 'cabinet-dv',
    title: 'DV相談ナビ',
    organization: '内閣府',
    url: 'https://www.gender.go.jp/policy/no_violence/dv_navi/index.html',
    type: 'official',
    triggers: ['DV', '家暴', '暴力', '避难', '避難', 'shelter', 'シェルター', '地址不想被知道'],
    fallbackSummary: 'DV相談ナビ等の公的相談窓口がある。DVや住所安全が絡む場合は、安全確保と支援機関への相談を優先し、住所や避難先を不用意に相手へ伝えない。',
  },
])

export function shouldUseWebContext(question: string, imageSummary?: string | null): boolean {
  if ((process.env.CONSULTATION_WEB_CONTEXT_ENABLED ?? 'true') === 'false') return false
  const text = `${question}\n${imageSummary ?? ''}`
  return scoreSources(text).some(item => item.score > 0)
}

export async function matchWebContext(input: {
  question: string
  imageSummary?: string | null
}): Promise<WebContextMatch[]> {
  if (!shouldUseWebContext(input.question, input.imageSummary)) return []

  const text = `${input.question}\n${input.imageSummary ?? ''}`
  const selected = scoreSources(text)
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || sourceTie(a.source, b.source))
    .slice(0, clampMaxSources())
    .map(item => item.source)

  const matches = await Promise.all(selected.map(async source => {
    const fetchedText = await fetchSourceText(source)
    return {
      source,
      fetched: Boolean(fetchedText),
      snippets: buildSnippets(fetchedText ?? source.fallbackSummary, text, source),
    }
  }))

  return matches.filter(match => match.snippets.length > 0)
}

export function webMatchesToPromptContext(matches: ReadonlyArray<WebContextMatch>): string | null {
  if (matches.length === 0) return null
  const resolutionNotes = buildResolutionNotes(matches)
  const blocks = matches.map((match, index) => [
    `【白名单网页 ${index + 1}: ${match.source.title}】`,
    `source_type: ${match.source.type === 'official' ? 'official' : 'practice'}`,
    `organization: ${match.source.organization}`,
    `url: ${match.source.url}`,
    `fetch_status: ${match.fetched ? 'live' : 'fallback_summary'}`,
    '',
    ...match.snippets.map(snippet => `- ${snippet}`),
  ].join('\n'))

  return [
    '以下是 TEBIQ 刚按用户问题匹配到的白名单网页上下文。',
    '使用要求:',
    '- 官方来源优先于实务网站；实务网站只用于补充窗口/材料/实务口径。',
    '- 如果网页上下文与事实卡或实务卡冲突，说明需要确认，不要硬凑结论。',
    '- 不要把网页摘要逐字堆给用户；吸收后自然回答。',
    '- 若使用具体电话号码、期限、材料名或政策日期，必须来自这些来源或系统事实卡。',
    ...resolutionNotes,
    '',
    ...blocks,
  ].join('\n')
}

function buildResolutionNotes(matches: ReadonlyArray<WebContextMatch>): string[] {
  const ids = new Set(matches.map(match => match.source.id))
  const notes: string[] = []

  if (ids.has('practice-spouse-remarriage-ubiq')) {
    notes.push(
      '- 特别纠偏：日本人の配偶者等持有人离婚后又与另一名日本人再婚，用户问“更新还是变更”时，不要回答“不是更新，是变更”。手续名称/申请表层通常按「在留期間更新許可申請」处理，因为在留资格名称仍是日本人の配偶者等；但审查实质接近新规/变更，会重新看新婚姻真实性、同居、生计和前婚时间线。',
    )
  }

  return notes
}

function scoreSources(input: string): Array<{ source: WebContextSource; score: number }> {
  const normalized = normalize(input)
  return WEB_CONTEXT_SOURCES.map(source => {
    const score = source.triggers.reduce((sum, trigger) => {
      const term = normalize(trigger)
      if (!term) return sum
      return normalized.includes(term) ? sum + Math.max(3, Math.min(12, term.length)) : sum
    }, 0)
    return { source, score }
  })
}

function sourceTie(a: WebContextSource, b: WebContextSource): number {
  if (a.type !== b.type) return a.type === 'official' ? -1 : 1
  return a.id.localeCompare(b.id)
}

async function fetchSourceText(source: WebContextSource): Promise<string | null> {
  const cached = cache.get(source.id)
  if (cached && cached.expiresAt > Date.now()) return cached.text

  let text: string | null = null
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), WEB_CONTEXT_TIMEOUT_MS)
    const res = await fetch(source.url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; TEBIQ-WebContext/0.1; +https://tebiq.jp)',
        'accept-language': 'ja,zh-CN;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeout)
    if (res.ok) {
      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('pdf') && !source.url.toLowerCase().endsWith('.pdf')) {
        text = normalizeHtml(await res.text())
      }
    }
  } catch {
    text = null
  }

  cache.set(source.id, { expiresAt: Date.now() + CACHE_TTL_MS, text })
  return text
}

function buildSnippets(text: string, query: string, source: WebContextSource): string[] {
  const terms = Array.from(new Set([
    ...source.triggers.map(normalize).filter(Boolean),
    ...query.split(/[\s,，、。/／｜|()（）「」『』【】\[\]・:：;；]+/).map(normalize).filter(term => term.length >= 2),
  ])).slice(0, 18)

  const chunks = text
    .split(/[。！？\n\r]+/)
    .map(chunk => chunk.replace(/\s+/g, ' ').trim())
    .filter(chunk => chunk.length >= 24)
    .map(chunk => ({ chunk, score: scoreChunk(chunk, terms) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => truncate(item.chunk, MAX_SNIPPET_CHARS))

  if (chunks.length > 0) return chunks
  return [truncate(text.replace(/\s+/g, ' ').trim(), MAX_SNIPPET_CHARS)].filter(Boolean)
}

function scoreChunk(chunk: string, terms: string[]): number {
  const normalized = normalize(chunk)
  return terms.reduce((sum, term) => normalized.includes(term) ? sum + Math.min(8, term.length) : sum, 0)
}

function normalizeHtml(html: string): string {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, char =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    .replace(/\s+/g, '')
    .replace(/[·・,，、。.!！?？/／｜|()（）「」『』【】\[\]_:：;；\-—ー]/g, '')
    .trim()
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value
  return `${value.slice(0, max - 1)}…`
}

function clampMaxSources(): number {
  if (!Number.isFinite(MAX_SOURCES)) return 3
  return Math.min(5, Math.max(1, Math.trunc(MAX_SOURCES)))
}
