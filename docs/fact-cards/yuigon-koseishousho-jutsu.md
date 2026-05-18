---
fact_id: yuigon-koseishousho-jutsu
title: 遺言公正証書 — 公証役場作成・検認不要
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "遺言公正証書"
citation_summary: "公正証書遺言は公証人が作成する遺言方式で、家庭裁判所の検認が不要となる。外国人や国際相続が関係する場合、準拠法、翻訳、通訳、相続税、海外財産などは別途専門確認が必要。"
source_display_names:
  - "法務省"
applies_when:
  - "外国人 遺言"
  - "日本財産 遺言"
does_not_cover:
  - "本国での遺言の効力（国別）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji30.html
    label: 法務省 — 遺言
    accessed: "2026-05-17"
applies_to:
  - 日本に財産を持つ外国人
direct_fact_fields:
  - 作成場所：公証役場
  - 必要：本人＋証人2名
  - 検認不要（自筆証書遺言との差異）
  - 外国人や国際相続が関係する場合は準拠法、翻訳、通訳、相続税、海外財産などを別途確認
ai_inferred_fields:
  - 通訳や外国語資料の扱いは公証役場で個別確認
needs_review_flags:
  - hokan_seido_jisitsu_2026
  - tugoku_yuigon_validity
  - tsuyaku_specific_requirements
related_links:
  - title: "法務省 — 公証役場"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "公証"
    locator: "遺言"
    relation: "official_reference"
evidence_points:
  - claim: "公正証書遺言は公証人が作成する遺言方式で、家庭裁判所の検認が不要となる。外国人や国際相続が関係する場合、準拠法、翻訳、通訳、相続税、海外財産などは別途専門確認が必要。"
    source_title: "法務省 — 遺言"
    source_url: "https://www.moj.go.jp/MINJI/minji30.html"
    source_organization: "法務省民事局"
    source_locator: "公正証書遺言"
    display_label: "公正証書遺言"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

公正証書遺言は公証人が作成する遺言方式で、家庭裁判所の検認が不要となる。外国人や国際相続が関係する場合、準拠法、翻訳、通訳、相続税、海外財産などは別途専門確認が必要。

## must_say

- 公証役場で作成
- 証人2名必要
- 検認不要
- 国際相続の有効性や準拠法は専門確認が必要

## injection_format

### injection_certain_block

```text
【公正証書遺言ファクト / {{TODAY_ISO}} 公式】
・公正証書遺言は公証人が作成する遺言方式。
・公証役場で作成し、証人2名が必要。
・公正証書遺言は家庭裁判所の検認が不要。
・外国人や国際相続が関係する場合、準拠法、翻訳・通訳、相続税、海外財産の扱いは専門確認が必要。
```

### injection_needs_review_addendum

```text
※ 本国での効力、国際相続、海外財産、通訳・翻訳要件は個別確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex Loop19 | 公正証書遺言の窄事实として ANSWER_RUNTIME に昇格。 | ai_extracted | ai_verified | loop19-promote |
