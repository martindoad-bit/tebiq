---
fact_id: overstay-self-report-route
title: 不法残留 — 自首制度と退去強制
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "不法残留自首"
citation_summary: "オーバーステイ等の不法残留者が自ら入管に出頭した場合、退去強制ではなく出国命令制度（最長15日以内出国・1年再上陸制限）の対象となり得る。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "オーバーステイ 自首"
  - "不法残留 出国"
does_not_cover:
  - "在留特別許可申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-9.html
    label: ISA — 退去強制
    accessed: "2026-05-17"
applies_to:
  - 不法残留状態の外国人
direct_fact_fields:
  - 出国命令制度：自首者向け、最長15日内出国
  - 再上陸制限：1年（退去強制は5年/10年）
  - 要件：在留期間経過・自ら出頭・退去強制歴なし・売春等の犯罪なし・速やかな出国意思
  - 自首の効果：刑事訴追軽減・再入国機会保持
ai_inferred_fields:
  - 入管出頭は弁護士同行推奨
needs_review_flags:
  - 1year_vs_5_10year_reentry_criterion
  - shutsukoku-meirei_application_form
  - taikyoukyousei_history_specific
related_links:
  - title: "ISA — 退去強制"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    organization: "出入国在留管理庁"
    display_label: "退去強制"
    locator: "出国命令"
    relation: "official_reference"
evidence_points:
  - claim: "オーバーステイ等の自首者は出国命令制度（最長15日内出国・1年再上陸制限）の対象となり得る。退去強制（5/10年制限）より軽い扱い。"
    source_title: "ISA — 退去強制"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    source_organization: "出入国在留管理庁"
    source_locator: "出国命令"
    display_label: "不法残留自首"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

自首は出国命令制度（15日内出国・1年再上陸制限）。

## must_say

- 自首で出国命令制度
- 1年再上陸制限
- 退去強制（5/10年）より軽い

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
