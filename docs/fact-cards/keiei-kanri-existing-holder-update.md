---
fact_id: keiei-kanri-existing-holder-update
title: 既存の経営・管理ビザ保持者の更新時 — 2028-10-15 までの過渡措置
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false   # high risk does not require this flag (only critical does)
last_verified_at: 2026-05-07
reviewer: ai_self_verified
sprint: 0.6 / Workstream C
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: Claude Opus 4.7 / WebFetch (re-uses fact-001 collection)
  source_count: 1
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-10-00237
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁 (法務省)
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-001448070
    url: https://www.moj.go.jp/isa/content/001448070.pdf
    title: 改正ガイドライン PDF
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-07
    quoted_in_card: false
    needs_human_fetch: true
applies_to:
  - 経営・管理 在留期間更新許可申請（2025-10-16 以降に申請するもの）
direct_fact_fields:
  - existing_holder_3y_transition_window_until_2028_10_15
  - within_window_partial_compliance_allowed
  - within_window_overall_assessment_keiei_genjou_kaizen_mikomi
  - after_window_full_compliance_required
  - filed_before_2025_10_16_old_standard_applies
ai_inferred_fields:
  - early_consultation_with_gyousei_shoshi_recommended_for_below_3000man
related_fact_cards:
  - keiei-kanri-2025-10   # 新規申請の新基準（本卡の参照基準）
needs_review_flags:
  - id: kaizen_mikomi_unyou_kijun
    reason: 「経営状況・改善見通しを総合考量」の運用上の判断基準（具体的に何が改善見通しと認められるか）は公式ページに明示なし。改正ガイドライン PDF (moj-isa-001448070) または不許可事例で要確認。
---

# 既存の経営・管理ビザ保持者の更新時 — 2028-10-15 までの過渡措置

> **AI extraction status**: `ai_verified` — pulled from MOJ-ISA
> official page on 2026-05-07. risk=high, confidence=high.
> **Production injection**: ENABLED (high + ai_verified, no per-field withhold beyond noted needs_review_flag).

---

## current_date_logic

```
今日 (TODAY) >= 2025-10-16 AND TODAY <= 2028-10-15 → 過渡措置期間内：本卡を適用。
今日 (TODAY) >  2028-10-15                            → 過渡措置失効：本卡は無効、新基準完全適合が必要。
今日 (TODAY) <  2025-10-16                            → 改正未施行、本卡不適用（歴史快照）。
```

ユーザーが「既に経営・管理ビザを所持している」「次回更新が来る」「来年（2027 / 2028）更新する」
等の信号を出した場合、本卡が適用される。

新規申請者（既存ビザなし）には本卡を適用しない（その場合は `keiei-kanri-2025-10` 新規基準を参照）。

---

## current_effective_fact

### 1. 過渡措置期間：施行日から3年（〜2028-10-15）

> 原文: 「施行日から３年を経過する日（令和１０年１０月１６日）までの間に在留期間更新許可申請を行う場合については、改正後の基準に適合しない場合であっても」許可可能
> source: moj-isa-10-00237

施行日 (2025-10-16) から 3 年経過する日 (令和10年 / 2028年 10月16日) **の前日 = 2028-10-15** までに
在留期間更新許可申請を行う既存保持者は、過渡措置の対象。

### 2. 過渡措置期間内：新基準への完全適合は不要

> 原文: 「改正後の基準に適合しない場合であっても」許可可能
> source: moj-isa-10-00237

3,000万円資本金等の新基準を完全に満たさない場合でも、即座に不許可とはならない。

### 3. 総合考量：経営状況 + 改善見通し

> source: moj-isa-10-00237

許可可否は経営状況と改善見通しを総合的に考量して判断される。

**※ ただし「経営状況・改善見通し」の具体的な認定基準は公式ページに明示されておらず、
運用判断は要確認**（needs_review_flag: kaizen_mikomi_unyou_kijun）。

### 4. 過渡措置経過後：完全適合必要

> source: moj-isa-10-00237

2028-10-16 以降の更新申請では、改正後の新基準（資本金 3,000万円以上、常勤職員、
日本語、学歴/経験 等）に**完全に適合**することが求められる。

### 5. 施行日前に既に申請受理されている場合

> 原文: 「施行日の前日までに受付し、審査を継続している…については改正前の許可基準を適用」
> source: moj-isa-10-00237

2025-10-15 までに更新・変更申請が受付・審査継続中の案件は、改正前の旧基準で審査される。

---

## exceptions_or_transition

本卡そのものが過渡措置の解説。例外なし。

ただし以下のケースは別カード参照：

- 新規上陸申請 / 在留資格変更 → `keiei-kanri-2025-10`
- Startup visa (特定活動) からの移行 → `startup-visa-to-keiei-transition`（fact-003、未作成）

---

## common_user_phrases

中文（主要トリガー）：

- 我已经有经管签了，明年要更新需要凑齐 3000 万吗
- 经管签更新是不是也按新规则
- 我现在在留是经管，下次续签条件是什么
- 经管签持有人更新过渡期是多久
- 我 2027 年要续经管签，要准备多少
- 经管签更新可以申请几次过渡
- 经管 2028 年以后续签会怎样
- 现在持有的经管签会因为新规失效吗

技術キーワード（マッチャ用）：

- 経営管理 / 经营管理 / 经管 / 經管
- 更新 / 续签 / 続柄更新 / 在留期間更新
- 過渡 / 過渡措置 / 经过措施 / 经过期 / 过渡期
- 既存 / 既保持 / 现持有
- 2028 / 令和10年

---

## must_say

回答に含めるべき要点：

1. 既存保持者は施行日から3年（2028-10-15 まで）の過渡措置の対象
2. 過渡措置期間内は新基準（3,000万円等）に完全適合しなくても不許可とは限らない
3. ただし「経営状況・改善見通しの総合考量」が判断基準になる
4. 2028-10-16 以降の更新は完全適合が必要 → **早めの体制整備を推奨**
5. 施行日前に申請受理済みの案件は旧基準で審査
6. 過渡措置の運用判断は不確実性あり → 行政書士早期相談を推奨

## must_not_say

以下の表現は**絶対に出してはならない**：

- ❌ 「既存保持者にも即座に 3,000万円が必須」
- ❌ 「過渡措置がないので今すぐ新基準を満たす必要がある」
- ❌ 「過渡期間内なら何でも許可される」
- ❌ 「総合考量だから心配不要」
- ❌ 「2028年以降も従来通り更新できる」
- ❌ 「絶対に通る」「100%許可」「大丈夫」
- ❌ 過渡措置を新規申請者に誤適用するような曖昧な表現

---

## qa_cases

### QA-1 — 既存持有人が来年更新を控えている典型

**user**: 我已经有经管签了，明年要更新，需要凑齐 3000 万吗？

**must_have**:

- 過渡措置の存在（施行日から3年、〜2028-10-15）の言及
- 過渡期間内は完全適合不要だが「経営状況と改善見通しの総合考量」で判断される旨
- 2028-10-16 以降は完全適合必要 → 早めの体制整備推奨
- 行政書士相談の推奨

**must_not_have**:

- 「すぐに 3,000万円が必須」
- 過渡措置の存在を完全省略
- 「総合考量だから問題ない」と楽観表現

### QA-2 — 過渡期の長さ確認

**user**: 经管签持有人的过渡期是多久？

**must_have**:

- 施行日 (2025-10-16) から 3 年
- 具体的期限：2028-10-15 までの更新申請
- 期限後は完全適合必要

**must_not_have**:

- 「無期限」「3 年以上」「永続的に有効」等の不正確な期間表現
- 期限を曖昧に表現

### QA-3 — 2028 年以降を心配する用户

**user**: 我经管签 2029 年才到期，到时候续签会怎么样？

**must_have**:

- 2028-10-16 以降は過渡措置が失効
- 完全適合（資本金 3,000万円、常勤職員、日本語、学歴/経験）が必要
- 早めに体制整備を始めるべき
- 個別状況により行政書士相談を推奨

**must_not_have**:

- 「2029 年もまだ過渡期」
- 完全適合不要と誤って伝える
- 過渡措置が延長される旨の確証なし保証

### QA-4 — 施行日前に申請済の用户

**user**: 我去年（2025 年 9 月）就提交了经管签更新申请，现在还在审查，会按新规吗？

**must_have**:

- 2025-10-15 までに受付・審査継続中の案件は改正前の旧基準で審査される
- 当該ケースは旧基準適用の対象
- 但し具体的な受付状況は出入国在留管理庁に確認推奨

**must_not_have**:

- 「すべて新基準が適用される」
- 「再提出が必要」（過渡措置の文言からは導けない）

---

## injection_format (for ENGINE C6)

### injection_certain_block

```text
【今日の有効な事実 — 経営・管理ビザ 既存保持者の更新 過渡措置】

以下は出入国在留管理庁の公式公表（moj.go.jp/isa/applications/resources/10_00237.html）に基づく現行基準である。
今日の日付は {{TODAY_ISO}} であり、改正施行日 (2025-10-16) を経過し、過渡措置の期間内（〜2028-10-15）にある。

既存の経営・管理ビザ保持者が在留期間更新許可申請を行う場合：

1. 施行日から3年（〜2028-10-15）の過渡措置期間内
   - 改正後の新基準（資本金 3,000万円、常勤職員、日本語、学歴/経験 等）に
     完全に適合しない場合であっても許可される可能性がある
   - ただし「経営状況・改善見通しを総合考量」して判断される
   - 完全適合不要だが、改善見通しが示せない場合は不許可リスクあり

2. 2028-10-16 以降の更新
   - 過渡措置は失効
   - 改正後の新基準への完全適合が必要

3. 2025-10-15 までに更新申請が受付・審査継続中の案件
   - 改正前の旧基準で審査される

回答時の方向性：
- 既存保持者には新規申請カードの「3,000万円が即座に必須」を適用しない
- 過渡措置の期限 (2028-10-15) を明示する
- 期限後の完全適合に向け、早めの体制整備を推奨する
- 「経営状況・改善見通しの総合考量」の具体的運用は不確定であるため、
  個別ケースは行政書士に確認するよう推奨する

避けるべき表現：
- 「過渡期間内なら何でも許可される」と楽観する
- 「2028 年以降も従来通り更新できる」
- 「絶対に通る」「100%許可」「大丈夫」

回答スタイル：
- 「根据当前已确认的官方信息、…」のような hedged 表現
- 期限・条件を具体的に提示し、不確定な運用判断は行政書士確認に逃がす
```

### injection_needs_review_addendum (NOT injected as facts; hint-only)

```text
本回答に関連して、「経営状況・改善見通しの総合考量」の具体的な認定基準
（どのような改善計画が認められるか、不許可事例にどのようなパターンがあるか）は、
最新の改正ガイドラインや行政書士に確認することを推奨します。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (Claude Opus 4.7 / re-using fact-001 WebFetch) | initial AI extraction with self-verification | — | ai_verified | source: moj-isa-10-00237; risk=high (時限のある運用判断、誤れば更新影響); related_fact_cards links to fact-001 |

## Audit assignment

- `risk_level: high` → enters DOMAIN audit queue (priority 2, after critical fact-001)
- Once a human reviewer audits and the certain_block is verified, set `state: human_reviewed`
- The single `needs_review_flag` (kaizen_mikomi_unyou_kijun) should be resolved by either:
  - DOMAIN/書士 supplying運用基準 from 不許可事例集 / 改正ガイドライン PDF, or
  - Promoting the field to direct_fact_fields with the new source citation
