---
fact_id: jukyochi-90days-torikeshi
title: 住居地届出 — 90日以内未届で取消事由⑧⑨⑩
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住居地90日取消"
citation_summary: "新規許可後または住居地変更後90日以内に住居地届出を行わない場合、または虚偽届出を行った場合は在留資格取消事由⑧⑨⑩に該当する。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "新規上陸後 住所届出忘れた"
  - "引っ越し 90日 取消"
does_not_cover:
  - "14日届出義務（別カード）— 90日は取消事由のみ"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    label: ISA — 在留資格取消制度
    accessed: "2026-05-17"
applies_to:
  - 全ての中長期在留者
direct_fact_fields:
  - 取消事由⑧：新規許可後90日以内の住居地未届
  - 取消事由⑨：住居地変更後90日以内の新届出未提出
  - 取消事由⑩：虚偽の住居地届出
  - 14日届出は別個の義務（罰金）
ai_inferred_fields:
  - 「正当な理由」がある場合は取消対象外
needs_review_flags:
  - seijou_riyu_examples
  - simultaneous_14day_obligation
related_links:
  - title: "ISA — 在留資格取消"
    url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    organization: "出入国在留管理庁"
    display_label: "取消制度"
    locator: "90日"
    relation: "official_reference"
evidence_points:
  - claim: "新規許可後/変更後90日以内の住居地未届と虚偽届出は取消事由⑧⑨⑩。"
    source_title: "ISA — 取消制度"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "90日"
    display_label: "住居地90日取消"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

住居地90日未届/虚偽届出は取消事由。

## common_user_phrases

- 住居地 90日 取消
- 引越し 入管 忘れた

## must_say

- 14日内届出義務（罰金）
- 90日未届で取消事由⑧⑨

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
