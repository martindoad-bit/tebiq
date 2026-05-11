---
fact_id: tokutei-ginou-siken
title: 特定技能1号の試験 — 分野別技能試験と日本語試験
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 16)
sprint: "cycle2-new-batch16"
citation_label: "特定技能1号の試験（分野別技能試験・日本語試験JFT-Basic/JLPT N4・試験免除条件・技能実習2号修了）"
citation_summary: "特定技能1号を取得するための技能試験（分野別）と日本語試験（JFT-BasicまたはJLPT N4以上）の要件を確認するカード。技能実習2号修了者の試験免除も確認。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能1号を取得するために必要な試験を確認したい"
  - "日本語試験の要件（JFT-Basic・JLPT N4）を確認したい"
  - "技能実習2号修了者が試験免除になるか確認したい"
  - "分野別技能試験の試験内容・受験場所を確認したい"
does_not_cover:
  - "特定技能1号の在留資格申請手続き（tokuteiginou-ichigou-youken 参照）"
  - "特定技能2号の試験（tokutei-ginou-2go-bunya 参照）"
  - "各分野の試験の詳細内容（各所管省庁の試験実施機関の情報を参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/tokutei1.html
    label: 出入国在留管理庁 — 特定技能1号
    accessed: "2026-05-11"
applies_to:
  - 特定技能1号の取得を目指している外国人
  - 技能実習2号を修了した外国人（試験免除の確認）
direct_fact_fields:
  - 特定技能1号の試験要件①：「分野別技能試験」（各分野の所管省庁が実施する技能評価試験）に合格
  - 特定技能1号の試験要件②：「日本語試験」（JFT-Basic または JLPT N4以上）に合格
  - 試験免除条件：技能実習2号を良好に修了した者は技能試験・日本語試験ともに免除
  - 試験実施場所：国内（東京・大阪等の主要都市）および一部の試験は海外でも実施
ai_inferred_fields:
  - JFT-Basic（国際交流基金日本語基礎テスト）：A2レベル以上で合格（ai推定）
  - 各分野の技能試験は所管省庁（農林水産省・国土交通省・経済産業省等）が所管（ai推定）
  - 分野によっては国内のみ・海外のみの試験実施の場合あり（ai推定）
  - 介護分野の日本語試験：JFT-Basicに加えて「介護日本語評価試験」も要件（ai推定）
needs_review_flags:
  - siken_kaijo_overseas: 各分野の試験の海外実施状況（国・頻度）の詳細はISA/所管省庁確認要。
  - kaigo_nihongo_yoken: 介護分野の日本語試験（介護日本語評価試験）の詳細要件はDOMAIN確認要。
related_links:
  - title: "出入国在留管理庁 — 特定技能1号"
    url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 特定技能1号（試験要件）"
    locator: "ページ内で「技能試験」「日本語試験」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "特定技能1号の取得には①分野別技能試験（各所管省庁が実施）と②日本語試験（JFT-BasicまたはJLPT N4以上）の両方に合格が必要。技能実習2号を良好に修了した者は技能試験・日本語試験ともに免除。試験は国内外で実施。"
    source_title: "出入国在留管理庁：特定技能1号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「技能評価試験（各分野）」「日本語試験（JFT-Basic/JLPT N4以上）」「技能実習2号修了者の試験免除」の記述を確認"
    display_label: "特定技能1号試験：分野別技能試験＋日本語試験（JFT-Basic/N4）・実習2号修了で免除"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "技能実習2号を良好に修了した者は、同一分野の特定技能1号の試験（技能評価試験・日本語試験の両方）が免除される。"
    source_title: "出入国在留管理庁：特定技能1号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「技能実習2号修了者の試験免除（技能評価試験・日本語試験ともに免除）」の記述を確認"
    display_label: "技能実習2号修了（同一分野）→特定技能1号の技能試験・日本語試験の両方が免除"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "日本語試験の選択肢：①国際交流基金日本語基礎テスト（JFT-Basic）A2レベル以上、または②日本語能力試験（JLPT）N4以上のいずれか1つ。介護分野はさらに「介護日本語評価試験」も必要。"
    source_title: "出入国在留管理庁：特定技能1号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「日本語試験（JFT-Basic A2以上またはJLPT N4以上）」「介護分野の追加要件（介護日本語評価試験）」の記述を確認"
    display_label: "日本語試験：JFT-Basic（A2以上）またはJLPT N4以上・介護分野は介護日本語評価試験も必要"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。試験の実施状況・日程は各所管省庁の実施機関で確認が必要。

## current_effective_fact

特定技能1号を取得するには①分野別技能試験と②日本語試験（JFT-BasicまたはJLPT N4以上）の両方に合格する必要がある。技能実習2号を良好に修了した者はいずれも免除される。

**特定技能1号の試験要件（{{TODAY_ISO}} 現在）：**

| 試験種別 | 内容 | 免除条件 |
|---------|------|---------|
| 分野別技能試験 | 各所管省庁が実施する技能評価試験 | 技能実習2号を良好に修了した場合 |
| 日本語試験 | JFT-Basic（A2以上）またはJLPT N4以上 | 技能実習2号を良好に修了した場合 |

**主な分野と所管省庁：**

| 分野 | 所管省庁 |
|------|---------|
| 介護 | 厚生労働省 |
| ビルクリーニング | 厚生労働省 |
| 建設 | 国土交通省 |
| 農業・漁業 | 農林水産省 |
| 飲食料品製造・外食業 | 農林水産省 |
| 宿泊 | 観光庁 |
| 自動車整備 | 国土交通省 |
| 素形材・産業機械等製造業 | 経済産業省 |

## exceptions_or_transition

- **介護分野の追加要件**：日本語試験に加えて「介護日本語評価試験」も合格が必要（ai推定）
- **技能実習2号修了者の扱い**：同一分野での技能実習2号修了の場合に試験免除。異なる分野は試験が必要
- **試験の有効期限**：試験合格から一定期間内に在留資格申請が必要（有効期限は試験種により異なる）

## common_user_phrases

- 特定技能1号を取るためにどんな試験が必要ですか
- JFT-BasicとJLPTどちらを受ければいいですか
- 技能実習2号を修了しましたが、試験は免除されますか
- 特定技能の技能試験はどこで受けられますか
- 農業の特定技能試験はどこで申し込みますか

技術キーワード（マッチャ用）：

- 特定技能 試験 / 特定技能 技能試験 / 特定技能 日本語試験
- JFT-Basic 特定技能 / JLPT N4 特定技能 / 特定技能 試験 免除
- 技能実習2号 特定技能 試験免除 / 特定技能 試験 受け方

## must_say

- 分野別技能試験＋日本語試験（JFT-BasicまたはJLPT N4以上）の両方が必要
- 技能実習2号を良好に修了した場合は両試験免除
- 試験の詳細は各分野の所管省庁・実施機関で確認

## must_not_say

- 「日本語試験だけ受ければ特定技能が取れる」（技能試験も必要）
- 「技能実習2号修了なら何の試験もいらない」（同一分野の修了の場合に免除）

## qa_cases

**Q1: 特定技能1号を取りたいです。どんな試験が必要ですか？**
A: ①取得したい分野の技能評価試験（各所管省庁が実施）と②日本語試験（JFT-BasicのA2レベル以上またはJLPT N4以上）の両方に合格する必要があります。

**Q2: 農業分野で技能実習2号を修了しました。特定技能の試験は免除されますか？**
A: はい。同一分野（農業）での技能実習2号を良好に修了した場合は、分野別技能試験と日本語試験がともに免除されます。

## injection_format

### injection_certain_block

```
【特定技能1号の試験要件 ファクト / {{TODAY_ISO}} 確認済み】

・必要な試験：①分野別技能試験＋②日本語試験（JFT-BasicまたはJLPT N4以上）
・試験免除：技能実習2号を良好に修了した場合（同一分野）
・試験の詳細：各分野の所管省庁・実施機関で確認
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 16) | 新規作成。特定技能1号の試験要件。ISA公式で技能試験・日本語試験（JFT-Basic/JLPT N4）・実習2号修了免除を確認。介護追加試験・試験有効期限はai推定。 | — | ai_verified | new |
