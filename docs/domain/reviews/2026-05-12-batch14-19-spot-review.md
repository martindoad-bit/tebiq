# DOMAIN Spot Review — Batch 14〜19 高リスクカード抽検
## 新規45枚からリスク優先で10枚を選択審査

**Date**: 2026-05-12
**Auditor**: DOMAIN-CC (claude-sonnet-4-6)
**Branch**: feat/cycle2-batch2-coverage（commit 4634745〜）
**Protocol**: DOMAIN_AUDIT_PROTOCOL_v1.md + DOMAIN_CLAIM_GUARDRAILS.md
**選定基準**: risk_level=critical または high の新規カードを優先

---

## 審査サマリー

| Card | Batch | risk | Verdict | Priority |
|------|-------|------|---------|----------|
| overstay-taisho | 4（既存・Cycle 2パッチ） | critical | **BLOCK** | P1 |
| nyukoku-kyohi | 14 | high | **NEEDS_PATCH** | P2 |
| gaikokujin-seikatsu-hogo | 17 | high | **NEEDS_PATCH** | P2 |
| shinseichu-zairyu-keizoku | 17 | high | **PASS** | — |
| tokutei-ginou-haken | 18 | high | **PASS** | — |
| kyojusha-hantei-183 | 19 | high | **PASS** | — |
| ryugakusei-baito-28jikan | — | medium | **PASS** | — |
| sainyukoku-kyoka | 16 | high | **PASS** | — |
| eijuu-tokubetsu | 14 | high | **PASS** | — |
| kazoku-yobi-yose | 14 | medium | **PASS** | — |

---

## Card 1: overstay-taisho（critical）

```yaml
verdict: block
risk_level: P1
```

**問題1（P1・構造的）: injection_certain_block に ai推定が「公式情報」として混在**

```yaml
claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block の冒頭に
    「以下は出入国在留管理庁の公式情報に基づく現行ルール」と宣言されているが、
    同一ブロック内に以下の ai推定内容が含まれている：
    「罰則：3年以下懲役または300万円以下罰金【ai推定・法令照合要】」
    「再入国禁止：強制退去→原則10年 / 出国命令→5年【ai推定・法令照合要】」
    
    【ai推定・法令照合要】という注記はあるが、
    冒頭「公式情報に基づく」と宣言したブロックにこれらを含めると
    LLM がプロンプトを読んだ際に「公式確認済みの罰則・禁止期間」と
    解釈するリスクがある。
    特に risk_level=critical のカードでこの構造問題は許容できない。
  corrected_boundary: >
    injection_certain_block から罰則・再入国禁止期間の記述を削除し、
    needs_review_addendum に移動する。
    injection_certain_block は公式確認済み事実のみで構成する：
    - 出頭申告しても不法残留状態は即解消されない（公式）
    - 就労禁止（公式）
    - 在留特別許可は特別措置（許可保証なし）（公式）
    - 出国命令制度（収容なし帰国の可能性）（公式）
  source_or_basis: >
    docs/fact-cards/README.md: injection_certain_block =
    「公式ソース確認済みとして注入されるブロック」
    needs_review_flags.overstay_penalty_source:
    「入管法73条の直接ソース引用未取得・法令テキスト照合要」
    needs_review_flags.reentry_ban_period_source:
    「再入国禁止期間はai推定・法令テキスト照合要」

fact_card_patch:
  file: docs/fact-cards/overstay-taisho.md
  remove_or_narrow: >
    injection_certain_block から以下の2行を削除：
    「罰則：3年以下懲役または300万円以下罰金【ai推定・法令照合要】」
    「再入国禁止：強制退去→原則10年 / 出国命令→5年【ai推定・法令照合要】」
  add: >
    injection_needs_review_addendum に追記：
    「罰則（入管法73条）・再入国禁止期間（出国命令5年・強制退去10年）は
    ai推定・法令照合未完了のため断定しない。
    専門家（行政書士・弁護士）への相談を推奨する。」
```

**問題2（記録のみ）: critical カードの state machine**

risk_level=critical + state=ai_verified + controlled_alpha_eligible=false は
README state machine 上 production injection 不可（Alpha も PL sign-off なしでは不可）。
injection_certain_block の構造問題とは別に、このカードは現在
production に inject されていないはず。
上記構造修正完了後は PL に `controlled_alpha_eligible: true` 設定を要請するか、
`state: human_reviewed` への更新を行うことを推奨。

---

## Card 2: nyukoku-kyohi（high）

```yaml
verdict: needs_patch
risk_level: P2

claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block に「退去強制後：5年間の入国禁止（重大事案は10年または永久）」
    とある。「10年または永久」の部分は `10nen_jijo_detail` needs_review_flag
    （「10年禁止が適用される具体的ケースはDOMAIN確認要」）と矛盾している。
    injection_certain_block の末尾に「具体的な禁止期間・適用事案はDOMAIN/入管確認要」
    という注意文があるが、「10年または永久」という数値が
    ブロック前段に断定的に記載されている。
  corrected_boundary: >
    injection_certain_block の「重大事案は10年または永久」を削除し、
    「（重大事案はDOMAIN確認要）」に変更する。
    または「5年または10年以上」とし、needs_review_addendum で詳細を案内する。
  source_or_basis: >
    needs_review_flags.10nen_jijo_detail:
    「退去強制後10年の適用される具体的ケースはDOMAIN確認要」

fact_card_patch:
  file: docs/fact-cards/nyukoku-kyohi.md
  remove_or_narrow: >
    injection_certain_block の「退去強制後：5年間の入国禁止（重大事案は10年または永久）」を
    「退去強制後：5年間の入国禁止（重大事案は長期または永久禁止の可能性あり・詳細はDOMAIN確認要）」
    に変更。
```

**injection_certain_blockに入れてはいけない文**:
- 「退去強制後10年または永久の入国禁止」（10年適用基準 `10nen_jijo_detail` 未確認）
- 「外国刑法による禁錮以上の刑の具体的事例」（`kinko_ijyo_gaikoku` 未確認）

---

## Card 3: gaikokujin-seikatsu-hogo（high）

```yaml
verdict: needs_patch
risk_level: P2

claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block に「相談先：市区町村の福祉事務所（生活保護担当）」が含まれている。
    ただし `ai_inferred_fields` では「準用措置の申請先：
    市区町村の福祉事務所（生活保護担当）（ai推定）」と明示されており、
    公式ソースから直接確認されていない。
    injection_certain_block に ai_inferred の内容が混入している（軽度）。
  corrected_boundary: >
    「相談先」は正しい情報であることはほぼ確実だが、
    injection_certain_block からは削除し、
    「市区町村窓口に相談してください」程度の表現に留めるか、
    needs_review_addendum に「相談先は市区町村の福祉事務所（生活保護担当）が一般的」
    と記載する。
  source_or_basis: >
    ai_inferred_fields:「準用措置の申請先：市区町村の福祉事務所（生活保護担当）（ai推定）」
    official_sources: 厚生労働省の生活保護制度ページ（申請先の直接記述未確認）

fact_card_patch:
  file: docs/fact-cards/gaikokujin-seikatsu-hogo.md
  remove_or_narrow: >
    injection_certain_block の「・相談先：市区町村の福祉事務所（生活保護担当）」を
    「・相談：市区町村窓口（福祉担当）に問い合わせ」に変更。
    または needs_review_addendum に移動。
```

**injection_certain_blockに入れてはいけない文**:
- 「難民認定者への生活保護適用」（`nannmin_nintei_sha_hogo` 未確認）
- 「準用の対象在留資格の詳細リスト」（`junyo_taisho_zairyu_list` 未確認）

---

## Cards 4〜10: PASS（個別コメント）

**shinseichu-zairyu-keizoku（high）** — PASS ✅
- 特例2か月・就労継続可は ISA 公式確認済み。injection_certain_block は正確かつ簡潔。
- 注意（記録のみ）: `saitei_chingin_henko` needs_review（在留資格変更申請中の就労範囲）が
  未解消だが、injection_certain_block では「申請済み」と一般的な表現を使っており、
  変更申請のみに限定した表現は避けている。軽微な改善点として記録のみ。

**tokutei-ginou-haken（high）** — PASS ✅
- 「農業・漁業の2分野のみ派遣就労可」は ISA 公式確認済み。injection 適切。
- 「不正派遣：受入機関・派遣元・先が処罰対象」は正確（労働者派遣法・入管法規定）。

**kyojusha-hantei-183（high）** — PASS ✅
- 居住者定義・全世界所得課税・183日ルール（租税条約のある国のみ）は
  国税庁公式確認済み。injection_certain_block は正確。
- 183日ルールの具体的条件詳細が needs_review に正しく隔離。

**ryugakusei-baito-28jikan** — PASS ✅
- 週28時間・長期休業中1日8時間・風俗営業禁止は ISA 公式確認済み。
- 掛け持ちの合計時間カウントが needs_review_addendum に正しく隔離。

**sainyukoku-kyoka（high）** — PASS ✅
- みなし再入国1年・再入国許可最長5年・在留資格失効は ISA 公式確認済み。
- injection_certain_block が簡潔かつ正確。在留資格失効の⚠️表記は適切な注意喚起。

**eijuu-tokubetsu（high）** — PASS ✅
- 特別永住者証明書有効期間7年・更新手続き（市区町村）は ISA 公式確認済み。
- 注意（記録のみ）: 「退去強制：重大犯罪のみ（通常外国人より限定的）」という表現は
  ai推定の可能性があるが、injection_certain_block には含まれていない。

**kazoku-yobi-yose** — PASS ✅
- 在留資格別マトリックス（家族滞在・永住者の配偶者等等）と
  「特定技能1号 → 家族帯同原則不可」は ISA 公式確認済み。
- COE申請フロー（1〜3か月処理）は injection_certain_block に適切に記載。

---

## 全体評価

**新規 Batch 14〜19 の品質評価**: 概ね良好

injection_certain_block に ai推定を混入させないという構造規律は、
既存 Batch 4（overstay-taisho）との対比で明確に改善されている。
新規カードの大多数は公式引用のみで injection_certain_block を構成しており、
ai推定は needs_review_addendum に正しく格納されている。

**Codex 作業指示（Merge前に必要）**:

| ファイル | 変更 | Priority |
|---------|------|----------|
| overstay-taisho.md | injection_certain_block から罰則・再入国禁止期間（ai推定）を削除し needs_review_addendum に移動 | P1 |
| nyukoku-kyohi.md | injection_certain_block の「重大事案は10年または永久」を「詳細はDOMAIN確認要」に変更 | P2 |
| gaikokujin-seikatsu-hogo.md | injection_certain_block の「相談先：市区町村の福祉事務所」をより一般的な表現に変更 | P2 |

**抽検スコープ外（未審査）**: Batch 11〜13・一部 Batch 15〜19（low/medium リスク中心）。
次回 DOMAIN 周回時に順次確認推奨。特に以下は次回確認推奨：
- `tokutei-ginou-siken`（特定技能試験要件の具体的記述）
- `eijuu-shinsei-shorui`（永住申請書類の年数要件）
- `kika-shinsei`（帰化要件の緩和要件の境界）

---

*DOMAIN-CC 専業判断。工程実装なし。DOMAIN_CLAIM_GUARDRAILS.md v0.1 に準拠。*
