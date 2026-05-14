---
asset_id: guardrail-gaikokujin-juutaku-sabetsu
title: 外国人に対する住居入居差別と法的保護 — 日本には外国人の住宅入居差別を直接禁止する一般法がない；住所登録ができないと在留管理上の問題が生じうる；法務局の人権相談・外国人向け住まいサポートを活用できる；在留資格は住居差別の直接原因とはならないが住所不登録は在留リスクを生む
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

This guardrail prevents errors about the legal protections available to foreign nationals who face housing discrimination in Japan, and the connection between housing access and immigration status. Key errors to block:

1. **"日本では外国人の入居差別は違法なので，裁判を起こせば必ず勝てる。"** — incorrect. 日本には外国人の住宅入居差別を包括的に禁止する一般法は存在しない（2026年5月現在）。宅地建物取引業法・民法上の一般原則に基づく救済は理論上ありうるが，差別そのものを明示的に違法と定める法律がなく，法的救済の実効性は限定的。
2. **"在留資格があれば，住居を断られることはない。"** — incorrect. 在留資格の有無にかかわらず，外国人というだけで入居を断られるケースが広く報告されている。在留資格の種別・期間が賃貸契約の審査に影響することはあるが，差別そのものを防ぐ法的保護はない。
3. **"住所が登録できなくても，在留資格の更新・申請には関係ない。"** — incorrect. 中長期在留者は住民登録（住民票作成）が義務付けられており，住所を持てない状態（住居が確保できない状態）は在留カードの住所記載義務・届出義務に影響する。住所未登録状態が長期化すると在留管理上の問題が生じうる（G29・G30参照）。
4. **"外国人への住居差別に対する日本の法的救済はまったくない。"** — too pessimistic. 法務局の人権相談窓口・外国人向け住まいサポートネット（国土交通省推進事業）・宅地建物取引業者への行政指導等の手段がある。また民法上の不法行為責任（不当な差別的取扱いが不法行為を構成する余地）はゼロではない。

## Trigger

Use this card when the user says:

- "外国人だからという理由で，アパートを断られました。これは違法ですか？"
- "不動産業者が『外国人はお断り』と言っています。どうすればいいですか？"
- "在留資格があるのに，住居が借りられません。"
- "日本での住所が確保できていませんが，在留申請に影響しますか？"
- "外国人の入居差別に対して，どこに相談すればいいですか？"
- any pattern suggesting that housing discrimination is clearly illegal in Japan, or that immigration status fully protects against housing discrimination.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| sumai-saito-net | L4 | 国土交通省「住まいサポートネット（外国人の住まい相談）」 | https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk5_000025.html | 2026-05-15 | 外国人住まいサポートネットの案内; 法務省・国土交通省連携施策; 入居差別への行政上の対応. |
| jinken-sodanin | L4 | 法務省「外国人のための人権相談」 | https://www.moj.go.jp/JINKEN/jinken21.html | 2026-05-15 | 外国人向け人権相談窓口（0570-090-911）; 入居差別・ハラスメント等の相談対応; 法務局職員による相談. |
| takken-gyoho | L1 | 宅地建物取引業法（第47条・第47条の2等） | https://laws.e-gov.go.jp/law/327AC0000000176 | 2026-05-15 | 重要事項説明義務; 不当な差別的取扱いの禁止に関する行政指導の根拠; 宅建業者への監督. |
| g29-todoke | guardrail | guardrail-todoke-gimu-ihan-kekka (G29) | internal | 2026-05-15 | G29: 在留カードの住所記載義務・届出義務（14日以内）; 住所未登録の在留管理リスク. |
| g30-juusho-fuitchi | guardrail | guardrail-juusho-fuitchi-risk (G30) | internal | 2026-05-15 | G30: 住民票と在留カードの住所不一致リスク; 住所未更新の在留申請への影響. |
| g18-juusho-henkou | guardrail | guardrail-address-change-dual-obligation (G18) | internal | 2026-05-15 | G18: 住所変更の届出義務（14日以内; 市区町村役場・ISA）. |

## Official Rule Or Source Fact

**日本における外国人住宅入居差別の法的位置づけ:**

- 日本には外国人の住宅入居差別を包括的に禁止する一般法は存在しない（雇用分野の外国人差別禁止規定はあるが，住宅については明文規定なし; 2026年5月現在）
- 民法上の一般原則（不法行為・信義則等）に基づき，差別的取扱いが不法行為を構成する可能性はゼロではないが，明確な判例法理は形成されていない
- 宅地建物取引業法: 宅建業者に対し，「正当な理由」のない差別的取扱いの禁止を行政指導レベルで推進しているが，明文の禁止規定ではない

**国・自治体の施策:**

- **国土交通省「住まいサポートネット」（外国人の住まい確保支援）**: 外国人受入れ宣言事業者（入居可能な物件・管理会社のリスト）を提供; 多言語対応の相談窓口
- **法務省「外国人のための人権相談窓口」（0570-090-911）**: 入居差別・ハラスメント等の相談を受付; 悪質な差別事案については人権侵犯調査・啓発活動が行われる
- **地方自治体の外国人相談窓口**: 住居確保に関する支援情報（民間支援団体・公営住宅への申し込み支援等）を提供するケースがある

**住所未登録と在留管理リスク:**

中長期在留者（在留期間3か月超の外国人）は住民登録（住民票作成）が義務付けられている:
- 住居が確保できず住所登録ができない状態が続くと: 在留カードの住所記載義務（G29・G30参照）に違反するリスク
- 住所変更・転居届出（14日以内）の義務（G18参照）は，住居を持つことを前提としている
- 「住所なし」状態は，更新申請書類（住民票）の取得・提出にも支障をきたす → 更新審査上の問題が生じうる

**公営住宅への外国人の申込み:**

- 地方自治体の公営住宅（市営・都営・県営）は，外国人居住者（中長期在留者）にも申込資格がある場合が多い（自治体により異なる）
- 永住者・定住者・日本人の配偶者等は，公営住宅の申込み要件を満たす場合が多い
- 在留期間・在留資格の種別によって要件が異なる場合があるため，各自治体の窓口に確認が必要

**入居差別に遭った場合の実務的対応:**

1. **法務省人権相談（0570-090-911）**: 相談・記録; 悪質事案は人権侵犯調査へ
2. **国土交通省「住まいサポートネット」**: 外国人受入れ宣言事業者・物件の検索
3. **地方自治体の外国人相談窓口**: 住居確保支援; 民間支援団体の紹介
4. **宅建業者への苦情申立て**: 都道府県の宅建業担当課（都市整備局等）への苦情申立て → 行政指導の可能性
5. **弁護士・法テラス**: 不法行為に基づく損害賠償請求の可否確認（ハードルは高い）

## Safe Answer Behavior

- When asked if housing discrimination against foreigners is illegal: accurately state that Japan has no general law prohibiting such discrimination; explain what practical remedies exist (government support programs, human rights consultation).
- When asked about the link between housing and immigration: clearly explain that not having a registered address creates a real immigration risk (届出義務, 住民票), separate from the discrimination issue itself.
- When asked where to seek help: route to 法務省人権相談 (0570-090-911) and 国土交通省「住まいサポートネット」as primary public resources; note legal action as a difficult but theoretically available option.
- When asked about public housing: confirm that PR/定住者/日本人の配偶者等 holders often meet eligibility, but advise checking with the specific local authority.

## Must Say

- 日本には外国人の住宅入居差別を包括的に禁止する一般法は現時点では存在しない。
- 住所登録ができない状態が続くと，中長期在留者としての届出義務違反・在留申請上の支障等の在留管理リスクが生じる。
- 入居差別に遭った場合は，法務省の人権相談窓口（0570-090-911）または国土交通省の「住まいサポートネット」に相談できる。

## Must Not Say

- 「日本では外国人の入居差別は違法なので，裁判で必ず勝てる。」（一般法なし；勝訴保証はない）
- 「在留資格があれば，入居を断られることはない。」（在留資格の有無と差別は別の問題）
- 「住所が登録できなくても在留申請には関係ない。」（住所登録は届出義務・住民票取得・在留審査に直結する）

## Deep Water Triggers

- 外国人の賃貸契約に際して，保証人が日本人であることを条件とする慣行の合法性
- 日本の民法上，外国人に対する差別的条件（外国人お断り条項付き賃貸借契約）が公序良俗違反（民法第90条）として無効になる可能性
- 技能実習生・育成就労者の宿泊施設を雇用主が提供する場合の最低基準（労基法上の宿舎基準）
- 公営住宅への申込み資格における在留資格別の要件（自治体ごとの差異）
- ホームレス状態の外国人に対する社会福祉サービスの利用可否と在留資格の関係

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who have experienced housing discrimination: route to 法務省人権相談 (0570-090-911) for consultation and record-keeping; route to 国土交通省「住まいサポートネット」for finding accepting properties.
- For persons without a registered address: urgently flag the immigration obligation issue (G29・G30); route to local ward office or 行政書士 for住民票 registration and 在留カード住所変更 procedures.
- For persons seeking legal redress: route to 法テラス for legal aid consultation; flag that legal claims are difficult without a clear statutory prohibition.
- For persons eligible for public housing: route to the relevant local authority housing office; confirm eligibility by visa status.

## Unknown Fields

- Whether Japan's 外国人差別禁止法 (anti-discrimination law) proposals as of 2026 have resulted in any enacted legislation covering housing discrimination.
- The specific cases (if any) where Japanese courts have found housing discrimination against foreign nationals to constitute an unlawful act under general tort principles.

## Needs Domain Flags

- needs_domain (P1): Is there any enacted legislation (as of 2026) or confirmed judicial precedent in Japan that directly prohibits housing discrimination against foreign nationals and provides an effective remedy? This would significantly change the guidance on legal options.
- needs_domain (P1): For persons in 不法在留 or irregular status who have no registered address — what is the practical immigration risk if they attempt to register a residential address at a ward office (will this trigger ISA referral), and are there any officially recognized protection mechanisms?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| juutaku-001 | "外国人だからという理由でアパートを断られました。これは違法ですか？どうすればいいですか？" | State: 日本には外国人の住宅入居差別を包括的に禁止する一般法は現時点では存在しない。違法と断言することは難しいが，法務省の人権相談窓口（0570-090-911）または国土交通省の「住まいサポートネット」に相談することができる。外国人受入れ宣言事業者の物件を探すことも現実的な選択肢。 |
| juutaku-002 | "住む場所がなくて住所登録ができていません。在留申請に影響しますか？" | State: 中長期在留者（在留期間3か月超）は住民登録が義務付けられており，住所登録ができない状態が長期化すると届出義務違反・住民票取得困難・在留申請上の支障が生じうる。地域の外国人相談窓口・支援NPO・法テラスに相談し，住居確保を早急に行うことを強く推奨する。 |
| juutaku-003 | "外国人の入居差別に対して，法的に損害賠償を請求できますか？" | State: 日本には外国人住宅入居差別を明示的に禁止する一般法がないため，損害賠償請求は法的ハードルが高い。民法上の不法行為（第709条）に基づく請求が理論上は可能だが，明確な判例はなく，弁護士・法テラスへの相談が必要。まずは法務省の人権相談窓口（0570-090-911）に相談し，記録を残すことを推奨する。 |

## Source Notes

- 国土交通省「住まいサポートネット」: 外国人の住まい確保支援; 外国人受入れ宣言事業者リスト; 多言語相談対応.
- 法務省「外国人のための人権相談」（0570-090-911）: 入居差別・人権侵害の相談窓口; 人権侵犯調査.
- 宅地建物取引業法（第47条等）: 宅建業者への行政指導の法的根拠.
- Cross-ref G18（住所変更届出義務），G29（届出義務違反の法的結果），G30（住所不一致リスク）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 022 G120. Key sources: 国土交通省「住まいサポートネット」; 法務省「外国人のための人権相談」（0570-090-911）; 宅地建物取引業法. Core facts: 日本に外国人住宅差別禁止の一般法なし; 住所未登録=在留管理リスク; 相談先=法務省人権相談・住まいサポートネット. needs_domain P1: 住宅差別禁止法の有無・制定動向; 不法在留者の住所登録とISA情報共有方針. Cross-ref G18, G29, G30.
