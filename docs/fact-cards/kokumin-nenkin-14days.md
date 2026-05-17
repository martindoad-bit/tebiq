---
fact_id: kokumin-nenkin-14days
title: 国民年金 — 退職後は14日以内に第1号被保険者の加入手続
state: ai_verified   # LOOP2 2026-05-17: source repaired to Japan Pension Service retirement procedure
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国民年金種別変更"
citation_summary: "厚生年金（2号）から退職等で外れ、すぐ次の会社に入らない20歳以上60歳未満の人は、退職日の翌日から14日以内に国民年金第1号被保険者の加入手続が必要。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "退職後 年金"
  - "厚生年金 国民年金 切替"
does_not_cover:
  - "免除申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html
    label: 日本年金機構 — 国民年金に加入するための手続き
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者で厚生年金から外れた者
direct_fact_fields:
  - 期限：退職日の翌日から14日以内
  - 手続：市区町村の国民年金窓口または電子申請
  - 必要：基礎年金番号またはマイナンバー、退職日を確認できる書類等
  - 対象：20歳以上60歳未満で厚生年金から外れ、すぐ次の会社に入らない人
ai_inferred_fields:
  - 配偶者が会社員なら3号被保険者切替も可能
needs_review_flags:
  - 3go_kirikae_specifics
  - nenkin_techo_alternative_for_lost
  - shotoku_low_menjo_apply_simultaneously
related_links:
  - title: "日本年金機構 — 国民年金に加入するための手続き"
    url: "https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html"
    organization: "日本年金機構"
    display_label: "退職後の国民年金"
    locator: "退職日の翌日から14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "退職日の翌日から14日以内に国民年金第1号被保険者の加入手続が必要。"
    source_title: "日本年金機構 — 国民年金に加入するための手続き"
    source_url: "https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html"
    source_organization: "日本年金機構"
    source_locator: "退職日の翌日から14日以内"
    display_label: "退職後の国民年金14日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

退職後、次の会社にすぐ入らない場合は14日以内に国民年金1号加入手続。

## must_say

- 14日以内
- 市区町村窓口または電子申請
- 次の厚生年金加入まで空白期間を作らない

## injection_format

### injection_certain_block

```text
- 退職して厚生年金から外れ、すぐ次の会社で厚生年金に入らない20歳以上60歳未満の人は、国民年金第1号被保険者の加入手続が必要。
- 手続期限は退職日の翌日から14日以内。市区町村の国民年金窓口、または電子申請で行う。
- 退職後の健康保険手続とは別に、年金の切替も確認する。
- 出典: 日本年金機構「国民年金に加入するための手続き」 https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop2 | 年金機構URLへsource repairし、未確認の遡及表現を外してruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
