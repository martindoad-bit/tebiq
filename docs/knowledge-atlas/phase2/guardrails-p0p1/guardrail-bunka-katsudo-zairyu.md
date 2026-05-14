---
asset_id: guardrail-bunka-katsudo-zairyu
title: 在留資格「文化活動」の活動範囲と収入制限 — 文化活動は収入を伴う活動が禁止；学術・芸術上の研究・研修が対象；就労・有償サービスは在留資格外活動になる
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 018"
---

## What This Document Is

This guardrail prevents errors about the 文化活動 (cultural activities) residence status in Japan and its income restrictions. Key errors to block:

1. **"文化活動ビザで日本に来れば，文化に関連する仕事をして収入を得られる。"** — incorrect. 在留資格「文化活動」は，収入を伴う活動が**禁止**されている。学術・芸術上の研究・研修・調査が主な活動範囲であり，有償の就労・サービス提供は在留資格外活動（不法就労）になる。
2. **"在留資格『文化活動』と『芸術』は同じ。"** — incorrect. 「文化活動」は収入を伴わない活動（研究・研修・調査等）が対象。「芸術」は収入を伴う芸術活動（音楽・美術等）が対象（G86 cross-ref）。両者は活動の内容・収入の有無で明確に区別される。
3. **"在留資格『文化活動』で語学学校に通えば，アルバイトができる。"** — incorrect. 「文化活動」では，資格外活動許可（G16 cross-ref）の包括許可の対象ではない（「留学」と「家族滞在」の保有者のみが包括許可の対象）。「文化活動」での就労は，個別の資格外活動許可の申請が別途必要であり，通常は認められない。
4. **"茶道・武道・伝統芸能の修行は『文化活動』でできる。"** — correct（with condition）. 伝統芸能・武道等の研修・研究は「文化活動」の主な対象の一つ。ただし，修行の過程で収入を得ることは禁止されており，収入を伴うパフォーマンス活動は「興行」または「芸術」が必要（G86・G91 cross-ref）。

## Trigger

Use this card when the user says:

- "文化活動ビザで日本で仕事をしてもいいですか？"
- "茶道（武道・伝統芸能等）を学ぶために日本に来るにはどのビザが必要ですか？"
- "在留資格『文化活動』での収入は得られますか？"
- "文化活動と留学ビザの違いは何ですか？"
- "文化活動ビザでアルバイトはできますか？"
- any pattern treating 文化活動 as permitting income-generating activities, or conflating it with 留学 or 芸術.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-bunka-katsudo | L4 | 出入国在留管理庁「在留資格『文化活動』」 | https://www.moj.go.jp/isa/applications/status/culture.html | 2026-05-15 | 活動定義（学術・芸術上の研究・研修・調査; 収入を伴わない）; 対象（研究者・武道修行者・伝統芸能修行者等）. |
| g16-crossref | guardrail | guardrail-shikaku-gai-katsudo-28h-limit (G16) | internal | 2026-05-15 | G16: 資格外活動許可の包括許可対象=留学・家族滞在のみ; 文化活動保有者は包括許可対象外. |
| g86-crossref | guardrail | guardrail-kenkyu-kyoju-geijutsu-shukyo (G86) | internal | 2026-05-15 | G86: 「芸術」=収入を伴う芸術活動; 「文化活動」=収入を伴わない文化的研究・研修との対比. |
| g91-crossref | guardrail | guardrail-kogyou-visa-yoken (G91) | internal | 2026-05-15 | G91: 「興行」=商業的パフォーマンス活動; 伝統芸能で報酬を受ける公演は興行ビザが必要. |

## Official Rule Or Source Fact

**在留資格「文化活動」の活動定義:**

> 収入を伴わない学術上若しくは芸術上の活動又は我が国特有の文化若しくは技芸について専門的な研究を行い若しくは専門家の指導を受けてこれを修得する活動

主な活動対象:
- 学術研究者（大学・研究機関での研究; ただし報酬なし）
- 伝統芸能・武道の修行者（茶道・華道・柔道・空手・剣道・能・歌舞伎等）
- 民俗芸能・工芸の研究・研修（陶芸・染色・漆器等）
- 日本文化・歴史・言語の研究者（大学等所属なし）

**収入禁止の原則:**

「文化活動」の活動定義の冒頭に**「収入を伴わない」**という要件が明示されている。したがって:
- 研修・修行中に師匠から謝礼・手当を受け取ること: **禁止**（収入に該当）
- 文化活動の一環として有料のデモンストレーション・教授活動を行うこと: **禁止**（不法就労）
- 外部での有償パフォーマンス・展覧会出品（収入あり）: **禁止**（興行/芸術が必要）

**「文化活動」と他の在留資格の比較:**

| 在留資格 | 活動内容 | 収入 | 主な対象 |
|---|---|---|---|
| **文化活動** | 学術・芸術の研究・研修; 日本特有の文化・技芸の修得 | **禁止** | 武道修行者・伝統芸能研修者・文化研究者 |
| **芸術** | 収入を伴う芸術活動（音楽・美術・文学等）| **可** | プロの芸術家 |
| **興行** | 商業的公演（コンサート・演劇・スポーツ等）| **可** | プロのパフォーマー |
| **留学** | 教育機関での修学 | **制限あり**（資格外活動許可=28h/week）| 大学・専門学校・日本語学校の学生 |
| **研究** | 公私の機関での研究（報酬あり）| **可** | 研究機関勤務の研究者 |

**資格外活動許可との関係:**

「文化活動」保有者は，資格外活動許可の包括許可（G16）の対象ではない（包括許可=留学・家族滞在のみ）。

アルバイト等の就労を行う場合:
- 個別の資格外活動許可（個別許可）の申請が別途必要
- 「文化活動」の性質（収入を伴わない活動）と矛盾するため，就労を目的とした個別許可は通常認められない
- 実務上: 「文化活動」での就労は原則困難

**「文化活動」と「留学」の実務的な差異:**

| 比較項目 | 文化活動 | 留学 |
|---|---|---|
| **主な場** | 個人師匠・道場・文化施設等（教育機関以外）| 教育機関（大学・専門学校・日本語学校等）|
| **就労** | 資格外活動許可=個別申請必要（原則困難）| 資格外活動許可=包括許可あり（28h/week）|
| **在留期間** | 3年・1年・6か月・3か月 | 4年3か月・4年・3年3か月・...・3か月 |
| **扶養家族** | 家族滞在で帯同可能（ただし主が収入なし）| 家族滞在で帯同可能 |

## Safe Answer Behavior

- When asked if 文化活動 permits work: immediately clarify that 文化活動 prohibits income-generating activities; route to 芸術 or 興行 if paid performance is intended.
- When asked about 文化活動 + part-time work: clarify that 包括許可 does not apply; individual permit application is required and rarely granted for this status.
- When asked about the difference from 留学: explain that 留学 is at a registered educational institution while 文化活動 is for research/training outside institutional settings; 留学 has the 28h/week work permission option.
- When asked about traditional arts training: confirm that 文化活動 covers this, but any paid activity requires separate status (芸術 or 興行).

## Must Say

- 在留資格「文化活動」は，「収入を伴わない」学術・芸術上の研究・研修・調査活動が対象。収入を伴う就労・サービス提供は在留資格外活動（不法就労）になる。
- 「文化活動」保有者は，資格外活動許可の包括許可（28h/week）の対象ではない。就労には個別の許可申請が必要であり，通常は認められない。
- 伝統芸能・武道の修行は「文化活動」で可能だが，修行中に収入を得ることは禁止。有償のパフォーマンス活動は「興行」または「芸術」が必要。

## Must Not Say

- 「文化活動ビザで文化に関係する仕事をして収入を得てよい。」（収入を伴う活動は禁止）
- 「文化活動ビザでもアルバイトできる（留学生と同じ）。」（包括許可の対象ではない）
- 「文化活動と芸術ビザは同じ。」（収入の有無で根本的に異なる）

## Deep Water Triggers

- 武道の師匠（日本人）が外国からの弟子に毎月謝礼を払いたい — 弟子の在留資格はどうなるか？（「文化活動」では謝礼=収入=禁止）
- 「文化活動」で日本に来ているが，海外のオンラインプラットフォームで日本文化を教えて報酬を得ている — 不法就労になるか？
- 文化活動で研究中に，大学から客員研究員として少額の謝礼を受けた — 問題があるか？（少額でも「収入」に該当する可能性）
- 「文化活動」での在留期間が終わる前に，プロの演奏家として活動したい — どのような在留資格変更が必要か？
- 伝統工芸（陶芸・漆器等）の技術を修得するために日本に来るが，制作した作品を販売したい — 可能か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons planning to engage in paid cultural activities: route to 芸術 (G86) or 興行 (G91) depending on the nature of activities; confirm they must obtain appropriate status before activities begin.
- For persons already in Japan on 文化活動 who want to earn income: route to professional immediately; any income-generating activity is potentially illegal under current status.
- For persons asking about 文化活動 vs 留学: explain the key differences (institution type, work permission); route to appropriate status based on intended study arrangement.
- For persons asking about traditional arts training: confirm 文化活動 is appropriate for non-paid training; explain the paid-activity boundary clearly.

## Unknown Fields

- Whether small honoraria or travel expense reimbursements from the host institution constitute "収入" for the purposes of the 文化活動 prohibition — the line between expenses and income is unclear from official sources.
- Whether 文化活動 holders are eligible for 個別 資格外活動許可 for any type of employment, or whether the status's "no income" character effectively bars all work permission.
- The specific list of cultural activities and arts/crafts recognized as qualifying for 文化活動 status.

## Needs Domain Flags

- needs_domain (P1): Does receiving a small honorarium (e.g., nominal 謝礼) from the training host (師匠 or institution) violate the "収入を伴わない" requirement for 文化活動? The threshold between expense reimbursement and prohibited income is not clear from ISA official text.
- needs_domain (P1): Can a 文化活動 holder obtain 個別 資格外活動許可 for any form of employment? The structural interpretation (文化活動 = no income) suggests the answer is generally no, but this has not been confirmed from official ISA guidance.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| bunka-001 | "文化活動ビザで日本に来て，伝統工芸を学びながら制作した作品を販売できますか？" | State: 在留資格「文化活動」は収入を伴わない活動のみが対象。作品の販売=収入を伴う活動となり，「文化活動」の範囲外（不法就労になる可能性）。有償の制作・販売活動を行う場合は，「芸術」または「経営・管理」など別の在留資格が必要。行政書士に相談を。 |
| bunka-002 | "文化活動ビザとはどういうものですか？留学ビザとの違いは？" | State: 「文化活動」は，収入を伴わない学術・芸術研究，または日本特有の文化・技芸（武道・伝統芸能等）の修行が対象。「留学」は大学・専門学校等の教育機関での修学が対象で，資格外活動許可（28時間/週）でアルバイトが可能。「文化活動」には就労のアルバイト許可（包括許可）がなく，収入を得ることが原則禁止。 |
| bunka-003 | "茶道の師匠に就いて修行するために日本に来たいのですが，どのビザが必要ですか？" | State: 個人の師匠についての茶道修行は，在留資格「文化活動」の対象となる可能性が高い（日本特有の文化・技芸の修行）。ただし，修行中に収入（謝礼等）を得ることは禁止。修行の成果として有償でパフォーマンスや教授活動を行う場合は「興行」または「芸術」が別途必要。具体的な状況を行政書士に相談して申請準備を行うことを推奨する。 |

## Source Notes

- 在留資格「文化活動」活動定義: ISA culture.html — 「収入を伴わない学術上若しくは芸術上の活動又は我が国特有の文化若しくは技芸について専門的な研究を行い若しくは専門家の指導を受けてこれを修得する活動」（直接引用）.
- 収入禁止の範囲: 活動定義の文言から導かれる; ISAによる具体的な禁止行為リストは非公開.
- 資格外活動許可との関係: G16 cross-ref（包括許可は留学・家族滞在のみ; 文化活動は対象外）.
- 「芸術」との区別: G86 cross-ref（芸術=収入を伴う芸術活動; 文化活動=収入なし）.
- 「興行」との区別: G91 cross-ref（興行=商業的公演活動; 伝統芸能での有償パフォーマンス）.
- Cross-ref G16 (資格外活動許可), G86 (「芸術」との区別), G91 (「興行」との区別).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 018 G98. Key sources: ISA culture.html（文化活動の活動定義; 収入を伴わない要件）; G16/G86/G91 cross-refs. Core facts: 文化活動=収入を伴わない学術・芸術研究・文化技芸修行; 収入を伴う就労は不法就労; 包括的資格外活動許可の対象外; 留学との主な違い（就労可能性・対象施設）. needs_domain P1: 小額謝礼が「収入」に該当するかの判断基準; 文化活動保有者の個別資格外活動許可の可否. Cross-ref G16, G86, G91.
