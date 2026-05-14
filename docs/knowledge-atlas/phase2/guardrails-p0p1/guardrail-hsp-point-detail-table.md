---
asset_id: guardrail-hsp-point-detail-table
title: 高度専門職ポイント各カテゴリ点数詳細 — イ・ロ・ハ別計算；学歴・職歴・年収・年齢・ボーナス点数表
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 011"
---

## What This Document Is

This guardrail prevents errors about the specific point values in the 高度専門職（高度人材ポイント制）scoring system. Key errors to block:

1. **"高度専門職のポイントはイ・ロ・ハ共通の計算式で決まる。"** — incorrect. 各カテゴリ（高度学術研究=イ, 高度専門・技術=ロ, 高度経営・管理=ハ）でスコアリングが異なる。特に年収ブラケットと学歴要件が大きく異なる。
2. **"年収1,000万円なら必ず特定のポイントになる。"** — incorrect nuance. 年収ポイントは年齢によってブラケットが変わる（年収400万円台のポイントは29歳以下のみ加算）。
3. **"日本語能力試験（JLPT）のポイントは取りやすいボーナスポイント。"** — partially correct. JLPT N1 = 15点（ただし日本の大学卒業でのポイントとは重複不可の規定あり）; N2 = 10点（N1/大学卒ボーナス取得者は対象外）.
4. **"イノベーション機関のボーナスは一律10点。"** — incorrect. 中小企業のイノベーション機関では合計20点（10点 + 中小企業加算10点）。

## Trigger

Use this card when the user says:

- "高度専門職のポイントはどうやって計算しますか？"
- "JLPT N1を持っていると高度専門職のポイントは何点ですか？"
- "学歴（修士号・博士号）はポイントに何点ありますか？"
- "年収●●万円の場合，高度専門職のポイントは何点ですか？"
- "イノベーション機関の加算ポイントは何点ですか？"
- any pattern asking about specific point values in the HSP system, or using incorrect point figures.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-hsp-point-table | L4 | 出入国在留管理庁「ポイント計算表（参考書式）」 | https://www.moj.go.jp/isa/content/930001657.pdf | 2026-05-15 | 官式ポイント計算表PDF（参考書式）: 各カテゴリの点数値を直接確認. |
| isa-hsp-shorei | L2 | 法務省令第37号（高度専門職省令：平成26年）| https://www.moj.go.jp/isa/content/930001658.pdf | 2026-05-15 | 高度専門職評価の法的根拠および点数一覧（省令全文PDF）. |
| g34-crossref | guardrail | guardrail-hsp-points-miscalculation (G34) | internal | 2026-05-15 | G34: 年収の算入範囲（残業代・住宅手当除外; 賞与含む）; 70点/80点の閾値と PR ショートカット。この card は各カテゴリの具体的点数を補完する。 |
| g38-crossref | guardrail | guardrail-hsp2-henkou-youken (G38) | internal | 2026-05-15 | G38: HSP1→HSP2の変更要件（3年+70点+素行+国益）。この card はポイント達成のための点数詳細を提供。 |

## Official Rule Or Source Fact

**合格点（Pass Mark）: 70点以上**

（G34 cross-ref: 70点以上 = 高度専門職1号; 70点+3年 or 80点+1年 = 永住ショートカット）

---

### カテゴリ定義

| 記号 | カテゴリ名 | 対象活動例 |
|---|---|---|
| イ | 高度学術研究活動 | 大学教員・研究機関研究員・公的研究機関勤務等 |
| ロ | 高度専門・技術活動 | エンジニア・ITスペシャリスト・医師等 |
| ハ | 高度経営・管理活動 | 外資系企業役員・事業経営者・上級管理職 |

---

### 1. 学歴（Academic Background）

| 学歴 | イ（研究） | ロ（専門・技術） | ハ（経営・管理） |
|---|---|---|---|
| 博士号（専門職学位を除く）取得者 | **30** | — | — |
| 博士号又は修士号取得者 | — | **20** | **20** |
| 経営管理に関する専門職学位（MBA・MOT）取得者 | — | — | **25** |
| 修士号（専門職博士含む）取得者 | **20** | **20** | **20** |
| 大学卒業（博士・修士以外） | **10** | **10** | **10** |
| 複数分野で博士・修士・専門職学位を複数保有 | **+5** | **+5** | **+5** |

※ハのMBA取得者は別途+5点の追加加算規定あり（MBA+5点ルール）。

---

### 2. 職歴（Professional Experience — 関連業務実務経験）

| 実務経験年数 | イ（研究） | ロ（専門・技術） | ハ（経営・管理） |
|---|---|---|---|
| 10年以上 | — | **20** | **25** |
| 7年以上 | **15** | **15** | **20** |
| 5年以上 | **10** | **10** | **15** |
| 3年以上 | **5** | **5** | **10** |

※イ（研究）の実務経験: 研究・研究指導・教育に関する実務に限る; 上限は7年以上15点。

---

### 3. 年収（Annual Income）

**重要: 年収には賞与（ボーナス）を含む。通勤手当・住宅手当・残業代は除外（G34 cross-ref）。**

#### イ（高度学術研究活動）・ロ（高度専門・技術活動）— 年齢別ブラケット

| 年収 | ～29歳 | 30～34歳 | 35～39歳 | 40歳以上 |
|---|---|---|---|---|
| 1,000万円以上 | **40** | **40** | **40** | **40** |
| 900万円以上 | **35** | **35** | **35** | **35** |
| 800万円以上 | **30** | **30** | **30** | **30** |
| 700万円以上 | **25** | **25** | **25** | — |
| 600万円以上 | **20** | **20** | **20** | — |
| 500万円以上 | **15** | **15** | **15** | — |
| 400万円以上 | **10** | — | — | — |

※ロおよびハは年収**300万円以上**が最低要件（最低基準; 点数は別途計算）。

#### ハ（高度経営・管理活動）— 年齢による差なし

| 年収 | 点数 |
|---|---|
| 3,000万円以上 | **50** |
| 2,500万円以上 | **40** |
| 2,000万円以上 | **30** |
| 1,500万円以上 | **20** |
| 1,000万円以上 | **10** |

---

### 4. 年齢（Age Bonus — 全カテゴリ共通）

| 年齢 | 点数 |
|---|---|
| 29歳以下 | **15** |
| 30～34歳 | **10** |
| 35～39歳 | **5** |
| 40歳以上 | **0** |

---

### 5. 研究実績（Research Achievements）

#### イ（高度学術研究活動）:

| 要件 | 点数 |
|---|---|
| 下記(1)～(4)のうち**2つ以上**に該当 | **25** |
| 下記(1)～(4)のうち**1つ**に該当 | **20** |

#### ロ（高度専門・技術活動）:

| 要件 | 点数 |
|---|---|
| 下記(1)～(4)のうち**1つ以上**に該当 | **15** |

#### 対象となる研究実績（イ・ロ共通）:

- **(1)** 発明者として特許登録が**1件以上**
- **(2)** 外国政府等からグラント等の資金援助を受けた研究に**3回以上**従事
- **(3)** 国内学術データベース登録学術誌への掲載論文が**3本以上**（責任著者または筆頭著者）
- **(4)** 法務大臣が個別に認める研究実績（著名賞の受賞歴等）

---

### 6. 日本・就労関連ボーナス（全カテゴリ適用）

| ボーナス項目 | 点数 | 注記 |
|---|---|---|
| 本邦の高等教育機関で学位取得（ボーナス⑦） | **10** | |
| JLPT**N1**取得（または日本語を専攻して大学卒）（ボーナス⑧） | **15** | BJT 480点以上も同等 |
| JLPT**N2**取得（ボーナス⑨） | **10** | N1ボーナス⑧または大学卒ボーナス⑦取得者は対象外 |
| 法務大臣告示の大学卒業者（ボーナス⑪） | **10** | |
| 法務大臣告示の研修修了者（ボーナス⑫） | **5** | |
| 成長分野先端事業従事（ボーナス⑩） | **10** | 法務大臣認定事業に限る |
| 地方公共団体支援措置を受けた機関での就労（ボーナス⑮） | **10** | |

**JLPT ボーナスの重複制限:**
- ⑦（日本大学卒業）と⑧（N1）は同時取得可能
- ⑦または⑧を取得している場合: ⑨（N2）は取得不可
- N2のみ取得: ⑨を取得可能（10点）

---

### 7. イノベーション機関・雇用主ボーナス（全カテゴリ）

| ボーナス項目 | 点数 |
|---|---|
| **ボーナス④**: イノベーション促進支援措置を受けた機関での就労 | **10** |
| ↑ 同上で就労機関が**中小企業**の場合（追加加算） | **+10（合計20）** |
| **ボーナス⑤**: 試験研究費等比率3%超の中小企業での就労 | **5** |
| **ボーナス⑥**: 職務関連の外国資格等（高度専門・技術のみ） | **5または10** |
| **代表取締役・代表執行役**（ボーナス②）| **10** |
| **取締役・執行役**（ボーナス②）| **5** |
| 経営する事業への**1億円以上投資**（高度経営・管理のみ, ボーナス⑬） | **5** |
| **投資運用業**等に係る業務（高度専門・技術または経営・管理, ボーナス⑭） | **10** |

---

### カテゴリ間の重要な相違点まとめ

| 比較点 | イ（研究） | ロ（専門・技術） | ハ（経営・管理） |
|---|---|---|---|
| 学歴最高点 | 博士号=30点 | 博士/修士=20点 | MBA=25点 |
| 職歴最高点 | 7年以上=15点 | 10年以上=20点 | 10年以上=25点 |
| 年収ブラケット | 年齢依存型（最高40点）| 年齢依存型（最高40点）| 年齢非依存型（最高50点）|
| 研究実績 | あり（最高25点）| あり（最高15点）| なし |
| 300万円最低基準 | — | あり | あり |

## Safe Answer Behavior

- When asked for specific point values: provide the official figures from the table above by category; note which category (イ・ロ・ハ) the person is in.
- When asked about JLPT points: specify N1=15点, N2=10点; but note the no-stacking rule for N2 if N1/Japan-university bonus is already claimed.
- When asked about innovation institution bonuses: confirm the 10点 base + 10点 SME addition (= 20点 total for SME).
- Always confirm the 70-point pass threshold (G34 cross-ref) and the PR shortcut thresholds (70pt+3yr / 80pt+1yr).
- Route to professional for actual point calculation assessment — the interaction of categories, restrictions, and evidence requirements requires specialist review.

## Must Say

- 高度専門職のポイントは「高度学術研究活動（イ）」「高度専門・技術活動（ロ）」「高度経営・管理活動（ハ）」の3カテゴリで評価方法・点数が異なる。合格点は**70点以上**（G34参照）。
- 年収ポイントは年齢によってブラケットが異なる（イ・ロの場合）。29歳以下は400万円台からポイントが発生するが，40歳以上は700万円以上でないと点が入らない。
- JLPT **N1** = 15点; **N2** = 10点（ただしN1ボーナスまたは日本大学卒業ボーナスがある場合，N2との重複加算は不可）。
- イノベーション促進機関での就労: 10点。中小企業の場合はさらに10点加算され**合計20点**。

## Must Not Say

- 「高度専門職のポイント計算はイ・ロ・ハ共通。」（カテゴリごとに異なる）
- 「年収が高ければ年齢に関係なく年収ポイントが取れる。」（40歳以上は年収400万円台・500万円台のポイントなし）
- 「JLPT N1とN2の両方でポイントが取れる。」（N2はN1取得者には加算されない）
- 「イノベーション機関の加算は一律10点。」（中小企業は合計20点）

## Deep Water Triggers

- Person with PhD (30pts) + 7yr experience (15pts) + 800万円 salary (30pts) + age 32 (10pts) = 85pts — are they eligible for PR shortcut immediately?
- Person is a director (取締役, +5pts) at an SME that is an イノベーション機関 — do they get both ボーナス② (5pts) AND ボーナス④+中小企業加算 (20pts)?
- Person has both JLPT N1 and a Japanese university degree — can they claim both ⑦ (10pts) and ⑧ (15pts)?
- Person's annual income is partly from a Japan-based employer and partly from overseas parent company — how is this counted?
- Person is eligible under both カテゴリイ and カテゴリロ — can they choose the one giving higher points?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons self-calculating points: provide the table values from this card; but recommend professional review of their specific situation — evidence requirements for each category differ.
- For persons close to 70 points: calculate whether ボーナス points (JLPT, employer, age) push them over 70; route to professional for application readiness.
- For persons targeting PR shortcut: confirm the 70pt+3yr OR 80pt+1yr route (G34 cross-ref); calculate point total and trajectory.
- For all HSP inquiries: note points must be maintained at renewal (G34); a drop below 70 points can affect status.

## Unknown Fields

- The exact list of universities and training programs designated under 法務大臣告示 for ボーナス⑪ and ⑫ (lists update periodically).
- The exact list of institutions designated as "イノベーション促進支援措置を受けた機関" for ボーナス④ (the designated list changes).
- Whether the 年収ポイントが年齢ブラケット を超えた場合の扱い（i.e., 年収1000万円超=40点は年齢問わず適用されることは確認済みだが、ブラケット間の丸め方）.

## Needs Domain Flags

- needs_domain (P1): the ISA告示で指定される「成長分野における先端的事業」（ボーナス⑩）の最新対象事業一覧; this changes as government priorities evolve.
- needs_domain (P1): for applicants who qualify under both category イ and ロ — is there an official selection mechanism, or can they self-select the higher-scoring category?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hsp-d-001 | "修士号と10年の職歴があります。ロの高度専門職ポイントは学歴・職歴だけで何点になりますか？" | State: 修士号=20点 + 職歴10年=20点 = 合計40点（学歴・職歴のみ）。70点合格には年収・年齢・ボーナス等でさらに30点以上必要。 |
| hsp-d-002 | "JLPT N1を持っています。ポイントは何点ですか？" | State: N1ボーナス（ボーナス⑧）= 15点。ただし日本語大学卒業ボーナス（⑦=10点）を取得している場合でも、N1は別途15点加算可能。N2ボーナス（⑨=10点）はN1取得者には加算不可。 |
| hsp-d-003 | "当社はイノベーション促進機関（中小企業）に認定されています。高度専門職の加算ポイントは？" | State: イノベーション促進機関ボーナス（ボーナス④）= 10点 + 中小企業追加加算 10点 = **合計20点**。 |

## Source Notes

- 全点数値は ISA 公式PDFから直接確認: ポイント計算表（参考書式）(930001657.pdf) および 法務省令第37号（930001658.pdf）.
- 学歴・職歴・年収・年齢のブラケットはいずれも官式PDF原文から引用.
- JLPT N1=15点 / N2=10点 (BJT480+/400+も同等) confirmed from PDF原文.
- イノベーション機関の中小企業追加加算（合計20点）confirmed from PDF原文.
- Cross-ref G34 (年収算入範囲; 70点/80点閾値; 更新時のポイント維持), G38 (HSP2変更要件の3年+70点).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 011 G62. Key sources: ISA 官式ポイント計算表PDF (930001657.pdf) および 法務省令第37号PDF (930001658.pdf) — agent-fetched directly from ISA. Full point table confirmed: イ・ロ・ハ別学歴/職歴/年収/年齢/研究実績/ボーナス/イノベーション機関. Cross-ref G34, G38.
