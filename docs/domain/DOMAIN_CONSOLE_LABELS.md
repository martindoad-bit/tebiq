# Internal Console Domain Labels v0.1

> **状態**：draft / needs GM + ENGINE + 产品负责人 review
> **版本**：v0.1（2026-05-05，DOMAIN-CC）
> **用途**：为 Internal Console（Track B, Issue #19）提供 DOMAIN 视角的语义标签建议。
>
> DOMAIN 提供标签定义和适用条件。ENGINE 决定实现方式。产品负责人决定用户可见性。

---

## 使用说明

- `whether_user_visible`：建议值。最终由产品负责人裁决。
- `whether_requires_domain_review`：在正式 Eval 标注前，标注为此标签的题目应优先进入人工复核。
- 标签可多重叠加（一道题可同时有多个标签）。
- 标签颜色 / 图标设计由 ENGINE / UX 决定，不在 DOMAIN 权限内。

---

## 标签定义

### L-01 时间敏感

| 字段 | 内容 |
|---|---|
| **risk_label** | `time_sensitive` |
| **domain_meaning** | 題目に時間的な期限リスクが含まれる（在留期限 / 補材料期限 / 通知書期限 / 離婚後6ヶ月等）|
| **when_to_apply** | 「もうすぐ期限が来る」「期限を過ぎた」「間に合わない」「通知書の期限」等の語句が含まれる |
| **when_not_to_apply** | 期限が主要なテーマでなく、一般的な手続き確認の場合 |
| **example_questions** | J03 / F01 / F02 / F08 / D06 / G05 |
| **whether_user_visible** | no（内部管理用）|
| **whether_requires_domain_review** | yes |

---

### L-02 身份変化

| 字段 | 内容 |
|---|---|
| **risk_label** | `status_change` |
| **domain_meaning** | 在留根拠となる事実（婚姻 / 雇用 / 就学 / 資格）に変化があり、在留資格の変更が必要または検討すべき状態 |
| **when_to_apply** | 離婚 / 転職 / 解雇 / 転学 / 資格変更申請を検討している |
| **when_not_to_apply** | 現状維持のまま更新手続きのみを確認している |
| **example_questions** | A01-A09 / D05 / D06 / J05 / D08 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-03 工作资格风险

| 字段 | 内容 |
|---|---|
| **risk_label** | `work_visa_risk` |
| **domain_meaning** | ユーザーの就労活動が在留資格の活動範囲と一致しない可能性があり、不法就労リスクが存在する |
| **when_to_apply** | 業務内容の変化 / 解雇後の就労継続 / 28時間超過 / 家族滞在での就労 / 在留と仕事が不一致 |
| **when_not_to_apply** | 単純な転職相談で活動範囲内の確認のみ |
| **example_questions** | C03 / C07 / D02 / J08 / J04 / A05 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-04 経営管理风险

| 字段 | 内容 |
|---|---|
| **risk_label** | `keiei_risk` |
| **domain_meaning** | 経営管理資格に関連するリスク（更新 / 廃業 / 清算 / 経営実態 / 事務所要件 / 帰国）|
| **when_to_apply** | 経管签持有者の更新・廃業・帰国・事務所変更・財務状況変化 |
| **when_not_to_apply** | 経管签以外の資格者からの一般的な手続き確認 |
| **example_questions** | B01-B10 / I01 / I08 / J06 / B07 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-05 家族連帯リスク

| 字段 | 内容 |
|---|---|
| **risk_label** | `family_cascade_risk` |
| **domain_meaning** | 主たる在留者の資格変化が、家族（家族滞在）の在留資格に連動して影響する可能性 |
| **when_to_apply** | 主資格変更を検討中で、家族が家族滞在資格を持つ場合 |
| **when_not_to_apply** | 家族全員が独立した在留資格（技人国・永住等）を持つ場合 |
| **example_questions** | D09 / A05（家族の影響）/ D04 / D07 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-06 永住条件风险

| 字段 | 内容 |
|---|---|
| **risk_label** | `eiju_condition_risk` |
| **domain_meaning** | 永住申請の要件（公的義務 / 在留年数 / 収入 / 配偶者の義務）に関わるリスクが存在する |
| **when_to_apply** | 年金・税金の未納遅納 / 永住申請前後の転職・引越し / 不許可後の再申請検討 |
| **when_not_to_apply** | 永住申請が全く関係しない在留資格の質問 |
| **example_questions** | E01-E10 / H09 / J09 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-07 入管通知リスク

| 字段 | 内容 |
|---|---|
| **risk_label** | `immi_notice_risk` |
| **domain_meaning** | 入管または行政機関からの通知に関わる場面。通知の種類によって緊急度が異なる |
| **when_to_apply** | 入管 / 区役所 / 税務署からの日文通知について言及している |
| **when_not_to_apply** | 通知の話題ではなく、一般的な申請手続きの確認 |
| **example_questions** | F01-F10 / G06 / G07 / J02 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-08 不許可リスク

| 字段 | 内容 |
|---|---|
| **risk_label** | `rejection_risk` |
| **domain_meaning** | 在留資格の申請が不許可になった、または不許可になるリスクが高い状況 |
| **when_to_apply** | 不許可通知書を受け取った / 不許可後の対処を相談している / 不許可リスクが高い申請を検討中 |
| **when_not_to_apply** | 通常の更新手続き（リスクが低い場合）|
| **example_questions** | F05 / F06 / F07 / F08 / E07 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-09 scope_bridge

| 字段 | 内容 |
|---|---|
| **risk_label** | `scope_bridge` |
| **domain_meaning** | 一見 TEBIQ の対象範囲外に見えるが、在留リスク経路に桥接できる質問 |
| **when_to_apply** | TEBIQ の既知の Scope Bridge（離婚→身份変更 / 清算→経管 / 税金→永住等）に該当する場合 |
| **when_not_to_apply** | 明確に在留資格と無関係な質問（観光ルート / 日本語学習 / 一般ビジネス相談）|
| **example_questions** | D05 / D06 / I08 / H09 / D09 |
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-10 routing_review_needed

| 字段 | 内容 |
|---|---|
| **risk_label** | `routing_review_needed` |
| **domain_meaning** | TEBIQ のルーティングが適切に判定されていない可能性がある、または R01-R05 の修正対象に該当する |
| **when_to_apply** | out_of_scope 返却 / 7条 regression set の題目 / 新たなルーティング誤判を疑う場合 |
| **when_not_to_apply** | 正常にルーティングされ、domain/status が期待通り |
| **example_questions** | J03 / J04 / J08 / I08 / D05 / D06 / D09（7条 OOS regression set）|
| **whether_user_visible** | no |
| **whether_requires_domain_review** | yes |

---

### L-11 human_review_candidate

| 字段 | 内容 |
|---|---|
| **risk_label** | `human_review_candidate` |
| **domain_meaning** | 自動化回答だけでは不十分で、行政書士・弁護士・専門家による人工確認が強く推奨される題目 |
| **when_to_apply** | VOICE Input Pack の L2 シナリオに該当 / 不法就労確認 / 不許可後の法的オプション / 経管清算 / 配偶離婚後4ヶ月以上 |
| **when_not_to_apply** | 標準行政手続きのみ（住所変更 / 在留カード紛失 / 健康保険切替等）|
| **example_questions** | F05 / I08 / B07 / D05 / J08 |
| **whether_user_visible** | conditional（ユーザー端では「専門家への相談をお勧めします」程度の案内）|
| **whether_requires_domain_review** | yes |

---

## Console 表示提案（ENGINE 参考）

| 状態 | DOMAIN推奨ラベル | 表示対象 |
|---|---|---|
| TEBIQ status=out_of_scope | `routing_review_needed`（自動付与候補）| GM / DOMAIN / QA |
| 7条 regression set 題目 | `routing_review_needed` + `time_sensitive` or `status_change` etc. | GM / QA |
| fallback_reason=llm_timeout | （DOMAINラベルではなくシステムラベル）| GM / ENGINE |
| HIGH risk 題目 | 対応する L-01〜L-11 ラベル | GM / DOMAIN |
| needs-domain-expert 題目 | `human_review_candidate` | DOMAIN / QA |

---

## 版本管理

| バージョン | 日付 | 変更内容 |
|---|---|---|
| v0.1 | 2026-05-05 | 初版。11ラベル定義。draft / needs human review |

