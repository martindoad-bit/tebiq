---
fact_id: startup-visa-keiei-transition
title: スタートアップビザ（特定活動）から経営・管理への在留資格変更
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-18
reviewer: codex_fact_rewrite
sprint: Knowledge Runtime Loop18
citation_label: "スタートアップビザ→経営管理変更"
citation_summary: "外国人起業活動促進事業（スタートアップビザ）の最長2年、認定団体の管理・支援、経営・管理への変更、2025年10月16日改正前後の確認証明書交付日による取扱いを示すカード。起業完了の実質判断や未完了時対応はDOMAIN確認。"
source_display_names:
  - "出入国在留管理庁"
  - "経済産業省"
applies_when:
  - "外国人起業活動促進事業（スタートアップビザ / 特定活動44号）から経営・管理への変更を検討している"
  - "スタートアップビザの期限、認定団体、確認証明書、新旧経営管理基準の接続を確認したい"
does_not_cover:
  - "経営・管理の全要件判断"
  - "起業活動完了の実質判断"
  - "2年内に起業活動が完了しない場合の救済・再申請戦略"
official_sources:
  - id: moj-isa-nyuukoku07-00001
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00001.html
    title: 本邦の大学等を卒業した留学生による起業活動に係る措置について
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-18
    quoted_in_card: true
  - id: meti-startupvisa
    url: https://www.meti.go.jp/policy/newbusiness/startupvisa/index.html
    title: スタートアップビザ（外国人起業活動促進事業）
    publisher: 経済産業省
    last_checked_at: 2026-05-18
    quoted_in_card: true
  - id: moj-isa-keiei-kanri-reform
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-18
    quoted_in_card: true
  - id: meti-startupvisa-20251016
    url: https://www.meti.go.jp/policy/newbusiness/startupvisa/startupvisa_20251016.pdf
    title: 外国人起業活動促進事業 令和7年10月16日改正資料
    publisher: 経済産業省
    last_checked_at: 2026-05-18
    quoted_in_card: true
applies_to:
  - 外国人起業活動促進事業（スタートアップビザ / 特定活動44号）の保持者
  - 本邦大学等卒業後の起業準備活動制度を利用している者
  - 上記から経営・管理への在留資格変更を検討している者
direct_fact_fields:
  - startup_visa_max_2years
  - certified_body_management_support
  - monthly_progress_confirmation
  - keiei_kanri_change_after_startup_activity
  - old_or_new_keiei_standard_by_confirmation_certificate_date
ai_inferred_fields: []
needs_review_flags:
  - id: kigyou_kanryo_definition
    reason: "「起業活動が完了した」の具体的判断（法人登記、事務所、売上、雇用、許認可等のどこまでを必要とするか）は公式ページだけでは完結しない。"
  - id: uncompleted_activity_before_2years
    reason: "最長2年内に起業活動を完了できない場合の在留処理・再申請可能性は本カードで判断しない。"
  - id: certificate_date_edge_cases
    reason: "確認証明書、更新用確認証明書、補正中案件、変更申請受付日の交錯は個別確認が必要。"
related_links:
  - title: "本邦の大学等を卒業した留学生による起業活動に係る措置について"
    url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00001.html"
    organization: "出入国在留管理庁"
    display_label: "留学生起業活動措置"
    relation: "official_reference"
  - title: "スタートアップビザ（外国人起業活動促進事業）"
    url: "https://www.meti.go.jp/policy/newbusiness/startupvisa/index.html"
    organization: "経済産業省"
    display_label: "METI スタートアップビザ"
    relation: "official_reference"
  - title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    organization: "出入国在留管理庁"
    display_label: "経営・管理 2025年改正"
    relation: "official_reference"
evidence_points:
  - claim: "スタートアップビザ（起業準備活動）の在留期間は最長2年であり、その期間内に起業活動を完了する必要がある。起業活動完了後は経営・管理への在留資格変更許可申請を行う。"
    source_title: "本邦の大学等を卒業した留学生による起業活動に係る措置について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「最長２年間」「起業活動を完了」「経営・管理への在留資格変更許可申請」"
    display_label: "最長2年・起業完了後は経営管理変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "外国人起業活動促進事業では、経済産業大臣認定の地方公共団体又は民間事業者による管理・支援の下で起業準備活動を行う。METIページは認定団体リストと、認定団体が起業準備活動について毎月1回以上進捗確認する旨を示す。"
    source_title: "スタートアップビザ（外国人起業活動促進事業）"
    source_url: "https://www.meti.go.jp/policy/newbusiness/startupvisa/index.html"
    source_organization: "経済産業省"
    source_locator: "ページ内「認定団体一覧」「毎月１回以上」「進捗状況の確認」"
    display_label: "認定団体の管理・支援と進捗確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "ISAの経営・管理2025年改正ページは、特定活動44号（外国人起業家 / スタートアップビザ）から経営・管理へ変更する場合、2025年10月15日以前に確認証明書が交付されていれば改正前基準、改正告示施行日以降に確認証明書が交付されていれば改正後基準を適用すると示す。"
    source_title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「特定活動（４４号・外国人起業家（スタートアップビザ））からの資格変更」"
    display_label: "確認証明書交付日で新旧経営管理基準を区分"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# スタートアップビザ（特定活動）から経営・管理への在留資格変更

> Runtime scope: narrow official facts only. Do not use this card to judge
> approval probability or whether the user's business is already "completed".

## current_effective_fact

スタートアップビザ（外国人起業活動促進事業 / 特定活動44号を含む起業準備活動）は、経済産業大臣認定の地方公共団体又は民間事業者による管理・支援の下で起業準備活動を行う制度である。

在留期間は最長2年であり、その期間内に起業活動を完了する必要がある。起業活動が完了した後は、経営・管理への在留資格変更許可申請を行う。

2025年10月16日の経営・管理基準改正との関係では、特定活動44号（外国人起業家 / スタートアップビザ）から経営・管理へ変更する場合、確認証明書の交付日で新旧基準の扱いが分かれる。2025年10月15日以前に確認証明書が交付されている場合は改正前基準、改正告示施行日以降に確認証明書が交付されている場合は改正後基準を適用するとISAページが示している。

## injection_format

### injection_certain_block

```text
スタートアップビザ（外国人起業活動促進事業 / 特定活動44号を含む起業準備活動）は、認定団体の管理・支援の下で起業準備を行う制度です。在留期間は最長2年で、その期間内に起業活動を完了し、完了後は「経営・管理」への在留資格変更許可申請を行う必要があります。

2025年10月16日の経営・管理基準改正との関係では、特定活動44号から経営・管理へ変更する場合、確認証明書の交付日で新旧基準の扱いが分かれます。2025年10月15日以前に確認証明書が交付されていれば改正前基準、改正告示施行日以降に交付されていれば改正後基準を適用するとISAページが示しています。

ただし、「起業活動が完了した」といえるか、2年内に完了できない場合の在留処理、確認証明書・更新用確認証明書・補正中案件が絡む個別判断は、このカードだけで結論を出さず、認定団体または行政書士に確認してください。
```

## must_say

- 在留期間は最長2年。
- 認定団体の管理・支援下で起業準備活動を行う。
- 起業活動完了後は経営・管理への在留資格変更許可申請が必要。
- 特定活動44号から経営・管理への変更では、確認証明書交付日によって2025年改正前後の基準適用が分かれる。
- 起業完了の実質判断や未完了時の対応は専門確認。

## must_not_say

- 「スタートアップビザから経営管理へ自動で切り替わる」
- 「2年を超えて当然に延長できる」
- 「確認証明書があれば経営管理の許可が保証される」
- 「500万円基準で必ず足りる」
- 「会社設立だけで起業活動完了」

## common_user_phrases

- startup visa 怎么转经管签
- 创业特定活动签证快到2年了
- 创业签转经营管理签
- 外国人创业活动促进事业
- 特定活动44号 经管
- 确认证明书 旧标准 新标准
- スタートアップビザ 経営管理 変更
- 外国人起業活動促進事業 確認証明書

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop18 | METI/ISA公式ページでsource repair。最長2年、認定団体、特定活動44号変更時の確認証明書日付による新旧基準区分に限定してruntime化。 | ai_extracted | ai_verified | source_repair |
