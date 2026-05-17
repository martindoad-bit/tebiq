---
fact_id: rikon-todoke-procedure
title: 離婚届 — 市区町村手続と入管14日届出は別物
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: '2026-05-17'
sprint: fact-window-bulk-1
citation_label: 離婚届手続
citation_summary: 協議離婚は両者の署名（証人2名）で市区町村へ離婚届を提出することで成立。配偶者ビザ等の場合は入管に14日以内届出義務。
source_display_names:
  - 法務省/出入国在留管理庁
applies_when:
  - 離婚 届出
  - 国際離婚 手続
does_not_cover:
  - 調停離婚・裁判離婚（家庭裁判所）
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: >-
      https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    label: ISA — 配偶者届出
    accessed: '2026-05-17'
  - url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-3.html'
    label: 法務省 — 離婚届
    accessed: '2026-05-17'
applies_to:
  - 在留外国人で離婚する者
direct_fact_fields:
  - 協議離婚では市区町村に離婚届を提出する
  - 配偶者類型の在留資格者は離婚・死別後14日以内に入管へ届出する
  - 離婚届と入管届出は別手続き
ai_inferred_fields:
  - 一方が外国にいる場合は調停・裁判離婚が必要
  - 在留資格は離婚後6か月不活動で取消事由⑦
needs_review_flags:
  - international_divorce_jurisdiction
  - dv_specific_protection_procedure
  - childcare_responsibility_after_divorce
related_links:
  - title: ISA — 配偶者届出
    url: >-
      https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    organization: 出入国在留管理庁
    display_label: 配偶者届出
    locator: 14日
    relation: official_reference
evidence_points:
  - claim: 配偶者類型の在留資格者は、離婚・死別後14日以内に入管へ届出する必要がある。
    source_title: ISA — 配偶者届出
    source_url: >-
      https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    source_organization: 出入国在留管理庁
    source_locator: 14日
    display_label: 入管14日届出
    support_level: direct
    user_visible: true
    needs_domain_review: false
  - claim: 協議離婚では市区町村に離婚届を提出する。
    source_title: 法務省 — 離婚届
    source_url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-3.html'
    source_organization: 法務省
    source_locator: 離婚届
    display_label: 市区町村 離婚届
    support_level: direct
    user_visible: true
    needs_domain_review: false
reviewer: Loop8 FACT/DOMAIN intersect
controlled_alpha_eligible: false
---

## current_effective_fact

離婚届：両者署名で市区町村・入管14日届出。

## must_say

- 協議離婚は両者署名
- 入管14日届出
- 6か月不活動で取消事由

## injection_format

### injection_certain_block

```text
【離婚届 / 入管14日届出／{{TODAY_ISO}} 公式】
・協議離婚では市区町村に離婚届を提出する。
・配偶者類型の在留資格者は、離婚・死別後14日以内に入管へ届出する。
・市区町村の離婚届と入管への届出は別手続き。届出は在留継続の保証ではない。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
