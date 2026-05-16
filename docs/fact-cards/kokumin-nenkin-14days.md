---
fact_id: kokumin-nenkin-14days
title: 国民年金 — 退職/転入から14日以内に種別変更（1号被保険者）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国民年金種別変更"
citation_summary: "厚生年金（2号）から退職等で外れた者は、14日以内に区役所で国民年金（1号）への種別変更手続が必要。怠ると未納扱いで遡及課金。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "退職後 年金"
  - "厚生年金 国民年金 切替"
does_not_cover:
  - "免除申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金関連）
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者で厚生年金から外れた者
direct_fact_fields:
  - 期限：14日以内
  - 手続：区役所国民年金窓口
  - 必要：在留カード、年金手帳、退職証明等
  - 怠ると未納扱い、遡及課金
ai_inferred_fields:
  - 配偶者が会社員なら3号被保険者切替も可能
needs_review_flags:
  - 3go_kirikae_specifics
  - nenkin_techo_alternative_for_lost
  - shotoku_low_menjo_apply_simultaneously
related_links:
  - title: "ISA — 永住（年金）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "ISA/年金機構"
    display_label: "年金"
    locator: "種別変更"
    relation: "official_reference"
evidence_points:
  - claim: "厚生年金から外れた者は14日以内に国民年金1号への種別変更手続必要。"
    source_title: "年金機構（公式整合）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構"
    source_locator: "14日・種別変更"
    display_label: "国民年金種別変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

退職後14日以内に国民年金種別変更。

## must_say

- 14日以内
- 区役所手続
- 怠ると遡及課金

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
