---
asset_id: guardrail-ryugaku-shushoku-katsudo
title: 留学後の就職活動と就活ビザ — 日本の大学・大学院卒業者は「特定活動（就職活動）」への在留資格変更で最大1年の求職期間を得られる；卒業後に就職先が決まらないまま在留期間が満了すると在留資格を失う；就職後は就労系在留資格への変更が必要
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 020"
---

## What This Document Is

This guardrail prevents errors about the job-hunting visa (就活ビザ) available to foreign students who graduate from Japanese universities and the procedure for transitioning to a work residence status. Key errors to block:

1. **"日本の大学を卒業すれば，自動的に就労ビザに変更できる。"** — incorrect. 大学卒業は，就労系在留資格への変更の前提条件の一つにすぎない。就職先が内定し，その職種・業務内容が在留資格（技人国等）の要件を満たしていることを示して，ISAへの在留資格変更許可申請を行う必要がある。
2. **"留学ビザは卒業後も有効なので，就職活動をしていれば在留できる。"** — incorrect. 留学の在留資格は，在籍する教育機関での学習活動が目的。卒業後は「留学」の在留資格の活動に該当しなくなる（在留期間が残っていても）。卒業後に就職活動を続ける場合は，「特定活動（就職活動）」への在留資格変更申請が必要。
3. **"特定活動（就職活動）の在留資格では，アルバイトができない。"** — incorrect（条件あり）. 「特定活動（就職活動）」の在留資格でも，資格外活動許可（週28時間以内）を取得していれば，アルバイトが可能。
4. **"高度専門職告示46号（特定活動46号）は，大学卒業者全員に適用される。"** — incorrect. 特定活動46号（本邦大学卒業者等の特例）は，日本の大学・大学院で学位を取得し，日本語能力（ビジネスレベル）を有する者を対象とする特例的な在留資格であり，すべての大学卒業外国人が自動的に対象となるわけではない。雇用契約・職務内容・日本語能力要件を満たすことが必要。

## Trigger

Use this card when the user says:

- "日本の大学を卒業しましたが，まだ就職が決まっていません。どうすればいいですか？"
- "留学ビザのまま就職活動を続けていいですか？"
- "就活ビザとは何ですか？どうやって申請しますか？"
- "卒業後に日本で働くにはどうすればいいですか？"
- "特定活動46号はどんな人が取れますか？"
- any pattern suggesting that a degree from a Japanese university automatically enables work or continued stay, or that job-hunting can occur on a 留学 status after graduation.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-tokutei-katsudo | L4 | 出入国在留管理庁「特定活動（就職活動）」 | https://www.moj.go.jp/isa/applications/status/tokutei_katsudo.html | 2026-05-15 | 特定活動（就職活動）の在留期間・更新; 資格外活動許可; 申請時期. |
| isa-tokutei-46go | L4 | 出入国在留管理庁「特定活動告示46号」 | https://www.moj.go.jp/isa/applications/status/46.html | 2026-05-15 | 特定活動46号（本邦大学卒業者）の要件（学歴・日本語能力・職種）; 対象活動; 更新. |
| g4-crossref | guardrail | guardrail-ryugaku-zairyu (G4) | internal | 2026-05-15 | G4: 留学の在留資格（学習活動; 資格外活動許可; 卒業後の手続き）. |
| g106-crossref | guardrail | guardrail-shikaku-gai-katsudo-sakai (G106) | internal | 2026-05-15 | G106: 就活中のアルバイトの在留資格上の取り扱い（資格外活動許可の要件）. |

## Official Rule Or Source Fact

**卒業後の在留資格の変遷:**

| ステータス | 在留資格 | 注意点 |
|---|---|---|
| 日本の大学・大学院在学中 | 留学 | 資格外活動許可（週28時間以内）でアルバイト可 |
| 卒業後・就職先未定 | **特定活動（就職活動）**に変更 | 在留期間180日（最大6か月+延長で最大1年）|
| 就職内定・就業開始前 | 特定活動（就職活動）から就労系に変更申請 | 内定後早急に変更申請（技人国等）|
| 就業開始後 | 技人国・特定技能等の就労系在留資格 | 雇用主との協力で申請 |

**特定活動（就職活動）の在留資格:**

- **対象者**: 日本の大学・大学院等を卒業した者で，日本での就職活動を継続する者
- **在留期間**: 最初は180日; 引き続き活動継続が認められれば延長可（通算最大1年程度）
- **就労可否**: 就労不可（ただし資格外活動許可取得により週28時間以内のアルバイト可）
- **申請時期**: 卒業（在学中の在留資格の活動終了）前に申請することが望ましい

**申請に必要な主な書類（特定活動・就職活動）:**

- 在留資格変更許可申請書
- 就職活動状況を示す書類（企業への応募履歴・面接記録等）
- 大学・大学院の卒業証明書
- 出身校の推薦書（任意）

**特定活動46号（本邦大学卒業者の特例）:**

特定活動告示46号は，日本の大学・大学院卒業者が，通常の技人国の職種・業務要件にとらわれない幅広い業務に従事することを可能にする特例的な在留資格。

**要件:**

| 要件 | 内容 |
|---|---|
| **学歴** | 日本の大学・大学院で学位取得（学士・修士・博士）|
| **日本語能力** | 日本語でのビジネスコミュニケーション能力（JLPT N1相当が目安; 日本語での勤務が前提）|
| **雇用形態** | 正社員（または同等の雇用）; フルタイム |
| **職種・業務** | 日本語を使用する広義のビジネス業務（技人国の職種制限より幅広い）|
| **報酬** | 日本人と同等以上の報酬 |

特定活動46号で許容される業種の例:
- 翻訳・通訳・日本語教育
- 営業・マーケティング（外国語・日本語スキルを活かした業務）
- 商品開発・企画（外国語・文化理解が必要な業務）
- 外国語を活かしたホテル・観光業（接客レベルの業務も含む）

⚠️ 特定活動46号は，日本語能力・学歴要件が満たされない場合は申請できない（技人国より要件が異なる）。

**留学から就活ビザへの移行タイミング（重要）:**

- 卒業した時点で，「留学」の活動目的は終了する
- 在留カードに記載された在留期間が残っていても，卒業後に就職活動を続ける場合は「特定活動（就職活動）」への変更が必要
- 在留期間が残っているからと言って「留学」のまま就職活動を継続することは，在留資格外活動のリスクがある（leaves open the question of whether the 留学 activity is still being conducted）
- 実務上は，卒業前（最終学期）に変更申請を行うことが推奨される

## Safe Answer Behavior

- When asked about staying in Japan after graduation without a job: explain the 特定活動（就職活動）route; clarify that 留学 status is no longer valid after graduation (for the activity purpose).
- When asked about 就活 part-time work: confirm that 資格外活動許可 at 28h/week is available under the job-hunting status.
- When asked about 特定活動46号: explain requirements (Japanese university degree + Japanese language proficiency + Japanese-language-based employment); clarify it is broader than 技人国 but has its own requirements.
- When asked about the timeline: emphasize that the transition application should be filed before graduation to avoid any gap in status.

## Must Say

- 日本の大学卒業後に就職先が未定の場合，「留学」の在留資格のまま就職活動を続けることはできない。「特定活動（就職活動）」への在留資格変更申請（在留期間満了前・理想的には卒業前）が必要。
- 特定活動（就職活動）の在留資格では，就労はできないが，資格外活動許可（週28時間以内）を取得すればアルバイトが可能。在留期間は最初180日で，継続が認められれば延長可（通算最大1年程度）。
- 特定活動46号は，日本の大学・大学院で学位を取得し，日本語でのビジネスコミュニケーション能力を有する者を対象とした特例的な在留資格。技人国より幅広い業務が許可されるが，日本語能力・学歴要件の確認が必要。

## Must Not Say

- 「大学卒業後は，留学ビザのまま就職活動を続けられる。」（卒業後は留学の活動目的が終了; 特定活動への変更が必要）
- 「大学を卒業すれば自動的に就労ビザに切り替わる。」（別途変更申請と就職先の内定が必要）
- 「特定活動46号はすべての大学卒業外国人に適用される。」（日本語能力・学歴・職種要件を満たすことが必要）

## Deep Water Triggers

- 日本語能力が低い（JLPT N2以下）が日本の大学を卒業した外国人の就職活動 — 特定活動46号は難しい; 技人国申請の可否と要件は？
- 就職活動中に内定を得たが，業種・職種が技人国・特定活動46号の要件を満たさない場合（例: 建設現場の監督・飲食業経営）
- 専門学校卒業者の就活ビザは大学卒業者と同じルートを使えるか？（専門士・高度専門士の扱い）
- 就活ビザで最大1年就職活動を続けたが内定が出ない場合，どうなるか？
- 特定活動46号で働き始めたが，会社から残業・休日出勤を強制されている — 労働法の保護は受けられるか？（G99参照）

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who have already graduated and are still on 留学 status: route to immediate 特定活動（就職活動）申請; note deadline risk if 在留期間 is expiring soon.
- For persons asking about job types after graduation: route to G47 (技人国の要件) and 特定活動46号 requirements; recommend 行政書士 for complex cases.
- For persons whose job offer doesn't match their status requirements: route to 行政書士 immediately; the fit between job description and residence status is critical for approval.
- For 専門学校 graduates: note that the job-hunting pathway for vocational school graduates differs slightly from university graduates; confirm specific status options with 行政書士.

## Unknown Fields

- The specific Japanese language proficiency standard for 特定活動46号 — JLPT N1 is commonly cited but whether it is a hard requirement or a guideline is not confirmed from official ISA text.
- Whether 専門学校（vocational school）graduates qualify for the same 特定活動（就職活動）route as university graduates.
- The precise maximum stay period under 特定活動（就職活動）— "最大1年" is commonly used but official ISA text specifies renewals on a 180-day basis.

## Needs Domain Flags

- needs_domain (P1): What is the official ISA requirement for Japanese language proficiency in 特定活動46号? Is JLPT N1 a formal requirement, or is it evaluated holistically? What happens for applicants who are native Japanese speakers without JLPT certification?
- needs_domain (P1): Do 専門学校 graduates (who obtain 専門士 or 高度専門士 qualifications) qualify for the same 特定活動（就職活動）pathway, and are they eligible for 特定活動46号 applications?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| ryugaku-001 | "3月に大学を卒業しました。まだ就職先が決まっていません。留学ビザのまま就職活動を続けられますか？" | State: 大学卒業後は，「留学」の在留資格の活動目的（学校での学習）が終了するため，そのまま就職活動を続けることは在留資格の目的外活動となりうる。「特定活動（就職活動）」への在留資格変更申請を，在留期間が満了する前（できれば卒業前）に行うことが必要。特定活動（就職活動）では，資格外活動許可を取得すれば週28時間以内のアルバイトも可能。 |
| ryugaku-002 | "特定活動46号とは何ですか？技人国との違いは？" | State: 特定活動46号（本邦大学卒業者の特例）は，日本の大学・大学院で学位を取得し，日本語でのビジネスコミュニケーション能力を有する外国人が，技人国より幅広い業種・業務（営業・マーケティング・外国語を活かした接客等）に従事できる特例的な在留資格。技人国が理系・人文系の専門的業務に限定されているのに対し，特定活動46号は日本語能力を活かした業務全般が対象。ただし，日本語能力・学歴要件を満たすことが必要（詳細は行政書士に確認）。 |
| ryugaku-003 | "就活ビザで就職活動をしているとき，アルバイトはできますか？" | State: 「特定活動（就職活動）」の在留資格では就労は原則不可だが，資格外活動許可を取得すれば週28時間以内のアルバイトが可能（留学時代の包括的資格外活動許可とは別に，「特定活動（就職活動）」での資格外活動許可の取得が必要）。許可なしにアルバイトを行うことは，資格外活動（不法就労）となりうるため，必ず申請して許可を取得すること。 |

## Source Notes

- 特定活動（就職活動）: ISA「特定活動」— 在留期間180日; 資格外活動許可（週28時間以内）; 申請書類（就職活動状況の証明）.
- 特定活動46号（本邦大学卒業者）: ISA「特定活動告示第46号」— 日本の大学・大学院卒業; 日本語でのビジネスコミュニケーション能力; 幅広い業務（技人国の職種制限より広い）.
- 留学後の就職活動: G4 cross-ref（留学の在留資格; 卒業後の手続き）.
- 資格外活動の枠組み: G106 cross-ref（就活中のアルバイトの在留資格上の取り扱い）.
- Cross-ref G4 (留学の在留資格), G10 (技人国の要件), G106 (資格外活動の境界).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 020 G108. Key sources: ISA「特定活動（就職活動）」（在留期間・要件）; ISA「特定活動告示46号」（本邦大学卒業者の特例; 日本語能力・学歴要件）. Core facts: 卒業後は留学の活動目的終了→特定活動（就職活動）への変更が必要; 特定活動（就職活動）=週28h資格外活動許可取得可; 特定活動46号=日本語能力+学歴要件（技人国より幅広い業務）; 卒業前申請推奨. needs_domain P1: 特定活動46号の日本語能力の正式要件（JLPT N1の根拠）; 専門学校卒業者の対象可否. Cross-ref G4, G10, G106.
