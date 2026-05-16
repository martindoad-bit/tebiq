# TEBIQ 0.8.5 Card Import Engineering Review

Date: 2026-05-16
Role: Hilbert / ENGINE
Scope: ENGINE Batch A - make card import more observable and stable with small engineering changes.

This review is based on current code inspection plus the read-only audit:

```bash
npx tsx scripts/qa/card-import-audit.ts
```

Current audit baseline:

- filesystem fact cards: 101 total; 94 `ai_verified`, 5 `human_reviewed`, 2 `ai_extracted`
- risk mix: 54 high, 6 critical, 28 medium, 13 low
- Materials topics: 13
- Materials `factCardIds` references: 21
- missing Materials fact-card references: 0
- DB comparison: skipped locally because `DATABASE_URL` was not set
- route-gate source ids: 53 ids; current audit resolves only 1 as fact card and 2 as Knowledge Atlas files, leaving 50 unresolved by the script's current lookup rules

## 1. Production Answer Fact Card Chain

### What Is Complete

The core production chain exists and is reasonably coherent:

- Source of truth:
  - `docs/fact-cards/*.md`
- Sync:
  - `scripts/fact-layer-sync.ts`
  - `package.json` scripts: `fact-layer:sync`, `fact-layer:sync:dry`
- DB schema:
  - `lib/db/schema.ts` `factCards`
  - `lib/db/migrations/0025_fact_cards.sql`
  - `lib/db/migrations/0026_consultation_fact_cards.sql`
  - `lib/db/migrations/0030_fact_card_evidence.sql`
- Matcher:
  - `lib/answer/fact-layer/matcher.ts`
  - production states: `ai_verified`, `human_reviewed`, `needs_review`
  - dry-run also includes `ai_extracted`
  - decisions: `inject`, `hint_only`, `drop`
- Initial consultation stream:
  - `app/api/consultation/stream/route.ts`
  - gated by `process.env.FACT_LAYER_ENABLED === 'true'`
  - calls `matchFactCards(question)`
  - emits `fact_cards_injected`
  - appends injected fact blocks as system context
  - persists `factCardIds` and `factCardAudit` on completion, timeout, failure, and guardrail-partial branches
- Follow-up stream:
  - `app/api/consultation/follow-up/route.ts`
  - calls `matchFactCards(matcherInput)`
  - matcher input includes summary/root context plus latest user addition
  - emits `fact_cards_injected`
  - persists per-row audit and unions `factCardIds` across the chain
- Eval Lab production path:
  - `app/api/internal/eval-lab/tebiq-answer/route.ts`
  - calls production `/api/consultation/stream`, so fact-card behavior is the real user-facing path
  - separately records `route_gate_ids`, `guardrail_findings`, and `fact_card_audit`
- Internal dry-run:
  - `app/api/internal/fact-layer/dry-run/route.ts`
  - direct matcher preview, no LLM, no DB write
- Answer/reference UI bridge:
  - `components/ui/fact-reference.tsx`
  - `components/ui/quick-reference-bridge.tsx`
  - `/c/[id]` reads persisted `fact_card_audit`

### Current Observability Gaps

1. Matcher failure is fail-soft but not distinguishable from zero matches.
   - In both stream routes, matcher errors log server-side and return `[]`.
   - When `FACT_LAYER_ENABLED=true`, the SSE event still emits an empty `items` array.
   - Eval/UI cannot tell "checked and no match" from "matcher failed and suppressed".

2. Prompt-budget drops are invisible.
   - `MAX_INJECTED = 2`.
   - Extra injectable matches beyond the cap are silently skipped and do not enter `fact_card_audit`.
   - This makes incident review harder when a relevant card matched but was budget-dropped.

3. Audit lacks match diagnostics.
   - `FactCardMatch` has `matched_keywords` and `score`, but `ConsultationFactCardAuditEntry` does not persist them.
   - Eval Lab reviewers cannot see why a card fired or why a more relevant card lost sort order.

4. Audit does not carry a reason for non-injection.
   - `decision='hint_only'` exists, and `needs_review_flags` exists.
   - But there is no explicit `decision_reason` such as `state_needs_review`, `critical_not_controlled_alpha`, `budget_cap`, `matcher_error`, or `no_injection_block`.

5. Sync drift is not one-command visible.
   - `scripts/fact-layer-sync.ts --dry-run` validates filesystem shape.
   - `scripts/qa/card-import-audit.ts` inventories filesystem/DB/materials/route gates.
   - But the package scripts do not expose `card-import-audit`, and current DB audit only compares presence/state/risk/hash from DB after connection; it should also compute filesystem hashes and flag stale DB rows clearly.

6. Route-gate source coverage audit is under-resolving.
   - Current `card-import-audit.ts` checks `sourceAssetIds` against fact-card ids and top-level Knowledge Atlas files.
   - It reports 50 unresolved ids, but many ids intentionally refer to guardrail source assets rather than fact cards.
   - This is useful as a warning, but not yet a reliable failure gate.

### Low-Risk Reinforcement Points

Recommended small changes:

1. Add optional audit fields, append-only:
   - `matched_keywords?: string[]`
   - `score?: number`
   - `decision_reason?: string`
   - `prompt_budget_rank?: number`
   - `injectable_block_present?: boolean`

2. Preserve budget-dropped matches in audit:
   - Keep prompt injection capped at 2.
   - Still include extra matched cards in `fact_card_audit` with `decision='drop'` and `decision_reason='budget_cap'`.
   - This is high observability value with low user-facing risk.

3. Distinguish matcher error from no match:
   - Add a non-user-facing audit/status marker, preferably in the `fact_cards_injected` event payload, e.g. `status: 'checked' | 'matcher_error' | 'disabled'`.
   - If avoiding event shape changes, persist a synthetic audit row only internally is possible, but event status is cleaner.

4. Promote `card-import-audit` into a first-class QA command:
   - Add a package script later when `package.json` is not already being edited by another worker.
   - Suggested script: `qa:card-import-audit`.

5. Extend `card-import-audit.ts`:
   - compute filesystem content hash with the same rule as sync
   - compare DB `content_hash` when `DATABASE_URL` exists
   - report `missingInDb`, `extraInDb`, `hashMismatch`, `stateMismatch`, `riskMismatch`
   - split route-gate source resolution into `fact_card`, `knowledge_atlas`, `known_external_guardrail_id`, `unresolved`

## 2. Materials Tab And Fact Cards

### Current State

Materials Tab is currently static, not DB-driven:

- Page:
  - `app/quick-reference/page.tsx`
- List UI:
  - `app/quick-reference/QuickReferenceList.tsx`
- Data:
  - `lib/quick-reference/topics.ts`
- Tests:
  - `lib/quick-reference/topics.test.ts`

The useful bridge already exists:

- `QuickReferenceTopic.factCardIds`
- `getQuickReferenceTopicsForFactCards(factCardIds)`
- `components/ui/quick-reference-bridge.tsx`

Current audit says the static Materials topics have 21 fact-card references and none are missing from filesystem cards.

### Gap

The bridge is answer-to-topic only:

- Answer fact card -> Materials topic works.
- Materials topic -> underlying fact card provenance is static/manual.
- Common material pages are not yet a shared data primitive.
- Existing older material data lives elsewhere:
  - `lib/check/materials.ts`
  - `lib/knowledge/materials.ts`
  - `app/check/result/components/MaterialChecklist.tsx`

This means Materials can become inconsistent with fact cards unless we add a small data-level contract.

### Minimal Productization Step

Do not make Materials DB-driven yet.

Add a data-only registry and keep the UI mostly unchanged:

1. Add `commonMaterialIds?: string[]` to `QuickReferenceTopic`.
2. Add a small static registry, e.g. `lib/quick-reference/common-materials.ts`, with:
   - `id`
   - `title`
   - `nameJa`
   - `summary`
   - `whereToGet`
   - `typicalUse`
   - `sourceUrls`
   - `factCardIds`
3. Add helper functions:
   - `getQuickReferenceTopicsForMaterial(materialId)`
   - `getCommonMaterialsForFactCards(factCardIds)`
   - `getFactCardsForCommonMaterial(materialId)`
4. Add test coverage only:
   - every `commonMaterialIds` reference resolves
   - every common material with `factCardIds` resolves to existing fact cards
   - every Materials topic still has at least one `factCardIds` or one `commonMaterialIds`

Optional follow-up, not Batch A:

- add `/quick-reference/materials/[id]` pages
- add per-topic "common materials" sections
- merge old `lib/check/materials.ts` into the new registry

## 3. Eval Lab / Middle-Office Display Model

### What Data Already Exists

For generated TEBIQ answers:

- `app/api/internal/eval-lab/tebiq-answer/route.ts` response includes:
  - `fact_card_ids`
  - `route_gate_ids`
  - `guardrail_findings`
  - `fact_card_audit`
- persisted `eval_answers.raw_payload_json` includes:
  - `fact_card_audit`
  - `route_gate_ids`
  - `guardrail_findings`
  - event counts

For imported live consultations:

- `lib/db/queries/eval-lab.ts` imports:
  - `fact_card_ids`
  - `fact_card_audit`
  - source consultation id
  - prompt/model/status
- it does not currently recompute or store route gates / validator findings for imported live rows.

Manual annotation already exists:

- `app/internal/eval-lab/EvalLabClient.tsx`
- `app/api/internal/eval-lab/annotation/route.ts`
- action includes `fact_card_candidate`
- annotation JSON can carry extra structured fields without schema change.

### Minimal Eval Lab Display

Do not redesign the Eval Lab.

Add a compact diagnostics block inside `AnswerColumn` when `showMeta` and `row.raw_payload_json` exist:

- Fact cards:
  - id/title
  - decision
  - reason if present
  - state/risk/confidence
  - matched keyword count if present
- Route gates:
  - `route_gate_ids`
- Validator findings:
  - severity + id
  - optionally one-line message
- Review/annotation:
  - existing `severity`
  - existing `action`
  - existing `repair_owner`
  - reviewer note

This can be done by adding a local `AnswerDiagnostics` helper component in `app/internal/eval-lab/EvalLabClient.tsx`. It should read existing raw payload fields first, so no DB migration is needed.

### Minimal Data Enrichment

1. For `tebiq-answer` generated rows, keep current fields and add optional audit fields from the stream.
2. For `importLiveConsultationsToEvalLab`, either:
   - recompute `route_gate_ids` and `guardrail_findings` at import time from saved question/answer, or
   - mark them explicitly as absent: `diagnostics_source: 'live_import_no_recompute'`.

I recommend recomputing at import time because it is deterministic, cheap, and makes live review comparable to generated eval rows.

## 4. Recommended Batch A File Plan

### Highest Priority

1. `lib/consultation/stream-protocol.ts`
   - append optional fields to `ConsultationFactCardAuditEntry`
   - optionally add status field to `fact_cards_injected`

2. `lib/answer/fact-layer/matcher.ts`
   - preserve budget-dropped matches as audit-visible `drop`
   - expose decision reason from gate/cap
   - keep actual injected block cap unchanged

3. `app/api/consultation/stream/route.ts`
   - include match diagnostics in `factCardAudit`
   - distinguish matcher error from zero match

4. `app/api/consultation/follow-up/route.ts`
   - mirror stream route diagnostics exactly
   - preserve parent union semantics

5. `scripts/qa/card-import-audit.ts`
   - compute filesystem hash
   - compare DB hash/state/risk when DB is available
   - make route-gate source resolution categories explicit

6. `app/internal/eval-lab/EvalLabClient.tsx`
   - add compact diagnostics rendering from `raw_payload_json`
   - no large UI redesign

### Materials Data Follow-Up

7. `lib/quick-reference/topics.ts`
   - add `commonMaterialIds?: string[]`
   - keep existing `factCardIds`

8. New file: `lib/quick-reference/common-materials.ts`
   - static registry only
   - no DB

9. `lib/quick-reference/topics.test.ts`
   - add referential integrity tests for `commonMaterialIds` and common material `factCardIds`

### Package Script, Only If Package Is Otherwise Safe

10. `package.json`
   - add `qa:card-import-audit`
   - do not touch while another worker has active package edits unless coordinated

## 5. Files Not To Touch In Batch A

Do not change these unless the owner explicitly asks:

- `docs/fact-cards/*.md`
  - FACT owns card content and source truth.
- `docs/knowledge-atlas/**`
  - DOMAIN/FACT source asset work; route-gate source id cleanup needs domain ownership.
- `lib/consultation/route-gates.ts`
  - Route gate logic is high-safety surface; Batch A should observe it, not rewrite it.
- `lib/consultation/guardrail-validator.ts`
  - Validator behavior is safety-critical; display findings first before changing rules.
- `lib/db/schema.ts` and migrations
  - Not needed for Batch A if we use optional JSON fields and existing `raw_payload_json`.
- `app/quick-reference/QuickReferenceList.tsx`
  - Avoid Materials UI redesign in this batch.
- `app/ai-consultation/AiConsultationEntryClient.tsx`
  - User-facing answer UI is already being touched in the current dirty worktree; Batch A should avoid broad UI changes.
- `app/c/[id]/page.tsx`
  - Current answer detail already renders fact references and QuickReferenceBridge; leave stable unless adding purely defensive parsing for new optional audit fields.

## 6. Smallest Safe Batch A

If this has to be one narrow Codex pass, do only:

1. Add optional diagnostic fields to fact-card audit types.
2. Add those fields in stream and follow-up audit payloads.
3. Preserve over-cap matches as `decision='drop'`, `decision_reason='budget_cap'`.
4. Extend `card-import-audit.ts` DB/filesystem drift checks.
5. Add Eval Lab compact diagnostics from `raw_payload_json`.

This gives the product team visibility into card import health without changing the user-facing Materials or consultation UI in a meaningful way.

## 7. Program 1 RC Provider Run Script Hardening

Date: 2026-05-16
Scope: 0.8.5 RC 50-60 provider-backed Eval Lab run stability.

Implemented small ENGINE-only script hardening:

- `scripts/eval/fill-eval-lab-missing.ts`
  - requires an explicit run scope for non-dry-run generation:
    - `--starter-prefix=...`, or
    - `--limit=...`, or
    - intentional `--allow-all`
  - keeps `--dry-run` and `--summary-only` safe for read/plan mode.
  - adds `--failed-only` for targeted failed-sample reruns.
  - writes structured summary with `--summary-json=...` or `--output-summary=...`.
  - summary includes target scope, before/after completion stats, task breakdown, and first 50 planned task samples.
  - preserves existing scoped `--starter-prefix`, `--limit`, `--tebiq-only`, `--deepseek-only`, force, reviewer, base-url, and admin-key behavior.

- `scripts/eval/check-card-import-first24-route-gates.ts`
  - kept as the shared 0.8.5 route-gate expectation checker.
  - added `--label=...`, `--starter-prefix=...`, and `--limit=...`.
  - no separate RC60 script is needed if the RC60 pack uses the same `metadata_json.expected_route_gate` shape.

Recommended RC60 commands:

```bash
# plan only, scoped to the RC60 starter prefix
npx tsx --env-file=.env.local scripts/eval/fill-eval-lab-missing.ts \
  --dry-run \
  --base-url=http://127.0.0.1:3000 \
  --starter-prefix=0.8.5-card-import-rc60- \
  --tebiq-only \
  --limit=60 \
  --output-summary=docs/eval/TEBIQ_0_8_5_RC60_FILL_DRY_RUN_SUMMARY.json

# execute scoped run; deliberately single-concurrency for provider-backed RC stability
npx tsx --env-file=.env.local scripts/eval/fill-eval-lab-missing.ts \
  --base-url=http://127.0.0.1:3000 \
  --starter-prefix=0.8.5-card-import-rc60- \
  --tebiq-only \
  --limit=60 \
  --concurrency=1 \
  --output-summary=docs/eval/TEBIQ_0_8_5_RC60_FILL_SUMMARY.json

# rerun only rows previously recorded as failed/fallback/error inside the same scope
npx tsx --env-file=.env.local scripts/eval/fill-eval-lab-missing.ts \
  --base-url=http://127.0.0.1:3000 \
  --starter-prefix=0.8.5-card-import-rc60- \
  --tebiq-only \
  --limit=60 \
  --failed-only \
  --concurrency=1 \
  --output-summary=docs/eval/TEBIQ_0_8_5_RC60_FILL_FAILED_ONLY_SUMMARY.json

# route-gate expectations for an RC60 pack with the same expected_route_gate metadata
npx tsx scripts/eval/check-card-import-first24-route-gates.ts \
  --input=docs/eval/TEBIQ_0_8_5_CARD_IMPORT_RC60.json \
  --label=0.8.5-rc60 \
  --limit=60
```

Validation run in this pass:

```bash
npm run eval:0.8.5:routes -- --label=first24-smoke --limit=3
npx tsx scripts/eval/fill-eval-lab-missing.ts --base-url=http://127.0.0.1:9 --tebiq-only
npx tsc --noEmit --pretty false
npm test
```

Observed validation results:

- route-gate smoke passed: `1/1 expected_cases`, `selected_items=3`.
- unscoped non-dry-run fill command failed before network access with the expected refusal message.
- TypeScript check passed.
- `npm test` passed: 201/201.

Remaining debt:

- The RC60 question pack name/prefix is not standardized in code. The commands above assume `0.8.5-card-import-rc60-`; adjust to the actual imported starter prefix.
- `run-real-user-regression.ts` is still branded around 0.8 real-user regression. It can execute provider-backed runs safely, but a future generic runner should parameterize source/run labels before it becomes the canonical RC importer.
- `fill-eval-lab-missing.ts --limit` without `--starter-prefix` is allowed because it prevents full-DB execution, but operator docs should prefer prefix+limit for RC runs.
