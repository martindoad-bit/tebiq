import type { MetadataRoute } from 'next'

const BASE = 'https://tebiq.jp'

const routes = [
  '',
  '/visa-select',
  '/check',
  '/check/select',
  '/check/gijinkoku',
  '/check/keiei',
  '/check/haigusha',
  '/check/tokutei',
  '/check/teijusha',
  '/check/moving',
  '/knowledge',
  '/knowledge/updates',
  '/life/moving',
  '/life/moving/quiz',
  '/gijinkoku',
  '/keiei',
  '/haigusha',
  '/eijusha',
  '/tokutei',
  '/teijusha',
  '/consultation',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(path => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path.startsWith('/check') || path.startsWith('/life') ? 0.8 : 0.6,
  }))
}
