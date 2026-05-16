---
fact_id: eijuusha-haigusha-divorce
title: 永住者の配偶者等 — 離婚・死別後の14日届出 + 在留資格見直し
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住者配偶者離婚届出"
citation_summary: "永住者の配偶者等資格は永住者との婚姻関係に依拠。離婚・死別時は14日以内に届出義務、活動継続6か月不実施で資格取消事由⑦該当リスク。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户与永住者配偶离婚"
  - "永住者配偶死亡"
  - "再婚后能否继续保持永住者的配偶者资格"
does_not_cover:
  - "離婚定住への変更要件（別カード）"
  - "永住者本人の永住資格喪失要件"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html
    label: ISA — 永住者の配偶者等
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    label: ISA — 配偶者に関する届出
    accessed: "2026-05-17"
applies_to:
  - 永住者の配偶者等資格保持者
direct_fact_fields:
  - 離婚・死別時：14日以内に届出義務
  - 活動継続6か月不実施：在留資格取消事由⑦該当（実務）
  - 再婚相手が永住者でない場合、当該資格は維持不可
  - 在留期間：5/3/1/0.5年
ai_inferred_fields:
  - 離婚後は定住者への変更検討が一般的（離婚定住）
  - 子供を養育中なら定住者変更の可能性が高まる
needs_review_flags:
  - rikon_teiju_application_route
  - remarriage_to_japanese_status_change
  - dv_protected_exception
related_links:
  - title: "ISA — 配偶者に関する届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    organization: "出入国在留管理庁"
    display_label: "配偶者届出"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "永住者の配偶者等資格者が離婚・死別した場合は14日以内に届出義務。活動継続6か月不実施で取消事由⑦該当のリスク。"
    source_title: "ISA — 配偶者届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「14日以内」"
    display_label: "離婚届出14日・6か月取消"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住者の配偶者等資格は婚姻関係依拠。離婚14日届出、6か月不活動で取消事由。

## common_user_phrases

- 永住者 離婚 在留資格
- 永住者の配偶者 離婚
- 永住者 死別 在留

## must_say

- 14日以内届出義務
- 6か月不活動で取消事由
- 定住者変更検討

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
