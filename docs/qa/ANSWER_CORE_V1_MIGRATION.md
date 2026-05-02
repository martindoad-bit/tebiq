# TEBIQ Answer Core V1 — DB Migration Plan

## V1 ships with NO DB migration

V1 persists `AnswerRun` JSON as a sidecar inside the existing
`answer_drafts.sections_json` JSONB array. The sidecar is a synthetic
section with heading `__answer_run_v1__`; its body is the
`JSON.stringify(AnswerRun)`.

Read paths use `extractAnswerRun(sections)` which strips the sidecar
out before rendering, so users never see the raw JSON.

This trades a tiny write/read overhead for **zero migration risk**.
No Drizzle migration is required to deploy V1.

## Why not a real `answer_runs` table

A dedicated `answer_runs` table would be cleaner long-term, but:

1. Migrating in Vercel during a hot deploy is risky — schema drift
   between in-flight requests and the new column can cause tail-end
   500s.
2. V1's main goal is the architectural rebuild (PublicAnswer / safety
   gate / view-model), not the persistence shape.
3. `answer_drafts` is already the single row per question×answer; the
   data model is the same, just shape differs.

A future migration can promote sidecar JSON to first-class columns
without breaking V1 reads. See "Future migration shape" below.

## Backward compatibility

- **New writes**: every new `answer_drafts` row gets the sidecar.
  `legacy_draft_id` inside the sidecar's AnswerRun points back to
  `answer_drafts.id` after insert.
- **Legacy reads**: `/answer/{id}` for a draft written before V1
  (no sidecar) calls `reconstructLegacyRun({...})`. This produces a
  minimal AnswerRun where `engine_version: 'answer-core-v1'`,
  `detected_domain: 'unknown'`, `safety_passed: true`,
  `fallback_reason: null`. The `disclaimer` field warns "这是 V1 之前的旧整理，仅供参考。"

## Future migration shape (not in this PR)

When ready, the migration can be:

```sql
ALTER TABLE answer_drafts
  ADD COLUMN public_answer_json JSONB,
  ADD COLUMN safety_result_json JSONB,
  ADD COLUMN engine_version VARCHAR(40),
  ADD COLUMN fallback_reason VARCHAR(40),
  ADD COLUMN detected_domain VARCHAR(40);

CREATE INDEX answer_drafts_engine_version_idx ON answer_drafts(engine_version);
CREATE INDEX answer_drafts_detected_domain_idx ON answer_drafts(detected_domain);
```

OR a separate `answer_runs` table linked via FK:

```sql
CREATE TABLE answer_runs (
  id              VARCHAR(24) PRIMARY KEY,
  draft_id        VARCHAR(24) REFERENCES answer_drafts(id) ON DELETE CASCADE,
  engine_version  VARCHAR(40) NOT NULL,
  raw_query       TEXT NOT NULL,
  normalized_query TEXT NOT NULL,
  detected_domain VARCHAR(40) NOT NULL,
  source_kind     VARCHAR(40) NOT NULL,
  public_answer   JSONB NOT NULL,
  safety_result   JSONB NOT NULL,
  fallback_reason VARCHAR(40),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX answer_runs_draft_id_idx     ON answer_runs(draft_id);
CREATE INDEX answer_runs_engine_idx       ON answer_runs(engine_version);
CREATE INDEX answer_runs_domain_idx       ON answer_runs(detected_domain);
```

The migration script can backfill from the sidecar JSON in the same
transaction:

```sql
INSERT INTO answer_runs (id, draft_id, engine_version, ...)
SELECT
  ...,
  draft.id AS draft_id,
  ...,
  (
    SELECT s->>'body' FROM jsonb_array_elements(draft.sections_json) s
    WHERE s->>'heading' = '__answer_run_v1__'
  )::jsonb AS public_answer
FROM answer_drafts draft
WHERE EXISTS (
  SELECT 1 FROM jsonb_array_elements(draft.sections_json) s
  WHERE s->>'heading' = '__answer_run_v1__'
);
```

After backfill, the sidecar can be removed from `sections_json`.

## Operational notes

- Sidecar JSON size: typical AnswerRun is ~2 - 8 KB. Postgres `jsonb`
  handles this without trouble; even 100k drafts at 8 KB = 800 MB
  which is well under any reasonable warning threshold.
- The sidecar adds one section to every draft's `sections_json`. The
  V1 page filter at `app/answer/[id]/page.tsx` strips it before
  rendering, but admin tools that walk `sections_json` raw should
  also filter (`heading === '__answer_run_v1__'`).
