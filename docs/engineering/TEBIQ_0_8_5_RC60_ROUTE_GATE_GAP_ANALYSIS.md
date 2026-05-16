# TEBIQ 0.8.5 RC60 Route-Gate Gap Analysis

Source: `scripts/eval/check-card-import-first24-route-gates.ts` against
`docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json` → 30/41 pass, 11 failures.

Goal of this doc: per failure decide A (tighten/expand pattern in
`lib/consultation/route-gates.ts`), B (reword AQL question), or C (new gate).
This is a plan only — engineer applies. RC56 baseline is 33/33 today and must
remain 33/33. RC60 negative controls (`N01`–`N10`) must not gain new
overmatches beyond the pre-existing baseline (already documented at end).

Pattern matcher contract recap (see `matchRouteGates`):

- `match.allOf` — every group must have at least one substring hit on the
  normalized question text.
- `match.anyOf` — minAny gates the count of any-hits; default 1 if anyOf has
  items, else 0.
- All matching is lowercased + whitespace-stripped substring (`normalize`).

---

## Failure 1 — `M14-pr-first-documents`

- **Q**: 我想开始准备永住，第一批最该先拿哪些证明看自己有没有坑？
- **Expected**: `pr-basic-requirements-not-years-only`
- **Diagnosis**: Group 1 (`永住`) hits via `永住`. Group 2 currently requires
  one of years/income/tax/short-stay markers (`10年`, `年数`, `年金`, `纳税`
  …). Q is about *starting prep* and contains none of those. The gate today
  only fires on the "住满N年就够了吗" misconception family.
- **Decision**: **A**. Extend Group 2 with prep/evidence terms that signal
  "I'm starting to assemble PR materials" without overmatching marketing PR
  or unrelated 永住 negatives.
- **Exact change**: in gate `pr-basic-requirements-not-years-only` add to
  `match.allOf[1]`:
  - `'证明'`, `'证書'`, `'証明書'`, `'准备'`, `'第一批'`, `'材料清单'`,
    `'看自己'`
- **Risk**: Negative controls scanned for `永住` + new term —
  - `N02` (`永住的PR没关系`) — no `证明`/`准备`/`第一批`/`材料清单`/`看自己`
    → safe.
  - `N06` (`不是问永住`) — has `永住` but no new term → safe.
  - `N07` (`我是永住者`) — has `永住者`; no new term → safe.
  - `N09` (`不是永住卡`) — has `永住` but no new term → safe.
  - `N10` (`不是永住申请`) — has `永住` but no new term → safe.
  - `F01` already passes via existing `late-payment` gate, unaffected.
- **RC56**: `A08-pr-materials` already passes via `年数`; the additions are
  disjunctive so it still passes.

---

## Failure 2 — `B02-incomplete-materials-safe-bridge`

- **Q**: 签证下周到期，公司的决算书还没出来。先递交不完整材料是不是就能保住特例期间？
- **Expected**: `incomplete-materials-before-expiry-no-safe-bridge`
- **Diagnosis**: Group 1 expects "材料不齐 / 没齐 / 缺材料 / 来不及 / 補正
  …". Q phrases the same idea as "决算书还没出来" + "不完整材料" — neither is
  in Group 1. Group 2 (`到期`) ✓. anyOf (`先交`/`先提交`/`保住`/`特例` …) ✓
  via `保住`/`特例`.
- **Decision**: **A**. Expand Group 1 to capture the "report not yet ready /
  document incomplete" colloquialisms.
- **Exact change**: in gate
  `incomplete-materials-before-expiry-no-safe-bridge` add to
  `match.allOf[0]`:
  - `'不完整'`, `'不完整材料'`, `'决算书'`, `'決算書'`,
    `'还没出来'`, `'还没出'`, `'还没出齐'`, `'没出来'`
- **Risk**: Negative controls scanned —
  - `N06` (住民税分期) — no 不完整/决算书/没出来 → safe.
  - `N03` (logo 变更) — none → safe.
  - All other negs: none → safe.
- **Bonus**: also helps Failure 9 (F03 — has `决算书`).
- **RC56**: `C03-incomplete-material-before-expiry` (`材料还没齐`) passes via
  `还没齐` already; additions are disjunctive.

---

## Failure 3 — `B12-short-stay-paid-project`

- **Q**: 我短期来日本，帮日本客户做一个两周的有偿项目，钱打到海外账户，可以吗？
- **Expected**: `short-stay-no-work-no-shikakugai`
- **Diagnosis**: Group 1 requires `短期滞在 / 短期签 / 短期ビザ / 観光 / 旅游
  / 商用 / 90天`. Q says the colloquial `我短期来日本` only — bare `短期`
  without the qualifier `签/滞在/ビザ`. Group 2 (`项目`, `有偿`) ✓.
- **Why A is unsafe here**: adding bare `短期` or `短期来日本` to Group 1
  trips RC60 `N01-short-stay-meeting` ("我短期来日本只是参加客户会议") —
  `N01` Q also contains `工作` (matches Group 2) and is an explicit negative
  control that must NOT fire `short-stay-no-work-no-shikakugai`. The matcher
  cannot distinguish "client meeting (legal)" from "paid project (illegal)"
  on the Group-1 axis alone, and `minAny:0` here means anyOf does not gate.
- **Decision**: **B (reword question)**. The scenario is intentionally about
  short-stay-status work — make the visa class explicit in the user's voice.
- **Exact rewrite** (preserve user voice):
  > 我现在拿的是短期签来日本，帮日本客户做一个两周的有偿项目，钱打到海外账户，可以吗？
  Alternative equally acceptable:
  > 我用短期滞在来日本，帮日本客户做一个两周的有偿项目，钱打到海外账户，可以吗？
- **Risk**: zero — purely AQL pack edit. `B12` becomes a clean positive
  trigger; `N01` continues to be the legitimate "client meeting on short
  stay, no work" negative control with the same semantics.

---

## Failure 4 — `DW05-false-application-material`

- **Q**: 申请材料里收入写高了一点，已经交给入管了。现在改会不会更麻烦？
- **Expected**: `application-truthfulness-no-false-info`
- **Diagnosis**: Group 1 lists explicit dishonesty terms (`虚偽 / 虚假 / 嘘 /
  假材料 / 偽造 / 不实 / 誇張 / 隐瞒` …). Q uses the euphemism `收入写高了一
  点` — common real-user phrasing for income inflation that the gate misses.
  Group 2 (`申请`/`材料`/`入管`) ✓.
- **Decision**: **A**. Add real-user euphemisms for inflating numbers in
  applications.
- **Exact change**: in gate `application-truthfulness-no-false-info` add to
  `match.allOf[0]`:
  - `'写高了'`, `'写多了'`, `'写大了'`, `'多写了'`, `'多写一点'`,
    `'写高一点'`, `'美化'`, `'灌水'`
- **Risk**: Negative controls — none of N01–N10 contain these. RC56
  positives unaffected (existing 虚偽 / 虚假 paths still hit). Safe.

---

## Failure 5 — `DW06-business-manager-no-business-change-job`

- **Q**: 经管公司半年没收入了，我想转去朋友公司上班，可以先入职再办变更吗？
- **Expected**: `pending-status-change-current-activity-only` AND
  `business-manager-disposition-no-auto-success`
- **Diagnosis**: two separate gaps.
  - For `pending-status-change-current-activity-only`: Group 1 wants
    `在留資格変更 / 変更申請 / 变更申请 / 变更中 / 申請中 / 受付 / 受理 / 特
    例期間`. Q says `办变更` (the verb form) and `先入职再办变更` — none
    matches as a substring (because the patterns include `变更申请` not bare
    `变更`).
  - For `business-manager-disposition-no-auto-success`: Group 1 (`经管`) ✓.
    Group 3 (`入职`/`上班`) ✓. Group 2 ("dispose-of-the-company" markers:
    `休眠 / 廃業 / 注销 / 清算 / 转让 / 不要了 / 业务停 / 事業停止` …) does
    not match `半年没收入了`.
- **Decision**: **A** for both gates.
- **Exact change**:
  1. In gate `pending-status-change-current-activity-only` add to
     `match.allOf[0]`:
     - `'办变更'`, `'再办变更'`, `'想变更'`, `'要变更'`, `'换工作'`,
       `'转工作'`, `'转去'`, `'入职'`, `'入社'`, `'新公司'`, `'新工作'`,
       `'新雇主'`
     - **Caveat**: `入职` / `入社` already exist in Group 2. Putting them in
       both groups means a Q with just `入职` could satisfy both groups.
       That is acceptable here because the gate already lists permissive
       targets (`留学`/`家族滞在`/`J-Find`/`特定活動`/`技人国`) in `anyOf`
       with implicit `minAny:0` — no, anyOf default is 1 when anyOf is
       non-empty *unless* `minAny:0` is set explicitly. This gate sets
       `minAny: 0`, so anyOf does not gate. Engineer should reconfirm: with
       both groups containing `入职`, does any negative control fire?
       Negatives with `入职` / `入社`: none in RC60 N01–N10. Safe.
  2. In gate `business-manager-disposition-no-auto-success` add to
     `match.allOf[1]`:
     - `'没收入'`, `'无收入'`, `'没业务'`, `'没营业'`, `'停业'`, `'没生意'`,
       `'生意没了'`, `'公司没'`, `'半年没'`
- **Risk**:
  - For pending-status-change: `N04` (`回朋友家住几天`) — no `入职`/`入社`/
    `换工作`/`转工作`/`新公司` etc. → safe. `N08` (`只是搬家`) — none →
    safe.
  - For business-manager-disposition: Group 1 (`经管 / 経営管理`) is
    narrow; only N03 mentions 经管 ("经管公司只是换了 logo") and `换 logo`
    won't match Group 2 even after these additions → safe.
  - `RC56 C11` ("我经营管理签的公司已经休眠了。先注销公司再转工作签") —
    already passes via `休眠`; unaffected.
  - `RC56 E09` ("经营管理公司休眠… 先入职别家公司") — passes today; my
    additions only widen the input space, no positive case is broken.

---

## Failure 6 — `DW07-spouse-divorce-remarriage`

- **Q**: 我日本人配偶签离婚后又准备再婚，是不是再婚后就不用管之前离婚的届出了？
- **Expected**: `notification-duty-violation-not-harmless` AND
  `status-cancellation-before-expiry-boundary`
- **Diagnosis**:
  - For `notification-duty-violation-not-harmless`: Group 1 (`届出` /
    `离婚`) ✓. Group 2 (`忘了`/`没做`/`没告诉入管`/`遅れ`/`迟了`/`公司`/`错`
    …) does not contain Q's `不用管` phrasing.
  - For `status-cancellation-before-expiry-boundary`: Group 1 (`离婚` /
    `配偶`) ✓. Group 2 (`在留期間 / 在留期限 / 期限 / 残って / 还有 / 剩 /
    カード / 在留卡 / 更新`) — Q has none of these.
- **Decision**: **A** for both.
- **Exact change**:
  1. In gate `notification-duty-violation-not-harmless` add to
     `match.allOf[1]`:
     - `'不用管'`, `'不用做'`, `'不用补'`, `'不需要做'`, `'不需要管'`,
       `'不必做'`, `'不必管'`
  2. In gate `status-cancellation-before-expiry-boundary` add to
     `match.allOf[1]`:
     - `'再婚'`, `'届出'`, `'届け出'`, `'通知'`
- **Risk**:
  - notification gate: `N04` ("和配偶吵架… 没有离婚也没有更新问题") —
    Group 1 needs `届出 / 配偶` (matches `配偶`) and Group 2 needs one of
    new terms. N04 has `没事` semantically but not literal `不用管`. Safe.
  - status-cancellation gate: with `届出` added to Group 2, any Q with
    Group 1 trigger + 届出 fires. N04 has neither `届出` nor `再婚` nor
    `通知`. N08 (`改地址`) has neither. Safe. `通知` is broad: any Q with
    Group 1 trigger (`离婚`/`退職`/`住所`/etc.) + the word `通知` will
    fire — there is no such RC60 negative.
  - Engineer caveat: `通知` is the broadest of the four — if you want to
    be extra-conservative, drop `通知` and keep only `再婚`/`届出`/
    `届け出`. F09 / DW11 still get covered via other paths (DW11 covered
    by adding `取消` / `在留资格` per Failure 7 below).

---

## Failure 7 — `DW11-status-cancellation-letter`

- **Q**: 入管寄信说要我去说明情况，好像不是补材料。会不会是取消在留资格？
- **Expected**: `immigration-notice-taxonomy-first` AND
  `status-cancellation-before-expiry-boundary`
- **Diagnosis**:
  - For `immigration-notice-taxonomy-first`: Group 1 = `NOTICE_TERMS` array
    (`通知 / 通知書 / ハガキ / 受付 / 審査完了 / 補正 / 不許可 / 出頭 / 呼
    び出し` …). Q says `入管寄信` and `要我去说明情况` — neither matches
    `通知`/`出頭` literally; `寄信` and `说明` are missing.
  - For `status-cancellation-before-expiry-boundary`: Group 1 (`取消`) ✓
    via `取消在留资格`. Group 2 (period nouns) — Q has `在留资格` (not in
    Group 2) and no `期限` / `卡` / `更新`.
- **Decision**: **A** for both.
- **Exact change**:
  1. In `NOTICE_TERMS` constant (top of file) add:
     - `'寄信'`, `'寄来信'`, `'入管寄'`, `'入管来信'`, `'入管的信'`,
       `'入管来的信'`, `'手紙'`, `'手纸'`, `'お手紙'`, `'一封信'`,
       `'说明情况'`, `'说明情況'`, `'去说明'`, `'让我去'`, `'要我去'`
     - `NOTICE_TERMS` is referenced only by `immigration-notice-taxonomy-
       first` (line 302) — engineer should verify this reference scope
       before edit.
  2. In gate `status-cancellation-before-expiry-boundary` add to
     `match.allOf[1]`:
     - `'取消'`, `'在留资格'`, `'在留資格'`, `'资格取消'`, `'資格取消'`
     - **Caveat**: `取消` is also in Group 1 already; placing it in Group 2
       means a Q with bare `取消` satisfies both groups. RC60 negatives
       containing `取消`: none. Safe.
- **Risk**:
  - immigration-notice gate: anyOf gating is `minAny:0` so just Group 1 is
    enough. N03 has `通知` (already triggers — pre-existing overmatch in
    baseline). My additions add `寄信`/`手紙`/`说明` etc. — N02/N04/N05/
    N06/N07/N08/N09/N10 do not contain any of these. N03 unchanged
    (already overmatches). Safe.
  - status-cancellation gate: adding `在留资格` widens substantially. RC60
    negs with `在留资格`: none (N02 talks about "在留" briefly? — actually
    N02 has neither). Safe.

---

## Failure 8 — `DW12-hsp2-automatic-pr`

- **Q**: 高度专门职1号满三年，是不是自动变2号，或者直接就像永住一样了？
- **Expected**: `hsp2-not-automatic-not-pr`
- **Diagnosis**: Group 1 lists only the *combined* token `高度専門職2号` /
  `HSP2` / `高度人才2号`. Q uses simplified Chinese `高度专门职` and the
  number is split off as `变2号`. There is no contiguous "高度专门职2号"
  substring. Group 2 (`三年` / `永住`) ✓.
- **Decision**: **A**. The Group 1 design assumes the user always writes
  "HSP2" or "高度専門職2号" as one token, which is unrealistic in
  conversational Chinese.
- **Exact change**: in gate `hsp2-not-automatic-not-pr` add to
  `match.allOf[0]`:
  - `'高度专门职'`, `'高度专门職'` (mixed), `'高度人才'`, `'高才'`
  - And add to `match.allOf[1]` (already present mostly): ensure `'2号'`,
    `'２号'`, `'2號'` are present (already has `'3年'`/`'三年'`/`'永住'`/…).
    The Q matches Group 2 via `三年`/`永住` already.
- **Risk**: Group 1 now matches any HSP1 question. Group 2 must still hit
  one of `自动 / 自動 / 3年 / 三年 / 永住 / 在留期限 / 无期限 / 無期限 / 変
  更 / 变更`.
  - RC56 `C04-hsp1-institution-change` ("高度人才 1 号换公司，点数够，也
    会 14 天内届出") — Group 2 hits? No `自动`/`3年`/`三年`/`永住`/`在留
    期限`/`无期限`/`変更`/`变更` (uses `换公司` not `变更`). Safe.
  - RC60 `B03-hsp-institution-start-work` ("高度人才换公司，分数还是够
    的. 先去新公司上班，再14天届出可以吗？") — Group 2 same answer: no
    trigger. Safe.
  - Negatives N01–N10: no HSP terms. Safe.

---

## Failure 9 — `F03-gijinkoku-renewal-new-company-followup`

- **Q**: 刚才问技人国续签材料。补充一下，我换过工作，新公司还没给我决算书，这会不会来不及？
- **Expected**: `incomplete-materials-before-expiry-no-safe-bridge`
- **Diagnosis**: Group 1 has `来不及` ✓. Group 2 (`到期 / 期限 / 变更 / 更
  新 / 申请 / 提交 / 递交`) — Q uses `续签`, not `更新`. No Group 2 hit.
  anyOf has no hit either.
- **Decision**: **A**. Add `续签` family to Group 2; Failure 2 additions
  also help (`决算书` to Group 1 — not strictly required since `来不及`
  already triggers, but cosmetically aligned).
- **Exact change**: in gate
  `incomplete-materials-before-expiry-no-safe-bridge`:
  - Group 2 add: `'续签'`, `'延签'`, `'续'`, `'换公司'`, `'换工作'`
  - anyOf add: `'来不及'`, `'退回'`, `'直接退'`, `'退'` so that `minAny:1`
    can fire on this Q (anyOf currently lacks any term Q contains; `来不
    及` is only in Group 1).
- **Risk**:
  - Negs scanned for `续签`/`换工作`/`换公司`: none of N01–N10 contain
    these in combination with Group 1 incomplete-material terms. Safe.
  - `来不及` to anyOf: anyOf is OR with minAny:1. Adding terms only widens
    the trigger when Group 1 + Group 2 both already match. Same negs
    scan: safe.

---

## Failure 10 — `F06-expiry-window-rejection-followup`

- **Q**: 刚才问在留卡快到期。补充一下，窗口会不会因为材料不齐直接退回？
- **Expected**: `incomplete-materials-before-expiry-no-safe-bridge` AND
  `renewal-filing-window-not-after-expiry`
- **Diagnosis**:
  - `incomplete-materials-before-expiry-no-safe-bridge`: Group 1 (`材料不
    齐`) ✓. Group 2 (`到期`) ✓. anyOf — Q has `退回`/`窗口` which are not
    listed; no hit. Fix from Failure 9 (add `退回` to anyOf) covers this.
  - `renewal-filing-window-not-after-expiry`: Group 1 (`更新 / 续签 / 延签
    / 在留期間更新 / 在留期限`) — Q says `在留卡快到期`. `在留卡` ≠ `在留期
    限`; no Group 1 hit. Group 2 (timing words: `いつから / 几个月 / 3个月
    / 一周前 / 直前 / 期限後 / 特例期間` …) — Q has none.
- **Decision**: **A** for both.
- **Exact change**:
  1. `incomplete-materials-before-expiry-no-safe-bridge` anyOf — already
     covered by Failure 9 plan.
  2. In gate `renewal-filing-window-not-after-expiry`:
     - Group 1 add: `'在留卡'`, `'快到期'`, `'到期'`, `'快过期'`
     - Group 2 add: `'材料不齐'`, `'不齐'`, `'退回'`, `'直接退'`, `'窗
       口'`
- **Risk**:
  - `renewal-filing-window-not-after-expiry` Group 1 widening: `到期` /
    `在留卡` are common. Group 2 widening also broad. Combined, any Q
    with `到期` + `窗口` triggers. RC60 negs check:
    - N01 (`短期来日本…会议`) — no `到期`/`在留卡`/`快到期`/`快过期` →
      safe.
    - N06 (住民税分期) — no Group 1 hit → safe.
    - N08 (搬家) — no `到期` → safe.
    - Others — safe.
  - RC56 positives unaffected (`A04-minashi-reentry`, `C03-incomplete-
    material-before-expiry` etc. trigger via existing terms).

---

## Failure 11 — `F09-business-manager-new-job-followup`

- **Q**: 刚才说经管公司休眠。补充一下，我朋友公司已经让我下周入职，我可以先去吗？
- **Expected**: `pending-status-change-current-activity-only` AND
  `business-manager-disposition-no-auto-success`
- **Currently triggers**: `business-manager-disposition-no-auto-success`
  only (already passes via `休眠` + `入职` chain). Missing only
  `pending-status-change-current-activity-only`.
- **Diagnosis**: same as DW06 for the missing gate. Q has `入职`, but
  `pending-status-change-current-activity-only` Group 1 wants explicit
  `变更申请` / `申請中` / `受理` / `特例期間` markers. Q has none.
- **Decision**: **A**. Same fix as Failure 5 (add `换工作 / 转工作 / 入职 /
  入社 / 新公司 / 新工作 / 新雇主 / 办变更 / 想变更 / 要变更 / 再办变更`
  to `pending-status-change-current-activity-only` Group 1) covers both
  DW06 and F09.
- **Risk**: see Failure 5.

---

## Summary of A/B/C decisions

- **A (pattern fix)** — 10 failures:
  M14, B02, DW05, DW06, DW07, DW11, DW12, F03, F06, F09
- **B (reword question)** — 1 failure: B12
- **C (new gate)** — 0

## Consolidated edit list for engineer

All edits in `lib/consultation/route-gates.ts`. Apply in this order to
minimize churn:

1. Top-of-file constant `NOTICE_TERMS` — append for Failure 7:
   `'寄信'`, `'寄来信'`, `'入管寄'`, `'入管来信'`, `'入管的信'`,
   `'入管来的信'`, `'手紙'`, `'手纸'`, `'お手紙'`, `'一封信'`,
   `'说明情况'`, `'说明情況'`, `'去说明'`, `'让我去'`, `'要我去'`.
2. Gate `pr-basic-requirements-not-years-only` `match.allOf[1]` — append
   per Failure 1: `'证明'`, `'证書'`, `'証明書'`, `'准备'`, `'第一批'`,
   `'材料清单'`, `'看自己'`.
3. Gate `incomplete-materials-before-expiry-no-safe-bridge`:
   - `match.allOf[0]` append per Failure 2: `'不完整'`, `'不完整材料'`,
     `'决算书'`, `'決算書'`, `'还没出来'`, `'还没出'`, `'还没出齐'`,
     `'没出来'`.
   - `match.allOf[1]` append per Failures 9/10: `'续签'`, `'延签'`,
     `'续'`, `'换公司'`, `'换工作'`.
   - `match.anyOf` append per Failures 9/10: `'退回'`, `'直接退'`,
     `'退'`, `'来不及'`, `'窗口'`.
4. Gate `application-truthfulness-no-false-info` `match.allOf[0]` —
   append per Failure 4: `'写高了'`, `'写多了'`, `'写大了'`, `'多写
   了'`, `'多写一点'`, `'写高一点'`, `'美化'`, `'灌水'`.
5. Gate `pending-status-change-current-activity-only` `match.allOf[0]` —
   append per Failures 5/11: `'办变更'`, `'再办变更'`, `'想变更'`,
   `'要变更'`, `'换工作'`, `'转工作'`, `'转去'`, `'入职'`, `'入社'`,
   `'新公司'`, `'新工作'`, `'新雇主'`.
6. Gate `business-manager-disposition-no-auto-success` `match.allOf[1]`
   — append per Failure 5: `'没收入'`, `'无收入'`, `'没业务'`, `'没营
   业'`, `'停业'`, `'没生意'`, `'生意没了'`, `'公司没'`, `'半年没'`.
7. Gate `notification-duty-violation-not-harmless` `match.allOf[1]` —
   append per Failure 6: `'不用管'`, `'不用做'`, `'不用补'`, `'不需要
   做'`, `'不需要管'`, `'不必做'`, `'不必管'`.
8. Gate `status-cancellation-before-expiry-boundary` `match.allOf[1]` —
   append per Failures 6/7: `'再婚'`, `'届出'`, `'届け出'`, `'取消'`,
   `'在留资格'`, `'在留資格'`, `'资格取消'`, `'資格取消'`. (Optional
   `'通知'` — broader; keep behind a deliberate decision.)
9. Gate `renewal-filing-window-not-after-expiry`:
   - `match.allOf[0]` append per Failure 10: `'在留卡'`, `'快到期'`,
     `'到期'`, `'快过期'`.
   - `match.allOf[1]` append per Failure 10: `'材料不齐'`, `'不齐'`,
     `'退回'`, `'直接退'`, `'窗口'`.
10. Gate `hsp2-not-automatic-not-pr` `match.allOf[0]` — append per
    Failure 8: `'高度专门职'`, `'高度专门職'`, `'高度人才'`, `'高才'`.

## AQL pack edit (Failure 3 only)

In `docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json`, item with
`starter_tag: "0.8.5-rc60-B12-short-stay-paid-project"`, change
`question_text` from:

> 我短期来日本，帮日本客户做一个两周的有偿项目，钱打到海外账户，可以吗？

to:

> 我现在拿的是短期签来日本，帮日本客户做一个两周的有偿项目，钱打到海外账户，可以吗？

Justification: distinguishing this from the legitimate `N01-short-stay-
meeting` negative control requires the visa-class word. Other failures
take the gate-pattern path; this one cannot without unsafe overmatch on
N01.

## RC60 negative-control baseline (pre-existing overmatches, FYI)

These are not introduced by this proposal — they exist in main today.
Listed so engineer can confirm none of them get worse after applying the
plan:

- N01 — clean (none).
- N02 — `residence-card-expiry-vs-status-period`,
  `pr-card-renewal-still-required` (overmatches via `卡` + `永住`
  conflation).
- N03 — `immigration-notice-taxonomy-first`,
  `individual-duty-not-replaced-by-third-party`,
  `notification-duty-violation-not-harmless`.
- N04 — `status-cancellation-before-expiry-boundary`.
- N05 — `gijinkoku-work-scope-not-any-job`.
- N06 — clean.
- N07 — clean.
- N08 — `address-change-card-window-dual-duty` (this is the *expected*
  trigger — N08 has expected_route_gate set non-empty).
- N09 — `residence-card-expiry-vs-status-period`,
  `pr-card-renewal-still-required`.

After applying this plan, expected delta to negatives:
- N03 may additionally pick up `immigration-notice-taxonomy-first` paths
  via `通知` (already triggered today, no change).
- N04 may pick up `status-cancellation-before-expiry-boundary` via the
  new `通知` term — but already triggered today.
- All others unchanged.

## Open items needing DOMAIN / founder input

None for the patterns themselves. One soft call for engineer:

- In Failure 6, optional `'通知'` addition to
  `status-cancellation-before-expiry-boundary` Group 2 is the most
  permissive expansion. If you want to be conservative, drop it — DW07
  still passes via `'再婚'`/`'届出'`, and DW11 still passes via the
  Failure-7 `取消`/`在留资格` additions. Recommendation: drop `'通知'`.
