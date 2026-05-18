---
fact_id: eijuu-bbq-criminal-record
title: 永住申請 — 素行善良と罰金刑・拘禁刑
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-18"
reviewer: Codex Knowledge Runtime Loop20
sprint: "knowledge-runtime-loop20"
citation_label: "永住 素行善良"
citation_summary: "永住許可ガイドラインでは、素行が善良であることとして、法律を遵守し日常生活で社会的に非難されることのない生活を営んでいることが求められる。罰金刑や拘禁刑などを受けていないことも示されている。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住申請前に交通違反・罰金・刑事処分の影響が気になる"
  - "永住の素行善良要件を確認したい"
  - "警察対応歴や処分歴をAIで断定せず整理したい"
does_not_cover:
  - "個別の交通違反・刑事処分が永住審査でどう評価されるか"
  - "反省文・理由書・上申書の提出戦略"
  - "退去強制事由や刑事事件対応"
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: 出入国在留管理庁 — 永住許可に関するガイドライン
    accessed: "2026-05-18"
applies_to:
  - 永住許可申請を検討する中長期在留者
direct_fact_fields:
  - 永住許可ガイドラインは、素行が善良であることを要件として掲げている
  - 素行善良とは、法律を遵守し日常生活で住民として社会的に非難されることのない生活を営んでいること
  - 同ガイドラインは、罰金刑や拘禁刑などを受けていないことを示している
ai_inferred_fields: []
needs_review_flags:
  - id: individual_criminal_or_traffic_history
    reason: 交通違反、罰金、刑事処分、警察対応歴の具体的影響は、件数・内容・時期・反省状況で変わるためAIで許可見込みを断定しない。
  - id: explanatory_document_strategy
    reason: 理由書・反省文・上申書の出し方は行政書士や弁護士の個別判断領域。
related_links:
  - title: "永住許可に関するガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住許可ガイドライン"
    locator: "ページ内「素行が善良であること」"
    relation: "official_reference"
evidence_points:
  - claim: "永住許可ガイドラインでは、素行が善良であることとして、法律を遵守し日常生活で住民として社会的に非難されることのない生活を営んでいることが求められる。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "素行が善良であること"
    display_label: "永住申請：素行善良"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "同ガイドラインは、罰金刑や拘禁刑などを受けていないことを示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "素行が善良であること"
    display_label: "永住申請：罰金刑・拘禁刑"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住許可ガイドラインでは、素行が善良であることとして、法律を遵守し日常生活で住民として社会的に非難されることのない生活を営んでいることが求められる。同ガイドラインは、罰金刑や拘禁刑などを受けていないことも示している。

ただし、交通違反、罰金、刑事処分、警察対応歴が個別にどの程度影響するかはAIで断定しない。内容・時期・件数・説明資料により変わるため、該当がある場合は専門家確認に回す。

## must_say

- 永住には「素行が善良であること」が要件としてある。
- 公式ガイドラインは、罰金刑や拘禁刑などを受けていないことを示している。
- 交通違反や刑事処分歴がある場合、影響や説明方法は個別確認が必要。

## must_not_say

- 交通違反が数件なら必ず問題ない。
- 罰金があっても反省文を出せば大丈夫。
- 過去5年または10年だけ見ればよい。
- 1年以上の懲役・禁錮だけが問題で、それ以外は安全。
- 該当があると必ず永住不許可。

## common_user_phrases

- 永住申請 交通違反
- 永住 罰金
- 永住 警察に呼ばれた
- スピード違反 永住
- 前科 永住
- 素行善良とは

## injection_format

### injection_certain_block

```text
【永住申請と素行善良／{{TODAY_ISO}} 公式】
・永住許可ガイドラインでは、「素行が善良であること」として、法律を遵守し日常生活で住民として社会的に非難されることのない生活を営んでいることが求められる。
・同ガイドラインは、罰金刑や拘禁刑などを受けていないことを示している。
・交通違反、罰金、刑事処分、警察対応歴の具体的影響や説明方法はAIで断定しない。
・該当がある場合は、内容・時期・件数・説明資料を整理して行政書士または弁護士に確認する。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop20 | 「軽微交通違反は数件許容」「1年以上懲役」「5-10年」等の未確認実務推断を削除し、永住ガイドラインの素行善良・罰金刑/拘禁刑記述に限定して runtime 昇格。 | ai_extracted | ai_verified | loop20-rewrite |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
