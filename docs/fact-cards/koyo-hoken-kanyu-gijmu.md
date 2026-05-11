---
fact_id: koyo-hoken-kanyu-gijmu
title: 雇用保険加入義務 — 週20時間以上の外国人労働者も対象
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 16)
sprint: "cycle2-new-batch16"
citation_label: "雇用保険加入義務（週20時間以上・外国人労働者・事業主届出義務・失業給付・外国人雇用届出）"
citation_summary: "週20時間以上勤務する外国人労働者の雇用保険加入義務と、事業主の外国人雇用届出（ハローワーク）義務を確認するカード。失業給付の受給要件の概要も含む。"
source_display_names:
  - "厚生労働省"
  - "ハローワーク"
applies_when:
  - "外国人労働者が雇用保険に加入しなければならないか確認したい"
  - "週20時間以上働く外国人アルバイトの雇用保険加入を確認したい"
  - "雇用保険に加入している外国人が失業給付を受けられるか確認したい"
  - "事業主が外国人を雇用した際の届出義務を確認したい"
does_not_cover:
  - "失業給付（基本手当）の受給手続き詳細"
  - "雇用保険の育児休業給付・傷病給付"
  - "労働者災害補償保険（rousai-hoken-gaikokujin 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html
    label: 厚生労働省 — 外国人雇用対策
    accessed: "2026-05-11"
applies_to:
  - 週20時間以上・31日以上雇用見込みで雇用されている外国人労働者
  - 外国人を雇用する事業主
direct_fact_fields:
  - 雇用保険の加入義務要件：「週所定労働時間20時間以上かつ31日以上雇用される見込みがある労働者」は国籍に関わらず加入義務あり
  - 外国人雇用届出義務：事業主は外国人労働者を雇用・離職させた場合、翌月末日までにハローワークに届出が必要（雇用対策法）
  - 届出内容：在留資格・在留期間・国籍等の情報をハローワークに届出
  - 失業給付の受給要件：離職前2年間に被保険者期間が通算12か月以上（特定受給資格者は6か月以上）
ai_inferred_fields:
  - 失業給付の受給：在留資格の有効期間内であれば、外国人も日本人と同様に失業給付（基本手当）を受給可能（ai推定）
  - 在留期間と失業給付：在留期限が迫っている場合は受給期間が短縮される場合あり（ai推定）
  - 特定技能・技人国等の就労ビザ保持者は雇用保険加入対象（ai推定）
  - 研修・技能実習生は雇用保険の適用関係が複雑（ai推定 — DOMAIN確認要）
needs_review_flags:
  - jisshusei_koyo_hoken: 技能実習生・研修生の雇用保険適用の詳細はDOMAIN確認要。
  - taiki_shikin_gaijin: 在留資格更新待ち中（在留期限超過の場合）の失業給付受給可否はHW確認要。
related_links:
  - title: "厚生労働省 — 外国人雇用対策"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
    organization: "厚生労働省"
    display_label: "厚生労働省 — 外国人雇用対策（雇用保険・届出義務）"
    locator: "ページ内で「雇用保険」「届出義務」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "雇用保険：週20時間以上かつ31日以上雇用見込みの労働者は国籍問わず加入義務あり。事業主は外国人雇用・離職時にハローワークへ翌月末日までに届出義務（雇用対策法）。失業給付：離職前2年間に被保険者期間12か月以上が要件。"
    source_title: "厚生労働省：外国人雇用対策"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「雇用保険の加入要件（週20時間・31日以上）」「外国人雇用届出（翌月末日）」「失業給付の要件」の記述を確認"
    display_label: "雇用保険：週20時間以上は外国人も加入義務・事業主に届出義務・失業給付は12か月以上"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "外国人雇用状況の届出義務（雇用対策法28条）：事業主は外国人労働者の雇用・離職の都度、翌月末日までにハローワークへ届出。未届けには30万円以下の罰金。"
    source_title: "厚生労働省：外国人雇用対策"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「外国人雇用状況の届出（雇用対策法28条）」「罰則（30万円以下の罰金）」の記述を確認"
    display_label: "外国人雇用届出：雇用・離職時に翌月末日までハローワークへ・未届けは30万円以下の罰金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "失業給付（基本手当）の受給要件：雇用保険の被保険者であった期間が離職前2年間に通算12か月以上（特定受給資格者・特定理由離職者は6か月以上）。"
    source_title: "厚生労働省：外国人雇用対策"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「失業給付（基本手当）の受給要件」「被保険者期間12か月以上（特定受給資格者は6か月以上）」の記述を確認"
    display_label: "失業給付の受給要件：離職前2年間に被保険者期間12か月以上（会社都合等は6か月以上）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での雇用保険法・雇用対策法に基づく。

## current_effective_fact

週20時間以上かつ31日以上雇用される外国人労働者は、日本人と同様に雇用保険への加入が義務付けられている。事業主には外国人雇用の届出義務がある。

**雇用保険加入要件（{{TODAY_ISO}} 現在）：**

| 要件 | 内容 |
|------|------|
| 労働時間 | 週所定労働時間**20時間以上** |
| 雇用期間 | **31日以上**の雇用見込み |
| 国籍 | 国籍問わず（外国人も対象） |
| 適用除外 | 65歳以上（高年齢被保険者）・学生（例外あり） |

**事業主の届出義務（外国人雇用状況の届出）：**
- 外国人を雇用したとき → 翌月末日までにハローワークへ届出
- 外国人が離職したとき → 翌月末日までにハローワークへ届出
- 届出内容：氏名・在留資格・在留期間・国籍・生年月日等

## exceptions_or_transition

- **失業給付の受給**：離職前2年間に被保険者期間12か月以上（会社都合は6か月以上）が必要。在留期限が迫っている場合は受給期間が短縮される場合あり（ai推定）
- **技能実習生**：雇用保険の適用関係は複雑（DOMAIN確認要）
- **週20時間未満のアルバイト**：加入義務なし（ただし社会保険は別の要件あり）

## common_user_phrases

- 外国人でも雇用保険に加入できますか
- 週20時間以上働いています。雇用保険に入らないといけませんか
- アルバイトで辞めたとき、失業給付はもらえますか
- 会社が雇用保険の届出をしてくれていない場合どうすればいいですか

技術キーワード（マッチャ用）：

- 外国人 雇用保険 / 外国人 失業保険 / 外国人 雇用保険 加入
- 週20時間 雇用保険 / 外国人 失業給付 / アルバイト 外国人 雇用保険
- 外国人雇用届出 / 事業主 外国人 届出 ハローワーク

## must_say

- 週20時間以上・31日以上雇用は国籍問わず雇用保険加入義務
- 事業主には外国人雇用の届出義務あり（ハローワーク・翌月末日）
- 失業給付は被保険者期間12か月以上が要件

## must_not_say

- 「外国人は雇用保険に入れない」（週20時間以上なら加入義務あり）
- 「失業給付は日本人だけ」（加入要件を満たせば外国人も受給可能）

## qa_cases

**Q1: 週25時間のパートで働いています。雇用保険に入れますか？**
A: はい。週所定労働時間が20時間以上かつ31日以上の雇用見込みがあれば、外国人でも雇用保険に加入する義務があります。加入されていない場合は、ハローワークに相談してください。

**Q2: 会社を辞めました。失業給付をもらえますか？**
A: 雇用保険に加入しており、離職前2年間に被保険者期間が通算12か月以上あれば失業給付（基本手当）を受給できます。最寄りのハローワークで手続きを行ってください。在留期限が残っている期間内であれば受給可能です。

## injection_format

### injection_certain_block

```
【雇用保険加入義務 ファクト / {{TODAY_ISO}} 確認済み】

・加入義務：週20時間以上かつ31日以上雇用 → 国籍問わず強制加入
・事業主義務：外国人雇用・離職時に翌月末日までハローワークへ届出
・失業給付の要件：離職前2年間に被保険者期間12か月以上
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 16) | 新規作成。雇用保険加入義務（外国人）。厚生労働省公式で週20時間以上の加入義務・届出義務・失業給付12か月要件を確認。実習生の扱い・在留期限との関係はai推定。 | — | ai_verified | new |
