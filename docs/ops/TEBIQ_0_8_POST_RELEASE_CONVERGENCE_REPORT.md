# TEBIQ 0.8 Post-Release Convergence Report

Date: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

## Purpose

This report records the first post-0.8 system convergence pass. The goal was not to add features. The goal was to reduce confusion after many windows, worktrees, guardrail loops, and release hotfixes.

## Context Stamp

| Field | Value |
|---|---|
| `origin/main` | `6676652 fix: protect internal admin surfaces (#132)` |
| `local_branch` | `codex/post-release-convergence` |
| `open_prs` | 0 |
| `production_build` | `6676652e8a5be3058f389c73130397d563e6eb45`, built at `2026-05-15T12:35:34.362Z` |
| `current_state_last_verified_before` | 2026-05-09 |
| `current_state_last_verified_after` | 2026-05-15 |

## Files Read Before Cleanup

Core memory / current state:

- `CLAUDE.md`
- `AGENTS.md`
- `PROJECT_MEMORY.md`
- `docs/product/TEBIQ_CONTEXT_PACK.md`
- `docs/product/TEBIQ_CURRENT_STATE.md`
- `docs/product/TEBIQ_QA_GATES.md`
- `docs/product/TEBIQ_COPY_SOURCE.md`
- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`

0.8 release memory:

- `docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`
- `docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`
- `docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md`
- `docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md`
- `docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md`
- `docs/eval/TEBIQ_0_8_LOOP2N_SPECIAL_PERIOD_DEPARTURE_GUARDRAIL_INTEGRATION.md`

Repository inventory:

- root markdown files;
- `docs/` file map;
- `scripts/` file map;
- ignored local artifacts and secret patterns.

## Cleanup Standard

The cleanup used four buckets:

| Bucket | Meaning | Action |
|---|---|---|
| Active truth | Current entry points and current 0.8 operating docs | Keep in place and update |
| Historical evidence | Old block reports / launch reports / visual reports | Archive, do not delete |
| Runtime/test assets | Code, scripts, guardrail packs, Eval Lab evidence | Keep in place |
| Local ignored artifacts | `.next`, `*.tsbuildinfo`, local secret comments | Remove from worktree or sanitize |

## Completed Cleanup

### 1. Current Truth Updated

Updated `docs/product/TEBIQ_CURRENT_STATE.md` from stale 0.6-era state to current 0.8 production state:

- `last_verified`: 2026-05-15;
- `main_head`: `6676652`;
- production build: `2026-05-15T12:35:34.362Z`;
- PR #131 and #132 recorded;
- production admin/internal smoke recorded;
- production answer smoke recorded.

Updated the 0.8 workstream docs so future windows do not keep reading old "provider missing" blockers as current truth:

- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`
- `docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`
- `docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md`
- `docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md`
- `docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md`

### 2. Root Historical Reports Archived

Moved historical root reports into:

```text
docs/archive/root-reports-2026-05/
```

Added:

```text
docs/archive/root-reports-2026-05/INDEX.md
```

This keeps historical evidence while reducing root-level noise. Active root entry points remain:

- `CLAUDE.md`
- `AGENTS.md`
- `PROJECT_MEMORY.md`
- `AI_HANDOFF*.md`
- `README.md`

The old memory snapshot was also moved to:

```text
docs/archive/memory/PROJECT_MEMORY_v1.md
```

### 3. Legacy References Repointed

Updated the old handoff references that pointed to now-archived report names:

- `AI_HANDOFF_CCA.md`
- `AI_HANDOFF_UI.md`

### 4. Local Secret Hygiene

Sanitized `.env.local` comments so local-only secret notes no longer include a plaintext password hint. The file remains gitignored and is not part of this git diff.

## Confirmed Not Cleaned

The following were intentionally not removed:

- `docs/eval/TEBIQ_0_8_*` because they are release evidence;
- `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md` because it is the current FACT progress ledger;
- `docs/fact-cards/*` because they remain knowledge assets even when not runtime-connected;
- `artifacts/screenshots/*` because they are tracked QA/UI visual evidence;
- `node_modules` because local verification depends on it.

## Residual Debt

| Area | Status | Recommended Next Action |
|---|---|---|
| Old workstream docs under `docs/ops/WORKSTREAM_*` | Still numerous, mostly historical | Later archive pass after checking references |
| Old QA alpha docs | Historical but still useful as evidence | Keep until a broader docs taxonomy pass |
| Missing research docs referenced by some current docs | Some Knowledge Atlas Batch29 reports are not in clean release branch | Mark as excluded research material if referenced again |
| Follow-up provider-backed sampling | Not fully closed by this cleanup | Schedule a separate post-release answer sampling loop |
| FACT / DOMAIN source quality | Known risk from earlier cross-window/model issues | Require higher-review FACT/DOCUMENT loops before runtime promotion |

## Release Interpretation After Cleanup

TEBIQ 0.8 is now:

- shipped;
- safety-gated;
- production-smoked;
- not a full legal-source advisory product;
- ready for post-release observation and incremental hardening.

The next engineering mode should be small, evidence-led stabilization, not large speculative feature work.
