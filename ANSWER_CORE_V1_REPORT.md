# TEBIQ Answer Core V1 — Architectural Rebuild Report

## Branch / build

- Branch: `claude/answer-core-v1`
- Base: `origin/main` at `98bbb3c` (post-v0.1 rollback baseline; no
  LLM code, no projector)
- `/api/build-info` version → `answer-core-v1`
- 是否 merge：**否**
- 是否 deploy：**否**

## Architectural summary — old vs new data flow

### Old (legacy redline-gate-v3, current main)

```
question → match-answer.buildAnswer(question)
         → AnswerResult { title, summary, sections, action_answer, ... }
         → createAnswerDraft(...)               (DB write, fields are user-visible)
         → /answer/{id} reads draft.title / draft.summary directly
```

The legacy flow has no separation between "raw seed match" and
"user-visible answer". `match-answer.ts` decides BOTH the routing and
the rendered text. When the seed matcher swallowed a question into an
unrelated seed (e.g. 配偶离婚→定住 → 経営管理 常勤職員 seed), the
wrong content surfaced directly to the user. This was the Q5
production P0.

### New (Answer Core V1)

```
question
  → classifyAnswerIntent  (existing)
  → buildDetectedIntent   (V1 — strips literal "unknown")
  → detectDomain          (V1 — 5-domain scope detector)
  → tryRuleBasedSource    (V1 — deterministic safe rules e.g. Q5)
       fallback ↓
  → provideLegacySeedSource (V1 — wraps match-answer.ts as AnswerSource)
  → projectLegacyToPublicAnswer (V1 — single function, AnswerSource → PublicAnswer)
  → judgePublicAnswerSurface (V1 — Surface Safety Gate)
       if !passed ↓
  → buildSafeClarificationReplacement (V1 — swap in safe version)
  → AnswerRun (persistence record)
       → toViewModel → AnswerViewModel  (page consumes only this)
       → projectRunToLegacyShape         (back-compat for legacy API consumers)
       → answerRunAsSidecarSection      (JSON sidecar in sections_json)
```

Five contracts the new flow enforces:

1. **AnswerSource is internal.** Its `legacy_*` fields never reach a
   page. Only the projector reads them.
2. **PublicAnswer is the single source of truth.** Every user-visible
   string lives in `PublicAnswer`. The view never reads anywhere else.
3. **Surface Safety judges what's about to render**, not the source.
   It can replace the PublicAnswer with a safe clarification if a rule
   trips.
4. **Status drives shape**: clarification_needed and out_of_scope
   have empty action template fields by construction.
5. **Persistence is the page's only side-effect**. Reads always go
   through `extractAnswerRun → toViewModel`.

### How old & new coexist

- Existing `answer_drafts` rows that pre-date V1 have no sidecar. The
  page calls `reconstructLegacyRun(...)` to wrap them in a minimal
  AnswerRun so they still render with the V1 view model. The disclaimer
  reads "这是 V1 之前的旧整理，仅供参考。"
- New rows always get the sidecar. The legacy `title` / `summary` /
  `action_answer` columns on `answer_drafts` ARE still written, but
  every value is **derived from PublicAnswer** (not from the seed).
  External API consumers reading top-level `title` keep working.
- `legacy: AnswerResult` is exported from `submit-question` as a
  back-compat object — same shape, V1 content.

## Files changed

### New (`lib/answer/core/`)

| File | Purpose |
|---|---|
| `types.ts` | All V1 types: `DetectedIntent`, `SupportedDomain`, `AnswerSource`, `PublicAnswer`, `SafetyResult`, `AnswerRun`, `AnswerViewModel` |
| `domain.ts` | `detectDomain()` (5-domain scope detector) + `buildDetectedIntent()` (strips literal `unknown`) |
| `legacy-seed-provider.ts` | `provideLegacySeedSource()` — calls `buildAnswer` and converts to `AnswerSource`. Distinguishes generic clarify from rule-based content. |
| `rule-based-provider.ts` | `tryRuleBasedSource()` — pre-projection deterministic rules (currently: 配偶离婚→定住者) |
| `projector.ts` | `projectLegacyToPublicAnswer()` (per-status) + `buildSafeClarificationReplacement()` |
| `surface-safety.ts` | `collectVisibleText()` + `judgePublicAnswerSurface()` (universal redlines + Q5 + 厚生年金 + mode contracts) |
| `view-model.ts` | `toViewModel()` — AnswerRun → page-friendly shape |
| `persistence.ts` | `answerRunAsSidecarSection()` / `extractAnswerRun()` / `reconstructLegacyRun()` |
| `intake.ts` | `runAnswerIntake()` — orchestrator (intent → domain → source → project → safety → run) |

### Modified

| File | What |
|---|---|
| `lib/answer/submit-question.ts` | Returns `{ viewModel, run, legacy }`; legacy is projected from PublicAnswer not from seed; sidecar persisted |
| `lib/answer/match-answer.ts` | `isFamilyWorkPermissionIntent` no longer fires for 家族滞在→工作签 (target=work-visa short-circuit; 工作 dropped from work-context regex) |
| `app/api/questions/route.ts` | Returns `view_model` at top level + observability (`engine_version`, `status`, `domain`, `safety_passed`, `fallback_reason`) |
| `app/answer/[id]/page.tsx` | Loads draft, extracts AnswerRun via sidecar (or reconstructs for legacy rows), passes ViewModel only |
| `app/answer/[id]/AnswerResultView.tsx` | Rewritten to consume `AnswerViewModel` only — type-system enforces no legacy field access |
| `app/api/build-info/route.ts` | version → `answer-core-v1` |

### New (tests / docs)

| File | Purpose |
|---|---|
| `scripts/test/test-answer-core-v1.ts` | 10-case QA harness asserting on `PublicAnswer.visible_text` |
| `docs/qa/ANSWER_CORE_V1_LOCAL_SMOKE.md` | Captured smoke output + spot checks |
| `docs/qa/ANSWER_CORE_V1_MIGRATION.md` | DB migration plan (no migration in this PR) |
| `ANSWER_CORE_V1_REPORT.md` | This report |

## DB migration

**No migration in this PR.** AnswerRun JSON is sidecar-persisted in
`answer_drafts.sections_json` with synthetic heading
`__answer_run_v1__`. Read paths strip it before rendering. See
[docs/qa/ANSWER_CORE_V1_MIGRATION.md](docs/qa/ANSWER_CORE_V1_MIGRATION.md)
for the eventual real-table migration plan and backfill strategy.

## Test results

`ANSWER_INTENT_DISABLE_AI=1 LLM_INTENT_DISABLE_AI=1 npx tsx scripts/test/test-answer-core-v1.ts`

| Case | Question | status | safety |
|---|---|---|---|
| Q1 | 配偶签离婚后想转定住 | preliminary | pass |
| Q2 | 厚生年金截止日期是什么时候？ | out_of_scope | pass |
| Q3 | 家族滞在想转工作签 | answered | pass |
| Q4 | 我是经管签，想转人文签 | answered | pass |
| Q5 | 人文签转经管签怎么办 | clarification_needed | pass |
| Q6 | 经管续签材料有哪些 | preliminary | pass |
| Q7 | 代表取締役换人要通知入管吗 | clarification_needed | pass |
| Q8 | 入管让补材料，期限赶不上怎么办 | out_of_scope | pass |
| Q9 | 不许可通知书怎么办 | out_of_scope | pass |
| Q10 | 永住申请年金没交怎么办 | clarification_needed | pass |

**Result: 10/10 PASS, P0 = 0.**

Build pass + typecheck pass.

Full output + spot-check renders in
[docs/qa/ANSWER_CORE_V1_LOCAL_SMOKE.md](docs/qa/ANSWER_CORE_V1_LOCAL_SMOKE.md).

## 红线复核

| Spec redline | V1 status | Where enforced |
|---|---|---|
| 配偶/离婚/定住 不得 经営管理 / 常勤職員 / 資本金 / 事業計画 | ✅ pass | rule_based provider preempts; safety gate Q5_NO_KEIEI / NO_JOKIN / NO_SHIHONKIN / NO_JIGYOUKEIKAKU as defense |
| 厚生年金 不得 签证转换 | ✅ pass | projector returns out_of_scope w/ topic-specific 4-sub-question; safety gate KOSEINEN_NO_VISA_TRANSFER |
| 用户可见 不得 unknown / null / undefined | ✅ pass | `meaningfulStatus()` at intent layer + `scrub()` in projector + safety gate NO_UNKNOWN/UNDEFINED/NULL |
| clarification_needed 不得 完整办理模板 | ✅ pass | projector emits empty docs_needed/risk_warnings; safety gate CLARIFY_NO_DOCS_TEMPLATE / CLARIFY_NO_RISK_TEMPLATE |
| out_of_scope 不得 硬答办理步骤 | ✅ pass | projector emits empty action fields; safety gate OOS_NO_DOCS_TEMPLATE / OOS_NO_RISK_TEMPLATE |

## 仍存在风险

1. **No real DB column.** Sidecar JSON works, but admin tools that
   read `sections_json` raw will see the synthetic `__answer_run_v1__`
   row. Mitigated by: page filter, sidecar heading is unique.
2. **Legacy draft reads (pre-V1 rows)** use `reconstructLegacyRun`
   which produces an AnswerRun with `domain: 'unknown'` and the
   legacy title/summary as PublicAnswer fields. Surface safety still
   runs but doesn't have the V1 source-level safety. Risk is bounded
   because reconstruction marks `disclaimer` as "V1 之前的旧整理".
3. **No LLM yet.** V1 is rule + seed only. The architecture is
   deliberately set up to plug in an `LlmAnswerProvider` as a third
   AnswerSource (returned before legacy seed lookup). When that lands,
   the projector + safety gate will validate its output the same way.
4. **Q3 (家族滞在→工作签) fix** is a `match-answer.ts` patch (port of
   v0.1 fix). If a future legacy pattern gets added that mis-fires
   for the same query, V1 falls back on the legacy text but the
   safety gate currently has no rule for "family→work seed should not
   say 28 hours" — only Q5 and 厚生年金 have safety-level rules.
   Adding similar rules is straightforward and is the recommended
   pattern when a new redline is found.
5. **Smoke is local-only.** No live LLM, no DB round-trip, no
   browser render. Production canary still needs to run the 10
   founder questions to validate the read-back path.

## 是否可进入 QA / canary

- ✅ Static QA (file review, type-check, build, smoke 10/10): **pass**
- ✅ Surface invariants asserted at the data layer (no rendering needed)
- ✅ No DB migration to run
- ✅ Safe rollback path: revert merge, no schema change to undo

**Recommendation: ready for QA static review and Vercel preview check.
Do not deploy directly. Production canary should re-run the 10 founder
questions and verify:**

1. `/api/build-info` returns `version: 'answer-core-v1'`
2. Each `/api/questions` POST response carries `view_model` at top level
3. Q1 (配偶离婚→定住): no 経営管理 / 常勤職員 / 資本金 / 事業計画 in any response field
4. Q2 (厚生年金截止日期): `status: 'out_of_scope'` with 4 sub-question clarification
5. No literal `unknown` in any field
6. `/answer/{id}` page renders the V1 view (status pill, no legacy
   leak)

If canary surfaces a new P0, rollback is a single `git revert` on
the merge commit (no schema undo).

## Not in this PR

- ❌ App / Pro / Partner / payment
- ❌ New seeds (only the existing legacy seeds are wrapped; no new content)
- ❌ LLM (architecture leaves a clear plug-in point; not implemented)
- ❌ DB migration (sidecar persistence; migration plan documented for later)
- ❌ Whole-site rewrite (only Answer Core, Question API, Answer page,
  data model, QA harness changed)
- ❌ Merge / deploy
