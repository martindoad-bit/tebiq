---
asset_id: guardrail-kyoiku-visa-yoken
title: 在留資格「教育」の要件と「教授」との区別 — 小中高・専修学校での語学・教科指導は「教育」；大学・大学院等での研究・教育は「教授」；両者は活動機関の種別で区別される；教育ビザには教員免許または同等の学歴・実務経験要件がある
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 021"
---

## What This Document Is

This guardrail prevents errors about the 教育 (Education) residence status and its distinction from 教授 (Professor). Key errors to block:

1. **"大学で教えるなら『教育』ビザを取ればよい。"** — incorrect. 大学・大学院・高等専門学校等の高等教育機関での教育・研究活動には「教授」の在留資格が必要。「教育」は，小学校・中学校・高校・専修学校・各種学校等での語学・教科指導を対象とする在留資格。
2. **"語学学校（日本語学校・英会話スクール等）で教えるなら『教育』ビザが取れる。"** — partially incorrect. 語学学校等の「各種学校」に該当する機関では「教育」が使える場合があるが，学校教育法上の「各種学校」の認定を受けていない民間の語学教室等では「教育」ではなく「技人国（国際業務）」等が適用される場合がある。
3. **"教育ビザには特別な資格は必要ない。"** — incorrect. 在留資格「教育」の上陸基準省令には，教員免許または大学卒業（または同等の学歴）＋該当科目に係る5年以上の実務経験，あるいは必要に応じてさらなる要件が課されている。
4. **"小学校のALT（外国語指導助手）は教育ビザが不要。"** — partially incorrect. 公立小学校でのALT（外国語指導助手）として稼働する場合，活動の実態（指導の主体性・独立性）によって，「教育」または「技人国（国際業務）」のいずれが適切かが判断される。

## Trigger

Use this card when the user says:

- "日本の小学校・中学校・高校で英語を教えたいのですが，どのビザが必要ですか？"
- "語学学校で日本語を教えるにはどのビザが必要ですか？"
- "大学の先生と学校の先生のビザは違いますか？"
- "ALT（外国語指導助手）はどのビザが必要ですか？"
- "教育ビザの要件（教員免許・学歴）を教えてください。"
- any pattern conflating 教育 and 教授, or assuming no qualification is required for teaching positions.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kyoiku | L4 | 出入国在留管理庁「在留資格『教育』」 | https://www.moj.go.jp/isa/applications/status/education.html | 2026-05-15 | 教育の活動定義; 上陸基準省令要件（教員免許・学歴・実務経験）; 対象機関の種別. |
| isa-kyoju | L4 | 出入国在留管理庁「在留資格『教授』」 | https://www.moj.go.jp/isa/applications/status/professor.html | 2026-05-15 | 教授の活動定義; 対象機関（大学・大学院・高等専門学校等）; 教育との機関種別の区分. |
| g86-crossref | guardrail | guardrail-kenkyu-kyoju-geijutsu-shukyo (G86) | internal | 2026-05-15 | G86: 「教授」の活動定義（大学等での教育・研究）; 「研究」「教育」「技人国」との区分. |
| g10-crossref | guardrail | guardrail-gijinkoku-yoken (G10) | internal | 2026-05-15 | G10: 技人国（国際業務）の活動定義; 民間語学学校での教育が技人国に該当するケース. |

## Official Rule Or Source Fact

**在留資格「教育」と「教授」の活動定義比較:**

| 比較項目 | 教育（Education）| 教授（Professor）|
|---|---|---|
| **法的定義** | 「本邦の小学校，中学校，義務教育学校，高等学校，中等教育学校，特別支援学校，専修学校又は各種学校若しくは設備及び編制に関してこれに準ずる教育機関において語学教育その他の教育をする活動」| 「本邦の大学若しくはこれに準ずる機関又は高等専門学校において研究，研究の指導又は教育をする活動」|
| **対象機関** | 小学校・中学校・義務教育学校・高等学校・中等教育学校・特別支援学校・専修学校・各種学校 | 大学・大学院・大学に準ずる機関・高等専門学校 |
| **活動内容** | 語学教育・教科指導等の教育 | 研究・研究の指導・教育 |
| **学歴要件** | あり（上陸基準省令；後述）| 博士号等の高度な学術資格が多いが，法令上明示的な学歴要件は「教授」自体には設定されていないケースも |

**「教育」の上陸基準省令の主要件:**

| 要件 | 内容 |
|---|---|
| **教員免許** | 教育活動の行われる学校等の正規の教員として必要とされる免許状を保有すること |
| **代替要件（学歴+経験）** | 大学卒業（またはそれと同等以上）かつ，教育しようとする科目（語学等）に係る5年以上の実務経験を有すること |
| **外国語教育の特例** | 外国語の教育に従事する場合で，当該外国語がその者の母語である場合は，上記学歴要件が不要（ただし，機関ごとに確認要）|
| **報酬** | 日本人が同種業務に従事する場合の通常の報酬以上 |

⚠️ 母語話者の特例（外国語教育の場合）については，ISAの実務上の運用を確認することが推奨される（needs_domain P1）。

**ALT（外国語指導助手）の在留資格:**

| ALTの形態 | 適用される在留資格の目安 |
|---|---|
| 公立学校配属・自治体が主体（JETプログラム等）| 「教育」（学校教育法上の学校機関への配属）|
| 民間派遣会社経由・語学助手として勤務 | 「技人国（国際業務）」が適用される場合が多い |

⚠️ ALTの在留資格は，活動の実態（主体的な指導を行うか）と雇用形態によって異なる。ISAに確認するか，行政書士に相談することを推奨。

**対象機関が「各種学校」に該当するかの確認:**

「教育」の在留資格が使えるのは，学校教育法第134条に基づく「各種学校」の認定を受けた機関。認定を受けていない民間の語学教室・英会話スクール等での指導業務は，「教育」ではなく「技人国（国際業務）」等の適用が検討される。

確認方法:
- 雇用する機関が「各種学校」として都道府県に認定されているか（各種学校一覧・都道府県教育委員会）

## Safe Answer Behavior

- When asked about teaching at 小中高: confirm 「教育」 is the applicable status; explain the qualification requirements (教員免許 or 大学卒業+5年経験).
- When asked about teaching at universities: route to G86 for 「教授」; note the different institution type requirement.
- When asked about language schools: clarify that 「教育」 applies only to 各種学校-certified institutions; private language schools without certification = likely 技人国（国際業務）.
- When asked about ALT: explain the dual-route structure (JET/public school = 教育; private dispatch = likely 技人国); recommend professional confirmation.

## Must Say

- 在留資格「教育」は，小学校・中学校・高校・専修学校・各種学校等での語学・教科指導のための在留資格。大学・大学院での教育・研究には「教授」が必要（両者は対象機関の種別で区別される）。
- 「教育」の上陸基準省令には，教員免許（または大学卒業+当該科目5年以上の実務経験）が要件として定められている。ただし，母語話者が外国語教育に従事する場合は学歴要件の緩和規定がある場合がある（詳細はISAまたは行政書士に確認）。
- 学校教育法上の「各種学校」に認定されていない民間の語学学校・英会話教室での指導業務は，「教育」ではなく「技人国（国際業務）」等の在留資格が適用される場合が多い。

## Must Not Say

- 「大学で教えるなら『教育』ビザを申請してください。」（大学は「教授」; 「教育」は小中高等が対象）
- 「教育ビザには特別な資格は要らない。」（教員免許または学歴+経験要件がある）
- 「すべての語学学校で働くには教育ビザが使える。」（各種学校認定外の機関では技人国が適用される場合あり）

## Deep Water Triggers

- 国際学校（インターナショナルスクール）で教えるには，「教育」と「教授」のどちらが必要か？（インターナショナルスクールの学校教育法上の位置付けによって異なる）
- 日本語学校（法務省告示機関）で日本語を教えるには「教育」と「技人国」のどちらが適切か？（日本語学校は一般的に「各種学校」に認定されているが要確認）
- 「教育」と「文化活動」の区別（無報酬の教授活動と報酬を伴う「教育」の境界）
- 小学校のALTが「教育」で在留しているが，雇用元が変わった場合の在留資格の影響は？
- 特別支援学校での教育には教育ビザが適用されるか，また日本の特別支援学校教員免許は必要か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons planning to teach at 小中高: confirm 「教育」 is appropriate; route to 行政書士 for qualification verification and application.
- For persons planning to teach at universities: route to G86 (「教授」 status); confirm 大学 institution type.
- For persons teaching at language schools: route to 行政書士 to confirm whether the institution qualifies as 各種学校; if not, route to 技人国（国際業務）.
- For ALT applicants: route to JETプログラム (public school route) or to 行政書士 (private dispatch company route) for status determination.

## Unknown Fields

- Whether the "母語話者特例" (native speaker exception) for the 大学卒業 requirement in the 上陸基準省令 is officially applied uniformly or varies by ISA office.
- The precise list of institution types that qualify as 「各種学校に準ずる教育機関」 for 教育 status purposes.

## Needs Domain Flags

- needs_domain (P1): Is the "母語話者特例" (native speaker exception relaxing the 大学卒業 requirement) explicitly stated in the 上陸基準省令「教育」, or is it an administrative interpretation? What is the official text confirming this exception?
- needs_domain (P1): How does ISA classify the teaching activities of ALTs dispatched via private 人材派遣 companies to public schools — 教育 or 技人国? Is there official ISA guidance on the distinction?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kyoiku-001 | "日本の中学校で英語を教えたいのですが，どのビザが必要ですか？資格は必要ですか？" | State: 中学校での英語教育には在留資格「教育」が必要。上陸基準省令の要件として，日本の教員免許（中学校英語）またはその代替として大学卒業（以上）＋英語教育に係る5年以上の実務経験が必要。外国語（英語）の母語話者の場合，学歴要件が緩和される場合がある（詳細は行政書士またはISAに確認）。申請は雇用する学校・自治体と協力して行うのが一般的。 |
| kyoiku-002 | "大学の先生（講師）になりたいのですが，教育ビザが必要ですか？" | State: 大学・大学院での教育・研究活動には，在留資格「教授」が必要（「教育」ではない）。「教育」は小学校・中学校・高校・専修学校・各種学校等での教育を対象とし，大学等の高等教育機関は「教授」の対象。大学側と協力して「教授」への在留資格変更申請（または海外からならCoE申請）を行うことになる。 |
| kyoiku-003 | "英会話スクールで英語を教えようと思っています。教育ビザですか？" | State: 英会話スクールが学校教育法上の「各種学校」として都道府県から認定を受けている場合は「教育」が適用できる可能性がある。認定を受けていない民間の英会話教室の場合，「技人国（国際業務）」が適用される場合が多い。まず勤務先機関が「各種学校」認定を受けているかを確認し，不明な場合は行政書士に相談することを推奨する。 |

## Source Notes

- 在留資格「教育」活動定義・上陸基準省令: ISA「在留資格『教育』」(education.html) — 活動定義; 教員免許または大学卒業+5年経験要件; 各種学校等の対象機関.
- 在留資格「教授」活動定義: ISA「在留資格『教授』」(professor.html) — 大学・大学院・高等専門学校での研究・教育; 「教育」との機関種別の区分.
- 技人国（国際業務）との関係: G10 cross-ref（各種学校認定外の民間語学学校での指導業務の取り扱い）.
- 「教授」の活動定義・関連資格との区分: G86 cross-ref（大学教員=「教授」; 公的研究機関=「研究」; 芸術=「芸術」; 技人国との区分）.
- Cross-ref G10 (技人国の要件), G86 (「教授」「研究」の活動定義), G98 (文化活動との区分), G108 (留学後就職活動).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 021 G111. Key sources: ISA「在留資格『教育』」(education.html)（活動定義・上陸基準省令・教員免許要件）; ISA「在留資格『教授』」(professor.html)（大学等での教育・研究）. Core facts: 「教育」=小中高・専修学校・各種学校（教員免許または大卒+5年経験）; 「教授」=大学・大学院・高等専門学校; 民間語学学校（各種学校認定外）=「技人国（国際業務）」; ALTの資格は形態によって異なる. needs_domain P1: 母語話者特例の公式テキスト確認; ALT（私立派遣）の在留資格の官式判断. Cross-ref G10, G86, G98, G108.
