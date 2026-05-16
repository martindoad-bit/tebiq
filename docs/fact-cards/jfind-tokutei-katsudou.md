---
fact_id: jfind-tokutei-katsudou
title: J-Find 特定活動 — 海外有力大学卒業者の就職活動2年特活
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "J-Find 特活"
citation_summary: "海外有力大学（QS等のランキング上位）卒業から5年以内の者が、就職活動・起業準備のために最長2年間日本に在留できる特定活動カテゴリ。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "海外大学卒 来日 就職活動"
  - "J-Find"
does_not_cover:
  - "本邦大学卒の就職活動特活（別ルート）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 海外有力大学卒業から5年以内の者
direct_fact_fields:
  - 対象：QS世界大学ランキング/THE/上海ランキング 等の上位校卒業者
  - 卒業後年限：5年以内
  - 在留期間：最長2年
  - 活動：就職活動・起業準備
  - 生活費の負担能力証明必要
ai_inferred_fields:
  - 採用決定後は技人国等への切替が必要
needs_review_flags:
  - eligible_university_list_current
  - financial_proof_amount_specifics
  - dependent_family_eligibility
related_links:
  - title: "ISA — 特定活動"
    url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    organization: "出入国在留管理庁"
    display_label: "特定活動"
    locator: "J-Find"
    relation: "official_reference"
evidence_points:
  - claim: "J-Findは海外有力大学卒5年以内の者が就活/起業準備のため最長2年在留可能な特活。"
    source_title: "ISA — 特定活動"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    source_organization: "出入国在留管理庁"
    source_locator: "J-Find"
    display_label: "J-Find特活"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

J-Find：海外有力大学卒5年以内・最長2年・就活/起業準備。

## must_say

- 海外有力大学卒
- 卒業後5年以内
- 最長2年

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
