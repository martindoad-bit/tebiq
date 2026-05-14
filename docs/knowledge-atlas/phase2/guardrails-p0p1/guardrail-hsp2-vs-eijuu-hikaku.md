---
asset_id: guardrail-hsp2-vs-eijuu-hikaku
title: 高度専門職2号と永住の比較 — HSP2は在留期間無期限だが在留資格は外国人のまま；活動範囲は広いが永住とは異なる
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 012"
---

## What This Document Is

This guardrail prevents errors about the difference between 高度専門職2号 (HSP2) and 永住 (permanent residency). Key errors to block:

1. **"高度専門職2号は実質的に永住と同じ。"** — incorrect. HSP2 = 無期限在留期間だが在留資格は存在し，活動範囲・更新義務・配偶者就労条件等に相違がある。
2. **"高度専門職2号を取れば，永住申請の10年要件が免除される。"** — incorrect. HSP2保有が永住申請に有利に働くことはあるが（高度専門職ポイント制の永住ショートカット）、HSP2取得自体が10年要件を免除するものではない。
3. **"高度専門職2号の配偶者は，就労制限なく何でも仕事できる。"** — nuanced. HSP2保有者の配偶者には特別な就労許可（資格外活動許可）が与えられる場合があるが，無制限ではない場合がある。
4. **"高度専門職2号から永住への変更は特別なルートがある。"** — partially correct nuance. HSP1/HSP2 holders with sufficient points can use the PR shortcut route (70pt+3yr or 80pt+1yr). This is the point-based PR shortcut, not a direct HSP2→PR status change.

## Trigger

Use this card when the user says:

- "高度専門職2号と永住はどう違いますか？"
- "高度専門職2号になれば，永住ビザと同じになりますか？"
- "高度専門職2号を取ると，永住の10年要件はなくなりますか？"
- "高度専門職2号の配偶者は何でも仕事できますか？"
- "高度専門職2号から永住に移行するにはどうすればいいですか？"
- any pattern conflating HSP2 with permanent residency, or treating HSP2 as equivalent to 永住.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| g38-crossref | guardrail | guardrail-hsp2-henkou-youken (G38) | internal | 2026-05-15 | G38 core facts: HSP1→HSP2 NOT automatic; 在留資格変更 required; 3yr+70pt+素行+国益; HSP2=unlimited 在留期間; nearly all employment activities permitted; ≠ 永住. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請基本要件（10年居住内就労系5年, 最長在留期間, 公的義務, 配偶者特例）; PR shortcut for HSP (80pt→1yr / 70pt→3yr). |
| g34-crossref | guardrail | guardrail-hsp-points-miscalculation (G34) | internal | 2026-05-15 | G34: 70pt+3yr or 80pt+1yr = PR shortcut; points must be maintained. |
| g62-crossref | guardrail | guardrail-hsp-point-detail-table (G62) | internal | 2026-05-15 | G62: full point table for HSP categories. |
| isa-hsp-main | L4 | 出入国在留管理庁「在留資格『高度専門職』」 | https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html | 2026-05-15 | HSP2 activity scope: nearly all employment activities permitted alongside designated activity. |

## Official Rule Or Source Fact

**HSP2 vs 永住 — 主要な比較:**

| 比較項目 | 高度専門職2号（HSP2） | 永住者 |
|---|---|---|
| **在留期間** | **無期限**（更新不要）| **無期限**（永住資格自体）|
| **在留資格** | 在留資格「高度専門職2号」が存在する | 在留資格「永住者」が存在する |
| **国籍** | 外国籍のまま | 外国籍のまま |
| **在留カード** | 必要（G61 cross-ref） | 必要（G61 cross-ref）|
| **活動制限** | 高度専門職活動が主。ただし「ほぼすべての就労活動」が認められる | **なし**（就労含む一切の活動が自由）|
| **配偶者の就労** | 特別就労許可がある（一定の範囲内）| 配偶者が家族滞在の場合は資格外活動許可が必要（G48 cross-ref）|
| **パスポート** | 外国パスポートを使用 | 外国パスポートを使用 |
| **更新手続き** | 不要（在留期間は無期限）| 在留カードの更新は別途必要（G53/G61）|
| **ステータス安定性** | 活動を継続しなければ取消のリスク（活動要件あり）| 原則として在留資格取消のリスクは低い |
| **申請窓口** | ISA | ISA |

**HSP2の活動範囲（G38 cross-ref）:**

高度専門職2号では，指定された高度専門職活動を行うことに加えて，「日本の公私の機関との契約に基づく高度専門職活動に付随する活動」として幅広い就労活動が認められる。ただし「ほぼすべての就労活動」であって，文字通り「すべて」ではない点に注意。

**HSP2の取消リスク（永住との重要な相違）:**

HSP2は「高度専門職活動」を行うことが在留の前提。活動を続けない場合（退職して無職状態が続く等）、在留資格取消の対象となるリスクがある。永住者にはこの活動継続要件がない（ただし G26 の取消事由全般は永住者にも適用される）。

**永住申請における HSP ポイント制ショートカット（G34/G60 cross-ref）:**

HSP1/HSP2 保有者が永住を申請する場合:
- **80点以上**: 高度専門職として1年以上在留 → 永住申請可
- **70点以上**: 高度専門職として3年以上在留 → 永住申請可
- 通常の 10年居住要件は免除される（G60 cross-ref: 高度専門職ショートカット）

ただし:
- 公的義務の適正履行要件（直近2年: G60 cross-ref）は適用される
- 点数は**申請時点**で維持されていなければならない（G34 cross-ref）
- HSP2になったからといって自動的に永住申請できるわけではない（ポイント+年数の条件が必要）

**HSP2から永住への移行パス:**

```
HSP1 (70pt達成) 
→ [HSP2変更 (3yr+70pt+素行+国益)] (G38)
→ [永住申請 (70pt+3yr or 80pt+1yr)] (G60/G34)
```

HSP2を保有していること自体は永住の前提条件ではない。HSP1のままでも永住ショートカットは利用可能（高度専門職として70pt+3yr）。

**配偶者の就労:**

HSP2保有者の配偶者（家族滞在等）の就労については、一定の特別就労許可（特定活動の指定書に記載）が与えられる場合があるが、無制限就労ではない。永住者の配偶者も同様に、配偶者本人が家族滞在で在留している場合は資格外活動許可が必要（G48 cross-ref）。

## Safe Answer Behavior

- When asked if HSP2 = 永住: clearly state they are different; both have 無期限在留期間 but HSP2 has activity restrictions that 永住 does not.
- When asked about the PR shortcut from HSP: confirm the 70pt+3yr / 80pt+1yr route; clarify this is available from HSP1 as well (not HSP2-exclusive).
- When asked about HSP2 stability vs. 永住: highlight the activity-continuation risk for HSP2 that doesn't exist for 永住.
- When asked about the spouse's employment: flag that HSP2 spouse's employment is not fully unrestricted; route to professional for specific situation.
- Do not say "HSP2は永住と同じ."

## Must Say

- 高度専門職2号（HSP2）は在留期間が無期限であるが，「在留資格」は「永住者」とは別の資格（「高度専門職2号」）であり，就労活動の前提条件・活動要件等に違いがある。
- HSP2保有者が高度専門職活動を継続しない場合，在留資格取消のリスクがある。永住者には高度専門職活動の継続義務はない（この点が最大の実務上の相違）。
- 高度専門職ポイント制の永住ショートカット（70点+3年または80点+1年）は，HSP1のまま申請しても，HSP2に変更してから申請してもどちらでも利用できる（HSP2取得が永住の前提条件ではない）。
- 配偶者の就労については，HSP2保有者の配偶者も一定の手続きが必要であり，無制限に就労できるわけではない（G48参照）。

## Must Not Say

- 「高度専門職2号は実質的に永住と同じ。」（活動継続要件・取消リスクが異なる）
- 「高度専門職2号になれば永住申請の10年要件がなくなる。」（ポイント+年数要件は別途必要）
- 「高度専門職2号の配偶者は何でも仕事できる。」（制限あり）
- 「高度専門職2号から永住への直接変更ルートがある。」（ポイントショートカットを通じた永住申請であり、直接変更ではない）

## Deep Water Triggers

- Person holds HSP2 and has 85 points — can they apply for PR immediately (without waiting 1 year)?
- Person is considering HSP2 vs. direct PR application — which is better strategically?
- Person's HSP2 employer closed — if they become unemployed, does HSP2 face cancellation risk?
- Person holds HSP1 with 70 points and has been in Japan 4 years — are they eligible for PR shortcut without upgrading to HSP2 first?
- Person's spouse holds HSP2 — can the spouse's dependent change from 家族滞在 to work in Japan without restrictions?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons considering HSP2 vs. PR: explain the trade-offs (HSP2 = faster to obtain if 3yr+70pt; PR = more stable, no activity requirement); route to professional for strategic advice.
- For HSP2 holders approaching 1yr (80pt) or 3yr (70pt) milestones: flag PR shortcut eligibility; route to professional for PR application preparation.
- For HSP2 holders who lost employment: flag the activity-continuation risk; route to professional immediately for status assessment.
- For HSP1 holders on the PR shortcut path: confirm they do NOT need HSP2 as an intermediate step; they can apply directly for PR once conditions are met.

## Unknown Fields

- Whether the "ほぼすべての就労活動" under HSP2 has any specific categorical exclusions beyond the general framework.
- The exact ISA practice for HSP2 holders who are between jobs (seeking employment) — how long is tolerated before cancellation risk becomes real?
- The specific scope of the spouse's special employment permission under HSP2 (what exactly is included/excluded).

## Needs Domain Flags

- needs_domain (P1): for HSP2 holders who become unemployed — what is the realistic ISA tolerance period before status cancellation becomes a risk? What actions should be taken proactively?
- needs_domain (P1): the specific scope of the HSP2 spouse's special employment permission — which activities are explicitly covered and which require separate authorization?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hsp2-eijuu-001 | "高度専門職2号と永住はどう違いますか？" | State: 両方とも在留期間無期限だが、HSP2は「高度専門職活動」の継続が前提で取消リスクあり。永住者はその活動継続義務がない。HSP2は「ほぼすべての就労活動」が可だが、永住は活動制限なし。 |
| hsp2-eijuu-002 | "高度専門職2号を取れば，永住申請の10年要件はなくなりますか？" | State: HSP2取得が10年要件を自動免除するわけではない。永住ショートカットは高度専門職として70点+3年または80点+1年の条件を満たした場合に利用できる（HSP1でも利用可能）。 |
| hsp2-eijuu-003 | "高度専門職1号で70点あり，日本に3年います。高度専門職2号に変更しないと永住申請できませんか？" | State: NO — HSP2に変更しなくてもよい。高度専門職として70点+3年以上の条件を満たしていれば、HSP1のまま永住ショートカット申請が可能（G34・G60参照）。専門家に相談を。 |

## Source Notes

- HSP2 基本情報（無期限在留期間・活動範囲・変更要件）from G38 cross-ref (ISA HSP status page + Q&A).
- 永住基本要件・PR shortcut from G60 cross-ref (ISA 永住許可申請 page + ガイドライン).
- HSP2 activity-continuation risk vs. PR stability: structural from 在留資格取消（G26 cross-ref）applicable to HSP2 non-performance.
- PR shortcut (70pt+3yr / 80pt+1yr): confirmed from G34 cross-ref (ISA HSP Q&A official text).
- 配偶者就労: G48 cross-ref (家族滞在就労制限); HSP2 spouse special permit details needs_domain.
- Cross-ref G38 (HSP2変更要件), G60 (永住基本要件), G34 (PR shortcut条件), G62 (ポイント詳細表), G48 (家族滞在就労制限).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 012 G69. Key sources: G38 (HSP2基本), G60 (永住基本), G34 (PR shortcut). Core facts: 両方とも無期限在留期間だが活動継続要件・取消リスクが異なる; HSP2→永住はポイントショートカット経由（HSP1でも同様に申請可）; HSP2取得が永住前提条件ではない. Cross-ref G38, G60, G34, G62, G48, G26.
