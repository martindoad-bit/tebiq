# TEBIQ 0.8.5 RC Eval Pipeline

Owner: Codex Production Lead / AI Engineering Lead
Date: 2026-05-16
Scope: Program 1 + Program 5 down-payment (Eval Lab quality flywheel)

This document explains the static-first → provider-backed → AQL-handoff
loop used for RC matrices on the path to TEBIQ 1.0. New tooling added in
this branch is listed at the bottom.

## Pipeline Stages

```text
1) Author / extend a JSON eval pack
       e.g. docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json
       Owner: AQL window (Locke)

2) Pack readiness (no DB, no provider)
       npm run eval:pack:readiness -- \
         --input=docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json \
         --summary-json=docs/eval/TEBIQ_0_8_5_RC60_READINESS.json
       Catches: duplicate starter_tag, missing question_text,
                unknown route_gate ids, route-pattern misses,
                negative-control overmatch, advisory unknown fact_hint.
       Verdict: GREEN / YELLOW / RED.

3) Import pack into Eval Lab DB
       ADMIN_KEY=local-eval npm run eval:pack:import -- \
         --input=docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json \
         --base-url=http://127.0.0.1:3000 \
         --run-id=tebiq-0.8.5-rc60
       Idempotent on starter_tag. Requires dev server running and
       EVAL_LAB_IMPORT_KEY env var if endpoint enforces it.

4) Generate provider-backed answers
       ADMIN_KEY=local-eval npx tsx scripts/eval/fill-eval-lab-missing.ts \
         --base-url=http://127.0.0.1:3000 \
         --admin-key-env=ADMIN_KEY \
         --reviewer=rc60 \
         --starter-prefix=0.8.5-rc60- \
         --concurrency=3 \
         --tebiq-only --force-tebiq \
         --summary-json=docs/eval/TEBIQ_0_8_5_RC60_RUN_SUMMARY.json
       Re-running with --failed-only retries only failed samples.

5) Export AQL handoff packet (private; full answer text)
       npm run eval:pack:export-aql -- \
         --starter-prefix=0.8.5-rc60- \
         --output=/tmp/tebiq-rc60-aql.json
       Refuses to write under docs/eval unless --allow-docs-output.
       Includes: question, answer text, fact_card_ids, route_gate_ids,
                 expected_route_gate_ids, route_gate_misses,
                 guardrail_findings, status, fallback, prompt_version,
                 engine_version, latency_ms.

6) AQL review (independent window)
       AQL scores using docs/eval/TEBIQ_0_8_5_RC60_AQL_REVIEW_PROTOCOL.json.
       DOMAIN gate from docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md applies
       to high-risk families.

7) Repair loop
       Per AQL repair_owner: FACT / DOMAIN / ROUTING / MATCHER / PROMPT /
       VALIDATOR / UX / COPY / ENGINEERING / PRODUCT / UNKNOWN / IGNORE.
       Re-run from step 2 (readiness re-checks pack changes) → step 4
       (regenerate only failed samples) → step 5 (re-export).
```

## Why Stage 2 Matters

Stage 2 was added because RC60 round-1 had 11 silent route-pattern misses
and 2 negative-control overmatches that would have only surfaced after
spending 60 provider calls in stage 4. Static check is free; provider
runs are not.

The script accepts any pack with the shape:

```jsonc
{
  "name": "...",
  "version": "...",
  "items": [
    {
      "starter_tag": "0.8.5-rc60-XXX",
      "scenario": "...",
      "question_text": "...",
      "metadata_json": {
        "bucket": "materials_preparation",
        "risk_level": "P1",
        "expected_route_gate": ["..."],
        "expected_fact_hint": ["..."],
        "must_have": ["..."],
        "must_not_have": ["..."]
      }
    }
  ]
}
```

`expected_fact_hint` is treated as advisory (AQL-authored descriptors,
not strict slugs). Unknown route ids and unknown duplicates are RED.

## Files

New (this branch):

- `scripts/eval/check-eval-pack-readiness.ts`
- `scripts/eval/import-eval-pack.ts`
- `scripts/eval/export-aql-pack.ts`
- `docs/eval/TEBIQ_0_8_5_RC60_READINESS.json` (RC60 readiness snapshot)

New npm scripts:

- `eval:pack:readiness`
- `eval:pack:import`
- `eval:pack:export-aql`

Pre-existing pieces this composes:

- `scripts/eval/check-card-import-first24-route-gates.ts` (RC56-style
  pure route check; superseded for new packs by `eval:pack:readiness`,
  retained for back-compat).
- `scripts/eval/fill-eval-lab-missing.ts` (provider-backed answer
  generation, supports `--starter-prefix`, `--failed-only`,
  `--tebiq-only`, `--force-tebiq`, `--summary-json`).
- `app/api/internal/eval-lab/import-run/route.ts` (idempotent question
  upsert).
- `app/api/internal/eval-lab/tebiq-answer/route.ts` (single answer
  generation through the production stream path).
- `lib/consultation/route-gates.ts` (route-gate matcher).
- `lib/consultation/guardrail-validator.ts` (post-output validators).

## Known Gaps (Stage 2 found in RC60 round 1)

11 route-pattern misses across M14, B02, B12, DW05–DW07, DW11, DW12,
F03, F06, F09. Tracked in
`docs/engineering/TEBIQ_0_8_5_RC60_ROUTE_GATE_GAP_ANALYSIS.md` (separate
gap analysis document; per-failure A/B/C decision and minimal fix).

2 negative-control overmatches: N03 (logo change) and N10 (general tax)
both falsely trigger `immigration-notice-taxonomy-first` because that
gate's `allOf=[NOTICE_TERMS]` matches "通知" or "补件" without requiring
a "received notice" context. Fix candidates:

- add a receive-context `allOf` slot
  (e.g. `['来了','收到','届いた','寄来','取','付いた','邮件来']`);
- and / or add a deny token list
  (e.g. `['logo','源泉徴収','换工作通知','通知入管']`).

Defer until DOMAIN reviews whether tightening would cause false negatives
on legitimate received-notice cases (DW11 currently passes; N03/N10
should not).

## Operating Notes

- Eval Lab is admin/internal protected. Production must keep
  `/admin/*`, `/api/admin/*`, `/internal/*`, `/api/internal/*` fail-closed.
- AQL handoff JSON contains full answer text; do not commit to repo.
  `export-aql-pack.ts` refuses `/docs/eval/` output paths by default.
- Provider keys are session-scoped. Do not write any key to `.env`,
  docs, or PR descriptions; pass via shell env or `.env.local` only.
