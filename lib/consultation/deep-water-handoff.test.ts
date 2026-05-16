import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEEP_WATER_HANDOFF_REGISTRY,
  getHandoffForMatches,
  getHandoffForRoutes,
  listBoundRouteIds,
} from './deep-water-handoff'
import { ROUTE_GATE_PATTERNS, matchRouteGates } from './route-gates'

// ----- Registry shape contracts ---------------------------------------

test('registry covers all 10 DOMAIN §3 deep-water families', () => {
  // Each entry has a familyTag; we expect exactly 10 distinct family
  // tags per DOMAIN gate §3.1 .. §3.10.
  const tags = new Set(DEEP_WATER_HANDOFF_REGISTRY.map(e => e.familyTag))
  assert.equal(tags.size, 10, `expected 10 distinct family tags, got ${tags.size}`)
})

test('every entry has at least one professional kind', () => {
  for (const entry of DEEP_WATER_HANDOFF_REGISTRY) {
    assert.ok(entry.kinds.length > 0, `family ${entry.familyTag} has no kinds`)
    assert.ok(entry.oneLine.length > 0, `family ${entry.familyTag} missing oneLine`)
    assert.ok(entry.routeIds.length > 0, `family ${entry.familyTag} missing routeIds`)
  }
})

test('every bound route id exists in ROUTE_GATE_PATTERNS', () => {
  const knownIds = new Set(ROUTE_GATE_PATTERNS.map(p => p.id))
  for (const id of listBoundRouteIds()) {
    assert.ok(
      knownIds.has(id),
      `handoff registry references unknown route gate id "${id}" — was the gate renamed in route-gates.ts?`,
    )
  }
})

// ----- DV family is the critical safety case --------------------------

test('DV gate routes to DV センター + 警察 first, NOT 行政書士', () => {
  const handoff = getHandoffForRoutes(['dv-address-safety-first'])
  assert.ok(handoff, 'DV gate must produce a handoff')
  assert.equal(handoff!.kinds[0].kind, 'dv_center', 'primary must be DV センター')
  assert.equal(handoff!.kinds[1].kind, 'police', 'secondary must be 警察')
  assert.equal(handoff!.urgency, 'today')
  // Defence in depth: 行政書士 MUST NOT be the primary in a DV case.
  assert.notEqual(handoff!.kinds[0].kind, 'gyoseishoshi')
  // The DV センター entry must carry an official locator (phone).
  assert.ok(
    handoff!.kinds[0].official_locator,
    'DV センター entry must carry official locator',
  )
})

// ----- 不许可 / 退去強制 must escalate to 弁護士 -----------------------

test('immigration notice family routes to 入管専門弁護士 as primary', () => {
  const handoff = getHandoffForRoutes(['immigration-notice-taxonomy-first'])
  assert.ok(handoff)
  assert.equal(handoff!.kinds[0].kind, 'immigration_lawyer')
  assert.equal(handoff!.urgency, 'today')
})

test('non-permission / appeal gates also escalate to lawyer', () => {
  const ids = [
    'nonpermission-special-period-ended-boundary',
    'nonpermission-no-ordinary-appeal-no-grace',
    'tokubetsu-kyoka-not-normal-route',
  ]
  for (const id of ids) {
    const h = getHandoffForRoutes([id])
    assert.ok(h, `${id} should produce a handoff`)
    assert.equal(h!.kinds[0].kind, 'immigration_lawyer', `${id} must escalate to lawyer`)
  }
})

// ----- Coverage per family --------------------------------------------

test('family 1 — 特例期间 routes to 行政書士 + 弁護士 same day', () => {
  const h = getHandoffForRoutes(['special-period-departure-deepwater'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'special-period')
  assert.equal(h!.urgency, 'today')
  assert.deepEqual(h!.kinds.map(k => k.kind).slice(0, 2), ['gyoseishoshi', 'immigration_lawyer'])
})

test('family 2 — pending change routes to 行政書士 + 弁護士', () => {
  const h = getHandoffForRoutes(['pending-status-change-current-activity-only'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'pending-change')
  assert.equal(h!.kinds[0].kind, 'gyoseishoshi')
  assert.equal(h!.kinds[1].kind, 'immigration_lawyer')
})

test('family 3 — HSP1 institution change routes today', () => {
  const h = getHandoffForRoutes(['hsp1-institution-change-permission-first'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'hsp1-institution-change')
  assert.equal(h!.urgency, 'today')
})

test('family 5 — spouse divorce / status cancellation includes DV センター as alternate', () => {
  const h = getHandoffForRoutes(['status-cancellation-before-expiry-boundary'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'spouse-divorce-remarriage')
  assert.ok(h!.kinds.some(k => k.kind === 'dv_center'), 'must include DV センター as alternate')
})

test('family 6 — 経営管理 disposition includes 税理士 + 司法書士', () => {
  const h = getHandoffForRoutes(['business-manager-disposition-no-auto-success'])
  assert.ok(h)
  const kinds = h!.kinds.map(k => k.kind)
  assert.ok(kinds.includes('tax_accountant'))
  assert.ok(kinds.includes('judicial_scrivener'))
})

test('family 7 — PR pending routes to 行政書士 + 入管 with before-deadline urgency', () => {
  const h = getHandoffForRoutes(['pr-pending-current-status-not-auto-protected'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'pr-pending')
  assert.equal(h!.urgency, 'before_deadline')
})

test('family 8 — tax/pension/social insurance routes 税理士 primary', () => {
  const h = getHandoffForRoutes(['late-payment-remediation-not-erased'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'tax-pension-social-insurance')
  assert.equal(h!.kinds[0].kind, 'tax_accountant')
  assert.ok(h!.kinds.some(k => k.kind === 'social_insurance'))
})

test('family 10 — 技人国 work scope routes to 行政書士 + 弁護士', () => {
  const h = getHandoffForRoutes(['gijinkoku-work-scope-not-any-job'])
  assert.ok(h)
  assert.equal(h!.familyTag, 'gijinkoku-work-scope')
  assert.equal(h!.kinds[0].kind, 'gyoseishoshi')
  assert.equal(h!.kinds[1].kind, 'immigration_lawyer')
})

// ----- Edge cases -----------------------------------------------------

test('returns null when no routes are passed', () => {
  assert.equal(getHandoffForRoutes(null), null)
  assert.equal(getHandoffForRoutes([]), null)
  assert.equal(getHandoffForRoutes(undefined), null)
  assert.equal(getHandoffForMatches(null), null)
  assert.equal(getHandoffForMatches([]), null)
})

test('returns null when routes are non-deep-water (e.g. address change)', () => {
  // address-change-card-window-dual-duty is a P1 housekeeping gate, not
  // in any deep-water family — it must not produce a handoff.
  const h = getHandoffForRoutes(['address-change-card-window-dual-duty'])
  assert.equal(h, null)
})

test('multi-family hit: DV + special-period prefers DV (urgency tie, registry order)', () => {
  // Both fire 'today'. DV is registered first to ensure safety always
  // wins on equal urgency.
  const h = getHandoffForRoutes([
    'special-period-departure-deepwater',
    'dv-address-safety-first',
  ])
  assert.ok(h)
  assert.equal(h!.familyTag, 'dv-address-safety-first')
})

test('multi-family hit: 不许可 + pension prefers 不许可 (higher urgency)', () => {
  const h = getHandoffForRoutes([
    'pension-exemption-not-arrears-not-free-pass',  // this_week
    'immigration-notice-taxonomy-first',             // today
  ])
  assert.ok(h)
  assert.equal(h!.familyTag, 'immigration-notice')
})

test('end-to-end: matchRouteGates feeds getHandoffForMatches', () => {
  // Pick a question that should fire the special-period-departure gate.
  const matches = matchRouteGates({
    question: '我特例期间申请更新中已经回国了，能不能回日本？',
  })
  assert.ok(matches.length > 0, 'must match at least one route gate')
  const h = getHandoffForMatches(matches)
  assert.ok(h, 'must produce a handoff from real gate matches')
  assert.equal(h!.familyTag, 'special-period')
})

test('handoff entry oneLine never names a specific private practitioner', () => {
  // Defensive — registry must stay category-level, never an endorsement
  // of a specific practitioner. Catch obvious mistakes early. "年金事務所"
  // and similar public window names are allowed; we look for clear
  // private-entity / individual-endorsement signals only.
  for (const entry of DEEP_WATER_HANDOFF_REGISTRY) {
    assert.doesNotMatch(
      entry.oneLine,
      /株式会社|合同会社|有限会社|先生|顧問契約|電話番号|@\w/,
      `family ${entry.familyTag} oneLine appears to reference a specific entity: ${entry.oneLine}`,
    )
  }
})

test('only public-window kinds carry official_locator', () => {
  // Private professionals (行政書士, 弁護士, 税理士, 社労士, 司法書士) must
  // NEVER carry contact info — TEBIQ does not endorse individuals.
  const PUBLIC_WINDOW_KINDS = new Set([
    'dv_center',
    'police',
    'isa_window',
    'tax_office',
    'pension_office',
    'municipal_office',
    'hello_work',
    'legal_terrace',
  ])
  for (const entry of DEEP_WATER_HANDOFF_REGISTRY) {
    for (const k of entry.kinds) {
      if (k.official_locator) {
        assert.ok(
          PUBLIC_WINDOW_KINDS.has(k.kind),
          `private professional kind "${k.kind}" must not carry official_locator`,
        )
      }
    }
  }
})
