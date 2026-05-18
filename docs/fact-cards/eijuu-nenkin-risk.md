---
fact_id: eijuu-nenkin-risk
title: 永住申請 — 公的義務と遅延納付リスク
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: critical
confidence: high
source_quality: official
last_verified_at: "2026-05-18"
reviewer: Codex Knowledge Runtime Loop20
sprint: "knowledge-runtime-loop20"
citation_label: "永住申請 公的義務・遅延納付"
citation_summary: "永住許可ガイドラインでは、納税・公的年金・公的医療保険料などの公的義務を適正に履行していることが求められる。申請時点で納付済みでも、当初の納付期限内に履行されていない場合は原則として消極的に評価される。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住申請前に年金・健康保険・税金の未納や遅延納付が気になる"
  - "申請前に追納すれば永住審査への影響が消えるか確認したい"
  - "永住申請で年金・健康保険・住民税のどの資料を準備するか確認したい"
does_not_cover:
  - "国民年金免除・猶予期間が永住審査でどう評価されるかの個別判断"
  - "転職時の社会保険空白期間の許容範囲"
  - "未納・遅延納付がある場合の申請時期や許可見込み"
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: 出入国在留管理庁 — 永住許可に関するガイドライン
    accessed: "2026-05-18"
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: 出入国在留管理庁 — 永住許可申請（就労資格）
    accessed: "2026-05-18"
applies_to:
  - 永住許可申請を検討する中長期在留者
direct_fact_fields:
  - 永住許可ガイドラインは、公的義務として納税・公的年金・公的医療保険料の納付等を挙げている
  - 申請時点で納付済みでも、当初の納付期限内に履行されていない場合は原則として消極的評価
  - 就労資格からの永住許可申請ページでは、住民税は直近5年分、年金・公的医療保険は過去2年分の納付状況資料が掲げられている
  - 国税の納税証明書（その3）は証明日現在の未納がないことを示す資料で、対象期間指定は不要
ai_inferred_fields: []
needs_review_flags:
  - id: pension_exemption_and_grace
    reason: 国民年金の正規免除・猶予期間が永住審査でどう評価されるかは公式ページだけでは断定しない。
  - id: social_insurance_gap
    reason: 転職時の社会保険空白期間や任意継続・国保切替遅れの評価は個別判断。
  - id: route_specific_material_periods
    reason: 配偶者ルート、高度人材ルートなどは提出対象期間が異なる場合があるため、該当する公式ページで確認する。
related_links:
  - title: "永住許可に関するガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住許可ガイドライン"
    locator: "ページ内「公的義務」「消極的に評価」"
    relation: "official_reference"
  - title: "永住許可申請（就労資格）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住許可申請（就労資格）"
    locator: "ページ内「公的年金及び公的医療保険」「直近（過去２年間）」"
    relation: "official_reference"
evidence_points:
  - claim: "永住許可ガイドラインでは、公的義務として納税・公的年金・公的医療保険料の納付等を適正に履行していることが求められる。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "国益要件「公的義務」"
    display_label: "永住申請：公的義務の履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "申請時点で納税（納付）済みでも、当初の納税（納付）期間内に履行されていない場合は、原則として消極的に評価される。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "公的義務の履行についての注意書き"
    display_label: "遅延納付は補納後も消極評価"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "就労資格からの永住許可申請ページでは、住民税の納付状況は直近5年分、公的年金・公的医療保険の納付状況は過去2年分の資料が掲げられている。"
    source_title: "永住許可申請（就労資格）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7 所得及び納税状況 / 8 公的年金及び公的医療保険"
    display_label: "就労資格ルートの永住資料：住民税5年・年金/医療保険2年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住許可では、納税・公的年金・公的医療保険料などの公的義務を適正に履行していることが求められる。申請時点で納付済みでも、当初の納付期限内に履行されていない場合は原則として消極的に評価される。

就労資格からの永住許可申請ページでは、住民税は直近5年分、公的年金・公的医療保険は過去2年分の納付状況資料が掲げられている。ただし、申請ルートにより提出期間や資料が変わる場合があるため、該当ページで確認する。

## must_say

- 永住では税・公的年金・公的医療保険料などの公的義務履行が重要。
- 申請前に追納しても、期限内に履行していない事実は原則として消極的に評価される。
- 就労資格ルートでは、住民税5年分、年金・公的医療保険2年分の資料が掲げられている。
- 免除・猶予・転職空白・自由業の記録は、未納と同一視せず、個別に確認する。

## must_not_say

- 申請前に払えば問題ない。
- 一般永住は全ルート一律で年金2年・住民税3年だけ見ればよい。
- 免除・猶予は未納と同じ、または完全に安全。
- 未納や遅延があると必ず不許可。

## common_user_phrases

- 永住前に年金を追納した
- 国民年金を払っていない月がある
- 年金免除は永住に影響するか
- 住民税を遅れて払った
- 永住は年金を何年見るか
- 健康保険の空白がある

## injection_format

### injection_certain_block

```text
【永住申請と公的義務／{{TODAY_ISO}} 公式】
・永住許可ガイドラインでは、納税・公的年金・公的医療保険料などの公的義務を適正に履行していることが求められる。
・申請時点で納税（納付）済みでも、当初の納付期限内に履行されていない場合は、原則として消極的に評価される。
・就労資格からの永住許可申請ページでは、住民税は直近5年分、公的年金・公的医療保険は過去2年分の納付状況資料が掲げられている。
・免除・猶予・転職時の空白・自由業の記録がある場合は、AIで許可見込みを断定せず、資料を揃えて行政書士に確認する。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop20 | 一般化しすぎた2年/3年 claim を撤回し、永住ガイドラインの公的義務・遅延納付消極評価と就労資格ルートの提出資料に限定して runtime 昇格。 | ai_extracted | ai_verified | loop20-rewrite |
| 2026-05-18 | Codex Loop19 | L5_ONLY until general 永住 source periods and exemption/gap handling are rewritten. | ai_extracted | ai_extracted | loop19-bucket |
