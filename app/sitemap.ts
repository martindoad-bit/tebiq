import type { MetadataRoute } from 'next'

const BASE = 'https://tebiq.jp'

const routes = [
  '',
  '/visa-select',
  '/check',
  '/check/haigusha',
  '/check/haigusha/quiz',
  '/check/tokutei',
  '/check/tokutei/quiz',
  '/check/teijusha',
  '/check/teijusha/quiz',
  '/check/keiei',
  '/check/keiei/quiz',
  '/check/eijusha',
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
