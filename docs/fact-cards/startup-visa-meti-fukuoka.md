---
fact_id: startup-visa-meti-fukuoka
title: スタートアップビザ（特活）— 1年間の起業準備在留（地方公共団体管轄）
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "スタートアップビザ"
citation_summary: "経済産業省のスタートアップビザ制度を活用する地方公共団体（福岡・東京等）が、外国人起業家に1年間の特定活動を付与し、経営管理ビザの要件を整備するための在留を認める制度。"
source_display_names:
  - "経済産業省"
applies_when:
  - "スタートアップビザ"
  - "起業準備 在留"
does_not_cover:
  - "経営管理ビザの新規申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.meti.go.jp/policy/newbusiness/startupvisa/
    label: 経産省 — スタートアップビザ
    accessed: "2026-05-17"
applies_to:
  - 外国人起業家
direct_fact_fields:
  - 制度形式：特定活動による1年在留
  - 管轄：地方公共団体（東京・福岡・愛知・神戸・札幌・新潟・大阪・大田区等）
  - 目的：経営管理ビザ要件整備のための準備期間
  - 1年延長可（合計2年が上限の自治体多い）
  - 認定書：地方公共団体発行
ai_inferred_fields:
  - 2025年10月の経営管理新基準（3000万円等）を踏まえ計画書要件強化の動き
  - 自治体ごとに対象業種・支援内容が異なる
needs_review_flags:
  - participating_municipality_list_2026
  - extension_after_2years_options
  - 3000man_pre_satisfy_required_practice
related_links:
  - title: "経産省 — スタートアップビザ"
    url: "https://www.meti.go.jp/policy/newbusiness/startupvisa/"
    organization: "経済産業省"
    display_label: "スタートアップビザ"
    locator: "1年特活"
    relation: "official_reference"
evidence_points:
  - claim: "スタートアップビザは地方公共団体が外国人起業家に1年（延長で2年）の特定活動を付与し、経営管理要件整備のための在留を認める制度。"
    source_title: "経産省 — スタートアップビザ"
    source_url: "https://www.meti.go.jp/policy/newbusiness/startupvisa/"
    source_organization: "経済産業省"
    source_locator: "1年特活"
    display_label: "スタートアップビザ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

スタートアップビザ：地方公共団体管轄・1年特活（延長で2年）・経営管理準備。

## must_say

- 1年（延長で2年）
- 地方公共団体認定
- 経営管理準備のため

## injection_format

### injection_certain_block

```
【スタートアップビザ／ 2026-05-17 公式】
・地方公共団体等の制度を通じ、起業準備活動のための在留枠が用意されている
・対象自治体、期間、事業計画確認、後続の経営・管理への移行条件は個別確認が必要
・取得すれば経営・管理が保証されるわけではない
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
