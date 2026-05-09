# TEBIQ Current State

> Short-lived engineering snapshot. GM owns this file.
> Long-term product principles live in `TEBIQ_CONTEXT_PACK.md`; decisions live in
> `TEBIQ_DECISION_LOG.md`.

| Field | Value |
|---|---|
| `last_verified` | 2026-05-09 |
| `verified_by` | Codex GM-OPS quality-flywheel A |
| `source_of_truth` | `origin/main` + `gh pr list` + production `/api/build-info` + production eval-lab state + production SSE smoke + PL handoff |
| `main_head` | `481ee4b` |
| `main_head_title` | `docs: recalibrate takeover state (#109)` |
| `production_sha` | `481ee4b95dd8cfa961b2a177ef15cec6141e7ffa` |
| `production_build` | `2026-05-09T13:21:54.257Z` from `/api/build-info` |
| `production_url` | https://tebiq.jp/ai-consultation |
| `open_prs` | 0 (`gh pr list`, 2026-05-09) |

## Current Phase

**0.6 Sprint Day-2 PASS; Codex takeover cleanup complete; quality-flywheel A in progress.**

0.6 delivered Pro thinking, Fact Layer production injection, controlled follow-up,
save/share/return paths, waiting states, and Day-2 QA with P0/P1 = 0.

Founder/CC target card now authorizes Sub-task A only: make the internal
answer-quality console usable, simplify founder annotation, add AI proposal
review support, and raise the 100-case generation completeness target to >=95%.
Stop after A for founder trial before starting heterogeneous judge / regression.

## Production Health

| Check | Status |
|---|---|
| `/api/build-info` | ✅ returns `22e4bc0` |
| `/api/consultation/stream` smoke | ✅ `received → risk_hint → routing_status → fact_cards_injected → first_token → answer_chunk` |
| `FACT_LAYER_ENABLED` | ✅ true in production behavior, confirmed by `fact_cards_injected` SSE |
| `EVAL_LAB_ENABLED` | ✅ true in production behavior, dry-run endpoint returns 200 |
| Eval Lab 100Q completeness | ✅ 95/100 complete (TEBIQ 100/100, DeepSeek 95/100, 5 DS empty failures), verified 2026-05-09 |
| `DEEPSEEK_MAX_TOKENS` | 1500 in `lib/answer/core/deepseek-prompt.ts` |

## Active Quality-Flywheel A Work

| Item | Status |
|---|---|
| Eval Lab production data | ✅ 100 TEBIQ answers generated; 95 DeepSeek comparison answers generated |
| Founder annotation fields | In PR: simplified to score / severity / launchable / max issue / repair route |
| AI proposal v0 | In PR: local heuristic proposal for score, flags, skeleton, and repair route |
| Heterogeneous judge | Not started; requires founder + Claude.ai protocol before B |
| Regression diff pipeline | Not started; begins only after A checkpoint |

## 0.6 Delivered Since Prior State

| Area | Status |
|---|---|
| ENGINE Pack 2.2 | ✅ Fact Layer production injection shipped |
| ENGINE Pack 2.3 | ✅ Follow-up endpoint shipped |
| CODEXUI | ✅ Follow-up UX / save-share / waiting states shipped |
| FACT | ✅ Batches 5-8 landed in `origin/main`; Batch 9+ not started per PL 2026-05-09 |
| P0 hotfixes | ✅ duplicate `follow_up_limit_reached` + follow-up matcher root-question inheritance |
| QA | ✅ Day-2 full check PASS: `docs/qa/0.6-DAY2-20260508.md` |

## Window Architecture

| Window | Status | Boundary |
|---|---|---|
| Codex GM-OPS | Active | GM + ENGINE + QA + CODEXUI execution center; does implementation, regression, state, and routing |
| AQL | Independent | Answer quality diagnosis / attribution. Canonical repo doc pending; see `docs/roles/TEBIQ_AQL_ROLE.md` placeholder |
| DOMAIN | Independent | In-status / legal-domain semantic review; verdicts self-decided by DOMAIN |
| FACT | Independent | Fact card production via `docs/fact-cards/FACT_OPS_WINDOW_TASK_PACK.md`; not redefined by Codex |
| VOICE | Frozen | No active voice work unless PL reactivates |

Do not let Codex/GM collapse AQL, DOMAIN, or FACT into execution subroles.

## Known Conflicts / Verification Items

| ID | Conflict | Action |
|---|---|---|
| C-1 | QA/PL handoff says production DB has 22 fact cards; `origin/main` has 20 markdown fact cards | Not blocking. Verify from prod DB or sync logs before next FACT/DATABASE task |
| C-2 | QA P2-C says `PARENT_MAX_AGE_HOURS=24` is not wired; `origin/main` code imports and checks it | Treat as verification task, not a one-line fix, before changing code |
| C-3 | QA P2-E says DB `prompt_version` default is v1; `origin/main` migration/schema default is v2 | Verify prod DB default and newly created rows before changing code |
| C-4 | `CLAUDE.md` had stale `docs/ops/TEBIQ_CURRENT_STATE.md` / missing freshness-protocol references | Fixed in takeover cleanup branch |

## Known P2 / Backlog

| ID | Status |
|---|---|
| P2-A | Word scanner false positives around contextual `500万` / `通常`; observability only |
| P2-B | Complex answers can truncate while stream completes as `completed`; needs product/UX decision |
| P2-C | Parent max-age behavior needs targeted re-verification; see C-2 |
| P2-D | `x-tebiq-build` response header absent; QA traceability only |
| P2-E | Prompt-version observability needs targeted re-verification; see C-3 |

## Next Checkpoint

1. Finish Sub-task A PR and stop for founder trial of `/internal/eval-lab`.
2. Do not start heterogeneous judge (B) or regression diff pipeline (C) until the A checkpoint passes.
3. When AQL is ready to canonicalize, update `docs/roles/TEBIQ_AQL_ROLE.md` with AQL-owned content.
4. Do not start FACT Batch 9+ until the target card or PL explicitly asks.

## Maintenance Rules

| Rule | Meaning |
|---|---|
| Remote first | `origin/main`, open PRs, and production build-info outrank local worktrees |
| Unknown stays unknown | Do not convert unresolved conflicts into facts |
| No self-eval | Codex does not mark its own answer-quality fixes as solved; AQL/founder validates |
| Current State decays | Update after merges, production flag changes, or handoff changes |
