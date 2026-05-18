import assert from 'node:assert/strict'
import test from 'node:test'

import {
  L5_SIGNAL_REGISTRY,
  type L5ContentState,
  getSignalsForRoutes,
  listL5BoundRouteIds,
} from './signal-registry'
import { ROUTE_GATE_PATTERNS } from '../consultation/route-gates'
import { getHandoffForRoutes } from '../consultation/deep-water-handoff'

// The user-task spec enumerates these exact 10 family ids. Test that
// each appears in the registry exactly so future edits can't silently
// drop or rename a family.
const EXPECTED_FAMILIES = [
  'spouse-divorce-remarriage-procedure-vs-review-substance',
  'business-manager-disposition-timing',
  'business-manager-2025-reform-transition',
  'hsp1-institution-change-before-work-start',
  'permanent-residence-public-obligation-risk',
  'dv-address-safety',
  'expired-status-special-period-non-permission',
  'additional-document-notice-protocol',
  'student-attendance-status-change',
  'late-payment-corrected-tax-filing-record-mismatch',
  // DOMAIN 2026-05-17 P1: two new families added per DOMAIN audit
  'pending-change-new-work',
  'gijinkoku-job-scope',
  // Loop13 L5_ONLY binding: high-risk cards that should route to
  // preparation/handoff rather than ordinary fact injection.
  'status-cancellation-grounds-and-hearing',
  'teijusha-kokujigai-boundary',
  'overstay-departure-order-self-report',
  'deportation-special-permission-boundary',
  'landing-refusal-admissibility',
] as const

// Per task: needs_domain for items that depend on review-substance
// practice; agent_drafted for items that are public/well-known.
const EXPECTED_STATE: Record<string, L5ContentState> = {
  'spouse-divorce-remarriage-procedure-vs-review-substance': 'needs_domain',
  'business-manager-disposition-timing': 'needs_domain',
  'business-manager-2025-reform-transition': 'needs_domain',
  'hsp1-institution-change-before-work-start': 'needs_domain',
  'permanent-residence-public-obligation-risk': 'agent_drafted',
  'dv-address-safety': 'agent_drafted',
  'expired-status-special-period-non-permission': 'agent_drafted',
  'additional-document-notice-protocol': 'agent_drafted',
  'student-attendance-status-change': 'needs_domain',
  'late-payment-corrected-tax-filing-record-mismatch': 'needs_domain',
  'pending-change-new-work': 'needs_domain',
  'gijinkoku-job-scope': 'needs_domain',
  'status-cancellation-grounds-and-hearing': 'needs_domain',
  'teijusha-kokujigai-boundary': 'needs_domain',
  'overstay-departure-order-self-report': 'needs_domain',
  'deportation-special-permission-boundary': 'needs_domain',
  'landing-refusal-admissibility': 'needs_domain',
}

// All ProfessionalKind values currently declared in deep-water-handoff.
// Hard-coded to avoid a re-export — the test wants to fail loudly if
// someone adds a new kind without thinking about L5 coverage.
const VALID_PROFESSIONAL_KINDS = new Set([
  'gyoseishoshi',
  'immigration_lawyer',
  'dv_center',
  'police',
  'isa_window',
  'tax_office',
  'tax_accountant',
  'pension_office',
  'social_insurance',
  'municipal_office',
  'hello_work',
  'judicial_scrivener',
  'legal_terrace',
])

// ----- Registry shape contracts ---------------------------------------

test('registry covers all WB-G + DOMAIN P1 families exactly once', () => {
  assert.equal(
    L5_SIGNAL_REGISTRY.length,
    EXPECTED_FAMILIES.length,
    'registry must have one entry per family (10 WB-G + 2 DOMAIN P1 + 5 Loop13 = 17)',
  )
  const families = new Set(L5_SIGNAL_REGISTRY.map(s => s.family))
  for (const fam of EXPECTED_FAMILIES) {
    assert.ok(families.has(fam), `missing family: ${fam}`)
  }
})

test('DOMAIN P1 pending-change-new-work binds to pending-status-change gate', () => {
  const out = getSignalsForRoutes(['pending-status-change-current-activity-only'])
  assert.ok(out.some(s => s.family === 'pending-change-new-work'))
})

test('DOMAIN P1 gijinkoku-job-scope binds to gijinkoku-work-scope gate', () => {
  const out = getSignalsForRoutes(['gijinkoku-work-scope-not-any-job'])
  assert.ok(out.some(s => s.family === 'gijinkoku-job-scope'))
})

test('Loop13 spouse family binds to dedicated spouse route, not generic cancellation only', () => {
  const spouse = getSignalsForRoutes(['spouse-divorce-remarriage-procedure-boundary'])
  assert.ok(spouse.some(s => s.family === 'spouse-divorce-remarriage-procedure-vs-review-substance'))

  const generic = getSignalsForRoutes(['status-cancellation-before-expiry-boundary'])
  assert.ok(generic.some(s => s.family === 'status-cancellation-grounds-and-hearing'))
  assert.ok(!generic.some(s => s.family === 'spouse-divorce-remarriage-procedure-vs-review-substance'))
})

test('Loop13 overstay / special permission / landing routes bind to L5 signals', () => {
  assert.ok(
    getSignalsForRoutes(['departure-order-not-reentry-guarantee'])
      .some(s => s.family === 'overstay-departure-order-self-report'),
  )
  assert.ok(
    getSignalsForRoutes(['tokubetsu-kyoka-not-normal-route'])
      .some(s => s.family === 'deportation-special-permission-boundary'),
  )
  assert.ok(
    getSignalsForRoutes(['landing-denial-reentry-risk'])
      .some(s => s.family === 'landing-refusal-admissibility'),
  )
})

test('every signal has all required fields populated', () => {
  for (const s of L5_SIGNAL_REGISTRY) {
    assert.ok(s.id, `signal missing id`)
    assert.ok(s.family, `signal ${s.id} missing family`)
    assert.ok(s.title, `signal ${s.id} missing title`)
    assert.ok(s.contentState, `signal ${s.id} missing contentState`)
    assert.ok(s.triggerRoutes.length > 0, `signal ${s.id} has no triggerRoutes`)
    assert.ok(s.whyThisIsDeepWater.length > 0, `signal ${s.id} missing whyThisIsDeepWater`)
    assert.ok(s.prepareWhat.length > 0, `signal ${s.id} has empty prepareWhat`)
    assert.ok(s.askWho.length > 0, `signal ${s.id} has empty askWho`)
    assert.ok(s.doNotDo.length > 0, `signal ${s.id} has empty doNotDo`)
  }
})

test('contentState matches WB-G design (needs_domain vs agent_drafted)', () => {
  for (const s of L5_SIGNAL_REGISTRY) {
    const expected = EXPECTED_STATE[s.family]
    assert.ok(expected, `unexpected family in registry: ${s.family}`)
    assert.equal(
      s.contentState,
      expected,
      `signal ${s.id} contentState should be ${expected} per WB-G spec`,
    )
  }
})

test('every triggerRoute id exists in ROUTE_GATE_PATTERNS', () => {
  const known = new Set(ROUTE_GATE_PATTERNS.map(p => p.id))
  for (const s of L5_SIGNAL_REGISTRY) {
    for (const id of s.triggerRoutes) {
      assert.ok(
        known.has(id),
        `signal ${s.id} references unknown route gate id "${id}" — drift from route-gates.ts?`,
      )
    }
  }
})

test('every askWho entry is a valid ProfessionalKind', () => {
  for (const s of L5_SIGNAL_REGISTRY) {
    for (const k of s.askWho) {
      assert.ok(
        VALID_PROFESSIONAL_KINDS.has(k),
        `signal ${s.id} references unknown ProfessionalKind "${k}"`,
      )
    }
  }
})

test('agent_drafted signals carry at least one sourceUrl; needs_domain may be empty', () => {
  for (const s of L5_SIGNAL_REGISTRY) {
    if (s.contentState === 'agent_drafted') {
      assert.ok(
        s.sourceUrls.length > 0,
        `agent_drafted signal ${s.id} must cite at least one public source`,
      )
    }
  }
})

test('needs_domain signals never contain strategy language', () => {
  // Defence in depth — the user-facing block must not read as advice.
  // This catches obvious "你应该" / "建议你" / "推荐" patterns slipping
  // into prepareWhat or doNotDo for needs_domain signals.
  const STRATEGY_PATTERNS = [/你应该/, /建议你/, /推荐你/, /必ず.*してください/]
  for (const s of L5_SIGNAL_REGISTRY) {
    if (s.contentState !== 'needs_domain') continue
    for (const block of [s.prepareWhat, s.doNotDo]) {
      for (const line of block) {
        for (const pat of STRATEGY_PATTERNS) {
          assert.doesNotMatch(
            line,
            pat,
            `needs_domain signal ${s.id} contains strategy language: "${line}"`,
          )
        }
      }
    }
  }
})

// ----- Matcher contracts ----------------------------------------------

test('getSignalsForRoutes returns [] for null/empty input', () => {
  assert.deepEqual(getSignalsForRoutes(null), [])
  assert.deepEqual(getSignalsForRoutes(undefined), [])
  assert.deepEqual(getSignalsForRoutes([]), [])
})

test('getSignalsForRoutes returns matching signals', () => {
  const out = getSignalsForRoutes(['dv-address-safety-first'])
  assert.equal(out.length, 1)
  assert.equal(out[0].family, 'dv-address-safety')
})

test('getSignalsForRoutes preserves registry order on multi-hit', () => {
  // Both DV and special-period gates fire — registry order is
  // family 1..10, so spouse (family 1) does not match here; we use
  // dv (family 6) + special-period (family 7) which in REGISTRY appear
  // in family-list order (DV is index 5, special-period is index 6).
  const out = getSignalsForRoutes([
    'special-period-two-month-boundary',
    'dv-address-safety-first',
  ])
  assert.equal(out.length, 2)
  // DV is family index 5, special-period is index 6 in EXPECTED order
  assert.equal(out[0].family, 'dv-address-safety')
  assert.equal(out[1].family, 'expired-status-special-period-non-permission')
})

test('listL5BoundRouteIds returns all bound ids without duplicates', () => {
  const ids = listL5BoundRouteIds()
  assert.equal(new Set(ids).size, ids.length, 'no duplicates allowed')
  assert.ok(ids.length >= EXPECTED_FAMILIES.length, 'at least one route per family')
})

// ----- Integration with deep-water-handoff ----------------------------

test('getHandoffForRoutes attaches l5SignalIds when a signal matches', () => {
  const handoff = getHandoffForRoutes(['dv-address-safety-first'])
  assert.ok(handoff, 'DV gate must produce a handoff')
  assert.ok(handoff!.l5SignalIds, 'handoff must carry l5SignalIds')
  assert.ok(handoff!.l5SignalIds!.includes('dv-address-safety'))
})

test('getHandoffForRoutes preserves base handoff fields when L5 attaches', () => {
  const handoff = getHandoffForRoutes(['dv-address-safety-first'])
  assert.ok(handoff)
  // Base handoff identity is untouched (kind ordering, urgency, oneLine).
  assert.equal(handoff!.kinds[0].kind, 'dv_center')
  assert.equal(handoff!.urgency, 'today')
})

test('every L5 signal is reachable via at least one HandoffEntry', () => {
  // Ensures the UI will actually render every signal — if a family is
  // wired to L5 but not to any handoff route, the user will never see it.
  for (const signal of L5_SIGNAL_REGISTRY) {
    const handoff = getHandoffForRoutes(signal.triggerRoutes)
    assert.ok(handoff, `signal ${signal.id} has no reachable handoff entry`)
    assert.ok(
      handoff!.l5SignalIds && handoff!.l5SignalIds.includes(signal.id),
      `signal ${signal.id} is not surfaced by its own handoff entry`,
    )
  }
})

// ----- Per-family routing assertions (locks WB-G family list) ---------

test('spouse divorce family binds to dedicated spouse gate', () => {
  const out = getSignalsForRoutes(['spouse-divorce-remarriage-procedure-boundary'])
  assert.ok(out.some(s => s.family === 'spouse-divorce-remarriage-procedure-vs-review-substance'))
})

test('HSP1 institution change binds to permission-first gate', () => {
  const out = getSignalsForRoutes(['hsp1-institution-change-permission-first'])
  assert.ok(out.some(s => s.family === 'hsp1-institution-change-before-work-start'))
})

test('PR public-obligation signal binds to PR pending gate', () => {
  const out = getSignalsForRoutes(['pr-pending-current-status-not-auto-protected'])
  assert.ok(out.some(s => s.family === 'permanent-residence-public-obligation-risk'))
})

test('additional-document protocol binds to notice-taxonomy gate', () => {
  const out = getSignalsForRoutes(['immigration-notice-taxonomy-first'])
  assert.ok(out.some(s => s.family === 'additional-document-notice-protocol'))
})

test('student attendance binds to shikakugai 28h gate', () => {
  const out = getSignalsForRoutes(['student-shikakugai-28h-long-vacation-limit'])
  assert.ok(out.some(s => s.family === 'student-attendance-status-change'))
})

test('late-payment / corrected filing binds to late-payment gate', () => {
  const out = getSignalsForRoutes(['late-payment-remediation-not-erased'])
  assert.ok(out.some(s => s.family === 'late-payment-corrected-tax-filing-record-mismatch'))
})
