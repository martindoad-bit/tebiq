---
asset_id: guardrail-shuro-daigakuin-kengaku
title: 就労系在留資格と大学院・大学進学（兼学）の関係 — 就労系在留資格のまま大学院に在籍する場合は本業活動の継続証明が重要；「留学」への変更なく就労活動を停止して本格的に学業に専念することは在留資格の活動実態不整合リスク；資格外活動許可の逆方向（就労→学習）は存在しない
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 022"
---

## What This Document Is

This guardrail prevents errors about the relationship between employment-based visa statuses and university/graduate school enrollment in Japan. Key errors to block:

1. **"技人国で日本にいれば，大学院にも自由に入学・通学できる。"** — partially correct but incomplete in a dangerous way. 就労系在留資格保持者が大学院・大学に入学すること自体は禁止されていないが，就労系在留資格で「就労活動をほとんど行わず，実質的に留学生として通学している」状態は在留資格の活動実態不整合（活動を行っていない状態）として取消リスクを生じさせる（G26参照）。
2. **"大学院に入学したいので，就労系在留資格はそのままで『資格外活動許可』を取れば学べる。"** — incorrect framing. 資格外活動許可（包括許可）は「留学」「家族滞在」が就労活動を補完的に行うための制度であり，逆方向（就労系在留資格保持者が学習活動を行う）への許可制度は存在しない。就労系在留資格保持者の大学院通学は，在留資格の活動範囲外の活動ではなく，あくまで本業就労を主たる活動として継続しながら兼学する形が許容される。
3. **"会社に籍を置きながら大学院に行くことと，在留資格は関係ない。"** — incorrect risk assessment. 更新申請時に「就労活動の継続証明」が審査される（G31参照）。勤務実態がない・給与支払いが停止している・業務時間の大半を大学院活動に充てているという状況は，在留資格更新審査に影響しうる。
4. **"MBAや大学院に通学するなら，技人国から留学に変更する必要がある。"** — not necessarily required, but sometimes preferable. 本業（会社勤務）を継続しながら大学院に通学する場合は，在留資格変更は必須ではない。ただし，本業を休職・退職して大学院に専念する場合は「留学」への変更が適切。

## Trigger

Use this card when the user says:

- "技人国ビザのまま，日本の大学院に入学できますか？"
- "MBAに通いたいのですが，在留資格を変更する必要がありますか？"
- "会社を休職して大学院に通う場合，ビザはどうなりますか？"
- "就労ビザで大学の授業を取ってもいいですか？"
- "就労資格から留学ビザに変更せずに，大学院に通えますか？"
- any pattern suggesting that employment visas automatically cover full-time graduate study, or that there is a special permit for visa holders to study.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-ho-22-4 | L1 | 出入国管理及び難民認定法第22条の4（在留資格の取消し） | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 在留資格の活動実態不整合（正当な理由なく在留資格に係る活動を3か月以上行わない）= 取消事由（第22条の4第1項第6号）. |
| g26-torikeshi | guardrail | guardrail-zairyu-shikaku-torikeshi-22-4 (G26) | internal | 2026-05-15 | G26: 在留期間内でも取消事由あり; 就労活動を行っていない場合の取消リスク; 正当理由の要否. |
| g31-koshin-kijun | guardrail | guardrail-koshin-henkou-shinsa-kijun (G31) | internal | 2026-05-15 | G31: 更新審査では就労継続・生計・素行等を総合評価; 就労実態がない場合の更新拒否リスク. |
| g24-shikakugai | guardrail | guardrail-shikakugai-hokatsu-vs-kobetsu (G24) | internal | 2026-05-15 | G24: 資格外活動許可（包括）は留学・家族滞在のみが対象; 就労資格保持者に逆方向の「学習許可」は存在しない. |
| g55-fukugyo | guardrail | guardrail-fukugyo-kengyo-zairyu-seigen (G55) | internal | 2026-05-15 | G55: 就労系在留資格は活動範囲内の副業のみ許容; 活動範囲外の業務や本業停止状態のリスク. |
| ryugaku-status | L4 | 出入国在留管理庁「在留資格『留学』」 | https://www.moj.go.jp/isa/applications/status/student.html | 2026-05-15 | 留学の在留資格=本邦の大学等において教育を受ける活動; 就労系在留資格からの変更申請. |

## Official Rule Or Source Fact

**就労系在留資格と学習活動の基本ルール:**

就労系在留資格（技人国・特定技能・経営管理・介護・教授等）の保持者は，在留資格の活動範囲（就労・業務遂行）を主たる活動として継続することが前提。

大学院・大学への入学自体は禁止されていないが:
- **就労系在留資格の継続条件**: 在留資格に係る就労活動を継続していること（就労活動なしに「留学生」として通学することは，在留資格の活動実態と不整合）
- **取消リスク（G26参照）**: 正当な理由なく在留資格に係る活動を3か月以上行わない場合，在留資格が取消しの対象になりうる（入管法第22条の4第1項第6号）

**就労しながら大学院に通学するケース（兼学）:**

- 会社勤務（本業）を継続しながら夜間・週末の大学院コース（社会人向けMBAコース等）に通学: 原則として在留資格変更不要
- ただし更新申請時には就労の継続実態を証明する書類（源泉徴収票・給与明細・在職証明書等）が必要（G31・G66参照）
- 大学院の授業・研究に充てる時間が増え，就労時間が実質ゼロになる場合は要注意

**本業を休職して大学院に専念するケース:**

- 会社を休職（給与停止・業務中断）して大学院に専念する: 在留資格「技人国」等の活動実態がなくなる → 取消リスク・更新リスクが生じる
- 推奨ルート: 休職前に在留資格を「留学」に変更（在留資格変更許可申請）
- 留学から技人国への復帰: 大学院修了後，就職先が確定すれば「技人国」等に変更申請

**本業を退職して大学院に入学するケース:**

- 技人国保持者が退職し在籍企業との雇用関係を終了: 在留資格の就労基盤が失われる
- 在留資格変更（「留学」等）をせずに退職後もしばらく在留→ 活動不実施として取消対象となりうる
- 退職後は速やかに「留学」等への変更申請が必要

**資格外活動許可の方向性（就労→学習は対象外）:**

- 資格外活動許可（包括許可）は「留学」「家族滞在」保持者が就労活動を補完的に行うための制度（G24参照）
- 就労系在留資格保持者が大学院の学習活動（研究補助・TA等で報酬を得る場合含む）を行うための「学習許可」という制度は存在しない
- 大学院のTAや研究補助で報酬を受ける場合: 業務内容が在留資格の活動範囲内（例: 技術系の研究補助で技人国の業務範囲内）であれば問題ない場合があるが，個別判断が必要

**社会人大学院（MBA等）の実務上の扱い:**

- 多くの就労系外国人が夜間・週末MBAコースに通学しながら在留: 本業就労の継続が前提であれば，在留資格上の問題は通常生じない
- 更新審査では，所属会社の継続雇用・報酬・業務内容が審査される（大学院在籍は審査要素にならない）

## Safe Answer Behavior

- When asked about graduate school enrollment with employment visa: confirm that enrollment itself is not prohibited, but full-time study without continued employment creates a risk; clarify the distinction between part-time study while employed vs. full-time study on leave.
- When asked about taking leave to study: recommend changing to 留学 status before the leave begins; explain the cancellation risk if status is not changed.
- When asked about 資格外活動許可 for studying: clarify that no such permit exists in the reverse direction (employment visa + study permit); the employment visa activity must remain the primary activity.
- When asked about MBA programs: confirm that part-time/evening MBA programs while remaining employed are generally compatible; flag the need to maintain employment proof at renewal.

## Must Say

- 就労系在留資格（技人国等）保持者が大学院・大学に在籍すること自体は禁止されていないが，就労活動を継続しながら通学することが前提。
- 本業を休職・退職して大学院に専念する場合は，在留資格「留学」への変更が必要。就労資格のままでは在留資格の活動実態がなくなり，取消リスクが生じる。
- 就労系在留資格に対して「学習活動許可」（資格外活動許可の逆方向）という制度は存在しない。

## Must Not Say

- 「技人国ビザがあれば，日本の大学院でも自由に学べる（就労を止めても問題ない）。」（就労継続が前提）
- 「資格外活動許可を取れば，就労ビザのまま学業に専念できる。」（そのような制度は存在しない）
- 「会社を休職して大学院に行っても，在留資格には影響しない。」（活動実態不整合として取消リスクがある）

## Deep Water Triggers

- 技人国保持者が所属企業の業務として大学院に入学（企業から学費支給・研究出向等）する場合の在留資格の扱い
- 大学院での研究活動が「教授」または「研究」資格の活動範囲に該当する場合，在留資格変更の必要性
- 留学から技人国への変更申請中（特例期間）に大学院の単位を修得しながら就労を開始することの在留資格上の扱い
- 特定技能1号保持者が夜間大学院に通学する場合，分野の試験・技能要件への影響はあるか
- 研究資格（研究）と大学院生（留学）の活動範囲が重複する公的研究機関での外国人研究者の在留資格選択

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who want to study part-time while working: confirm employment must continue; advise maintaining documentary proof of employment at renewal.
- For persons planning to take leave to study: route to 在留資格変更（留学）before the leave; route to ISA or immigration lawyer for timing advice.
- For persons who already quit their job to study without changing status: flag the risk urgently; route to immigration lawyer for emergency change application before the 3-month window closes.
- For MBA/evening program students: confirm generally safe if employment is maintained; no change needed.

## Unknown Fields

- Whether ISA has any official published guidance on the specific conditions under which 就労系在留資格 holders may attend graduate school without changing status.
- Whether a long-term company secondment arrangement to attend graduate school (保税出向) satisfies the employment continuity requirement for visa purposes.

## Needs Domain Flags

- needs_domain (P1): Is there ISA official guidance (通達・運用要領) on the specific conditions under which a 技人国 holder may attend graduate school while remaining on their employment visa — particularly the minimum employment hours or salary requirement during a graduate school period?
- needs_domain (P1): What is ISA's official position on the 3-month activity non-performance rule (第22条の4) when the person is on official company-approved 休職 for graduate study — does having a formal leave arrangement with the employer constitute a "正当な理由" for the activity gap?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| daigakuin-001 | "技人国ビザを持っています。会社に勤めながら夜間MBAに通いたいです。ビザを変更する必要がありますか？" | State: 会社勤務（本業）を継続しながら夜間・週末MBAコースに通学する場合，在留資格変更は原則不要。更新申請時には就労継続の実態（源泉徴収票・在職証明書等）を証明する必要がある。本業就労が主たる活動として継続していることが重要。 |
| daigakuin-002 | "会社を休職して大学院に通いたいです。ビザはどうなりますか？" | State: 会社を休職（給与停止・業務中断）して大学院に専念する場合，就労系在留資格（技人国等）の活動実態がなくなるため，在留資格「留学」への変更申請が必要。変更せずに休職・通学を続けると，在留資格の活動実態不整合として取消リスクが生じる。休職開始前に行政書士・弁護士に相談することを推奨する。 |
| daigakuin-003 | "就労ビザのまま大学院に通うための『学習許可』はありますか？" | State: 就労系在留資格保持者が大学院・大学の学習活動を行うための「学習許可」（資格外活動許可の逆方向）という制度は存在しない。就労系在留資格保持者は，本業就労を継続しながら大学院に通学することは認められる。本業を停止・休職して学業に専念する場合は在留資格「留学」への変更が必要。 |

## Source Notes

- 在留資格取消事由: 入管法第22条の4第1項第6号（正当な理由なく在留資格に係る活動を3か月以上行わない場合）.
- 在留資格更新審査: ISA更新審査ガイドライン（就労継続・生計・素行等の総合評価）（G31 cross-ref）.
- 資格外活動許可（包括許可）の対象: 留学・家族滞在のみ（G24 cross-ref）.
- 留学資格の活動定義: ISA「在留資格『留学』」ページ（本邦の大学等において教育を受ける活動）.
- Cross-ref G26（取消事由），G31（更新審査基準），G24（資格外活動許可の範囲），G55（副業・兼業制限）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 022 G118. Key sources: 入管法第22条の4（取消事由）; ISA更新審査ガイドライン（G31）; ISA「在留資格『留学』」ページ; G24（資格外活動許可). Core facts: 就労系在留資格保持者の大学院入学は本業継続が前提; 休職・退職して学業専念=「留学」変更が必要; 「学習許可」制度は存在しない. needs_domain P1: ISAの具体的なガイダンスの有無; 休職（正当理由）と活動不実施の官式見解. Cross-ref G26, G31, G24, G55.
