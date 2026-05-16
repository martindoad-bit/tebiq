---
fact_id: kokuho-shutoku-shoumei-2years
title: 永住申請 — 国保被保険者証コピー2年分（マイナ保険証は別資料）
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 健保2年分"
citation_summary: "永住申請の健康保険納付証明は直近2年分。マイナ保険証移行（2024年12月）以降は、マイナポータルの資格取得年月日画面の写し（3か月以内）または資格確認証で代替。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 健康保険 2年分"
  - "マイナ保険証 永住"
does_not_cover:
  - "国民健康保険料納付確認の詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 健保納付証明：直近2年分
  - マイナ保険証所持：マイナポータルの資格取得年月日確認画面（3か月以内）
  - マイナ保険証非所持：資格確認証（写し）
  - 国保切替期間ある場合：国保納付状況も提示
ai_inferred_fields:
  - 国保滞納は永住不許可のリスク
needs_review_flags:
  - mainapotal_screenshot_specific_method
  - kokuho_jusou_specific_evidence
  - mainakaado_unavailable_handling
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "健保"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請の健康保険納付証明は直近2年分。マイナ保険証所持者はマイナポータルの資格取得年月日確認画面（3か月以内）、非所持者は資格確認証で代替。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "健保2年分"
    display_label: "永住健保2年分"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住健保2年分・マイナ保険証はマイナポータル画面で代替。

## must_say

- 2年分必須
- マイナ保険証はマイナポータル画面
- 国保切替期間も対応

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
