# Formal Annotation Readiness Checklist

> **状態**：draft / needs GM review
> **版本**：v0.1（2026-05-05，DOMAIN-CC）
> **用途**：DOMAIN 正式 Round 1A 標注を開始する前に満たすべき条件の追跡リスト。
>
> GM が各条件の充足を確認し、産品負責人が正式標注開始を裁決する。

---

## 現在の総合状態

```
正式標注開始可否：❌ NOT READY
理由：FULL_COMPARABLE = 0（DeepSeek API timeout 未解決）
      Routing fix（Issue #18）未完了
```

---

## 条件一覧

### セクション 1：データ準備

| # | 条件 | 状態 | 詳細 |
|---|---|---|---|
| 1.1 | FULL_COMPARABLE ≥ 24 | ❌ **waiting** | 現在 0/30。DeepSeek API 回復 + Routing fix 後に再実行が必要 |
| 1.2 | routing regression 7/7 通過 | ❌ **waiting** | Issue #18（R01-R05）未完了 |
| 1.3 | sample classification がクリーン | ❌ **waiting** | TEBIQ_FALLBACK_SAMPLE と TEBIQ_ROUTING_FAILURE が混在した状態 |
| 1.4 | fallback（llm_timeout）が FULL_COMPARABLE に混入していない | ❌ **waiting** | 現在 17/30 が llm_timeout fallback |
| 1.5 | DeepSeek raw が追跡可能 | ❌ **waiting** | 現在 DeepSeek 0/30 success |
| 1.6 | TEBIQ output が追跡可能 | ✅ **ready** | TEBIQ 30/30 返却済み（fallback/OOS は別途処理）|

---

### セクション 2：DOMAIN 準備

| # | 条件 | 状態 | 詳細 |
|---|---|---|---|
| 2.1 | DOMAIN 標注テンプレートが就緒している | ✅ **ready** | `docs/eval/EVAL_ROUND1_ANNOTATION_RUBRIC.md` 存在 |
| 2.2 | DOMAIN 正式 Work Packet が就緒している | ✅ **ready** | `docs/eval/EVAL_DOMAIN_100Q_PACK.md` 存在（ただし未活性化）|
| 2.3 | score / severity / action の定義が確認されている | ✅ **ready** | EVAL_ROUND1_ANNOTATION_RUBRIC.md §2 に定義済み |
| 2.4 | 高リスク題の優先リストが就緒している | ✅ **ready** | DOMAIN_100Q_RISK_MATRIX.md で 51 題 HIGH 識別済み |
| 2.5 | must_have / must_not_have の参照資料が就緒している | ✅ **ready** | DOMAIN_RISK_PATTERNS.md（12 候補）+ TEBIQ_GOLDEN_CASES_SEED.md |
| 2.6 | handoff_trigger の参照資料が就緒している | ✅ **ready** | DOMAIN_VOICE_INPUT_PACK.md + TEBIQ_HANDOFF_TRIGGERS.md |

---

### セクション 3：産品品質ゲート

| # | 条件 | 状態 | 詳細 |
|---|---|---|---|
| 3.1 | LLM Health Check（5/5 Gate pass）が確認済み | ❌ **waiting** | `health-check.sh` 実行前 |
| 3.2 | Phased Rerun（Phase 1 probe 3/3 pass）が確認済み | ❌ **waiting** | `run-round1-phased.sh` 未実行 |
| 3.3 | 産品負責人が「正式標注開始」を裁決している | ❌ **waiting** | Precondition 1.1〜1.5 が満たされるまで裁決不可 |
| 3.4 | out_of_scope 7 条 regression が通過済み | ❌ **waiting** | Issue #18 完了後に確認 |

---

### セクション 4：比較・検証可能性

| # | 条件 | 状態 | 詳細 |
|---|---|---|---|
| 4.1 | DeepSeek raw と TEBIQ output が同一題で比較可能 | ❌ **waiting** | FULL_COMPARABLE = 0 |
| 4.2 | FULL_COMPARABLE サンプルが DOMAIN 正式標注フォームで開ける | ❌ **waiting** | データなし |
| 4.3 | TEBIQ_FALLBACK_SAMPLE が正式標注から除外されている | ❌ **waiting** | 現在全 30 題が fallback または OOS |
| 4.4 | TEBIQ_ROUTING_FAILURE が regression set と分離されている | ✅ **ready**（定義は就緒）| `EVAL_ROUND1_SAMPLE_PACK.md` v0.3 で分類定義済み |

---

## 阻塞原因サマリー

```
P0 阻塞（全項目クリアが必要）：
  - DeepSeek API timeout 未解決（Track A blocked）
  - Routing Safety Gate（Issue #18）未完了（Track C active）
  - FULL_COMPARABLE = 0

P1（並行で準備可能）：
  - DOMAIN 標注資産：✅ 準備完了
  - sample classification 定義：✅ 準備完了
  - ルーティング修正後の regression test：⏳ Issue #18 完了後
```

---

## 正式標注スタート可能になるためのステップ

```
Step 1: ENGINE が Issue #18（R01-R05）を完了
         → GM が 7 条 routing regression rerun を実行
         → DOMAIN が routing regression 語義複核を実施

Step 2: DeepSeek API が回復
         → GM が health-check.sh を実行（5/5 Gate pass）
         → GM が run-round1-phased.sh を実行

Step 3: FULL_COMPARABLE ≥ 24 が達成
         → sample classification が確認済み
         → fallback が除外されている

Step 4: 産品負責人が正式標注開始を裁決
         → DOMAIN が正式 Work Packet（EVAL_ROUND1A_DOMAIN_WORK_PACKET.md）を受け取る
         → 正式標注開始
```

---

## DOMAIN が現在すでに ready なこと（正式標注待ちではないもの）

| 項目 | 状態 |
|---|---|
| 100Q Risk Matrix（全題分類）| ✅ 完了（PR #25）|
| Risk Pattern Library（10 Pattern）| ✅ 完了（PR #25）|
| VOICE Input Pack v0.1 | ✅ 完了（Phase 3）|
| QA Gate Candidate Pack v0.1 | ✅ 完了（Phase 3）|
| Console Labels v0.1 | ✅ 完了（Phase 3）|
| Coverage Gap Review v0.1 | ✅ 完了（Phase 3）|
| Routing Regression 語義複核テンプレート | ✅ 完了（前フェーズ）|
| Pre-Eval Hypothesis Pack（H-01〜H-10）| ✅ 完了（前フェーズ）|

**DOMAIN は正式標注の準備が整っている。データと裁決を待っている状態。**

---

## 版本管理

| バージョン | 日付 | 変更内容 |
|---|---|---|
| v0.1 | 2026-05-05 | 初版。全条件の現状スナップショット。draft / needs GM review |

