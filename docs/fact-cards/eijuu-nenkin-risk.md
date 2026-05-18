---
fact_id: eijuu-nenkin-risk
title: 永住申請における年金・税金・健康保険 未納リスク
state: ai_extracted   # 2026-05-18 Loop19: L5_ONLY until general 永住 source periods and exemption/gap handling are rewritten.
runtime_bucket: L5_ONLY
risk_level: critical
confidence: medium   # DOMAIN-CC audit 2026-05-07: downgraded from high. Core 消極的評価 quote is high-confidence (nyukan50 direct), but nenkin/kenko_hoken 2-year + juuminhzei 3-year period fields are sourced from 高度人材 page (nyuukoku07-00133), not the general applicant page. general_applicant_lookback is ai_inference. Upgrade to high after FACT verifies from general applicant source.
source_quality: official
controlled_alpha_eligible: false   # 2026-05-12: confidence=medium のため critical production direct injection から外す。direct evidence は保持し、回答では要核对资料として利用。
last_verified_at: 2026-05-07
reviewer: ai_self_verified
sprint: 0.6 / Workstream C / Batch 1
citation_label: "永住申請（年金・税・健康保険の未納リスク）"
citation_summary: "永住許可ガイドラインでは、公的義務（納税・公的年金・公的医療保険の保険料納付等）を適正に履行していることが求められ、当初の納付期限内に履行されていない場合は、申請時点で納付済みでも原則として消極的に評価される。提出対象期間や免除・空白期間の扱いは申請ルートごとの確認が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住申請を検討中で年金・税・健保の納付記録への影響を確認したい"
  - "年金保険料の未納・猶予・免除期間が永住申請に影響するか確認したい"
  - "住民税の滞納が永住申請の審査に影響するか確認したい"
  - "健康保険の加入記録が永住審査の考慮要素になるか確認したい"
does_not_cover:
  - "永住申請の在留期間・就労期間要件（eijuu-zairyu-kikan 参照）"
  - "脱退一時金（日本出国後の年金返還制度 — nenkin-dattai-ichijikin 参照）"
  - "住民税の課税証明書・納税証明書の取得方法（juminzei-kazei-shomeisho 参照）"
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: claude-sonnet-4-6 (FACT-OPS Batch 1, WebFetch from official ISA/MOJ sources)
  source_count: 2
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-nyukan50
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン（令和８年２月２４日改訂版）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-nyuukoku07-00133
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00133.html
    title: 高度人材外国人の永住許可申請における書類要件
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
applies_to:
  - 永住許可申請（新規）
  - 永住許可申請（在留資格変更後の申請を含む）
  - 高度専門職保持者による特別永住申請
direct_fact_fields:
  - koutetsu_gimu_definition
  - chien_nofufu_negative_evaluation
  - nenkin_2nen_document_requirement
  - kenko_hoken_2nen_document_requirement
  - juuminhzei_3nen_document_requirement
ai_inferred_fields:
  - general_applicant_lookback_same_as_kodo_jinzai
  - practical_rejection_probability_from_chien_nofufu
needs_review_flags:
  - id: general_applicant_lookback_verification
    reason: 直近2年（年金・健保）・直近3年（住民税）の期間要件は高度人材外国人ページから確認。一般申請者向けの書類要件ページで同一要件であることを要確認。
  - id: kokumin_nenkin_menjo_months_threshold
    reason: 国民年金免除期間が申請審査に与える影響（承認申請による正規免除と未納の区別）は官方公表ページに明示なし。実務運用確認が必要。
  - id: shakaihoken_gap_tolerance
    reason: 転職時の社会保険空白期間（例：退職→翌月加入）の許容範囲は明示なし。
related_links:
  - title: "永住許可に関するガイドライン（令和８年２月２４日改訂版）"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住許可に関するガイドライン（令和８年２月２４日改訂版）"
    locator: "ページ内で「永住許可に関するガイドライン」を検索"
    relation: "official_reference"
  - title: "高度人材外国人の永住許可申請における書類要件"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00133.html"
    organization: "出入国在留管理庁"
    display_label: "高度人材外国人の永住許可申請における書類要件"
    locator: "ページ内で「高度人材外国人の永住許可申請における書類要件」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "永住許可に関するISAガイドラインにおける公租公課の納付義務：「公租公課を適切に納付していること」が消極的評価要因とならないことが求められる。年金・住民税・健康保険の未納・滞納は「日本の法律を遵守していない」として消極的評価を受ける可能性がある。"
    source_title: "出入国在留管理庁：永住許可に関するガイドライン（令和８年２月２４日改訂版）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ガイドライン内「公租公課の適切な納付」「消極的評価要因」の記述を確認"
    display_label: "永住申請：公租公課未納は消極的評価要因（ISAガイドライン）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "高度専門職永住申請の書類要件（一般申請と同一要件かは`general_applicant_lookback_verification`確認要）：年金保険料の直近2年分の支払記録・健康保険の直近2年分の記録・住民税の直近3年分の課税証明・納税証明書の提出が求められる。"
    source_title: "出入国在留管理庁：高度人材外国人の永住許可申請における書類要件"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00133.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「年金記録」「健康保険」「住民税」の提出書類一覧を確認"
    display_label: "高度専門職の永住申請書類：年金・健保2年分・住民税3年分"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
  - claim: "申請時点で未納分を一括納付しても遅延の事実自体が消極的評価される：「申請時点において納税（納付）済みであったとしても、当初の納税（納付）期間内に履行されていない場合は、原則として消極的に評価されます」（ISAガイドライン直接引用）。"
    source_title: "出入国在留管理庁：永住許可に関するガイドライン（令和８年２月２４日改訂版）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ガイドライン内「当初の納税（納付）期間内に履行されていない場合は、原則として消極的に評価されます」の記述を確認"
    display_label: "申請前に補払いしても遅延の事実は消極評価（ISAガイドライン直接引用）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住申請における年金・税金・健康保険 未納リスク

---

## current_date_logic

```
このカードの事実は時間的なON/OFFがない（常時有効）。
永住許可ガイドラインは令和8年（2026年）2月24日に改訂済み。
申請時点の最新版ガイドラインが適用される。
```

---

## current_effective_fact

### 公的義務の定義（ガイドライン 国益要件 1(3)イ）

> 「公的義務（納税、公的年金及び公的医療保険の保険料の納付並びに
> 出入国管理及び難民認定法に定める届出等の義務）を適正に履行していること」
> source: moj-isa-nyukan50

3種類の公的義務が同時に求められる：

1. **納税**（住民税・国税）
2. **公的年金**の保険料の納付
3. **公的医療保険**の保険料の納付

### 「申請前に急いで払えばOK」はNGである（最重要）

> 「申請時点において納税（納付）済みであったとしても、当初の
> 納税（納付）期間内に履行されていない場合は、原則として
> 消極的に評価されます」
> source: moj-isa-nyukan50

**意味**：申請直前に滞納分を一括納付しても、遅延した事実自体が
「原則として消極的に評価」される。過去にさかのぼって審査される。

### 年金：直近2年間の納付証明が必要

「直近２年間において国民年金に加入していた期間がある方は、
当該期間分の領収証書（写し）を全て提出」し、
**納付期限後の納付がないことを証明**する必要がある。
> source: moj-isa-nyuukoku07-00133

提出書類例（いずれか）：
- 年金事務所発行の被保険者記録照会回答票（納付Ⅰ・Ⅱ）
- ねんきん定期便（全期間表示版）
- ねんきんネット「各月の年金記録」印刷

### 健康保険：直近2年間の納付証明が必要

「直近２年間において国民健康保険に加入していた期間がある方は、
当該期間分の領収証書（写し）を全て提出」し、
**遅延納付がないことを証明**する必要がある。
> source: moj-isa-nyuukoku07-00133

提出書類例：
- 健康保険被保険者証（写し）または国民健康保険被保険者証（写し）
- 国民健康保険料（税）納付証明書・領収証書

### 住民税：直近3年分の証明が必要

「直近３年分の住民税の課税（又は非課税）証明書及び納税証明書」を提出。
> source: moj-isa-nyuukoku07-00133

**給与天引き（特別徴収）の場合**：
「直近３年間の全ての期間において住民税が特別徴収（給与から天引き）
されている方は、納付証明・領収証書は不要。課税証明書のみ提出」

---

## exceptions_or_transition

| 状況 | 取り扱い |
|------|----------|
| 国民年金保険料の**正規免除**（低所得・育児・失業等） | 免除承認を受けた期間は未納とは異なる。ただし審査への影響は個別判断（needs_review）|
| 社会保険加入者（会社員）の健康保険 | 会社経由で適正に天引きされていれば通常問題なし |
| フリーランス・個人事業主の国民年金・国民健保 | 全額自己管理のため未納リスクが高い。遡及確認が必須 |
| 転職時の空白期間（退職〜次の会社加入） | 空白期間の国保加入・保険料納付状況を要確認（needs_review）|

---

## common_user_phrases

主要トリガー（中文）：

- 永住申请需要交几年的年金
- 我之前有段时间没交年金，能申请永住吗
- 永住申请需要什么税务材料
- 我年金交了一部分，有空白期，影响永住吗
- 永住申请要查多少年的记录
- 年金免除的话永住申请会有问题吗
- 我自由职业，年金和健保自己交，申请永住需要准备什么
- 搬家后没更新住民票，永住申请会不会有影响

副次トリガー（关联话题）：

- 从就劳签申请永住需要什么条件
- 永住申请被拒的常见原因
- 高度人才签证申请永住

技術キーワード（マッチャ用）：

- 永住 / 永住申请 / 永住許可 / 永住申請
- 年金 / 国民年金 / 厚生年金 / 年金保険料
- 健保 / 健康保険 / 国民健康保険 / 国保
- 税金 / 住民税 / 所得税 / 納税
- 滞納 / 未払い / 未纳 / 払い忘れ / 空白期
- 直近2年 / 直近3年 / 公的義務

---

## must_say

1. 公的義務の対象は「納税・公的年金・公的医療保険」の3種類すべて
2. 申請直前に滞納を一括解消しても「原則として消極的に評価」される——遅延の事実自体が問題になる
3. 年金・健康保険・住民税の提出対象期間は申請ルートごとに公式資料で確認する必要がある
4. 高度人材外国人向けページでは、年金・健康保険の直近2年分、住民税の直近3年分が確認されている（一般申請者へ同一適用かは確認要）
5. 「期限内」納付かどうかが重要。実際に払ったかどうかだけではない
6. 永住申請を考えているなら、今すぐ自分の年金・健保・税金の記録を確認することを強く推奨
7. 高リスク案件（未納期間あり・免除あり・フリーランス）は行政書士に事前相談を推奨

## must_not_say

- ❌ 「申請前に払えば問題ありません」
- ❌ 「多少の未納は審査に影響しません」
- ❌ 「会社員なら天引きされているから気にしなくていいです」（健保種別・転職空白期間を無視した発言）
- ❌ 「年金免除していれば払わなくても大丈夫です」（免除≠未納だが影響は個別確認が必要）
- ❌ 「一般永住でも高度人材向けページと同じ年数で確定です」（一般申請者ページで確認要）
- ❌ 国税については触れずに住民税だけ説明する（納税証明には両方が必要）

---

## qa_cases

### QA-1 — 年金未納後に急いで払った場合

**user**: 去年有几个月没交年金，申请永住前补交了，这样可以吗？

**must_have**:
- 申請時点で納付済みでも、期限内に納付していない場合は「原則として消極的に評価」される旨
- 遅延の事実自体が問題になると説明
- 直近2年間が審査対象
- 行政書士に事前相談を推奨

**must_not_have**:
- 「補交すれば問題なし」
- 「少し遅れた程度なら大丈夫」

**bad_answer_example**: 「未納分を補って納付していれば、審査には影響しません」

**good_answer_criteria**: 補交したとしても遅延した事実が審査に影響する可能性があること、早めに専門家（行政書士）に相談することを明確に伝える。

---

### QA-2 — 必要書類の年数確認

**user**: 永住申请需要准备几年的年金和税务证明？

**must_have**:
- 年金・健康保険：直近2年間
- 住民税：直近3年分
- 給与天引きの場合と自己納付の場合で提出書類が異なる旨

**must_not_have**:
- 「直近1年で十分」
- 年金のみ・税金のみを説明して一方を省略

**bad_answer_example**: 「直近1年分の年金領収書と住民税証明書を準備してください」

**good_answer_criteria**: 年金・健保は2年、住民税は3年と正確に答え、給与天引きか自己納付かで書類が変わることにも触れる。

---

### QA-3 — 自由職業者の場合

**user**: 我是自由职业者，年金和健保自己交，申请永住有什么要注意的？

**must_have**:
- 国民年金・国民健康保険は自己管理のため未納・遅延リスクが会社員より高い
- 直近2年の全期間の領収証書を保管・提出する必要がある
- 「納付期限後の納付がないこと」が条件
- 記録照会（ねんきんネット等）で早めに確認することを推奨
- 行政書士への事前相談推奨

**must_not_have**:
- 「自由職業でも条件は会社員と同じです（問題ありません）」と安易に答える
- 自己納付に伴うリスクに言及しない

**bad_answer_example**: 「自由職業でも年金と健保の証明書を提出すれば問題ありません」

**good_answer_criteria**: 自己管理のため遅延リスクが高いこと、全期間の領収書保管が必須であること、不安な場合は行政書士に事前確認を強く勧める。

---

### QA-4 — 国民年金免除期間の影響

**user**: 我申请过年金免除，免除期间算未交吗？

**must_have**:
- 正規の免除申請・承認を受けた期間は「未納」とは法的に異なる
- ただし審査への影響は個別ケースによるため断定できない（needs_review）
- 免除承認書・免除決定通知書を保管しておくよう推奨
- 行政書士または年金事務所への確認を推奨

**must_not_have**:
- 「免除期間は永住審査に影響しません」と断言
- 「未納と同じ扱いになります」と断言

**bad_answer_example**: 「正規に免除申請した期間であれば審査には全く問題ありません」

**good_answer_criteria**: 免除≠未納という法的区別を説明しつつ、審査への実務的影響は確定情報がないため個別確認を推奨する。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 永住許可申請と公的義務の遅延納付】

以下は出入国在留管理庁「永住許可に関するガイドライン」（令和8年2月24日改訂）に基づく狭い事実。

永住許可申請では、申請者が以下の公的義務を「適正に履行」していることが必要：
- 納税（住民税・国税）
- 公的年金保険料の納付
- 公的医療保険料の納付

【最重要】申請前に急いで未納分を払っても、遅れた事実は消えない：
「申請時点において納税（納付）済みであったとしても、当初の納税（納付）期間内に履行されていない場合は、原則として消極的に評価されます」
→ 遅延した事実自体が審査で不利に働く。

提出対象期間・証明書類は申請ルートによって確認が必要：
- 高度人材外国人向けページでは、年金・健康保険の直近2年分、住民税の直近3年分が確認されている
- 一般永住申請者に同一の年数を断定する前に、該当ルートの公式資料または窓口で確認する

回答時の注意：
- 「払えば大丈夫」と言わない
- 「一度遅れたら必ず不許可」とも言わない
- 具体的な提出年数は申請ルートにより確認が必要と伝える
- 未納・遅延歴がある場合は行政書士に事前相談を強く推奨
- 免除期間の影響・転職時空白期間の影響は個別確認が必要と伝える（確定情報なし）
```

### injection_needs_review_addendum

```
※ 高度人材外国人向けページで確認されている提出対象期間（年金・健康保険2年、住民税3年）を一般永住申請者へ同一適用してよいかは確認中。
年金免除期間の審査への具体的影響、転職時の社会保険空白期間の許容範囲は、
最新の実務運用については出入国在留管理庁または行政書士に直接確認することを推奨します。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-18 | Codex Loop17 | 一般申請者 lookback・免除影響・空白期間判断は quarantine 継続。遅延納付は補納済みでも原則消極評価という公式 quote に injection を限定。 | ai_extracted | ai_extracted | loop17-rewrite |
| 2026-05-07 | AI (claude-sonnet-4-6 / FACT-OPS Batch 1) | initial extraction from moj-isa-nyukan50 + moj-isa-nyuukoku07-00133 | — | ai_extracted | ガイドライン令和8年2月24日改訂版を確認 |
| 2026-05-07 | AI self-verification | all direct_fact_fields sourced; needs_review_flags set for lookback generalization + 免除期間; certain_block + addendum split complete | ai_extracted | ai_verified | risk=critical |
| 2026-05-07 | GM (boundary correction) | controlled_alpha_eligible: true → false. FACT autopilot 越界 (FACT_OPS_WINDOW_TASK_PACK §9 明确：仅 PL 可设此字段为 true). critical 卡按 README state machine 默认走 human_reviewed gate. PR review 时由 PL 决定是否 signoff 翻 true. | ai_verified | ai_verified | GM correction |
| 2026-05-07 | DOMAIN-CC (domain-cc-tebiq) | REQUEST_EDIT audit. confidence high → medium: nenkin/kenko_hoken 2年 + juuminhzei 3年 の証明期間フィールドが高度人材専用ページ(nyuukoku07-00133)からの引用で、一般申請者への適用は ai_inference。一般申請者向けページ(nyuukoku07-00132等)での確認後に high へ再昇格可。core 消極的評価クォートは nyukan50 直引用で正確。内容自体の正確性は高いが sourcing 強化が必要。re-audit 不要。| ai_verified | ai_verified | REQUEST_EDIT — confidence downgraded; sourcing gap flagged |
| 2026-05-07 | GM (Batch 5) | PL signoff 2026-05-07 — Pack 2.2 prod inject 解锁，FACT_LAYER_ENABLED=true 5-门第 5 项进度。controlled_alpha_eligible: false → true。keyword coverage 追加（技術キーワード 6 bullets）。 | ai_verified | ai_verified | alpha flip + keyword coverage |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 4) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |

## Audit assignment

- `risk_level: critical` → DOMAIN/PL human audit queue (priority 1)
- `controlled_alpha_eligible: false` → 当前不进 Alpha frontend，DOMAIN audit + PL signoff 后再决定
- `needs_review_flags.general_applicant_lookback_verification` → 一般申請者ページ（非高度人材）の書類要件ページで「直近2年」「直近3年」が同一要件か確認要
- `needs_review_flags.kokumin_nenkin_menjo_months_threshold` → 免除期間の審査影響を DOMAIN/書士確認
- `needs_review_flags.shakaihoken_gap_tolerance` → 転職時空白期間の運用許容を DOMAIN/書士確認
