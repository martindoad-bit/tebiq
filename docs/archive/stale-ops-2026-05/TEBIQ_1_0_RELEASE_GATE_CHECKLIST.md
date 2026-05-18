# TEBIQ 1.0 Release Gate Checklist

**Status:** scaffold / Program 6 of `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md`
**Owner:** Codex Production Lead / AI Engineering Lead
**Created:** 2026-05-16
**Consumers:** all 1.0 release operators

This file is the gating checklist for TEBIQ 1.0 release. It does not
replace the 0.8 release manifest (`TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`)
or cutover checklist (`TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`); it
extends them with the additional gates that Programs 1–5 introduced.

Order of operations is sequential. Do not unlock a later gate while an
earlier gate is RED.

---

## Gate 0 — Prerequisites

- [ ] Programs 1–5 marked `acceptance met` in
      `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` §9 live execution log.
- [ ] `docs/product/TEBIQ_CURRENT_STATE.md` `last_verified` is within 3 days.
- [ ] `git fetch origin && gh pr list` reflects only the planned 1.0 PRs.
- [ ] `npm test`, `npm run lint`, `npx tsc --noEmit --pretty false` all PASS.

## Gate 1 — RC matrix

- [ ] RC matrix has ≥50 provider-backed real-user samples
      (recommended: RC60 pack at `docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json`).
- [ ] `npm run eval:pack:readiness` verdict = GREEN (or YELLOW with all
      route-pattern misses owned and rerun-tagged).
- [ ] `npm run eval:pack:import` succeeds idempotently against the
      production-mirror DB.
- [ ] Provider-backed run completes with documented summary JSON under
      `docs/eval/`.
- [ ] AQL review (independent window) yields verdict = green per
      `docs/eval/TEBIQ_0_8_5_RC60_AQL_REVIEW_PROTOCOL.json`:
      P0 = 0, P1 unresolved = 0, no negative-control overmatch creating
      unsafe instructions.
- [ ] DOMAIN review (independent window) signs off per
      `docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md` §6 blockers list.

## Gate 2 — Knowledge asset state

- [ ] `npm run fact-layer:sync:dry` PASS for all filesystem cards.
- [ ] `npm run qa:card-import-audit` PASS, no DB drift.
- [ ] Source registry unresolved id count is documented (zero ideal,
      else recorded in `TEBIQ_CURRENT_STATE.md` and not blocking RC).
- [ ] No fact card with `needs_review_flags`, `ai_extracted` only,
      `guardrail_only`, or quarantined disposition is present in the
      RC's positive-injection path. Evidence: per-RC injected card audit.
- [ ] Business-manager 2025 reform cards remain quarantined from
      positive injection per FACT report §2.1 / §5 unless a separate
      DOMAIN-approved rewrite has shipped.

## Gate 3 — Materials Tab

- [ ] All P0 materials topics from
      `docs/ops/TEBIQ_0_8_5_MATERIALS_TAB_TOPIC_PLAN.md` shipped.
- [ ] `lib/quick-reference/topics.test.ts` PASS for all topics.
- [ ] User-facing copy is `材料` / `材料清单`. No `速查` strings rendered.
- [ ] Mobile QA sweep on iPhone Safari + Chrome + WeChat-built-in.
- [ ] No materials topic implies that complete materials guarantee
      permission. Spot check 5 random topics.
- [ ] Per topic: `factCardIds` non-empty (where applicable),
      `relatedTopicIds` cross-links resolve, `askTebiqBridge` present.

## Gate 4 — Deep-water routing

- [ ] All deep-water families in
      `docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md` §3 have at least one
      runtime route gate or validator OR are explicitly handed off.
- [ ] Professional handoff registry distinguishes 行政書士 / 弁護士 /
      DV センター / 税理士 / 社労士 / 入管 / 市区町村 by family.
- [ ] No deep-water answer ends with only a generic "请咨询专业人士"
      without a missing-fact extraction list and a named handoff.
- [ ] Deep-water RC bucket samples (`bucket=high_risk_deepwater`)
      pass DOMAIN review with no P0/P1.

## Gate 5 — Eval Lab quality flywheel

- [ ] `npm run eval:pack:readiness` is part of CI on any change to
      `lib/consultation/route-gates.ts`, `lib/consultation/guardrail-validator.ts`,
      `lib/answer/fact-layer/matcher.ts`, or any `docs/eval/TEBIQ_*_EVAL_PACK.json`.
- [ ] `export-aql-pack.ts` produces a private (out-of-repo) AQL handoff
      bundle containing question, answer text, fact ids, route ids,
      expected vs actual, route-gate misses, guardrail findings.
- [ ] Repair owners (FACT / DOMAIN / ROUTING / MATCHER / PROMPT /
      VALIDATOR / UX / COPY / ENGINEERING / PRODUCT) are present and
      consumed in the AQL output template.
- [ ] One closed loop is documented end-to-end:
      bad answer → AQL diagnosis → repair owner → fix → readiness re-check
      → provider re-run → AQL re-score.

## Gate 6 — Production parity

- [ ] Production DB fact-card sync executed:
      `npm run fact-layer:sync` against production target with
      explicit founder approval.
- [ ] Production env flag verification:
      - `FACT_LAYER_ENABLED` matches local target;
      - `ADMIN_KEY` rotated if exposed during testing;
      - any new env vars added by 1.0 work documented in `.env.example`.
- [ ] `/api/build-info` SHA matches the merged 1.0 commit.
- [ ] `npm run smoke:production-answer` PASS on a representative
      high-risk and negative-control prompt set.
- [ ] Admin/internal fail-closed smoke:
      - `/admin` without key → 404
      - `/api/admin/stats` without key → 404
      - `/internal/eval-lab` without key → 404
      - `/api/internal/eval-lab/state` without key → 404
- [ ] `/quick-reference` and `/ai-consultation` return 200 in production.
- [ ] Scrivener lead admin path QA if touched in 1.0 PRs.

## Gate 7 — Copy / canon / drift

- [ ] `npm run audit:user-facing-copy` PASS.
- [ ] `npm run qa:release-slice -- --all-changed && git diff --check` PASS.
- [ ] Copy canon (`docs/product/TEBIQ_COPY_CANON.md`) is up to date.
- [ ] Answer summary labels frozen:
      `先看这里 / 当前判断 / 建议动作 / 暂缓事项`.
- [ ] No `AI 智能分析`, `问 AI`, `DeepSeek`, `ChatGPT`, `Claude`, sidecar
      fields, or model names in user surfaces.

## Gate 8 — Documentation and rollback

- [ ] `docs/product/TEBIQ_CURRENT_STATE.md` updated to 1.0 with new
      `main_head`, `production_sha`, `production_build`, `production_url`,
      `open_prs`.
- [ ] `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` §9 marks all six
      programs `acceptance met`.
- [ ] Decision Log entry added for 1.0 cutover.
- [ ] Rollback runbook present and runnable:
      revert SHA, env flag down, fact-layer sync revert, admin re-rotation.
- [ ] Founder briefed and signed off.

## Gate 9 — Cutover

- [ ] PR labeled `release/1.0` merged to `main`.
- [ ] Vercel deploy SHA matches merged commit.
- [ ] Post-deploy smoke (Gate 6) re-run on production within 15 minutes
      of deploy completing.
- [ ] Post-deploy public-page browse on mobile within 30 minutes.
- [ ] Post-deploy answer smoke on high-risk prompts within 60 minutes.
- [ ] If any post-deploy smoke RED → execute rollback runbook;
      do not patch forward.

## Gate 10 — Post-cutover

- [ ] Update `TEBIQ_CURRENT_STATE.md` with deploy timestamps.
- [ ] Snapshot eval state for the 1.0 baseline.
- [ ] Open follow-up tickets for any deferred Program 1–5 P2 items.
- [ ] 24-hour observation window: production answer error rate,
      consultation completion rate, materials page errors. No regressions.
- [ ] Announce 1.0 only after Gate 10 observation passes.

---

## Owner Map

| Role | Gates owned | Cannot self-certify |
|---|---|---|
| Codex Production Lead | 0, 5, 7, 8, 9 | RC P0/P1 verdicts, DOMAIN sign-off, founder sign-off |
| AQL (independent) | 1 (scoring) | — |
| DOMAIN (independent) | 1 (gate), 4 (boundary text) | — |
| FACT (independent) | 2 | — |
| CODEXUI / Product Copy | 3 (UI), 7 (copy) | — |
| QA | 1 (technical), 3 (mobile), 6, 9 | — |
| Founder | final acceptance, deploy authorization | — |

Codex never advances Gate 1 to PASS without independent AQL+DOMAIN signal.
Codex never executes Gate 9 without founder authorization.
