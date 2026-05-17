---
fact_id: shussan-ichijikin-50man
title: 出産育児一時金 — 1子50万円（2023年4月〜）・直接支払制度
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "出産育児一時金"
citation_summary: "健康保険被保険者および被扶養者が出産した場合、1子につき50万円（2023年4月以降）の出産育児一時金が支給される。直接支払制度で医療機関に直接支払い可能。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "出産 給付金"
  - "外国人 出産 50万"
does_not_cover:
  - "新生児の在留資格取得（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html
    label: 厚労省 — 出産育児一時金
    accessed: "2026-05-17"
applies_to:
  - 健康保険被保険者・被扶養者
direct_fact_fields:
  - 額：1子50万円（2023年4月〜・産科医療補償制度加入機関）
  - 制度外機関：48.8万円
  - 直接支払制度：医療機関に直接支払い可
  - 受取代理制度：小規模医療機関向け
  - 海外出産は事後申請可
ai_inferred_fields:
  - 多胎は子1人につき50万円
  - 国保加入者も対象
needs_review_flags:
  - kakuninken_method_2026
  - kaigai_shussan_required_documents
  - tantei_taizai_shussan_handling
related_links:
  - title: "厚労省 — 出産育児一時金"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html"
    organization: "厚生労働省"
    display_label: "出産育児一時金"
    locator: "50万円"
    relation: "official_reference"
evidence_points:
  - claim: "出産育児一時金は1子50万円（2023年4月以降）。直接支払制度で医療機関への直接支払いも可能。海外出産も事後申請可。"
    source_title: "厚労省 — 出産育児一時金"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html"
    source_organization: "厚生労働省"
    source_locator: "50万円"
    display_label: "出産育児一時金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

出産育児一時金1子50万円（2023-04〜）・直接支払制度あり。

## must_say

- 1子50万円
- 直接支払制度
- 海外出産も対象

## injection_format

### injection_certain_block

```text
- 出産育児一時金は、健康保険等の加入者が出産した場合に支給される制度で、2023年4月以降は原則50万円の案内がある。
- 直接支払制度の利用可否や海外出産時の必要書類は、加入中の保険者で確認する。
- 出典: 厚生労働省 — 出産育児一時金 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
