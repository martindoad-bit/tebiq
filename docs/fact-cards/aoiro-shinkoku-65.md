---
fact_id: aoiro-shinkoku-65
title: 青色申告 — 65万円特別控除・複式簿記+e-Tax要件
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "青色申告65万"
citation_summary: "個人事業者の青色申告は最大65万円の特別控除あり。複式簿記＋e-Tax または電子帳簿保存が必要。事前に青色申告承認申請が必要（3月15日または開業から2か月以内）。"
source_display_names:
  - "国税庁"
applies_when:
  - "青色申告"
  - "65万円控除"
does_not_cover:
  - "白色申告の記帳義務"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 青色申告
    accessed: "2026-05-17"
applies_to:
  - 個人事業者
direct_fact_fields:
  - 特別控除：65万円（複式簿記+e-Tax）/55万円（複式のみ）/10万円（簡易）
  - 事前申請：3月15日または開業から2か月以内
  - 専従者給与の必要経費算入可
  - 純損失3年繰越可
ai_inferred_fields:
  - 経営管理ビザ申請時の事業計画書作成に役立つ
needs_review_flags:
  - e-tax_certificate_specifics
  - blue_application_form_details
  - shinkoku-funen-tsui_kasan_zei
related_links:
  - title: "国税庁 — 確定申告"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "青色申告"
    locator: "65万円"
    relation: "official_reference"
evidence_points:
  - claim: "青色申告は複式簿記+e-Taxで65万円特別控除可。事前に青色申告承認申請が必要（3月15日または開業2か月以内）。"
    source_title: "国税庁 — 青色申告"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "青色申告"
    display_label: "青色申告65万"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

青色申告：複式+e-Taxで65万円控除・事前承認申請要。

## must_say

- 複式+e-Taxで65万円
- 事前申請（3/15 or 開業2か月）
- 専従者給与経費算入可

## injection_format

### injection_certain_block

```text
- 青色申告：複式+e-Taxで65万円控除・事前承認申請要。
- 複式+e-Taxで65万円
- 事前申請（3/15 or 開業2か月）
- 専従者給与経費算入可
- 出典: 国税庁 — 青色申告 https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
