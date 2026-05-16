---
fact_id: zairyu-card-loss-overseas
title: 在留カード紛失 — 海外滞在中の対応・帰国後14日以内に再交付
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "海外在留カード紛失"
citation_summary: "海外滞在中に在留カードを紛失した場合、帰国後最初の入国日から14日以内に地方入管で再交付申請が必要。再入国時には現地警察報告書または事情説明書を準備。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "海外 在留カード 紛失"
  - "再入国 カードなし"
does_not_cover:
  - "国内紛失時の対応（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    label: ISA — 在留カード再交付
    accessed: "2026-05-17"
applies_to:
  - 海外で在留カード紛失/盗難の中長期在留者
direct_fact_fields:
  - 申請期限：帰国後最初の入国日から14日以内
  - 必要：現地警察報告書 or 事情説明書
  - 再入国時：旅券＋みなし再入国の証明（出国カードの控え）
  - 申請場所：住居地管轄地方入管
  - 手数料：無料
ai_inferred_fields:
  - 入国審査時に在留カード再交付申請の意思を伝える
needs_review_flags:
  - immigration_at_entry_specific_procedure
  - foreign_police_report_translation_requirement
  - minasai-nyukoku_evidence_specifics
related_links:
  - title: "ISA — 再交付"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    organization: "出入国在留管理庁"
    display_label: "再交付"
    locator: "帰国後14日"
    relation: "official_reference"
evidence_points:
  - claim: "海外滞在中に在留カードを紛失した場合は帰国後14日以内に再交付申請。現地警察報告書または事情説明書を準備。"
    source_title: "ISA — 再交付"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "帰国後14日"
    display_label: "海外紛失再交付"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

海外紛失も帰国後14日以内に再交付申請。

## must_say

- 帰国後14日以内
- 現地警察報告書
- 無料

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
