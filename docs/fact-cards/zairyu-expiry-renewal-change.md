---
fact_id: zairyu-expiry-renewal-change
title: 在留期限間近の更新・変更申請 — 申請タイミングと特例期間
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
citation_label: "在留期限間近の更新・変更申請（申請タイミング・特例期間）"
citation_summary: "在留期間の満了前に更新・変更許可を申請できるタイミングと、申請中に在留期限が来た場合の特例期間（最長2か月）の内容を確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留期限が近づき、更新・変更申請のタイミングを確認したい"
  - "申請中に在留期限が来た場合の在留状況（特例期間）を確認したい"
  - "在留期限を過ぎた場合のリスクを確認したい"
does_not_cover:
  - "技人国更新申請の具体的書類一覧（gijinkoku-koushin-shorui 参照）"
  - "在留資格変更申請の書類（各資格別の申請手続きページ参照）"
  - "不許可になった場合の具体的対処（入管窓口・行政書士相談要）"
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: claude-sonnet-4-6 (FACT-OPS Batch 2, WebFetch from official ISA/MOJ sources)
  source_count: 2
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-tokureikikan
    url: https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
    title: 特例期間の解説
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-16-3
    url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    title: 在留期間更新許可申請
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
applies_to:
  - 在留期間更新許可申請（全在留資格）
  - 在留資格変更許可申請（全在留資格）
  - 申請中に在留期間の満了日が来る可能性がある申請者
direct_fact_fields:
  - shinsei_timing_3months_before_rule
  - tokureikikan_definition
  - tokureikikan_duration_2months_max
  - tokureikikan_permitted_activities
  - zairyu_card_valid_during_tokureikikan
ai_inferred_fields:
  - fukyoka_no_case_departure_required
  - late_application_after_expiry_risk
needs_review_flags:
  - id: fukyoka_case_departure_timeline
    reason: >
      申請が不許可になった場合の出国義務・猶予期間については
      官方の「特例期間」解説ページに明示なし。
      不許可通知後の対応（出国期限・在留特別許可の可能性等）は
      DOMAIN/書士確認が必要。
  - id: kigen_ato_shinsei_handling
    reason: >
      在留期間の満了日を過ぎてから申請した場合（期限後申請）の取り扱いは
      「特例期間」の対象外（特例期間は申請後の猶予であり、申請自体の期限切れは別問題）。
      期限後申請への対応策・リスクの詳細は官方ページに明示なし。
  - id: henkou_vs_koshin_tokureikikan_difference
    reason: >
      在留資格変更申請（status change）と更新申請（renewal）で
      特例期間中の活動に差異があるかどうか（例：変更申請中は旧在留資格の活動のみ？）は
      官方ページで明確に区別されていない。
related_links:
  - title: "特例期間の解説"
    url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    organization: "出入国在留管理庁"
    display_label: "特例期間の解説"
    locator: "ページ内で「特例期間の解説」を検索"
    relation: "official_reference"
  - title: "在留期間更新許可申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    organization: "出入国在留管理庁"
    display_label: "在留期間更新許可申請"
    locator: "ページ内で「在留期間更新許可申請」を検索"
    relation: "official_reference"
---

# 在留期限間近の更新・変更申請 — 申請タイミングと特例期間

---

## current_date_logic

```
このカードの事実は常時有効（特定の施行日なし）。
申請期間・特例期間ルールは入管法第20条・第21条に基づく。
```

---

## current_effective_fact

### 在留期間更新申請のタイミング

> 「在留期間の満了する日以前
> （６か月以上の在留期間を有する者にあっては在留期間の満了する
> 概ね３か月前から。ただし、入院、長期の出張等特別な事情が認められる
> 場合は、３か月以上前から申請を受け付けることもあります。）」
> source: moj-isa-16-3

**在留期限が6か月以上の場合**：期限の概ね**3か月前**から申請受付。
**それより短い場合**：満了日「以前」であれば受付（具体的な最短日数は明示なし）。

### 特例期間の定義

> 「在留カードを所持している方が、在留期間更新許可申請又は在留資格変更
> 許可申請（以下「更新等申請」といいます。）を行った場合において、
> 当該申請に係る処分が在留期間の満了の日までになされないときは」
> source: moj-isa-tokureikikan

特例期間とは：**申請後、在留期限までに処分が下りなかった場合**に自動的に発生する
猶予期間。申請なしでは発生しない。

### 特例期間の長さ

> 「当該処分がされる時又は在留期間の満了の日から二月が経過する日が
> 終了する時のいずれか早い時までの間」
> source: moj-isa-tokureikikan

特例期間の終了は**次のいずれか早い方**：

1. 処分（許可または不許可の通知）が下りた時点
2. 在留期間の満了日から**2か月が経過**した時点

→ 最長で満了日から2か月間の猶予。その前に処分が下りれば即終了。

### 特例期間中に許可される活動

> 「引き続き従前の在留資格をもって我が国に在留でき、従前の活動を
> 行うことができます」
> source: moj-isa-tokureikikan

特例期間中は：
- 従前の在留資格のまま日本に在留できる
- 従前の活動（就労・学習等）を継続できる
- 在留カードは有効（source: moj-isa-tokureikikan）

### 申請が不許可になった場合（AI inference — 公式ページ未明示）

不許可となった場合、特例期間は「処分がされた時点」で終了する。
その後の出国義務・猶予期間については官方ページに明示なし（needs_review）。
> source: ai_inference

### 不許可後の出国判断で混同してはいけない境界（DOMAIN/Codex correction 2026-05-10）

不許可通知後の対応では、以下を分けて扱う。

- **通知書に記載された期限内の自主出国**：通常、それ自体を「5年上陸拒否」と断定しない。
- **審査請求・再申請・将来の再入国を検討している場合**：出国前に選択肢を整理する価値があるため、行政書士または入管専門弁護士への相談を推奨。
- **退去強制手続、不法残留、期限超過、不法就労等の疑いがある場合**：上陸拒否等の重大リスクがあり得るため、専門家確認が必要。

AIは「出国して再申請すればよい」とも、「出国前に専門家確認しないと必ず5年拒否」とも言わない。

---

## exceptions_or_transition

| 状況 | 適用される処理 |
|------|----------------|
| **満了前に申請 → 満了日までに処分なし** | 特例期間（最長2か月）が自動発生 |
| **満了前に申請 → 満了日前に許可** | 特例期間発生せず。新しい在留期間で継続 |
| **満了前に申請 → 満了日前に不許可** | 特例期間発生せず。出国義務（詳細は needs_review）|
| **満了日を過ぎてから申請（期限後申請）** | 特例期間の対象外。リスク大（needs_review）|
| **入院・長期出張等の特別事情** | 3か月以上前の早期申請が認められる場合あり |

---

## common_user_phrases

主要トリガー（中文）：

- 我的在留期限还有1个月，现在申请来得及吗
- 在留卡过期了但还在审查中，能继续住吗
- 申请更新签证期间过期了怎么办
- 在留更新要提前多久申请
- 申请签证变更还没结果，期限到了还能工作吗
- 在留续签期间能出国吗
- 特例期间到底是什么意思
- 续签被拒了必须马上离开日本吗

副次トリガー：

- 在留资格变更申请期间怎么办
- 工作签证更新期间收到了不许可通知
- 收到不许可通知书怎么办
- 不许可后还能留在日本多久
- 不许可后还能再申请吗
- 不许可通知书上写的期限是什么意思
- 续签不许可后还能留多久
- 我签证快到期了但材料还没准备好怎么办
- 签证快到期材料还没准备好
- 在留期限快到了材料不齐
- 到期前材料不齐能不能先提交
- 更新材料没准备齐但快到期
- 在留卡到期但申请还没批

技術キーワード（マッチャ用）：

- 在留期限 / 期限 / 在留カード期限 / 在留期限切れ
- 更新 / 续签 / 在留更新 / 更新申請
- 特例期間 / 特例 / 2ヶ月 / 申請中 超過
- 期限切れ / 过期 / 满期 / 有効期限
- 変更申請 / 在留資格変更 / ビザ変更
- 審査中 / 审查中 / 結果待ち / 未決定
- 不许可通知 / 不許可通知 / 续签被拒 / 更新不许可 / 更新不許可

---

## must_say

1. 在留期間が6か月以上ある場合は、期限の**概ね3か月前**から更新申請が可能（かつ推奨）
2. 申請後、期限までに処分が下りなければ**特例期間**が自動発生する
3. 特例期間の最長は在留期限満了日から**2か月間**（処分が下り次第終了）
4. 特例期間中は「従前の在留資格で日本に在留し、従前の活動を継続できる」
5. **満了日を過ぎてから申請した場合は特例期間の恩恵がない** — 早めの申請が重要
6. 不明な場合は入管窓口または行政書士に早期相談を推奨
7. 不許可後は通知書に記載された期限を確認し、審査請求・再申請・将来の再入国予定があるかで出国前相談の必要性が変わる

## must_not_say

- ❌ 「在留期限が過ぎても大丈夫です（申請中なら）」（申請前に期限が切れた場合は特例期間なし）
- ❌ 「申請中なら何か月でも在留できます」（最長2か月の上限あり）
- ❌ 「不許可になってもそのまま居られます」（不許可で特例期間終了 → 出国義務）
- ❌ 「満了日ギリギリに申請すれば問題ない」（余裕を持った申請を推奨すべき）
- ❌ 「特例期間中は新しい在留資格の活動ができる」（従前の活動のみ）
- ❌ 「通知書期限内に自主出国しても5年拒否になります」（条件を無視した過度な脅し）
- ❌ 「出国前に行政書士へ確認しないと必ず不利益になります」（審査請求・再申請・不法滞在等の有無を見ない一律表現）

---

## qa_cases

### QA-1 — 更新申請中に在留期限が来たケース

**user**: 我的签证更新还在审查中，但是在留期限已经到了，我现在怎么办？

**must_have**:
- 更新申請をしている場合、特例期間が発生している
- 特例期間中は従前の在留資格で在留継続・活動継続が可能
- 特例期間は処分が下りるか、満了日から2か月が経過した時点で終了
- 処分を待ちながら通常通り生活・就労できる旨

**must_not_have**:
- 「期限が来たのですぐに帰国が必要」（申請中なら特例期間あり）
- 「何か月でも在留できる」（2か月の上限あり）

**bad_answer_example**: 「在留期限を過ぎてしまった場合は、すぐに帰国しなければなりません」

**good_answer_criteria**: 申請中であれば特例期間が自動発生していること、従前の活動継続可能であること、最長2か月の期間があることを伝える。

---

### QA-2 — 申請タイミングの確認

**user**: 在留续签要提前多久申请？

**must_have**:
- 在留期間が6か月以上の場合、概ね3か月前から申請可能
- 早めの申請を推奨（期限ギリギリは審査期間が不十分になるリスク）
- 特別な事情があれば3か月以上前の申請も可能

**must_not_have**:
- 「満了日の1か月前で十分」
- タイミングを特定せずに「早めに」とだけ言う

**bad_answer_example**: 「在留期限の1か月前に申請すれば十分です」

**good_answer_criteria**: 6か月以上の在留期間がある場合は概ね3か月前からが目安であること、早めが望ましいことを伝える。

---

### QA-3 — 更新不許可の場合

**user**: 续签申请被拒了，必须马上离开日本吗？

**must_have**:
- 不許可の通知を受けた時点で特例期間は終了する
- 通知書に記載された期限を確認する必要がある
- 期限内自主出国を一律に「5年拒否」とは言わない
- 審査請求・再申請・将来の再入国を考える場合、または不法滞在等の不安がある場合は行政書士または入管専門弁護士への相談を推奨

**must_not_have**:
- 「不許可でもすぐには出国不要」と根拠なく安心させる
- 「即日出国が必要」と過度に脅かす

**bad_answer_example**: 「不許可になっても特例期間内はまだ在留できますので、心配不要です」

**good_answer_criteria**: 不許可で特例期間が終了すること、その後の対応は個別状況により異なるため行政書士への即時相談が最重要であることを伝える。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 在留期限間近の更新・変更申請と特例期間】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

【申請タイミング】
在留期間が6か月以上の場合：
「在留期間の満了する概ね３か月前から」申請可能（更新・変更ともに同様）。
入院・長期出張等の特別な事情がある場合は3か月以上前からの早期申請も認められる場合あり。

【特例期間の定義と長さ】
在留期間更新許可申請または在留資格変更許可申請を行った後、
「当該処分が在留期間の満了の日までになされないとき」に特例期間が発生する。

特例期間の終了：次のいずれか早い時まで
  - 処分（許可または不許可）が下りた時点
  - 在留期間の満了日から「２か月が経過する日が終了する時」

【特例期間中の在留・活動】
「引き続き従前の在留資格をもって我が国に在留でき、従前の活動を行うことができます」
→ 就労・学習等の従前の活動は継続可能。在留カードも有効。

【重要な限界】
- 特例期間は申請をしていることが前提。満了日を過ぎてからの申請は対象外
- 最長2か月を超えることはない
- 不許可の通知を受けた時点で特例期間は終了する

回答時の注意：
- 「申請中なら何か月でも居られる」は誤り（最長2か月）
- 「不許可でも居られる」は誤り（通知時点で終了）
- 「期限を過ぎてから申請した場合」は特例期間の対象外 → 別問題として扱う
- 不許可時の具体的な対応は個別確認を推奨する
- 不許可後の出国猶予・出国準備期間・再申請可否はこの certain_block では確定しない。通知書の期限・入管窓口・行政書士確認を優先する
- 回答で「缓冲期なし」「当天非法」「通常30天」と断定しない
- 回答で「期限内自主出国でも5年拒否」「出国前に行政書士確認しないと必ず5年拒否」と断定しない
- ただし「出国して再申請すればよい」とAIが単独で戦略提案しない。審査請求・再申請・将来の再入国予定がある場合は出国前に専門家確認を促す
- 材料が未完成でも期限が迫る場合は、満了日前に入管へ相談し、現在ある材料で先に受理できるか確認するよう促す。ただし「必ず補正期間がもらえる」とは言わない
```

### injection_needs_review_addendum

```
※ 在留期間更新・変更申請が不許可になった場合は、通知書に記載された期限・
審査請求/再申請の意思・将来の再入国予定・不法滞在等の有無を分けて確認してください。
通知書期限内の自主出国そのものを「5年上陸拒否」とは断定しませんが、
争う/再申請する/戻る予定がある場合は出国前に行政書士または入管専門弁護士へ確認することを推奨します。
在留期間満了後に申請した場合の取り扱いについては、出入国在留管理庁窓口または行政書士に個別確認してください。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (claude-sonnet-4-6 / FACT-OPS Batch 2) | extraction from moj-isa-tokureikikan + moj-isa-16-3 | — | ai_extracted | 特例期間定義・2か月・従前活動継続・申請タイミング3か月前 確認 |
| 2026-05-07 | AI self-verification | 13項 チェックリスト全項目確認; 不許可後・期限後申請を needs_review に格納; certain_block + addendum 分割完了 | ai_extracted | ai_verified | risk=high, confidence=high; controlled_alpha_eligible=false (FACT 自律遵守 §9) |
| 2026-05-07 | DOMAIN-CC (audit-full-20260507) | §2 full checklist PASS; 特例期間 definition + 2か月上限 + 従前活動継続 all sourced; limiting cases (不許可即終了, 期限後申請対象外) confirmed in must_not_say and injection_certain_block | ai_verified | human_reviewed | APPROVE |
| 2026-05-10 | Codex (claim-boundary correction) | F06 過剰警告を修正。通知書期限内の自主出国を一律に5年上陸拒否と断定しない境界、審査請求/再申請/将来再入国/不法滞在等の分岐を追加。 | human_reviewed | human_reviewed | boundary correction; needs DOMAIN re-ack if promoted beyond current card |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 3) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | human_reviewed | human_reviewed | patch |

## Audit assignment

- `risk_level: high` → DOMAIN human audit queue (priority 2)
- `needs_review_flags.fukyoka_case_departure_timeline` → 不許可後の出国猶予を DOMAIN/書士 が確認
- `needs_review_flags.kigen_ato_shinsei_handling` → 期限後申請のリスク詳細を確認
