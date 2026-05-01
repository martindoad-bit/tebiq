# LLM Answer Engine v0.1 — Safe Fallback Fix Report

## Branch / build

- Branch: `claude/llm-answer-v0-1-safe-fallback`
- Base: `origin/main` (currently pointing at `27b2d31`, the revert
  commit from the v0 production canary rollback)
- First commit on branch: `git revert 27b2d31` — re-introduces the v0
  code that was reverted from production. This is the v0.0 baseline.
- Second commit on branch: the v0.1 safe fallback fix itself.
- `/api/build-info` version field bumped to `llm-answer-engine-v0-1-safe-fallback`.
- 是否 merge main：**否**。
- 是否 deploy production：**否**。

## What changed (v0.1 only — on top of v0)

### 必修 1 — Cross-domain fallback safety gate

New module: [lib/answer/fallback-safety-gate.ts](lib/answer/fallback-safety-gate.ts).

Four narrow, individually-named rules that detect when the legacy
`buildAnswer` result is incompatible with the parsed intent / scope:

| Rule | Trigger | Effect |
|---|---|---|
| A | `scope.domain === 'long_term_resident'` AND legacy content matches /経営・管理\|常勤職員\|役員報酬\|代表取締役\|資本金\|事業計画\|会社設立\|事業所要件/ | Block |
| B | 配偶 + 离婚 + 定住 question AND legacy matches /転職\|所属機関\|14\s*日(以内\|内\|間)?\|常勤職員\|経営管理\|代表取締役\|事業所\|本店移転\|地址変更/ | Block |
| C | family_stay → work visa question AND legacy matches /資格外活動\|28\s*時間/ without /在留資格変更\|内定\|雇用契約\|学歴\|職歴/ | Block |
| D | 代表取締役 + 入管 question AND legacy matches /本店移転\|事務所移転\|办公室搬迁\|地址変更/ without /代表取締役\|代表者\|役員変更\|商業登記/ | Block |

When any rule trips, [submit-question.ts:118-127](lib/answer/submit-question.ts:118-127) discards the legacy
content and returns a `genericSafeFallbackEnvelope` with `answer_mode:
'clarification_needed'`, `fallback_reason: 'cross_domain_seed_swallow'`,
and a domain-appropriate clarification list. **Never `direct_answer`.**

The four rule patterns line up exactly with the redlines the founder
originally enumerated; adding new rules here is the safe extension
point.

### 必修 2 — Q5 deterministic safe fallback

New module: [lib/answer/deterministic-safe-answers.ts](lib/answer/deterministic-safe-answers.ts).

`deterministicSafeAnswer()` is checked **before** the legacy seed
swallow gate and **before** the legacy fallback. Currently covers one
pattern:

- **`spouse_divorce_to_teiju`**: question matches (定住|定住者) target +
  (配偶|配偶者|配偶签|日本人配偶|永住者の配偶|妻|夫) + (离婚|離婚|分居|协议
  离婚|協議離婚|裁判離婚|別居).

The envelope it returns:

- `engine_version: 'safe-fallback-v0-1'`
- `answer_mode: 'answer_with_assumptions'`
- `domain: 'long_term_resident'`
- explicit assumptions about visa shape (日本人の配偶者等 / 永住者の配偶者等)
- 6 `key_missing_info` items: 婚姻持续期, 在日年数, 子女/亲权, 收入与税金, 残余在留期限, 离婚届出状态
- 4 `next_actions`: (1) 14日 配偶者届出 (now), (2) 整理離婚定住事实材料 (soon), (3) 判断变更 vs 更新顺序 (soon), (4) 行政書士个案诊断 (soon)
- 9 `materials`: 在留卡, 护照, 戸籍謄本(離婚記載), 婚姻/同居期间证明, 住民票, 直近 3 年课税/纳税证明, 年金/健保记录, 雇用资料, 子女出生/亲权
- explicit `risks`: 短婚 / 无日本国籍子女 / 年金税金空白 / TEBIQ 不保证
- `expert_checkpoints`: 婚姻 < 3 年 OR 子女不归你 OR 年金空白 OR 离婚原因复杂 → 行政書士

Crucially: it correctly distinguishes **the legally-required 14-day
配偶者届出** (mentioned, because the law requires it) from **treating
the question AS a job-change 14-day report** (the production P0). The
detail text is explicit: `这个届出是义务，做不做都不直接决定定住能
否取得，但不做会被记一笔`.

### 必修 3 — LLM JSON parser hardening

Changes in [lib/answer/llm-answer-generator.ts](lib/answer/llm-answer-generator.ts):

**Prompt (system message)**: Added a dedicated `【输出格式（最重要）】`
section that says (a) only one JSON object, (b) no markdown / code blocks,
(c) first char `{` last char `}`, (d) escape newlines inside strings as
`\n`, (e) if you cannot satisfy this, downgrade to `clarification_needed`
with minimal structure. The user payload also ends with: `现在请输出严格
JSON：第一个字符 {，最后一个字符 }，无任何额外文字。`

**`extractJson()`**: Three layers of tolerance:
1. Strip ```json ... ``` / ``` ... ``` fenced blocks.
2. Greedy slice between first `{` and last `}` — try parsing, return if it works.
3. Walk-and-balance: find the first balanced top-level object,
   accounting for braces inside string literals (with escape handling).
   This catches the common Claude failure mode where the model emits
   `{...}\n\n注意：...` after the object.

**Closed-set fallback reasons**: `generateLlmAnswer()` now returns a
result object `{ envelope, attempted, reason }` instead of `envelope |
null`. The reason is one of: `disabled`, `out_of_scope`, `timeout`,
`empty_response`, `json_parse_failed`, `validation_failed`,
`llm_exception`. Empty responses, validation failures, and timeouts now
each map to their own reason instead of all collapsing to `null`.

### 必修 4 — Fallback observability

New fields on [LlmAnswerEnvelope](lib/answer/types.ts):

- `llm_attempted: boolean` — true if Bedrock was actually called.
- `fallback_reason: FallbackReason | undefined` — closed enum (see above + `cross_domain_seed_swallow` and `deterministic_safe_fallback`).
- `fallback_from: 'llm-answer-v0' | undefined` — engine that was supposed to produce this envelope.
- `llm_error?: boolean` — kept for v0 callers; new code should branch on `fallback_reason`.

Also exposed at the **/api/questions response top level** (so QA can
read these fields without descending into `llm_envelope`):

- `llm_attempted`
- `fallback_reason`
- `fallback_from`

Existing top-level fields (`engine_version`, `answer_mode`,
`llm_envelope`) are unchanged.

## Files changed (vs v0)

| File | Type | What |
|---|---|---|
| `lib/answer/types.ts` | modified | New `FallbackReason` type, extended `EngineVersion` to include `safe-fallback-v0-1`, added 3 observability fields to `LlmAnswerEnvelope` |
| `lib/answer/fallback-safety-gate.ts` | NEW | Four cross-domain rules (A / B / C / D) |
| `lib/answer/deterministic-safe-answers.ts` | NEW | `deterministicSafeAnswer()` (Q5 pattern) + `genericSafeFallbackEnvelope()` (when gate trips) |
| `lib/answer/llm-answer-generator.ts` | rewritten | Hardened JSON parser, hardened prompt, closed-set return type with reason |
| `lib/answer/submit-question.ts` | modified | Pipeline now: scope → LLM → if fail: deterministic safe → safety gate → legacy fallback. Each branch sets observability fields |
| `app/api/questions/route.ts` | modified | Surface `llm_attempted`, `fallback_reason`, `fallback_from` at top-level |
| `app/api/build-info/route.ts` | modified | Version bumped to `llm-answer-engine-v0-1-safe-fallback` |
| `scripts/test/test-llm-answer-engine.ts` | modified | Mirrors v0.1 pipeline (deterministic → gate → legacy). Q5 redline strengthened to forbid 経営管理 swallow patterns. Q10 redline strengthened to forbid 地址変更 misclassification |
| `docs/qa/LLM_ANSWER_V0_1_LOCAL_SMOKE.md` | NEW | Captured raw smoke output |
| `LLM_ANSWER_ENGINE_V0_1_REPORT.md` | NEW | This report |

## Q5 fix — before vs after

### Before (production canary)

```
question:    配偶签离婚后想转定住
engine:      legacy-fallback
mode:        direct_answer
title:       経営・管理 常勤職員 1 名以上 何时必须到位？     ← P0
short_answer: 常勤職員 必须在「申請日时点」已经实际雇用 + 給与支払
              + 社保加入。「内定」「派遣」「業務委託」「役員兼任」
              均不构成 常勤職員。                            ← P0 (问 A 答 B)
next_actions: 確認你是初次申請 / 更新 / 在留資格変更
              確認拟雇用职员的在留資格
              算清申請日距今的时间窗口                       ← P0
materials:    雇用契約書 / 給与支払台帳 / 厚生年金加入証明... ← P0
```

### After (v0.1, LLM disabled — deterministic safe answer)

```
question:        配偶签离婚后想转定住
engine:          safe-fallback-v0-1
mode:            answer_with_assumptions
domain:          long_term_resident
llm_attempted:   false
fallback_reason: deterministic_safe_fallback
fallback_from:   llm-answer-v0

short_answer:    配偶离婚后想转「定住者」不是届出可以解决的事，
                 需要走「在留資格変更許可申請」。能不能批，看
                 婚姻持续期间、在日年数、子女与亲权、收入与税金、
                 住所与生活基础、离婚原因、是否有暴力 / 不法行为
                 记录这些个案事实。TEBIQ 不能保证一定能转。

next_actions[0]: 先把离婚事实和 14 日内届出做掉 (now)
                 → 离婚成立（戸籍記載）后 14 日内，向出入国在留
                   管理庁提交「配偶者に関する届出」。这个届出
                   是义务，做不做都不直接决定定住能否取得，但不
                   做会被记一笔。
next_actions[1]: 整理「離婚定住」要看的事实 (soon)
next_actions[2]: 判断是「在留資格変更」还是先「在留期間更新」 (soon)
next_actions[3]: 咨询行政書士做个案诊断 (soon)

materials:       戸籍謄本（離婚記載あり） / 直近 3 年の課税証明書
                 / 年金加入記録 / 子女の出生証明 ...
risks:           短婚通常很难直接转 / 没有日本国籍子女审查会严格
                 / 未缴年金记录是强减分项 / TEBIQ 不能保证
```

The 経営管理 / 常勤職員 / 役員 / 代表取締役 / 資本金 / 事業計画 content
is **completely absent** from the v0.1 envelope. The 14-日 mention is
specifically the legally-required **配偶者届出** (correct, mandatory)
and is explicitly framed as separate from the 定住者 path.

After the fix, even if Bedrock returns nothing for this question (the
common production failure mode), the deterministic envelope is what
the user sees — never the 経営管理 seed.

## Parser hardening — how

1. **Prompt change**: explicit JSON-only directive in both system and
   user message; reinforced that violating the format = downgrade to
   `clarification_needed`.
2. **`extractJson()` rewrite**: three layers — fence stripper, greedy
   parse-attempt, then a state-machine balanced-object scanner that
   handles braces inside JSON string literals (with escape sequences).
3. **Reason capture**: each failure mode (empty body, parse error,
   validation error, abort/timeout, generic exception) maps to a
   distinct `FallbackReason`, surfaced at the API top level. After
   merge + deploy this lets us see in 1 curl whether production's
   8/10 fallback rate was parse failures, timeouts, or something else.

## Safety gate — how

`isLegacyAnswerCompatibleWithScope()` is invoked **after** legacy
`buildAnswer` and **after** the LLM has either succeeded (skipped) or
failed (entered fallback). It pulls the legacy answer's title +
summary + sections + next_steps + every action_answer field into a
single haystack string, then runs the four rules (A / B / C / D) above.

Critically, it runs **after** `deterministicSafeAnswer()` — meaning Q5
goes straight to the deterministic envelope without involving the gate.
The gate only catches the long tail.

If a rule trips:
- `console.warn('[answer] cross-domain seed swallow blocked', rule, reason)`
  is emitted (visible in Vercel logs).
- The legacy answer is **discarded**.
- A `genericSafeFallbackEnvelope` is returned with `mode:
  clarification_needed`, `fallback_reason: cross_domain_seed_swallow`,
  and a domain-appropriate clarification list.

## 10-case smoke result

`ANSWER_GENERATION_DISABLE_AI=1 ANSWER_INTENT_DISABLE_AI=1 npx tsx
scripts/test/test-llm-answer-engine.ts` — exercises the LLM-disabled
path so it tests the deterministic + safety gate + legacy fallback
chain (the LLM-success path needs Vercel preview/prod env).

| ID | Question | mode | engine | result |
|---|---|---|---|---|
| 1 | 我是经管签，想转人文签 | direct_answer | legacy-fallback | PASS |
| 2 | 我想从人文签转为经管签怎么办 | clarification_needed | legacy-fallback | PASS |
| 3 | 家族滞在想转工作签 | direct_answer | legacy-fallback | PASS |
| 4 | 家族滞在配偶可以打工吗 | answer_with_assumptions | legacy-fallback | PASS |
| 5 | **配偶签离婚后想转定住** | **answer_with_assumptions** | **safe-fallback-v0-1** | **PASS** ← Q5 fixed |
| 6 | 经管续签材料有哪些 | answer_with_assumptions | legacy-fallback | PASS |
| 7 | 永住申请年金没交怎么办 | clarification_needed | legacy-fallback | PASS |
| 8 | 入管让补材料，期限赶不上怎么办 | clarification_needed | legacy-fallback | PASS |
| 9 | 不许可通知书怎么办 | clarification_needed | legacy-fallback | PASS |
| 10 | 代表取締役换人要通知入管吗 | clarification_needed | legacy-fallback | PASS |

Plus 10 additional P1 cases — all PASS.

**Total: 20/20 PASS, P0 = 0, P1 = 0.**

Full output in [docs/qa/LLM_ANSWER_V0_1_LOCAL_SMOKE.md](docs/qa/LLM_ANSWER_V0_1_LOCAL_SMOKE.md).

## P0 / P1 / P2 status

- P0: **0**
- P1: 0
- P2: 0

## 是否建议再次 production canary

**是，建议再次做 production canary**，但要留意以下条件：

1. 把 v0.1 PR merge 进 main 后，等 Vercel production deploy 完成。
2. 通过 `/api/build-info` 确认 `version === 'llm-answer-engine-v0-1-safe-fallback'`。
3. 重跑同样 10 条 smoke。**关键判断标准变成**：
   - **Q5 必须返回 `engine_version === 'safe-fallback-v0-1'` 或 `'llm-answer-v0'`**（不能再是 `legacy-fallback` 携带 経営管理 内容）。
   - 8 条 fallback 现在会带 `fallback_reason` —— 据此判断 production 落 fallback 是因为 `json_parse_failed` 还是别的（如果是别的，再针对性处理）。
   - 如果再出 P0 → 同一个 rollback 流程。
4. 如果 Q5 返回 `safe-fallback-v0-1`、其他 9 条不出 P0、`fallback_reason` 集中是 `json_parse_failed` 之外的可控原因 → 通过。否则继续修。

**v0.1 不能解决的问题（先记下，不动）**：
- 8/10 fallback 的根因（很可能是 LLM JSON parse / max_tokens cutoff）— v0.1 把 prompt 收紧 + parser 容错升级，但能不能把 ≥ 5/10 提升到 `llm-answer-v0` 要看 production 数据。
- legacy seed swallow 在 Q5 之外的长尾问题 — 现在被 generic safe fallback 兜住，但兜出的是 clarification 而不是直接答案，复盖度上限有限。这要靠 LLM 路径生效 + seeds 接入解决，不在这个 PR 范围。

## Not done (per spec — explicit)

- ❌ 重做 LLM Answer Engine
- ❌ 接 seeds（content/answer-seeds/llm-answer-v0-seeds.json 仍 prepared but not wired）
- ❌ 新功能
- ❌ Performance 优化
- ❌ Merge / deploy
