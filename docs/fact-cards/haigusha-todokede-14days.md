---
fact_id: haigusha-todokede-14days
title: 配偶者に関する届出 — 離婚/死別から14日以内（家滞/日配/永配）
state: ai_verified   # DOMAIN 2026-05-17 PROMOTE: ISA 官方明確、簡単可検証、用戶高頻
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "配偶者届出14日"
citation_summary: "家族滞在・日本人の配偶者等・永住者の配偶者等の在留資格者は、配偶者と離婚または死別したときは、事由発生から14日以内に届出義務がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "配偶者と離婚した"
  - "配偶者と死別した"
  - "家滞主が技人国で離職→自分の家滞どうなる"
does_not_cover:
  - "離婚後の定住者変更要件（別カード）"
  - "家滞主の所属機関届出"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    label: ISA — 配偶者に関する届出
    accessed: "2026-05-17"
applies_to:
  - 家族滞在、日本人の配偶者等、永住者の配偶者等
direct_fact_fields:
  - 期限：事由発生から14日以内
  - 届出方法：電子届出（24/365）/ 窓口持参 / 郵送（東京入管）
  - 電子届出は証明書類不要
  - 窓口/郵送は在留カード写し
  - 怠ると20万円以下の罰金（入管法第71条の3）
ai_inferred_fields:
  - 届出後も活動継続6か月不実施で取消事由⑦該当リスク
needs_review_flags:
  - dependent_main_visa_loss_combined
  - re_marriage_notification_within_period
related_links:
  - title: "ISA — 配偶者届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    organization: "出入国在留管理庁"
    display_label: "配偶者届出"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "家滞・日配・永配の在留資格者は、離婚・死別から14日以内に届出義務。罰則あり。"
    source_title: "ISA — 配偶者届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "14日以内"
    display_label: "配偶者届出14日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

家滞・日配・永配の離婚/死別は14日以内届出。

## common_user_phrases

- 離婚 14日 届出
- 死別 入管 通知
- 配偶者 届出

## must_say

- 14日以内
- 罰金あり
- 6か月不活動で取消事由
- 届出≠資格維持許可

## injection_format

### injection_certain_block

```text
- 家族滞在・日本人の配偶者等・永住者の配偶者等の在留資格者は、配偶者と**離婚または死別**したときは、事由発生日から**14日以内**に「配偶者に関する届出」を提出する義務がある（入管法第19条の16）。
- 届出方法は電子届出（24/365）/ 入管窓口持参 / 郵送（東京入管）のいずれか。電子届出は証明書類不要、窓口/郵送は在留カード写しを添付。
- **届出をしたこと自体は在留資格の維持を保証しない**。配偶者の身分を基礎とする在留資格は、離婚/死別から6か月活動実態がなければ取消事由⑦に該当しうる。次の在留資格（定住者/就労資格/別の身分）への切替は別途審査。
- 怠ると20万円以下の罰金（入管法第71条の3）。
- 出典: 出入国在留管理庁「配偶者に関する届出」 https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
