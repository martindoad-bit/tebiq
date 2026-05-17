---
fact_id: zairyu-card-return-gimu
title: 在留カード返納義務（資格喪失・期限切れ・死亡・再入国期限超過）
state: ai_verified   # LOOP2 2026-05-17: source repaired to ISA返納 page; narrow return-duty fact
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
reviewer:
sprint: "fact-window-bulk-1"
citation_label: "在留カード返納義務"
citation_summary: "在留資格を失った日・在留カード失効した日から14日以内に返納する義務がある。死亡時は親族・同居者が責任を負う。違反は罰金対象。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住者が帰化または出国により在留資格を失った"
  - "本人が日本で死亡し、家族が在留カードをどうすればよいか聞いている"
  - "再入国許可期限超過で在留資格を失った"
does_not_cover:
  - "在留カード紛失・盗難時の再交付（別カード参照）"
  - "退去強制時の在留カード回収手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    label: ISA — 在留カード等の返納
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者・特別永住者
  - 死亡時の親族・同居者
direct_fact_fields:
  - 返納期限：失効した日から14日以内（ISA公式）
  - 違反時：罰則（罰金）の可能性あり（ISA公式）
  - 返納方法①：住所地を管轄する地方出入国在留管理官署へ直接持参
  - 返納方法②：東京出入国在留管理局 おだいば分室へ郵送（参考書式・返納理由を証する文書を添付）
  - 死亡時：親族または同居者が返納責任を負う
ai_inferred_fields:
  - 帰化・出国・再入国期限超過が「失効した日」の典型例
  - 郵送時には簡易書留など追跡可能な方法が推奨される（ai推定）
needs_review_flags:
  - penalty_amount_specifics
  - mailing_method_recommendation
  - special_permanent_resident_certificate_diff
related_links:
  - title: "ISA — 在留カード等の返納"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 在留カード等の返納"
    locator: "ページ内「14日以内に返納」"
    relation: "official_reference"
evidence_points:
  - claim: "中長期在留者または特別永住者の資格を失った場合、有効期限が切れた場合、再入国許可の期限内に帰国しなかった場合などに、失効した日から14日以内の返納が必要。死亡時は親族または同居者が返納責任を負う。"
    source_title: "ISA — 在留カード等の返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「14日以内」「親族または同居者」"
    display_label: "返納14日以内・死亡時は親族責任"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報に基づく。返納義務は資格喪失・期限切れ・再入国期限超過時に発生。

## current_effective_fact

在留カードは「失効した日から14日以内」に返納が必要。死亡時は親族または同居者が責任を負う。期限超過は罰則対象。

## exceptions_or_transition

- 死亡：親族・同居者が代理返納
- 郵送可（東京入管おだいば分室宛）

## common_user_phrases

- 在留カード 返納
- 死亡 在留カード どうする
- 永住者 帰化後 在留カード
- 在留カード 期限切れ 返納

## must_say

- 失効から14日以内
- 死亡時は親族・同居者が責任
- 違反は罰則対象

## must_not_say

- 「期限切れ後そのままにしていい」（誤り）
- 「死亡したら自動で抹消される」（誤り、家族の返納義務あり）

## qa_cases

**Q: 家族が亡くなりました。在留カードはどうすればいい？**
A: 死亡から14日以内に親族または同居者が返納する必要があります。住所地を管轄する地方入管に直接持参するか、東京入管おだいば分室に郵送してください。

## injection_format

### injection_certain_block

```text
【在留カード返納義務／ {{TODAY_ISO}} 公式確認】
・期限：失効から14日以内
・死亡時：親族・同居者が責任
・違反：罰則対象
・方法：管轄地方入管 / 東京入管おだいば分室郵送
```

### injection_needs_review_addendum

```
※ 罰金の具体的金額・特別永住者証明書の取扱差異は確認要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成（ai_extracted）。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop2 | 返納ページURLを修正し、返納14日義務としてruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
