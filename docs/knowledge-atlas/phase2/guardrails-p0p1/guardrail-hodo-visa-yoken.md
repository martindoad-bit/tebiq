---
asset_id: guardrail-hodo-visa-yoken
title: 在留資格「報道」の要件と短期滞在取材の限界 — 外国報道機関所属の記者・カメラマンに適用；短期滞在での継続的・業務的取材は不法就労リスク；日本の会社が雇用する外国人記者は技人国が適用される場合あり；フリーランスジャーナリストの報道ビザ取得可否は要確認
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 022"
---

## What This Document Is

This guardrail prevents errors about the 在留資格「報道」 (journalism/press visa) and related risks for foreign journalists working in Japan. Key errors to block:

1. **"短期滞在で継続的に取材・報道活動を行っていれば問題ない。"** — incorrect for ongoing professional journalism. 短期滞在での一時的・非有償の取材活動は認められる場合があるが，継続的・業務的な取材（報酬を伴う，または所属報道機関からの業務として継続して行う）は在留資格「報道」の活動範囲に該当し，短期滞在での実施は資格外活動（不法就労）リスクを生じさせる。
2. **"外国の報道機関に雇用されているから，日本で自由に取材してよい。"** — incomplete. 外国報道機関に雇用されていることは「報道」資格の前提であるが，在留資格を取得せずに（または短期滞在のまま）業務的な取材・報道活動を継続することは在留資格の問題となりうる。
3. **"日本の会社（日本のメディア）が雇用する外国人記者も「報道」ビザを使う。"** — incorrect. 在留資格「報道」は，外国の報道機関からの派遣・雇用が前提である。日本の報道機関が直接雇用する外国人記者には，業務内容に応じて「技人国（国際業務）」が適用される。
4. **"フリーランスジャーナリストは「報道」ビザを取れない。"** — needs_domain. フリーランスジャーナリストが「報道」資格を申請できるかどうかは，雇用形態（所属機関の有無）の要件充足性に依存し，官式見解の確認が必要である。

## Trigger

Use this card when the user says:

- "外国メディアのジャーナリストとして日本で取材したい。どのビザが必要ですか？"
- "短期滞在ビザで日本に来て取材活動をしてもいいですか？"
- "日本の会社に雇用されている外国人記者は何のビザが必要ですか？"
- "フリーランスジャーナリストとして日本で取材・執筆したい。"
- "「報道」ビザはどんな人が申請できますか？"
- any pattern suggesting that short-stay visas cover ongoing professional journalism, or that "press visa" applies to locally employed journalists.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| hodo-nyukan-ho | L1 | 出入国管理及び難民認定法別表第一の二「報道」 | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 在留資格「報道」の活動定義: 「外国の報道機関との契約に基づいて行う取材その他の報道上の活動」. |
| hodo-josho-kijun | L2 | 上陸基準省令「報道」 | https://laws.e-gov.go.jp/law/326CO0000000016 | 2026-05-15 | 「報道」の上陸基準省令要件（申請者が外国の報道機関との契約に基づく取材・報道活動を行うこと）. |
| hodo-isa-page | L4 | 出入国在留管理庁「在留資格『報道』」 | https://www.moj.go.jp/isa/applications/status/press.html | 2026-05-15 | 申請書類; 在留期間（5年・3年・1年・3か月）; 申請要件の概要. |
| tanki-taizai-shuro-g59 | guardrail | guardrail-tanki-taizai-shuro-kinshi (G59) | internal | 2026-05-15 | G59: 短期滞在での報酬を受ける就労=不法就労; 雇用主への刑事罰（入管法第73条の2）. |
| gijinkoku-g35 | guardrail | guardrail-gijinkoku-gyomu-youken-boundary (G35) | internal | 2026-05-15 | G35: 技人国（国際業務）=通訳・翻訳・貿易・広報・海外営業等; 日本の企業が雇用する外国人記者の業務内容. |

## Official Rule Or Source Fact

**在留資格「報道」の活動定義（入管法別表第一の二）:**

「外国の報道機関との契約に基づいて行う取材その他の報道上の活動」

→ 「外国の報道機関との契約」が前提。日本の報道機関への直接雇用は含まれない。

**「報道」資格の主な要件:**

- 申請者が外国の報道機関（新聞社・通信社・放送局・ウェブメディア等）と契約関係にあること
- 日本における活動が取材・報道上の活動であること
- 報酬は原則として外国の機関から支払われること（ただし日本の機関からの取材費・出演料等が生じる場合の扱いは個別判断）

**在留期間:** 5年・3年・1年・3か月（業務内容・雇用状況に基づいてISAが決定）

**短期滞在での取材活動の限界:**

- 短期滞在（90日以内）: 報酬を伴わない一時的な取材・視察は認められる場合がある（観光・親族訪問目的の短期滞在に附随する取材等）
- 報酬を伴う取材・業務的な取材（所属機関から業務命令として行う継続的取材）は，短期滞在の活動範囲を超え，在留資格「報道」が必要（G59参照）
- 短期滞在での資格外活動許可（包括許可）は，「留学」「家族滞在」のみが対象（G24参照）→ 短期滞在での就労系活動への個別許可も基本的に不可

**日本の会社が雇用する外国人記者（技人国との区別）:**

- 日本の報道機関（新聞社・テレビ局・ウェブメディア等）に直接雇用される外国人記者・ライター・カメラマン: 「技人国（国際業務）」が適用（G35参照）
- 「技人国（国際業務）」の主な業務例: 国際部での翻訳・通訳・外国語コンテンツ制作・外国向け放送・国際営業等
- 「報道」と「技人国」の主な区別: 所属する報道機関が外国機関（「報道」）か日本機関（「技人国」）か

**フリーランスジャーナリスト（needs_domain P1）:**

- フリーランスジャーナリストは「外国の報道機関との契約」という要件を充足する契約（特定の外国メディアとの業務委託契約等）があれば申請可能と解されるが，正式な官式見解は未確認
- 雇用関係のないフリーランスで日本で継続的に取材活動を行う場合の在留資格は，実務的な問題として残る

**コンテンツクリエイター・YouTuber等との区別:**

- 個人でYouTube・SNS等で動画・コンテンツを発信する「コンテンツクリエイター」は，「報道機関との契約」の要件を満たさず，「報道」資格の対象外
- 規模・報酬によっては「経営管理」（自己の事業として実施）または「芸術」（芸術活動として）が検討される場合があるが，個別要件確認が必要

## Safe Answer Behavior

- When asked about journalism visas: confirm that 在留資格「報道」 applies to foreign nationals under contract with a foreign news organization; clearly distinguish from 技人国 for locally hired journalists.
- When asked about short-stay reporting: explain the distinction between one-off, non-compensated visits vs. ongoing professional journalism assignments (which require 報道 visa).
- When asked about freelancers: flag needs_domain — the eligibility of freelance journalists without a specific foreign media contract is not officially confirmed; route to ISA consultation or immigration lawyer.
- When asked about content creators/YouTubers: confirm 報道 is not applicable; note that routing depends on the nature and scale of the activity.

## Must Say

- 在留資格「報道」は，外国の報道機関との契約に基づいて日本で取材・報道活動を行う外国人に適用される。日本の報道機関が直接雇用する外国人記者には，「技人国（国際業務）」が適用される。
- 短期滞在での継続的・業務的な取材（所属報道機関からの業務命令・報酬を伴う取材等）は，在留資格「報道」なしに行うと資格外活動（不法就労）のリスクがある。
- コンテンツクリエイター・個人YouTuber等は「報道」資格の対象外である。

## Must Not Say

- 「外国メディアの記者なら，短期滞在で継続的に取材しても問題ない。」（継続的業務的取材には報道ビザが必要）
- 「日本の報道機関が雇用する外国人記者は『報道』ビザを使う。」（正しくは技人国）
- 「フリーランスジャーナリストは『報道』ビザを取れない。」（needs_domain; 取れる場合もありうる）

## Deep Water Triggers

- 外国の報道機関に雇用されたジャーナリストが，日本滞在中に日本のメディアからも取材報酬を受け取る場合の在留資格への影響
- 「報道」資格保持者が日本のメディアに転職（直接雇用）した場合の在留資格変更（技人国への変更申請の必要性）
- 外国政府系メディア（RT, CCTV等）から派遣されたジャーナリストに対するISAの審査傾向
- 写真家・映像作家が外国メディアとの個別委託契約に基づき日本で撮影する場合の在留資格分類
- 報道活動中に逮捕・拘束された外国人ジャーナリストの在留資格への影響

## User Next Actions

This is not user-facing copy. For answer routing:

- For foreign journalists planning ongoing Japan assignment: route to ISA for 報道 visa application; confirm the contract with a foreign news organization.
- For locally employed journalists (Japanese media company): route to 技人国（国際業務）application; confirm job duties fall within 国際業務 category.
- For short-stay reporters: flag the risk if the assignment is ongoing/compensated; recommend consulting an immigration lawyer or ISA before staying beyond 90 days for reporting purposes.
- For freelancers without a specific media contract: flag needs_domain; recommend ISA consultation or immigration lawyer for case-specific advice.

## Unknown Fields

- Whether freelance journalists without a specific foreign media contract can qualify for 在留資格「報道」 under any conditions.
- The specific boundary between short-stay reporting (acceptable) and ongoing reporting assignment (requires 報道 visa) in ISA operational practice.

## Needs Domain Flags

- needs_domain (P1): What is ISA's official position on the 在留資格「報道」 eligibility of freelance journalists who do not have a single foreign media employer but hold multiple per-article contracts?
- needs_domain (P1): What is the exact ISA operational boundary between short-stay reporting (short-term, incidental, non-compensated) and ongoing reporting activity that requires 在留資格「報道」?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hodo-001 | "外国のメディアで働いていますが、日本での取材活動にはどのビザが必要ですか？" | State: 外国の報道機関との契約に基づいて日本で取材・報道活動を行う場合は，在留資格「報道」が必要。申請書類をISAに提出する。日本の報道機関が直接雇用する外国人記者の場合は「技人国（国際業務）」が適用される。 |
| hodo-002 | "短期滞在ビザで日本に来て記事を書いても問題ないですか？" | State: 一時的・非業務的な取材（報酬なし・観光目的に附随するもの等）は短期滞在で可能な場合があるが，所属報道機関からの業務命令として継続的に取材・報道活動を行う場合は在留資格「報道」が必要。短期滞在での就労系活動は資格外活動（不法就労）リスクがある。 |
| hodo-003 | "日本のテレビ局に就職した外国人記者は何のビザが必要ですか？" | State: 日本の報道機関（テレビ局・新聞社等）に直接雇用される外国人記者は，「報道」ではなく「技人国（国際業務）」が適用される。翻訳・通訳・外国語コンテンツ制作・国際ニュース担当等の業務内容が「国際業務」に該当することが前提。 |

## Source Notes

- 在留資格「報道」の活動定義: 入管法別表第一の二「外国の報道機関との契約に基づいて行う取材その他の報道上の活動」.
- 上陸基準省令「報道」: 外国報道機関との契約要件.
- ISA「在留資格『報道』」: 申請書類・在留期間（5年・3年・1年・3か月）.
- G59 cross-ref（短期滞在での就労禁止）.
- G35 cross-ref（技人国（国際業務）の活動範囲）.
- Cross-ref G24（資格外活動許可の対象範囲），G59（短期滞在就労禁止），G35（技人国境界）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 022 G116. Key sources: 入管法別表第一の二（「報道」活動定義）; 上陸基準省令（「報道」要件）; ISA「在留資格『報道』」ページ. Core facts: 「報道」=外国報道機関契約が前提; 日本の報道機関雇用=技人国; 短期滞在での継続取材=資格外活動リスク. needs_domain P1: フリーランスジャーナリストの報道資格取得可否; 短期滞在取材の許容範囲の公式基準. Cross-ref G35, G59.
