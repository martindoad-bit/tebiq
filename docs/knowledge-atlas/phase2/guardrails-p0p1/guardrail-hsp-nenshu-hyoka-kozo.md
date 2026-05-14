---
asset_id: guardrail-hsp-nenshu-hyoka-kozo
title: 高度専門職ポイントの年収評価 — 通勤・住宅手当・残業代・株式運用益は除外；基本給・賞与・勤勉手当は含む；海外給与の扱いは申請時の在日活動収入
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 014"
---

## What This Document Is

This guardrail prevents errors about how annual income is calculated for 高度専門職 (HSP) points evaluation. Key errors to block:

1. **"年収には全て含まれる — 通勤手当・住宅手当・残業代も加算できる。"** — incorrect. ISA のガイドラインでは，通勤手当・住宅手当・残業代・超過勤務手当は年収（ポイント計算上の「年収」）に含まれない。
2. **"海外の給与も日本での就労年収に含められる。"** — partially incorrect. 高度専門職のポイント計算における「年収」は，**日本での活動（申請する在留資格で行う活動）に係る報酬**が基本。海外給与が日本での活動に対応するものであれば含まれる場合があるが，日本に在留しての活動に対応しない報酬は含まれない。
3. **"ストックオプション・RSU（株式報酬）の価値は年収に入る。"** — generally incorrect for points purposes. 株式報酬（RSU・ストックオプションの行使益等）は「株式運用利益」に準じる性格として，ポイント計算の「年収」に含まれないのが一般的な理解。
4. **"配偶者（家族）への生活費は別途申告できる。"** — incorrect. ポイント計算の「年収」は申請人本人への報酬のみ。家族への生活費・扶養手当は含まれない（扶養手当が給与の一部として支給される場合は別途確認が必要）。

## Trigger

Use this card when the user says:

- "高度専門職のポイント計算で，年収はどのように計算しますか？"
- "通勤手当は年収に入りますか？"
- "海外の会社から給料をもらっていますが，日本の高度専門職申請で使えますか？"
- "ストックオプションの利益は年収に入りますか？"
- "住宅手当を含めた年収で計算できますか？"
- any pattern including excluded income components in HSP income calculation, or misunderstanding what counts toward the income threshold.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-hsp-qa | L4 | 出入国在留管理庁「高度人材ポイント制Ｑ＆Ａ」 | https://www.moj.go.jp/isa/applications/resources/newimmiact_3_qa.html | 2026-05-15 | 年収に含まれるもの（基本給・賞与・勤勉手当）と含まれないもの（通勤手当・住宅手当・残業代・株式運用利益）が明示されている. |
| g34-crossref | guardrail | guardrail-hsp-points-miscalculation (G34) | internal | 2026-05-15 | G34: 年収ブラケット（ISA Q&Aから確認）; 通勤・住宅・残業除外; 賞与含む; ポイントは申請時点で維持が必要. |
| g62-crossref | guardrail | guardrail-hsp-point-detail-table (G62) | internal | 2026-05-15 | G62: 全ポイント表; 年収ブラケットと対応点数（年齢依存; 最高40点/ハカテゴリーは最高50点）. |

## Official Rule Or Source Fact

**高度専門職ポイント計算における「年収」の定義（ISA Q&A — G34 cross-ref）:**

ISA「高度人材ポイント制Ｑ＆Ａ」では，年収（報酬）の定義について以下のように規定:

**含まれる報酬（年収計算に算入）:**
- 基本給（本給）
- 賞与（ボーナス）
- 勤勉手当（勤務に対応する手当）
- 日本での就労活動に対応する報酬

**含まれない報酬（年収計算から除外）:**
- 通勤手当（交通費）
- 住宅手当（住宅補助）
- 残業代（時間外手当・超過勤務手当）
- 株式運用利益（株式売却益・配当収入等）
- ストックオプションの行使益（一般的な理解）

**年収ブラケットとポイント（G62 cross-ref — 主要例）:**

年収ポイントは高度専門職1号のカテゴリー（イ=研究, ロ=専門技術・人文, ハ=経営管理）と年齢によって異なる:

| 年収 | イ・ロカテゴリー | ハカテゴリー |
|---|---|---|
| 1,000万円以上 | 40点 | 50点 |
| 900万円台 | 35点 | 40点 |
| 800万円台 | 30点 | 40点 |
| 700万円台 | 25点 | 30点 |
| 600万円台 | 20点 | 25点 |
| 500万円台 | 15点 | 20点 |
| 400万円台 | 10点 | 15点 |
| 300万円台 | 5点 | 10点 |

（注: 年齢による下限制限あり; 詳細は G62 cross-ref参照; 上記は概算値）

**海外給与・グループ会社給与の扱い:**

日本国内の機関との契約に基づいて行う活動（高度専門職活動）に対応する報酬であれば，支払元が海外のグループ会社であっても原則として年収に含まれる。ただし:
- 日本での高度専門職活動に対応しない部分（海外オフィスの仕事に対する報酬等）は原則除外
- 複数の機関から受ける報酬の合算: 高度専門職活動に係る部分のみ合算可
- 海外駐在中の報酬: 日本での高度専門職活動に基づかない場合は対象外

**株式報酬（RSU・ストックオプション）の取り扱い:**

RSU（制限付株式ユニット）やストックオプションの行使益は，「株式運用利益」に類する性格として，ISAの「年収」計算からは除外されるとの一般的理解がある。ただし:
- RSUのベスト（権利確定）時点の価値を「給与所得」として処理する税務上の扱いと，ポイント計算上の「年収」は別の問題
- 役員報酬として株式報酬が支給される場合等，状況によって異なる
- この点については needs_domain — 専門家に相談が必要

**ポイントの申請時維持要件（G34 cross-ref）:**

高度専門職ポイントは，**申請時点で**要件を満たしていなければならない。更新申請時も同様に，更新時点での年収・学歴・職歴等のポイントが確認される。過去に70点以上だった時期があっても，更新時に70点未満であれば高度専門職ステータスの維持が難しくなる。

## Safe Answer Behavior

- When asked what counts as income: immediately state the inclusion/exclusion list (基本給・賞与=in; 通勤・住宅・残業代=out).
- When asked about overseas salary: explain that it must be compensation for Japan-based HSP activity; salary for overseas work is excluded.
- When asked about stock options/RSU: do not confirm that they are included; the general position is exclusion; route to professional for the specific situation.
- When asked about calculating income: route to professional or ISA Q&A page; do not do the calculation yourself without full details.
- Do not confirm a specific income bracket without seeing the breakdown (the person must exclude non-qualifying components first).

## Must Say

- 高度専門職ポイント計算の「年収」に含まれるのは，基本給・賞与・勤勉手当等の就労対応の報酬。通勤手当・住宅手当・残業代・株式運用利益は含まれない（ISA Q&A明示）。
- 海外のグループ会社から支給される給与でも，日本での高度専門職活動に対応する報酬であれば原則として年収に含まれる。日本での活動に対応しない海外給与は除外。
- ポイントは更新申請時点でも維持していることが必要（G34参照）。過去に要件を満たしていても，更新時点で70点未満であればポイント更新に影響する可能性がある。

## Must Not Say

- 「通勤手当・住宅手当は年収に含まれる。」（ISA Q&Aで明確に除外）
- 「残業代も合わせた年収でポイント計算できる。」（残業代は除外）
- 「ストックオプションの利益は年収に含まれる。」（株式運用利益は一般的に除外）
- 「海外給与はすべて日本のポイント計算に使える。」（日本での活動対応分のみ含まれる）

## Deep Water Triggers

- 外資系企業の日本法人に勤務し，基本給は日本法人から，変動報酬は米国本社から支給されている — 年収計算はどうなるか？
- 年収1,000万円だが，うち200万円が残業代・住宅手当 — 実際の算入年収は？
- RSU（Restricted Stock Unit）が年間500万円相当ある — これは年収に入るか？
- 日本での活動と海外での活動を兼務しており，給与が「日本担当分40%・海外担当分60%」で計算されている — どの部分がポイント計算に入るか？
- 昨年の年収は750万円だったが，今年から降格で600万円になった — 高度専門職ポイントが変わるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For all income calculation questions: route to professional (行政書士 or 社会保険労務士) for exact income breakdown; ISA Q&A page is the authoritative reference.
- For overseas salary questions: route to professional; the "日本での活動対応分" determination requires professional review of the employment contract and compensation structure.
- For RSU/stock option holders: route to professional with tax expertise as well as immigration expertise; the tax treatment and the HSP income definition interact.
- For ポイント maintenance questions: route to G34 for the renewal timing and points maintenance requirement.

## Unknown Fields

- The specific ISA operational position on RSU (Restricted Stock Unit) income when the RSU is treated as employment compensation (salary) rather than investment income for tax purposes.
- Whether "partial year" income (joining mid-year or departure mid-year) should be annualized for HSP income calculation, or whether actual earned income in the relevant period is used.
- The ISA's specific treatment of performance-linked variable compensation (beyond standard 賞与) in multi-component executive packages.

## Needs Domain Flags

- needs_domain (P1): For RSU income treated as 給与所得 on the Japanese tax return — does ISA include this in the HSP year income calculation or treat it as excluded "株式運用利益"? There appears to be a gap between tax treatment and immigration treatment.
- needs_domain (P1): For executives with complex compensation (base + bonus + long-term incentive + equity) — what is the confirmed ISA operational standard for which components are included in HSP year income?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hsp-nenshu-001 | "高度専門職のポイント計算で，年収に住宅手当と通勤手当を含めて計算してもいいですか？" | State: NO — 住宅手当・通勤手当はポイント計算の「年収」に含まれない（ISA Q&A明示）。年収として算入できるのは基本給・賞与・勤勉手当等の就労対応の報酬のみ。 |
| hsp-nenshu-002 | "アメリカ本社から日本での業務に対して給与をもらっています。高度専門職のポイント計算に使えますか？" | State: 日本での高度専門職活動に対応する報酬であれば，支払元が海外のグループ会社でも年収に含まれる可能性がある。日本での活動に対応していない海外給与部分は除外。具体的な判断は専門家（行政書士）に相談を。 |
| hsp-nenshu-003 | "RSU（株式報酬）が年間300万円あります。高度専門職の年収計算に含められますか？" | State: RSUの行使益は「株式運用利益」に類する性格として，ポイント計算の年収から除外されるのが一般的な理解。ただし税務上の扱い（給与所得か）との関係で専門家見解が分かれる可能性がある。行政書士・税理士に相談を。 |

## Source Notes

- 年収の算入・除外項目: ISA「高度人材ポイント制Ｑ＆Ａ」（newimmiact_3_qa.html）— G34 cross-refで確認済み。含まれる: 基本給・賞与・勤勉手当; 含まれない: 通勤手当・住宅手当・残業代・株式運用利益.
- 年収ブラケットと点数: G62 cross-ref（ISA 官式PDF 930001657.pdf から点数表確認）.
- 海外給与の扱い: ISA Q&Aの「日本での活動に係る報酬」という記述から構造的に導かれる.
- ポイント維持要件: G34 cross-ref（更新時点でのポイント維持が必要）.
- Cross-ref G34 (年収・ポイントの誤計算パターン), G62 (全ポイント表).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 014 G78. Key sources: ISA Q&A newimmiact_3_qa.html (G34 cross-ref確認済み); G62 cross-ref (年収ブラケット・点数). Core facts: 通勤・住宅・残業代・株式運用益は除外; 基本給・賞与は含む; 海外給与は日本活動対応分のみ含む; RSUは一般的に除外（needs_domain); ポイントは更新時も維持必要. Cross-ref G34, G62.
