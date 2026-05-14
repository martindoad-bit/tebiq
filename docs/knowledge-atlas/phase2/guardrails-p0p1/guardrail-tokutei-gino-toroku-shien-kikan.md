---
asset_id: guardrail-tokutei-gino-toroku-shien-kikan
title: 特定技能の登録支援機関 — 雇用主と別個の存在；全部委託のみ受入機関の支援義務を満たす；必須ではない
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 007"
---

## What This Document Is

This guardrail prevents errors about 登録支援機関 (Registered Support Organizations / RSOs) in the 特定技能 system — specifically for 1号特定技能外国人. Key errors to block:

1. **"登録支援機関 = 雇用主（受入機関）と同じ責任・義務を負う。"** — incorrect. RSOs are separate legal entities; they take on delegated support duties, not the full legal employer obligations.
2. **"登録支援機関に委託すれば，あとは何もしなくていい（一部だけでも同じ）。"** — incorrect. Only **full** delegation satisfies the employer's support-system compliance requirement; partial delegation leaves remaining duties with the employer.
3. **"登録支援機関は必ず使わなければならない。"** — incorrect. Employers can implement the support plan directly if they meet the standards.
4. **"登録支援機関に委託すれば，届出義務も移転する。"** — incorrect. The RSO has its own separate reporting obligations; employer obligations are not extinguished by delegation.

## Trigger

Use this card when the user says:

- "登録支援機関とは何ですか？"
- "特定技能の外国人を採用するには，登録支援機関が必要ですか？"
- "登録支援機関に委託したら，会社側の義務はなくなりますか？"
- "登録支援機関と雇用主の違いは何ですか？"
- "登録支援機関に一部の支援だけ委託しても大丈夫ですか？"
- "特定技能の支援計画を自社でやるのは難しいですか？"
- any pattern treating RSOs as equivalent to employers, or misunderstanding the full vs. partial delegation rule.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-shien-main | L4 | 出入国在留管理庁「１号特定技能外国人支援・登録支援機関について」 | https://www.moj.go.jp/isa/policies/ssw/supportssw.html | 2026-05-15 | Definition; 10 mandatory support categories; full vs. partial delegation rule; registration requirements. |
| isa-shien-todoke | L4 | 出入国在留管理庁「特定技能所属機関・登録支援機関による届出」 | https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html | 2026-05-15 | 14-day reporting requirement; failure = registration cancellation risk. |
| isa-ssw-yoryou | L4 | 出入国在留管理庁「特定技能外国人受入れに関する運用要領」（令和7年4月） | https://www.moj.go.jp/isa/content/930004944.pdf | 2026-05-15 | Framework for RSO role; support plan structure; employer compliance conditions. |
| isa-ssw-qa | L4 | 出入国在留管理庁「特定技能制度に関するQ&A」 | https://www.moj.go.jp/isa/content/930006254.pdf | 2026-05-15 | Q&A clarifying RSO vs. employer obligations. |

## Official Rule Or Source Fact

**Definition (confirmed from ISA supportssw.html):**
> 「登録支援機関は，1号特定技能外国人を受け入れる企業が，外国人労働者への支援業務を委託できる登録済みの機関です。」

RSOs are registered institutions that receiving companies can commission to carry out support duties for Type 1 Specified Skilled Workers.

**10 Mandatory Support Categories:**
> 「事前ガイダンス，送迎，住居確保支援，生活オリエンテーション，公的手続同行，日本語学習機会提供，相談対応，交流促進，転職支援，定期面談など10項目の義務的支援。」

All 10 categories must be covered (whether by the employer directly or via full RSO delegation).

**Full vs. Partial Delegation — Critical Rule:**
> 「受入れ機関から委託を受けて，支援計画の全部又は一部を委託することもできます。ただし全部委託した場合のみ，受入れ機関の支援体制基準を満たしたと見なされます。」

**Only full delegation** of the support plan satisfies the employer's compliance standard. Partial delegation leaves remaining categories as the employer's direct obligation. If partial delegation is done without the employer implementing the rest directly → non-compliant.

**RSO use is NOT mandatory:**
> 「いいえ。登録支援機関に全部委託した場合，受入れ機関自体は直接支援義務を果たしたと見なされます。」

Employers have two compliant pathways:
- **Direct support**: Implement all 10 support categories directly (if employer meets the support standards)
- **Full delegation**: Commission all support to a registered RSO → employer deemed compliant

**RSOs cannot sub-delegate:**
Assigned support responsibilities cannot be further delegated by the RSO to another party.

**RSO Reporting Obligations (confirmed from ISA 届出 page):**
> 「事由発生日から１４日以内に提出する必要があります。届出の不履行や虚偽の届出については登録の取消しの対象とされている。」

RSOs must report relevant events within 14 days. Failure or false reporting can result in cancellation of RSO registration.

**Employer vs. RSO obligations — summary:**
| 義務・責任 | 雇用主（受入機関） | 登録支援機関 |
|---|---|---|
| 雇用契約の当事者 | ✅ 雇用主 | ❌ RSO（労働契約外） |
| 支援計画実施義務 | 全部委託の場合は免除（見なし充足）| 委託された支援を実施 |
| 届出義務（変更等） | ✅ 独立して存在 | ✅ 独立して存在（別々）|
| 特定技能法令遵守責任 | ✅ 主体的に負う | 登録要件・支援義務の範囲 |
| 追加委託（再委託） | N/A | ❌ 不可 |

**RSO Registration Requirements:**
> 「法令遵守と欠格事由非該当，かつ支援計画の全部を実施できる体制整備が必須です。」

## Safe Answer Behavior

- When an employer asks if RSO use is mandatory: clarify it is optional; the alternative is implementing the full support plan directly.
- When an employer asks about partial delegation: clearly explain that partial delegation only satisfies the delegated portions; the employer must cover the rest directly.
- When a worker or employer confuses RSO with employer: clarify that RSO is a support service provider, not the employment party; the employment contract is between worker and employer.
- When an RSO asks about its reporting obligations: confirm 14-day reporting; failure risks registration cancellation.
- Do not say that full RSO delegation removes all employer obligations — only the direct support-implementation obligation is satisfied; employer remains legally responsible for employment terms.

## Must Say

- 登録支援機関は，雇用主（受入機関）と別個の組織であり，支援業務を受託する機関。雇用契約の当事者は雇用主であり，登録支援機関ではない。
- 支援計画の全部を委託した場合のみ，受入機関の支援体制要件を満たしたとみなされる。一部委託では，残りを受入機関が自ら行わなければならない。
- 登録支援機関の利用は義務ではない。受入機関が自ら支援計画の全部を実施できる体制を整えれば，登録支援機関なしで特定技能外国人を受け入れられる。
- 登録支援機関は，委託された支援業務を第三者にさらに委託（再委託）することはできない。

## Must Not Say

- 「登録支援機関が全部やってくれるから，会社は何もしなくていい。」（届出義務等は会社に残る）
- 「一部だけ委託しても，支援基準を満たしたことになる。」（全部委託でないと見なし充足なし）
- 「登録支援機関は雇用主と同じ義務を負う。」
- 「特定技能の採用には必ず登録支援機関が必要。」

## Deep Water Triggers

- Employer switched RSOs mid-contract — what happens to the support plan continuity?
- RSO lost its registration — what is the employer's obligation?
- Worker has a complaint about support provided by RSO — who is responsible?
- Employer wants to partially delegate (some categories to RSO, some directly) and asks for confirmation that this is compliant.
- RSO failed to meet reporting obligations — how does this affect the employer's compliance status?

## User Next Actions

This is not user-facing copy. For answer routing:

- For employers choosing between direct support vs. RSO: route to professional (行政書士) for support plan structuring; clarify the full-delegation requirement.
- For RSO registration questions: route to ISA RSO registration page and application procedures.
- For workers with support complaints: route to ISA foreign worker consultation line (外国人在留総合インフォメーションセンター); advise documenting the issue.
- For RSO registration cancellation situations: route to professional immediately — employer compliance status may be at risk.

## Unknown Fields

- The specific list of disqualifying conditions (欠格事由) for RSO registration (full list not confirmed from text accessed).
- The fee/cost structure for RSO services (not an ISA matter — commercial).
- Whether partial support delegation creates any legal liability split between employer and RSO in labor dispute contexts.

## Needs Domain Flags

- needs_domain (P1): if an RSO's registration is cancelled mid-contract, what is the immediate obligation of the employer (受入機関) — must they find a new RSO immediately or can they implement support directly?
- needs_domain (P1): in a labor dispute involving a 1号特定技能外国人, how is responsibility allocated between the employer and RSO when the RSO provided deficient support?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shien-001 | "特定技能の採用には登録支援機関が必要ですか？" | State: NOT mandatory; employer can implement support plan directly if meeting standards; RSO is one option only. |
| shien-002 | "支援の一部だけ登録支援機関に委託してもいいですか？" | Explain: partial delegation allowed, but only full delegation satisfies the support-system compliance standard; remaining categories must be implemented by employer directly. |
| shien-003 | "登録支援機関と雇用主の違いは何ですか？" | State: RSO = support service provider under commission; employer = employment contract party; RSO does not bear employer legal obligations; separate reporting duties. |

## Source Notes

- RSO definition confirmed from ISA supportssw.html.
- 10 mandatory support categories confirmed from ISA (Japanese text summary from agent).
- Full-delegation-only rule confirmed from ISA sources.
- 14-day reporting obligation and registration cancellation risk confirmed from ISA 届出 page.
- Sub-delegation prohibition confirmed from ISA.
- RSO registration disqualification full list was not accessed in this session — marked unknown.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 007 G44. Key sources: ISA supportssw.html + 届出 page + 運用要領 (令和7年4月). Core facts: RSO ≠ employer; full-delegation-only rule; use not mandatory; cannot sub-delegate; 14-day reporting obligation.
