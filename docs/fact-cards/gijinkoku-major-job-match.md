---
fact_id: gijinkoku-major-job-match
title: 技人国 — 専攻と職務の関連性原則（学歴 vs 職務一致）
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "技人国 専攻一致"
citation_summary: "技人国の許否判断では、申請者の学歴・専攻と職務内容の関連性が審査される。完全一致は不要だが関連性が薄いと不許可リスク。実務経験10年（国際業務は3年）で学歴要件代替可。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国 専攻 関係ない"
  - "文系 IT 技人国"
does_not_cover:
  - "経験年数代替の詳細要件（別ガイドライン）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 技人国申請者
direct_fact_fields:
  - 原則：専攻と職務の関連性が必要
  - 学歴代替：実務経験10年（国際業務は3年）
  - 関連性希薄は不許可リスク
  - カテゴリー3/4は職務内容説明書必須
ai_inferred_fields:
  - 「関連性」の判断は柔軟（実務）
  - 翻訳・通訳業務は文系/語学系専攻で多く認容
needs_review_flags:
  - kanrensei_specific_acceptable_range
  - jissmu_keiken_proof_documents
  - bunkei_to_IT_kashuu_practice
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "専攻"
    relation: "official_reference"
evidence_points:
  - claim: "技人国は専攻と職務の関連性が必要。実務経験10年（国際業務は3年）で学歴代替可。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "専攻一致"
    display_label: "技人国 専攻一致"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

技人国：専攻関連必要・実務10年（国際業務3年）で代替。

## must_say

- 専攻関連必要
- 10年実務で代替可
- 国際業務は3年

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
