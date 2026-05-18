# Knowledge Runtime Expansion — Loop 11 Report

Date: 2026-05-18  
Branch: `codex/knowledge-runtime-loop11-rewrite-materials`  
Scope: 18 fact cards + Materials/Quick Reference bindings

## Goal

Loop 11 continued the Knowledge Runtime Expansion goal, but treated this batch as a **rewrite and safety-binding pass**, not a raw promotion pass. The key issue was that several useful cards still carried stale, over-broad, or source-mismatched claims. The loop therefore promoted only narrow official facts and kept unsafe cards out of runtime/material paths.

## Card Decisions

| Bucket | Count | Cards |
|---|---:|---|
| ANSWER_RUNTIME promoted / retained | 3 | `eijuu-shinsei-shorui`, `eijuu-zeikin-payment`, `zairyu-card-loss-overseas` |
| NEEDS_REWRITE / quarantine retained | 12 | `chintai-hoshou-gaikokujin`, `eijuu-payment-strict-2024`, `eijuu-shotoku-200man-myth`, `ginko-account-gaijin-6months`, `jutaku-shikikin-rekkin-shuukan`, `kakkoukin-mortgage-foreigner`, `kazoku-taizai-shotoku-280`, `keiei-kanri-2025-4-requirements`, `kobun-jutaku-jutsu-kushu`, `koukou-mukyo-shogakukin`, `ryugaku-shusseki-ritsu-80`, `yuigon-koseishousho-jutsu` |
| L5 / caveat-only retained | 2 | `kodo-senmon-shoku-points`, `shakai-hoken-kyotei-bilateral` |
| REJECT / disabled | 1 | `gaiko-souzoku-kokusai` |

### Important Safety Corrections

- `keiei-kanri-2025-4-requirements` remains `ai_extracted` and was removed from Materials/Quick Reference bindings. The old "4 requirements" framing is incomplete and must not reach users as runtime guidance.
- `eijuu-payment-strict-2024` remains `ai_extracted` and was removed from Materials/Quick Reference bindings. It is too close to an enforcement/取消制度 interpretation and should be handled as L5/DOMAIN material before promotion.
- `kakkoukin-mortgage-foreigner` was rewritten to remove a non-whitelisted Flat35 source and the over-broad "many banks require permanent residence" claim.
- `koukou-mukyo-shogakukin` had old MEXT/clarinet references replaced with the current MEXT support page and was removed from current user paths pending rewrite.
- `zairyu-card-loss-overseas` was promoted only for the narrow fact "after first re-entry, apply for reissue within 14 days"; it does not answer re-entry permission or airport handling.

## Materials / Quick Reference Binding

Material bindings were tightened instead of widened:

- Removed tax treaty card from `national-tax-certificate-sono3-materials`.
- Removed student attendance card from resident tax certificate material entity.
- Removed social-security agreement card from health-insurance qualification material entity; kept it on pension/social-insurance paths.
- Removed high-risk `keiei-kanri-2025-4-requirements` and `eijuu-payment-strict-2024` from user-facing material/topic paths.

## Subagent Review

Two read-only subagents reviewed the batch.

| Reviewer | Result |
|---|---|
| FACT/DOMAIN | No P0. P1 issues found around unsafe material binding and stale source/evidence mismatch; fixed in this loop. |
| Materials QA | No broken IDs. Recommended narrowing several over-broad material bindings; fixed in this loop. |

## Verification

| Check | Result |
|---|---|
| `npm run fact-layer:sync:dry` | PASS — scanned 269, errors 0 |
| `npm test` | PASS — 257/257 |
| `npx tsc --noEmit --pretty false` | PASS |
| `npm run lint` | PASS |

## Runtime Delta

This loop does **not** claim 30-50 new runtime cards. It is a safety loop.

- Runtime promoted: +3
- Quarantine / needs rewrite retained: 14
- Disabled/rejected retained: 1
- User-facing material bindings narrowed: yes
- P0 found: 0

## Next Loop

Loop 12 should pick a cleaner batch from remaining quarantine cards, preferring cards with:

1. direct official source already on whitelist,
2. no disputed professional judgment,
3. clear material or answer-runtime use case,
4. no stale numeric threshold.

Recommended next batch themes:

- residence-card and notification procedure cards,
- low-risk life procedure cards with official source,
- material-only cards for certificates already used in Materials Universe.
