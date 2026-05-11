---
fact_id: startup-visa-keiei-transition
title: スタートアップビザ（特定活動）から経営・管理への在留資格変更
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-07
reviewer: ai_self_verified
sprint: 0.6 / Workstream C / Batch 2
citation_label: "スタートアップビザ（特定活動）→経営管理ビザ移行の条件・手続き"
citation_summary: "スタートアップビザ（特定活動46号・起業活動促進事業）から経営・管理ビザへの在留資格変更の条件・タイミング・必要書類を確認するカード（ai_extractedステート・DOMAIN審査待ち）。"
source_display_names:
  - "出入国在留管理庁"
  - "経済産業省"
applies_when:
  - "スタートアップビザ（特定活動）で在留中に経営管理ビザへの移行を検討している"
  - "スタートアップビザの有効期間・更新・移行条件を確認したい"
does_not_cover:
  - "経営管理ビザの要件詳細（keiei-kanri-2025-10 参照 — 2025年10月以降新基準）"
  - "スタートアップビザの自治体認定手続き（自治体ごとに異なる — 窓口確認要）"
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: claude-sonnet-4-6 (FACT-OPS Batch 2, WebFetch from official ISA/MOJ sources)
  source_count: 2
  self_verification_passed_at: 2026-05-07
  promotion_blocked_reason: >
    複数の核心事実（起業完了の定義・移行条件の完全要件・2025-10改正後の
    経営管理基準との接続）が官方公開ページで確認できず。
    state: ai_extracted のまま、DOMAIN審査で direct_fact に昇格するか判断。
official_sources:
  - id: moj-isa-nyuukoku07-00001
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00001.html
    title: 本邦の大学等を卒業した留学生による起業活動に係る措置について
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-03-00097
    url: https://www.moj.go.jp/isa/03_00097.html
    title: 外国人起業活動促進事業（スタートアップビザ）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: meti-startupvisa
    url: https://www.meti.go.jp/policy/newbusiness/startupvisa/index.html
    title: スタートアップビザ（外国人起業活動促進事業）
    publisher: 経済産業省
    last_checked_at: 2026-05-07
    quoted_in_card: false
    needs_human_fetch: true
    note: "WebFetch failed (timeout). PDF and detailed conditions require human retrieval."
applies_to:
  - 特定活動（外国人起業活動促進事業 / スタートアップビザ）保持者
  - 本邦大学卒業後の留学生起業特定活動保持者
  - 上記から経営・管理への在留資格変更を検討している者
direct_fact_fields:
  - startupvisa_max_2years
  - startup_activity_completed_keiei_change_required
  - need_certified_management_support_organization
ai_inferred_fields:
  - keiei_kanri_2025_10_new_standards_apply_on_transition
  - transition_timing_before_2year_expiry
needs_review_flags:
  - id: kigyou_kanryo_definition
    reason: >
      「起業活動が完了した」の具体的定義（法人登記完了？売上発生？従業員雇用？）は
      官方公開ページに明示なし。経営管理ビザの新基準（2025-10-16施行）との
      連携における「3000万円・常勤職員・日本語要件」の適用タイミングも不明。
      DOMAIN/書士による詳細確認が必要。
  - id: no_certificate_organization_options
    reason: >
      「経済産業大臣認定の地方公共団体又は民間事業者」の具体的な認定機関リスト・
      手続きの詳細は経済産業省ページ（WebFetch失敗）で確認できず。
      DOMAIN/書士またはMETI直接確認が必要。
  - id: transition_conditions_post_2025_10
    reason: >
      2025-10-16の経営管理基準改正後、スタートアップビザから経営管理への
      移行に際して新基準が完全適用されるか、過渡措置が適用されるかは
      官方ページに明示なし。fact-001 (keiei-kanri-2025-10) の certain_block と
      合わせて DOMAIN による確認が必要。
  - id: meti_page_source_gap
    reason: >
      METI スタートアップビザページ (meti.go.jp) はWebFetchがタイムアウトで
      取得失敗。詳細条件・移行フロー・認定機関リストは人手での確認が必要。
      このカードの confidence が medium に留まる主因。
related_links:
  - title: "本邦の大学等を卒業した留学生による起業活動に係る措置について"
    url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00001.html"
    organization: "出入国在留管理庁"
    display_label: "本邦の大学等を卒業した留学生による起業活動に係る措置について"
    locator: "ページ内で「本邦の大学等を卒業した留学生による起業活動に係る措」を検索"
    relation: "official_reference"
  - title: "外国人起業活動促進事業（スタートアップビザ）"
    url: "https://www.moj.go.jp/isa/03_00097.html"
    organization: "出入国在留管理庁"
    display_label: "外国人起業活動促進事業（スタートアップビザ）"
    locator: "ページ内で「外国人起業活動促進事業」を検索"
    relation: "official_reference"
  - title: "スタートアップビザ（外国人起業活動促進事業）"
    url: "https://www.meti.go.jp/policy/newbusiness/startupvisa/index.html"
    organization: "経済産業省"
    display_label: "スタートアップビザ（外国人起業活動促進事業）"
    locator: "ページ内で「スタートアップビザ」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "スタートアップビザ（特定活動）の在留期間は「最長２年間であり、この間に起業活動を完了する必要があります。」起業活動完了後は「『経営・管理』への在留資格変更許可申請を行ってください。」（ISA公式引用）。「起業活動が完了した」の具体的定義（法人登記完了・売上発生・従業員雇用等）は官方ページに明示なし（`kigyou_kanryo_definition`確認要）。"
    source_title: "本邦の大学等を卒業した留学生による起業活動に係る措置について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「最長２年間」「起業活動を完了」「経営・管理への在留資格変更許可申請」の記述を確認"
    display_label: "スタートアップビザ：最長2年・起業完了後は経営管理への在留資格変更申請が必要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "スタートアップビザの前提：「経済産業大臣から認定を受けた地方公共団体又は民間事業者による管理・支援の下、起業準備活動を行うための在留資格を付与され、最長２年間、起業準備活動を行う」（ISA公式引用）。認定機関（地方公共団体または経産大臣認定民間事業者）リスト・手続き詳細は経産省HP参照（METIページ取得失敗 — `no_certificate_organization_options`確認要）。"
    source_title: "外国人起業活動促進事業（スタートアップビザ）"
    source_url: "https://www.moj.go.jp/isa/03_00097.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「経済産業大臣から認定を受けた地方公共団体又は民間事業者」「最長２年間」の記述を確認"
    display_label: "スタートアップビザ：経産大臣認定機関の管理・支援下で起業準備活動（最長2年）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# スタートアップビザ（特定活動）から経営・管理への在留資格変更

> **AI extraction status**: `ai_extracted` — 核心事実（起業完了定義・移行条件）の
> 官方確認が不完全。DOMAIN審査前は Alpha 注入不可。
> METI ページの人手確認後に ai_verified への昇格を検討。

---

## current_date_logic

```
今日 (TODAY) >= 2025-10-16 → 移行先の経営管理ビザ基準は改正後の新基準が適用（推定）。
このカード自体のON/OFFは特定日付なし（常時有効）。
```

---

## current_effective_fact

### スタートアップビザの在留期間：最長2年

> 「本措置により認められる在留期間中は最長２年間であり、
> この間に起業活動を完了する必要があります。」
> source: moj-isa-nyuukoku07-00001

スタートアップビザ（特定活動）の在留は**最長2年間**。この期間内に起業活動を完了しなければならない。

### 起業完了後の手続き

> 「起業活動が完了した際には、『経営・管理』への在留資格変更許可申請を
> 行ってください。」
> source: moj-isa-nyuukoku07-00001

起業活動完了後、**経営・管理への在留資格変更許可申請**が必要。
※「起業活動が完了した」の具体的定義は官方ページに明示なし（needs_review）。

### 支援機関（認定組織）の管理・支援が必要

> 「経済産業大臣から認定を受けた地方公共団体又は民間事業者による
> 管理・支援の下、起業準備活動を行うための在留資格を付与され、
> 最長２年間、起業準備活動を行う」
> source: moj-isa-03-00097

認定機関（地方公共団体または経産大臣認定民間事業者）の支援のもとで
起業準備活動を行う必要がある。認定機関リストは経産省HP参照
（WebFetch未取得 → needs_review）。

### 経営・管理への移行時に2025年10月改正新基準が適用されるか（AI inference）

2025-10-16以降に在留資格変更申請をする場合、改正後の経営管理基準
（資本金3,000万円・常勤職員・日本語要件等）が適用されると考えられるが、
スタートアップビザ保持者への過渡措置の有無は官方ページに明示なし。
> source: ai_inference（needs_review: transition_conditions_post_2025_10）

---

## exceptions_or_transition

| 状況 | 取り扱い |
|------|----------|
| 2年以内に起業完了・経営管理ビザへ変更 | 通常の経営管理変更申請。2025-10以降は新基準適用と思われる（needs_review）|
| 2年経過しても起業完了できなかった場合 | 官方ページに対応方法の明示なし（needs_review）|
| 既存経営管理ビザ保持者 | 本カード対象外 → fact-001/002 参照 |
| 新規申請（起業準備前） | 本カード対象外 → fact-001 参照 |

---

## common_user_phrases

主要トリガー（中文）：

- startup visa 怎么转经管签
- 创业特定活动签证快到2年了，要申请什么
- 我在日本用创业签开了公司，接下来怎么转正式经营管理签
- 特定活动创业签到期了没开成公司怎么办
- 日本创业签证转经营管理签需要什么条件
- 外国人创业促进事业的签证和经管签有什么关系
- startup visa 没开成公司会被遣返吗

技術キーワード（マッチャ用）：

- スタートアップビザ / startup visa / 外国人起業活動促進事業
- 特定活動（起業）/ 特定活動 / 创业特定活动
- 経営管理 / 经营管理 / 経管 转 / 転換
- 起業完了 / 起業準備 / 创业完成

---

## must_say

1. スタートアップビザ（特定活動）の在留期間は**最長2年間**
2. この期間内に起業活動を完了し、**経営・管理への在留資格変更申請**が必要
3. 2025年10月16日以降に変更申請をする場合、経営管理の**新基準**（3,000万円・常勤職員等）が適用される可能性が高い
4. 「起業活動完了」の具体的定義、認定機関の選び方、2年以内に完了できない場合の対応は専門家確認が必要
5. **行政書士または認定支援機関への早期相談を強く推奨**

## must_not_say

- ❌ 「スタートアップビザは2年以上延長できます」（最長2年の制限あり）
- ❌ 「起業完了後すぐに永住申請できます」（経営管理ビザへの変更が先）
- ❌ 「旧経営管理基準（500万円）で申請できます」（2025-10改正後は新基準適用の可能性高）
- ❌ 「経産省認定を受ければ起業内容は自由」（支援機関の管理下が前提）

---

## qa_cases

### QA-1 — スタートアップビザの期限確認

**user**: startup visa 我现在有1年了，还有多少时间？

**must_have**:
- 最長2年間という制限
- 2年以内に起業活動を完了する必要がある
- 経営管理ビザへの変更が必要
- 時間が限られているため早めに認定機関・行政書士と相談を推奨

**must_not_have**:
- 「2年以上延長できます」
- 期限の存在を軽視する表現

**bad_answer_example**: 「スタートアップビザは状況に応じて延長できますので、急がなくて大丈夫です」

**good_answer_criteria**: 最長2年の制限、2年以内に起業完了・経営管理変更申請が必要、残り1年での早急な行動を促す。

---

### QA-2 — 経営管理への移行条件

**user**: 创业特定活动签证怎么转成正式的经营管理签？

**must_have**:
- 起業活動完了後に経営管理への在留資格変更許可申請が必要
- 2025-10改正後の新基準（3,000万円・常勤職員等）が適用される可能性
- 「起業活動完了」の定義等の詳細は専門家確認が必要
- 行政書士への相談を強く推奨

**must_not_have**:
- 「旧基準（500万円）で申請できます」
- 移行が自動的に行われるかのような説明

**bad_answer_example**: 「会社の登記が完了したら自動的に経営管理ビザに変わります」

**good_answer_criteria**: 在留資格変更許可申請が必要であること、2025年10月以降の新基準の適用可能性、詳細は専門家確認が必要なことを伝える。

---

### QA-3 — 2年以内に起業できなかった場合

**user**: startup visa 2年过去了还没开成公司，怎么办？

**must_have**:
- この状況の対応は官方ページに明示がなく非常に不確実
- 在留が終了するリスクがある
- **今すぐ行政書士または認定支援機関に相談**することが最重要
- 状況次第で取りうる選択肢が異なる

**must_not_have**:
- 「もう少し延長できます」と根拠なく安心させる
- 「すぐに帰国が必要」と断言する（個別状況による）

**bad_answer_example**: 「心配しないでください。状況を説明すれば延長してもらえます」

**good_answer_criteria**: 状況の深刻さを伝えつつ、行政書士への即時相談を最重要アクションとして伝える。官方の明示ルールがないため断定は避ける。

---

## injection_format

> **このカードは `state: ai_extracted` のため injection_certain_block は Alpha 注入不可。**
> DOMAIN 審査後に `ai_verified` 以上に昇格した場合のみ injection が有効になる。

### injection_certain_block (DRAFT — 昇格後に確認要)

```
【参考事実 — スタートアップビザ（特定活動）から経営・管理への移行（要 DOMAIN 審査）】

※このカードは DOMAIN 審査待ち。確定版ではない。

スタートアップビザ（外国人起業活動促進事業 / 特定活動）の基本的な枠組み：

1. 在留期間：最長2年間
2. 期間中に「起業活動を完了」する必要がある
3. 起業完了後：「経営・管理」への在留資格変更許可申請が必要
4. 前提：経済産業大臣認定の地方公共団体または民間事業者の管理・支援のもとであること

2025年10月16日以降の在留資格変更申請：
経営・管理の改正後新基準（資本金3,000万円・常勤職員・日本語能力等）が
適用される可能性が高い。過渡措置の有無は現時点で官方ページに明示なし。

回答スタイル：
- 最長2年・起業完了後の変更申請という枠組みは伝える
- 新基準（3,000万円等）に触れる
- 詳細な移行条件・「起業完了」の定義は行政書士確認を強く推奨
- 断定は避ける
```

### injection_needs_review_addendum

```
スタートアップビザ（特定活動）から経営・管理への在留資格変更の具体的要件
（起業活動完了の定義、2025年10月改正基準との関係、認定機関の詳細、
2年以内に起業完了できない場合の対応）については、
出入国在留管理庁・経済産業省の最新情報および行政書士に確認することを強く推奨します。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (claude-sonnet-4-6 / FACT-OPS Batch 2) | initial extraction from moj-isa-nyuukoku07-00001 + moj-isa-03-00097; METI page fetch timeout | — | ai_extracted | 最長2年・起業完了後変更申請の枠組みのみ確認; 核心条件は needs_review; FACT 自律遵守 §5 — confidence medium 卡禁止升 ai_verified |
| 2026-05-07 | DOMAIN-CC (audit-full-20260507) | DOMAIN professional resolution of transition_conditions_post_2025_10: スタートアップビザ→経営管理は「在留資格変更許可申請」= 既存保持者の「更新申請」ではないため、既存保持者過渡措置 NOT applicable。2025-10-16以降の変更申請には新基準（3,000万円・常勤1名・N2等）が完全適用と判断。FACT指示: ai_inferred_fields に追加・body記載。METI page未解決 (meti_page_source_gap + kigyou_kanryo_definition) のため state: ai_extracted 維持。 | ai_extracted | ai_extracted | NOT UPGRADED — METI page required for ai_verified |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 5) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_extracted | ai_extracted | patch |

## Audit assignment

- DOMAIN優先タスク：METI スタートアップビザページ (meti.go.jp) の人手確認
  → 認定機関リスト・起業完了定義・移行条件を確認
- `needs_review_flags.transition_conditions_post_2025_10` → fact-001 (keiei-kanri-2025-10) の DOMAIN 審査結果と照合
- 昇格条件：上記 needs_review 4項目のうち kigyou_kanryo_definition + transition_conditions_post_2025_10 が解決されれば ai_verified への昇格を検討
