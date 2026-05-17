---
fact_id: shozoku-kikan-henkou-14days
title: 所属機関等届出 — 契約変更/転職/退職から14日以内（就労資格者）
state: ai_verified   # DOMAIN 2026-05-17 PROMOTE: ISA 官方明確、用戶高頻；卡内已強調"届出非工作許可"
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "所属機関届出14日"
citation_summary: "技人国・高度専門職・研究・介護・興行・技能・特定技能など就労資格者は、契約機関の名称変更・所在地変更・消滅・契約終了・新規契約締結から14日以内に届出義務がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国で転職した"
  - "会社が倒産した"
  - "会社名が変わった"
does_not_cover:
  - "資格外活動許可の申請（別カード）"
  - "在留資格変更が必要となるケース（業務範囲変更）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html
    label: ISA — 所属機関等届出
    accessed: "2026-05-17"
applies_to:
  - 高度専門職1号イ・ロ、高度2号、研究、技人国、介護、興行、技能、特定技能
direct_fact_fields:
  - 期限：事由発生日から14日以内
  - 届出事由：契約機関の名称変更、所在地変更、消滅、契約終了、新規契約締結
  - 届出方法①：電子届出システム（24/365）
  - 届出方法②：窓口持参（最寄りの地方入管）
  - 届出方法③：郵送（東京入管在留調査部門・東京都新宿区四谷1-6-1四谷タワー14階）
  - 電子届出は証明書類不要
  - 窓口/郵送は在留カード写し添付
ai_inferred_fields:
  - 怠ると20万円以下の罰金（入管法第71条の3）
  - 在留更新時の不利な扱いリスク
needs_review_flags:
  - penalty_amount_official_source
  - online_system_account_creation
  - registered_mail_recommendation
related_links:
  - title: "ISA — 所属機関等届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
    organization: "出入国在留管理庁"
    display_label: "所属機関届出"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "就労資格者は契約機関の名称変更・所在地変更・消滅・契約終了・新規契約締結から14日以内に所属機関等届出が必要。電子届出/窓口/郵送いずれも可。"
    source_title: "ISA — 所属機関等届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
    source_organization: "出入国在留管理庁"
    source_locator: "14日以内"
    display_label: "所属機関届出14日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

就労資格者は契約事由から14日以内に届出。罰金あり。

## common_user_phrases

- 転職 入管 届出
- 所属機関 届出 14日
- 退職 入管 通知

## must_say

- 14日以内
- 電子届出可
- 怠ると罰金
- 届出≠工作許可（業務範囲が変われば別途変更許可必要）

## injection_format

### injection_certain_block

```text
- 就労資格者（高度専門職1号イ・ロ／2号、研究、技人国、介護、興行、技能、特定技能等）は、契約機関の**名称変更・所在地変更・消滅・契約終了・新規契約締結**から**14日以内**に「所属機関等に関する届出」を提出する義務がある（入管法第19条の16）。
- 届出方法は電子届出システム（24/365）/ 最寄りの地方入管窓口 / 郵送（東京入管在留調査部門）のいずれか。電子届出は証明書類不要。
- **この届出は「同じ在留資格の活動範囲内」での所属変更を通知するもので、新しい職務の活動許可ではない**。新しい職務が現在の在留資格の活動範囲（例：技人国の専門性・技術性・人文知識）に該当しない場合は、別途「在留資格変更許可申請」が必要で、その許可が下りるまで新しい業務を開始してはならない。
- 怠ると20万円以下の罰金（入管法第71条の3）。
- 出典: 出入国在留管理庁「所属機関等に関する届出」 https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
