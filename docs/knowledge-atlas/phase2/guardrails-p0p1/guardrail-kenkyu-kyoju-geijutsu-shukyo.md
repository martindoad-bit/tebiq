---
asset_id: guardrail-kenkyu-kyoju-geijutsu-shukyo
title: 在留資格「研究」「教授」「芸術」「宗教」と技人国の境界 — 大学附属研究機関での研究=「研究」；大学教員=「教授」；技人国は民間企業の専門技術業務；重複なし
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

This guardrail prevents errors about how the immigration residence statuses 「研究」「教授」「芸術」「宗教」 are distinguished from 技術・人文知識・国際業務（技人国）. Key errors to block:

1. **"研究者なら技人国（技術・人文知識）ビザで日本で働ける。"** — incorrect. 公的機関・大学付属研究機関等での研究活動は在留資格「研究」の対象。民間企業の研究開発職は技人国（技術）の対象になりうる。「研究」と「技術」の主な区別は所属機関（公的/大学附属 vs 民間）と活動の性格。
2. **"大学教員は技人国（人文知識・国際業務）で働ける。"** — incorrect. 大学等の高等教育機関での教育活動は在留資格「教授」の対象。技人国は民間機関・企業等での専門的業務を想定した資格。
3. **"音楽家・芸術家は技人国の『国際業務』で活動できる。"** — incorrect. 芸術活動（音楽・美術・文芸等）は在留資格「芸術」の対象。技人国の「国際業務」は翻訳・通訳・コピーライティング等の国際的ビジネス業務であり，純粋な芸術活動は含まない。
4. **"宗教活動は技人国の範囲に入る。"** — incorrect. 宗教家・宗教活動は在留資格「宗教」の対象。技人国は専門的・技術的業務が対象であり，宗教活動は対象外。

## Trigger

Use this card when the user says:

- "研究者として日本で働くにはどのビザが必要ですか？"
- "大学教員は技人国ビザで大丈夫ですか？"
- "音楽家・アーティストの在留資格は何ですか？"
- "宗教活動のためのビザは何ですか？"
- "大学の研究所で働く場合，技人国と研究どちらですか？"
- any pattern conflating 研究/教授/芸術/宗教 with 技人国, or misrouting academic/artistic/religious activity to 技人国.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kenkyu | L4 | 出入国在留管理庁「在留資格『研究』」 | https://www.moj.go.jp/isa/applications/status/research.html | 2026-05-15 | 活動定義（公私の機関での研究等）; 対象（公的機関・大学付属研究機関等での研究者）. |
| isa-kyoju | L4 | 出入国在留管理庁「在留資格『教授』」 | https://www.moj.go.jp/isa/applications/status/professor.html | 2026-05-15 | 活動定義（大学等での研究・研究指導・教育）; 高等教育機関が対象. |
| isa-geijutsu | L4 | 出入国在留管理庁「在留資格『芸術』」 | https://www.moj.go.jp/isa/applications/status/art.html | 2026-05-15 | 活動定義（収入を伴う芸術上の活動）; 対象（音楽・美術・文芸・演劇等の芸術活動で収入を得る者）. |
| isa-shukyo | L4 | 出入国在留管理庁「在留資格『宗教』」 | https://www.moj.go.jp/isa/applications/status/religious.html | 2026-05-15 | 活動定義（外国の宗教団体から日本へ派遣される宗教家の布教等）; 外国宗教団体からの派遣が要件. |
| isa-gijinkoku | L4 | 出入国在留管理庁「在留資格『技術・人文知識・国際業務』」 | https://www.moj.go.jp/isa/applications/status/gijinkoku.html | 2026-05-15 | 活動定義（本邦の公私の機関との契約に基づく技術・人文科学・国際業務）; 民間機関での専門的業務が主対象. |

## Official Rule Or Source Fact

**各在留資格の活動定義と主な対象（比較表）:**

| 在留資格 | 活動定義（要約） | 主な対象者 | 機関の種類 |
|---|---|---|---|
| **研究** | 公私の機関における研究，研究の指導または教育の活動 | 公的研究機関・大学付属研究所等の研究者 | 公的機関・大学付属機関等（民間研究者は技人国の場合も）|
| **教授** | 大学若しくはこれに準ずる機関又は高等専門学校における研究，研究の指導又は教育 | 大学教員・高専教員 | 大学・大学院・高専等の高等教育機関 |
| **芸術** | 収入を伴う音楽，美術，文学その他の芸術上の活動 | 音楽家・画家・小説家・演劇人等の芸術家 | 機関に属さずとも可（フリーランスの芸術活動でも）|
| **宗教** | 外国の宗教団体により日本に派遣された宗教家の布教その他の宗教上の活動 | 宣教師・神父・僧侶等の宗教家（外国宗教団体からの派遣） | 宗教法人・宗教団体 |
| **技術・人文知識・国際業務** | 本邦の公私の機関との契約に基づく技術・人文科学・国際業務の専門的業務 | IT技術者・エンジニア・会計士・デザイナー・翻訳者等 | 民間企業・法人（公的機関との契約も含まれうる）|

**研究 vs 技人国（技術）の区別:**

- 大学・国公立研究機関での研究職 → **「研究」** が基本
- 民間企業（IT・製薬・メーカー等）の研究開発職 → **「技術・人文知識・国際業務」（技人国）** が基本
- グレーゾーン: 民間企業に採用されて公的研究機関に派遣される場合等 → 所属機関・契約の実態で判断（needs_domain）

**教授 vs 技人国（人文知識）の区別:**

- 大学・大学院・高専での教育・研究職 → **「教授」**
- 専修学校・語学学校・民間企業での教育・研修業務 → **「技術・人文知識・国際業務」** または「技能（調理師等）」等
- 重要: 大学教員が「技人国」で就労しているケース → 原則として「教授」への変更が必要

**芸術 vs 技人国（国際業務）の区別:**

- 音楽演奏・展覧会・文芸出版等の収入を伴う芸術活動 → **「芸術」**
- 広告代理店でのコピーライティング・デザイン業務（商業的活動）→ **「技人国（国際業務または技術）」**
- アーティストがレーベル・出版社の社員として働く場合 → 業務内容によって判断（needs_domain）

**宗教 vs 技人国の区別:**

- 外国宗教団体から派遣されて日本で布教・宗教活動を行う → **「宗教」**
- 「宗教」の要件: 外国宗教団体からの派遣が必要（日本国内の宗教法人による単独採用は別途確認が必要）
- 宗教団体の事務職員（一般業務）→ 業務内容に応じて技人国等

**在留期間（代表例）:**

| 在留資格 | 在留期間 |
|---|---|
| 研究 | 5年・3年・1年・3か月 |
| 教授 | 5年・3年・1年・3か月 |
| 芸術 | 5年・3年・1年・3か月 |
| 宗教 | 5年・3年・1年・3か月 |
| 技人国 | 5年・3年・1年・3か月 |

※いずれも就労制限（業務範囲）は在留資格の定義に従う。

## Safe Answer Behavior

- When asked about researchers: distinguish between public/university-based (研究) and private-sector R&D (技人国/技術).
- When asked about university professors/teachers: clearly route to 教授; do not say 技人国 is acceptable for university teaching.
- When asked about musicians/artists: clearly route to 芸術; do not conflate with 技人国「国際業務」.
- When asked about religious workers: clearly route to 宗教; note the foreign religious organization dispatch requirement.
- Do not assume the answer without knowing the specific employer type and job function — the distinction requires case-by-case assessment.

## Must Say

- 大学等高等教育機関での研究・教育職は在留資格「教授」の対象。公的・大学付属研究機関での研究職は「研究」の対象。いずれも技人国（技術・人文知識・国際業務）ではない。
- 収入を伴う音楽・美術・文学等の芸術活動は在留資格「芸術」の対象。技人国の「国際業務」は広告・翻訳等の商業的国際業務であり，純粋な芸術活動は含まない。
- 外国の宗教団体から派遣されて日本で布教活動を行う宗教家は在留資格「宗教」の対象。宗教活動は技人国の対象外。

## Must Not Say

- 「大学の先生は技人国で働ける。」（大学教員=在留資格「教授」が原則）
- 「研究者は技人国の技術カテゴリーでよい。」（公的・大学付属研究機関=「研究」が原則）
- 「音楽家は技人国の国際業務に入る。」（芸術活動=在留資格「芸術」）
- 「宗教活動は技人国の範囲に含まれる。」（宗教活動=在留資格「宗教」）

## Deep Water Triggers

- 国立大学法人の研究員として採用されたが，企業から出向で来ている — 「研究」か「技人国」か？
- 大学の語学学校（私立大学附属の非正規学校）で英語教師をする — 「教授」か「技人国（人文知識）」か？
- プロミュージシャンが音楽レーベルの正社員（音楽ディレクター）として働く — 「芸術」か「技人国（国際業務）」か？
- 韓国の仏教団体から日本の寺院に派遣された僧侶 — 「宗教」の外国宗教団体からの派遣要件を満たすか？
- 技人国で大学の研究員をしているが，在留資格が適切でないと指摘された — 変更申請は必要か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For researchers: determine whether the institution is public/university-based (→ 研究) or private enterprise (→ 技人国); route to ISA research.html or gijinkoku.html accordingly; route to professional for borderline cases.
- For university professors: route to ISA professor.html; confirm 教授 is required.
- For artists/musicians: route to ISA art.html; determine whether activities are artistic (収入を伴う芸術活動) or commercial/business.
- For religious workers: route to ISA religious.html; confirm foreign organization dispatch requirement.
- For anyone currently in wrong status: route to professional immediately for status change planning.

## Unknown Fields

- The operational distinction between 民間企業 researchers who work at public research facilities on assignment vs those employed directly by public institutions.
- Whether a freelance artist who also does commercial design work (mixed activities) would need a combined arrangement or which status takes priority.
- Whether Japanese religious organizations (not a foreign dispatch arrangement) can sponsor a foreign religious worker under the 宗教 status.

## Needs Domain Flags

- needs_domain (P1): Can a foreign religious worker be sponsored by a Japanese religious organization (宗教法人) that has no overseas parent organization — i.e., is the "外国の宗教団体からの派遣" strictly required, or can a purely Japanese institution sponsor a 宗教 status application?
- needs_domain (P1): For researchers employed by a private company but stationed at a national university or public research institute (corporate research secondment) — is the appropriate status 研究 or 技人国, and what is the determining criterion?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kenkyu-001 | "大学の研究所で研究員として働きます。在留資格は技人国でいいですか？" | State: 大学附属の研究所での研究職は，一般的に在留資格「研究」の対象。技人国は民間企業での専門的業務が主な対象。ISA「在留資格『研究』」ページ（research.html）で要件を確認し，行政書士に相談のこと。 |
| kenkyu-002 | "音楽家として日本で活動したいです。技人国の国際業務ビザで大丈夫ですか？" | State: 収入を伴う音楽等の芸術活動は在留資格「芸術」の対象。技人国の「国際業務」は翻訳・通訳・広告等の国際的ビジネス業務であり，純粋な芸術活動とは異なる。ISA「在留資格『芸術』」ページで要件を確認し，行政書士に相談を。 |
| kenkyu-003 | "大学で英語を教えることになりました。技人国か教授ビザか，どちらでしょう？" | State: 大学（高等教育機関）での教育・研究職は在留資格「教授」の対象が原則。語学学校や民間企業での教育・研修業務であれば技人国の場合もある。雇用先が大学（学校教育法上の大学等）かどうかが判断の基準。ISA「在留資格『教授』」ページで確認し，行政書士に相談を。 |

## Source Notes

- 在留資格「研究」活動定義: ISA research.html（公私の機関における研究・研究指導・教育活動）.
- 在留資格「教授」活動定義: ISA professor.html（大学・高専での研究・指導・教育）.
- 在留資格「芸術」活動定義: ISA art.html（収入を伴う芸術上の活動）.
- 在留資格「宗教」活動定義: ISA religious.html（外国の宗教団体から派遣された宗教家の活動）.
- 技人国との区別: ISA gijinkoku.html（本邦の公私の機関との契約に基づく専門業務）との活動定義の対比から構造的に導かれる.
- Cross-ref G35 (技人国の業務要件境界), G47 (経営管理への変更), G55 (副業・兼業の在留資格).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 016 G86. Key sources: ISA research.html, professor.html, art.html, religious.html, gijinkoku.html（各在留資格の活動定義）. Core facts: 大学教員=「教授」; 公的研究機関=「研究」; 芸術活動=「芸術」; 宗教活動=「宗教」; 技人国は民間企業での専門業務が主対象. needs_domain P1: 宗教団体の日本独立スポンサーの可否; 民間企業→公的機関出向研究者の適用資格. Cross-ref G35, G47, G55.
