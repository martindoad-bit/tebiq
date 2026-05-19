export interface PracticalRuntimeBlock {
  user_situation: string | null
  short_answer: string | null
  practical_rule: string | null
  official_anchor: string | null
  conditions: string[]
  risk: string[]
  should_not_say: string[]
  material_bridge: string[]
  source_urls: string[]
}

export type PracticalRuntimeBlockSource = 'frontmatter' | 'body_yaml' | 'legacy_sections'

export interface PracticalRuntimeBlockParseResult {
  block: PracticalRuntimeBlock | null
  source: PracticalRuntimeBlockSource | null
}

const RUNTIME_BLOCK_KEYS = new Set([
  'user_situation',
  'short_answer',
  'practical_rule',
  'official_anchor',
  'conditions',
  'risk',
  'should_not_say',
  'material_bridge',
  'source_urls',
])

export function emptyRuntimeBlock(): PracticalRuntimeBlock {
  return {
    user_situation: null,
    short_answer: null,
    practical_rule: null,
    official_anchor: null,
    conditions: [],
    risk: [],
    should_not_say: [],
    material_bridge: [],
    source_urls: [],
  }
}

export function parseRuntimeBlock(
  frontmatter: Record<string, unknown>,
  body: string,
): PracticalRuntimeBlockParseResult {
  const frontmatterBlock = coerceRuntimeBlock(frontmatter.runtime_block)
  if (frontmatterBlock) {
    return { block: frontmatterBlock, source: 'frontmatter' }
  }

  const bodyYaml = extractRuntimeBlockYaml(body)
  if (bodyYaml) {
    const bodyBlock = parseRuntimeBlockYaml(bodyYaml)
    if (bodyBlock) {
      return { block: bodyBlock, source: 'body_yaml' }
    }
  }

  return { block: null, source: null }
}

export function runtimeBlockToPromptBlock(input: {
  cardId: string
  title: string
  topic?: string
  riskLevel?: string
  block: PracticalRuntimeBlock
}): string {
  const lines = [
    `【实务卡 ${input.cardId}】${input.title}`,
    input.topic ? `主题：${input.topic}` : '',
    input.riskLevel ? `风险级别：${input.riskLevel}` : '',
    input.block.user_situation ? `用户场景：${input.block.user_situation}` : '',
    input.block.short_answer ? `一句话结论：${input.block.short_answer}` : '',
    input.block.practical_rule ? `实务口径：${input.block.practical_rule}` : '',
    input.block.official_anchor ? `官方/法源锚点：${input.block.official_anchor}` : '',
    formatList('条件', input.block.conditions),
    formatList('风险/误区', input.block.risk),
    formatList('不要说', input.block.should_not_say),
    formatList('材料桥', input.block.material_bridge),
    formatList('来源', input.block.source_urls),
  ].filter(Boolean)

  return lines.join('\n')
}

export function runtimeBlockFromLegacySections(input: {
  userSituation?: string
  shortAnswer?: string
  practicalRule?: string
  officialAnchor?: string
  conditions?: string[]
  risk?: string[]
  shouldNotSay?: string[]
  materialBridge?: string[]
  sourceUrls?: string[]
}): PracticalRuntimeBlock {
  return {
    user_situation: textOrNull(input.userSituation),
    short_answer: textOrNull(input.shortAnswer),
    practical_rule: textOrNull(input.practicalRule),
    official_anchor: textOrNull(input.officialAnchor),
    conditions: cleanList(input.conditions ?? []),
    risk: cleanList(input.risk ?? []),
    should_not_say: cleanList(input.shouldNotSay ?? []),
    material_bridge: cleanList(input.materialBridge ?? []),
    source_urls: cleanList(input.sourceUrls ?? []),
  }
}

function coerceRuntimeBlock(value: unknown): PracticalRuntimeBlock | null {
  if (!isRecord(value)) return null
  const block = emptyRuntimeBlock()
  block.user_situation = textOrNull(value.user_situation)
  block.short_answer = textOrNull(value.short_answer)
  block.practical_rule = textOrNull(value.practical_rule)
  block.official_anchor = textOrNull(value.official_anchor)
  block.conditions = listOrEmpty(value.conditions)
  block.risk = listOrEmpty(value.risk)
  block.should_not_say = listOrEmpty(value.should_not_say)
  block.material_bridge = listOrEmpty(value.material_bridge)
  block.source_urls = listOrEmpty(value.source_urls)
  return hasAnyRuntimeSignal(block) ? block : null
}

function parseRuntimeBlockYaml(yamlText: string): PracticalRuntimeBlock | null {
  const rawLines = yamlText.split(/\r?\n/)
  const rootIndex = rawLines.findIndex(line => /^runtime_block:\s*$/.test(line.trim()))
  const lines = rootIndex >= 0
    ? rawLines.slice(rootIndex + 1).map(line => line.replace(/^ {2}/, ''))
    : rawLines

  const out: Record<string, string | string[]> = {}
  let currentListKey: string | null = null

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '  ')
    if (!line.trim() || /^\s*#/.test(line)) continue
    const keyValue = line.match(/^([a-z_]+):\s*(.*)$/)
    if (keyValue) {
      const key = keyValue[1]
      if (!RUNTIME_BLOCK_KEYS.has(key)) {
        currentListKey = null
        continue
      }
      const value = cleanScalar(keyValue[2] ?? '')
      if (value) {
        out[key] = value
        currentListKey = null
      } else {
        out[key] = []
        currentListKey = key
      }
      continue
    }
    const listItem = line.match(/^\s*-\s*(.*)$/)
    if (currentListKey && listItem) {
      const value = cleanScalar(listItem[1] ?? '')
      if (value) {
        const current = Array.isArray(out[currentListKey]) ? out[currentListKey] as string[] : []
        current.push(value)
        out[currentListKey] = current
      }
    }
  }

  return coerceRuntimeBlock(out)
}

function extractRuntimeBlockYaml(body: string): string | null {
  const fenced = body.match(/```(?:ya?ml)?\s*\n([\s\S]*?runtime_block:[\s\S]*?)```/i)
  if (fenced?.[1]) return fenced[1].trim()

  const lines = body.split(/\r?\n/)
  const start = lines.findIndex(line => /^runtime_block:\s*$/.test(line.trim()))
  if (start < 0) return null
  const out: string[] = [lines[start]]
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i]
    if (/^\S/.test(line) && line.trim() && !line.trim().startsWith('-')) break
    out.push(line)
  }
  return out.join('\n').trim()
}

function formatList(label: string, items: string[]): string {
  return items.length > 0 ? `${label}：${items.join('；')}` : ''
}

function listOrEmpty(value: unknown): string[] {
  if (Array.isArray(value)) return cleanList(value.map(String))
  if (typeof value === 'string' && value.trim()) return [value.trim()]
  return []
}

function cleanList(values: string[]): string[] {
  return Array.from(new Set(values.map(value => cleanScalar(value)).filter(Boolean)))
}

function cleanScalar(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .replace(/^['"]/, '')
    .replace(/['"]$/, '')
    .trim()
}

function textOrNull(value: unknown): string | null {
  const text = typeof value === 'string' ? value.trim() : ''
  return text ? text : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function hasAnyRuntimeSignal(block: PracticalRuntimeBlock): boolean {
  return Boolean(
    block.user_situation
    || block.short_answer
    || block.practical_rule
    || block.official_anchor
    || block.conditions.length
    || block.risk.length
    || block.should_not_say.length
    || block.material_bridge.length
    || block.source_urls.length,
  )
}
