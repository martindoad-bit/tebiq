# TEBIQ Current State

> Short-lived engineering snapshot. GM / Codex Production Lead owns this file.
> Long-term product principles live in `TEBIQ_CONTEXT_PACK.md`; decisions live in
> `TEBIQ_DECISION_LOG.md`.

| Field | Value |
|---|---|
| `last_verified` | 2026-05-15 |
| `verified_by` | Codex Production Lead / AI Engineering Lead |
| `source_of_truth` | `origin/main` + `gh pr list` + production `/api/build-info` + production admin/internal smoke + production answer smoke |
| `main_head` | `6676652` |
| `main_head_title` | `fix: protect internal admin surfaces (#132)` |
| `production_sha` | `6676652e8a5be3058f389c73130397d563e6eb45` |
| `production_build` | `2026-05-15T12:35:34.362Z` from `/api/build-info` |
| `production_url` | https://tebiq.jp |
| `open_prs` | 0 (`gh pr list`, 2026-05-15) |

## Current Phase

**TEBIQ 0.8 has shipped as a safety-gated consultation release.**

0.8 is not a full legal-source advisory product and does not replace
administrative scriveners. Its current product value is:

- consultation answers use P0/P1 route gates and terminal guardrail validators;
- answer summaries preserve the required labels `先看这里 / 当前判断 / 建议动作 / 暂缓事项`;
- Eval Lab can import, rerun, compare, annotate, and export answer runs;
- `/admin/*`, `/api/admin/*`, `/internal/*`, and `/api/internal/*` fail closed without valid admin access;
- production answer smoke has passed on representative high-risk prompts.

## Latest Production State

Merged release PRs:

| PR | Merge Commit | Purpose |
|---|---|---|
| #131 | `6e08aaf` | 0.8 release candidate safety gates, Eval Lab, provider-backed regression tooling |
| #132 | `6676652` | Protect internal admin surfaces with middleware + httpOnly admin cookie |

Production smoke after #132:

| Route / Check | Result |
|---|---|
| `/api/build-info` | `6676652`, `answer-core-v1.1-llm` |
| `/admin` without key / wrong key | 404 |
| `/api/admin/stats` without key | 404 |
| `/internal/eval-lab` without key / wrong key | 404 |
| `/api/internal/eval-lab/state` without key | 404 |
| `/quick-reference` | 200 |
| `/ai-consultation` | 200 |
| production answer smoke | 5/5 completed |

## 0.8 Verification Evidence

Clean release worktree verification completed before merge:

- `npm test`: passed, 195 tests;
- `npm run lint`: passed;
- `npx tsc --noEmit --pretty false`: passed;
- `npm run build`: passed;
- `npm run qa:release-slice -- --all-changed && git diff --check`: passed;
- provider-backed Loop2B composite: 17/17 completed, terminal guardrail findings 0;
- AQL/QA final review: PASS, no release-blocking P0/P1;
- production answer smoke after deployment: 5/5 completed.

Important evidence docs:

- `docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`
- `docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`
- `docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md`
- `docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md`
- `docs/eval/TEBIQ_0_8_LOOP*.md`
- `docs/qa/TEBIQ_0_8_*`

## Active Product Boundaries

### 提问 Tab

- Keep answer summaries under the fixed labels: `先看这里 / 当前判断 / 建议动作 / 暂缓事项`.
- Do not turn AI into an immigration approval judge.
- High-risk or under-specified cases should route to deep-water / professional confirmation.
- P0/P1 guardrails protect against dangerous shortcuts around status change, HSP1 institution change, special periods, taxes, pension, DV/address safety, and business-manager reform myths.

### 材料 Tab

- Direction remains scenario-first official-material checklists.
- User-facing name should be `材料` / `材料清单`; `Quick Reference` is internal or historical naming only.
- Do not reintroduce `速查` as a user-facing product label without product-owner approval.
- Do not patch random copy before product structure is clear.
- Materials can explain official checklist items, but must not imply that complete materials guarantee permission.

### Knowledge Atlas / Fact Layer

- Legal-source and knowledge-thickness work is valuable, but not all cards are runtime-connected.
- FACT/DOCUMENT batches must remain source-traceable and DOMAIN-reviewable before promotion into answer runtime.
- Known source issue: `経営・管理` 2025 reform language is high-risk; distinguish confirmed official requirements from older startup/500万円 shorthand.

## Current Technical Debt / Cleanup Focus

Post-0.8 cleanup is now active:

- stale current-state and release docs need convergence;
- root historical reports should be archived, not treated as current truth;
- ignored local build artifacts may be removed from worktrees;
- future windows must start from `origin/main`, not old mixed research branches;
- release-gate scripts should remain documented and runnable.

## Known Residual Risks

| Area | Status |
|---|---|
| Follow-up provider-backed generation | Deterministic inheritance tests exist; broader live follow-up sampling remains useful |
| DOMAIN positive-route wording | Several deep-water areas intentionally avoid positive legal advice |
| FACT / DOMAIN source quality | Continue with higher-review loops before connecting more legal-source cards to runtime |
| Eval evidence provenance | Full answer text should stay in private AQL exports, not committed under `docs/eval` |
| Root docs | Historical reports are archived under `docs/archive/root-reports-2026-05/` |

## Maintenance Rules

| Rule | Meaning |
|---|---|
| Remote first | `origin/main`, open PRs, and production build-info outrank local worktrees |
| Unknown stays unknown | Do not convert unresolved DOMAIN/FACT conflicts into facts |
| No self-eval | Codex does not mark its own answer-quality fixes as solved; AQL/founder validates |
| Current State decays | Update after merges, production flag changes, or handoff changes |
