---
asset_id: guardrail-koshin-shorui-pattern
title: 在留期間更新申請書類 — 技人国はカテゴリ1〜4で必要書類が異なる；特定技能は分野別第3表が追加必要
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

This guardrail prevents errors about the document requirements for 在留期間更新許可申請, particularly for 技術・人文知識・国際業務 (技人国) and 特定技能1号. Key errors to block:

1. **"技人国の更新書類はどの会社でも同じ。"** — incorrect. 技人国更新では，所属機関（雇用主）のカテゴリー（1〜4）によって必要書類が大きく異なる。大企業（Cat1/Cat2）と中小企業（Cat3/Cat4）では書類数が全く違う。
2. **"特定技能の更新書類は分野に関係なく同じ。"** — incorrect. 特定技能1号の更新では「第1表（全分野共通）」に加えて「第3表（分野別）」が必要。各分野の協議会の構成員証明書等が追加で要求される。
3. **"税金・年金・健康保険の証明書は更新時に不要。"** — incorrect. 技人国Cat3/Cat4や特定技能1号では，住民税の納税証明書・課税証明書や社会保険関連書類（健康保険・年金）の提出が求められる（公的義務の履行確認のため）。
4. **"源泉徴収票のある大企業なら，特定技能の更新も書類が少ない。"** — incorrect for 特定技能. 特定技能1号の書類要件は，所属機関のカテゴリー（技人国と同様の区分）ではなく，第1表・第3表の固定構造に基づく。

## Trigger

Use this card when the user says:

- "技人国の更新申請に必要な書類は何ですか？"
- "小さい会社でも技人国の更新書類は同じですか？"
- "特定技能の更新に必要な書類を教えてください。"
- "特定技能の更新で税金の証明書は必要ですか？"
- "在留更新の際，住民税の証明書はいつ必要ですか？"
- any pattern treating renewal document requirements as uniform across employer categories or 特定技能 sectors.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-gijinkoku-renewal | L4 | 出入国在留管理庁「技術・人文知識・国際業務」更新書類一覧 | https://www.moj.go.jp/isa/applications/status/gijinkoku.html | 2026-05-15 | カテゴリー1〜4別の書類一覧（令和8年4月1日改定版）確認; PDF書類チェックリスト (001367009.pdf). |
| isa-ssw-renewal | L4 | 出入国在留管理庁「特定技能1号」更新書類一覧 | https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html | 2026-05-15 | 第1表（全分野共通）・第3表（分野別）の書類一覧（令和8年4月1日改定版）確認; Excel書類チェックリスト. |
| g50-crossref | guardrail | guardrail-koshin-shinsei-timing (G50) | internal | 2026-05-15 | G50: 申請タイミング（在留期間満了3か月前から可）; 特例期間. |
| g31-crossref | guardrail | guardrail-koshin-henkou-shinsa-kijun (G31) | internal | 2026-05-15 | G31: 更新は自動ではない（大臣裁量）; 公的義務・素行・生計・活動実態が評価される. |

## Official Rule Or Source Fact

**※以下は令和8年4月1日改定版の書類一覧に基づく（ISA公式チェックリスト直接確認）。書類要件は改定されることがある。必ず申請前にISA公式サイトで最新版を確認すること。**

---

### 技術・人文知識・国際業務（技人国）更新申請

**カテゴリー区分（雇用主の属性で決まる）:**

| カテゴリー | 該当する機関の例 |
|---|---|
| **カテゴリー1** | 上場企業・相互会社・国や地方公共団体・独立行政法人・主務官庁の許可を受けた公益法人等 |
| **カテゴリー2** | 前年の源泉徴収税額が**1,000万円以上**の機関; 在留申請オンラインシステム利用申出承認を受けた機関 |
| **カテゴリー3** | 前年分の法定調書合計表を提出できる機関（Cat1/Cat2以外） |
| **カテゴリー4** | 上記いずれにも該当しない機関・個人 |

**全カテゴリー共通書類（必須）:**
1. 在留期間更新許可申請書
2. 写真（縦4cm × 横3cm、申請前6か月以内、無帽・無背景）
3. パスポートおよび在留カード【提示】
4. 所属機関のカテゴリー該当性を証明する文書（カテゴリーごとに異なる）

**カテゴリー3・4のみ追加で必要な書類:**
- 住民税の課税（または非課税）証明書・納税証明書（1年間の総所得および納税状況記載）→ 市区町村発行
- 活動内容等を明らかにする資料（労働条件明示文書・役員の場合は定款等）
- 登記事項証明書
- 事業内容を明らかにする資料（会社案内等）
- 直近年度の決算文書の写し（新規事業の場合は事業計画書）

**カテゴリー4のみ追加で必要:**
- 法定調書合計表を提出できない理由を明らかにする資料

**実務上の重要ポイント:**
- Cat1/Cat2の大企業・上場企業は「住民税証明書・決算書・登記事項証明書等」が不要（カテゴリー証明書類のみで代替）
- Cat3/Cat4の中小企業・個人は大量の追加書類が必要
- 転職後初回更新の場合: Cat3は追加書類が増える（新しい雇用先の登記・決算・事業内容等）

---

### 特定技能1号 更新申請

**書類構成: 第1表（全分野共通）＋ 第3表（分野別）**

**第1表: 申請人に関する必要書類（全分野共通・主要なもの）:**

| 書類 | 必要性 |
|---|---|
| 在留期間更新許可申請書（別記第30号の2様式）＋写真 | **必須** |
| 特定技能雇用契約書の写し（参考様式第1-5号）※申請人署名・多言語記載 | **必須** |
| 雇用条件書の写し（参考様式第1-6号）＋賃金支払の写し（別紙） | **必須** |
| 個人住民税の**納税証明書**（直近1年度分）| 条件付き（前回申請時以降変更なければ省略可） |
| 個人住民税の**課税証明書**（同一年度）| 同上 |
| 給与所得の**源泉徴収票の写し**（同一年）| 同上 |
| **健康保険**に関する資格情報（マイナポータルまたは資格確認書）| 国民健康保険加入者に必要 |
| **国民健康保険料（税）納付証明書**（直近1年度）| 同上 |
| **被保険者記録照会回答票**（年金機構）| 国民年金加入者に必要 |
| 国民年金保険料**領収証書の写し**（前々月まで24か月分）| 同上 |
| 公的義務履行に関する誓約書（参考様式第1-26号）| 滞納がある場合に必要 |

**第3表: 分野別書類（主要分野の例）:**

| 分野 | 主な必要書類 |
|---|---|
| 介護 | 業務を行わせる事業所の概要書（分野参考様式第1-2号）; **協議会の構成員証明書** |
| ビルクリーニング | 建築物清掃業等の登録証明書の写し（条件付き）; **協議会の構成員証明書** |
| 工業製品製造業 | JAIMのホームページ掲載の構成員名簿の写し; 誓約書（分野参考様式第3-1号）|
| 建設 | **建設特定技能受入計画の認定証の写し**（国土交通省地方整備局による手続き必要）|
| 自動車整備 | 自動車整備分野特定技能協議会の**構成員資格証明書**（または届出書） |
| 宿泊 | 旅館・ホテル営業の営業許可証の写し; **協議会の構成員証明書** |
| 飲食料品製造業・外食業 | **協議会の構成員証明書**（いずれも必須）; 外食業は飲食店営業許可証等 |

**全分野共通の重要点:**
- 多くの分野で**協議会の構成員証明書（所属機関分）が必須**
- RSO（登録支援機関）に支援計画の全部を委託している場合は，分野別誓約書と**RSO分の協議会構成員証明書**も別途必要
- 更新時は**第2表（所属機関に関する書類）は不要**（新規・変更申請のみ必要）

**特定技能1号の公的義務書類（税・保険・年金）:**

特定技能1号更新では，申請人個人の公的義務履行状況（住民税・国民健康保険・国民年金）の確認書類が求められる。ただし，前回申請時以降に変更がなければ省略できる場合がある。社会保険（健康保険・厚生年金）に加入している場合は別途確認方式が異なる。

## Safe Answer Behavior

- When asked about 技人国 renewal documents: immediately ask about the employer's category (Cat1-4); the category determines the document set.
- When asked if documents are the same for all companies: correct the misconception; Cat1/Cat2 requires far fewer documents than Cat3/Cat4.
- When asked about 特定技能 renewal: confirm the 第1表 + 第3表 structure; ask which sector to confirm the 3rd-table requirements.
- When asked about tax/pension documents for 特定技能 renewal: confirm they are required (first table items 6-12); emphasize this reflects the 公的義務 assessment.
- Always recommend checking the current official ISA checklist before applying — document requirements may be updated.

## Must Say

- 技人国の在留期間更新に必要な書類は，雇用主（所属機関）のカテゴリー（1〜4）によって大きく異なる。上場企業等（カテゴリー1）は書類が少なく，中小企業（カテゴリー3/4）は住民税証明書・決算書・登記事項証明書等の追加書類が必要になる。
- 特定技能1号の更新申請では，全分野共通の第1表（雇用契約書・住民税証明書・年金・健康保険書類等）に加えて，各産業分野の第3表（協議会の構成員証明書等の分野別書類）が必要。
- 特定技能1号更新では，個人住民税・国民健康保険・国民年金の納付状況を示す書類の提出が求められる（公的義務の履行確認）。
- 書類要件は改定されることがあるため，申請前に必ずISA公式サイトの最新チェックリストを確認すること。

## Must Not Say

- 「技人国の更新書類はどの会社でも同じ。」（カテゴリーで異なる）
- 「特定技能の更新は全分野で書類が同じ。」（分野別第3表が必要）
- 「更新申請に税金・年金の証明書は不要。」（特定技能1号等では必要）
- 「大企業に転職すれば更新書類が少なくなる。」（転職後初回更新は追加書類が必要な場合あり）

## Deep Water Triggers

- Person works at a Cat4 employer and does not have the company's tax documents (決算書) — what are the options?
- 特定技能 worker's employer is not a member of the industry association (協議会) — can the renewal still be filed?
- Person changed employers (to a different category) in the middle of the 在留期間 — which category's document set applies?
- 特定技能 worker has 国民健康保険 (not 健康保険) — does the document set differ?
- Person has tax arrears — can they still renew with a 誓約書 (public obligation pledge)?

## User Next Actions

This is not user-facing copy. For answer routing:

- For 技人国 holders: first determine the employer's category (Cat1-4); route to the ISA checklist (gijinkoku.html + PDF 001367009.pdf) for the specific document list.
- For 特定技能1号 holders: confirm their sector; route to the ISA checklist (specifiedskilledworker.html + relevant Excel file) for both 第1表 and 第3表 documents.
- For persons with tax/pension issues: G50 cross-ref (application timing); G60/G4 cross-ref (public obligation 重要性); if there are arrears, the 誓約書 route exists but arrears should be cleared before renewal.
- For all: route to professional (行政書士) for document assembly guidance.

## Unknown Fields

- Whether Cat3/Cat4 employers can use the オンライン申請システム to reduce document burden (G14 cross-ref: the online system may expand to more employers).
- The specific requirements for the "CEFR B2相当" language evidence for 技人国 holders moving to primarily language-based roles.
- How ISA treats partial public-obligation arrears (some months missing) vs. systematic non-payment in the 誓約書 route.

## Needs Domain Flags

- needs_domain (P1): for 技人国 holders at Cat4 employers who cannot provide a 法定調書合計表 — what is the minimum acceptable evidence of employer legitimacy and employment relationship?
- needs_domain (P1): for 特定技能1号 holders whose employer is NOT a member of the required 協議会 — can the renewal be filed, and what documentation substitutes?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shorui-001 | "技人国の更新書類を教えてください。小さい会社に勤めています。" | State: 中小企業は原則カテゴリー3または4に該当。住民税納税証明書・課税証明書、登記事項証明書、事業内容資料、決算書が追加で必要。最新書類一覧をISA公式サイトで確認を。 |
| shorui-002 | "特定技能（飲食料品製造業）の更新で必要な書類は何ですか？" | State: 第1表（全分野共通: 雇用契約書・住民税・年金・健康保険書類等）＋ 第3表（飲食料品製造業分野: 協議会の構成員証明書が必須）。RSO委託の場合はRSO分の協議会証明書・誓約書も必要。 |
| shorui-003 | "上場企業に転職しました。技人国の更新書類は少なくなりますか？" | State: 上場企業はカテゴリー1に該当。住民税証明書・決算書・登記事項証明書等は不要。ただし転職後初回更新では一部追加書類が必要な場合あり。最新書類一覧で確認を。 |

## Source Notes

- 技人国カテゴリー区分・書類一覧: ISA gijinkoku.html + PDF 001367009.pdf（令和8年4月1日改定版）から直接確認. Cat1/Cat2/Cat3/Cat4 の書類差異を官式資料で確認.
- 特定技能1号 第1表（全分野共通）・第3表（分野別）: ISA specifiedskilledworker.html + Excel チェックリスト（001459973.xlsx, 001446608.xlsx）から直接確認.
- 特定技能1号更新では第2表（所属機関書類）は不要（官式書類で確認）.
- 協議会の構成員証明書: 大半の分野で必須（分野別確認済み）.
- 税・年金・健康保険書類: 特定技能1号第1表で条件付き必要（前回申請以降変更なしで省略可の規定あり）.
- Cross-ref G50 (申請タイミング), G31 (更新は自動ではない), G44 (RSO委託), G70 (特定技能支援計画義務), G4/G60 (公的義務の適正履行).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 012 G66. Key sources: ISA gijinkoku.html PDF checklist (Cat1-4 document requirements); ISA specifiedskilledworker.html Excel checklist (第1表・第3表, 令和8年4月1日改定版) — both agent-fetched directly from ISA. Core facts: 技人国=カテゴリー別書類; 特定技能=第1表+第3表; 協議会証明書; 税・年金書類. Cross-ref G50, G31, G44, G70.
