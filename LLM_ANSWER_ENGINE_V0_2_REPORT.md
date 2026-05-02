# LLM Answer Engine v0.2 — Envelope-first Surface Rewrite

## Branch / build

- Branch: `claude/llm-answer-v0-2-envelope-first`
- Base: `origin/main` (currently `98bbb3c`, the v0.1 rollback HEAD)
- Layer 1: `git revert 98bbb3c` — restores v0.1 code (revert-of-revert).
- Layer 2: this PR's substantive changes on top of v0.1.
- `/api/build-info` version → `llm-answer-engine-v0-2-envelope-first`.
- 是否 merge：**否**。
- 是否 deploy：**否**。

## Why v0.2

v0.1 production canary surfaced this exact problem:
- The deterministic safe envelope for Q5 was correct.
- But the API response top-level (`title`, `action_answer.conclusion`)
  still came from `{ ...legacyAnswer, llm_envelope: envelope }`.
- The frontend / API consumer rendered the legacy fields, so the user
  still saw `経営・管理 常勤職員 1 名以上 何时必须到位？` as the page
  heading and `常勤職員 必须在「申請日时点」...` as the conclusion.

In other words, the envelope was clean but the public answer surface
was contaminated by legacy passthrough. The same shape of bug (different
P0 instance) was visible in QA's earlier screenshot showing
"从「unknown」转为「unknown」" for clarification cases.

## What changed

### 必修 1 — Envelope-first projector

**New module: [lib/answer/envelope-projector.ts](lib/answer/envelope-projector.ts)**

`projectEnvelopeToPublicAnswer({ envelope, legacyAnswer, intent, questionText })` produces every user-visible field of `AnswerResult` from the envelope:

- `title`, `summary`, `intent_summary`
- `action_answer.conclusion / what_to_do / how_to_do / where_to_go / documents_needed / deadline_or_timing / consequences / expert_handoff / boundary_note`
- `next_steps`
- `sections`
- `sources` (from envelope.source_notes), `related_links` (always empty)

`legacyAnswer` is consulted only for non-user-visible passthrough
fields: `matched_card_id`, `matched_seed_id`, `intent`, `query_id`,
`answer_id`, `saved`. Nothing else flows from legacy to surface.

**[lib/answer/submit-question.ts](lib/answer/submit-question.ts)** is updated to call the projector instead of `{ ...legacyAnswer, llm_envelope: envelope }`. The old merge pattern is gone; if anyone re-introduces it, it will not bring legacy text back into the user surface.

### 必修 2 — Per-mode rendering rules

Each `answer_mode` produces a different shape from the projector:

| Mode | title | sections | action_answer template fields |
|---|---|---|---|
| `direct_answer` | first sentence of `envelope.short_answer`, prefixed with `关于{domain}：` if it doesn't already mention the domain | conclusion / next steps / materials / deadline / where / risks / experts | populated from envelope |
| `answer_with_assumptions` | `初步整理：{first sentence of short_answer}` | assumptions / 初步答案 / 下一步 / 还需要确认 | populated, but next_actions slice limited to 4 |
| `clarification_needed` | `关于{domain}：先确认几件事，TEBIQ 再给具体方向` | only "需要先确认" | **all empty** so renderer hides 最紧的两件 / 步骤 / 期限 / 不做会怎样 / 专家 |
| `out_of_scope` | `这个问题暂时不在 TEBIQ v0 支持范围内` | "当前支持范围" + "请补充" | **all empty** |

The frontend dispatch logic in `AnswerResultView` was already correct from v0; v0.2 makes the data feeding into it correct.

### 必修 3 — Scrub literal `unknown` / `null` / `undefined`

Two layers:

1. `lib/answer/intent-router.ts:buildUnderstoodAs` no longer emits
   `从「unknown」转为「unknown」`. Helper `meaningfulStatus()` rejects
   the literals `unknown`, `null`, `undefined`, `未知`, `未定义`, `n/a`.
   When current/target status is missing, the function falls back to
   natural language ("我还不能确定你的当前身份和目标手续。" /
   "你目前持有「{X}」，TEBIQ 需要你先告知具体想办的手续。").
2. `lib/answer/envelope-projector.ts:scrubUnknown()` is applied to
   every string the projector pulls from the envelope before it lands
   in the public answer. Even if the LLM emits `unknown`, the user
   never sees it.

### 必修 4 — 厚生年金 case

[lib/answer/llm-answer-fallback.ts:outOfScopeEnvelope](lib/answer/llm-answer-fallback.ts) gained a topic detector (`detectAmbiguousTopic`). When a question matches `(厚生年金|国民年金|健康保険|健保|国保|社保) + (截止日期|期限|何时|什么时候|多久) - visa-context`, the envelope's `short_answer` and `key_missing_info` switch to a 厚生年金-specific 4-sub-type clarification:

1. 公司加入厚生年金手续期限
2. 每月保险料缴纳期限
3. 离职 / 退保后切换国民年金期限
4. 永住申请用的年金缴纳记录期限

Plus: 公司角度 vs 个人角度? + 在留资格?

Mode stays `out_of_scope` (it is — no specific visa supplied). Action
template fields stay empty.

### 必修 5 — Q5 redline (still binding)

`mustNotContain` for Q5 in the smoke test:

- `経営管理|经营管理|経営・管理`
- `常勤職員`
- `役員報酬|代表取締役`
- `資本金`
- `事業計画|会社設立|事業所要件`
- `(转职|転職).*(14|十四)`
- `所属機関に関する届出`

All checks run against the **flattened user-visible surface**, not
against the envelope alone. **Pass.**

### 必修 6 — API top-level and page consistency

Response shape (unchanged from v0.1):

```
{
  ok, answer_type, answer_level, review_status,
  title,                        ← from projector
  action_answer,                ← from projector
  related_links, sources,
  query_id, answer_id, saved,
  intent, intent_summary,       ← intent_summary from projector
  preferred_template,
  llm_envelope,                 ← raw envelope still exposed
  engine_version,
  answer_mode,
  llm_attempted,
  fallback_reason,
  fallback_from,
}
```

Because `answer.title` / `answer.action_answer` / `answer.intent_summary` are now produced by the projector from the envelope, **the page renders the same data the API exposes at top-level, derived from the same source**. No more "envelope correct but title wrong" gap.

### 必修 7 — Smoke test asserts on user-visible text

Smoke now flattens the projected `AnswerResult` (title + summary + intent_summary + next_steps + sections + every action_answer field + envelope.copy_text) into one haystack and runs `mustContain` / `mustNotContain` regexes against that. New universal redlines applied to ALL 15 cases:

- No literal `unknown` (case-insensitive)
- No literal `undefined`
- No literal `null`
- For `clarification_needed` and `out_of_scope`: `action_answer` template fields must all be empty arrays.

15 cases (per spec): 11 P0 + 4 P1.

### 必修 8 — version bump

`/api/build-info` version → `llm-answer-engine-v0-2-envelope-first`.

## Files changed (vs v0.1)

| File | Type | What |
|---|---|---|
| `lib/answer/envelope-projector.ts` | **NEW** | The projector. ~270 lines. |
| `lib/answer/submit-question.ts` | modified | Replace `{...legacyAnswer, llm_envelope}` with `projectEnvelopeToPublicAnswer(...)` |
| `lib/answer/intent-router.ts` | modified | `buildUnderstoodAs` rejects literal unknown/null/undefined; falls back to natural language |
| `lib/answer/llm-answer-fallback.ts` | modified | `outOfScopeEnvelope` topic-detects 厚生年金-style ambiguous deadline questions |
| `app/api/build-info/route.ts` | modified | version bump |
| `scripts/test/test-llm-answer-engine.ts` | rewritten | Asserts on user-visible surface; 15 cases; universal `unknown` ban |
| `docs/qa/LLM_ANSWER_V0_2_LOCAL_SMOKE.md` | NEW | raw smoke output |
| `LLM_ANSWER_ENGINE_V0_2_REPORT.md` | NEW | this report |

## 15-case smoke result

| ID | Question | mode | engine | result |
|---|---|---|---|---|
| 1 | 配偶签离婚后想转定住 | answer_with_assumptions | safe-fallback-v0-1 | PASS |
| 2 | **厚生年金截止日期是什么时候？** | **out_of_scope** | **out-of-scope-v0** | **PASS** |
| 3 | 我是经管签，想转人文签 | direct_answer | legacy-fallback | PASS |
| 4 | 我想从人文签转为经管签怎么办 | clarification_needed | legacy-fallback | PASS |
| 5 | 家族滞在想转工作签 | direct_answer | legacy-fallback | PASS |
| 6 | 家族滞在配偶可以打工吗 | answer_with_assumptions | legacy-fallback | PASS |
| 7 | 经管续签材料有哪些 | answer_with_assumptions | legacy-fallback | PASS |
| 8 | 永住申请年金没交怎么办 | clarification_needed | legacy-fallback | PASS |
| 9 | 入管让补材料，期限赶不上怎么办 | clarification_needed | legacy-fallback | PASS |
| 10 | 不许可通知书怎么办 | clarification_needed | legacy-fallback | PASS |
| 11 | 代表取締役换人要通知入管吗 | clarification_needed | legacy-fallback | PASS |
| 12 | 定住者续签要准备哪些材料 | answer_with_assumptions | legacy-fallback | PASS |
| 13 | 技人国换工作了半年没去报告怎么办 | clarification_needed | legacy-fallback | PASS |
| 14 | 永住申请需要在日本住几年 | clarification_needed | legacy-fallback | PASS |
| 15 | 家族滞在能不能转永住 | direct_answer | legacy-fallback | PASS |

**15/15 PASS. P0 = 0. literal `unknown` count = 0. clarification template leaks = 0.**

Full output: [docs/qa/LLM_ANSWER_V0_2_LOCAL_SMOKE.md](docs/qa/LLM_ANSWER_V0_2_LOCAL_SMOKE.md).

## Pass criteria check

| Spec requirement | v0.2 status |
|---|---|
| P0 = 0 | ✅ 0 |
| 用户可见 unknown = 0 | ✅ 0 (regex-asserted across 15 cases) |
| clarification 页面不显示完整模板 | ✅ asserted in smoke |
| Q5 不再漏 legacy 字段 | ✅ title/summary/conclusion clean |
| 厚生年金问题不被塞成签证转换 | ✅ out_of_scope with 4 specific deadline questions |
| fallback 仍然不 500 | ✅ no exception path; reason captured |
| build pass | ✅ |
| typecheck pass | ✅ |

## Recommendation

Open PR for review. Do not merge / deploy.

If founder approves a re-canary on production:

1. Confirm `/api/build-info` returns `llm-answer-engine-v0-2-envelope-first`.
2. Re-run the 10 founder smokes from production.
3. **Q5 must NOT contain** `経営管理` / `常勤職員` / `代表取締役` / `資本金` /
   `事業計画` in any field of the response (top-level or envelope).
4. **Q-厚生年金 (新增)** must return mode `out_of_scope` or `clarification_needed`
   and key_missing_info must list the 4 specific deadline kinds.
5. If `engine_version=llm-answer-v0` for any in-scope case, verify the
   LLM-generated envelope's content also satisfies the redlines (the
   projector trusts envelope content from the LLM but still scrubs
   `unknown`).
6. Continue to expect ~7/10 fallback rate (timeout-driven, per v0.1
   canary). The projector ensures fallback envelopes still produce
   safe, consistent surfaces; it does not change the fallback rate.

## Not done (per spec)

- ❌ 接 seeds (still prepared but not wired)
- ❌ 300 条内容 / 支付 / 专家后台 / 首页大改 / 视觉细节
- ❌ Merge / deploy
