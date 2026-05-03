# TEBIQ Answer Core V1 — Rollback Runbook

## TL;DR

**Rollback is NOT just `git revert`.** V1 writes a sidecar JSON section
into `answer_drafts.sections_json` with heading `__answer_run_v1__`.
If the codebase is reverted to a pre-V1 page renderer, that pre-V1
page does not know to filter the sidecar, and the user-visible
"sections" list will include a `__answer_run_v1__` row containing the
raw JSON blob.

A clean rollback requires **two steps**:

1. `git revert -m 1 <merge-commit>` and push to `main` (Vercel rebuild).
2. **DB cleanup**: remove `__answer_run_v1__` sections from every
   `answer_drafts.sections_json` row written during the V1 deployment
   window.

Both steps are required. Skipping step 2 will visibly leak JSON to
users on V1-era drafts.

## When to roll back

- Production canary surfaces a P0 (e.g. visible 経営管理 / 常勤職員 /
  資本金 in Q5; literal `unknown` / `null` / `undefined` in any
  user-visible field; a clarification page showing a full action
  template).
- Surface Safety Gate fires unexpectedly on a high-traffic question.
- DB write errors that point at the sidecar storage path.

## Step 1 — Code rollback

```bash
# Identify the V1 merge commit on main.
git log --oneline -20

# Revert the merge — `-m 1` keeps main's first parent (the pre-V1 tip).
git revert -m 1 <V1_MERGE_COMMIT>

# Push to main; Vercel will rebuild and serve the pre-V1 code.
git push origin main
```

After Vercel finishes the rebuild (~1–2 min):

```bash
curl -s https://tebiq.jp/api/build-info | jq .
# Confirm `version` is the pre-V1 string (e.g. "redline-gate-v3" or
# whatever main was on before V1 merged).
```

## Step 2 — DB cleanup

Run the cleanup against the production Postgres. Two equivalent
approaches:

### 2a. SQL one-shot (recommended)

```sql
-- Audit first: how many rows would be touched?
SELECT count(*)
FROM answer_drafts
WHERE EXISTS (
  SELECT 1
  FROM jsonb_array_elements(sections_json) s
  WHERE s->>'heading' = '__answer_run_v1__'
);

-- Cleanup: strip ONLY the synthetic sidecar section. User-facing
-- sections (结论, 下一步, 需要材料, 需要注意的风险因素, etc.) are
-- preserved. Original questionText / title / summary / next_steps_json
-- / related_links_json / sources_json / etc. are NOT touched.
UPDATE answer_drafts
SET sections_json = (
  SELECT COALESCE(jsonb_agg(s), '[]'::jsonb)
  FROM jsonb_array_elements(sections_json) s
  WHERE s->>'heading' <> '__answer_run_v1__'
)
WHERE EXISTS (
  SELECT 1
  FROM jsonb_array_elements(sections_json) s
  WHERE s->>'heading' = '__answer_run_v1__'
);

-- Verify: should return 0.
SELECT count(*)
FROM answer_drafts
WHERE EXISTS (
  SELECT 1
  FROM jsonb_array_elements(sections_json) s
  WHERE s->>'heading' = '__answer_run_v1__'
);
```

What this DOES NOT touch:

- `answer_drafts.id` / `query_id` / `question_text` / `title` /
  `summary` — preserved.
- `answer_drafts.next_steps_json` / `related_links_json` /
  `sources_json` — preserved.
- `query_backlog` rows — preserved.
- `answer_feedback` rows — preserved.
- All non-sidecar elements of `sections_json` — preserved.

### 2b. tsx script (alternative for ops without DB shell access)

Save as `scripts/ops/rollback-v1-sidecar.ts`:

```typescript
import 'dotenv/config'
import { db } from '@/lib/db'
import { answerDrafts } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

async function main() {
  const before = await db.execute(sql`
    SELECT count(*)::int AS n
    FROM answer_drafts
    WHERE EXISTS (
      SELECT 1 FROM jsonb_array_elements(sections_json) s
      WHERE s->>'heading' = '__answer_run_v1__'
    )
  `)
  console.log('rows containing sidecar:', (before as any).rows?.[0]?.n)

  const result = await db.execute(sql`
    UPDATE answer_drafts
    SET sections_json = (
      SELECT COALESCE(jsonb_agg(s), '[]'::jsonb)
      FROM jsonb_array_elements(sections_json) s
      WHERE s->>'heading' <> '__answer_run_v1__'
    )
    WHERE EXISTS (
      SELECT 1 FROM jsonb_array_elements(sections_json) s
      WHERE s->>'heading' = '__answer_run_v1__'
    )
  `)
  console.log('updated rows:', (result as any).rowCount)
}

main().catch(e => { console.error(e); process.exit(1) })
```

Run with:

```bash
DATABASE_URL=<production_url> npx tsx scripts/ops/rollback-v1-sidecar.ts
```

## Why ordering matters

The right order is **code rollback first, then DB cleanup**.

- If you cleanup first while the V1 code is still serving, V1's
  read path falls back to `reconstructLegacyRun` for every cleaned
  row (no sidecar found). This works but loses the V1-projected
  PublicAnswer for those rows — a degraded but safe state. Acceptable
  emergency interim.
- If you revert code first without cleanup, pre-V1 pages render
  the `__answer_run_v1__` JSON section as visible text — **bad UX**.
  Run cleanup ASAP.

If you must roll back fast, prioritise **code revert** (stops new
sidecar writes immediately) and accept the brief window where V1
drafts written between merge and cleanup will display the sidecar
JSON. Then run cleanup within minutes.

## Audit / paper trail

Before running cleanup on production, snapshot the affected rows:

```sql
COPY (
  SELECT id, question_text, sections_json, created_at
  FROM answer_drafts
  WHERE EXISTS (
    SELECT 1 FROM jsonb_array_elements(sections_json) s
    WHERE s->>'heading' = '__answer_run_v1__'
  )
) TO '/tmp/v1_sidecar_rollback_snapshot.csv' WITH CSV HEADER;
```

Keep the snapshot for post-mortem analysis. The AnswerRun JSON inside
the sidecar contains the full V1 routing trace (intent → domain →
source → projection → safety) for every question answered during the
deploy window — useful for understanding what classes of question
hit which engine paths before rollback.

## What this runbook does NOT cover

- **Schema migrations**: V1 adds no schema changes. Nothing to undo.
- **Other tables**: `query_backlog`, `answer_feedback`, etc. are
  unchanged by V1.
- **In-flight requests**: requests that started under V1 code but
  finish under reverted code may have inconsistent shape for ~1
  second during the Vercel hotswap. Vercel's atomic deployment
  minimises this; we do not have a stronger guarantee.
- **Forward roll**: this runbook is rollback only. Forward roll
  (re-merge + redeploy) is just `git revert <revert-commit>` + push,
  but cleanup will need to be re-run in reverse to restore sidecars
  IF the team decides to keep the historical AnswerRun trace; in
  practice forward roll without sidecar restore is fine because
  all subsequent answers will have fresh sidecars.

## Validation after rollback

1. `curl /api/build-info` — `version` is pre-V1.
2. SQL audit query returns 0 rows containing `__answer_run_v1__`.
3. Open three sample `/answer/{id}` pages from the deploy window —
   confirm no JSON blob visible in the rendered sections.
4. POST a new question to `/api/questions` — confirm response no
   longer contains `view_model` field; legacy fields render normally.
