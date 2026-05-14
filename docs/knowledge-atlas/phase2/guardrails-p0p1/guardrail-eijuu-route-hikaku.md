---
asset_id: guardrail-eijuu-route-hikaku
title: 就労系在留資格から永住への戦略的ルート比較 — 技人国は10年居住が基本；特定技能は5年でショートカット不可；HSPは80点で1年・70点で3年のショートカットあり
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 015"
---

## What This Document Is

This guardrail prevents errors about the different routes from employment-based residence statuses to permanent residence (永住). Key errors to block:

1. **"特定技能1号で5年いれば永住に変更できる。"** — incorrect. 特定技能1号の通算在留上限は5年だが，それ自体が永住への直接ショートカットにはならない。永住の基本要件（10年居住＋就労・居住系5年）の居住期間は特定技能1号を含む在留期間の合計で計算されるが，5年の特定技能1号在留だけでは通常10年には足りない。
2. **"技人国なら3年更新してもらえれば，すぐ永住申請できる。"** — incorrect. 永住の基本要件は「継続10年以上在留、うち就労・居住系資格での5年以上」。在留期間が3年の在留資格（最長期間）を保有していることは要件の一つだが，3年の在留期間取得=即時永住申請資格ではない。実際に10年以上在留していることが必要。
3. **"高度専門職なら1年で永住できる。"** — partially correct but incomplete. 高度専門職1号で80ポイント以上の場合，1年の在留で永住申請が可能（G60 cross-ref）。ただし，ポイントは申請時点でも維持していること，かつ素行・生計・公的義務等の他の要件も満たすことが必要。ポイントが申請時に80点未満であれば適用されない。
4. **"永住申請は在留資格変更と同じ手続きでできる。"** — incorrect. 永住許可申請は在留資格変更許可申請とは別の申請（G25 cross-ref）。ISAへの申請だが，申請書類・審査基準が異なり，不服申立方法もない（G52 cross-ref）。

## Trigger

Use this card when the user says:

- "技人国から永住に変更するにはどうすればいいですか？"
- "特定技能1号で5年いたら永住になれますか？"
- "高度専門職で1年で永住申請できますか？"
- "HSPポイントが高いと永住が早くなりますか？"
- "永住に一番早く変更できる在留資格はどれですか？"
- any pattern treating 特定技能1号 5年 as automatic PR eligibility, or misrepresenting the HSP PR shortcut conditions.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-eijuu-guideline | L4 | 出入国在留管理庁「永住許可に関するガイドライン」 | https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00115.html | 2026-05-15 | 永住の基本要件（10年居住・5年就労系・最長在留期間・公的義務）; HSPショートカット（80pt→1年, 70pt→3年）; 配偶者特例. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の基本三要件・居住期間要件・HSPショートカット・配偶者特例・令和6年改定内容. |
| g34-crossref | guardrail | guardrail-hsp-points-miscalculation (G34) | internal | 2026-05-15 | G34: HSPポイントは申請時点でも維持が必要; 過去のポイントだけでは不十分. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号の5年上限; 1号から永住への直接ルートの実態. |
| g25-crossref | guardrail | guardrail-kika-vs-eijuu-different-routes (G25) | internal | 2026-05-15 | G25: 永住許可申請はISAへの在留資格変更手続きと別概念; 帰化との違い. |

## Official Rule Or Source Fact

**永住許可の基本要件（G60 cross-ref; ISAガイドライン令和6年改定版）:**

| 要件 | 内容 |
|---|---|
| **素行要件** | 素行が善良であること |
| **生計要件** | 独立の生計を営むに足りる資産または技能があること |
| **国益要件** | その者の永住が日本国の利益に合すると認められること |
| **居住期間要件（国益の一環）** | 継続して10年以上日本に在留し、うち就労資格または居住資格で5年以上在留していること |
| **最長在留期間要件** | 現在の在留資格で「最長の在留期間（3年または5年）」を保有していること |
| **公的義務要件（令和6年改定）** | 直近2年間、税金・年金・社会保険を適正に納付していること |

**在留資格別の永住への最短ルート:**

| 在留資格 | 通常ルート | ショートカット条件 |
|---|---|---|
| **技術・人文知識・国際業務（技人国）** | 10年以上在留（うち就労系5年以上）; 3年在留期間保有 | HSPポイントが基準を満たせばHSP移行後にショートカット可 |
| **特定技能1号** | 通算5年上限のため，5年を技術系等の他資格での在留と組み合わせることが実務上の選択肢; 単独で10年は不可能 | 特定技能2号→10年居住でも可（2号から他資格を経由）; 特定技能2号の在留期間は上限なし |
| **特定技能2号** | 10年以上在留（他資格期間も含む）; 最長在留期間保有 | HSPポイント基準を満たせば移行後ショートカット可 |
| **高度専門職1号（HSP1）** | **HSP1（80pt以上）: 1年で永住申請可** | 申請時点でも80pt以上を維持; 他要件（素行・生計・公的義務）も満たす必要 |
| **高度専門職1号（HSP1）** | **HSP1（70pt以上）: 3年で永住申請可** | 申請時点でも70pt以上を維持; 他要件も満たす必要 |
| **経営・管理** | 10年以上在留（他資格期間含む）; 最長在留期間保有 | HSPポイント基準を満たせば移行後ショートカット可 |
| **永住者の配偶者・日本人の配偶者（特例）** | 婚姻3年+日本在住1年（素行・生計要件も必要）| 婚姻・在住の年数が短縮要件; 離婚すると特例失効（G75 cross-ref）|

**HSP永住ショートカットの注意点（G34 cross-ref）:**

- **申請時点でポイント維持が必要**: 過去にHSP1（80pt）だったが，申請時に70ptに下がっていた場合，1年ショートカットは適用されない
- **在留資格がHSP1であること**: 技人国保有者がポイントを計算した結果80pt以上であっても，在留資格がHSP1でなければショートカットは適用されない（HSP1への変更申請が先）
- **70pt未満のHSP1**: 70pt未満だがHSP1を持っている場合は通常の10年要件が適用される

**特定技能1号から永住への実務的な道:**

特定技能1号は通算5年の在留上限があるため，5年の特定技能1号在留だけでは10年居住要件を満たせない。実務的な選択肢:
1. 特定技能1号5年→特定技能2号（上限なし）→他資格や継続在留で10年到達後に永住申請
2. 特定技能1号の期間+他の在留資格（技人国等）の期間を合算して10年に到達
3. HSPポイントが基準を満たすなら，HSP1に変更してからショートカット申請

## Safe Answer Behavior

- When asked about 特定技能1号 → 永住: do not say "5年で永住できる"; explain the 10-year residence requirement and that 特定技能1号 alone (max 5 years) cannot satisfy the 10-year rule without combining other status periods.
- When asked about HSP shortcut: confirm the 80pt/1yr and 70pt/3yr shortcuts; emphasize points must be maintained at application time and the status must be HSP1 (not just having the points on paper).
- When asked about the fastest route to PR: the HSP1 route (80pt = 1 year) is the fastest available officially; route to G34/G60 for details.
- When asked about 技人国 → 永住: explain 10 years total + 5 years in employment/residential status; explain the 最長在留期間 (3-year or 5-year period) requirement.
- Do not quote specific processing times for 永住 applications.

## Must Say

- 永住許可の基本要件は「継続10年以上在留・うち就労系または居住系5年以上」+現在の在留資格で「最長の在留期間（3年または5年）」を保有。直近2年の税・年金・社会保険の適正納付（令和6年改定）も必要（G60参照）。
- 高度専門職1号（HSP1）保有者は，80ポイント以上で1年，70ポイント以上で3年の在留で永住申請可能（ショートカット）。ただし，申請時点でもポイントを維持していること，HSP1の在留資格を実際に保有していることが必要（G34参照）。
- 特定技能1号は通算5年の在留上限があるため，単独では10年居住要件を満たせない。特定技能2号または他資格期間と組み合わせる必要がある。

## Must Not Say

- 「特定技能1号で5年いれば永住になれる。」（5年では10年居住要件を満たせない）
- 「3年の在留期間をもらえれば，すぐ永住申請できる。」（最長在留期間保有は必要条件の一つ; 10年居住も必要）
- 「HSPポイントが高ければ，在留資格変更前から永住ショートカットが使える。」（在留資格がHSP1であることが条件）
- 「永住申請は在留資格変更と同じ手続き。」（別の申請; 書類・審査基準が異なる）

## Deep Water Triggers

- 技人国で8年在留，過去3年は年収が下がった — 永住審査への影響は？
- 特定技能1号（5年到達）→特定技能2号に変更した場合，特定技能1号の在留期間は永住の10年に算入されるか？
- HSP1（83点）を1年保有しているが，来年ポイントが68点になりそう — 今すぐ永住申請すべきか？
- 経営管理ビザ10年だが，会社が赤字期間があった — 永住申請は影響を受けるか？
- 日本人と離婚した後（婚姻5年・日本在住3年）に永住申請したい — 配偶者特例は使えるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For all PR route planning: route to professional (行政書士/弁護士) for specific case assessment; G60 for the base requirements.
- For HSP holders: route to G34 for points maintenance; route to G60 for shortcut thresholds; confirm they must be in HSP1 status.
- For 特定技能 holders: route to G33 for the 5-year limit; route to G60 for the 10-year rule; explain 2号 as the step toward PR.
- For 技人国 holders: confirm 10-year + 5-year rule; route to G60 and professional for case evaluation.
- For divorced former spouses: route to G45 (post-divorce routing); clarify that the spouse shortcut (3yr+1yr) is not applicable post-divorce (G75 cross-ref).

## Unknown Fields

- Whether the 特定技能1号 + 特定技能2号 combined period counts toward the 10-year PR requirement (structural answer: yes, all in-Japan periods under work/residential status count; but formal confirmation of this for the 特定技能 combination is needs_domain).
- The ISA's operational standards for what constitutes "continuous residence" (継続して10年以上在留) — specifically, whether short-term overseas trips break the continuity requirement.

## Needs Domain Flags

- needs_domain (P1): Does ISA treat a period of 特定技能1号 (work status) as qualifying for the "就労資格での5年" component of the 10-year PR requirement? The structural answer is yes (特定技能1号 is a work status), but explicit ISA confirmation for this specific combination has not been accessed from official text.
- needs_domain (P1): What length and frequency of overseas travel during the 10-year qualifying period is considered to "break" the continuity of residence for PR purposes?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eijuu-route-001 | "特定技能1号で5年日本にいましたが，これで永住申請できますか？" | State: 特定技能1号の通算在留上限は5年で，単独では永住の10年居住要件を満たすことができない。永住のためには，他の在留資格（特定技能2号・技人国等）での在留期間と組み合わせて10年以上の在留実績が必要。G60参照。 |
| eijuu-route-002 | "高度専門職でポイントが85点あります。1年後に永住申請できますか？" | State: HSP1で80ポイント以上を保有している場合，1年の在留で永住申請が可能（ショートカット要件）。ただし，申請時点でも80ポイント以上を維持していること，素行・生計・公的義務（直近2年）等の他要件も満たす必要がある（G60・G34参照）。具体的な申請準備は行政書士に相談を。 |
| eijuu-route-003 | "技人国で7年日本にいます。あと何年で永住申請できますか？" | State: 永住の基本居住要件は「継続10年以上在留・うち就労系5年以上」。技人国は就労系在留資格のため，7年の在留期間はすべて算入可能。あと3年以上在留して10年を満たし，かつ最長在留期間（3年期間）を保有していること，公的義務（直近2年）等を満たせば申請資格が生じる。G60参照。 |

## Source Notes

- 永住基本要件（10年・5年・最長在留期間・公的義務）: ISA「永住許可に関するガイドライン」(令和6年改定版) — G60 cross-ref で確認済み.
- HSPショートカット（80pt→1年, 70pt→3年）: ISA永住ガイドライン + G60 cross-ref.
- ポイント申請時維持要件: G34 cross-ref（ISA Q&Aから確認済み）.
- 特定技能1号の5年上限: G33 cross-ref（ISA 特定技能制度概要ページ）.
- 配偶者特例（婚姻3年+在住1年）: G60 cross-ref; G75 cross-ref（離婚後は特例失効）.
- Cross-ref G60 (永住申請基本要件), G34 (HSPポイント維持), G33 (特定技能1号5年上限), G25 (永住vs帰化), G75 (配偶者帰化特例), G52 (不服申立なし).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 015 G83. Key sources: ISA永住ガイドライン令和6年改定版 (G60 cross-ref); G34 cross-ref (ポイント維持); G33 cross-ref (特定技能1号5年上限). Core facts: 技人国=10年基本; 特定技能1号単独では10年不可; HSP1ショートカット（80pt→1年, 70pt→3年; 申請時ポイント維持必要; HSP1資格保有が条件）. needs_domain P1: 特定技能1号の期間の永住カウント; 短期出国の継続性影響. Cross-ref G60, G34, G33, G25, G75, G52.
