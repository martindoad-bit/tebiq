---
asset_id: guardrail-kaisha-setsuritsu-keieikanri
title: 外国人起業家の会社設立と在留資格「経営・管理」 — 会社設立と経営管理ビザ取得は別の手続き；会社設立後に在留資格変更または在留資格認定証明書の申請が必要；事業の実態要件（事務所・従業員・資本金）が審査される
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: quarantined
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 019"
---

## Quarantine Notice — 2026-05-15

This card contains a production-safe boundary (`company formation does not automatically grant 経営・管理 status`) but also contains P0 unsafe business-manager 2025 reform criteria text.

Do not use this card wholesale for positive-answer fact injection. In particular, do not reuse the local statements that frame post-2025-10-16 criteria as "3,000万円 or two full-time employees" or that state 500万円 has no textual source.

For 0.8 runtime, only use:

- company formation and immigration status are separate procedures;
- starting management activity before proper status handling is high-risk;
- business-manager 2025 reform questions must route through `business-manager-2025-reform-hard-fact-boundary`.

See:

- `docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md`
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json`

## What This Document Is

This guardrail prevents errors about the process for foreign nationals who wish to start a business in Japan and obtain the 経営・管理 (business management) residence status. Key errors to block:

1. **"会社を設立すれば，自動的に経営管理ビザが取得できる。"** — incorrect. 会社の設立（法務局での登記）と在留資格「経営・管理」の取得は，別々の手続き。会社設立後，ISAへの在留資格変更許可申請（在日者）またはCoE申請（海外在住者）が必要で，審査には事業の実態要件を満たすことが求められる。
2. **"資本金500万円があれば経営管理ビザを取れる。"** — incorrect（G57 cross-ref）. 「経営・管理」の上陸基準省令の財産要件は，資本金または出資総額3,000万円以上（または日本在住の常勤職員2名以上）。500万円という数字は，上陸基準省令の条文テキストには存在しない（needs_domain P0 G57 参照）。
3. **"会社設立前でも，経営管理ビザを申請できる。"** — partially correct（ただし条件あり）. 事業計画・事業開始の蓋然性が示せる場合，会社設立前であっても申請が認められるケースがあるが，一般的には会社設立・事業の実態を確認した後の申請が審査上有利。
4. **"技人国のまま会社を設立して経営してよい。"** — incorrect（G47 cross-ref）. 「技人国」のまま自社の経営管理活動（重要事項の意思決定・事業の執行・監督）を行うことは，在留資格外活動（不法就労相当）になる可能性がある。経営管理活動を行う前に「経営・管理」への変更が必要。

## Trigger

Use this card when the user says:

- "日本で会社を作って経営管理ビザを取りたい。"
- "起業するためにはどのビザが必要ですか？"
- "技人国のまま起業できますか？"
- "会社を設立したら，すぐに経営管理ビザに変更できますか？"
- "外国からの起業でも経営管理ビザを取れますか？"
- any pattern treating company formation as sufficient for 経営管理 status, or conflating company registration with visa acquisition.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-keiei-kanri | L4 | 出入国在留管理庁「在留資格『経営・管理』」 | https://www.moj.go.jp/isa/applications/status/businessmanager.html | 2026-05-15 | 活動定義; 上陸基準省令の要件（事務所・資本金・人員・報酬）; 在日申請vs海外申請. |
| g47-crossref | guardrail | guardrail-gijinkoku-dokuritsu-keieikanri (G47) | internal | 2026-05-15 | G47: 技人国保有者が実質的な経営管理活動を行う=在留資格外活動のリスク; 在留資格変更が事前に必要. |
| g57-crossref | guardrail | guardrail-keieikanri-joken-shorei (G57) | internal | 2026-05-15 | G57 (P0): 上陸基準省令の財産要件=3,000万円以上（または常勤職員2名以上）; 500万円という要件は条文テキストに存在しない（needs_domain P0）. |

## Official Rule Or Source Fact

**在留資格「経営・管理」の活動定義:**

> 本邦において貿易その他の事業の経営を行い又は当該事業の管理に従事する活動

主な活動:
- 法人の代表取締役・取締役として経営活動に従事
- 会社・事業の重要事項の意思決定・執行・監督
- 日本国内の事業体の経営管理（日系企業の現地法人管理等を含む）

**外国人が日本で起業して経営管理ビザを取得する際のステップ:**

会社設立→在留資格取得のプロセス:

| ステップ | 内容 |
|---|---|
| 1. 事業計画の準備 | ビジネスプラン，資金計画，事業内容の明確化 |
| 2. 会社設立（法務局への登記）| 株式会社・合同会社等の設立; 資本金の払込 |
| 3. 事務所の確保 | 実際に事業を行える事務所（バーチャルオフィス等の形式的な住所では不可）|
| 4. 在留資格の申請 | 在日者: ISAへの在留資格変更許可申請; 海外在住者: CoE申請（スポンサー=設立した日本法人）|
| 5. ISAによる審査 | 事業の実態・継続性・上陸基準省令の要件を審査 |

**上陸基準省令「経営・管理」の主要件（G57 cross-ref; P0注意）:**

| 要件 | 内容 |
|---|---|
| **財産プロング** | 資本金または出資総額 **3,000万円以上**（または常勤職員2名以上のいずれか）|
| **人員プロング** | 日本在住・就労可能な常勤職員2名以上（役員を除く）|
| **事務所プロング** | 本邦に継続して事業を行う固定した施設（事業活動の実態が確認できる事務所）|
| **報酬プロング** | 日本人が同種業務に従事する場合の通常の報酬以上 |

⚠️ **P0注意**: 「500万円」という資本金要件は上陸基準省令の条文テキストに存在しない（G57 cross-ref）。ISAは500万円で経営管理を認めるという公式の根拠は現時点で未確認。この数字を使って申請準備をすることは危険（DOMAIN P0: dom-keiei-p0-001）。

**会社設立前の申請の可否:**

一般的には:
- 会社設立・事業実態の確立後の申請が審査で有利
- 一部のケース（事業計画が具体的で実現蓋然性が高い場合）では，設立前の申請が受理されることもある
- いずれの場合も，事務所の確保・資本金の払込・事業の具体的な実態が審査で確認される

**「技人国」からの変更（G47 cross-ref）:**

技人国保有者が自社を設立して経営活動（意思決定・執行・監督）を行う場合:
- 経営管理活動を開始する「前」に在留資格変更許可申請が必要（G47参照）
- 変更許可前の経営管理活動は，在留資格外活動として不法就労相当のリスク
- 技人国の通常の就労（技術的業務への従事）と経営管理活動の境界は needs_domain P1 (G47参照)

**海外からの起業（CoEルート）:**

海外在住の外国人が日本で起業・「経営・管理」を取得する場合:
1. 日本に設立した法人（スポンサー）がCoEを申請（ISAへ）
2. CoE取得後，在外公館でビザ申請（G43 cross-ref）
3. 入国後に経営管理活動を開始

## Safe Answer Behavior

- When asked about starting a business for 経営管理 visa: explain the two-step process (company formation + visa application); emphasize they are separate procedures.
- When asked about capital requirements: route to G57; explicitly flag the P0 risk of the 500万円 myth; state the legal requirement is 3,000万円 OR 2+ full-time employees.
- When asked about 技人国 + starting a business: route to G47; immediately clarify that changing to 経営管理 before management activities is required.
- When asked about overseas applicants: explain the CoE route (G43); note that the Japanese legal entity sponsors the CoE application.

## Must Say

- 会社設立（法務局への登記）と在留資格「経営・管理」の取得は別の手続き。会社設立後，ISAへの在留資格変更許可申請（またはCoE申請）が必要で，事業の実態要件（事務所・資本金3,000万円以上または常勤職員2名以上・報酬等）の審査がある。
- 上陸基準省令の財産要件は資本金または出資総額3,000万円以上（または常勤職員2名以上）。「500万円で経営管理が取れる」という情報は条文テキストに根拠がなく，そのままの金額で申請することは危険（G57参照）。
- 「技人国」保有者が自社の経営管理活動を行う前に，在留資格「経営・管理」への変更許可が必要（G47参照）。変更前の経営管理活動は在留資格外活動のリスクがある。

## Must Not Say

- 「会社を設立すれば自動的に経営管理ビザになる。」（ISAへの申請・審査が別途必要）
- 「資本金500万円があれば経営管理ビザが取れる。」（条文テキストに根拠なし; G57 P0参照）
- 「技人国のまま起業して経営してよい。」（経営管理活動の前に在留資格変更が必要; G47参照）

## Deep Water Triggers

- 経営管理ビザ申請中（審査中）に経営活動を開始してよいか？（申請が許可される前の経営活動=在留資格外活動のリスク）
- 外国人が日本法人の取締役に就任するだけ（代表権なし; 経営管理活動に実質関与なし）— 経営管理ビザが必要か？（G57 cross-ref）
- 経営管理ビザで事業が失敗した場合，在留資格はどうなるか？（事業の継続性が審査されるため，失業状態が続くと更新が困難になる可能性）
- 経営管理ビザを持ちながら，別の会社で技人国相当の業務委託も行う — 可能か？（副業の在留資格上の扱い; G55 cross-ref）
- 日本に住んでいない外国人が，日本法人の代表取締役に就任した — 経営管理ビザが必要か？（在留を伴わない場合は不要; ただし実際の経営活動のために来日する場合は要）

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons planning to start a business in Japan: route to professional (行政書士/弁護士) immediately; 経営管理 applications are complex and require detailed business plan + document preparation.
- For persons asking about 500万円 capital requirement: route to G57; flag the P0 risk; recommend professional consultation before any application.
- For 技人国 holders who have already started business activities: route to G47; recommend lawyer consultation immediately for status remediation.
- For overseas applicants: explain the CoE route; note that company formation and office setup in Japan are required before the CoE application can be filed.

## Unknown Fields

- The practical operational standard ISA uses for evaluating the "2 full-time employees" alternative to the 3,000万円 capital requirement — specifically, whether committed future employees (not yet hired) can satisfy this requirement at the time of application.
- Whether ISA has an alternative or reduced capital pathway in any specific sector or regional economic zone (特区).
- The ISA's treatment of co-working spaces or shared office addresses as the required "固定した施設" (fixed business facility).

## Needs Domain Flags

- needs_domain (P0 — cross-ref dom-keiei-p0-001): What is the source of the widely-circulated "500万円" capital requirement for 経営管理 visa? Is there any official ISA position accepting 500万円 in any circumstances despite the 上陸基準省令 stating 3,000万円?
- needs_domain (P1): What is ISA's operational standard for a committed office space (賃貸契約締結済みだが未入居) at the time of 経営管理 application — is the signed lease sufficient, or must the space be actually occupied?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| keiei-001 | "日本で会社を設立しました。経営管理ビザに変更するにはどうすればいいですか？" | State: 会社設立（法務局への登記）と在留資格「経営・管理」の取得は別の手続き。会社設立後，ISAへの在留資格変更許可申請（在日者の場合）が必要。審査では事業の実態（事務所の確保・資本金・従業員等）が確認される。申請書類の準備は行政書士に相談することを強く推奨する。 |
| keiei-002 | "起業するために資本金500万円を準備しました。経営管理ビザを取れますか？" | State: 在留資格「経営・管理」の上陸基準省令の財産要件は，資本金または出資総額3,000万円以上（または日本在住の常勤職員2名以上）。「500万円で取れる」という情報は，現在確認できている条文テキストには根拠がない。申請前に必ず行政書士・弁護士に確認すること（重要なリスクがある）。 |
| keiei-003 | "技人国で日本に住んでいますが，自分の会社を設立して経営管理をしたい。いつから経営活動を始められますか？" | State: 技人国保有者が自社の経営管理活動（意思決定・執行等）を行う場合，在留資格「経営・管理」への変更許可を受けた後から活動を開始する必要がある。変更許可の前に経営管理活動を行うことは在留資格外活動のリスクがある。至急行政書士に相談して変更申請の準備を行うこと。 |

## Source Notes

- 在留資格「経営・管理」活動定義・要件: ISA「在留資格『経営・管理』」(businessmanager.html) + G57 cross-ref（上陸基準省令の財産・人員・事務所・報酬要件）.
- 技人国からの変更: G47 cross-ref（技人国保有者の経営管理活動への変更義務）.
- 500万円の問題: G57 cross-ref (P0: dom-keiei-p0-001); 条文テキストに存在しない要件.
- CoEルート（海外から起業）: G43 cross-ref（CoE申請手続き・有効期間）; G68 cross-ref（在日vs海外申請ルート）.
- Cross-ref G47 (技人国→経営管理の変更義務), G57 (経営管理の上陸基準省令要件; P0注意), G43 (CoE申請), G68 (申請ルートの比較), G55 (副業・兼業).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 019 G103. Key sources: ISA businessmanager.html（活動定義・要件）; G47/G57 cross-refs（技人国→変更義務; P0: 500万円の問題）. Core facts: 会社設立≠経営管理ビザ自動取得; 上陸基準省令財産要件=3,000万円以上（または常勤職員2名以上）; 500万円要件は条文テキストに根拠なし（P0); 技人国から経営管理への変更は経営活動前に必要; CoEルート（海外起業）は法人がスポンサー申請. needs_domain P0 (cross-ref dom-keiei-p0-001): 500万円の出所; needs_domain P1: 2名常勤職員要件の具体的な充足方法. Cross-ref G47, G57, G43, G68, G55.
