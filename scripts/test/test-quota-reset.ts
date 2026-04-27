/**
 * test-quota-reset.ts
 *
 * 验证拍照配额按 UTC 自然月重置：
 *  - 上月最后一天创建的 documents 不计入本月用量
 *  - 本月创建的 documents 计入本月用量
 *
 * 不调用 Bedrock，只插入 documents 记录然后调 getPhotoQuotaForFamily()。
 *
 * 运行：
 *   npx tsx scripts/test/test-quota-reset.ts
 *
 * 副作用：会创建一个 family + 几条 documents 行；脚本结束时清理。
 */
import { db } from '../../lib/db'
import { families, documents } from '../../lib/db/schema'
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { getPhotoQuotaForFamily, FREE_QUOTA_PER_MONTH } from '../../lib/photo/quota'

function startOfThisMonthUtc(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0))
}

function lastDayOfPrevMonthUtc(): Date {
  const start = startOfThisMonthUtc()
  return new Date(start.getTime() - 1000) // 上月 23:59:59.000 UTC
}

interface Result {
  ok: boolean
  msg: string
}

async function run(): Promise<Result[]> {
  const results: Result[] = []

  // 1. 创建 family
  const familyId = createId()
  await db.insert(families).values({ id: familyId })

  try {
    // 2. 插入 1 条「上月最后一秒」的 document — 不应计入
    await db.insert(documents).values({
      id: createId(),
      familyId,
      imageUrl: 'mock://prev-month',
      createdAt: lastDayOfPrevMonthUtc(),
    })
    const a = await getPhotoQuotaForFamily(familyId)
    results.push({
      ok: a.used === 0 && a.remaining === FREE_QUOTA_PER_MONTH,
      msg: `上月 doc 不计入本月: used=${a.used}, remaining=${a.remaining} (期望 used=0, remaining=${FREE_QUOTA_PER_MONTH})`,
    })

    // 3. 插入 1 条「本月开始第一秒」的 document — 应计入
    await db.insert(documents).values({
      id: createId(),
      familyId,
      imageUrl: 'mock://this-month-start',
      createdAt: startOfThisMonthUtc(),
    })
    const b = await getPhotoQuotaForFamily(familyId)
    results.push({
      ok: b.used === 1 && b.remaining === FREE_QUOTA_PER_MONTH - 1,
      msg: `本月 doc 计入: used=${b.used}, remaining=${b.remaining} (期望 used=1, remaining=${FREE_QUOTA_PER_MONTH - 1})`,
    })

    // 4. 再插入 N 条把额度填满
    const fillNeeded = FREE_QUOTA_PER_MONTH - 1
    for (let i = 0; i < fillNeeded; i++) {
      await db.insert(documents).values({
        id: createId(),
        familyId,
        imageUrl: `mock://this-month-${i}`,
      })
    }
    const c = await getPhotoQuotaForFamily(familyId)
    results.push({
      ok: c.used === FREE_QUOTA_PER_MONTH && c.remaining === 0,
      msg: `配额刚好用完: used=${c.used}, remaining=${c.remaining} (期望 used=${FREE_QUOTA_PER_MONTH}, remaining=0)`,
    })
  } finally {
    // 清理（cascade 删 documents）
    await db.delete(families).where(eq(families.id, familyId))
  }

  return results
}

async function main(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error('[skip] DATABASE_URL not set; skipping quota-reset test')
    process.exit(0)
  }

  console.log('[test-quota-reset] start')
  const results = await run()
  let passed = 0
  for (const r of results) {
    console.log(`  ${r.ok ? '✓' : '✗'} ${r.msg}`)
    if (r.ok) passed++
  }
  console.log(`[test-quota-reset] ${passed}/${results.length} passed`)
  process.exit(passed === results.length ? 0 : 1)
}

main().catch(err => {
  console.error('[test-quota-reset] error', err)
  process.exit(1)
})
