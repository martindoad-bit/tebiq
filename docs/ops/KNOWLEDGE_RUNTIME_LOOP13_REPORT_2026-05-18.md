# Knowledge Runtime Expansion Loop13 — L5_ONLY Deep-Water Binding

Date: 2026-05-18
Branches:
- `codex/knowledge-runtime-loop13-l5-binding`
- `codex/knowledge-loop13-smoke-final`
- `codex/knowledge-loop13-n18-context`

Production SHA after final deploy: `f6ff6f3a167d388130ee5ca74e60bf32d15290a7`

## Goal

Loop13 does not promote ordinary answer-runtime cards. It takes high-risk `ai_extracted` cards that are useful but unsafe for direct positive injection, and binds them to route gates + L5 practice-signal panels.

This is the intended path for cards whose value is "recognize the danger zone and prepare the user for professional confirmation", not "answer the case".

## Candidate Set

| Card | Loop13 disposition |
|---|---|
| `eijuusha-haigusha-divorce` | L5_ONLY via dedicated spouse divorce/death/remarriage route |
| `nihonjin-haigusha-divorce-teijusha` | L5_ONLY via spouse + 定住者告示/告示外 routes |
| `zaijuu-haigusha-6months` | L5_ONLY via spouse/status-cancellation routes |
| `zairyu-pl-after-shibetsu` | L5_ONLY via spouse divorce/death/remarriage route |
| `zairyu-shikaku-torikeshi-jiyu-10` | L5_ONLY via generic status-cancellation route |
| `zairyu-tokubetsu-kyoka` | L5_ONLY via deportation/special-permission route |
| `overstay-self-report-route` | L5_ONLY via departure-order route |
| `nyukoku-kyohi-jiyu` | L5_ONLY via landing-denial/reentry-risk route |
| `teijusha-koshikai-vs-koshigai` | L5_ONLY via 定住者告示/告示外 route |
| `zairyu-irrelevent-jutsu` | Already covered by pending-change and 技人国 work-scope L5 signals |
| `keiei-kanri-capital-asset-3000man-criterion` | Already covered by business-manager 2025 reform L5 signal; remains guardrail-only |
| `keiei-kanri-existing-3year-transition` | Already covered by business-manager 2025 reform L5 signal |

## Implemented

### Route gates added

- `departure-order-not-reentry-guarantee`
- `spouse-divorce-remarriage-procedure-boundary`
- `teijusha-kokujigai-boundary`
- `landing-denial-reentry-risk`

### L5 signals added

L5 registry expanded from 12 to 17 signals:

- `status-cancellation-grounds-and-hearing`
- `teijusha-kokujigai-boundary`
- `overstay-departure-order-self-report`
- `deportation-special-permission-boundary`
- `landing-refusal-admissibility`

### Handoff wiring

- Spouse divorce/death/remarriage now uses a dedicated route instead of borrowing the generic status-cancellation gate.
- Generic status-cancellation now has its own handoff and L5 signal.
- Overstay departure-order and special-permission questions route to immigration-lawyer-first handoff.
- Landing-denial / reentry-risk questions route to a dedicated entry-risk handoff.
- 定住者告示/告示外 questions route to a dedicated professional-confirmation handoff.

### Answer smoke expansion

`scripts/test/smoke-production-answer.ts` expanded from 20 to 25 questions with five Loop13 L5_ONLY cases:

- spouse death / status basis
- overstay departure-order self-report
- prior overstay + COE / landing examination
- divorce-to-teijusha / kokujigai distinction
- existing business-manager holder / 2028 transition

The smoke redlines were also calibrated during production verification so they reject dangerous affirmative claims, not safe negated warnings. This fixed false positives such as "not guaranteed to enter" and "not completely exempt", while preserving the hard blocks against permission guarantees.

### Additional production hardening from verification

- Rewrote departure-order / landing-risk prompt phrasing to avoid leaking internal "do not say" wording into user-facing answers.
- Added explicit non-PR tax context handling: if the user says they are not asking about permanent residence, ordinary resident-tax installment answers should stay on payment / arrears status and not expand into PR risk.
- Tightened 定住者告示/告示外 guidance so marriage duration, work, and tax payment are treated as facts to prepare, not permission guarantees or one-ticket denials.
- Broadened business-manager smoke anchors to accept common variants like `经营・管理`, `既存持有人`, and capital / asset references.

## Verification

Pre-deploy local checks:

- `npm test -- --runInBand`: PASS, 264/264
- `npx tsc --noEmit --pretty false`: PASS
- `npm run lint`: PASS
- `npm run fact-layer:sync:dry`: PASS, scanned=269 errors=0

Production checks:

- `npm run qa:production-smoke`: PASS, checked 70/70 routes; `unexpected_404=0`, `hard_fail=0`.
- `PRODUCTION_URL=https://tebiq.jp SMOKE_STREAM_TIMEOUT_MS=150000 npm run smoke:production-answer`: PASS, 25/25.
- Build info confirmed production main at `f6ff6f3a167d388130ee5ca74e60bf32d15290a7`.

## Notes

- No `ai_extracted` card was promoted to answer runtime in this loop.
- No DB sync is required for the L5/route-gate code changes, but dry sync was run to ensure fact-card integrity stayed clean.
- This loop increases product-visible knowledge behavior without increasing ordinary RAG injection risk.
- The final 25-question production answer smoke includes 20 redline questions plus 5 negative controls. All passed after the above smoke/product hardening.

## Loop13 Outcome

Loop13 is complete. It converted high-risk quarantine knowledge into route gates and L5 practice-signal behavior, while keeping direct answer-runtime promotion unchanged. The production answer layer now recognizes and routes these additional deep-water families:

- spouse divorce / death / remarriage boundary
- status-cancellation basis loss
- overstay self-report / departure-order misunderstanding
- deportation / special-permission boundary
- landing-denial / prior overstay entry risk
- 定住者告示 / 告示外 distinction

Next loop should return to the broader Knowledge Runtime Expansion Goal: process another 30-50 card batch, with particular attention to MATERIALS_ONLY and safe ANSWER_RUNTIME candidates now that the L5-only path is stable.
