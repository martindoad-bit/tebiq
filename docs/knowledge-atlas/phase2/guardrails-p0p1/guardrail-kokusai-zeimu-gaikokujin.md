---
asset_id: guardrail-kokusai-zeimu-gaikokujin
title: 日本に長期滞在する外国人の国際税務 — 居住者（1年以上の居住意思または在留）は全世界所得が課税対象；租税条約が適用される国の居住者は二重課税が軽減される；出国税（国外転出時課税）は有価証券等1億円超保有者に適用；日本の税務申告義務は在留資格と独立
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

This guardrail prevents errors about international taxation for foreign nationals staying long-term in Japan. Key errors to block:

1. **"外国人は日本の居住者でも，海外の収入には日本の税金はかからない。"** — incorrect. 日本の所得税法では，「居住者」（日本に住所を有し，または1年以上居所を有する者）は，日本国内・国外の全世界所得が日本の課税対象となる。在留資格の種別は，課税対象の判断基準ではない。
2. **"日本と租税条約を結んでいる国の人は，日本で税金を払わなくていい。"** — incorrect. 租税条約は，二重課税を回避するための条約であり，日本での課税を免除するものではない。課税権の配分（どの国で課税されるか）や税率の軽減が規定されている。具体的な適用は条約の内容と所得の種類によって異なる。
3. **"日本を出国したら，日本の税金は終わり。"** — partially incorrect. 日本を出国しても，（1）日本の源泉から得た所得（不動産賃貸収入・日本株の配当等）については，非居住者として引き続き課税される場合がある；（2）出国時点で一定額以上の有価証券等を保有している場合，「出国税（国外転出時課税）」が適用される場合がある。
4. **"在留カードがなくなった後は，日本の税務申告は必要ない。"** — partially incorrect. 在留資格が失効した後でも，日本国内に源泉のある所得（不動産賃貸・株式配当等）に対する課税関係は継続する場合がある。確定申告義務の有無は，課税対象となる所得の有無で判断される。

## Trigger

Use this card when the user says:

- "日本に長期滞在していますが，海外の収入に日本で税金がかかりますか？"
- "租税条約があれば日本で税金を払わなくていいですか？"
- "日本を帰国する際に，株や資産に税金がかかりますか？"
- "海外に口座を持っていますが，日本で申告が必要ですか？"
- "在留資格がなくなったら，日本の税金申告はもう必要ありませんか？"
- any pattern suggesting that foreign nationals in Japan are exempt from Japanese taxation of foreign-source income, or misunderstanding the scope of the exit tax.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nta-kyojusha | L4 | 国税庁「居住者・非居住者の区分」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2010.htm | 2026-05-15 | 居住者の定義（住所または1年以上の居所）; 居住者=全世界所得課税; 非居住者=国内源泉所得のみ. |
| nta-sozei-joyaku | L4 | 国税庁「租税条約」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/1292.htm | 2026-05-15 | 租税条約の目的（二重課税の防止）; 条約締結国との課税権配分; 適用手続き. |
| nta-shutsukoku-zei | L4 | 国税庁「国外転出時課税（出国税）」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1903.htm | 2026-05-15 | 出国税の要件（1億円以上の有価証券等保有）; 申告・納税の時期; 納税猶予制度. |
| nta-kaigai-yokin | L4 | 国税庁「国外財産調書・財産債務調書制度」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/hotei/7456.htm | 2026-05-15 | 国外財産調書提出義務（5,000万円超の国外財産を有する居住者）. |
| g90-crossref | guardrail | guardrail-gaikokujin-zeimukokuchi (G90) | internal | 2026-05-15 | G90: 外国人居住者の全世界所得課税; 確定申告義務; 住民税（前年所得・1月1日ルール）. |

## Official Rule Or Source Fact

**居住者・非居住者の区分と課税範囲（所得税法第7条）:**

| 区分 | 定義 | 課税対象 |
|---|---|---|
| **居住者** | 日本に住所を有する者，または現在まで引き続き1年以上居所を有する者 | **全世界所得**（国内・国外問わず）|
| **非居住者** | 居住者以外の者 | **国内源泉所得のみ** |

外国人の居住者・非居住者の判断:
- 在留資格の種別・在留カードの有無は，直接の判断基準ではない
- 日本に「住所」（生活の本拠）があるかどうか，または「1年以上」の居所があるかどうかで判断
- 一般的に，1年を超えて日本に在留する予定の外国人は「居住者」として扱われる

**租税条約の効果:**

租税条約は，日本が締結した各国との課税権配分を規定する条約。主な効果:
- 特定の所得（給与・配当・利子・使用料等）の税率軽減・免除
- 課税権の一方集中（例: 給与所得は勤務地国のみで課税）
- 二重課税の排除（外国税額控除の適用）

⚠️ **租税条約は課税を免除するものではなく，課税権を配分するもの**。具体的な適用は条約の内容・所得の種類・申請手続き（免税申請書等の提出）が必要。

**主な外国人居住者の申告義務（G90 cross-ref）:**

| 所得の種類 | 申告義務 |
|---|---|
| 日本の事業所からの給与（年末調整済み・他の収入なし）| 原則，確定申告不要 |
| 海外からの報酬・フリーランス収入 | **確定申告必要**（全世界所得として）|
| 海外口座の預金利息・配当 | **確定申告必要**（居住者として国外所得に課税）|
| 外国株式・外国債券の売却益 | **確定申告必要**（日本の確定申告で申告）|
| 日本の不動産の賃貸収入（非居住者になった後） | 不動産所在地（日本）で源泉徴収または確定申告 |

**国外財産調書の提出義務:**

居住者で，その年の12月31日時点において，5,000万円超の国外財産を有する場合，**国外財産調書**を毎年3月15日までに税務署に提出する義務がある。未提出・虚偽記載には罰則あり。

**出国税（国外転出時課税）:**

帰国・出国する際に，以下の要件を満たす場合，**出国税**（国外転出時課税）が適用される:

| 要件 | 内容 |
|---|---|
| **資産要件** | 出国時点で，有価証券（株式・投資信託等）・匿名組合員の権利・未決済信用取引・未決済デリバティブ等の時価合計が**1億円以上** |
| **居住期間要件** | 出国前10年間のうち5年以上，日本国内に住所または居所を有する居住者であること |
| **課税方法** | 出国時点で含み益がある場合，売却したものとみなして所得税が課される（未実現利益への課税）|
| **納税猶予** | 帰国予定があり，または日本人受任者への資産移転の場合，5年（最大10年）の納税猶予申請が可能 |

⚠️ **日本を出国する前**（出国届・転出届前）に税理士に相談することが不可欠。

**居住者から非居住者になった後の日本の課税関係:**

| 所得の種類 | 非居住者後の課税 |
|---|---|
| 日本の不動産の賃貸収入 | 非居住者として，源泉徴収（20.42%）または確定申告 |
| 日本株式の配当 | 非居住者として源泉徴収（20.315%; 租税条約適用の場合は軽減）|
| 日本株式の売却益 | 租税条約によって課税権が配分（多くの場合，居住地国で課税）|

## Safe Answer Behavior

- When asked about foreign-source income: confirm that Japanese 居住者 pay tax on worldwide income; explain the residency determination based on domicile/1-year rule, not visa type.
- When asked about tax treaties: explain that they prevent double taxation but don't eliminate Japan taxation; note the need for specific treaty analysis and professional advice.
- When asked about leaving Japan: flag the 出国税 if the user mentions holding securities over ¥100M; confirm that some Japan-source income remains taxable after departure.
- When asked about tax filing after losing status: explain that Japan-source income (real estate, dividends) continues to be taxable even after departure.

## Must Say

- 日本に1年以上居住する外国人（在留資格の種別問わず）は「居住者」として，日本国内外の全世界所得が日本の所得税の課税対象となる。海外の収入・海外口座の利息・配当等も，確定申告の対象。
- 租税条約は，日本との二重課税を防止するための条約であり，日本での課税を免除するものではない。具体的な適用は，条約の内容・所得の種類・申請手続きによって異なる。税理士への相談が推奨される。
- 日本を出国する際，有価証券等（株式・投資信託等）の時価が1億円以上ある場合，出国税（国外転出時課税）が適用される可能性がある。出国前に税理士に相談することが不可欠。

## Must Not Say

- 「外国人でも日本の居住者なら，海外の収入には日本の税金はかからない。」（居住者は全世界所得課税）
- 「租税条約がある国の人は，日本で税金を払わなくていい。」（条約は課税権配分・軽減であり，免除ではない）
- 「日本を出国したら，日本の税金は一切終わり。」（日本源泉所得への課税は継続; 出国税の可能性もある）

## Deep Water Triggers

- 日本と米国の二重国籍者（米国市民権保持者）の場合，日米租税条約と米国のFATCA・CBCRとの関係はどうなるか？（国際税務の専門家への相談が必須）
- 外国人が日本の不動産を売却して帰国した場合，不動産譲渡所得への課税はどうなるか？（非居住者としての申告義務; 源泉徴収の可能性）
- 外資系企業の日本法人勤務で，RSU（制限付き株式ユニット）・ストックオプションが付与された場合，日本での課税タイミングと申告義務
- 配偶者が海外在住の外国人居住者の場合，配偶者控除は適用されるか？
- 外国人居住者が海外の相続（被相続人が外国人）で財産を受け取った場合，日本の相続税の申告義務があるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For all international tax questions: route to 税理士（特に国際税務専門）immediately — TEBIQ cannot provide tax advice beyond general information.
- For persons planning to leave Japan with significant assets: flag the 出国税 risk; route to 税理士 BEFORE filing 転出届/出国.
- For persons with overseas income while in Japan: route to G90 (確定申告義務) and 税理士 for assessment.
- For persons who have already left Japan but have Japan-source income: route to 税理士 for non-resident tax filing obligations.

## Unknown Fields

- The specific ISA position on whether long-term tax non-compliance (不申告・脱税) constitutes a 素行 violation affecting renewal or PR applications.
- Whether the 5,000万円 国外財産調書 obligation applies uniformly to all resident foreign nationals regardless of their immigration status or planned departure date.

## Needs Domain Flags

- needs_domain (P1): Is there an official NTA/ISA position on whether 税務申告不履行（income tax non-filing）constitutes a 公的義務 violation affecting immigration renewal or PR applications? G90 covers general tax filing but the specific consequence for non-filing is not confirmed.
- needs_domain (P1): How does the 出国税 interact with Japan's tax treaty obligations — specifically, in cases where the home country also imposes tax on the same unrealized gain, is there a treaty provision preventing double taxation of the same "exit gain"?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kokusai-001 | "日本に5年住んでいます。海外の口座の利息は日本で確定申告が必要ですか？" | State: 日本に1年以上居住している外国人は「居住者」として，日本国内外の全世界所得が日本の所得税の課税対象。海外の口座の利息も，日本での確定申告が必要。租税条約が締結されている国の場合，二重課税の調整（外国税額控除等）が可能な場合があるが，申告自体は必要。具体的な申告方法は税理士に相談することを強く推奨する。 |
| kokusai-002 | "日本を帰国するのですが，日本の株式（時価3,000万円）を持っています。税金はかかりますか？" | State: 出国税（国外転出時課税）は，出国時点で有価証券等の時価が1億円以上である場合に適用される。3,000万円の場合は，出国税の対象とはならない可能性が高い。ただし，出国後に日本株式の配当や売却益が生じた場合，非居住者として日本での課税関係が生じることがある。出国前に税理士に確認することを推奨する。 |
| kokusai-003 | "米国と日本の租税条約があれば，日本で米国の給与には税金がかかりませんよね？" | State: 租税条約は，二重課税を防止するための条約であり，日本での課税を完全に免除するものではない。日米租税条約では，給与所得について勤務地国（通常は日本）での課税が原則とされている（日本で働いて受け取る給与は日本で課税）。ただし，短期滞在の場合等，条約上の免除規定が適用される場合もある。具体的な適用は税理士（国際税務専門）に相談することを強く推奨する。 |

## Source Notes

- 居住者・非居住者の区分: 国税庁「居住者・非居住者の区分」(No.2010) — 住所または1年以上の居所=居住者; 全世界所得課税.
- 租税条約: 国税庁「租税条約に関する情報」— 二重課税防止; 課税権配分; 具体的適用は税理士に確認.
- 出国税（国外転出時課税）: 国税庁「国外転出時課税」(No.1903) — 1億円以上の有価証券等; 出国前に税理士確認が必須; 納税猶予制度.
- 国外財産調書: 国税庁「国外財産調書制度」(No.7456) — 5,000万円超の国外財産を有する居住者; 毎年3月15日提出義務.
- 外国人の確定申告義務: G90 cross-ref（外国人居住者の全世界所得課税; 確定申告義務のケース; 住民税の1月1日ルール）.
- Cross-ref G90 (確定申告義務), G95 (外国人の不動産取得・賃貸収入の税務申告), G110 (外国人の相続と税務).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 021 G115. Key sources: 国税庁「居住者・非居住者の区分」(No.2010)（居住者=全世界所得課税; 1年以上の居所）; 国税庁「租税条約」（二重課税防止; 課税権配分）; 国税庁「国外転出時課税」(No.1903)（出国税: 1億円以上の有価証券等; 出国前税理士確認必須）; 国税庁「国外財産調書」(No.7456)（5,000万円超の国外財産; 提出義務）. Core facts: 外国人居住者=全世界所得課税（在留資格種別不問）; 租税条約=二重課税防止（免除ではない）; 出国税=1億円以上の有価証券等（出国前に税理士必須）; 日本出国後も日本源泉所得への課税継続. needs_domain P1: 税務申告不履行と在留審査の関係; 出国税と租税条約の二重課税問題. Cross-ref G90, G95, G110.
