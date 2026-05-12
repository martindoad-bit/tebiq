# Legal Source Card Template

**Purpose**: normalize legal-source card drafts before they become standard `docs/fact-cards/*.md` files.

This template is for P0 legal-source cards only. It does not replace the canonical fact-card contract in [`README.md`](./README.md). If this template conflicts with `README.md` or `scripts/fact-layer-sync.ts`, the existing runtime contract wins.

---

## Frontmatter Skeleton

```yaml
---
fact_id: legal-source-example
title: Example Legal Source Card
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1
citation_label: "短い表示名"
citation_summary: "このカードが確認する法源上の事実。"
source_display_names:
  - "出入国在留管理庁"
  - "e-Gov 法令検索"
legal_source:
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一"
  source_locator: "別表第一"
  claim_type: activity_scope
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - current-status
  exclusion_scope:
    - "许可可能性判断"
    - "个案是否符合审查"
  deep_water_candidate: false
applies_when:
  - "用户询问某在留资格允许做什么活动"
does_not_cover:
  - "能否获批"
  - "具体材料是否充足"
official_sources:
  - id: source-id
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "在留资格活动范围判断"
direct_fact_fields:
  - field_name
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "短い claim"
    source_title: "出入国在留管理庁：在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内該当資格の行"
    display_label: "表示用ラベル"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---
```

---

## Body Skeleton

````markdown
# Title

## current_date_logic

```text
This card reflects the current official source text checked on YYYY-MM-DD.
If source version/effective date is not visible, mark it in needs_review_flags.
```

## current_effective_fact

### Fact heading

Short source-backed explanation.

> "short official quote"
> source: source-id

## exceptions_or_transition

- If none, state: "No exception identified from this card's source scope."
- If unknown, put it in `needs_review_flags`.

## common_user_phrases

- 中文 phrase 1
- 中文 phrase 2
- 日本語 keyword
- colloquial phrase
- risk phrase

## must_say

- ...

## must_not_say

- ...

## qa_cases

### QA-1

**user**: ...

**must_have**:

- ...

**must_not_have**:

- ...

## injection_format

### injection_certain_block

```text
Only source-backed facts that may be injected when state/risk gates pass.
```

### injection_needs_review_addendum

```text
Only generic caution, no unverified factual claim.
```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-12 | FACT/Codex | Initial extraction | — | ai_extracted | P0 Cycle 1 |
````

---

## P0 Cycle 1 Extra Rules

- Do not set `state: ai_verified` for Batch 1 until dry-run/AQL/QA pass.
- Do not write permission probability as a fact.
- Do not collapse L1 law text and L4 ISA page text into one undifferentiated source.
- If a source is silent, preserve silence as `needs_review_flags` or `does_not_cover`.
- User-visible wording must never include `matcher`, `dry-run`, `source package`, `ai_inferred`, `needs_domain`, or QA labels like P0/P1.
