---
fact_id: kazoku-taizai-shotoku-280
title: 家族滞在 — 扶養者の職業・収入資料を提出
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-18"
sprint: "fact-window-bulk-1"
citation_label: "家族滞在 扶養資料"
citation_summary: "家族滞在は、一定の在留資格で在留する者の扶養を受ける配偶者又は子として行う日常的な活動。ISA公式ページの提出書類には、扶養者の職業及び収入を証する文書、又は扶養者名義の預金残高証明書等が含まれる。公式ページ上の要件説明は固定年収額を示していない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家滞 年収 必要"
  - "家族 呼び寄せ 収入"
does_not_cover:
  - "高度人材の家族呼び寄せ（緩和あり）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 家族呼び寄せ予定の在留者
direct_fact_fields:
  - 活動：一定の在留資格で在留する者の扶養を受ける配偶者又は子として行う日常的な活動
  - 収入を伴う活動を行う扶養者については、職業及び収入を証する文書として在職証明書又は営業許可書の写し等、住民税の課税又は非課税証明書及び納税証明書等が掲げられている
  - それ以外の活動を行う扶養者については、扶養者名義の預金残高証明書又は奨学金給付に関する証明書等が掲げられている
  - 公式ページ上の要件説明は固定年収額を示していない
ai_inferred_fields:
  - 実務目安として語られる金額があるが、公式の固定ラインではない
needs_review_flags:
  - jisshou_amount_2026
  - kazoku_kosei_specific_multiplier
  - kodo_jinzai_specific_relaxation
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "扶養能力"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在の提出書類には、扶養者の職業及び収入を証する文書、又は扶養者名義の預金残高証明書・奨学金給付に関する証明書等が含まれる。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "扶養能力"
    display_label: "家族滞在の扶養能力確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

家族滞在の提出書類には、扶養者の職業及び収入を証する文書、又は扶養者名義の預金残高証明書・奨学金給付に関する証明書等が含まれる。公式ページ上の要件説明は固定年収額を示していない。

## must_say

- 公式ページ上の要件説明は固定年収額を示していない
- 収入を伴う活動を行う扶養者は職業及び収入を証する文書を提出する
- それ以外の扶養者は預金残高証明書又は奨学金給付に関する証明書等を提出する
- 「年収○万円なら必ず許可／必ず不許可」と断定しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex FACT rewrite | 固定年収・住居/家族構成推論を降温し、家族滞在ページの活動定義と扶養者資料に限定。 | ai_extracted | ai_extracted | rewrite |
