# DOMAIN Top 10 抽検レビュー
## injection_certain_block 境界審査 / evidence_points 精修完了後の品質確認

**Date**: 2026-05-12
**Auditor**: DOMAIN-CC (claude-sonnet-4-6)
**Branch**: feat/cycle2-batch2-coverage
**Protocol**: DOMAIN_AUDIT_PROTOCOL_v1.md + DOMAIN_CLAIM_GUARDRAILS.md
**対象**: evidence精修完了（全100枚・3条体制）後のDOMAIN抽検推奨Top 10

---

## 審査サマリー

| # | Card | risk | state | Verdict | Priority |
|---|------|------|-------|---------|----------|
| 1 | tokuteiginou-ichigou-youken | high | ai_verified | **NEEDS_PATCH** | P1 |
| 2 | tokutei-ginou-koushin | high | ai_verified | **PASS** | — |
| 3 | minashi-sainyuukoku | critical | ai_verified | **NEEDS_PATCH** | P2 |
| 4 | ryugakusei-baito-28jikan | medium | ai_verified | **PASS** | — |
| 5 | ryugaku-koushin-shutsusekiRitsu | high | ai_verified | **PASS** | — |
| 6 | gaikokujin-seikatsu-hogo | high | ai_verified | **NEEDS_PATCH** | P2 *(Batch 14-19既出)* |
| 7 | shinseichu-zairyu-keizoku | high | ai_verified | **PASS** | — *(Batch 14-19確認済)* |
| 8 | spouse-divorce-separation | critical | human_reviewed | **PASS** | — |
| 9 | eijuu-haigusha-visa | high | ai_verified | **NEEDS_PATCH** | P2 |
| 10 | sainyukoku-kyoka | high | ai_verified | **PASS** | — *(Batch 14-19確認済)* |

---

## Card 1: tokuteiginou-ichigou-youken（high）

```yaml
verdict: needs_patch
risk_level: P1
```

**問題（P1・構造的）: injection_certain_block冒頭「公式情報に基づく」宣言とai推定の自己矛盾**

```yaml
claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block の冒頭に
    「以下は出入国在留管理庁の公式情報に基づく現行ルール」と宣言されているが、
    同一ブロック内に以下の ai推定内容が含まれている：
    「家族帯同：不可（特定技能2号は可）【ai推定・法令照合要】」
    「日本語要件：JFT-Basic合格またはJLPT N4以上（業種により異なる、介護は追加試験あり）【ai推定】」

    needs_review_flags:
    - family_accompaniment_prohibition_source: 1号の家族帯同不可は法令（入管法別表第1の2）で
      規定。直接ソース引用は未取得のため確認要。
    - japanese_language_test_by_sector: 日本語要件（JFT-Basic可否・N4の代替可否）は
      業種ごとに異なる。各業種の要件一覧の官庁ページ照合要。

    冒頭「公式情報に基づく」と宣言したブロックに ai推定を含めると、
    LLMが「公式確認済みの家族帯同禁止・日本語要件」として解釈するリスクがある。
    この構造問題は overstay-taisho（Batch 14-19）、tankizai-henko（PR #122 Batch 2）
    に続いて3件目の発生であり、FACT-OPS への再発防止指示が必要。

  must_say_contamination: >
    must_say にも「特定技能1号は家族帯同不可。配偶者・子を家族滞在で呼び寄せることができない」
    が含まれているが、これは family_accompaniment_prohibition_source needs_review未解消の
    ai推定内容を LLM への「必ず言え」強制命令として格上げしている。
    同様の問題を PR #122 Batch 2 で juminzei-kazei-shomeisho・nenkin-dattai-ichijikin にて指摘済み。

  corrected_boundary: >
    injection_certain_block の「家族帯同：不可【ai推定・法令照合要】」と
    「日本語要件：JFT-Basic合格またはJLPT N4以上【ai推定】」を削除し、
    needs_review_addendum に移動する。

    injection_certain_block は公式確認済み事実のみで構成する：
    - 在留上限：通算5年（更新可だが通算5年超不可）— ISA公式確認済み
    - 個別許可期間：最長3年（1回あたり）— ISA公式確認済み
    - 技能水準：「相当程度の知識又は経験を必要とする技能」— ISA公式引用
    - 対象業種（16分野）— ISA公式確認済み

    must_say からも「家族帯同不可」の断定的な記述を削除し、
    「injection_certain_blockの注意文」レベルに留める。
    「日本語要件はJFT-Basic合格またはJLPT N4以上（業種によって要求内容が異なる）」も
    must_sayから削除（needs_review未解消のため）。

  source_or_basis: >
    needs_review_flags.family_accompaniment_prohibition_source:
    「法令（入管法別表第1の2「特定技能」欄）で規定。直接ソース引用は未取得。」
    needs_review_flags.japanese_language_test_by_sector:
    「日本語要件（JFT-Basic可否・N4の代替可否）は業種ごとに異なる。各業種要件照合要。」
    docs/fact-cards/README.md: injection_certain_block = 「公式ソース確認済みとして注入されるブロック」

fact_card_patch:
  file: docs/fact-cards/tokuteiginou-ichigou-youken.md
  remove_from_injection_certain_block: >
    「家族帯同：不可（特定技能2号は可）【ai推定・法令照合要】」を削除
    「日本語要件：JFT-Basic合格またはJLPT N4以上（業種により異なる、介護は追加試験あり）【ai推定】」を削除
  add_to_needs_review_addendum: >
    「家族帯同（1号不可・2号可）：法令別表第1の2に基づくが条文直接引用未取得。
     断定せず『家族帯同については入管窓口または行政書士に確認ください』と案内する。」
    「日本語要件（JFT-Basic・N4等価）：業種ごとに要求内容が異なる。
     各分野所管省庁の公式情報で確認要。断定的に案内しない。」
  remove_from_must_say: >
    「特定技能1号は家族帯同不可。配偶者・子を「家族滞在」で呼び寄せることができない」を削除
    「日本語要件はJFT-Basic合格またはJLPT N4以上（業種によって要求内容が異なる）」を削除
  add_to_injection_certain_block_caution: >
    「家族帯同不可・日本語要件の詳細は確認中のため断定しない。
     入管窓口または行政書士への確認を推奨する旨を伝える。」
```

**再発について（記録）**:

injection_certain_block に冒頭「公式情報に基づく」と宣言しながら ai推定を含める
構造問題は、以下の3件で発生している：

| Card | Batch | Severity |
|------|-------|---------|
| tankizai-henko | PR #122 Batch 2 | P1 (既存指摘) |
| overstay-taisho | Batch 14-19 | BLOCK P1 (既存指摘) |
| tokuteiginou-ichigou-youken | Top 10 | P1 (今回) |

FACT-OPS に対して「injection_certain_block の冒頭宣言の際は、同一ブロック内の全行が公式確認済みであることを確認する。【ai推定】注記付き行を冒頭宣言ブロックに含めてはならない」のルール再周知を推奨。

---

## Card 2: tokutei-ginou-koushin（high）

```yaml
verdict: pass
risk_level: —
```

**審査結果**: 合格。injection_certain_blockの構成は適切。

1. **申請タイミング・費用・本人在留要件** — ISA 16-3.html からの直接引用：
   「在留期間の満了する概ね３か月前から」「6,000円（窓口）/ 5,500円（オンライン）」
   「申請人本人が日本に滞在していることが必要」— injection_certain_blockに正確に反映。✅

2. **押印不要** — 「原則として申請書を含む提出書類への押印は不要です」ISA直接引用済み。
   injection_certain_blockに含み、must_not_sayで「申請書に印鑑が必要」を禁止。✅

3. **ai推定の正しい隔離** — 特定技能1号通算5年上限・2号上限なしはともに ai推定であり、
   injection_certain_blockには含まれず、needs_review_addendumに正しく隔離されている。
   must_sayも「ai推定（法令照合要）と伝える」という手続き的指示に留まっており、
   ai推定内容を「必ず言え」命令として格上げしていない。✅

4. **冒頭宣言と内容の整合性** — 「以下は出入国在留管理庁の公式情報に基づく現行手続き」と
   宣言し、ブロック内容は全て ISA 16-3.html から公式確認済みの情報のみで構成。✅

**注意点（修正不要・記録のみ）**:

- `tokutei1_5nen_source`（特定技能1号通算5年上限の法令直接引用）・`tokutei2_no_limit_source`
  が needs_review 未解消。5年上限は特定技能制度の最重要情報であり、ユーザー問い合わせの
  核心事項。FACT による早期確認を推奨（P1）。現状では断定を避けた案内が適切。

---

## Card 3: minashi-sainyuukoku（critical）

```yaml
verdict: needs_patch
risk_level: P2
```

**問題（P2・軽度）: injection_certain_blockにai推定（在留期限が実質上限）が注記なしで含まれている**

```yaml
claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block に以下が含まれている：
    「在留期限が1年より前にある場合、実質的な上限は在留期限当日
    （在留期限を超えた在留継続は不可のため）」

    しかし `zairyu_kigen_upper_bound` needs_review_flag で
    「行政運用上の解釈として扱う。src-01に明示記述なし」とされており、
    ai推定（ai_inferred_fields: zairyu_kigen_as_upper_bound）として分類されている。

    本カードの冒頭は「以下は出入国在留管理庁の公式情報に基づく現行ルール」という
    過度な宣言がなく（「【みなし再入国許可・通常再入国許可 — 基本ルール（{{TODAY_ISO}} 時点）】」）、
    tankizai-henkoやoverstay-taishoほどの自己矛盾ではない。
    ただし、プロトコル上injection_certain_blockは公式確認済み情報のみで構成すべきであり、
    ai推定の注記なしに含めることは軽度の違反。

  severity_note: >
    「在留期限が実質上限」という情報は安全方向の情報（ユーザーを保護する方向）であり、
    誤りであった場合の production risk は低い（実際に正しい行政運用と考えられる）。
    また本カードは risk_level=critical + controlled_alpha_eligible=true（PL signoff済み）。
    このため P1 ではなく P2 として分類する。

  corrected_boundary: >
    injection_certain_block の「在留期限が1年より前にある場合、実質的な上限は在留期限当日」に
    「（行政運用解釈・DOMAIN確認要）」という注記を追加するか、
    needs_review_addendum に移動し、injection_certain_block では
    「在留期限との関係は入管窓口でご確認ください」程度の表現に留める。

  source_or_basis: >
    needs_review_flags.zairyu_kigen_upper_bound:
    「在留期限が先の場合の上限は行政運用上の解釈として扱う。needs_review。」
    ai_inferred_fields: zairyu_kigen_as_upper_bound として分類

fact_card_patch:
  file: docs/fact-cards/minashi-sainyuukoku.md
  modify_in_injection_certain_block: >
    「在留期限が1年より前にある場合、実質的な上限は在留期限当日（在留期限を超えた在留継続は不可のため）」
    →「在留期限が1年より前にある場合、実質的な上限は在留期限当日（行政運用解釈・DOMAIN確認要）」
    に変更。または needs_review_addendum に移動。
```

**注意点（修正不要・記録のみ）**:

- `zairyu_shikaku_metsumetsu`（再入国許可なし出国による在留資格消滅・入管法第26条の2第6項）
  は needs_review 未解消。injection_certain_blockでは「在留資格に重大な影響が生じる可能性があります
  （詳細は行政書士にご確認ください）」と適切に hedge されており、断定的表現を避けている。✅

- must_say に「在留期限が1年より前に来る場合は、在留期限が実際の上限になります」が含まれており、
  これも ai推定。上記パッチと合わせて must_say の表現も「（行政運用解釈・確認要）」付きに
  修正することを推奨（P2同等）。

---

## Card 4: ryugakusei-baito-28jikan（medium）— PASS ✅

審査結果: 合格（前セッション読み込み済みデータから確認）。

- 週28時間・長期休業中1日8時間・風俗営業禁止は ISA 公式確認済み。injection 適切。
- 掛け持ちの合計時間カウントは needs_review_addendum に正しく隔離。

**注意（記録のみ）**: evidence_points claim 3「週28時間を超えるアルバイトは資格外活動違反
（不法就労）となり、在留資格の取消・退去強制のリスクがある」に needs_domain_review: true。
「退去強制のリスク」という断言が過度でないかの確認が必要。ただし injection_certain_block には
この表現は含まれていない（evidence_pointsに留まる）。次回 DOMAIN 周回で確認推奨（P3）。

---

## Card 5: ryugaku-koushin-shutsusekiRitsu（high）— PASS ✅

**審査結果**: 合格。injection_certain_blockの構成は適切。

1. **injection_certain_blockの内容確認**:
   ```
   ・必要書類：在学証明書・成績証明書・写真・手数料4,000円等
   ・出席率：70%以上が目安（70%未満は更新困難のリスクあり）
   ・申請先：居住地の入管窓口またはオンライン
   ```

   - 「目安」「リスクあり」という慎重な表現を使用しており、断定的ではない。✅
   - direct_fact_fields に「出席率70%以上が求められる目安とされている（入管・学校の運用による）」
     として分類されており、「運用による」という注記が付いている。✅

2. **ai推定の隔離** — 転校時届出・病気例外はともに ai推定として body に留まり、
   injection_certain_blockには含まれていない。✅

3. **冒頭宣言の有無** — 「【留学ビザ更新 ファクト / {{TODAY_ISO}} 確認済み】」という
   日時スタンプのみで、「以下は公式情報に基づく」という過度な宣言がない。
   このためtankizai-henkoパターンの自己矛盾問題は発生していない。✅

**注意点（修正不要・記録のみ）**:

- `shutsuseki_ritsu_70percent_kijun`（出席率70%の法的根拠）は needs_review 未解消。
  injection_certain_block での「目安」「リスクあり」という表現は適切に hedging されているが、
  evidence_points claim 3（「日本語学校は入管への在籍状況報告義務あり」）に
  needs_domain_review: true。次回 FACT 確認推奨（P2）。

- 「手数料4,000円等」はevidence_points claim 2 に ISA 直接引用として記載されている。
  ISA 16-2.html からの確認済みであれば問題なし。

---

## Card 6: gaikokujin-seikatsu-hogo（high）— NEEDS_PATCH P2

**Batch 14-19 スポットレビュー（2026-05-12）にて既に指摘済み。再掲・確認のみ。**

injection_certain_block に「相談先：市区町村の福祉事務所（生活保護担当）」が含まれているが、
ai_inferred_fields で「（ai推定）」と明示されており、injection_certain_block への混入は軽度違反。

修正指示は Batch 14-19 レビューを参照。Priority P2（変更なし）。

---

## Card 7: shinseichu-zairyu-keizoku（high）— PASS ✅

**Batch 14-19 スポットレビュー（2026-05-12）にて確認済み。再掲のみ。**

特例2か月・就労継続可は ISA 公式確認済み。injection_certain_block は正確かつ簡潔。

---

## Card 8: spouse-divorce-separation（critical）— PASS ✅

**審査結果**: 合格（state=human_reviewed・DOMAIN-CC APPROVE 済み 2026-05-07）。

1. **injection_certain_blockの内容確認**:
   - 6か月ルール（入管法第22条の4第1項第7号）: ISA公式直接引用済み。✅
   - 14日以内の届出義務: ISA公式直接引用済み。✅
   - 意見聴取・30日猶予: ISA公式直接引用済み（第22条の4第2項・第3項）。✅
   - ai推定はinjection_certain_blockに含まれていない。✅

2. **Evidence精修確認（2026-05-11）**: evidence_points claim 3（意見聴取・30日猶予）の
   needs_domain_review が前セッション（2026-05-11）に DOMAIN 確認完了し、
   source_locator に条項番号（第22条の4第2項・第3項）が追記済み。
   needs_domain_review: true → false が changelog に記録されている。✅

3. **state=human_reviewed**: DOMAIN-CC が 2026-05-07 に APPROVE。現在の審査は再確認に過ぎず、
   新たな問題は発見されなかった。

**注意点（記録のみ）**:

- `controlled_alpha_eligible: false` のため、human_reviewed 済みであっても
  Alpha frontend への注入には別途 PL 判断が必要。risk=critical カードの標準手続き。

---

## Card 9: eijuu-haigusha-visa（high）

```yaml
verdict: needs_patch
risk_level: P2
```

**問題（P2）: injection_certain_block冒頭「公式情報に基づく」宣言とai推定（就労制限なし）の自己矛盾**

```yaml
claim:
  unsafe_or_ambiguous_statement: >
    injection_certain_block の冒頭に
    「以下は出入国在留管理庁の公式情報に基づく現行ルール」と宣言されているが、
    同一ブロック内に以下のai推定内容が含まれている：
    「就労制限なし（活動制限のない身分系在留資格）【ai推定・法令照合要】」

    needs_review_flags.no_work_restriction_source:
    「就労制限なしは法律上の解釈に基づくai推定。
     入管法別表第2「永住者の配偶者等」の活動範囲条文確認要。」

    また must_say にも「永住者の配偶者等ビザは就労制限なし（活動内容の制限がない）
    【ai推定確認要】」が含まれており、ai推定内容をmust_sayに格上げしている。

  severity_note: >
    「就労制限なし」は正しい方向の情報（実際に就労制限なしが正しい可能性が高い）であり、
    production risk は低い。このため P1 ではなく P2 として分類する。
    ただし構造問題としては tokuteiginou-ichigou-youken（P1）と同種。

  corrected_boundary: >
    injection_certain_block から「就労制限なし【ai推定・法令照合要】」を削除し、
    needs_review_addendum に移動する。
    injection_certain_block の回答時注意に「就労制限については入管法別表第2の
    確認後に断言可能。現時点では「就労に関する制限はないと考えられる」程度に留める」
    と記載する。

    must_say からも「就労制限なし【ai推定確認要】」を削除。
    injection_certain_block の注意文で制御する範囲に留める。

  source_or_basis: >
    needs_review_flags.no_work_restriction_source:
    「就労制限なしは法律上の解釈に基づくai推定。入管法別表第2条文確認要。」

fact_card_patch:
  file: docs/fact-cards/eijuu-haigusha-visa.md
  remove_from_injection_certain_block: >
    「就労制限なし（活動制限のない身分系在留資格）【ai推定・法令照合要】」を削除
  add_to_injection_certain_block_caution: >
    「就労制限の有無は入管法別表第2の確認中。断定せず「活動制限はないと考えられる
    が、詳細は入管窓口・行政書士でご確認ください」と案内する。」
  move_to_needs_review_addendum: >
    「就労制限なし（身分系在留資格として活動範囲の制限なし）：
    入管法別表第2「永住者の配偶者等」の条文確認中。断定的に回答しない。」
  remove_from_must_say: >
    「永住者の配偶者等ビザは就労制限なし（活動内容の制限がない）【ai推定確認要】」を削除
```

**injection_certain_blockに入れてはいけない文**:
- 「就労制限なし（活動制限のない身分系在留資格）【ai推定・法令照合要】」
  （`no_work_restriction_source` needs_review未解消）

**注意点（修正不要・記録のみ）**:

- evidence_points claim 3（永住者配偶者等ビザ→永住申請の移行条件）に
  needs_domain_review: true。「3年以上婚姻+1年以上在留で永住申請特例要件の基礎」は
  ai推定であり injection_certain_block には含まれていない。正しく隔離済み。✅

- `marital_substance_review`（更新時の婚姻実態審査基準の公式ガイドライン）が
  needs_review 未解消。injection_certain_block では「更新時に婚姻実態（同居・生活状況）の
  確認あり」と事実的な記述に留まっており、基準の断言はない。現状は許容範囲。

---

## Card 10: sainyukoku-kyoka（high）— PASS ✅

**Batch 14-19 スポットレビュー（2026-05-12）にて確認済み。再掲のみ。**

みなし再入国1年・再入国許可最長5年・在留資格失効は ISA 公式確認済み。injection_certain_block が簡潔かつ正確。

---

## 全体評価

**Top 10 品質評価**: 概ね良好。既存の構造問題が一部継続。

### PASS（6枚）
tokutei-ginou-koushin / ryugakusei-baito-28jikan / ryugaku-koushin-shutsusekiRitsu /
shinseichu-zairyu-keizoku / spouse-divorce-separation / sainyukoku-kyoka

特にtokutei-ginou-koushinは：
- 申請タイミング・費用・本人在留要件を ISA 直接引用で正確に構成
- ai推定（1号5年上限・2号上限なし）は needs_review_addendum に適切に隔離
- 冒頭宣言とブロック内容が完全に整合

### NEEDS_PATCH（3枚）

| Card | 問題 | Priority |
|------|------|----------|
| tokuteiginou-ichigou-youken | injection_certain_block冒頭「公式情報」宣言+ai推定混入（家族帯同・日本語要件）+ must_sayへのai推定格上げ | P1 |
| minashi-sainyuukoku | injection_certain_blockにai推定「在留期限が実質上限」を注記なしで含む | P2 |
| eijuu-haigusha-visa | injection_certain_block冒頭「公式情報」宣言+ai推定混入（就労制限なし）+ must_sayへのai推定格上げ | P2 |

**Codex 作業指示（Merge前に必要）**:

| ファイル | 変更内容 | Priority |
|---------|----------|----------|
| tokuteiginou-ichigou-youken.md | injection_certain_blockから「家族帯同：不可【ai推定】」「日本語要件【ai推定】」を削除→needs_review_addendum に移動。must_sayから「家族帯同不可」「日本語要件」を削除 | P1 |
| minashi-sainyuukoku.md | injection_certain_blockの「在留期限が実質上限」に「（行政運用解釈・DOMAIN確認要）」注記を追加。must_sayも同様の注記追加 | P2 |
| eijuu-haigusha-visa.md | injection_certain_blockから「就労制限なし【ai推定】」を削除→needs_review_addendum に移動。must_sayから「就労制限なし」を削除 | P2 |

### 構造問題の統計（本セッション全体）

injection_certain_block冒頭「公式情報に基づく」宣言+ai推定混入の構造問題発生数：

| Card | Batch | Status |
|------|-------|--------|
| tankizai-henko | PR #122 Batch 2 | 指摘済み（修正待ち） |
| overstay-taisho | Batch 14-19 | BLOCK P1（修正待ち） |
| tokuteiginou-ichigou-youken | Top 10 | 今回指摘 P1 |
| eijuu-haigusha-visa | Top 10 | 今回指摘 P2 |

計4件。FACT-OPS へのルール再周知と injection_certain_block 作成時のチェックリスト強化を推奨。

---

## FACT申し送り（DOMAIN推奨）

| Card | needs_review | 実務的重要度 |
|------|------------|------------|
| tokuteiginou-ichigou-youken | `family_accompaniment_prohibition_source`（法令別表第1の2条文） | P1 — 「家族を呼べるか」は最頻出質問 |
| tokuteiginou-ichigou-youken | `japanese_language_test_by_sector`（業種別日本語要件） | P1 — 試験準備に直結 |
| tokutei-ginou-koushin | `tokutei1_5nen_source`（1号5年上限の法令引用） | P1 — 5年カウントの問い合わせ多数 |
| eijuu-haigusha-visa | `no_work_restriction_source`（就労制限なしの法令条文） | P2 — 就労意向ユーザーの核心 |
| minashi-sainyuukoku | `zairyu_kigen_upper_bound`（在留期限が実質上限の明文化） | P2 — 在留期限間近の出国相談で重要 |
| ryugaku-koushin-shutsusekiRitsu | `shutsuseki_ritsu_70percent_kijun`（70%の法的根拠） | P2 — 出席率不足相談の核心 |

---

*DOMAIN-CC 専業判断。工程実装なし。DOMAIN_CLAIM_GUARDRAILS.md v0.1 に準拠。*
