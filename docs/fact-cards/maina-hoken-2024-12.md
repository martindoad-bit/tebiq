---
fact_id: maina-hoken-2024-12
title: マイナ保険証 — 2024年12月2日以降の健康保険証として運用
state: ai_verified   # LOOP3 2026-05-17: rewritten to current 2026 MyNa/qualification-certificate operation
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "マイナ保険証"
citation_summary: "2024年12月2日以降、従来の健康保険証は新規発行されず、医療機関ではマイナ保険証または資格確認書等で資格確認する運用へ移行している。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "保険証 マイナンバー"
  - "マイナ保険証 切替"
does_not_cover:
  - "資格確認証の発行詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/newpage_08277.html
    label: 厚労省 — マイナンバーカードの健康保険証利用
    accessed: "2026-05-17"
applies_to:
  - 全ての健康保険被保険者
direct_fact_fields:
  - 施行日：2024年12月2日
  - 従来保険証：新規発行なし
  - マイナ保険証：マイナンバーカードに健康保険証利用登録
  - マイナ保険証を利用できない場合：資格確認書等で資格確認
ai_inferred_fields:
  - 医療機関の端末不具合時は保険者発行資料や窓口指示で対応する
needs_review_flags:
  - shikaku_kakunin_sho_validity_period
  - existing_hokensho_expiry_handling
  - oversea_use_of_maina_hoken
related_links:
  - title: "厚労省 — マイナンバーカードの健康保険証利用"
    url: "https://www.mhlw.go.jp/stf/newpage_08277.html"
    organization: "厚生労働省"
    display_label: "健康保険"
    locator: "マイナ保険証"
    relation: "official_reference"
evidence_points:
  - claim: "2024年12月2日以降、従来健康保険証は新規発行されず、マイナ保険証または資格確認書等で資格確認する運用へ移行している。"
    source_title: "厚労省 — マイナンバーカードの健康保険証利用"
    source_url: "https://www.mhlw.go.jp/stf/newpage_08277.html"
    source_organization: "厚生労働省"
    source_locator: "2024年12月"
    display_label: "マイナ保険証移行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

2024-12-02以降はマイナ保険証・資格確認書等で資格確認。

## must_say

- 2024-12-02以降は従来保険証の新規発行なし
- マイナ保険証または資格確認書等で資格確認
- マイナカード未取得でも資格確認書等のルートがある

## injection_format

### injection_certain_block

```text
- 2024年12月2日以降、従来の健康保険証は新規発行されていない。
- 医療機関では、マイナンバーカードに健康保険証利用登録をした「マイナ保険証」や、保険者から交付される資格確認書等で資格確認する運用になっている。
- マイナンバーカードを持っていない、または健康保険証利用登録をしていない場合でも、資格確認書等の案内を保険者に確認する。
- 出典: 厚生労働省「マイナンバーカードの健康保険証利用」 https://www.mhlw.go.jp/stf/newpage_08277.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 現在運用に書き換え、資格確認書ルートを明確化してruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
