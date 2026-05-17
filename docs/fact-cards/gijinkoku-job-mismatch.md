---
fact_id: gijinkoku-job-mismatch
title: 技術・人文知識・国際業務 — 業務内容と在留資格の不一致リスク
state: ai_extracted   # DOMAIN 2026-05-17 P1 降级: phantom field 历史 + 灰区销售/混合业务定性过硬。需重写后再回 runtime
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-07
reviewer: ai_self_verified
sprint: 0.6 / Workstream C / Batch 1
citation_label: "技人国（業務内容と在留資格の不一致リスク）"
citation_summary: "技術・人文知識・国際業務（技人国）の在留資格で許可されている業務範囲と、業務内容不一致の場合の在留取消リスクを確認するカード。転職後の業務内容審査にも適用。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国で就労中に業務内容が大きく変わった場合のリスクを確認したい"
  - "技人国の在留資格で許可される業務範囲を確認したい"
  - "技人国更新時に業務内容変更が審査に影響するか確認したい"
  - "転職後の新しい業務内容が技人国に該当するか確認したい"
does_not_cover:
  - "転職時の入管届出義務（gijinkoku-job-change-notification 参照 — 14日以内）"
  - "技人国更新申請の書類一覧（gijinkoku-koushin-shorui 参照）"
  - "技人国から他の在留資格への変更手続き"
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: claude-sonnet-4-6 (FACT-OPS Batch 1, WebFetch from official ISA/MOJ sources)
  source_count: 3
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-gijinkoku
    url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    title: 技術・人文知識・国際業務（在留資格）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-torikeshi
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消しについて（解説）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-todokedeguchi
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html
    title: 所属機関に関する届出（契約機関・活動機関変更）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
applies_to:
  - 技術・人文知識・国際業務 在留資格保持者
  - 在留期間更新許可申請（技人国）
  - 在留資格変更許可申請（他資格 → 技人国 または 技人国 → 他資格）
direct_fact_fields:
  - kaijo_jitsurei_rule_3months
  - kaijo_jitsurei_rule_6months_haiguusha
  - shokkubun_todokedeguchi_14days
  - torikeshi_rule_activity_mismatch
  - kinshi_katsudo_list
ai_inferred_fields:
  - practical_risk_of_factory_work_on_renewal
  - language_skill_requirement_2025_update
needs_review_flags:
  - id: language_skill_2025_update_verification
    reason: >
      April 2025の語学要件更新（CEFR B2相当）がWebFetch出力に言及されていたが、
      出入国在留管理庁の具体的な官方URLでの直接確認が取れていない。
      技人国の改正告示・ガイドライン改訂の有無を公式ページ(moj.go.jp/isa)で確認が必要。
      確認前は直接事実として注入しない。
  - id: actual_work_vs_contract_gray_zone
    reason: >
      就業規則上の職務と実際の業務内容のズレ（例：エンジニア雇用だが一時的に
      営業補助業務）の取消し判断基準は公式ページに具体的な閾値が明示されていない。
      実務上の運用事例が必要。
related_links:
  - title: "技術・人文知識・国際業務（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技術・人文知識・国際業務（在留資格）"
    locator: "ページ内で「技術・人文知識・国際業務（在留資格）」を検索"
    relation: "official_reference"
  - title: "在留資格の取消しについて（解説）"
    url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格の取消しについて（解説）"
    locator: "ページ内で「在留資格の取消しについて（解説）」を検索"
    relation: "official_reference"
  - title: "所属機関に関する届出（契約機関・活動機関変更）"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
    organization: "出入国在留管理庁"
    display_label: "所属機関に関する届出（契約機関・活動機関変更）"
    locator: "ページ内で「所属機関に関する届出」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "技術・人文知識・国際業務（技人国）は「技術若しくは知識を要する業務又は外国の文化に基盤を有する思考若しくは感受性を必要とする業務」のみ対象。「本来の在留資格に基づく活動を行っていない場合には、在留資格を取り消される場合があります」。教授・経営管理・法律会計業務・医療・研究・教育等は技人国の対象外（別資格対象）。"
    source_title: "出入国在留管理庁：技術・人文知識・国際業務（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「在留資格に係る活動」「対象外業務」「取消し」の記述を確認"
    display_label: "技人国：対象業務範囲・活動不実施3か月で取消リスク・対象外業務一覧"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "在留資格取消し事由：「当該在留資格に係る活動を行っておらず、かつ、他の活動を行い又は行おうとして在留している場合」（正当な理由ある場合を除く）。活動継続3か月以上不実施は取消し対象（入管法第22条の4）。"
    source_title: "出入国在留管理庁：在留資格の取消しについて（解説）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「取消し事由」「活動継続3か月以上不実施」の記述を確認"
    display_label: "在留資格取消し：活動不実施3か月超・他活動従事で取消対象（第22条の4）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "転職・会社名変更・会社消滅・雇用契約終了・新契約開始等が生じた場合、「事由が生じた日から14日以内」に届出義務（入管法第19条の16第2項）。届出方法：オンライン・窓口持参・郵送のいずれか。"
    source_title: "出入国在留管理庁：所属機関に関する届出（契約機関・活動機関変更）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「14日以内」「届出義務」「入管法第19条の16第2項」の記述を確認"
    display_label: "技人国：転職等から14日以内の届出義務（入管法19条の16第2項）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技術・人文知識・国際業務 — 業務内容と在留資格の不一致リスク

---

## current_date_logic

```
このカードの事実は常時有効（特定の施行日なし）。
在留資格取消し制度の基本ルールは入管法第22条の4に基づく。
```

---

## current_effective_fact

### 在留資格に対応しない活動への取消しリスク

> 「本来の在留資格に基づく活動を行っていない場合には、
> 在留資格を取り消される場合があります」
> source: moj-isa-gijinkoku

### 活動継続3か月不実施で取消し対象（第22条の4 事由5-6）

取消し事由として：

> 「当該在留資格に係る活動を行っておらず、かつ、他の活動を行い
> 又は行おうとして在留している場合」（正当な理由ある場合を除く）
> source: moj-isa-torikeshi

> 「活動継続3か月以上不実施（正当な理由ある場合を除く）」
> source: moj-isa-torikeshi

**「正当な理由」の例**：求職活動中、病気療養中など。ただし具体的閾値は明示なし（needs_review）。

### 所属機関変更の届出義務：14日以内

> 「上記の事由が生じた日から１４日以内」に届出義務
> （転職・会社名変更・会社消滅・雇用契約終了・新契約開始）
> source: moj-isa-todokedeguchi

根拠条文：入管法第19条の16第2項

届出方法：オンライン、窓口持参、郵送のいずれか

### 技人国が対象とする業務範囲

技術または知識を要する業務：

> 「技術若しくは知識を要する業務又は外国の文化に基盤を有する
> 思考若しくは感受性を必要とする業務に従事する活動」
> source: moj-isa-gijinkoku

**この在留資格から明示的に除外されている活動**（別資格の対象）：

> 「教授、芸術、報道の項に掲げる活動、二の表の経営・管理、
> 法律・会計業務、医療、研究、教育、企業内転勤、介護、興行」
> source: moj-isa-gijinkoku

**暗黙的に除外される活動（AI inference）**：
技術・知識を必要としない単純作業・肉体労働（工場製造ライン、清掃、荷物搬送等）。
公式ページに直接の禁止リストはないが、「技術若しくは知識を要する業務」という要件から除外される。
> source: ai_inference（一般申請の実務慣行に基づく。官方の具体例リストは needs_review）

---

## exceptions_or_transition

| 状況 | 適用される判断 |
|------|--------------|
| 転職中（仕事なし期間） | 正当な理由がある場合（求職中）は即座に取消しとはならないが、3か月が経過すると取消し対象になりうる |
| 業務内容が一時的に変化（例：繁忙期に他部署応援） | グレーゾーン。長期化・恒常化すると在留資格の実態と乖離するリスク（needs_review）|
| 職種は変わらないが会社を変える場合 | 14日以内の届出義務。届出漏れは別途取消し事由（事由8-10）に該当する可能性 |
| 在留資格変更が必要な転職（技人国 → 経営・管理等） | 転職前に在留資格変更許可申請が原則必要 |

---

## common_user_phrases

主要トリガー（中文）：

- 我是技人国签，换工作要怎么办
- 技人国换工作需要申请什么
- 我工作内容变了，签证会有问题吗
- 我在工厂干活，能续签技人国吗
- 技人国续签审查工作内容吗
- 我辞职了，签证怎么办
- 我现在做的工作和签证批下来的工作不一样
- 副业算不算在留资格外活动

副次トリガー：

- 人文国际签证续签被拒是什么原因
- 技人国换公司要多久
- 换工作多久以后要申报
- 公司改名了需要去入管办手续吗

技術キーワード（マッチャ用）：

- 技人国 / 技術人文 / 人文国际 / 技術・人文知識
- 転職 / 换工作 / 転職届 / 仕事が変わった
- 業務内容 / 仕事内容 / 活動内容
- 活動不実施 / 無業 / 3ヶ月 / 无活动
- 14日 / 届出義務 / 在留資格取消
- 技人国更新不许可 / 技人国更新不許可 / 审查工作内容

---

## must_say

1. 技人国は「技術または知識を要する業務」に従事することが前提
2. 実際の業務がこれに当てはまらない場合、更新時に不許可になるリスクがある
3. 転職・会社変更の場合は**14日以内**に届出義務がある
4. 在留資格に対応しない業務を3か月以上継続すると取消し対象になりうる
5. 転職前に、新しい業務内容が技人国の対象かどうかを確認することを推奨
6. 業務内容が変わる転職は、場合によって在留資格変更申請が必要

## must_not_say

- ❌ 「工場でのライン作業でも技人国で問題ありません」
- ❌ 「転職してから1か月以内に届出すれば大丈夫」（正確には14日以内）
- ❌ 「届出しなくても更新の時にまとめて説明すれば大丈夫」
- ❌ 「業務内容が少し違っていても在留資格取消しにはなりません」（3か月ルールがある）
- ❌ 「技人国は何でもできます」（対象外の業務が明示されている）

---

## qa_cases

### QA-1 — 工場勤務への転職

**user**: 我现在是技人国签，想去工厂做生产线的工作，可以吗？

**must_have**:
- 技人国は技術または知識を要する業務が対象
- 製造ラインの単純作業は技人国の対象外の可能性が高い
- 転職前に業務内容が技人国に当てはまるか確認を推奨
- 当てはまらない場合は在留資格変更が必要になる可能性

**must_not_have**:
- 「工場勤務でも技人国で大丈夫です」
- 在留資格のリスクに言及せずに転職を肯定

**bad_answer_example**: 「工場のお仕事でも技人国ビザで問題ありません。転職の届出だけしてください」

**good_answer_criteria**: 製造ラインの単純作業は技人国の対象業務から外れる可能性が高いこと、転職前に在留資格への影響を確認（行政書士相談推奨）することを明確に伝える。

---

### QA-2 — 転職後の届出義務

**user**: 换工作了，要去入管局办什么手续？什么时候去？

**must_have**:
- 転職（会社変更）の場合、14日以内に届出義務
- オンライン・窓口・郵送の届出方法
- 届出と在留資格変更は別の手続きであること

**must_not_have**:
- 「1か月以内」など誤った期限を案内
- 届出義務に言及せずに更新のみ案内

**bad_answer_example**: 「次の在留期間更新の時に新しい会社の情報を提出すれば大丈夫です」

**good_answer_criteria**: 14日以内の届出義務を正確に伝え、届出と更新申請は別物であること、業務内容が変わる場合は在留資格変更が必要な場合もあることに触れる。

---

### QA-3 — 退職後・転職活動中の在留

**user**: 我辞职了，正在找工作，签证会不会被取消？

**must_have**:
- 求職中は「正当な理由」として一定期間は取消し対象にならない場合がある
- ただし3か月を超えて在留資格に対応する活動を行っていない場合は取消し対象になりうる
- 在留期限が近い場合は特に注意が必要
- 行政書士または入管に相談を推奨

**must_not_have**:
- 「退職しても在留資格は取り消されません」と断言
- 期間制限への言及なし

**bad_answer_example**: 「転職活動中であれば在留資格が取り消されることはありません」

**good_answer_criteria**: 求職中は正当な理由として一定期間認められうるが、3か月が経過すると取消しリスクがあることを伝え、長期化する場合は専門家相談を推奨する。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 技術・人文知識・国際業務 在留資格と業務内容不一致リスク】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

技人国（技術・人文知識・国際業務）は「技術若しくは知識を要する業務、または外国文化に基づく感受性を必要とする業務」のみ対象。

【取消しリスク】
「本来の在留資格に基づく活動を行っていない場合には、在留資格を取り消される場合があります」
（入管法第22条の4：活動継続3か月以上不実施で取消し対象）

【届出義務】
転職・会社変更・契約終了などが生じた場合：「事由が生じた日から14日以内」に届出義務（入管法第19条の16第2項）

【対象外業務の例】
製造ラインの単純作業・清掃・搬送等の技術・知識を要しない業務は技人国の対象外。
また教授・経営管理・法律会計業務・医療・研究・教育等は別の在留資格の対象。

回答時の注意：
- 工場ライン作業でも技人国で大丈夫とは言わない
- 届出期限は「14日以内」（1か月ではない）
- 3か月を超えて対応業務に従事しない場合の取消しリスクを伝える
- 業務変更を伴う転職は在留資格変更が必要な場合があることを伝える
```

### injection_needs_review_addendum

```
※ 業務内容の一時的・部分的なズレが在留資格に与える影響の具体的閾値、
および2025年以降の技人国改正要件（語学要件等）の詳細については、
最新の出入国在留管理庁の告示・ガイドラインまたは行政書士に確認することを推奨します。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (claude-sonnet-4-6 / FACT-OPS Batch 1) | initial extraction from moj-isa-gijinkoku, moj-isa-torikeshi, moj-isa-todokedeguchi | — | ai_extracted | 14日届出義務・3か月取消しルール・除外業務リスト確認 |
| 2026-05-07 | AI self-verification | direct_fact_fields sourced; language_skill_2025 を needs_review に格納; certain_block + addendum split complete | ai_extracted | ai_verified | risk=high |
| 2026-05-07 | GM (boundary correction) | controlled_alpha_eligible: true → false. FACT autopilot 越界。high 卡 ai_verified 不需要此 flag (only critical does). | ai_verified | ai_verified | GM correction |
| 2026-05-07 | DOMAIN-CC (audit-full-20260507) | §2 checklist: PHANTOM FIELD detected — kaijo_jitsurei_rule_6months_haiguusha listed in direct_fact_fields but has no body content with source citation; 6か月ルールは配偶者ビザ (22条の4第7号) のルールであり技人国には適用なし。REQUEST_EDIT: remove from direct_fact_fields (Option A) or add body section with 配偶者/技人国 distinction and move to ai_inferred_fields (Option B). Core content (3か月・14日・業務外リスト) is solid. State stays ai_verified pending FACT fix. | ai_verified | ai_verified | REQUEST_EDIT |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 4) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |

## Audit assignment

- `risk_level: high` → DOMAIN human audit queue (priority 2)
- `state: ai_verified` + `risk: high` → 当 FACT_LAYER_ENABLED=true 时直接进 Alpha 注入（不需要 controlled_alpha_eligible flag）
- `needs_review_flags.language_skill_2025_update_verification` → DOMAIN が公式告示で技人国語学要件改正の有無を確認すること（確認できれば direct_fact に昇格）
- `needs_review_flags.actual_work_vs_contract_gray_zone` → 業務ズレの運用判断基準を DOMAIN/書士確認
