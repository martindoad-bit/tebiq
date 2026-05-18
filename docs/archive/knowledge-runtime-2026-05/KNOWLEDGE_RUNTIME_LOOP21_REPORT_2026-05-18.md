# Knowledge Runtime Loop21 Report

Date: 2026-05-18  
Owner: Codex Production Lead / AI Engineering Lead  
Production SHA after merge: `244db78e4d7d3b28b85ee06818a69e1091e2bcfb`  
Production build: `2026-05-18T12:02:32.259Z`  
PR: #199 `fix: close fact sync db connection`

## Scope

Loop21 was a knowledge-runtime infrastructure loop.

Loop20 had already reduced the rewrite queue to zero for the named Loop19
rewrite set, but exposed a critical operational weakness: full production
`npm run fact-layer:sync` could write cards and then hang, forcing targeted sync
workarounds. That is unacceptable for the Knowledge Runtime Expansion Goal,
because every future 30-50-card batch depends on reliable sync.

Therefore Loop21 did not promote additional cards. It fixed the card-to-runtime
pipe itself.

## Work Completed

1. Added `closeDb()` to `lib/db/index.ts`.
2. Updated `scripts/fact-layer-sync.ts` to:
   - close the Postgres client in CLI mode after production sync,
   - print progress every 25 upserts,
   - keep dry-run behavior unchanged.
3. Ran full production card sync:
   - `scanned=269`
   - `upserted=269`
   - `errors=0`
   - process exited normally.
4. Confirmed production DB and filesystem are aligned.
5. Merged PR #199 and verified deployed production.

## Knowledge Waterline

After Loop21:

| State | Count | Runtime meaning |
|---|---:|---|
| `human_reviewed` | 5 | Strong runtime injection |
| `ai_verified` | 238 | Runtime injection candidate |
| `ai_extracted` | 18 | Quarantine; mostly L5/material/higher-risk route assets |
| `disabled` | 8 | Rejected / disabled |
| Total fact cards | 269 | Filesystem and DB aligned |

Runtime-injectable fact cards: **243**.

Materials:

| Metric | Count |
|---|---:|
| Quick-reference / materials topics | 48 |
| Material references | 233 |
| Missing material references | 0 |

Route gates:

| Metric | Count |
|---|---:|
| Route-gate patterns | 56 |
| Source asset ids | 61 |
| Unresolved provenance | 1 |

Remaining unresolved provenance: `aql-rur-037-jfind-employment-bridge`.

## Verification

| Check | Result |
|---|---|
| `npm run fact-layer:sync:dry` | PASS |
| `npm run fact-layer:sync` | PASS, 269/269 upserted, normal exit |
| `npm run qa:card-import-audit` | PASS, DB/filesystem aligned |
| `npm test` | PASS, 265/265 |
| `npm run lint` | PASS |
| `npx tsc --noEmit --pretty false` | PASS |
| `bash scripts/qa/pre-report-audit.sh` | PASS, 5/5 |
| Post-deploy production URL smoke | PASS, 70/70 checked routes |
| Post-deploy production answer smoke | PASS, 25/25 |

Notes:

- A pre-merge answer-smoke run had one transient R25 `status_timeout`; the
  answer content was safe, but the terminal event was timeout. The post-deploy
  rerun on SHA `244db78` passed 25/25 with R25 completed. This remains a
  latency watch item, not a content P0.

## Product Impact

Loop21 is not a flashy user-facing change, but it removes a real production
operational blocker.

Before Loop21:

- Future card batches could be written only through targeted workarounds.
- It was possible to finish card rewrites but fail to reliably land them in DB.
- Sync status was harder to observe because the command emitted no progress.

After Loop21:

- Full production sync is safe to run and exits normally.
- The next 30-50-card loop can rely on the ordinary sync path.
- Progress output makes long sync runs observable instead of looking frozen.

## What Did Not Change

Loop21 intentionally did not change:

- fact-card states,
- material topics,
- L5 signal content,
- answer prompt behavior,
- route-gate rules.

This is why the knowledge counts remain `269 total / 243 runtime-injectable /
18 quarantine / 8 disabled`.

## Current Product Assessment

TEBIQ is still in **1.0 RC / Knowledge Runtime Expansion**, not final 1.0.

Strong now:

- Safety and route-gate layer.
- Fact-card injection path.
- Sync path from filesystem to production DB.
- Materials base surface with 48 topics.
- Production smoke stability after Loop21.

Still below the target:

- 400+ high-quality assets has not been reached.
- Materials Tab is improved but not yet 85+; cross-links and source freshness
  need more work.
- Remaining `ai_extracted` cards are mostly high-risk or materials/L5 candidates
  and should not be mass-promoted.
- L5 panels still need richer practical preparation content.
- AQL/user feedback loop is not yet a mature daily operating cycle.

## Next Loop Recommendation

Loop22 should use the now-stable sync pipeline to handle a small high-signal
batch:

1. Add an AQL-origin source asset for `aql-rur-037-jfind-employment-bridge`.
2. Source-repair or safely bucket `eijuu-jukyo-check-tax-shomeisho`.
3. Review the remaining 18 quarantine cards only for safe routing:
   - `ANSWER_RUNTIME` only when official-source, narrow, and low overreach risk,
   - `MATERIALS_ONLY` for document/page routing,
   - `L5_ONLY` for practice-heavy or high-risk boundary assets,
   - `REJECT` for source/claim mismatch.
4. Run the same full verification:
   - fact sync,
   - card import audit,
   - answer smoke,
   - materials route smoke,
   - §5.3 audit.

