---
fact_id: ryugaku-naitei-tokutei-katsudou
title: 留学生 — 卒業後の内定待機（特活）
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "卒業後内定待機特活"
citation_summary: "本邦大学/大学院/専門学校卒業者が内定を得たが入社が遅れる場合、最長6か月（更新で最長1年）の特定活動による在留が認められる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "卒業後 内定 待機"
  - "4月入社 ビザ"
does_not_cover:
  - "卒業後の就職活動特活（別ルート）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 本邦学校卒業内定者
direct_fact_fields:
  - 在留期間：最長6か月（更新で最長1年）
  - 対象：本邦の大学/大学院/専門学校卒業内定者
  - 申請：管轄地方入管
  - 内定証明書必要
ai_inferred_fields:
  - 入社後は技人国等への変更が必要
needs_review_flags:
  - shorui_required_in_application
  - shouchoku_failure_handling
  - financial_proof_during_waiting
related_links:
  - title: "ISA — 特定活動"
    url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    organization: "出入国在留管理庁"
    display_label: "特活"
    locator: "卒業後内定"
    relation: "official_reference"
evidence_points:
  - claim: "本邦学校卒業内定者は最長6か月（更新で1年）の特活で内定待機可。"
    source_title: "ISA — 特活"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    source_organization: "出入国在留管理庁"
    source_locator: "内定待機"
    display_label: "卒業後内定待機"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

内定待機特活：最長6か月（更新1年）。

## must_say

- 6か月（更新1年）
- 内定証明書必要

## injection_format

### injection_certain_block

```text
- 内定待機特活：最長6か月（更新1年）。
- 6か月（更新1年）
- 内定証明書必要
- 出典: ISA — 特定活動 https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
