---
fact_id: gijinkoku-major-job-match
title: 技人国 — 専攻科目・実務経験と業務の関連性
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-18"
sprint: "fact-window-bulk-1"
citation_label: "技人国 専攻一致"
citation_summary: "技術・人文知識・国際業務の申請資料では、申請に係る職務内容・期間を明示した履歴書と、学歴又は職歴等の証明文書を提出する。ISAの明確化資料は、技術・知識業務では関連科目の専攻又は10年以上の実務経験等、国際業務では関連業務3年以上の実務経験等を示している。"
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
  - url: https://www.moj.go.jp/isa/content/001413644.pdf
    label: ISA — 技術・人文知識・国際業務の在留資格の明確化等について（統合版）
    accessed: "2026-05-18"
applies_to:
  - 技人国申請者
direct_fact_fields:
  - 活動：自然科学又は人文科学の分野に属する技術・知識を要する業務、又は外国の文化に基盤を有する思考・感受性を必要とする業務
  - 申請資料：申請に係る技術又は知識を要する職務に従事した機関、内容、期間を明示した履歴書
  - 技術・知識業務：関連科目を専攻して大学卒業等、専門学校専門課程修了等、又は10年以上の実務経験等
  - 国際業務：従事しようとする業務に関連する業務について3年以上の実務経験。ただし大学卒業者が翻訳・通訳又は語学指導に従事する場合はこの限りでない
ai_inferred_fields:
  - 個別職務と専攻・職歴の関連性の強弱は案件資料で確認する
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
  - title: "ISA — 技人国の明確化等について（統合版）"
    url: "https://www.moj.go.jp/isa/content/001413644.pdf"
    organization: "出入国在留管理庁"
    display_label: "技人国明確化"
    locator: "許可基準"
    relation: "official_reference"
evidence_points:
  - claim: "技術・知識業務では関連科目の専攻又は10年以上の実務経験等、国際業務では関連業務3年以上の実務経験等が示されている。"
    source_title: "ISA — 技人国の明確化等について（統合版）"
    source_url: "https://www.moj.go.jp/isa/content/001413644.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "許可基準"
    display_label: "技人国 専攻・実務経験"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

技術・人文知識・国際業務では、従事する業務と関連科目の専攻又は関連業務の実務経験等が問題になる。技術・知識業務は10年以上の実務経験等、国際業務は関連業務3年以上の実務経験等が示されている。

## must_say

- 技術・知識業務は、関連科目の専攻又は10年以上の実務経験等が示されている
- 国際業務は、関連業務3年以上の実務経験等が示されている
- 大学卒業者が翻訳・通訳又は語学指導に従事する場合の例外を落とさない
- 個別職務と専攻・職歴の関連性の強弱は案件資料で確認する

## injection_format

### injection_certain_block

```text
【技術・人文知識・国際業務 専攻・職歴ファクト / {{TODAY_ISO}} 公式】
・技術・人文知識・国際業務では、従事する業務と関連する科目の専攻、又は関連業務の実務経験等が確認点になる。
・技術・知識業務では、関連科目の専攻又は10年以上の実務経験等が示されている。
・国際業務では、関連業務について3年以上の実務経験等が示されている。ただし大学卒業者が翻訳・通訳又は語学指導に従事する場合はこの限りでない。
・個別職務と専攻・職歴の関連性は案件資料で確認する。許可可否は断定しない。
```

### injection_needs_review_addendum

```text
※ 文系からIT、販売・営業・現場作業との混在、職務説明書の書き方は個別確認が必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex FACT rewrite | 許否予測・完全一致不要などの評価語を外し、ISAページと明確化資料の専攻/実務経験要件に限定。 | ai_extracted | ai_extracted | rewrite |
| 2026-05-18 | Codex Loop19 | 専攻・実務経験の窄事实として ANSWER_RUNTIME に昇格。 | ai_extracted | ai_verified | loop19-promote |
