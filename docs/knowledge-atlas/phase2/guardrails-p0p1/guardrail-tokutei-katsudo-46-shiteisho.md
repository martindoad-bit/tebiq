---
asset_id: guardrail-tokutei-katsudo-46-shiteisho
title: 特定活動46号（指定書に基づく活動）— 日本語能力が高い外国人の就職・就労を可能にする在留資格；通訳・翻訳以外の業務も可能；指定書の内容が就労範囲を決定
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 016"
---

## What This Document Is

This guardrail prevents errors about 特定活動46号 (Designated Activity No. 46), the residence status for foreign nationals with high Japanese language proficiency who want to work in Japan in jobs not limited to technical/humanities/international services. Key errors to block:

1. **"特定活動46号は日本語学校の卒業生なら誰でも取れる。"** — incorrect. 特定活動46号の主な対象は，大学・大学院（4年制）を卒業した者（または同等の学歴）で，**日本語能力試験N1または BJT ビジネス日本語能力テスト480点以上**等の高度な日本語能力を持つ者。日本語学校の卒業だけでは要件を満たさない。
2. **"特定活動46号なら，どんな仕事でも制限なくできる。"** — incorrect. 就労範囲は**指定書（法務大臣が個別に指定した活動内容）**に記載された活動に限定される。在留カードに「特定活動」と記載され，指定書が別途交付される。指定書の範囲外の活動は不法就労。
3. **"特定活動46号と技人国（技術・人文知識・国際業務）は同じ。"** — incorrect. 技人国は特定の業務カテゴリー（技術・人文知識・国際業務）に限定される。特定活動46号は，日本語能力の高い外国人が技人国では対象にならない「日本人と同等の幅広い業務」（接客・営業・製造ライン監督等）に就労できる制度として設計されている。
4. **"特定活動（告示外）46号は永住に向けたルートになる。"** — partially incorrect. 特定活動46号での在留期間は永住の10年居住要件に算入できるが，在留期間（通常1年）の更新を繰り返す必要があり，長期在留には計画的な更新管理が必要。

## Trigger

Use this card when the user says:

- "特定活動46号とは何ですか？"
- "日本の大学を卒業しましたが，技人国に当てはまらない仕事に就きたい。"
- "N1を持っていますが，技人国以外で就労できる在留資格はありますか？"
- "指定書に基づく特定活動とはどういう意味ですか？"
- "特定活動46号で飲食店で働けますか？"
- any pattern treating 特定活動46号 as unlimited work authorization or confusing it with 技人国.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-tokutei-46 | L4 | 出入国在留管理庁「特定活動（日本の大学を卒業した者等が行う本邦の公私の機関との契約に基づく活動）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities17.html | 2026-05-15 | 特定活動46号の概要・対象者（大学卒・高度日本語能力）; 就労範囲（指定書による）; 在留期間（1年）. |
| isa-tokutei-katsudo | L4 | 出入国在留管理庁「在留資格『特定活動』」 | https://www.moj.go.jp/isa/applications/status/designatedactivities.html | 2026-05-15 | 特定活動の定義（法務大臣が個々の外国人について特に指定する活動）; 指定書の役割. |
| g28-crossref | guardrail | guardrail-tokutei-katsudo-scope-boundary (G28) | internal | 2026-05-15 | G28: 特定活動=指定書bound; 活動範囲は指定書の内容で決まる; 告示カテゴリの確認. |
| g36-crossref | guardrail | guardrail-tokutei-katsudo-naitei-kyushoku (G36) | internal | 2026-05-15 | G36: 特定活動（内定者・求職者）の就労制限との比較. |

## Official Rule Or Source Fact

**特定活動46号の概要:**

2019年に新設された特定活動告示46号は，日本の大学等を卒業した高い日本語能力を持つ外国人が，技人国（技術・人文知識・国際業務）の枠組みでは就労できない業務（例: 日本人が行う一般的な業務）に就労できるようにするために設けられた。

**取得要件（主なもの）:**

| 要件 | 内容 |
|---|---|
| **学歴** | 日本の大学・大学院（4年制）等を卒業していること（または外国の大学で日本語を主専攻として修了等）|
| **日本語能力** | **日本語能力試験（JLPT）N1合格**，または **BJTビジネス日本語能力テスト480点以上**（または同等の能力）|
| **雇用契約** | 日本の公私の機関との雇用契約が必要; 日本人と同等以上の報酬 |
| **活動内容** | 幅広い業務（下記参照） |

**就労できる業務の範囲（技人国との比較）:**

| 種類 | 技人国 | 特定活動46号 |
|---|---|---|
| 対象業務 | 技術・人文知識・国際業務の専門的業務 | 日本語能力を要する幅広い業務（技人国対象外を含む）|
| 例: 接客・営業 | 専門性が高い場合のみ | **可能**（高度な日本語能力で行う接客・営業等）|
| 例: 製造ラインの監督 | 不可（製造ライン業務は技人国対象外）| **可能**（日本語能力を活かした監督業務）|
| 例: IT開発 | 可能（技術カテゴリー）| 可能 |
| 例: 翻訳・通訳 | 可能（国際業務カテゴリー）| 可能 |

**就労範囲の制限（指定書による）:**

特定活動46号保有者の就労範囲は，在留カードと一緒に交付される**指定書**に記載された内容に限定される。指定書の記載内容を超えた活動は不法就労。

- 指定書は法務大臣が個別に発行
- 雇用先・業務内容が変わる場合は，在留資格変更または指定書の変更申請が必要

**在留期間と更新:**

- 1回の在留期間: **1年**（または6か月・3か月の場合もある）
- 更新: 可能（要件を継続して満たす場合）
- 家族帯同: 配偶者等の家族滞在ビザを申請可能

**技人国との関係（なぜ46号が必要か）:**

技人国は「学術的な素養が背景にある業務」（システムエンジニア・会計等）が対象。接客業・製造ラインの監督等は，専門的知識を直接使わない場合，技人国の対象にならない。46号は，高度な日本語能力を持つ大学卒外国人が，こうした「日本人と同等の多様な業務」に就労できるようにする制度。

## Safe Answer Behavior

- When asked about 46号: confirm it requires a 4-year university degree and JLPT N1 (or equivalent); it is not for all Japanese language school graduates.
- When asked about the scope of work: explain that the scope is defined by the 指定書; it can include work not available under 技人国 but is not unlimited.
- When asked if it is the same as 技人国: clearly explain the purpose difference; 46号 targets broader job types including non-専門 roles; 技人国 targets specific professional/technical categories.
- When asked about updating jobs: note that changing employer/job content may require re-application or status change; route to professional.

## Must Say

- 特定活動46号の主な対象は，日本の大学（4年制）等を卒業し，JLPT N1またはBJTビジネス日本語能力テスト480点以上の高度な日本語能力を持つ者。日本語学校の卒業だけでは要件を満たさない。
- 就労範囲は指定書に記載された活動に限定される。技人国の対象外（接客・製造ライン監督等）も，指定書の範囲内であれば就労可能。指定書の範囲を超えた活動は不法就労。
- 技人国とは別制度（対象・要件・活動範囲が異なる）。高い日本語能力を活かして日本人と同等の幅広い業務に就労するために設けられた枠組み。

## Must Not Say

- 「特定活動46号は日本語学校卒業者なら取れる。」（大学（4年制）卒業+N1等の要件がある）
- 「特定活動46号はどんな仕事でも制限なくできる。」（指定書に記載された活動範囲に限定）
- 「特定活動46号と技人国は同じ。」（対象業務・要件・制度設計が異なる）
- 「転職は自由にできる。」（雇用先変更は指定書の変更または在留資格変更申請が必要）

## Deep Water Triggers

- 特定活動46号で飲食店の店長として働いているが，転職して製造業の品質管理に移りたい — どういう手続きが必要か？
- 外国の大学を卒業し，日本語専攻で学んだ — 日本の大学卒業が条件なのか，外国でも可能か？
- JLPT N2しか持っていないが，N1に近い能力がある — 特定活動46号は申請できるか？
- 特定活動46号で就労中に，副業（業務委託）をしたい — 可能か？
- 家族（配偶者）を呼びたい — 特定活動46号保有者の配偶者は家族滞在ビザを取れるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons considering 46号: confirm N1/BJT requirement and 4-year university degree; route to ISA designatedactivities17.html for official requirements; route to professional for application.
- For persons with 技人国 wondering about broader job scope: explain 46号 exists for JLPT N1+ holders; but route to professional — changing from 技人国 to 特定活動46号 requires a formal 在留資格変更.
- For persons asking about family: confirm family members can apply for 家族滞在; route to G76 for family stay requirements.
- For persons asking about job changes: route to professional; job change under 特定活動46号 requires updating the 指定書.

## Unknown Fields

- Whether a foreign national who graduated from a non-Japanese university (with Japanese as their major) qualifies as "equivalent" to a Japanese 4-year university graduate for 特定活動46号 purposes, and the specific documentation required.
- Whether part-time (フルタイム以外) employment is permitted under 特定活動46号.
- The specific scope of activities that ISA routinely includes in the 指定書 for 特定活動46号.

## Needs Domain Flags

- needs_domain (P1): For 特定活動46号 holders — does a job change to a completely different industry (e.g., from restaurant service to manufacturing supervision) require a new 特定活動46号 application, a 在留資格変更 to the same 特定活動 type with a new 指定書, or only employer notification? The practical procedure for mid-status employer/job change is not fully confirmed from official text.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tk46-001 | "特定活動46号とは何ですか？日本語学校を卒業したら申請できますか？" | State: 特定活動46号は，日本の4年制大学等を卒業しJLPT N1またはBJTビジネス日本語能力テスト480点以上を取得した高度な日本語能力を持つ外国人が，技人国では対象にならない幅広い業務（接客・営業・製造監督等）に就労できる在留資格。日本語学校の卒業のみでは要件を満たさない。 |
| tk46-002 | "特定活動46号なら飲食店で正社員として働けますか？" | State: 特定活動46号では，指定書に記載された業務範囲内であれば，技人国の対象外となる業務（接客・サービス等）も就労可能。ただし，就労範囲は個別の指定書の内容で決まるため，具体的な業務が可能かどうかは行政書士に確認を。 |
| tk46-003 | "技人国と特定活動46号はどう違いますか？" | State: 技人国は技術・人文知識・国際業務の専門的業務が対象。特定活動46号は，高度な日本語能力（JLPT N1等）を持つ大学卒の外国人が，技人国では対象にならない「日本人と同等の幅広い業務」に就労できるよう設けられた別制度。就労範囲は指定書で決まる。 |

## Source Notes

- 特定活動46号の概要・対象・要件: ISA「特定活動（日本の大学を卒業した者等が行う活動）」(designatedactivities17.html) — 対象者（大学卒・高度日本語能力）; 指定書による就労範囲; 在留期間（1年）.
- 特定活動の定義・指定書の役割: G28 cross-ref（特定活動=指定書bound; 法務大臣が個別指定）.
- 技人国との制度的違い: 技人国活動定義（gijinkoku.html）との比較から構造的に導かれる.
- Cross-ref G28 (特定活動の指定書), G36 (特定活動・内定者・求職者の就労制限), G35 (技人国業務要件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 016 G88. Key sources: ISA designatedactivities17.html（特定活動46号の概要）; G28 cross-ref（指定書の役割）. Core facts: 対象=大学4年制卒業+JLPT N1またはBJT480点以上; 就労範囲=指定書に限定; 技人国では対象外の業務（接客・製造監督等）も可能; 在留期間=1年（更新可）. needs_domain P1: 転職時の手続き（指定書変更 vs 在留資格変更の区別）. Cross-ref G28, G36, G35.
