---
fact_id: zairyu-card-loss-overseas
title: 在留カード紛失 — 海外滞在中の対応・帰国後14日以内に再交付
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "海外在留カード紛失"
citation_summary: "海外滞在中に在留カードを紛失した場合、帰国後最初の入国日から14日以内に地方入管で再交付申請が必要。紛失・盗難の場合は紛失・盗難に係る陳述書等を確認する。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "海外 在留カード 紛失"
  - "再入国 カードなし"
does_not_cover:
  - "国内紛失時の対応（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    label: ISA — 在留カード再交付
    accessed: "2026-05-17"
applies_to:
  - 海外で在留カード紛失/盗難の中長期在留者
direct_fact_fields:
  - 申請期限：帰国後最初の入国日から14日以内
  - 必要：紛失・盗難に係る陳述書等
  - 申請場所：住居地管轄地方入管
ai_inferred_fields:
  - 入国審査時の具体対応は個別確認が必要
needs_review_flags:
  - immigration_at_entry_specific_procedure
  - foreign_police_report_translation_requirement
  - minasai-nyukoku_evidence_specifics
related_links:
  - title: "ISA — 再交付"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    organization: "出入国在留管理庁"
    display_label: "再交付"
    locator: "帰国後14日"
    relation: "official_reference"
evidence_points:
  - claim: "海外滞在中に在留カードを紛失した場合は帰国後14日以内に再交付申請。紛失・盗難の場合は紛失・盗難に係る陳述書等を確認する。"
    source_title: "ISA — 再交付"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "帰国後14日"
    display_label: "海外紛失再交付"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

海外紛失も帰国後14日以内に再交付申請。

## must_say

- 帰国後14日以内
- 紛失・盗難に係る陳述書等
- 再入国時の空港対応や翻訳要否は個別確認

## injection_format

### injection_certain_block

```text
【在留カード海外紛失／{{TODAY_ISO}} 公式】
海外滞在中に在留カードを紛失・盗難等で失った場合、帰国後14日以内に地方出入国在留管理官署で再交付申請を行う。
紛失・盗難の場合は、紛失・盗難に係る陳述書等を確認する。
このカードは国内紛失時の手続や再入国可否の個別判断までは扱わない。
```

### injection_needs_review_addendum

```text
※ 再入国時の空港対応、現地警察報告書の翻訳要否は個別確認が必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop11 | 「事情説明書」を公式カード側の用語に近い「紛失・盗難に係る陳述書等」へ修正。再入国可否・翻訳要否は扱わない境界を維持。 | ai_verified | ai_verified | loop11-term-fix |
| 2026-05-17 | Codex Loop11 | FACT/DOMAIN/AQL review 后 promote。范围限定为海外知悉后帰国後14日以内再交付申请和说明资料；不判断再入国可否。 | ai_extracted | ai_verified | loop11-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
