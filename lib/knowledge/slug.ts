const CJK_TOKEN_MAP: Record<string, string> = {
  住民税: 'juminzei',
  年金: 'nenkin',
  健康保険: 'kenko-hoken',
  国民健康保険: 'kokumin-kenko-hoken',
  在留カード: 'zairyu-card',
  在留: 'zairyu',
  续签: 'renewal',
  更新: 'renewal',
  签证: 'visa',
  入管: 'immigration',
  市役所: 'city-hall',
  確定申告: 'kakutei-shinkoku',
  課税証明書: 'kazei-shomeisho',
  源泉徴収票: 'gensen-choshu',
  住所: 'address',
  搬家: 'moving',
  公司: 'company',
  配偶者: 'haigusha',
  技人国: 'gijinkoku',
  经营管理: 'keiei',
  経営管理: 'keiei',
  特定技能: 'tokutei',
  定住者: 'teijusha',
  永住: 'eijusha',
}

export function normalizeArticleSlug(value: string): string | null {
  const slug = value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 200)
  return slug || null
}

function cjkHash(value: string): string {
  let hash = 5381
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(i)
  }
  return Math.abs(hash >>> 0).toString(36).slice(0, 8)
}

export function suggestArticleSlug(title: string): string {
  let draft = title
  for (const [source, replacement] of Object.entries(CJK_TOKEN_MAP)) {
    draft = draft.replaceAll(source, ` ${replacement} `)
  }
  const normalized = normalizeArticleSlug(draft)
  if (normalized) return normalized
  return `article-${cjkHash(title)}`
}
