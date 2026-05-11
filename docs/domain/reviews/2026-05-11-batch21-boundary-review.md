# DOMAIN Boundary Review — Batch 21
## fact-card boundary check / 2 新規カード

**Date**: 2026-05-11
**Auditor**: DOMAIN-CC (claude-sonnet-4-6)
**Branch**: feat/cycle2-batch2-coverage (commit 8b794dd)
**Protocol**: DOMAIN_AUDIT_PROTOCOL_v1.md + DOMAIN_CLAIM_GUARDRAILS.md

---

## Summary

| Card | Verdict | Injection OK? | Priority |
|------|---------|--------------|----------|
| tensyoku-zairyu | **PASS** | YES | — |
| gaikokujin-koyo-todokede | **PASS** | YES | — |

---

## Card 1: tensyoku-zairyu

```yaml
verdict: pass
risk_level: —
```

**審査結果**: 合格。injection_certain_blockの品質は高い。

1. **14日届出・法令根拠** — `direct_fact_fields` に ISA 公式直接引用：「契約機関との契約が終了した場合、新たな契約を締結した場合は、１４日以内に…届出を行う必要があります」「出入国管理及び難民認定法第１９条の１６第２号」。条文番号・引用文ともに官庁ページから直接取得済み。injection_certain_block でも同様に明示。✅

2. **届出方法（オンライン・窓口・郵送）** — 3方式すべて ISA 公式確認済み。「オンライン届出では資料提出不要」も「届出事項を証する資料の提出は必要ありません」という ISA 公式引用あり。injection_certain_block に正確に反映。✅

3. **在留資格変更要否の境界** — 変更要否判断はすべて ai_inferred_fields に隔離。injection_certain_block の「回答時の注意」に「在留資格変更の要否は転職先業務内容による（ai推定のため断定しない）」と明示。needs_review_addendum に「転職先業務が在留資格範囲内かの具体的判断基準（`zairyu_henko_youhi_criterion`）」を正しく格納。injection_certain_block は届出義務の事実のみで構成。✅

4. **届出不履行罰則** — `tensyoku_misdelivery_penalty` needs_review_flag で「条文根拠の公式確認要」として正しく保留。injection_certain_block に罰則断言なし。✅

**注意点（修正不要・記録のみ）**:

- body の「転職と在留資格変更の要否（ai推定）」テーブル（「IT→コンサル等は14日届出のみ」等）は LLM の文脈情報として機能しうる。injection_certain_block には含まれていないが、具体例の単純化が誤解を招く可能性がある。特に「技人国業務→同じ技人国業務」という括りは、実際の業務適合性判断が必要なケースを簡略化しすぎている。injection_certain_block の「断定しない」注意文で制御されているため今回は記録のみ。

- ai_inferred_fields に「届出を14日以内に行わなかった場合、在留資格取消の理由とはならない」とある。これは一般的に正しいが公式確認済みでない。injection_certain_block には含まれていない。「在留資格取消にならない」という安心感を与える推定は慎重に扱うこと。

---

## Card 2: gaikokujin-koyo-todokede

```yaml
verdict: pass
risk_level: —
```

**審査結果**: 合格。injection_certain_block の構成が今セッション審査分で最も正確。

1. **30万円罰金** — MHLW公式：「届出を怠ったり、虚偽の届出を行った場合には、30万円以下の罰金の対象となります」の直接引用。injection_certain_block にも引用形式で記載。`todokede_houreijoubun` needs_review_flag で条文番号（第28条・第41条等）は確認要として正しく保留 — ただし罰金額・行為内容の記述は公式引用済みのため injection_certain_block に含めることは適切。✅

2. **届出期限（被保険者/非被保険者）** — 雇入れ翌月10日・離職翌日から10日以内（被保険者）、翌月末日（非被保険者）のいずれも MHLW 公式確認済み。injection_certain_block に 3パターンの期限を正確なマトリックスで記載。must_not_say で「どの外国人も翌月末日」という混同を禁止。✅

3. **対象外（特別永住者・外交・公用）** — MHLW 公式：「外国人労働者（在留資格「外交」、「公用」及び特別永住者を除く）」の直接引用。injection_certain_block に明示。must_not_say で「特別永住者も届出が必要」を禁止。✅

4. **在留カード写し添付不要** — 「届出の際には、在留カード等の写しの添付は不要です」MHLW公式引用。injection_certain_block に含む。must_not_say で「コピーを添付する必要がある」を禁止。✅ これは実務上の誤解が多い点で、correctly flagged。

5. **injection_certain_blockの冒頭宣言** — 「以下はMHLW公式情報（労働施策総合推進法）に基づく現行ルール」という宣言と、ブロック内容が整合している（ai推定は一切含まれていない）。PR #122の tankizai-henko で指摘した「冒頭宣言と内容の矛盾」の問題は本カードには存在しない。✅

**注意点（修正不要・記録のみ）**:

- `jisseki_touroku_gaijin_haken`（派遣社員の届出義務者が派遣元か派遣先か）はneeds_reviewに正しく隔離され、injection_certain_blockから除外済み。ただし、派遣就労は外国人労働者の中で相当数を占めており、実務上の問い合わせ頻度が高い。FACT による早期確認を推奨（P2）。

- ai_inferred_fields の「届出義務は短時間アルバイトの場合も含む（様式第3号）」はbodyに留まり injection_certain_block には含まれていない。injection_certain_block では「被保険者でない者 → 様式第3号 → 翌月末日」として構造的に処理されており、「アルバイトも対象」という断言なしで実質的に正しい案内が可能な構成になっている。✅

---

## Batch 21 全体評価

**Merge可否**: 即時Merge可

両カードとも injection_certain_block は公式引用のみで構成。ai推定は needsreview_addendum または body に正しく隔離。前回フラグした構造問題（冒頭宣言とai推定の矛盾、must_sayへのai推定混入）は本 Batch では発生していない。FACT-OPS の改善が確認できる。

**FACTへの申し送り**:

| ファイル | 未解消 needs_review | 実務的重要度 |
|---------|-------------|------------|
| tensyoku-zairyu | `zairyu_henko_youhi_criterion`（変更要否判断基準） | P1 — 最頻出質問の核心 |
| tensyoku-zairyu | `tensyoku_misdelivery_penalty`（届出不履行の条文） | P2 |
| gaikokujin-koyo-todokede | `jisseki_touroku_gaijin_haken`（派遣社員の義務者） | P2 — 実務頻度高い |
| gaikokujin-koyo-todokede | `todokede_houreijoubun`（条文番号） | P3 — 実害なし |

---

*DOMAIN-CC 専業判断。工程実装なし。DOMAIN_CLAIM_GUARDRAILS.md v0.1 に準拠。*
