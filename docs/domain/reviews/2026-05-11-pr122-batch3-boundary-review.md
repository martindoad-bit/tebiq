# DOMAIN Boundary Review — PR #122 Batch 3
## fact-card boundary check / 2 新規カード

**Date**: 2026-05-11
**Auditor**: DOMAIN-CC (claude-sonnet-4-6)
**PR**: feat/cycle2-batch2-coverage → main（Batch 3追加分）
**Protocol**: DOMAIN_AUDIT_PROTOCOL_v1.md + DOMAIN_CLAIM_GUARDRAILS.md
**Task**: 新規2カードの professional boundary check — not rewrite, not UI, not prompt

---

## Summary

| Card | Verdict | Injection OK? | Priority |
|------|---------|--------------|----------|
| rishoku-kenko-hoken | **PASS** | YES | — |
| gijinkoku-koushin-shorui | **NEEDS_PATCH** | CONDITIONAL（CEFR B2注記修正後） | P2 |

---

## Card 1: rishoku-kenko-hoken

```yaml
verdict: pass
risk_level: —
```

**審査結果**: 合格。4つの核心チェックすべて通過。

1. **任意継続20日・国保14日の正確性** — `direct_fact_fields` に両者とも公式ソース（協会けんぽ・厚労省）から直接引用済み。injection_certain_blockでも両期限を明示。✅

2. **超期・未手続きの影響範囲** — `kokuho_late_application` needs_review_flagで「遡って保険料を納める」の厚労省記載は確認済みとして分類。「医療費は全額自己負担となる場合がある」はbodyにai推定として留まり、injection_certain_blockからは除外。needs_review_addendumに「医療費返還範囲は市区町村依存」として正しく隔離。✅

3. **国民年金との境界** — `does_not_cover`に「退職後の国民年金切換（rishoku-kokumin-nenkin-kirikae 参照）」を明示。injection_certain_blockに年金への言及なし（健保のみ）。境界分離は完全。✅

4. **外国人の適用範囲** — `direct_fact_fields`に「外国人籍の方も同様に加入しなければなりません。ただし、在留資格と在留期間が適切な方に限ります」（厚労省引用）を確認済み。injection_certain_blockに「住民票登録のある在留資格保持者は加入対象」と明示。must_not_sayで「外国人は国民健康保険に入れない」を禁止。✅

**注意点（修正不要・記録のみ）**:
- `kenpo_kumiai_difference` needs_review_flagで大企業系健保組合のルール差異を正しく保留。does_not_coverで「健保組合（大企業系）はルールが異なる場合あり」と明記。injection_certain_blockから健保組合の詳細は除外済み。
- `injection_certain_block`の「任意継続は20日を過ぎると申請不可」は直接引用ではなく期限の帰結だが、期限が「20日以内」と公式確認済みであり、超過=申請不可は定義上自明のため問題なし。
- 任意継続と国保の保険料比較がai推定として正しく分離され、needs_review_addendumに留まっている。「断定しない」という注意文も injection_certain_blockの「回答時の注意」に明示されている。

---

## Card 2: gijinkoku-koushin-shorui

```yaml
verdict: needs_patch
risk_level: P2

claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block に以下が含まれている：
    「2026年4月15日以降の新設要件（転職後申請者）：CEFR B2以上の語学能力証明書」

    しかし `cefr_b2_category_scope` needs_review_flag で
    「適用対象者の正確な範囲（カテゴリー3・4の転職後申請者のみか、
    それとも他にも適用があるか）はISA公式の通知原文で確認要」とされている。

    injection_certain_blockは「以下は出入国在留管理庁の公式情報に基づく現行制度」と
    宣言しているにもかかわらず、適用範囲が未確認の新設要件を
    「転職後申請者」という括りで確定的に記述している。
    適用範囲が誤っていた場合、CEFR B2証明が不要なユーザーに
    不必要な書類準備を指示したり、逆に必要なユーザーに準備漏れが生じるリスクがある。
  corrected_boundary: >
    CEFR B2新設要件が存在すること（2026-04-15施行）は示してよい。
    ただし適用対象者の範囲については「詳細はISA公式ページで確認要」と
    明示してから案内すること。injection_certain_blockでの断定的な括り
    （「転職後申請者」）は修正が必要。
  applies_when: >
    CEFR B2を断定的に記述してよい場合：
    `cefr_b2_category_scope` needs_review が解消され、
    ISA公式通知で適用対象・証明書類が明確になった後。
  does_not_apply_when: >
    現状（`cefr_b2_category_scope` 未解消）：
    injection_certain_blockで適用対象者を断定的に記述しない。
  source_or_basis: >
    needs_review_flags.cefr_b2_category_scope:
    「適用対象者の正確な範囲はISA公式の通知原文で確認要」
    docs/fact-cards/README.md: injection_certain_block =
    「公式ソース確認済みとして注入されるブロック」

user_action_boundary:
  can_do_without_handoff: >
    「2026年4月15日以降、技人国更新に語学証明要件が新設された」は言える。
    「詳細な適用範囲・必要書類はISA公式ページまたは入管窓口で確認を推奨する」は言える。
    申請時期（3か月前）・処理期間（2週間〜1か月）・共通必須書類は言える。
  should_handoff_before: >
    「自分がCEFR B2証明の対象者かどうか」の判断は
    申請者のカテゴリー・転職有無・業務内容等による個別判断が必要。
    複雑なケースでは行政書士への相談を推奨。
  must_not_be_told: >
    「すべての転職後申請者にCEFR B2証明が絶対に必要」（適用範囲未確認）
    「CEFR B2を満たさなければ更新不可」（ISA最新通知で確認要）
    「手数料は4,000円（または6,000円）」（`fee_amount_confirmation`未確認）

fact_card_patch:
  file: docs/fact-cards/gijinkoku-koushin-shorui.md
  add: >
    injection_certain_block の CEFR B2記述を以下に変更：
    「2026年4月15日以降の新設要件（適用範囲確認要）：
    語学能力証明書（CEFR B2以上）が一部申請者に新たに必要。
    具体的な適用対象・証明書類はISA公式通知または窓口で確認要」
  remove_or_narrow: >
    injection_certain_blockから「転職後（カテゴリー3・4）の申請者」という
    断定的な括りを削除。
    needs_review_addendum に「CEFR B2適用対象・証明書類の詳細（確認要）」を追記。
```

### 修正点 2（記録のみ・修正不要）: 住民税証明書の「共通必須書類」表記

direct_fact_fieldsに「住民税の課税（非課税）証明書および納税証明書 各1通」が
「共通必須書類」として記載されているが、ai_inferred_fieldsに
「カテゴリー1・2（上場企業・一定規模法人等）は書類が簡略化される場合がある（ai推定）」とある。
injection_certain_blockでは「共通必須書類（全カテゴリー）」の中に住民税証明書が含まれており、
カテゴリー1・2での省略可能性と齟齬がある。
ただし必要書類を過剰に準備することは安全方向のため、production riskは低い。
将来的には「カテゴリー1・2は一部書類省略可の場合あり（ISA確認要）」を
injection_certain_blockの注意文に追記することで精度向上。

### 修正点 3（記録のみ）: risk_level: high の human audit queue

README state machine: risk_level: high は `ai_verified` で
「production injection + human audit queue」に入る。
本カードはcontrolled_alpha_eligible: false で適切。
CEFR B2 needs_reviewパッチ後は DOMAIN が human_reviewed への
state変更を判断するか、PL に通知することを推奨。

### injection_certain_blockに入れてはいけない文

- 「転職後（カテゴリー3・4）の申請者にはCEFR B2証明書が必要」（適用範囲`cefr_b2_category_scope`未確認）
- 「手数料は4,000円」または「手数料は6,000円」（`fee_amount_confirmation`未確認・金額未確定）
- カテゴリー1・2の書類簡略化の具体的内容（ai推定）
- オンライン申請の具体的手順・対象者資格（ai推定・`online_application_details`未確認）

---

## Batch 3 新規カード 全体評価

**Merge可否**: 条件付き可

- **即時Merge可能**: `rishoku-kenko-hoken`
- **Merge前にpatch必要**:
  1. `gijinkoku-koushin-shorui` P2: injection_certain_blockのCEFR B2記述を「適用範囲確認要」付きの表現に変更

**Codex作業指示（Merge前に必要）**:

| ファイル | 変更内容 | Priority |
|---------|----------|----------|
| gijinkoku-koushin-shorui.md | injection_certain_blockのCEFR B2記述から「転職後（カテゴリー3・4）」という断定的な括りを削除し、「適用範囲はISA確認要」に変更。needs_review_addendumに「CEFR B2適用範囲・証明書類（詳細確認要）」を追記 | P2 |

---

*DOMAIN-CC 専業判断。工程実装なし。DOMAIN_CLAIM_GUARDRAILS.md v0.1 に準拠。*
