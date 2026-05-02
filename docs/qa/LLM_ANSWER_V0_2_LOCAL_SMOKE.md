# LLM Answer Engine v0.2 — local smoke (LLM disabled, full pipeline)

Captured 2026-05-02 from worktree `sleepy-archimedes-12177a` on branch
`claude/llm-answer-v0-2-envelope-first`.

Command:

```bash
ANSWER_GENERATION_DISABLE_AI=1 ANSWER_INTENT_DISABLE_AI=1 \
  npx tsx scripts/test/test-llm-answer-engine.ts
```

Unlike v0 / v0.1 smoke, **v0.2 asserts on the user-visible surface**
(title, summary, intent_summary, action_answer.*, next_steps,
sections, copy_text), not just on the envelope. This is the same
surface the frontend renders.

Forbidden across every case: literal `unknown` / `undefined` / `null`,
the legacy "从「unknown」转为「unknown」" idiom, and full action
templates inside clarification_needed / out_of_scope.

## Raw output

```
PASS       P0-spouse-divorce-to-teiju         engine=safe-fallback-v0-1     mode=answer_with_assumptions
PASS       P0-koseinen-deadline               engine=out-of-scope-v0        mode=out_of_scope
PASS       P0-mgr-to-humanities               engine=legacy-fallback        mode=direct_answer
PASS       P0-humanities-to-mgr               engine=legacy-fallback        mode=clarification_needed
PASS       P0-family-stay-to-work             engine=legacy-fallback        mode=direct_answer
PASS       P0-family-stay-work-permission     engine=legacy-fallback        mode=answer_with_assumptions
PASS       P0-mgr-renewal-materials           engine=legacy-fallback        mode=answer_with_assumptions
PASS       P0-permanent-resident-pension      engine=legacy-fallback        mode=clarification_needed
PASS       P0-immigration-deadline            engine=legacy-fallback        mode=clarification_needed
PASS       P0-denial-notice                   engine=legacy-fallback        mode=clarification_needed
PASS       P0-representative-change           engine=legacy-fallback        mode=clarification_needed
PASS       P1-teijusha-renewal-materials      engine=legacy-fallback        mode=answer_with_assumptions
PASS       P1-jinbun-late-jobchange-report    engine=legacy-fallback        mode=clarification_needed
PASS       P1-permanent-years                 engine=legacy-fallback        mode=clarification_needed
PASS       P1-family-stay-to-permanent        engine=legacy-fallback        mode=direct_answer

Result: 15/15 pass; P0 failures: 0
```

## Q5 spot check — title now safe

| field | before (v0 + v0.1) | after (v0.2) |
|---|---|---|
| `title` (top-level) | `経営・管理 常勤職員 1 名以上 何时必须到位？` | `初步整理：配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」...` |
| `action_answer.conclusion` | `常勤職員 必须在「申請日时点」已经实际雇用 + 給与支払 + 社保加入...` | `配偶离婚后想转「定住者」不是届出可以解决的事...` |
| `action_answer.what_to_do[0]` | `1）确认你是初次申請 / 更新 / 在留資格変更。` | `先把离婚事实和 14 日内届出做掉` |
| `intent_summary` | `从「配偶者」转为「定住者」需要满足什么条件...` | `配偶（日本人配偶者等 / 永住者の配偶者等）签证持有人在离婚后，希望把在留资格变更为「定住者」...` |

`経営管理` / `常勤職員` / `代表取締役` / `資本金` / `事業計画` /
`会社設立` are **completely absent** from every user-visible field.
`14 日内届出` appears once — in action_answer.what_to_do[0] — but in
the legally-correct 配偶者届出 context, framed as separate from the
定住者 path (per the deterministic safe answer's detail text).

## 厚生年金 spot check — out_of_scope with 4 specific clarifications

```
title:    这个问题暂时不在 TEBIQ v0 支持范围内
summary:  「年金 / 健保的截止日期」要看是公司加入手续、个人保险料缴纳、
          离职退保切换，还是永住申请的纳付记录——不同期限相互独立，
          请先告诉 TEBIQ 是哪一种。
next_steps:
  - 你想问的是哪一种期限？(1) 公司加入厚生年金的手续期限
    (2) 每月保险料缴纳期限 (3) 离职 / 退保后切换国民年金的期限
    (4) 永住申请用的年金缴纳记录期限
  - 是公司角度（雇主）还是个人角度（员工 / 自营）在问？
  - 你目前的在留资格是哪一种？（这关系到要不要把年金记录用于永住或更新）
action_answer.what_to_do: []     ← empty (no full template)
action_answer.documents_needed: []
```

No literal `unknown`. No "从「X」转为「Y」" template. No 最紧的两件 /
步骤 / 期限 / 不做会怎样.

## Clarification spot check (Q10 代表取締役换人)

```
title:           关于经营管理：先确认几件事，TEBIQ 再给具体方向
summary:         代表取締役换人，先处理会社登记，再确认入管是否需要届出
                 或在下次申请中说明。
intent_summary:  你目前持有「经营管理」，TEBIQ 需要你先告知具体想办的手续。
action.conclusion:    代表取締役换人，先处理会社登记...
action.what_to_do:    []        ← empty
action.documents_needed: []
action.deadline_or_timing: []
action.where_to_go: []
action.consequences: []
action.expert_handoff: []
next_steps:
  - 你现在已经完成到哪一步？
  - 事情发生日期是什么？
  - 是否已经收到文书或窗口指示？
  - 是否涉及公司、雇主或家属？
```

`unknown` is gone — `intent_summary` now says "你目前持有「经营管理」"
instead of the former "从「unknown」转为「unknown」".
`action_answer` template fields are all empty so the renderer hides
最紧的两件 / 步骤 / 期限 / 不做会怎样 / 要找专家.

## What this proves / does not prove

- ✅ The user-visible surface no longer leaks legacy seed swallow text
  (Q5 production P0 cause).
- ✅ `unknown` / `undefined` / `null` strings are scrubbed from all
  user-visible fields.
- ✅ `clarification_needed` and `out_of_scope` modes never emit a full
  action template.
- ✅ 厚生年金-style out_of_scope topics get topic-specific clarifying
  questions (4 sub-types) rather than the generic two-question script.
- ❌ Live LLM correctness: not exercised here (no Bedrock keys).
  Production canary needed.
- ❌ DB sidecar round-trip: not exercised here. Production needed.
