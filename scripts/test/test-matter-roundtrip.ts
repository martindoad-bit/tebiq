/**
 * TEBIQ Matter Draft V0 — round-trip smoke (Node-only, no browser).
 *
 * The browser-only logic in `lib/matters/storage.ts` reads/writes
 * `window.localStorage`. This smoke shims a minimal in-memory
 * localStorage onto the global so we can exercise:
 *
 *   - saveMatterDraft → entry in storage
 *   - listMatterDrafts → returns saved entry
 *   - hasMatterDraftForAnswer → true after save
 *   - removeMatterDraft → entry gone
 *   - dedup-by-answer-id → second save replaces, doesn't duplicate
 *   - 50-cap eviction
 *
 * What this DOES NOT cover (needs real browser; capture via Chrome
 * headless or QA manual):
 *   - Click → save → /my/matters render → click card → land at /answer/{id}
 *   - V07 favicon visible in browser tab
 *   - true_focus amber left rule visual
 */
import { strict as assert } from 'node:assert'

// Minimal localStorage shim before importing the storage module.
class MemStorage {
  private map = new Map<string, string>()
  get length() { return this.map.size }
  key(i: number): string | null { return Array.from(this.map.keys())[i] ?? null }
  getItem(k: string): string | null { return this.map.get(k) ?? null }
  setItem(k: string, v: string): void { this.map.set(k, String(v)) }
  removeItem(k: string): void { this.map.delete(k) }
  clear(): void { this.map.clear() }
}
const memStorage = new MemStorage()
;(globalThis as { window?: unknown }).window = { localStorage: memStorage }
;(globalThis as { localStorage?: unknown }).localStorage = memStorage

// Import AFTER shim so isBrowser() inside storage.ts sees `window.localStorage`.
async function main() {
  const mod = await import('@/lib/matters/storage')
  const STORAGE_KEY = 'tebiq_matter_drafts_v0'

  let passes = 0
  let total = 0
  const fails: string[] = []
  function check(name: string, fn: () => void) {
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

  check('1. empty storage on boot', () => {
    assert.equal(mod.listMatterDrafts().length, 0)
    assert.equal(memStorage.getItem(STORAGE_KEY), null)
  })

  let savedId = ''
  check('2. saveMatterDraft writes entry', () => {
    const d = mod.saveMatterDraft({
      answer_id: 'ans-abc-001',
      question: '配偶签离婚后想转定住',
      title: '初步整理：配偶离婚后转定住者',
      summary: '不是届出可以解决的事...',
      urgency: 'soon',
    })
    savedId = d.id
    assert.match(d.id, /^m_/)
    assert.equal(d.answer_id, 'ans-abc-001')
    assert.equal(d.urgency, 'soon')
  })

  check('3. listMatterDrafts returns saved entry', () => {
    const all = mod.listMatterDrafts()
    assert.equal(all.length, 1)
    assert.equal(all[0].answer_id, 'ans-abc-001')
    assert.equal(all[0].title, '初步整理：配偶离婚后转定住者')
  })

  check('4. hasMatterDraftForAnswer true after save', () => {
    assert.equal(mod.hasMatterDraftForAnswer('ans-abc-001'), true)
    assert.equal(mod.hasMatterDraftForAnswer('ans-other'), false)
  })

  check('5. localStorage key is `tebiq_matter_drafts_v0`', () => {
    const raw = memStorage.getItem(STORAGE_KEY)
    assert.ok(raw, 'expected key tebiq_matter_drafts_v0 present')
    const parsed = JSON.parse(raw!)
    assert.ok(Array.isArray(parsed))
    assert.equal(parsed[0].answer_id, 'ans-abc-001')
  })

  check('6. dedup by answer_id (re-save replaces, no duplicate)', () => {
    mod.saveMatterDraft({
      answer_id: 'ans-abc-001',
      question: '配偶签离婚后想转定住',
      title: '更新后的标题',
      summary: 'new summary',
      urgency: 'now',
    })
    const all = mod.listMatterDrafts()
    assert.equal(all.length, 1, 'duplicate save should replace, not append')
    assert.equal(all[0].title, '更新后的标题')
    assert.equal(all[0].urgency, 'now')
  })

  check('7. 2nd distinct answer_id appends', () => {
    mod.saveMatterDraft({
      answer_id: 'ans-xyz-002',
      question: '家族滞在想转工作签',
      title: '家族滞在 → 工作签',
      summary: '...',
    })
    const all = mod.listMatterDrafts()
    assert.equal(all.length, 2)
  })

  check('8. removeMatterDraft drops entry', () => {
    // savedId from check 2 was invalidated by the re-save in check 6
    // (saveMatterDraft generates a fresh id on every call, even for
    // dedup-by-answer-id). Look up the current id for ans-abc-001.
    const target = mod.listMatterDrafts().find(m => m.answer_id === 'ans-abc-001')
    assert.ok(target, 'expected ans-abc-001 to exist after dedup')
    mod.removeMatterDraft(target.id)
    void savedId // suppress unused warning
    const all = mod.listMatterDrafts()
    assert.equal(all.length, 1)
    assert.equal(all[0].answer_id, 'ans-xyz-002')
  })

  check('9. listMatterDrafts is sorted by created_at desc', () => {
    // Add 3 more with synthetic delay
    mod.saveMatterDraft({ answer_id: 'a1', question: 'q', title: 't1', summary: 's' })
    mod.saveMatterDraft({ answer_id: 'a2', question: 'q', title: 't2', summary: 's' })
    mod.saveMatterDraft({ answer_id: 'a3', question: 'q', title: 't3', summary: 's' })
    const all = mod.listMatterDrafts()
    // Newest first
    const ts = all.map(m => m.created_at)
    for (let i = 0; i < ts.length - 1; i += 1) {
      assert.ok(ts[i] >= ts[i + 1], `expected ${ts[i]} >= ${ts[i + 1]}`)
    }
  })

  check('10. 50-cap eviction', () => {
    // Already have 4 entries from prior checks. Add 50 more. Should
    // cap at 50 total (newest 50 kept).
    for (let i = 0; i < 50; i += 1) {
      mod.saveMatterDraft({
        answer_id: `bulk-${i}`,
        question: 'q',
        title: `bulk-${i}`,
        summary: '...',
      })
    }
    const all = mod.listMatterDrafts()
    assert.equal(all.length, 50, `expected exactly 50 entries, got ${all.length}`)
  })

  console.log(`\nMatter round-trip: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => { console.error('fatal', e); process.exit(1) })
