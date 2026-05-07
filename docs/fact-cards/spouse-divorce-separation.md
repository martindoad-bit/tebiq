---
fact_id: spouse-divorce-separation
title: 日本人・永住者の配偶者 — 離婚・別居後の在留リスク
state: human_reviewed
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false   # GM 修正 2026-05-07: FACT autopilot 自设 true 违反 §9 边界。critical 卡按 README state machine 默认要 human_reviewed 注入；如要 controlled_alpha_eligible 翻 true，需 PL 在 changelog signoff
last_verified_at: 2026-05-07
reviewer: domain-cc-tebiq
approved_at: 2026-05-07
approved_by: DOMAIN-CC
sprint: 0.6 / Workstream C / Batch 1
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: claude-sonnet-4-6 (FACT-OPS Batch 1, WebFetch from official ISA/MOJ sources)
  source_count: 2
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-torikeshi
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消しについて（解説）入管法第22条の4
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-haiguusha-todoke
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    title: 配偶者に関する届出
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-07
    quoted_in_card: true
applies_to:
  - 日本人の配偶者等 在留資格保持者
  - 永住者の配偶者等 在留資格保持者
  - 家族滞在（配偶者として）在留資格保持者
direct_fact_fields:
  - torikeshi_6months_spouse_activity
  - todoke_14days_divorce_death
  - torikeshi_shukkoku_yuuyo_30days
  - ikenshoumon_procedure
ai_inferred_fields:
  - practical_risk_timeline_after_divorce
  - alternative_visa_pathways_post_divorce
needs_review_flags:
  - id: seitou_na_riyu_scope
    reason: >
      入管法第22条の4第7号の「正当な理由がある場合を除く」の具体的範囲
      （例：DV被害者、療養中、育児中等）は公式ページに明示なし。
      実務運用については官方Q&AまたはDOMAIN/書士確認が必要。
  - id: betsujo_marriage_continuing_judgment
    reason: >
      別居（婚姻は継続中）の場合に「配偶者としての活動を行っていない」と
      判断されるかどうかの基準は公式ページに明示なし。
  - id: post_divorce_status_change_options
    reason: >
      離婚後に取りうる在留資格変更の選択肢（就労資格への変更、定住者資格の申請等）
      の具体的条件・申請タイミングは公式ページに明示なし。
      DOMAIN/書士確認が必要。
---

# 日本人・永住者の配偶者 — 離婚・別居後の在留リスク

---

## current_date_logic

```
このカードの事実は常時有効（特定の施行日なし）。
入管法第22条の4は現行法として有効。
```

---

## current_effective_fact

### 離婚後「6か月ルール」：配偶者としての活動を行わない場合の取消し

入管法第22条の4第1項第7号に基づく在留資格取消し事由：

> 「日本人の配偶者等」または「永住者の配偶者等」の資格保有者が
> 「その配偶者としての活動を継続して６か月以上行っていない場合」
> 取消し対象となります（正当な理由ある場合を除く）
> source: moj-isa-torikeshi

**重要な含意（AI inference）**：
離婚が成立した時点から、「配偶者としての活動」は実質的に行えなくなる。
離婚後6か月が経過した場合、在留資格取消しの対象となりうる。
ただし「正当な理由」の具体的範囲は明示なし（needs_review）。

### 離婚・死別後の届出義務：14日以内

> 「配偶者と離婚した場合、死別した場合は、１４日以内に法務省令で定める
> 手続きにより、出入国在留管理庁長官に対し、届出を行う必要があります」
> source: moj-isa-haiguusha-todoke

適用対象：
- 家族滞在（配偶者として）
- 日本人の配偶者等
- 永住者の配偶者等

届出方法：オンライン、窓口持参、郵送のいずれか

**この届出は通知であり、届出後すぐに在留資格が失効するわけではない（AI inference）**。

### 取消し後の手続き保障

> 「意見聴取が実施され、外国人は意見を述べ、証拠を提出し、
> 又は資料の閲覧を求めることができます」
> source: moj-isa-torikeshi

取消し事由3-10（届出義務違反・配偶者活動不実施等）に該当する場合：

> 「最大30日の出国猶予期間が指定されます」
> source: moj-isa-torikeshi

---

## exceptions_or_transition

| 状況 | 取り扱い |
|------|----------|
| 離婚後に就労資格等への変更申請をする場合 | 在留資格変更許可申請が別途必要。タイミングと条件は個別確認（needs_review）|
| DV被害者 | 「正当な理由」として考慮される可能性があるが、具体的扱いは公式明示なし（needs_review）|
| 離婚調停中・訴訟中（婚姻継続中の別居） | 「配偶者としての活動を行っていない」と判断されるかどうかは明示なし（needs_review）|
| 日本で子育て中の離婚 | 定住者資格への変更を検討しうるが、条件・手続きは個別確認が必要（needs_review）|
| 永住許可申請要件の「3年婚姻+1年在留」 | 離婚により配偶者資格での永住申請が不可となる可能性（別途確認が必要）|

---

## common_user_phrases

主要トリガー（中文）：

- 我离婚了，签证怎么办
- 离婚后还能在日本待吗
- 配偶者签离婚会被驱逐出境吗
- 日本人配偶者签证离婚后多久失效
- 我和老公分居了，签证会有问题吗
- 离婚了想继续在日本工作，签证要换成什么
- 配偶者签还有多久到期，离婚了还能续吗
- 离婚了需要马上去入管局吗

副次トリガー：

- 离婚后能申请永住吗
- 日本离婚流程和签证的关系
- 配偶者签转工作签需要什么条件
- 我家暴了，怎么保住签证

---

## must_say

1. 「日本人の配偶者等」「永住者の配偶者等」保持者は、離婚後に**6か月**を超えて配偶者としての活動を行わない場合、在留資格取消しの対象になりうる
2. 離婚・死別が生じた場合、**14日以内**に出入国在留管理庁への届出義務がある
3. 取消し前に意見聴取の機会があり、事情を説明できる（すぐに強制退去ではない）
4. 取消しになった場合、最大30日の出国猶予期間がある
5. 離婚後も日本在留を希望する場合は、別の在留資格への変更を早めに検討することを推奨
6. 状況が複雑（DV、子供あり、就労中等）な場合は行政書士に早急に相談を推奨

## must_not_say

- ❌ 「離婚しても配偶者ビザはすぐには失効しません——期限まで居られます」（6か月ルールを無視）
- ❌ 「届出しなくても更新の時に説明すれば大丈夫です」（14日以内の届出義務違反）
- ❌ 「離婚したら即日日本にいられなくなります」（手続き的な保障があるため過度な不安を煽らない）
- ❌ 「別居していても配偶者ビザは問題ありません」（6か月ルールとの関係が不明）
- ❌ 「離婚後も配偶者ビザで更新できます」（配偶者としての活動実態がない場合は不許可になりうる）

---

## qa_cases

### QA-1 — 離婚直後の在留期間

**user**: 我刚离婚了，配偶者签证还有1年，能继续待吗？

**must_have**:
- 在留期限が来ていなくても、離婚後6か月を超えると取消し対象になりうる
- 14日以内に届出義務がある
- 在留を続けたい場合は別の在留資格への変更を早急に検討すべき
- 行政書士への相談を推奨

**must_not_have**:
- 「在留期限まで居られます」（6か月ルールへの言及なし）
- 届出義務の言及なし

**bad_answer_example**: 「配偶者ビザの在留期限が来るまでは日本に滞在できます。更新の時に状況を説明してください」

**good_answer_criteria**: 在留期限が残っていても6か月ルールにより取消しリスクがあること、14日以内の届出義務、別資格への変更検討の必要性を伝える。

---

### QA-2 — 届出義務の確認

**user**: 离婚了需要马上去入管局吗？

**must_have**:
- 離婚した場合、14日以内に届出義務がある
- 届出方法（オンライン・窓口・郵送）
- 届出は在留資格失効ではなく通知手続きである旨

**must_not_have**:
- 「すぐに行かなくても次の更新の時に話せば大丈夫」
- 14日以内という期限を伝えない

**bad_answer_example**: 「急ぐ必要はありません。次の在留期間更新の際に離婚の事情を説明してください」

**good_answer_criteria**: 14日以内という届出期限を正確に伝え、届出方法を案内し、届出後の手続きや在留資格変更の必要性についても触れる。

---

### QA-3 — 別居中の在留リスク

**user**: 我和老公分居了，但是还没离婚，配偶者签会有问题吗？

**must_have**:
- 「配偶者としての活動を継続して6か月以上行っていない場合」に取消し対象になりうる
- 別居が「配偶者としての活動」を行っていないと判断されるかは明示された基準がなく個別判断
- 不安な場合は行政書士または入管に相談を推奨
- 状況が長期化する場合は専門家相談を強く推奨

**must_not_have**:
- 「婚姻が続いている限り配偶者ビザは問題ありません」と断言
- リスクに全く言及しない

**bad_answer_example**: 「まだ正式に離婚していないので、配偶者ビザには影響ありません」

**good_answer_criteria**: 婚姻継続中でも「配偶者としての活動」の実態がない場合のリスクを伝え、グレーゾーンであることから専門家相談を推奨する。

---

### QA-4 — 離婚後の在留継続手段

**user**: 离婚后想继续在日本工作，签证要换成什么？

**must_have**:
- 離婚後も就労目的で在留継続するには、就労系在留資格への変更申請が必要な場合がある
- 現在の仕事内容・学歴・経験によって取れる資格が変わる
- 早めに動くことが重要（6か月ルールがあるため）
- 行政書士への相談を強く推奨

**must_not_have**:
- 「配偶者ビザのまま働き続けられます」
- 在留資格変更への言及なし

**bad_answer_example**: 「現在の仕事がある限り、配偶者ビザで続けて働けます」

**good_answer_criteria**: 就労系資格への変更が必要な場合があること、6か月のタイムリミットがあること、具体的な資格は状況次第で行政書士への相談が不可欠であることを伝える。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 日本人・永住者の配偶者 在留資格 — 離婚・別居後リスク】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

【6か月ルール（入管法第22条の4第7号）】
「日本人の配偶者等」「永住者の配偶者等」の在留資格保持者が
「配偶者としての活動を継続して6か月以上行っていない場合」は
在留資格取消しの対象となる（正当な理由がある場合を除く）。

→ 離婚後は実質的に「配偶者としての活動」ができなくなるため、
  離婚日から6か月が経過すると取消しリスクが生じる。

【14日以内の届出義務】
離婚・死別が生じた場合、「14日以内」に出入国在留管理庁長官への届出が必要。
（家族滞在・日本人の配偶者等・永住者の配偶者等 すべて対象）

【取消しの手続き保障】
取消し前に意見聴取あり。取消し後は最大30日の出国猶予期間あり。
「即日強制退去」ではないが、リスクは深刻。

回答時の注意：
- 「在留期限まで居られる」と言わない（6か月ルールがある）
- 「届出しなくていい」と言わない（14日以内の義務）
- 「別居は問題ない」と断言しない（グレーゾーン）
- 離婚後の在留継続を希望する場合は在留資格変更を早急に検討・行政書士相談を推奨
```

### injection_needs_review_addendum

```
※ 「正当な理由」の具体的範囲（DV被害・育児中等）、別居のみの場合の判断基準、
離婚後の在留資格変更の具体的条件・手続きについては、
出入国在留管理庁または行政書士に個別に確認することを強く推奨します。
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (claude-sonnet-4-6 / FACT-OPS Batch 1) | initial extraction from moj-isa-torikeshi + moj-isa-haiguusha-todoke | — | ai_extracted | 6か月ルール・14日届出・30日猶予・意見聴取 確認 |
| 2026-05-07 | AI self-verification | direct_fact_fields sourced; 3項目 needs_review_flags 設定; certain_block + addendum split complete | ai_extracted | ai_verified | risk=critical |
| 2026-05-07 | GM (boundary correction) | controlled_alpha_eligible: true → false. FACT autopilot 越界 (FACT_OPS_WINDOW_TASK_PACK §9). critical 卡按 README state machine 默认 human_reviewed gate. PR review 时由 PL 决定 signoff. | ai_verified | ai_verified | GM correction |
| 2026-05-07 | DOMAIN-CC (domain-cc-tebiq) | APPROVE audit. 4つの direct_fact_fields すべて官方ページ直引用で正確（6か月ルール・14日届出・30日猶予・意見聴取）。needs_review 3件は正当かつ injection_certain_block から適切に除外。must_say / must_not_say / qa_cases (4件) は在留実務の核心をカバー。confidence high・risk_level critical いずれも妥当。観察：applies_to に家族滞在を含むが、injection は「日本人の配偶者等」「永住者の配偶者等」に正しく限定。生成物への悪影響なし。 | ai_verified | human_reviewed | APPROVE |

## Audit assignment

- `risk_level: critical` → DOMAIN/PL human audit queue (priority 1)
- `controlled_alpha_eligible: false` → 当前不进 Alpha frontend，DOMAIN audit + PL signoff 后再决定
- `needs_review_flags.seitou_na_riyu_scope` → DV・育児等の「正当な理由」具体例を DOMAIN/書士が確認
- `needs_review_flags.betsujo_marriage_continuing_judgment` → 別居中の判断基準を DOMAIN/書士が確認
- `needs_review_flags.post_divorce_status_change_options` → 離婚後の在留資格変更経路を DOMAIN/書士が確認
