---
asset_id: guardrail-shinsei-genbon-honyaku-yoken
title: 在留申請における書類の原本・写し・翻訳文の要件 — 外国語書類には日本語訳が必要；写しが認められる書類と原本が必要な書類は種別ごとに異なる；申請人が翻訳者を明記
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 016"
---

## What This Document Is

This guardrail prevents errors about document requirements for immigration applications in Japan, specifically the requirements for originals vs copies and foreign-language document translations. Key errors to block:

1. **"外国語の書類はそのまま提出できる。"** — incorrect. 外国語で作成された書類は，**日本語の訳文を添付**して提出しなければならない（ISA の申請手続きガイドライン）。翻訳は専門家でなくてもよいが，翻訳者の氏名を明記する必要がある。
2. **"全ての書類は原本でなければならない。"** — incorrect. 申請書類によっては**写し（コピー）**が認められるものと，**原本**が必要なものがある。種別ごとに異なり，申請の種類（更新・変更・永住等）によっても異なる。
3. **"翻訳は認定翻訳者（公証人等）でなければ認められない。"** — incorrect. ISA は一般的に，翻訳者の資格を要求していない。申請人本人が翻訳することも認められる。ただし，翻訳者の氏名・押印（またはサイン）を添付することが求められる。
4. **"在留申請の書類は全国どのISA窓口でも受理される。"** — partially incorrect. 在留申請は原則として**住所地を管轄するISA（地方入管局）**に提出。窓口申請は管轄外でも受付けられる場合があるが，基本は住所地管轄。オンライン申請（eLTRC）は管轄に関係なくシステム上で処理される。

## Trigger

Use this card when the user says:

- "外国語の証明書は翻訳が必要ですか？"
- "在留申請の書類はコピーでいいですか？"
- "翻訳は行政書士でないとできませんか？"
- "在留申請の書類に原本が必要な書類はどれですか？"
- "外国の大学の卒業証明書を英語のまま提出できますか？"
- any pattern treating foreign-language documents as self-sufficient, or misunderstanding the certified translation requirement.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-shorui-yoken | L4 | 出入国在留管理庁「申請書類について」 | https://www.moj.go.jp/isa/applications/procedures/index.html | 2026-05-15 | 申請書類の基本要件; 外国語書類には日本語訳文が必要; 写しの取り扱い. |
| isa-honyaku | L4 | 出入国在留管理庁「外国語で作成された文書の取り扱い」 | https://www.moj.go.jp/isa/applications/procedures/zairyu_shinkoku01.html | 2026-05-15 | 翻訳者の氏名記載義務; 資格要件なし（専門家でなくとも可）; 翻訳文添付の義務. |
| g66-crossref | guardrail | guardrail-koshin-shorui-pattern (G66) | internal | 2026-05-15 | G66: 技人国・特定技能等の更新書類パターン; 各種類ごとの書類要件. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の書類要件（住民税証明書等の原本が必要なものを含む）. |

## Official Rule Or Source Fact

**外国語書類の取り扱い（ISA ガイドライン）:**

外国語で作成されたすべての書類には，**日本語の翻訳文を添付**しなければならない。

- **翻訳者の資格**: 不要（申請人本人・知人・専門家いずれでも可）
- **翻訳者の氏名記載**: 必要（「翻訳者: 氏名 ○○○」等を翻訳文に明記）
- **翻訳の形式**: ISA が指定する特定の様式はない; 書類の内容が正確に翻訳されていることが必要
- **偽りの翻訳**: 虚偽の翻訳は申請書の虚偽記載と同様のリスク（G27 cross-ref: 申請の正確性要件）

**原本と写し（コピー）の取り扱い:**

申請書類における原本・写しの要件は，書類の種別と申請の種類によって異なる。一般的な原則:

| 書類の種別 | 原本/写し | 備考 |
|---|---|---|
| 住民票・課税証明書・納税証明書等の行政書類 | **原本が必要** | 3か月以内発行のものを求めることが多い |
| パスポートの身分事項ページ | **写し（コピー）** | 在留カード同様，写しで可とする場合が多い |
| 在留カード | **写し（コピー）** | 表裏両面のコピー |
| 登記事項証明書 | **原本** | 発行から3か月以内のものが多い |
| 雇用契約書 | 写しが認められる場合が多い | 原本を持参して確認を求められることも |
| 大学卒業証明書・成績証明書 | 原本または認証済みの写し | 外国語のものは翻訳文添付 |
| 会社の決算書・財務諸表 | 写しが認められる場合が多い | 税務署の受付印があるものが望ましい |
| 在職証明書・労働条件通知書 | 写しが認められる場合が多い | — |

※実際の要件は申請の種類・申請先ISAの運用によって異なる。書類チェックリスト（ISA公式）を必ず確認。

**申請先のISA（管轄）:**

- 原則: **住所地を管轄するISA（地方入管局・支局）**
- 例: 東京都在住→東京入管（品川）; 大阪府在住→大阪入管
- 出張所: 管轄外の出張所でも受け付ける場合あり（要確認）
- オンライン申請（eLTRC）: 管轄に関係なく処理（G81 cross-ref）

**申請書類の言語:**

- 日本語: そのまま提出
- 英語・中国語等の外国語: 日本語翻訳文を添付（翻訳者氏名必記）
- 二か国語記載の書類（例: パスポートの氏名等）: 翻訳文の添付が要求される場合もある（申請先による）

**書類の有効期限:**

行政書類（住民票・課税証明書・登記事項証明書等）は，一般的に**発行から3か月以内のもの**が求められる。古い書類は再発行が必要。ただし，申請書類チェックリストで各書類の有効期限を確認すること。

**写真の要件（在留カード申請等）:**

- 縦4cm×横3cm（一般的なサイズ）
- 背景: 無背景（白・グレー等）
- 撮影時期: 申請前6か月以内
- デジタル加工なし・顔が明確に写っていること

## Safe Answer Behavior

- When asked about foreign-language documents: clearly state a Japanese translation must be attached; confirm that the applicant themselves can translate (no professional required) but must include their name.
- When asked about copies vs originals: explain that the requirement varies by document type; route to the specific ISA checklist for the application type.
- When asked about translation certification: clarify that Japan does not generally require a certified/notarized translation for ISA applications (unlike some other countries); applicant self-translation with name is generally accepted.
- Do not confirm that a specific document can be submitted as a copy without checking the specific application type's checklist.

## Must Say

- 外国語で作成された書類には，日本語の翻訳文を添付する必要がある。翻訳者の資格は不要だが，翻訳者の氏名を翻訳文に明記すること（本人が翻訳する場合も申請人本人の氏名を記載）。
- 原本が必要な書類と写しでよい書類は，申請の種類・書類の種別によって異なる。住民票・課税証明書・登記事項証明書等の行政書類は一般的に原本が必要。ISAの公式書類チェックリストで確認すること。
- 在留申請は住所地を管轄するISA（地方入管局）への提出が原則。オンライン申請の場合は管轄に関係なくeLTRCで処理（G81参照）。

## Must Not Say

- 「外国語の書類はそのまま提出できる。」（日本語翻訳文の添付が必要）
- 「翻訳は行政書士等の専門家でなければならない。」（翻訳者の資格は不要; 本人翻訳可）
- 「全ての書類はコピーでよい。」（書類の種別によって原本が必要なものがある）
- 「どのISAでも申請できる。」（住所地管轄のISAへの提出が原則）

## Deep Water Triggers

- 中国の大学の卒業証明書（中国語）を申請書類として添付したい — 認定翻訳が必要か？
- 課税証明書を取り寄せたが，半年前発行のもの — 有効期限は過ぎているか？
- パスポートの全ページをコピーする必要があるか？
- 雇用契約書が英語で書かれている — 翻訳文を添付するだけで十分か？
- 申請書類を郵送できるか，必ず窓口に行く必要があるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For foreign document questions: confirm Japanese translation required; specify applicant self-translation with name is accepted; route to professional if the translation is complex or the stakes are high.
- For original vs copy questions: route to the specific ISA checklist for the application type (更新: G66 cross-ref; 永住: G60 cross-ref); do not generalize without the checklist.
- For application window questions: route to ISA 地方入管局一覧 for the applicant's jurisdiction; route to G81 for online filing (eLTRC).
- For late document submissions (3-month validity): advise re-issuance; route to the relevant administrative office.

## Unknown Fields

- Whether any ISA application type accepts apostille-certified foreign documents (公証役場・外国公証役場による認証) as an alternative to a separately translated document.
- The specific requirements for documents from countries that do not have a standard administrative certification system (e.g., certain non-treaty countries).
- Whether electronic (PDF) copies of documents are accepted for mail-in applications or if physical copies are required.

## Needs Domain Flags

- needs_domain (P1): For specifically listed document types in ISA checklists (e.g., 登記事項証明書, 住民税証明書), are there officially confirmed cases where a copy is accepted in place of the original? ISA checklists vary by application type and bureau; a general rule confirmation is not yet extracted from official text.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shorui-001 | "外国の大学の卒業証明書は英語ですが，翻訳が必要ですか？誰が翻訳すればいいですか？" | State: 外国語で作成された書類には日本語の翻訳文を添付する必要がある。翻訳者の資格は不要で，申請人本人が翻訳することも可能。ただし，翻訳文に翻訳者の氏名を明記すること。正確な翻訳であることが重要。不安な場合は行政書士に依頼を。 |
| shorui-002 | "住民票や課税証明書はコピーでも大丈夫ですか？" | State: 住民票・課税証明書等の行政書類は，一般的に原本が必要（発行から3か月以内のもの）。コピーでよいかどうかは申請の種類によって異なる。ISAの公式書類チェックリストで具体的な申請の要件を確認のこと。 |
| shorui-003 | "雇用契約書が英語で書かれています。そのまま提出できますか？" | State: 外国語の書類はそのまま提出できない。日本語の翻訳文を添付する必要がある。翻訳は本人でも可（氏名を翻訳文に明記）。雇用契約書の英語原本と日本語翻訳文を一緒に提出すること。 |

## Source Notes

- 外国語書類の翻訳文添付義務: ISA「申請書類について」(index.html) + ISA「外国語で作成された文書の取り扱い」(zairyu_shinkoku01.html) — 翻訳者氏名記載義務; 資格要件なし.
- 原本・写しの一般的な区別: ISA各申請ページの書類チェックリスト（種別ごとに異なる）.
- 申請先の管轄: ISA地方入管局一覧（住所地管轄が原則）.
- 書類有効期限（3か月): ISA各申請ページの書類要件から確認.
- Cross-ref G66 (技人国・特定技能の更新書類パターン), G60 (永住申請の書類要件), G81 (eLTRC・オンライン申請), G27 (申請書の正確性要件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 016 G89. Key sources: ISA申請書類ページ（外国語書類の翻訳文添付義務; 翻訳者資格不要; 氏名記載必要）; G66/G60 cross-refs（各申請種別の書類パターン）. Core facts: 外国語書類=日本語訳文必要; 翻訳者資格不要・本人可; 原本/写しは書類種別・申請種類によって異なる; 行政書類は一般的に原本（3か月以内）; 申請は住所地管轄ISA. needs_domain P1: 申請種別ごとの原本/コピーの確認済みルール. Cross-ref G66, G60, G81, G27.
