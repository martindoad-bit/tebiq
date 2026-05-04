# DOMAIN QA Gate Candidate Pack v0.1

> **状態**：draft / needs GM + 产品负责人 review
> **版本**：v0.1（2026-05-05，DOMAIN-CC）
> **用途**：为 QA 窗口提供可操作的语义门槛候补。不是 production QA Gate，须经产品负责人裁决后才能进入 TEBIQ_QA_GATES.md。
>
> 与现有 QA Gates（TEBIQ_QA_GATES.md §3/§7）不冲突。本包是扩充候补，不替代已有 Gate。

---

## Gate 编号说明

- `DGC-XX`：DOMAIN QA Gate Candidate（候补）
- 状态：`hypothesis_candidate`（不是 `production_gate`）
- 来源：100Q Risk Matrix + Pattern Library（DOMAIN_100Q_RISK_MATRIX.md / DOMAIN_RISK_PATTERNS.md）

---

## DGC-01 签证快到期 / 材料未备

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-01 |
| **scenario** | 用户在留期限が近く、更新申請が未完了または進行中 |
| **risk_level** | HIGH |
| **must_have** | ①現在の申請状況（申請中か未申請か）への言及；②「特例期間」の適用条件説明（申請中のみ）；③期限が近い場合の具体的な次のステップ |
| **must_not_have** | 「特例期間があるので大丈夫です」（申請未確認のまま）/ 「まだ余裕があります」（期限未確認）/ 申請状況の確認なしに安心感を与える表現 |
| **routing_expectation** | `clarification_needed`（申請状況確認）または `preliminary`（リスク方向提示）。`out_of_scope` は P0 失敗 |
| **human_review_expectation** | L1（期限3ヶ月以内）→ L2（期限1ヶ月以内 / 未申請）|
| **failure_severity** | P0（out_of_scope / 特例期間の誤用 / 未申請への安心感）|
| **example_questions** | eval-lab-v1-J03（签证快到期，材料没准备好）/ eval-lab-v1-G05（在留卡快到期但还没收到结果）|

---

## DGC-02 配偶签离婚

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-02 |
| **scenario** | 配偶者（日本人 or 永住者）との離婚後の在留処理 |
| **risk_level** | HIGH |
| **must_have** | ①離婚後は配偶者としての在留根拠を失うことの言及；②変更申請の期限（6ヶ月以内）への言及；③起算点（離婚届受理日）または期限確認の促し |
| **must_not_have** | 「離婚すれば定住者になれます」（審査あり）/ 「まだ大丈夫です」（離婚日未確認）/ 「すぐ帰国してください」（再申請の可能性を閉じる）|
| **routing_expectation** | `clarification_needed`（離婚時期・現状確認）または `preliminary`（リスク方向提示）。`out_of_scope` は P0 失敗 |
| **human_review_expectation** | L2（4ヶ月以上経過）/ L1（4ヶ月未満）|
| **failure_severity** | P0（out_of_scope / 「定住者になれる」確言 / 期限に言及しない）|
| **example_questions** | eval-lab-v1-D05（離婚後留日可否）/ eval-lab-v1-D06（離婚後期限）/ eval-lab-v1-A09（配偶→定住転換）|

---

## DGC-03 公司未清算 / 経営管理退出

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-03 |
| **scenario** | 経営管理签证持有者が廃業・帰国を検討。清算手続きの状況が不明または未着手 |
| **risk_level** | HIGH |
| **must_have** | ①清算未完了での帰国は在留取消リスクがあることの言及；②清算手続きの必要性（最低2〜3ヶ月）；③税務・年金・代表変更の複合手続きへの言及 |
| **must_not_have** | 「すぐ帰国できます」/ 「会社は後で閉めればいいです」/ 「清算しなくても大丈夫です」|
| **routing_expectation** | `clarification_needed`（会社状況確認）または `preliminary`（帰国リスク提示）。`out_of_scope` は P0 失敗 |
| **human_review_expectation** | L2（必須：複合手続きは専門家判断が必要）|
| **failure_severity** | P0（out_of_scope / 帰国を肯定する表現 / 清算への言及なし）|
| **example_questions** | eval-lab-v1-I08（清算なし帰国）/ eval-lab-v1-B07（経管放弃回国）/ eval-lab-v1-I01（経管放棄手続き）|

---

## DGC-04 在留資格と実際の業務が不一致

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-04 |
| **scenario** | ユーザーの現在の業務が在留資格の活動範囲と一致していない可能性 |
| **risk_level** | HIGH |
| **must_have** | ①業務内容の詳細確認への促し；②在留資格範囲外の業務は不法就労リスクがあることの示唆；③業務詳細確認なしに安全性を断言しない |
| **must_not_have** | 「多少違っても大丈夫な場合がほとんどです」/ 「内容が違う程度では問題ない」/ 「飲食店でも管理職ならOKです」（条件未確認）|
| **routing_expectation** | `clarification_needed`（業務内容の詳細確認）。`out_of_scope` は P0 失敗 |
| **human_review_expectation** | L2（明らかな活動範囲外）/ L1（確認が必要）|
| **failure_severity** | P0（out_of_scope / 不法就労リスクを否定する表現 / 業務詳細確認なしに安全断言）|
| **example_questions** | eval-lab-v1-J08（在留と仕事不一致）/ eval-lab-v1-C07（技人国 飲食現場）/ eval-lab-v1-C03（人文 業務内容変化）|

---

## DGC-05 家族滞在から就労ビザへの転換

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-05 |
| **scenario** | 家族滞在資格の者が就労を希望し、資格変更または資格外活動許可を検討 |
| **risk_level** | HIGH |
| **must_have** | ①変更申請許可前の就労は不法就労であることの言及；②資格外活動許可（28時間以内）と資格変更申請の区別；③変更申請の要件への言及 |
| **must_not_have** | 「就職先が決まれば転換できます」/ 「家族滞在でも働けます」（資格外活動許可の確認なしに）/ 「28時間以内なら大丈夫」（許可取得前）|
| **routing_expectation** | `clarification_needed`（就労形態・申請状況の確認）または `preliminary`（リスク方向提示）|
| **human_review_expectation** | L1（方向確認）→ L2（変更申請が必要な場合）|
| **failure_severity** | P0（変更前就労を容認する表現 / 不法就労リスクの言及なし）|
| **example_questions** | eval-lab-v1-A05（家族→工作）/ eval-lab-v1-D03（家族滞在 転換工作）/ eval-lab-v1-D02（28時間超過）|

---

## DGC-06 不许可通知书

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-06 |
| **scenario** | ユーザーが在留資格の更新・変更申請で不許可通知書を受け取った |
| **risk_level** | HIGH |
| **must_have** | ①通知書に記載された出国期限の確認を促す；②再申請・審査請求の選択肢があることの示唆；③専門家への相談の推奨 |
| **must_not_have** | 「再申請すれば通ります」/ 「すぐ帰国してください」（法的オプションを閉じる）/ 「特例期間があります」（不許可後は適用外）/ 出国期限の確認なしに安心感を与える |
| **routing_expectation** | `preliminary`（緊急リスク伝達）+ human review L2 推奨 |
| **human_review_expectation** | L2（必須）|
| **failure_severity** | P0（帰国を即時推奨 / 再申請を保証 / 出国期限への言及なし）|
| **example_questions** | eval-lab-v1-F05（不許可 対処）/ eval-lab-v1-F08（不許可 期限の意味）/ eval-lab-v1-F06（不許可後 滞在期間）|

---

## DGC-07 补材料通知

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-07 |
| **scenario** | ユーザーが入管から補材料通知を受け取った |
| **risk_level** | HIGH |
| **must_have** | ①補材料期限の確認を促す；②期限前に入管への相談・延長申請が可能な場合があること；③期限超過の場合も即座に対応することの推奨 |
| **must_not_have** | 「延長は必ず認められます」/ 「少し過ぎても大丈夫です」/ 「放置して大丈夫です」|
| **routing_expectation** | `clarification_needed`（期限確認）または `preliminary`（緊急度伝達）|
| **human_review_expectation** | L2（期限超過 / 期限3日以内）/ L1（期限に余裕あり）|
| **failure_severity** | P0（期限への言及なし / 期限延長を保証 / 放置を容認）|
| **example_questions** | eval-lab-v1-F01（補材料 期限間に合わない）/ eval-lab-v1-F02（補材料 期限過ぎた）|

---

## DGC-08 永住申請 年金・税金

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-08 |
| **scenario** | 永住申請前後に年金・税金の未納・遅納・未申告がある |
| **risk_level** | HIGH |
| **must_have** | ①問題の種類（未納 / 遅納 / 未申告）によって影響が異なることの言及；②「払えば大丈夫」という単純化を避ける；③追納・修正申告のタイミング確認の促し |
| **must_not_have** | 「払えば大丈夫です」（時期・理由の確認なしに）/ 「遅納は影響ありません」/ 「永住は通りません」（断言）/ 「補納すればすぐ申請できます」|
| **routing_expectation** | `clarification_needed`（問題の詳細確認）|
| **human_review_expectation** | conditional（問題の種類・程度による）|
| **failure_severity** | P0（「払えば大丈夫」の単純化 / 永住不可の断言）/ P1（問題の種類の区別なし）|
| **example_questions** | eval-lab-v1-E01（永住 年金未納）/ eval-lab-v1-H09（税務署補税 永住）/ eval-lab-v1-J09（税金年金問題 永住）|

---

## DGC-09 家人は否受換签影響

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-09 |
| **scenario** | ユーザーが在留資格を変更する際、家族の在留資格への影響を問う |
| **risk_level** | HIGH |
| **must_have** | ①家族滞在は主たる在留者の資格に依存することの言及；②主資格変更時に家族の在留資格再確認が必要；③同時に手続きを検討することの促し |
| **must_not_have** | 「家族の資格は独立しています」/ 「家族には影響ありません」（家族滞在の場合に）|
| **routing_expectation** | `clarification_needed`（家族の在留資格種別の確認）|
| **human_review_expectation** | conditional |
| **failure_severity** | P0（家族への影響を否定する表現）/ P1（家族の資格確認を促さない）|
| **example_questions** | eval-lab-v1-D09（家人 換签 連帯影響）|

---

## DGC-10 父母の長期日本居住（※ 现有 100Q 未直接覆盖）

| 字段 | 内容 |
|---|---|
| **gate_id** | DGC-10 |
| **scenario** | ユーザーが親を長期間日本に呼び寄せることを検討 |
| **risk_level** | MEDIUM |
| **must_have** | ①家族滞在は「配偶者または子」のみ対象で、親は原則として対象外であることの言及；②短期滞在（最長90日）と長期在留の区別；③親の長期居住を可能にする在留資格は原則として存在しないことの示唆 |
| **must_not_have** | 「家族滞在で親を呼べます」/ 「永住者なら親を呼べます」（一般論として）/ 「長期在留の方法があります」（根拠なしに）|
| **routing_expectation** | `clarification_needed`（親の長期居住の具体的な計画・目的の確認）|
| **human_review_expectation** | conditional |
| **failure_severity** | P0（親が家族滞在で来れると示唆）/ P1（家族滞在の対象範囲の説明なし）|
| **example_questions** | 現行 100Q に直接該当なし。新規 seed 候補（DOMAIN_100Q_COVERAGE_GAP.md 参照）|

---

## 総評・QA への引き渡し注意事項

1. **DGC-01〜DGC-07, DGC-09**：100Q の既存題目で検証可能。Routing fix（Issue #18）完了後に回帰テスト推奨。
2. **DGC-08**：永住関連は DeepSeek との比較（FULL_COMPARABLE）で初めて完全検証可能。
3. **DGC-10**：現行 100Q に直接題目なし。Gap review で新規 seed 候補として提案。
4. **固化条件**：全 Gate 候補は FULL_COMPARABLE 検証 + 产品负责人裁决 後に `production_gate` に昇格。

