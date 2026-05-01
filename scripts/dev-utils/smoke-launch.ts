// Treat as module so isolated `main` doesn't collide with other tsx scripts
export {}

interface SmokeRoute {
  path: string
  allow: number[]
  note?: string
}

const BASE_URL = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const ROUTES: SmokeRoute[] = [
  { path: '/', allow: [200] },
  { path: '/photo', allow: [200] },
  { path: '/photo/sample-result', allow: [200] },
  { path: '/timeline', allow: [200] },
  { path: '/pricing', allow: [200] },
  { path: '/check', allow: [200] },
  { path: '/check/gijinkoku', allow: [200] },
  { path: '/check/gijinkoku/work_change', allow: [200] },
  { path: '/check/gijinkoku/job_visa_match', allow: [200] },
  { path: '/check/keiei/capital_investment', allow: [200] },
  { path: '/check/haigusha/marriage_continuity', allow: [200] },
  { path: '/check/tokutei/support_organization', allow: [200] },
  { path: '/settings', allow: [307, 308], note: 'unauthenticated redirect allowed' },
  { path: '/settings/account', allow: [307, 308], note: 'unauthenticated redirect allowed' },
  { path: '/privacy-policy', allow: [200] },
  { path: '/login', allow: [200] },
  { path: '/knowledge', allow: [200] },
  { path: '/not-found-test-random', allow: [404] },
]

async function main() {
  const rows: Array<{ route: SmokeRoute; status: number | 'ERR'; ok: boolean; detail: string }> = []

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`
    try {
      const res = await fetch(url, { redirect: 'manual' })
      const ok = route.allow.includes(res.status)
      rows.push({
        route,
        status: res.status,
        ok,
        detail: ok ? route.note ?? 'ok' : `expected ${route.allow.join(' / ')}`,
      })
    } catch (error) {
      rows.push({
        route,
        status: 'ERR',
        ok: false,
        detail: error instanceof Error ? error.message : 'request failed',
      })
    }
  }

  console.log(`launch smoke base: ${BASE_URL}`)
  for (const row of rows) {
    const marker = row.ok ? '✓' : '✗'
    console.log(`${marker} ${row.route.path} -> ${row.status} ${row.detail}`)
  }

  const failures = rows.filter(row => !row.ok)
  if (failures.length > 0) {
    console.error(`launch smoke failed: ${failures.length} route(s)`)
    process.exitCode = 1
    return
  }
  console.log('launch smoke passed')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
