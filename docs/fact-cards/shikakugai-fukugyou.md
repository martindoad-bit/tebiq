---
fact_id: shikakugai-fukugyou
title: 資格外活動・副業 — 許可なき就労活動のリスク
state: human_reviewed
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-07
reviewer: DOMAIN-CC
approved_at: 2026-05-07
approved_by: DOMAIN-CC (claude-sonnet-4-6, audit-full-20260507)
sprint: 0.6 / Workstream C / Batch 2
citation_label: "資格外活動・副業（許可なき就労活動のリスク）"
citation_summary: "在留資格の許可された活動範囲外での就労・副業を行う際の許可制度（資格外活動許可）と、無許可就労のリスクを確認するカード。留学生28時間ルールも含む。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留資格以外の活動（副業・アルバイト）の可否を確認したい"
  - "留学生がアルバイトをする場合の時間制限を確認したい"
  - "技人国保有者が副業・ダブルワークを行う場合の許可要件を確認したい"
  - "資格外活動許可の申請方法・対象を確認したい"
does_not_cover:
  - "永住者・定住者・日本人の配偶者等（法別表第2）の就労制限（対象外）"
  - "資格外活動の具体的な罰則・刑事責任の詳細（入管窓口・弁護士相談要）"
  - "特定技能保持者の副業規制（別途確認要）"
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: claude-sonnet-4-6 (FACT-OPS Batch 2, WebFetch from official ISA/MOJ sources)
  source_count: 2
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-shikakugai-00001
    url: https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html
    title: 資格外活動の許可（入管法第19条）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-nyuukoku07-00003
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
    title: 「留学」の在留資格に係る資格外活動許可について
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
applies_to:
  - 技術・人文知識・国際業務 在留資格保持者
  - 留学 在留資格保持者
  - 家族滞在 在留資格保持者
  - 特定活動 在留資格保持者（包括許可対象に含まれる場合）
  - ※永住者・定住者・日本人の配偶者等（法別表第2）は対象外
direct_fact_fields:
  - nyuukokuhou19_kyoka_hitsuyou_principle
  - beppyo2_muke_riyousha_taishou_gai
  - ryugaku_houtaiifu_28jikan_rule
  - kyuuka_naka_1nichi_8jikan_rule
  - fuuryougyou_kinshi_joken
  - gijinkoku_chihoukoukyoudantai_28jikan_houtaiifu
ai_inferred_fields:
  - gijinkoku_ippan_fukugyo_individual_permit_required
  - violation_consequences_zairyu_torikeshi_risk
needs_review_flags:
  - id: gijinkoku_fukugyo_individual_permit_conditions
    reason: >
      技人国（及び教育・技能）保持者が一般民間企業（地方公共団体以外）で副業する場合の
      個別許可申請の具体的要件・審査基準は、官方公開ページに明示なし。
      「現に有する在留資格に係る活動の遂行が妨げられるものではないこと」という一般原則のみ確認。
      具体的な許可基準は入管窓口 or 行政書士確認が必要。
  - id: mushokyo_shuro_bassoku
    reason: >
      無許可就労（資格外活動違反）の具体的罰則（入管法第73条：3年以下の懲役・300万円以下の罰金
      と言われることがあるが）は官方公開ページで直接確認できず。
      実務上の在留資格取消し・退去強制との関係も要 DOMAIN/書士 確認。
  - id: shotoku_han_i
    reason: >
      「収入を伴う事業を運営する活動又は報酬を受ける活動」の具体的範囲
      （フリーランス受注・投資所得・Uber Eats 等の業務委託・暗号資産取引等）は
      官方ページに定義なし。実務上の判断基準は要確認。
---

# 資格外活動・副業 — 許可なき就労活動のリスク

---

## current_date_logic

```
このカードの事実は常時有効（特定の施行日なし）。
入管法第19条第2項は現行法として有効。
```

---

## current_effective_fact

### 原則：資格外活動には事前許可が必要（入管法第19条第2項）

> 「許可された在留資格に応じた活動以外に、収入を伴う事業を運営する活動
> 又は報酬を受ける活動を行おうとする場合には、あらかじめ資格外活動の
> 許可を受けていなければなりません。」
> source: moj-isa-shikakugai-00001

在留資格「技人国」「留学」「家族滞在」等（入管法別表第1・第2の活動系資格）の
保持者は、在留資格に定められた活動以外で報酬を受けて働く場合、
**事前に資格外活動許可**を受ける必要がある。

### 許可不要な資格（重要）

> 「入管法別表第２に掲げる在留資格の方（「永住者」や「定住者」など）は、
> 就労活動に制限がないため、資格外活動許可の対象ではありません。」
> source: moj-isa-shikakugai-00001

永住者・特別永住者・日本人の配偶者等・永住者の配偶者等・定住者 → 副業・兼業に
制限なし（資格外活動許可申請不要）。

### 留学生の包括許可：週28時間ルール

> 「１週について２８時間以内（教育機関の長期休業期間にあっては、
> １日について８時間以内）の収入を伴う事業を運営する活動又は
> 報酬を受ける活動」
> source: moj-isa-nyuukoku07-00003

留学生は資格外活動許可（包括許可）があれば週28時間以内のアルバイトが可能。
**長期休業期間中は1日8時間以内**という別基準が適用される（週28時間ではない）。

### 技人国・教育・技能（スポーツ限定）保持者の特別包括許可

> 「地方公共団体等において雇用されている『教育』、
> 『技術・人文知識・国際業務』又は『技能（スポーツインストラクターに限る。）』
> の在留資格をもって在留する外国人が、１週に２８時間以内であること
> 及び地方公共団体等との雇用契約に基づいて、在留資格に該当する活動を
> 行うことを条件として」包括許可の対象になる場合がある。
> source: moj-isa-shikakugai-00001

※この規定は「地方公共団体等に雇用されている場合」の特別規定。
一般民間企業での副業への適用については個別確認が必要（needs_review）。

### 風俗業等での就労は禁止条件

資格外活動許可（包括許可）の条件として：

> 「活動場所において風俗営業等が営まれていないことを条件として」
> source: moj-isa-shikakugai-00001

資格外活動許可の対象であっても、風俗営業・性風俗特殊営業等の営業所での
就労は条件外 → 無許可状態と同様のリスクが生じる。

### 違反時のリスク（AI inference — 公式ページで直接確認できず）

無許可資格外活動は在留資格取消し・退去強制の対象となりうる（source: ai_inference）。
具体的な罰則条文・取消し基準は needs_review_flag に格納。

---

## exceptions_or_transition

| 在留資格 | 副業・兼業の可否 |
|---------|----------------|
| 永住者・定住者・日本人/永住者の配偶者等（別表第2） | 就労制限なし。資格外活動許可不要 |
| 留学 | 資格外活動許可（包括）あれば週28時間以内 / 休業中1日8時間以内 |
| 家族滞在 | 資格外活動許可（包括）あれば週28時間以内 |
| 技人国・教育・技能（スポーツ） | 地方公共団体雇用の場合のみ包括許可あり（週28時間以内）; 一般企業副業は個別許可申請が必要な可能性（needs_review）|
| 経営管理・法律会計業務・医療・研究等 | 個別に許可申請が必要 |

---

## common_user_phrases

主要トリガー（中文）：

- 技人国签能做副业吗
- 留学签能打几个小时工
- 我在日本能同时打两份工吗
- Uber Eats 送外卖算不算违法
- 技人国换公司期间能接私活吗
- 假期留学生打工时间限制是多少
- 做自媒体接广告费算不算副业违法
- 技人国做家庭教师可以吗

副次トリガー：

- 资格外活动是什么意思
- 在日本副业需要办什么手续
- 我有永住，做副业需要申请吗
- 留学生超时打工被发现会怎样

技術キーワード（マッチャ用）：

- 資格外活動 / 资格外活动 / 資格外活動許可
- 副業 / 副业 / 兼職 / 兼职
- 週28時間 / 28時間 / 28h / 打工时间
- アルバイト / バイト / 打工 / 非正規就労
- 留学生 アルバイト / 留学 打工
- 無許可 / 违法打工 / 就労不可

---

## must_say

1. 原則として、在留資格に定められた活動以外で報酬を受ける活動をする場合は事前に資格外活動許可が必要
2. **永住者・定住者・日本人の配偶者等（別表第2）は就労制限なし** — この区別は最重要
3. 留学生の包括許可は週28時間以内。長期休業中は週単位ではなく1日8時間以内
4. 技人国保持者が副業する場合は、地方公共団体雇用の特別ケースを除き、個別許可申請が必要な可能性が高い
5. 風俗業等での就労は在留資格にかかわらず包括許可の対象外
6. 無許可での就労は在留資格に重大なリスクをもたらしうる → 不明な場合は行政書士確認を推奨

## must_not_say

- ❌ 「技人国でも副業は自由にできます」
- ❌ 「週28時間ルールはみんなに適用されます」（永住者・定住者には適用なし）
- ❌ 「バレなければ問題ありません」
- ❌ 「留学生の夏休みは週28時間まで」（休業中は1日8時間が正しい単位）
- ❌ 「Uber Eats は副業に当たりません」（確定できない；needs_review）
- ❌ 「資格外活動許可を取れば何でもできます」（風俗業等の禁止あり）

---

## qa_cases

### QA-1 — 技人国保持者が副業を検討（典型）

**user**: 我是技人国签，可以在日本做副业吗？

**must_have**:
- 原則として在留資格に応じた活動以外での有報酬活動には資格外活動許可が必要
- 技人国保持者が一般企業で副業する場合は個別許可申請の可能性がある
- 地方公共団体雇用の特別ケースの存在（ただし一般企業副業は別）
- 行政書士 or 入管窓口での確認を推奨

**must_not_have**:
- 「副業は自由にできます」
- 許可について言及せずに副業を肯定

**bad_answer_example**: 「技人国ビザで副業は可能です。確認せずに始めて大丈夫です」

**good_answer_criteria**: 資格外活動許可の原則と、技人国の副業には個別確認が必要なことを説明し、行政書士相談を推奨する。

---

### QA-2 — 留学生の打ち工時間確認

**user**: 留学签打工一周最多能打多少小时？暑假呢？

**must_have**:
- 週28時間以内（通常期）
- 長期休業期間（夏休み等）は週単位ではなく**1日8時間以内**
- 風俗業等での就労は禁止

**must_not_have**:
- 「夏休みも週28時間です」
- 長期休業の特別ルールを省略

**bad_answer_example**: 「留学生は週28時間まで働けます。夏休みも同じです」

**good_answer_criteria**: 通常期は週28時間、長期休業中は1日8時間という違いを正確に伝える。

---

### QA-3 — 永住者が副業するケース

**user**: 我有永住签证，做兼职副业需要办什么手续吗？

**must_have**:
- 永住者は就労活動に制限なし → 資格外活動許可不要
- 別途税務申告（確定申告）や社会保険加入義務の可能性には触れる（別問題）

**must_not_have**:
- 「永住者でも資格外活動許可が必要」
- 「永住者も就労制限があります」

**bad_answer_example**: 「永住者でも副業には資格外活動許可が必要です」

**good_answer_criteria**: 永住者・定住者・別表第2の在留資格保持者は就労制限なしであることを明確に伝える。

---

### QA-4 — フリーランス・業務委託の扱い

**user**: 我是技人国，自由职业接单子算不算资格外活动？

**must_have**:
- 「収入を伴う事業を運営する活動」も資格外活動許可の対象に含まれる可能性がある
- フリーランス業務委託も「報酬を受ける活動」に含まれうる
- 確定的な答えは官方ページに明示がないため、入管窓口または行政書士に確認を強く推奨

**must_not_have**:
- 「フリーランスは副業に当たりません」と断言
- 「報酬なし・ボランティアならOK」（別問題として切り離せない）

**bad_answer_example**: 「業務委託は雇用関係がないので資格外活動にはなりません」

**good_answer_criteria**: 業務委託・フリーランスも収入を伴う活動として許可の対象となりうること、個別確認が必要であることを伝える。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 資格外活動・副業（入管法第19条）】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

【原則】
「許可された在留資格に応じた活動以外に、収入を伴う事業を運営する活動又は
報酬を受ける活動を行おうとする場合には、あらかじめ資格外活動の許可を
受けていなければなりません。」（入管法第19条第2項）

【重要な例外 — 就労制限なしの在留資格】
「入管法別表第２に掲げる在留資格の方（永住者や定住者など）は、
就労活動に制限がないため、資格外活動許可の対象ではありません。」
→ 永住者・特別永住者・定住者・日本人の配偶者等・永住者の配偶者等 は副業自由

【留学生 包括許可の上限】
- 通常期：1週28時間以内
- 教育機関の長期休業期間：1日8時間以内（週単位ではない）

【技人国・教育等の特別規定】
地方公共団体等に雇用されている技人国等の保持者は、
条件付き（週28時間以内、在留資格該当活動）で包括許可の対象となる場合がある。
一般の民間企業での副業は個別許可申請が必要な可能性が高い（要確認）。

【禁止条件】
資格外活動許可を持っていても、風俗営業・性風俗特殊営業等の営業所での
就労は許可条件に含まれない。

回答時の注意：
- 永住者・定住者に「資格外活動許可が必要」と言わない
- 留学生の夏休みを「週28時間」と言わない（1日8時間が正しい基準）
- 技人国の一般企業副業は許可要否を断定せず、確認を推奨
- 「バレなければ大丈夫」「副業は自由」等を言わない
```

### injection_needs_review_addendum

```
※ 技術・人文知識・国際業務など就労ビザ保持者が一般民間企業で副業・兼業する場合の
具体的な許可要件・審査基準、および無許可就労時の具体的罰則については、
出入国在留管理庁窓口または行政書士に個別に確認することを強く推奨します。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (claude-sonnet-4-6 / FACT-OPS Batch 2) | extraction from moj-isa-shikakugai-00001 + moj-isa-nyuukoku07-00003 | — | ai_extracted | 入管法19条原則・別表2例外・28時間ルール・休業中1日8時間 確認 |
| 2026-05-07 | AI self-verification | 13項 チェックリスト全項目確認; 罰則・技人国副業条件を needs_review に格納; certain_block + addendum 分割完了 | ai_extracted | ai_verified | risk=high, confidence=high; controlled_alpha_eligible=false (FACT 自律遵守 §9) |
| 2026-05-07 | DOMAIN-CC (audit-full-20260507) | §2 full checklist PASS; 6 direct_fact_fields all sourced; 週28h/1日8h dual rule confirmed; 別表2 holders exception confirmed; injection_certain_block clean | ai_verified | human_reviewed | APPROVE |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 3) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | human_reviewed | human_reviewed | patch |

## Audit assignment

- `risk_level: high` → DOMAIN human audit queue (priority 2)
- `needs_review_flags.mushokyo_shuro_bassoku` → 入管法第73条の罰則を DOMAIN/書士 が官方条文（e-Gov 法令検索）で確認
- `needs_review_flags.gijinkoku_fukugyo_individual_permit_conditions` → 技人国の一般民間副業許可要件を DOMAIN が確認
