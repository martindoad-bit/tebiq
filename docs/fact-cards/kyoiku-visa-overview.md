---
fact_id: kyoiku-visa-overview
title: 教育 在留資格 — 小中高校等の語学/教育教師（5/3/1/0.25年）
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "教育ビザ"
citation_summary: "教育在留資格は日本の小中高校等で語学教育その他の教育に従事する者向け。在留期間5/3/1/3か月。常勤・非常勤で書類異なる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "中学高校の英語教師として来日"
does_not_cover:
  - "大学・研究機関は教授ビザ"
  - "民間英会話学校は技人国"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/instructor.html
    label: ISA — 教育
    accessed: "2026-05-17"
applies_to:
  - 小中高校・特別支援学校の教育従事者
direct_fact_fields:
  - 在留期間：5/3/1年または3か月
  - 常勤/非常勤で書類異なる
  - 更新時：税務証明書必須
  - 書類はA4片面1枚印刷
ai_inferred_fields:
  - 法人外教育（家庭教師等）は対象外
needs_review_flags:
  - hijoukin_required_documents
  - private_language_school_handling
related_links:
  - title: "ISA — 教育"
    url: "https://www.moj.go.jp/isa/applications/status/instructor.html"
    organization: "出入国在留管理庁"
    display_label: "教育"
    locator: "5/3/1/3か月"
    relation: "official_reference"
evidence_points:
  - claim: "教育ビザは小中高等の語学/教育従事者向け、5/3/1年または3か月。更新時税務証明必須。"
    source_title: "ISA — 教育"
    source_url: "https://www.moj.go.jp/isa/applications/status/instructor.html"
    source_organization: "出入国在留管理庁"
    source_locator: "5/3/1/3か月"
    display_label: "教育ビザ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

教育ビザ：小中高校等、5/3/1年or3月。

## must_say

- 小中高校が対象
- 民間英会話は技人国

## injection_format

### injection_certain_block

```text
- 教育ビザ：小中高校等、5/3/1年or3月。
- 小中高校が対象
- 民間英会話は技人国
- 出典: ISA — 教育 https://www.moj.go.jp/isa/applications/status/instructor.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
