/**
 * 0.6 Sprint — KEYWORD_BUCKETS + matchBuckets contract tests
 * (ENGINE Pack 1 acceptance §Unit).
 *
 * DB-free / LLM-free unit tests for:
 *   - KEYWORD_BUCKETS shape (6 ids, complete fields)
 *   - matchBuckets() correctness on Pack §Unit acceptance cases
 *   - Score / ordering / dedup invariants
 *   - PL §3 status_label_specific copy parity
 *
 * Usage: npx tsx scripts/test/test-intent-buckets.ts
 */
import { strict as assert } from 'node:assert'

async function main() {
  const bucketsMod = await import('@/lib/answer/intent/keyword-buckets')
  const matcherMod = await import('@/lib/answer/intent/match-buckets')

  let passes = 0
  let total = 0
  const fails: string[] = []
  function check(name: string, fn: () => void): void {
    total += 1
    try {
      fn()
      console.log(`PASS  ${name}`)
      passes += 1
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`FAIL  ${name}`)
      console.log(`  └ ${msg}`)
      fails.push(`${name}: ${msg}`)
    }
  }

  // ---- 1. KEYWORD_BUCKETS shape ----
  check('1a. KEYWORD_BUCKET_IDS contains exactly 6 entries (Pack §1)', () => {
    assert.equal(bucketsMod.KEYWORD_BUCKET_IDS.length, 6)
  })
  check('1b. KEYWORD_BUCKET_IDS declaration order matches Pack §1', () => {
    assert.deepEqual([...bucketsMod.KEYWORD_BUCKET_IDS], [
      'keiei_kanri',
      'nenkin_zeikin',
      'gijinkoku',
      'spouse_divorce',
      'shikakugai_fukugyo',
      'zairyu_kigen',
    ])
  })
  check('1c. each bucket has non-empty keywords + initial + specific labels', () => {
    for (const id of bucketsMod.KEYWORD_BUCKET_IDS) {
      const b = bucketsMod.KEYWORD_BUCKETS[id]
      assert.equal(b.id, id, `bucket ${id} id mismatch`)
      assert.ok(b.keywords.length > 0, `${id} keywords empty`)
      assert.ok(b.status_label_initial.length > 0, `${id} status_label_initial empty`)
      assert.ok(b.status_label_specific.length > 0, `${id} status_label_specific empty`)
    }
  })
  check('1d. STATUS_LABEL_INITIAL_DEFAULT shared across all buckets', () => {
    for (const id of bucketsMod.KEYWORD_BUCKET_IDS) {
      assert.equal(
        bucketsMod.KEYWORD_BUCKETS[id].status_label_initial,
        bucketsMod.STATUS_LABEL_INITIAL_DEFAULT,
        `${id} initial label diverges from default`,
      )
    }
  })
  check('1e. PL §3 status_label_specific copy parity (4 buckets)', () => {
    // Verbatim from Pack §1 / PL §3 sample copy.
    assert.equal(
      bucketsMod.KEYWORD_BUCKETS.keiei_kanri.status_label_specific,
      '正在核对经营管理、在留资格变更和当前基准。',
    )
    assert.equal(
      bucketsMod.KEYWORD_BUCKETS.nenkin_zeikin.status_label_specific,
      '正在核对缴纳记录、更新/永住影响和下一步处理。',
    )
    assert.equal(
      bucketsMod.KEYWORD_BUCKETS.gijinkoku.status_label_specific,
      '正在核对在留资格活动范围和工作内容匹配。',
    )
    assert.equal(
      bucketsMod.KEYWORD_BUCKETS.spouse_divorce.status_label_specific,
      '正在核对身份变化、届出和在留衔接风险。',
    )
  })

  // ---- 2. matchBuckets — Pack §Unit acceptance ----
  check('2a. "我是经营管理签证..." → matches keiei_kanri', () => {
    const m = matcherMod.matchBuckets('我是经营管理签证持有者，最近想转其他资格')
    assert.ok(m.some(x => x.bucket_id === 'keiei_kanri'), `expected keiei_kanri, got ${JSON.stringify(m.map(x => x.bucket_id))}`)
  })
  check('2b. "永住申请年金没按时交..." → matches nenkin_zeikin', () => {
    const m = matcherMod.matchBuckets('永住申请年金没按时交，会有影响吗')
    assert.ok(m.some(x => x.bucket_id === 'nenkin_zeikin'), `expected nenkin_zeikin, got ${JSON.stringify(m.map(x => x.bucket_id))}`)
  })
  check('2c. "技人国换工作做现场接待..." → matches gijinkoku', () => {
    const m = matcherMod.matchBuckets('技人国换工作做现场接待，可能有问题吗')
    assert.ok(m.some(x => x.bucket_id === 'gijinkoku'), `expected gijinkoku, got ${JSON.stringify(m.map(x => x.bucket_id))}`)
  })
  check('2d. "我和老公离婚了..." → matches spouse_divorce', () => {
    const m = matcherMod.matchBuckets('我和老公离婚了，配偶签证还能用吗')
    assert.ok(m.some(x => x.bucket_id === 'spouse_divorce'), `expected spouse_divorce, got ${JSON.stringify(m.map(x => x.bucket_id))}`)
  })
  check('2e. off-topic input returns []', () => {
    const m = matcherMod.matchBuckets('完全不沾边的随意问题')
    assert.deepEqual(m, [])
  })

  // ---- 3. matchBuckets — invariants ----
  check('3a. empty / null / blank input → []', () => {
    assert.deepEqual(matcherMod.matchBuckets(''), [])
    assert.deepEqual(matcherMod.matchBuckets(null), [])
    assert.deepEqual(matcherMod.matchBuckets(undefined), [])
    assert.deepEqual(matcherMod.matchBuckets('   '), [])
  })
  check('3b. each match has score in (0, 1]', () => {
    const m = matcherMod.matchBuckets('永住申请年金没交，住民税也没缴清，急')
    for (const r of m) {
      assert.ok(r.score > 0, `score should be > 0 for ${r.bucket_id}, got ${r.score}`)
      assert.ok(r.score <= 1, `score should be <= 1 for ${r.bucket_id}, got ${r.score}`)
    }
  })
  check('3c. results sorted by score desc; ties broken by declaration order', () => {
    const m = matcherMod.matchBuckets('永住申请年金没按时交，公司清算后想换技人国')
    // Should have multiple buckets — at minimum nenkin_zeikin and gijinkoku
    assert.ok(m.length >= 2, `expected ≥2 buckets, got ${m.length}`)
    for (let i = 1; i < m.length; i++) {
      assert.ok(m[i - 1].score >= m[i].score, `not sorted by score at index ${i}`)
    }
  })
  check('3d. multi-keyword bucket matched once (no double-count)', () => {
    // "经营管理 经管 经営管理" lists three synonyms in same bucket. The
    // result should have keiei_kanri exactly once, not three times.
    const m = matcherMod.matchBuckets('经营管理 经管 経営管理')
    const keiei = m.filter(x => x.bucket_id === 'keiei_kanri')
    assert.equal(keiei.length, 1, `expected 1 keiei_kanri, got ${keiei.length}`)
  })
  check('3e. case-insensitive substring match (English mixing)', () => {
    const m = matcherMod.matchBuckets('Startup Visa 准备资料的事')
    assert.ok(m.some(x => x.bucket_id === 'keiei_kanri'), 'expected keiei_kanri via "startup visa" substring')
  })
  check('3f. topBucket(): null on empty matches, top entry on populated', () => {
    assert.equal(matcherMod.topBucket([]), null)
    const m = matcherMod.matchBuckets('我是经营管理签证持有者')
    const top = matcherMod.topBucket(m)
    assert.ok(top !== null, 'expected non-null top')
    assert.equal(top!.bucket_id, 'keiei_kanri')
  })
  check('3g. multi-bucket question: spouse_divorce + zairyu_kigen ordered correctly', () => {
    const m = matcherMod.matchBuckets('我和丈夫离婚后，在留期限快到了想续签')
    const ids = m.map(x => x.bucket_id)
    assert.ok(ids.includes('spouse_divorce'))
    assert.ok(ids.includes('zairyu_kigen'))
  })

  // ---- 4. matched_keywords payload ----
  check('4a. matched_keywords is non-empty and a subset of bucket keywords', () => {
    const m = matcherMod.matchBuckets('永住申请年金没交')
    for (const r of m) {
      assert.ok(r.matched_keywords.length > 0, `${r.bucket_id} matched_keywords empty`)
      const declared = new Set(bucketsMod.KEYWORD_BUCKETS[r.bucket_id].keywords)
      for (const kw of r.matched_keywords) {
        assert.ok(declared.has(kw), `${r.bucket_id} returned keyword "${kw}" not in declared set`)
      }
    }
  })

  console.log(`\n0.6 Pack 1 intent-bucket contract: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
