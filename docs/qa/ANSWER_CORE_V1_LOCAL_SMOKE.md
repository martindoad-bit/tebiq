# TEBIQ Answer Core V1 — local smoke

Captured 2026-05-02 from worktree `sleepy-archimedes-12177a` on branch
`claude/answer-core-v1`.

Command:

```bash
ANSWER_INTENT_DISABLE_AI=1 LLM_INTENT_DISABLE_AI=1 \
  npx tsx scripts/test/test-answer-core-v1.ts
```

The harness invokes the full Answer Core V1 pipeline for each question
(`runAnswerIntake`) — no DB, no LLM. Assertions run against the
flattened user-visible surface of the resulting `PublicAnswer`
(`collectVisibleText`).

Universal redlines applied to every case:

- visible_text MUST NOT contain literal `unknown` / `undefined` / `null`
- `clarification_needed` and `out_of_scope` MUST NOT surface
  `documents_needed` or `risk_warnings` (i.e. no full action template)

## Raw output

```
PASS      P0-spouse-divorce-to-teiju         status=preliminary            domain=long_term_resident   safety=pass
PASS      P0-koseinen-deadline               status=out_of_scope           domain=unknown              safety=pass
PASS      P0-family-stay-to-work             status=answered               domain=gijinkoku            safety=pass
PASS      P0-mgr-to-humanities               status=answered               domain=gijinkoku            safety=pass
PASS      P0-humanities-to-mgr               status=clarification_needed   domain=business_manager     safety=pass
PASS      P0-mgr-renewal-materials           status=preliminary            domain=business_manager     safety=pass
PASS      P0-representative-change           status=clarification_needed   domain=business_manager     safety=pass
PASS      P0-immigration-deadline            status=out_of_scope           domain=unknown              safety=pass
PASS      P0-denial-notice                   status=out_of_scope           domain=unknown              safety=pass
PASS      P0-permanent-resident-pension      status=clarification_needed   domain=permanent_resident   safety=pass

Result: 10/10 pass; failures: 0
```

## Spot checks (selected cases — full PublicAnswer)

### Q5 配偶签离婚后想转定住 — preliminary / rule_based

```
title:        初步整理：配偶离婚后转「定住者」需要的事实和手续
summary:      配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」。
conclusion:   配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」。
next_steps:
  - 先把离婚事实和 14 日内届出做掉
  - 整理「離婚定住」要看的事实
  - 判断是「在留資格変更」还是先「在留期間更新」
  - 咨询行政書士做个案诊断
docs:         在留カード / 护照 / 戸籍謄本（離婚記載あり） / 離婚届受理証明書 / 婚姻期間 / ...
```

`経営管理 / 常勤職員 / 代表取締役 / 資本金 / 事業計画` are absent
across every PublicAnswer field. The 14-日 mention exists only in
`next_steps[0]` ("先把离婚事实和 14 日内届出做掉") in the
legitimate 配偶者届出 context.

### Q-koseinen 厚生年金截止日期是什么时候？ — out_of_scope

```
title:    这个问题先具体一下，TEBIQ 才能给路径
summary:  「年金 / 健保的截止日期」要看是公司加入手续、个人保险料缴纳、离职退保切换，
          还是永住申请的纳付记录——不同期限相互独立，请先告诉 TEBIQ 是哪一种。
clarification_questions:
  - 你想问的是哪一种期限？(1) 公司加入厚生年金的手续期限 (2) 每月保险料缴纳期限
    (3) 离职 / 退保后切换国民年金的期限 (4) 永住申请用的年金缴纳记录期限
  - 是公司角度（雇主）还是个人角度（员工 / 自营）在问？
  - 你目前的在留资格是哪一种？（这关系到要不要把年金记录用于永住或更新）
documents_needed: []
risk_warnings:    []
```

No `从「X」转为「Y」` template; status correctly `out_of_scope`;
template fields empty.

### Q3 家族滞在想转工作签 — answered (legacy seed, fixed)

```
status:       answered
title:        家族滞在 → 工作签（技人国 など） 转换路径是什么？
conclusion:   家族滞在 持有人 自己取得 内定 + 该职务符合技人国 該当性 + 自己学历 / 経験
              满足要求 → 「在留資格変更」从 家族滞在 变更为 技人国（或其他就労在留）。
```

No 28-hour 资格外活动 confusion; correctly framed as 在留資格変更.

### Q7 代表取締役换人要通知入管吗 — clarification_needed (rule_based)

```
status:       clarification_needed
title:        关于经营管理：代表者变更要分开确认会社登记和入管届出
conclusion:   代表取締役换人，先处理会社登记，再确认入管是否需要届出或在下次申请中说明。
clarification_questions:
  - 确认代表者变更日期。
  - 确认法务局商業登記是否完成。
  - 确认入管侧是否已有通知或下次更新材料要求。
documents_needed: []
risk_warnings:    []
```

Title and conclusion preserve the legacy rule's specific content
(代表者 / 商業登記 / 入管届出); no template leak; no 本店移転 mistake.

## What this proves

- ✅ Single source of truth: every test asserts against
  `PublicAnswer.visible_text`. Legacy fields cannot leak by design
  (they're never copied into PublicAnswer).
- ✅ Q5 root cause from v0.1 canary is closed: 経営管理 family seed
  can no longer surface in a 配偶离婚→定住 question.
- ✅ Q-koseinen "塞成签证转换" failure mode closed.
- ✅ Mode contract enforced: clarification + out_of_scope have empty
  `documents_needed` / `risk_warnings`.
- ✅ Universal `unknown` / `null` / `undefined` ban holds.

## What this does NOT prove

- ❌ DB round-trip: persistence module is exercised in submit-question
  but the harness here doesn't write to the DB. Prod canary needs to
  validate sidecar read-back in `/answer/{id}`.
- ❌ Frontend visual rendering: harness asserts on data, not on
  pixels. Manual / Vercel preview check needed.
- ❌ LLM generation path: V1 has no LLM. A future iteration can plug
  in an `LlmAnswerProvider` as a third source — the projector +
  safety gate already provide the contract for that.
- ❌ Legacy draft rows that predate V1 (no sidecar): the
  `reconstructLegacyRun` path returns a minimal AnswerRun. This is
  exercised by the page but not unit-tested here.
