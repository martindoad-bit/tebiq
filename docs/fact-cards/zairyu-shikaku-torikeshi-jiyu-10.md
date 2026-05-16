---
fact_id: zairyu-shikaku-torikeshi-jiyu-10
title: 在留資格取消事由10項目（虚偽申告・活動継続不実施・住居地未届）
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
reviewer:
sprint: "fact-window-bulk-1"
citation_label: "在留資格取消10事由"
citation_summary: "入管法上、在留資格取消事由は10項目に分類される。虚偽申告系は退去強制直結、活動継続不実施・住居地未届は最大30日の出国期間付き取消。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户收到了入管的「出頭通知」「聴聞通知」"
  - "用户问失业3个月以上是否会被取消在留资格"
  - "用户问离婚后多久会被取消配偶者在留资格"
  - "用户问住所没有去区役所届出会怎样"
does_not_cover:
  - "退去強制手続自体の流れ（別カード）"
  - "在留特別許可申請の方法（別カード）"
  - "取消後の再入国制限期間"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    label: ISA — 在留資格取消制度
    accessed: "2026-05-17"
applies_to:
  - 全ての中長期在留者
direct_fact_fields:
  - 取消前手続：入国審査官が当該外国人から意見を聴取する（必須）（ISA公式）
  - 虚偽・不正系（1-2号）：直ちに退去強制対象（ISA公式）
  - その他の事由：最大30日の出国期間が指定される（ISA公式）
  - 取消事由①：偽りその他不正の手段による上陸許可（ISA公式）
  - 取消事由②：活動内容の虚偽申告による上陸（ISA公式）
  - 取消事由③：虚偽書類の提出による許可（ISA公式）
  - 取消事由④：在留特別許可の不正取得（ISA公式）
  - 取消事由⑤：在留資格に係る活動を行わず他の活動を行う場合
  - 取消事由⑥：在留資格に係る活動継続を3か月以上行っていない場合
  - 取消事由⑦：配偶者としての活動継続を6か月以上行っていない場合（日本人配偶者等・永住者配偶者等向け）
  - 取消事由⑧：新規許可後90日以内の住居地未届出
  - 取消事由⑨：住居地変更後90日以内の新届出未提出
  - 取消事由⑩：虚偽の住居地届出
ai_inferred_fields:
  - 「正当な理由」がある場合（病気・DV避難等）は取消対象外となる場合あり
  - 失業3か月超は事由⑥に該当しうるが、転職活動中は正当理由とされうる（実務）
needs_review_flags:
  - seijou_no_riyu_scope
  - spouse_6months_dv_exception
  - job_search_3months_practice
related_links:
  - title: "ISA — 在留資格取消制度"
    url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 在留資格取消制度"
    locator: "ページ内「取消事由」"
    relation: "official_reference"
evidence_points:
  - claim: "在留資格取消事由は虚偽・不正系（1-4号）、活動継続関連（5-7号：3か月・6か月不実施）、住居地届出関連（8-10号：90日以内）の計10項目。虚偽・不正系（1-2号）は直ちに退去強制、その他は最大30日の出国期間指定。取消前に意見聴取が必須。"
    source_title: "ISA — 在留資格取消制度"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内10事由列挙箇所"
    display_label: "取消10事由・意見聴取・出国期間最大30日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報に基づく取消事由。

## current_effective_fact

取消事由は10項目あり、虚偽申告系は退去強制直結。活動不実施3か月（事由⑥）、配偶者活動不実施6か月（事由⑦）、住居地未届90日（事由⑧⑨⑩）が要注意。

## exceptions_or_transition

- 「正当な理由」がある場合は取消対象外（DV・病気・転職活動等）（要確認）
- 取消決定前に意見聴取あり

## common_user_phrases

- 在留資格 取消 失業
- 離婚 在留 取消
- 入管 聴聞通知
- 住所 14日 90日 取消

## must_say

- 取消事由は10項目
- 虚偽申告系は退去強制直結
- 活動不実施3か月・配偶者不実施6か月で取消事由
- 取消前に意見聴取あり

## must_not_say

- 「離婚しても在留に影響ない」（誤り、6か月で事由⑦）
- 「失業しても放置していい」（誤り、3か月で事由⑥）

## qa_cases

**Q: 失業して3か月経ちました。在留資格は取消になりますか？**
A: 入管法上、在留資格に係る活動を3か月以上行っていない場合は取消事由⑥に該当します。ただし、転職活動中であるなど「正当な理由」が認められる場合は対象外となります。実務上の判断はケース別なので、入管または専門家に相談してください。

## injection_format

### injection_certain_block

```
【在留資格取消10事由／ {{TODAY_ISO}} 公式】
①〜④ 虚偽・不正系（退去強制直結）
⑤〜⑦ 活動継続関連（3か月/6か月）
⑧〜⑩ 住居地届出関連（90日以内）
取消前に意見聴取あり。
```

### injection_needs_review_addendum

```
※ 「正当な理由」の範囲・DV避難の特例は個別判断要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成（ai_extracted）。 | — | ai_extracted | new |
