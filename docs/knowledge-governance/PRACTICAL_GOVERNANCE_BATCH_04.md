> # ⚠ INVALIDATED 2026-05-19 — 不可 ingest，不可注入 answer 系统
>
> 同 Batch 01。本批次产出未做事实核查、未对照 DOMAIN/guardrail 资产，ANSWER_RUNTIME 分桶不可信。
> 详见 `docs/knowledge-governance/PRACTICAL_GOVERNANCE_AUDIT_LOG.md`。

---

# Practical Governance Batch 04 [INVALIDATED]

> 治理対象: `docs/practical-fact-layer/cards/practical-151.md` 〜 `practical-200.md`
> 治理日: 2026-05-19
> 担当: 実務知識層治理窗口 (Claude)

---

## 1. 本轮范围

- **輸入カード数**: 50（practical-151 〜 practical-200）
- **source_type**: 全件 "official"
- **confidence**: 43 件 high、7 件 medium（practical-151 養子・162 賃貸・181 遺言・183 自己破産・186 保険・188 ローン・196 国際離婚）

---

## 2. 分桶結果

| Bucket | 数量 |
|---|---:|
| ANSWER_RUNTIME | 49 |
| MATERIALS_ONLY | 1（practical-194 業務内容証明書類） |
| LAW_SOURCE_ANCHOR | 0 |
| L5_ONLY | 0 |
| NEEDS_REWRITE | 0 |
| DUPLICATE | 0 |
| CONFLICT | 0 |
| REJECT | 0 |
| UNKNOWN | 0 |

---

## 3. 可進入 ANSWER_RUNTIME 的卡（要旨）

50 張中 49 張が ANSWER_RUNTIME。各カードの user_situation・short_answer・practical_rule は `docs/knowledge-governance/runtime/PRACTICAL_BATCH_04_RUNTIME_BLOCKS.md` を参照。

特に頻出度の高い P0 案件:
- practical-157: 経営管理の赤字更新（事業継続意思の立証）
- practical-163: 不許可後の異議申立・再申請
- practical-166: 配偶者ビザの偽装婚審査
- practical-178: 経営管理申請のタイミング（設立前後・短期滞在からの変更不可）
- practical-192: 失業時の総合対応（雇用保険＋3か月ルール）
- practical-199: DV被害者の在留資格保護

---

## 4. 可進入 MATERIALS_ONLY 的卡

| card_id | 材料/手続 | 復用場景 |
|---|---|---|
| practical-194 | 技人国申請の業務内容証明書類（在職証明・業務説明書の書き方ガイド） | 材料Tab・申請書類作成ガイド（practical-035, practical-138 等と連携） |

---

## 5. 法源錨点卡

該当なし。

---

## 6. 需要 DOMAIN 判断的問題

新規 DOMAIN 复核問題：該当なし。

**観察（confidence: medium カードへの注意）**:
- practical-151（養子縁組）: 国際養子は法律複雑、弁護士領域。Tebiq の安全表述では「弁護士相談必須」を強調。
- practical-162（賃貸）: 各保証会社規定に依拠。「外国人対応保証会社」リストは更新頻度高。
- practical-181（遺言書）: 国際遺言は準拠法問題で弁護士領域。
- practical-183（自己破産）: 在留への直接影響は限定的だが、経営管理保持者では更新困難リスク。
- practical-186（保険）: 各社規定依存。具体相談は各保険会社へ誘導。
- practical-188（ローン）: 各社審査基準依存。
- practical-196（国際離婚）: 準拠法・ハーグ条約の論点で弁護士領域。

---

## 7. 重複/合并建議

本バッチ内に重複・合并候補なし。

**Batch 01-04 横断の連携セット**:
- 永住申請関連: practical-010, 021, 060, 081, 087, 153, 200
- 配偶者ビザライフサイクル: practical-001-004, 034, 085, 105, 135, 166, 199
- 経営管理関連: practical-005, 006, 031, 064, 074, 089, 101, 113, 123, 144, 149, 157, 171, 178
- 帰化関連: practical-023, 069, 070, 145, 159, 168, 190
- 不法残留/オーバーステイ: practical-055, 137
- 失業・離職対応: practical-043, 067, 073, 104, 122, 124, 148, 192

これらは answer ランタイムで「topic」キーで横断クエリできる構造化を検討。

---

## 8. 本轮最有価値的 10 張卡

優先順位順:

1. **practical-157** — 経営管理の赤字更新（P0・経営者の典型 P0 案件）
2. **practical-163** — 不許可後の異議申立・再申請の現実（P0）
3. **practical-166** — 配偶者ビザ偽装婚審査（P0・別居の正当理由）
4. **practical-178** — 経営管理申請のタイミング（P0・短期滞在からの変更不可）
5. **practical-192** — 失業時の総合対応（P0・最頻出の緊急案件）
6. **practical-199** — DV被害者の在留資格保護（P0・人道的最重要案件）
7. **practical-153** — 永住の10年計算（P1・誤解多い計算ルール）
8. **practical-167** — 特定技能受入機関の支援計画義務（P1・雇用主側）
9. **practical-171** — 経営管理500万円要件（P1・借入・現物・共同出資の扱い）
10. **practical-189** — 指定書の役割（P1・特定活動・高度専門職の特殊性）

---

## 9. 本轮不能使用的高風險卡

該当なし。

**注意点**:
- confidence: medium の 7 件（151, 162, 181, 183, 186, 188, 196）は具体相談に弁護士・各社誘導を必ず付記。
- practical-199（DV被害者）は人道的最重要案件、専門機関への誘導を必ず併記。

---

## 10. Codex 主工程窓口への交付物

| 種別 | パス |
|---|---|
| Runtime blocks | `docs/knowledge-governance/runtime/PRACTICAL_BATCH_04_RUNTIME_BLOCKS.md` |
| Materials-only リスト | 本レポート §4 |
| DOMAIN queue | 新規追加なし |

---

## 次バッチ予告

- **Batch 05**: practical-201 〜 practical-250

---

## Handoff Note

- 完成日: 2026-05-19
- 担当: 実務知識層治理窗口 (Claude)
- 状態: 完了
- 累計治理進捗: practical-001〜200（200/646 = 31.0%）
