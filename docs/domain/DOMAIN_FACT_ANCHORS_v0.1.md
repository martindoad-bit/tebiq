---
status: draft / needs human review
owner: DOMAIN-CC
date: 2026-05-05
version: v0.1
scope: 1.0 Alpha — 15 fact anchors for streaming consultation pipeline
issue: https://github.com/martindoad-bit/tebiq/issues/42
authority: WORKSTREAM_1_0_FACT_ANCHORS_PACK.md §3 / TEBIQ_1_0_ALPHA_CHARTER.md §7
production_allowed: no
note: ENGINE #39 が keyword matching + prompt injection を実装する。DOMAIN は anchor 内容のみ提供。
---

# DOMAIN Fact Anchors v0.1

> **制約**：完整知識庫ではない。法律細節ではない。承諾性文案ではない。production-ready ではない。
> ENGINE が keyword matching + anchor injection を実装するまで、このファイルはデータ仕様のみ。

---

## FA-01 — bm_to_humanities

```yaml
anchor_id: bm_to_humanities
trigger_keywords:
  - 経営管理
  - 人文知識
  - 技術人文
  - 転換
  - 経管
  - 社長をやめる
  - ビザ変更

must_consider: >
  経営管理から他資格への転換は「活動実態の消失」が発生点となる。
  転換先の職務と学歴・職歴の整合性、申請時の雇用証明、在留期限の残余期間を確認する必要がある。
  転換手続き中の空白期間は原則として認められない。

must_not_say: >
  転換できます / 問題なく変更できます / 就活中でも大丈夫 / 申請すれば許可されます

suggested_next_question: >
  転換後の予定雇用先・職務内容・現在の在留期限の残り期間を教えてください。

human_confirm_hint: >
  転換先の職務が学歴・職歴と整合しない場合、または在留期限まで3ヶ月未満の場合は専門家確認を推奨。
```

---

## FA-02 — humanities_to_pr

```yaml
anchor_id: humanities_to_pr
trigger_keywords:
  - 永住
  - 人文知識
  - 技術人文
  - 永住申請
  - 永住権
  - 永住許可

must_consider: >
  技人国から永住申請には原則10年以上の在留（うち就労5年以上）が必要。
  直近5年の納税・年金・健康保険の継続加入が審査対象となる。
  直近1年の出国日数も確認される。

must_not_say: >
  申請できます / 許可されます / 10年いれば大丈夫 / 条件を満たしています

suggested_next_question: >
  現在の在留年数・直近5年の健康保険と年金の加入継続状況を教えてください。

human_confirm_hint: >
  過去5年内に納税漏れ・年金未払い・出国超過がある場合は行政書士への確認を推奨。
```

---

## FA-03 — pension_pr

```yaml
anchor_id: pension_pr
trigger_keywords:
  - 厚生年金
  - 国民年金
  - 年金
  - 永住
  - 未払い
  - 年金記録
  - 保険料

must_consider: >
  永住審査では直近5年以上の年金保険料の納付実績が確認される。
  未払い期間は許可に影響する可能性がある。
  免除・猶予は未払いとは扱いが異なる場合があるが、個別状況による。

must_not_say: >
  未払いがあっても大丈夫 / 今払えば問題なし / 影響しません / 必ず許可されます

suggested_next_question: >
  直近5年で年金の未払いや免除申請の期間はありますか？

human_confirm_hint: >
  未払い期間がある、または記録が不明瞭な場合はnephin.go.jpで確認後、専門家相談を推奨。
```

---

## FA-04 — tax_pr

```yaml
anchor_id: tax_pr
trigger_keywords:
  - 税金
  - 住民税
  - 所得税
  - 納税
  - 永住
  - 未納
  - 確定申告

must_consider: >
  永住申請では住民税・所得税の完納証明が必要。
  未納・滞納が直近3〜5年以内にある場合は許可に影響する可能性がある。
  確定申告漏れがある場合も審査に影響しうる。

must_not_say: >
  少し遅れても大丈夫 / 今払えば問題なし / 影響しません / 許可されます

suggested_next_question: >
  直近5年間で住民税や所得税の未納・滞納の経験はありますか？

human_confirm_hint: >
  未納・滞納が確認された場合は、完納証明を取得した上で行政書士に相談を推奨。
```

---

## FA-05 — spouse_divorce

```yaml
anchor_id: spouse_divorce
trigger_keywords:
  - 離婚
  - 配偶者
  - 配偶者ビザ
  - 離婚届
  - 別居
  - 定住者

must_consider: >
  日本人・永住者の配偶者資格は婚姻継続が前提。
  離婚成立後は在留資格の基礎が消失し、別途変更が必要になる場合がある。
  離婚後14日以内の届出義務がある。定住者への変更には実績・要件がある。

must_not_say: >
  離婚しても大丈夫 / すぐ変更できます / 帰国しなくていい / 定住者に変われます

suggested_next_question: >
  現在の在留資格・在留期限・離婚の時期（または予定）を教えてください。

human_confirm_hint: >
  離婚成立済みまたは別居が続いている場合は、在留への影響を速やかに専門家へ確認推奨。
```

---

## FA-06 — bm_dissolution

```yaml
anchor_id: bm_dissolution
trigger_keywords:
  - 会社
  - 清算
  - 廃業
  - 経営管理
  - 解散
  - 事業停止
  - 閉鎖

must_consider: >
  経営管理の在留資格は実際の経営活動継続が前提。
  会社が実態なく存続している場合や清算手続きが未完了でも、活動実態が失われると資格の根拠が消失する可能性がある。

must_not_say: >
  会社があれば大丈夫 / 書類上の会社で更新できます / 清算しなくても問題なし

suggested_next_question: >
  会社の現在の経営実態（売上・従業員・活動状況）と在留期限を教えてください。

human_confirm_hint: >
  会社が実質活動停止・休業状態の場合は、更新前に行政書士への相談を強く推奨。
```

---

## FA-07 — work_mismatch

```yaml
anchor_id: work_mismatch
trigger_keywords:
  - 仕事内容
  - 活動範囲
  - 副業
  - アルバイト
  - 資格外活動
  - 業務内容
  - 不法就労

must_consider: >
  就労ビザの活動範囲外の業務（例：技人国での飲食現場作業）は資格外活動となりうる。
  副業・兼業も許可の範囲内かの確認が必要。
  資格外活動は在留資格取消しや不法就労につながる可能性がある。

must_not_say: >
  バレません / 問題ありません / 少しなら大丈夫 / 会社が許可すれば大丈夫

suggested_next_question: >
  現在の在留資格の種類と、実際に行っている主な業務内容を具体的に教えてください。

human_confirm_hint: >
  現在の業務が在留資格の活動範囲と異なる可能性がある場合は、即時専門家への相談を推奨。
```

---

## FA-08 — supplemental_request

```yaml
anchor_id: supplemental_request
trigger_keywords:
  - 補完要求
  - 追加書類
  - 入管
  - 通知書
  - 資料追加
  - 提出期限
  - 補充材料

must_consider: >
  入管から補完要求が届いた場合、指定期限内に提出しなければ申請が取り下げ扱いになる可能性がある。
  通知書に記載の要求書類・期限・提出先を正確に把握することが最優先。

must_not_say: >
  大丈夫です / 許可されます / 通常は問題なし / 出せば許可が出ます

suggested_next_question: >
  通知書に記載されている提出期限と要求されている書類の内容を教えてください。

human_confirm_hint: >
  期限が2週間未満の場合や、要求書類の取得が困難な場合は行政書士に即時相談を推奨。
```

---

## FA-09 — denial_notice

```yaml
anchor_id: denial_notice
trigger_keywords:
  - 不許可
  - 不交付
  - 通知書
  - 拒否
  - 申請却下
  - 不許可通知書

must_consider: >
  不許可通知を受けた場合、在留期限が迫っている状況では速やかな対応が必要。
  不許可の理由は窓口での確認が可能。再申請・審査請求・異議申立てなど選択肢があるが要件・期限が異なる。

must_not_say: >
  再申請すれば通ります / 理由を聞けば解決します / 必ず方法があります / 諦めなくて大丈夫

suggested_next_question: >
  不許可通知の受領日・現在の在留期限・申請の種類（変更・更新・永住等）を教えてください。

human_confirm_hint: >
  不許可通知受領後は在留期限の残余日数に関わらず、行政書士または弁護士への相談を強く推奨。
```

---

## FA-10 — visa_expiring

```yaml
anchor_id: visa_expiring
trigger_keywords:
  - 在留期限
  - 更新
  - 期限切れ
  - もうすぐ
  - 更新申請
  - 在留期間
  - 期限

must_consider: >
  更新申請は原則、在留期限の3ヶ月前から期限日まで。
  期限を過ぎての申請は特別な理由がない限りリスクがある。
  在留カードの記載内容と在留期限を正確に確認する必要がある。

must_not_say: >
  まだ大丈夫 / 申請すれば問題なし / 期限が過ぎても申請できます / 大丈夫です

suggested_next_question: >
  在留カードに記載されている在留期限と、更新したい在留資格の種類を教えてください。

human_confirm_hint: >
  在留期限まで1ヶ月以内の場合や、期限が既に過ぎている場合は専門家への即時相談を強く推奨。
```

---

## FA-11 — family_change_impact

```yaml
anchor_id: family_change_impact
trigger_keywords:
  - 家族
  - 配偶者
  - 子供
  - 家族滞在
  - 影響
  - 変更
  - 在留資格

must_consider: >
  扶養者の在留資格変更・喪失・更新不許可は、家族滞在の家族員の在留にも影響する可能性がある。
  家族員が就労している場合は資格外活動許可の範囲内かどうかも確認が必要。

must_not_say: >
  家族は関係ありません / 影響しません / 家族は安全です / 別々に更新できます

suggested_next_question: >
  変更・更新が生じる方の在留資格と、影響を受ける可能性がある家族の在留資格を教えてください。

human_confirm_hint: >
  扶養者の在留資格が取り消し・不許可になった場合は、家族全員の状況を専門家に確認推奨。
```

---

## FA-12 — family_to_work

```yaml
anchor_id: family_to_work
trigger_keywords:
  - 家族滞在
  - 就労
  - 働きたい
  - 転職
  - 資格変更
  - 就職
  - ビザ変更

must_consider: >
  家族滞在から就労ビザへの変更には、就職先の職務内容と学歴・職歴の整合性が必要。
  資格外活動許可（週28時間以内）の就労とは別の手続きとなる。
  変更申請中は現在の在留資格の範囲内での活動が原則。

must_not_say: >
  働けます / 変更できます / 会社が採用すれば大丈夫 / 申請すれば許可されます

suggested_next_question: >
  就職先の職種・業務内容と、ご自身の学歴・これまでの職歴を教えてください。

human_confirm_hint: >
  就職先の業務内容と学歴・職歴の対応が不明確な場合は、申請前に行政書士への確認を推奨。
```

---

## FA-13 — humanities_job_change

```yaml
anchor_id: humanities_job_change
trigger_keywords:
  - 転職
  - 技術人文
  - 会社変更
  - 退職
  - 転職届
  - 職場変更
  - 就職

must_consider: >
  技人国での転職は、転職先の業務内容が現在の在留資格の活動範囲に含まれるかの確認が必要。
  転職後14日以内の届出義務がある。
  転職先の業務が活動範囲外の場合は在留資格変更が必要になる場合がある。

must_not_say: >
  転職できます / 届出するだけで大丈夫 / どんな仕事でも問題なし / 許可されます

suggested_next_question: >
  現在の在留資格・転職先の具体的な業務内容・ご自身の学歴を教えてください。

human_confirm_hint: >
  転職先の業務が「専門性・技術性・人文知識」から乖離している可能性がある場合は申請前に確認推奨。
```

---

## FA-14 — re_entry

```yaml
anchor_id: re_entry
trigger_keywords:
  - 再入国
  - 離日
  - 出国
  - みなし再入国
  - 長期出国
  - 帰国
  - 在留期限

must_consider: >
  みなし再入国許可は出国後1年以内かつ在留期限内が条件。
  長期出国の場合は通常の再入国許可（最大5年）が必要。
  在留期限を出国中に迎えると再入国不可になる可能性がある。
  経営管理者の長期不在は活動実態問題を生じることがある。

must_not_say: >
  大丈夫です / みなし再入国で1年は安全 / いつ帰っても問題なし / 在留期限は関係ない

suggested_next_question: >
  現在の在留期限・出国予定期間・在留資格の種類を教えてください。

human_confirm_hint: >
  出国中に在留期限を迎える可能性がある場合は、出国前に再入国許可の種類と有効性の確認を推奨。
```

---

## FA-15 — card_lost

```yaml
anchor_id: card_lost
trigger_keywords:
  - 在留カード
  - 紛失
  - 盗難
  - 失くした
  - 再発行
  - 届出

must_consider: >
  在留カードを紛失・盗難した場合は14日以内に市区町村への届出が必要。
  再発行は入管局への申請が必要。
  在留カードは常時携帯義務があり、紛失状態が続くと義務違反になる可能性がある。

must_not_say: >
  すぐ再発行できます / 問題ありません / 影響しません / 更新と同時でいいです

suggested_next_question: >
  紛失・盗難の時期と、現在お住まいの市区町村を教えてください。

human_confirm_hint: >
  在留期限の更新時期と重なる場合や、紛失から14日以上経過している場合は専門家への確認を推奨。
```

---

## Acceptance 自己確認

| 項目 | 状態 |
|---|---|
| A — 15 条全部 §3 フィールド充填 | ✅ FA-01〜FA-15 全15条 |
| B — 全条件 `must_not_say` 含む | ✅ 全15条に記載 |
| C — trigger_keywords は anchor trigger のみ（risk keyword と役割区別） | ✅ |
| D — ファイル頭 `draft / needs human review` | ✅ |
| E — 600 行以内 | ✅ |

> すべての anchor は `draft / needs human review`。
> production 使用には PL 裁決が必要。
> ENGINE #39 が keyword matching + prompt injection を実装する。DOMAIN は内容仕様のみ提供。
