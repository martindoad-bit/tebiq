---
asset_id: guardrail-rodoho-gaikokujin-tekiyo
title: 外国人労働者の労働基準法適用 — 在留資格・不法就労を問わず労働基準法・労働安全衛生法・最低賃金法が適用される；不法就労者にも労災補償が適用される；出入国規制と労働保護は独立した制度
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

This guardrail prevents errors about the application of Japanese labor law to foreign workers. Key errors to block:

1. **"外国人は不法就労しているのだから，労働基準法の保護は受けられない。"** — incorrect. 労働基準法・労働安全衛生法・最低賃金法は，在留資格の有無・就労の合法性を問わず，日本国内で就労している全ての労働者に適用される。不法就労者も法的保護の対象。
2. **"外国人は在留資格の種別によって，最低賃金が異なる。"** — incorrect. 最低賃金法は，在留資格・国籍を問わず，日本国内で働く全ての労働者に同様に適用される。外国人に別の（低い）最低賃金が設定されることはない。
3. **"労災事故に遭った外国人は，不法就労だと労災保険の対象にならない。"** — incorrect. 労働者災害補償保険法（労災保険法）は，適法・不法を問わず全ての労働者に適用される。不法就労中の労災事故でも，労災保険給付を受ける権利がある。
4. **"外国人が残業代の未払いや違法解雇を主張したら，不法在留の疑いで通報される。"** — not an official rule（unfounded fear）. 労働基準監督署への相談・申告は，在留資格状況に関わらず受け付けられる。ただし，労基署は入管当局ではなく，労働法令の執行を目的とする機関。在留資格の申告義務は別問題。

## Trigger

Use this card when the user says:

- "不法就労でも給料をもらう権利はありますか？"
- "在留資格がなくても労災の対象になりますか？"
- "外国人の最低賃金は日本人と違いますか？"
- "残業代が払われていない外国人ですが，訴えることができますか？"
- "技能実習生として雇用されていますが，労働基準法は適用されますか？"
- any pattern suggesting that immigration status determines labor law entitlement, or that undocumented workers have no labor rights.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| mhlw-rodoho-gaikokujin | L4 | 厚生労働省「外国人労働者に関する労働基準法等の適用について」 | https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/gaikokujin.html | 2026-05-15 | 労働基準法・最低賃金法・安全衛生法が在留資格不問で適用; 不法就労者も対象. |
| rousan-3jo | L4 | 労働者災害補償保険法 第3条 | https://laws.e-gov.go.jp/law/322AC0000000050 | 2026-05-15 | 「労働者を使用する事業は適用事業」; 国籍・在留資格による除外規定なし. Used for G67 cross-ref. |
| g67-crossref | guardrail | guardrail-koyohoken-gaikokujin-gimu (G67) | internal | 2026-05-15 | G67: 雇用保険・労災保険の外国人への適用; 在留資格問わず労災適用確認済み. |
| g87-crossref | guardrail | guardrail-fuhoshurou-jocho-sekinin (G87) | internal | 2026-05-15 | G87: 不法就労の雇用主への刑事罰（入管法第73条の2）; 出入国規制と労働法は別制度として並存. |

## Official Rule Or Source Fact

**労働基準法等の適用範囲（外国人・不法就労者を含む）:**

厚生労働省の公式見解: 労働基準法，労働安全衛生法，最低賃金法は，**在留資格の有無，就労の合法性を問わず**，日本国内で使用される全ての労働者に適用される。

| 法律 | 適用対象 | 外国人・不法就労への適用 |
|---|---|---|
| **労働基準法** | 日本国内で使用される全ての労働者（第1条） | 在留資格・国籍問わず適用 |
| **最低賃金法** | 日本国内で使用される全ての労働者 | 外国人も同一の最低賃金が適用 |
| **労働安全衛生法** | 全ての事業主・労働者 | 在留資格・国籍問わず適用 |
| **労働者災害補償保険法** | 全ての適用事業所の労働者（第3条）| 不法就労者を含む全ての労働者に適用 |
| **雇用保険法** | 一定要件を満たす全ての労働者（G67 cross-ref）| 在留資格問わず（ただし在留資格ごとの適用確認が必要）|

**不法就労者の労働者としての権利:**

不法就労であっても，労働者が享有する主な権利:

| 権利 | 内容 |
|---|---|
| **賃金請求権** | 働いた分の賃金を請求する権利（最低賃金以上）|
| **残業代請求権** | 法定労働時間（週40時間・1日8時間）超過分の割増賃金 |
| **労災補償請求権** | 業務上の負傷・疾病・死亡に対する労災保険給付 |
| **休業補償権** | 労災による休業中の給付 |
| **雇用保険** | 要件を満たす場合に失業給付等（G67 cross-ref）|

**出入国規制と労働法の独立性:**

重要な原則: 出入国管理法（入管法）上の不法就労規制と，労働基準法上の労働者保護は**別個の独立した制度**。

- 雇用主は不法就労助長罪（入管法第73条の2; G87 cross-ref）により刑事罰の対象となる
- **同時に**，不法就労者（労働者）は労働基準法上の権利（賃金・労災等）を有する
- 不法就労の事実は，労働者の権利行使を妨げるものではない
- 労働基準監督署への申告・相談は，在留資格の状況に関わらず受け付けられる

**労働基準監督署への相談:**

- 不法就労状態の外国人でも，未払い賃金・残業代・労災等の問題を労働基準監督署に相談できる
- 労基署は労働法令の執行機関であり，在留資格の確認・入管への通報を目的としない
- ただし，相談の過程で在留状況が明らかになる可能性はあるため，弁護士に事前相談することが安全

**技能実習生・育成就労労働者への適用:**

技能実習生・育成就労（2027年以降）の外国人労働者にも，労働基準法・最低賃金法・労働安全衛生法が完全に適用される。技能実習生の労災・賃金トラブルは労基署の管轄。

## Safe Answer Behavior

- When asked if undocumented/illegal workers have labor rights: confirm they do; all Japanese labor law applies regardless of immigration status.
- When asked about minimum wage for foreigners: confirm the same minimum wage applies to all workers in Japan, regardless of nationality or status.
- When asked about 労災 for undocumented workers: confirm 労災 applies; route to 労働基準監督署 for 労災 application procedure.
- When asked about complaining to labor authorities about unpaid wages: confirm 労基署 consultation is available; recommend lawyer consultation first for undocumented workers for safety.

## Must Say

- 労働基準法・最低賃金法・労働安全衛生法は，在留資格の有無や就労の合法性を問わず，日本国内で働く全ての労働者に適用される。不法就労者も法的保護の対象。
- 不法就労中の業務上の事故・疾病でも，労働者災害補償保険（労災）の給付を受ける権利がある（労働者災害補償保険法第3条）。
- 出入国管理（入管法）上の不法就労規制と，労働基準法上の労働者保護は独立した制度。労働者の権利行使は在留資格の状況によって妨げられない。

## Must Not Say

- 「不法就労なので，賃金を請求する権利はない。」（不法就労者も賃金請求権を有する）
- 「外国人の最低賃金は日本人より低い。」（最低賃金は国籍・在留資格問わず同一）
- 「不法就労者は労災保険の対象外。」（労災は全ての労働者に適用）
- 「労基署に相談したら不法在留として通報される。」（労基署は労働法令執行機関; 入管通報を目的としない）

## Deep Water Triggers

- 技能実習生が月100時間の残業をさせられ残業代を支払われていない — どこに相談すればよいか？
- 不法就労中に工場で指を骨折した — 雇用主から「不法就労だから労災は出ない」と言われた — これは正しいか？
- 雇用主が給与から強制的に一定額を天引きしている — 労働基準法違反か？（強制貯金・前借り控除等）
- 外国人労働者の解雇が不当解雇だと思う — 労働審判・労働委員会を利用できるか？
- 技能実習生として来日したが，実習先の業務内容が契約と全く異なる — どこに相談すればよいか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons with unpaid wages/overtime: route to 労働基準監督署; recommend 外国人総合相談センター or 法テラス（Legal Aid) for legal support.
- For undocumented workers facing labor issues: strongly recommend lawyer or legal aid first (弁護士・法テラス); route to labor authorities after legal consultation.
- For 労災 cases: route to 労働基準監督署（労災課）for application; note 労災申請 does not require status disclosure for benefits.
- For 技能実習生 issues: route to 外国人技能実習機構 (OTIT) for complaints; 労基署 for labor violations.

## Unknown Fields

- Whether the 労働基準監督署 has any formal or informal policy on sharing information about undocumented workers with 入管当局 — and whether this varies by jurisdiction.
- The practical enforcement rate of minimum wage violations against employers of undocumented foreign workers, and whether workers in practice receive back wages when they report violations.
- Whether undocumented workers can file 労働審判 (labor tribunal) claims without exposure to immigration enforcement risk.

## Needs Domain Flags

- needs_domain (P1): What is the current 厚生労働省 / 労働基準監督署 policy regarding information sharing with 出入国在留管理庁 (ISA) when an undocumented worker contacts the 労基署 with a labor complaint? This affects the safety of routing undocumented workers directly to 労基署.
- needs_domain (P1): For 技能実習生 with criminal-level exploitation (trafficking-like conditions) — is there a clear legal pathway to emergency status change or protection under Japan's anti-trafficking laws that TEBIQ should reference alongside labor law rights?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| rodoh-001 | "在留資格がなくても，未払い給料を請求できますか？" | State: 労働基準法は在留資格の有無にかかわらず，日本国内で働く全ての労働者に適用される。未払い賃金の請求権は在留資格とは独立した法的権利。労働基準監督署に相談できる（弁護士または法テラスに事前相談することを推奨）。 |
| rodoh-002 | "不法就労中に工場で事故に遭いました。労災保険は使えますか？" | State: 労働者災害補償保険法は，在留資格や就労の合法性を問わず，全ての労働者に適用される。業務上の事故であれば，不法就労中でも労災保険給付を受ける権利がある。住所地管轄の労働基準監督署（労災課）に申請してください。まず弁護士または法テラスに相談することを推奨する。 |
| rodoh-003 | "技能実習生として来日しています。日本人と同じ最低賃金が適用されますか？" | State: 最低賃金法は，国籍・在留資格を問わず，日本国内で働く全ての労働者に同一の最低賃金（都道府県別の地域別最低賃金）が適用される。技能実習生も同様。最低賃金以下の賃金は違法であり，差額の支払いを請求できる。問題がある場合は労働基準監督署または外国人技能実習機構（OTIT）に相談を。 |

## Source Notes

- 外国人労働者への労働法適用: 厚生労働省「外国人労働者に関する労働基準法等の適用について」— 労働基準法・最低賃金法・安全衛生法が在留資格問わず適用されると明示.
- 労災の全労働者適用: 労働者災害補償保険法第3条（e-Gov法令）; G67 cross-ref（不法就労者にも適用確認済み）.
- 不法就労規制との独立性: G87 cross-ref（雇用主への刑事罰; 出入国規制と労働法が独立していることを示す）.
- 外国人技能実習機構（OTIT）: 技能実習生の相談・苦情処理を担当する公的機関（2017年設立）.
- Cross-ref G67 (雇用保険・労災保険の外国人適用), G87 (不法就労助長罪), G58 (社会保険の強制適用).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 018 G99. Key sources: 厚生労働省「外国人労働者に関する労働基準法等の適用」（在留資格問わず適用が明示）; 労働者災害補償保険法第3条（e-Gov法令）; G67/G87/G58 cross-refs. Core facts: 労働基準法・最低賃金法・安全衛生法=在留資格問わず全労働者に適用; 最低賃金は国籍・在留資格問わず同一; 不法就労者も労災保険の対象; 出入国規制と労働法保護は独立した制度. needs_domain P1: 労基署と入管当局の情報共有方針; 技能実習生の人身売買対応ルート. Cross-ref G67, G87, G58.
