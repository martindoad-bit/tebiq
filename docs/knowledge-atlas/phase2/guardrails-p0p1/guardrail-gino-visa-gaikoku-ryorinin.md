---
asset_id: guardrail-gino-visa-gaikoku-ryorinin
title: 技能ビザ（外国料理の調理師等） — 外国特有の熟練技能が対象；日本料理・一般調理師は不可；10年経験要件
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 010"
---

## What This Document Is

This guardrail prevents errors about the 技能 (Skilled Labor) visa category — specifically for foreign cuisine chefs (外国料理の調理師), sports instructors, aircraft pilots, precious metal craftsmen, and similar skilled trades. Key errors to block:

1. **"料理人なら技能ビザが取れる。"** — incorrect. Only **foreign** cuisine specialists qualify. Japanese cuisine chefs (日本料理の調理師) do NOT fall under 技能 — "foreign" specialty is the defining criterion.
2. **"短期間でも技能ビザは取れる。"** — incorrect. 上陸基準省令 requires 10 years of experience in the relevant field (with some exceptions for formal culinary training programs).
3. **"技能ビザは技術・人文知識・国際業務と似たようなもの。"** — incorrect. 技能 is for manual/craft/skilled-trade activities requiring specialized foreign expertise; 技人国 is for professional/intellectual/international work.
4. **"技能ビザで日本の職場で何でもできる。"** — incorrect. Activity must be specifically within the contracted skilled trade; general cooking outside the foreign-cuisine specialty would not qualify.

## Trigger

Use this card when the user says:

- "外国料理の調理師として日本で働きたい。どのビザが必要ですか？"
- "日本料理の調理師ですが，技能ビザで来日できますか？"
- "技能ビザの要件は何ですか？経験は何年必要ですか？"
- "スポーツ指導者や航空機パイロットは技能ビザですか？"
- "技能ビザと技術・人文知識・国際業務の違いは？"
- any pattern confusing 技能 with 技人国, or treating all culinary workers as eligible for 技能.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-gino-main | L4 | 出入国在留管理庁「在留資格『技能』」 | https://www.moj.go.jp/isa/applications/status/skilled.html | 2026-05-15 | 活動定義:「本邦の公私の機関との契約に基づいて行う産業上の特殊な分野に属する熟練した技能を要する業務に従事する活動」; 代表例: 外国料理の調理師, スポーツ指導者, 航空機の操縦者, 貴金属等の加工職人. |
| joreishomeisho | L2 | 上陸基準省令「技能」 | (法令 PDF) | 2026-05-15 | 経験年数: 原則10年以上（調理師は当該外国料理の調理に係る実務経験10年以上）; 専門学校等での正規訓練期間は経験年数に算入可（一部）. |
| g47-crossref | guardrail | guardrail-gijinkoku-dokuritsu-keieikanri (G47) | internal | 2026-05-15 | 技人国 covers 技術/人文知識/国際業務; 技能 is the separate manual-skill category. |

## Official Rule Or Source Fact

**技能 activity definition (confirmed from ISA status page):**
> 「本邦の公私の機関との契約に基づいて行う産業上の特殊な分野に属する熟練した技能を要する業務に従事する活動」

**Representative qualifying categories (confirmed from ISA status page):**
- 外国料理の調理師 (foreign-cuisine chefs)
- スポーツ指導者 (sports instructors/coaches)
- 航空機の操縦者 (aircraft pilots)
- 貴金属等の加工職人 (precious metals and similar craftsmen)

**The "foreign" requirement for culinary workers:**
The qualifier is 「外国料理」 — foreign cuisine. This means:
- Chinese cuisine chef: ✓ (qualifies)
- French cuisine chef: ✓ (qualifies)
- Italian cuisine chef: ✓ (qualifies)
- 日本料理の調理師 (Japanese cuisine): ✗ — does NOT qualify; this is domestic, not "foreign" specialty
- General (non-specialty) kitchen worker: ✗ — does not meet the skilled-trade requirement

**Experience requirement (from 上陸基準省令):**
For culinary workers: 10 years of practical experience in the relevant foreign cuisine.
- Formal culinary training (専門学校 etc.) may count toward the 10 years in some configurations.
- The 10-year threshold makes 技能 inapplicable to newly trained chefs without long practical experience.

**Key distinction from 技人国:**

| | 技能 | 技術・人文知識・国際業務 |
|---|---|---|
| 活動内容 | 産業上の特殊な分野の熟練した技能（手作業・職人系） | 技術/人文知識/国際業務（専門的・知識労働） |
| 代表例 | 外国料理人、スポーツ指導者、職人 | エンジニア、経理、マーケター、通訳 |
| 学歴要件 | 不要（実務経験で代替） | 原則必要（大卒等または実務10年） |
| 経験要件 | 10年実務経験（原則） | 関連実務経験（学歴代替の場合） |

**What is NOT covered by 技能:**
- Japanese cuisine (日本料理) — not "foreign" specialty
- General kitchen staff without specialty-cuisine qualification
- Part-time culinary work without proper contract with Japanese employer
- Work outside the specific contracted specialty

## Safe Answer Behavior

- When a chef asks about working in Japan: clarify whether their cuisine is "foreign" (qualifying) or Japanese (not qualifying); 10-year experience requirement applies.
- When asked about sports instructors or pilots: confirm these are covered under 技能; professional level required.
- When asked to compare with 技人国: clarify the manual/craft vs. intellectual/professional distinction.
- Do not say all culinary workers qualify — the "foreign cuisine" requirement is essential.
- Do not say the process is straightforward — 10-year experience documentation is rigorous.

## Must Say

- 技能ビザ（在留資格「技能」）の対象は，「産業上の特殊な分野に属する熟練した技能を要する業務」（ISA 活動定義）。代表例は外国料理の調理師，スポーツ指導者，航空機の操縦者，貴金属等の加工職人。
- 調理師については**外国料理**に限定される。日本料理の調理師は，日本において「外国特有の熟練技能」とはならないため，技能ビザの対象外。
- 上陸基準省令上，原則として当該外国料理の調理に係る**実務経験10年以上**が必要。
- 技能ビザは，知識・専門職系の「技術・人文知識・国際業務」とは別カテゴリであり，混同しないこと。

## Must Not Say

- 「料理人なら技能ビザで来日できる。」（外国料理限定；日本料理は対象外）
- 「技能ビザは技人国と同じようなもの。」（別カテゴリ）
- 「経験が短くても技能ビザは取れる。」（原則10年要件）
- 「日本料理のシェフも技能ビザが使える。」（対象外）

## Deep Water Triggers

- Japanese fusion restaurant in Japan wants to hire a chef who cooks "Japanese-French" cuisine — which category applies?
- Chef has 8 years of experience in Chinese cuisine plus 2 years in formal culinary school — does this meet the 10-year threshold?
- A famous foreign sports coach wants to come to Japan — what level of "professional" qualification is needed for 技能?
- A foreign chef wants to come to Japan but their cuisine (e.g., Peruvian) has no established ISA precedent — how is this assessed?
- A 技能 visa holder (chef) wants to open their own restaurant — does their visa cover self-employment?

## User Next Actions

This is not user-facing copy. For answer routing:

- For foreign-cuisine chefs: confirm the 10-year experience route; documentation must prove both the cuisine specialization and the experience duration; route to professional (行政書士) for application.
- For Japanese-cuisine chefs: 技能 does not apply; they may need to look at alternative routes if any; no straightforward visa path (route to professional).
- For sports instructors/coaches: 技能 may apply if professional level; confirm specific contract with Japanese institution; route to professional.
- For 技能 visa holder seeking to change activities (e.g., open own restaurant): 在留資格変更 required for self-employment; route to professional.

## Unknown Fields

- The exact list of cuisines ISA has recognized as "foreign" specialty under 技能 in past approval decisions.
- How ISA handles fusion cuisine where the "foreign" element is mixed with Japanese elements.
- Whether online/hybrid teaching (sports instruction via video) is within scope of 技能.
- The specific documentation ISA requires to prove 10 years of foreign-cuisine culinary experience.

## Needs Domain Flags

- needs_domain (P1): for culinary specialists in less-common cuisines (e.g., South American, African) — what is the ISA practice for approving 技能 applications in non-standard foreign-cuisine categories?
- needs_domain (P1): for the 10-year experience threshold — can training-school time fully substitute, and what is the documented ISA practice on this?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| gino-001 | "日本料理のシェフですが，技能ビザで来日できますか？" | State: NO — 技能 requires FOREIGN cuisine specialty; Japanese cuisine (日本料理) does not qualify as "foreign"; different visa route needed (if any). |
| gino-002 | "中華料理の調理師として10年働いています。技能ビザの要件を満たしますか？" | State: Likely yes — Chinese cuisine = foreign cuisine; 10-year experience meets 上陸基準省令 threshold; professional guidance recommended for documentation. |
| gino-003 | "技能ビザと技人国はどう違うの？" | State: 技能 = manual/craft/skilled-trade (foreign-cuisine chef, sports coach, craftsman); 技人国 = intellectual/professional/international business work; different activity definitions and requirements. |

## Source Notes

- 技能 activity definition confirmed from ISA skilled.html status page.
- Representative examples (外国料理の調理師, スポーツ指導者, 航空機の操縦者, 貴金属等の加工職人) confirmed from same ISA page.
- 10-year experience requirement for culinary workers from 上陸基準省令「技能」(L2 source — regulation text).
- "外国料理" limitation (not 日本料理) is structural from the "foreign" specialty requirement in the visa definition.
- Cross-ref G47 (技人国 vs 技能 distinction confirmed in that card's source notes).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 010 G56. Key sources: ISA skilled.html (activity definition + representative examples); 上陸基準省令「技能」(10-year experience requirement). Core facts: 外国料理限定; 日本料理は対象外; 10-year experience; different from 技人国. Cross-ref G47.
