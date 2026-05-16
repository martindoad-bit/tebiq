---
fact_id: shozoku-online-system-todokede
title: 所属機関等届出 — 電子届出システム（24/365利用可）
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "電子届出システム"
citation_summary: "所属機関等届出・配偶者に関する届出は電子届出システムで24時間365日利用可。証明書類添付不要、メール通知あり。事前にアカウント登録が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "所属機関届出 オンライン"
  - "電子届出"
does_not_cover:
  - "在留資格申請のオンライン（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html
    label: ISA — 所属機関等届出
    accessed: "2026-05-17"
applies_to:
  - 就労資格者・配偶者等資格者
direct_fact_fields:
  - 利用時間：24時間365日
  - 証明書類：添付不要
  - 事前登録：必要（メールアドレス）
  - 届出受領通知：メール
  - 利用料：無料
ai_inferred_fields:
  - スマホ対応
  - 履歴確認可
needs_review_flags:
  - smartphone_compatibility_2026
  - history_storage_period
  - account_termination_for_inactivity
related_links:
  - title: "ISA — 所属機関等届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
    organization: "出入国在留管理庁"
    display_label: "所属機関届出"
    locator: "電子届出"
    relation: "official_reference"
evidence_points:
  - claim: "所属機関等届出・配偶者届出は電子届出システムで24/365利用可。証明書類不要、事前アカウント登録要。"
    source_title: "ISA — 所属機関等届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
    source_organization: "出入国在留管理庁"
    source_locator: "電子届出"
    display_label: "電子届出システム"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

電子届出：24/365・無料・事前登録要。

## must_say

- 24/365利用可
- 証明書類不要
- 事前アカウント要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
