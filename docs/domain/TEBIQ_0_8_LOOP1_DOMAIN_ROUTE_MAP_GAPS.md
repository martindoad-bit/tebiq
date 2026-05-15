# TEBIQ 0.8 Loop1 DOMAIN Route-Map Gaps

Generated: 2026-05-15

Owner: DOMAIN subagent

Scope: route-map gap report for Loop1 deep-water areas. This document is not a legal opinion, not approval prediction, and not permission to convert `needs_domain` cards into deterministic runtime conclusions.

Read basis:

- `docs/eval/TEBIQ_0_8_LOOP1_EXEC_REPORT.md`
- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_EXEC_REPORT.md`
- `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md`
- `docs/knowledge-atlas/phase2/guardrails-p0p1/WORKPACK_001.md`
- private Loop1 full-answer packet used only for case summaries: `private-aql/tebiq-0.8-rur-loop1-aql.json`, exported at `2026-05-14T16:23:33.513Z`

Private packet note:

- current `route_gate_ids` counts match the Loop1 report: notice taxonomy 39, special period 10, HSP1 institution change 10, incomplete materials 7, national tax その3 4, resident-tax January 1 2, J-Skip hard gate 2, work qualification certificate 2;
- current `guardrail_findings` contain answer-integrity findings only: P1 terminal punctuation on RUR-019/RUR-023/RUR-029/RUR-054, P1 missing `暂缓事项` on RUR-085, and P2 terminal punctuation on RUR-046/RUR-056/RUR-060/RUR-065;
- old raw-payload P0 false positives for RUR-033 and RUR-041 are treated as fixed validator artifacts and are not used as DOMAIN gap evidence.

## 0. DOMAIN Boundary

DOMAIN should define route maps and escalation boundaries, not final legal outcomes.

Allowed output:

- classify which facts must be extracted before answering;
- distinguish process state, permission state, evidence state, deadline state, and safety state;
- mark cases that require official/professional confirmation;
- provide negative guardrails for unsafe model phrasing.

Not allowed output:

- "许可/不许可一定会怎样";
- "这个材料/说明一定会被接受";
- "这个状态一定合法/违法";
- "可以放心先做";
- individualized remediation for already-started work, overstay, DV/address exposure, company disposition, or post-result notices.

## 1. Loop1 Route-Map Gap Summary

Loop1 added runtime route gates and validators, but the gates are still mostly tripwires. The remaining DOMAIN work is to define decision maps for high-risk areas before ENGINE turns any `needs_domain` content into deterministic behavior.

The six required maps are:

| route-map gap | Loop1/RUR evidence | current safe runtime role | gap |
|---|---|---|---|
| notice taxonomy | route gate hit 39 times; RUR-073 to RUR-080, RUR-091, RUR-096 show online notices, postcards, appearance, hearing, and ambiguous non-permission wording | require exact notice extraction before legal-state labels | no canonical state machine for receipt/pending/additional request/result/pickup/non-permission/hearing/cancellation/appearance |
| HSP1 institution change | route gate hit 10 times; RUR-035, 039, 090 ask whether points + 14-day notice is enough | block "points + notification = permission" | no map for activity start, onboarding, training, remote work, login, same-group transfer, subtype change, and already-started remediation |
| 経営管理 old-company disposition | RUR-065 to RUR-072, RUR-093 show closure,休業, debts, employees, old-company explanation, new offer gaps | block "close company = easier" and "new employer only" | no sequencing map for closure/suspension/liquidation/transfer/director resignation vs change permission |
| 日配/永配 divorce/death/remarriage/DV | RUR-049 to RUR-064, RUR-092, RUR-096 show divorce, death, remarriage, DV documents, address safety | block automatic cancellation and safe-until-expiry claims; safety-first for DV | no map for notification, current period, cancellation/review sensitivity, change/renewal, remarriage, and DV evidence/address handling |
| incomplete materials before expiry/deadline | route gate hit 7 times; RUR-017, 020, 021, 069, 089, 094 show partial materials and near-expiry issues | block "partial filing is safe bridge" | no distinction between core receiving-condition materials, supplemental proof, deadline extension/contact route, and special-period interaction |
| J-Find/J-Skip/HSP/技人国 comparison | RUR-033 to RUR-040, RUR-090 show route mixing; Batch29 found 1200万/1600万 J-Skip false positives | block J-Skip false positives and HSP notification shortcut | no comparison map across intended activity, salary components, offer/company quality, current status, and permission timing |

## 2. Gap A: Immigration Notice Taxonomy

Needs DOMAIN because approximate notice descriptions can lead to overclassification: receipt, online status update, postcard, additional-material notice, result pickup, appearance/hearing, final non-permission, and cancellation are not interchangeable.

Need to extract:

- exact Japanese title, all bold/headline text, and whether it contains `許可`, `不許可`, `取消`, `出頭`, `意見聴取`, `追加資料`, `交付`, `受領`;
- issue date, delivery/receipt date, response deadline, appearance date, and office/contact;
- requested action: submit, appear, bring passport/card, pay revenue stamp, pick up card, explain, send materials;
- application type, receipt number, online event name, and whether the user has a paper postcard/letter/email/system status only;
- current status, original expiry, special-period endpoint if renewal/change is involved;
- whether user already acted based on the notice.

Must distinguish:

- application receipt / online receipt-completion email / pending proof;
- online "processing status updated" or "examination completed" event;
- additional-material request and explanation request;
- result postcard or pickup instruction;
- final non-permission / non-issuance / cancellation procedure;
- appearance/hearing/意見聴取/出頭;
- process step vs final disposition.

Deep-water triggers:

- title is unknown, translated, cropped, or user says "不许可みたい";
- deadline is today, passed, or within a few days;
- original expiry + two months is near or passed;
- notice may involve non-permission, cancellation, hearing, appearance, or explanation;
- user wants to ignore, delay, mail partial documents, or keep working based on a postcard/email;
- DV, illness, overseas travel, delivery failure, address safety, or detention intersects with notice handling.

Forbidden model wording:

- "ハガキ来了就是许可。"
- "審査完了メール就是已经批了。"
- "不许可みたいなら已经不许可确定。"
- "受付番号/申請中メールがあるから期限不用管。"
- "追加資料通知可以先随便交一部分就安全。"
- "出頭/意見聴取/取消し通知可以普通补件处理。"

Next step:

- FACT: continue Batch 002 notice examples only as source-backed labels and official event wording; do not decide individual notice effects without exact text.
- ENGINE: build extraction-first state object, not final legal-state classifier. Suggested fields: `notice_title`, `notice_channel`, `deadline_at`, `appearance_at`, `requested_action`, `final_disposition_words`, `special_period_endpoint`, `needs_human_review`.
- PROMPT: when notice wording is approximate, first ask for exact title/deadline/action; do not name final legal state before classification.

## 3. Gap B: HSP1 Institution Change

Needs DOMAIN because HSP1 institution change is not solved by points evidence or 14-day notification, but not every pre-start employer interaction is the same as starting HSP1 activity.

Need to extract:

- current status: HSP1/HSP2/ordinary 技人国/other;
- HSP subtype: 1号イ/ロ/ハ;
- old designated institution and new institution;
- old and new activity content, job title, work location, remote work, training, onboarding, system access, payroll start;
- old contract end date, new contract signature date, intended/actual start date;
- whether status-change permission was filed and granted;
- whether 14-day notification was filed and when;
- renewal/change combined filing posture and current expiry.

Must distinguish:

- HSP1 status-change permission vs 14-day所属機関届出;
- points calculation/evidence vs activity permission;
- offer signing/admin onboarding vs remunerated activity start;
- same job title vs same activity/institution-designation facts;
- HSP1 vs HSP2 vs ordinary 技人国;
- pending application/receipt/postcard vs final permission.

Deep-water triggers:

- user already started work, training, remote tasks, client meetings, or paid onboarding before permission;
- employer wants "先入社" before permission;
- expiry is near and renewal/change/notification are mixed;
- subtype or activity category changes;
- J-Skip/HSP privilege or PR pending is being used to justify a shortcut;
- user asks whether late filing is "only minor".

Forbidden model wording:

- "点数够 + 14日内届出即可先入社。"
- "HSP1 换公司只要做所属机构届出。"
- "同样职位/同样工作内容就不用变更许可。"
- "先上班，之后补变更。"
- "届出受理 = 新活动许可。"

Next step:

- FACT: source-check any official distinction available for HSP1/HSP2 and institution-designation wording; keep already-started consequences as `needs_domain`.
- ENGINE: keep deterministic gate only as negative guardrail: block notification-as-permission and receipt-as-permission. Do not classify allowed onboarding activities deterministically yet.
- PROMPT: answer sequence must be permission first, notification second, points evidence third, then practical dates/documents.

## 4. Gap C: 経営管理 To 技人国/HSP And Old-Company Disposition

Needs DOMAIN because old-company closure/suspension/liquidation/transfer is a mixed immigration, tax, labor, company-law, and factual-consistency problem.

Need to extract:

- current status, expiry, current company role, ownership, representative/director status;
- actual management/administration activity, revenue/client/office/employees state;
- old company state: active,休業,廃業, dissolved, liquidating, transferred, representative resignation planned/completed;
- dates of board/shareholder decisions, registration, tax filings, social-insurance/labor steps, employee actions;
- unpaid tax, social insurance, wages, debt, leases, permits, lawsuits, shareholder disputes;
- new employer, job duties, salary, contract start, company category/materials;
- whether status-change permission was filed/granted and whether any notice asks about old company;
- 2025/2026 経営管理 reform effective-date/version relevance.

Must distinguish:

- current 経営管理 activity basis vs intended employment activity;
- old-company factual disclosure vs strategic sequencing;
- company legal/tax/labor steps vs immigration permission;
- closure/休業/liquidation/transfer/director resignation/shareholder retention;
- new employer materials vs old-company explanation pack;
- application receipt vs permission to start employment.

Deep-water triggers:

- user stopped management activity while still on 経営管理;
- user wants to start new employment before change permission;
- company has employees, unpaid obligations, debt, leases, permits, or clients;
- company disposition date conflicts with facts already submitted;
- user wants to hide debt/closure/old-company facts;
- HSP1ハ/HSP2/PR shortcut or reform effective-date issues are present;
- new employer contract/materials are incomplete.

Forbidden model wording:

- "先关公司就更容易过技人国/HSP。"
- "公司注销/休业后就自动可以去新公司上班。"
- "变更申请提交了就可以停止经管活动并开始雇佣工作。"
- "旧公司不用管，入管只看新公司。"
- "做成休眠/清算就能消除经管风险。"
- "公司转让、辞任代表、清算顺序可以由 AI 直接建议。"

Next step:

- FACT: collect official/company procedure sources only for what documents and statuses exist; do not infer best sequencing.
- ENGINE: gate for keywords around 経営管理 + closure/休業/liquidation/transfer/debt/employees/start work; output `needs_domain_company_disposition`.
- PROMPT: force four-bucket framing: current activity reality, old-company obligations, new employer/activity materials, change-permission timing.

## 5. Gap D: 日配/永配 Divorce, Death, Remarriage, And DV

Needs DOMAIN because spouse-status cases sit between notification duty, current period, cancellation/review sensitivity, renewal/change options, family safety, and evidence feasibility.

Need to extract:

- current status and whether it was granted as spouse: 日本人の配偶者等, 永住者の配偶者等, spouse-type 家族滞在, child/dependent basis, or another status;
- divorce date, spouse death date, separation date, remarriage date, marriage registration plan;
- whether spouse notification was filed, late, or not yet due;
- current expiry, pending renewal/change/PR status, notices/deadlines;
- spouse-status activity facts: cohabitation, separation reason, contested breakdown, bereavement, child/custody/support;
- work/income facts only as route inputs, not approval prediction;
- DV facts: immediate danger, shelter, address confidentiality, police/court/DV center involvement, missing documents, spouse control over passport/card;
- whether contact with spouse or address disclosure would create safety risk.

Must distinguish:

- divorce/death 14-day notification vs cancellation/review vs renewal/change route;
- legal divorce vs separation without divorce;
- current residence period vs "safe until expiry";
- death/divorce/remarriage as separate facts, not automatic transfer to a new spouse;
- 日配/永配配偶者 vs spouse-type 家族滞在 vs other dependent/child basis;
- DV safety planning/address protection vs ordinary spouse-material checklist;
- justifiable-reason analysis vs model conclusion.

Deep-water triggers:

- notification is late or user asks to hide divorce/death/remarriage;
- six months or more without spouse-status activity, or contested separation;
- remarriage before renewal/change and status name looks the same;
- children/custody/support/bereavement/定住者 route;
- DV, stalking, coercive control, shelter, address secrecy, spouse withholding documents;
- deadline, special period, or unclear immigration notice in DV context.

Forbidden model wording:

- "离婚/死别当天签证自动失效。"
- "通知了就一定没事，可以待到在留期限。"
- "离婚后在留还有几年，所以安全用到到期。"
- "再婚后原来的配偶者签证自动接到新配偶者。"
- "先隐瞒离婚/死别/再婚，等更新或永住时再说。"
- "DV 情况下也按普通离婚/配偶者更新材料清单即可。"
- "先联系加害配偶者拿材料。"
- "申请住基支援措置后地址一定不会泄露。"
- "只要有DV就一定能获批/改定住者。"

Next step:

- FACT: split spouse-status facts and DV/address-protection facts into separate official-source cards if Batch 002 continues; document source gaps for substitute evidence.
- ENGINE: deterministic runtime may only trigger safety-first and no-automatic-cancellation/no-safe-until-expiry warnings. It must not choose status route or evidence sufficiency.
- PROMPT: for DV, answer order must be immediate safety/address exposure, official support routes, deadline preservation, then immigration fact pack. Never start with "contact spouse".

## 6. Gap E: Incomplete Materials Before Expiry Or Before Notice Deadline

Needs DOMAIN because Loop1 found that "file something before expiry" and "mail partial materials before deadline" can be unsafe if core receiving conditions or special-period boundaries are not clear.

Need to extract:

- application type: renewal, change, PR, HSP, spouse, 経営管理 to employment, J-Find transition;
- current expiry and special-period endpoint if applicable;
- filing status: not filed, received, receipt number, online receipt, pending, additional-material request;
- exact missing materials and who controls them: employer, school, municipality, tax office, pension/insurance office, foreign university, spouse, old company;
- whether missing item is core application/receiving-condition material or supplemental proof;
- notice deadline, whether deadline is postal dispatch or arrival if stated, office/contact担当;
- prior contact with ISA/window and any written permission/instruction;
- reason for incompleteness, proof of attempts, available alternative evidence;
- user activity while pending: work start, status basis, graduation, company closure, DV.

Must distinguish:

- initial filing before expiry vs additional-material response after filing;
- renewal/change special-period protection vs PR pending, which does not extend current status by itself;
- accepted receipt vs mere mailing/preparation;
- core employer/company/spouse/status-basis documents vs supplemental records;
- deadline extension/contact route vs unilateral partial submission;
- window confirmation vs model assurance.

Deep-water triggers:

- current expiry or special-period endpoint is within days, today, or passed;
- missing new employer contract/company documents, HSP points evidence, spouse/DV documents, old-company facts, or tax/social-insurance proof;
- user wants to rely on partial filing to keep working or stay;
- notice deadline is unclear or later than special-period endpoint;
- HR/spouse/old company controls the missing material;
- user asks whether "受理される/保住特例期間/安全桥" is guaranteed.

Forbidden model wording:

- "材料不齐也先交就一定能保住特例期間。"
- "窗口收了就代表一定安全。"
- "补件期限还没到，所以原期限+两个月不用管。"
- "先交理由书替代核心材料即可。"
- "邮寄出去就一定算按时。"
- "PR pending 可以代替当前在留更新。"

Next step:

- FACT: create the continuation card for incomplete-material filing before expiry, with official sources on filing/receipt/special period and explicit source gaps.
- ENGINE: gate `incomplete-materials-before-expiry-no-safe-bridge` should remain negative only: no safe-bridge promise; require extraction of expiry, receipt, missing item, deadline, and window contact.
- PROMPT: sequence must be exact deadline/status check, immediate material gathering, contact担当/official window before deadline if incomplete, preserve proof, and avoid guaranteeing acceptance.

## 7. Gap F: J-Find / J-Skip / HSP / 技人国 Route Comparison

Needs DOMAIN because route comparison mixes hard eligibility gates, activity classification, salary components, company facts, permission timing, and current-status limits.

Need to extract:

- current status: outside Japan, J-Find, student, 技人国, HSP1/HSP2, 経営管理, PR pending, spouse status;
- intended activity and route requested: J-Find job search/startup prep, ordinary HSP points, J-Skip, 技人国, HSP from J-Find, PR shortcut;
- intended HSP category: 1号イ/ロ/ハ;
- degree, institution, practical experience, evidence availability;
- expected annual remuneration for intended Japanese activity, fixed/variable/bonus/stock/overseas/group-company components;
- employer/company facts: contract type, job duties, salary, establishment age, category, financials, HR documents;
- permission timing: not filed, filed, receipt, additional materials, postcard, granted;
- whether user wants to work/start activity before permission.

Must distinguish:

- J-Skip hard income/category gate vs ordinary HSP point route;
- HSP points eligibility vs HSP1 institution/activity permission;
- J-Find job search/status limits vs full remunerated employment under work status;
- 技人国 job-duty fit vs HSP category fit;
- offer/contract existence vs permission to work;
- PR shortcut labels vs current-status renewal/change obligations.

Deep-water triggers:

- 1200万/1600万 is described as J-Skip eligible;
- income has stock/options, bonus, overseas pay, or group-company pay;
- role category could be business development, management, specialist, research, or ordinary employment;
- user mixes J-Find, HSP, J-Skip, PR shortcut in one plan;
- user wants to let immigration choose among routes by writing multiple labels;
- user is already HSP/J-Skip and changing institution/activity;
- employer asks for start date before permission.

Forbidden model wording:

- "年收1200万/1600万也可能走 J-Skip。"
- "80分高度人才就是 J-Skip。"
- "J-Skip 只要点数够。"
- "经营管理活动年收2000万就满足 J-Skip。"
- "J-Find 期间可以先全职帮朋友公司拿工资，之后再转工签。"
- "可以一边申请技人国/高度専門職，一边用 J-Find 的資格外活動許可先入职。"
- "J-Find 的資格外活動許可可以作为正式就业的过渡桥。"
- "点数够就一定能变更/永住捷径。"
- "同时写 J-Skip/HSP/技人国 让入管帮选就好。"

Next step:

- FACT: source-check J-Find activity limits and transition requirements next; existing J-Skip/HSP cards are not enough for route comparison.
- ENGINE: create a route-comparison preprocessor that classifies requested route and blocks impossible labels, but does not recommend best route deterministically.
- PROMPT: force comparison format: hard gate, missing facts, current-status/activity limit, required permission, and professional/official confirmation for ambiguous route choice.

2026-05-15 Loop2A engineering note:

- Added runtime route gate `jfind-employment-transition-no-shikakugai-bridge`.
- Added validator `P0:answer-jfind-shikakugai-employment-bridge`.
- Private replay over Loop1 answers catches `RUR-036` and `RUR-037` as P0 under the new validator.
- This is intentionally a negative guardrail only. DOMAIN still owns the positive route map for what, if anything, can be done within current J-Find/指定書 scope before employment-status permission.

DOMAIN questions to answer for Loop2/Loop3:

| issue_id | question | priority |
|---|---|---|
| `dom-jfind-001` | In a J-Find -> 技人国/HSP transition, how should TEBIQ distinguish job search/startup-prep activity, trial/volunteer activity, paid onboarding, and formal employment start? | P0 |
| `dom-jfind-002` | When the user has J-Find and an employer offer, what facts must be extracted before discussing HSP vs 技人国 route choice? | P1 |
| `dom-jfind-003` | What safe wording should TEBIQ use when the user asks whether `資格外活動許可` can be used during a pending work-status change? | P0 |
| `dom-jfind-004` | Which J-Find / 特定活動 source pages or 指定書 language should FACT prioritize to support this route map? | P1 |

## 8. `needs_domain` Cards Not Allowed Into Deterministic Runtime

The following cards may be used as source-backed guardrails or extraction prompts. They must not be converted into deterministic runtime conclusions for the listed deep-water parts.

| card_id | deterministic runtime prohibited area | allowed runtime use for now |
|---|---|---|
| `guardrail-special-period-two-month-boundary` | overstay/remedy if endpoint is today/past; individualized activity permission during pending change; consequences after endpoint | calculate/extract original expiry + two months and block "审查中无限延长" |
| `guardrail-national-tax-certificate-sono3` | substitute-document acceptability, late/amended tax explanation sufficiency, mixed 国税/住民税 notice resolution | route `納税証明書その3` to national tax/tax office/e-Tax and separate from resident tax |
| `guardrail-resident-tax-fiscal-year-address` | no-Japan-address cases, actual residence vs resident registration conflict, substitute evidence before deadline | extract fiscal year, January 1 municipality, and block wrong municipality mapping |
| `guardrail-late-payment-not-erased` | immigration weight of late payment/remediation; whether risk is cleared; business-owner obligation impact | block "追納/補申告 erases history" and extract timing/proof facts |
| `guardrail-j-skip-eligibility-gate` | activity-category classification, remuneration-component counting, route recommendation among J-Skip/HSP/J-Find/PR | block 1200万/1600万 J-Skip false positives and separate J-Skip from points |
| `guardrail-hsp1-institution-change` | allowed onboarding/training/remote-work boundary; same-group/subtype/combined filing route; already-started remediation | block "points + 14-day notification = permission" |
| `guardrail-work-qualification-certificate-boundary` | job-duty classification, certificate denial/non-issuance consequences, certificate interaction with pending renewal/change, already-started remediation | block "就労資格証明書 = new work permission" |
| `guardrail-spouse-divorce-death-remarriage` | route after divorce/death/remarriage, justifiable reason, 定住者/change route, late notification handling | block automatic cancellation and safe-until-expiry claims; extract notification/status facts |
| `guardrail-dv-separation-address-safety` | substitute evidence, address-confidentiality outcome, DV-based status-route classification, family-law/custody intersections | safety-first trigger; block contact-abuser/address-exposure instructions |
| `guardrail-business-manager-disposition-before-change` | company closure/suspension/liquidation/transfer sequencing, residual director/shareholder compatibility, unpaid obligations risk framing, reform effective-date route | block "close company = easier/safe" and extract old-company/new-employer facts |
| `guardrail-immigration-notice-taxonomy` | final notice-state classification from approximate wording, partial submission sufficiency, online/paper equivalence, DV/illness/overseas delivery handling | extraction-first notice taxonomy and block postcard/email/receipt-as-permission claims |

## 9. ENGINE/PROMPT Release Constraint

Until DOMAIN route maps above are reviewed, ENGINE may keep negative guardrails and extraction prompts, but should not promote these cards into deterministic answer outcomes.

Minimum safe behavior:

- trigger `needs_domain` for deep-water cases;
- preserve fixed answer labels and terminal completeness;
- keep route-gate output inspectable in Eval Lab;
- never allow prompt text to say that a missing-material submission, receipt, postcard, notice, 14-day notification, certificate, company closure, divorce notification, or DV evidence automatically creates permission or approval.
