---
fact_id: kazoku-yobi-naitei-haigusha
title: 内定・入社前の配偶者・子の家族滞在COEタイミング
state: ai_extracted
runtime_bucket: L5_ONLY
risk_level: medium
confidence: low
source_quality: official
last_verified_at: 2026-05-18
reviewer: codex_fact_rewrite
sprint: Knowledge Runtime Loop18
citation_label: "内定前家族COEタイミング"
citation_summary: "内定段階で配偶者・子を家族滞在で呼び寄せたい相談は、扶養者の在留資格、入社状況、収入・扶養能力、海外COEか国内変更かを分ける必要がある。公式ページだけでは『内定だけで同時申請可』とは言えないため、L5-onlyとして扱う。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "内定済みだがまだ入社前の人が配偶者・子を家族滞在で呼び寄せたい"
  - "就労系在留資格のCOEや入社前後に家族のCOEタイミングを確認したい"
does_not_cover:
  - "日本人配偶者等・永住者の配偶者等の配偶者ルート"
  - "扶養者本人の就労資格COE可否"
  - "J-Findや特定活動配偶者の個別ルート"
official_sources:
  - id: isa-dependent-status
    url: https://www.moj.go.jp/isa/applications/status/dependent.html
    title: 在留資格「家族滞在」
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-18
    quoted_in_card: true
applies_to:
  - 技術・人文知識・国際業務等の就労系在留資格者が配偶者・子を呼び寄せる場合
  - 扶養者本人の在留資格・就労開始・収入証明がまだ固まっていない場合
direct_fact_fields:
  - dependent_status_for_spouse_or_child
  - relationship_and_support_documents_required
ai_inferred_fields:
  - simultaneous_coe_filing_feasibility
  - employer_letter_alternative_value
  - post_hire_income_smoothness
needs_review_flags:
  - id: same_time_filing_specific_documents
    reason: "扶養者本人のCOE/入国前に家族COEを同時申請できるか、どの代替資料が有効かは公式HTMLだけでは断言できない。"
  - id: employer_letter_alternative_value
    reason: "内定通知書・採用予定証明書・雇用契約書が在職証明や課税証明の代替になるかは個案・提出先確認が必要。"
  - id: route_confusion
    reason: "日本人配偶者等、永住者の配偶者等、家族滞在、J-Find配偶者などを混同しやすい。"
related_links:
  - title: "在留資格「家族滞在」"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在は、一定の在留資格をもって在留する者の扶養を受ける配偶者又は子の日常的な活動を対象とする。"
    source_title: "在留資格「家族滞在」"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "家族滞在ページの対象者・提出資料"
    display_label: "家族滞在：扶養を受ける配偶者又は子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "内定段階での同時COE、入社前の代替資料、入社後所得証明を待つべきかは、公式ページだけでは直接確認できない。"
    source_title: "在留資格「家族滞在」"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "家族滞在ページに内定段階の同時申請可否の明文なし"
    display_label: "内定前家族COEは個別確認"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

# 内定・入社前の配偶者・子の家族滞在COEタイミング

> Runtime scope: not for ordinary answer injection. Use as L5 / material
> planning context only because the central timing question is not directly
> answered by the official page.

## current_effective_fact

家族滞在は、一定の在留資格をもって在留する者の扶養を受ける配偶者又は子の日常的な活動を対象とする在留資格である。

ただし、内定段階で扶養者本人がまだ入社していない、まだCOEが出ていない、又は収入証明が揃っていない場合に、家族COEを同時に申請できるか、内定通知書や採用予定証明書がどこまで代替資料になるかは、公式ページだけでは断定できない。

## product_usage

このカードは普通の回答runtimeには入れない。ユーザーが「内定だけで妻/夫/子を呼べるか」と聞いた場合は、次の事実を確認するためのL5/材料誘導に使う。

- 扶養者本人の予定在留資格
- 扶養者本人のCOE又は在留資格取得状況
- 入社予定日、雇用契約、採用予定証明
- 扶養能力を示す収入・預金・会社資料
- 配偶者・子が海外にいるのか、すでに日本にいるのか
- 家族滞在なのか、日本人配偶者等・永住者の配偶者等なのか

## must_say

- 家族滞在は扶養を受ける配偶者又は子の資格。
- 内定だけで呼寄せが当然に通るとは言えない。
- 扶養者本人の在留資格・入社状況・扶養能力資料・海外COEか国内変更かを分けて確認する。

## must_not_say

- 「内定通知書があれば家族COEは問題ない」
- 「扶養者本人のCOE前でも家族COEは必ず同時に出せる」
- 「入社後の収入証明は不要」
- 「日本人配偶者等・永住者配偶者等と同じ書類でよい」

## common_user_phrases

- 内定だけで妻を呼べますか
- 入社前に家族滞在 COE
- 技人国 COE と家族 COE 同時申請
- 日本に行く前に配偶者と一緒に来たい
- まだ働き始めてないけど家族滞在
- 扶养家属 在留资格认定证明书

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex Loop18 | 「同時申請可」等を公式事実として扱わず、L5-onlyの確認カードへ改稿。 | ai_extracted | ai_extracted | source_repair |
