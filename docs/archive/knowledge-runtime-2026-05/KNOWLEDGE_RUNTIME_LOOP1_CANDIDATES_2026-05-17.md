# Knowledge Runtime Expansion — Loop 1 Candidate Pack

Date: 2026-05-17
Branch: `codex/knowledge-runtime-goal`
Base: `origin/main@09cab2f`
Goal: process 30-50 quarantine cards into product buckets.

## Scope

Loop 1 intentionally starts with cards that are likely to thicken answer/runtime and Materials without requiring deep discretionary judgment.

Buckets to assign after FACT + DOMAIN review:

- `ANSWER_RUNTIME`
- `MATERIALS_ONLY`
- `L5_ONLY`
- `NEEDS_REWRITE`
- `REJECT`
- `UNKNOWN`

## Candidates

| # | fact_id | focus |
|---:|---|---|
| 1 | `coe-validity-3months` | COE validity / procedure |
| 2 | `coe-email-receipt-2023` | COE email receipt |
| 3 | `coe-shokai-overview` | COE online inquiry |
| 4 | `henkou-shinsei-fee-6000` | status-change fee / timing |
| 5 | `koushin-shinsei-fee-6000` | renewal fee / timing |
| 6 | `eijuu-application-fee-10000` | PR fee |
| 7 | `eijuu-letterofunderstanding-2021` | PR understanding letter |
| 8 | `eijuu-renew-not-required` | PR no status renewal |
| 9 | `eijuu-vs-kika-key-diff` | PR vs naturalization |
| 10 | `eijuu-guideline-10years` | PR guideline baseline |
| 11 | `eijuu-nenkin-2year-shomei-method` | PR pension proof method |
| 12 | `hoshou-jin-eijuu` | PR guarantor |
| 13 | `jumin-zei-jan1-criterion` | resident tax Jan 1 criterion |
| 14 | `jumin-zei-no-shukyou-3types` | resident tax certificate types |
| 15 | `kokumin-kenko-hoken-14days` | NHI enrollment window |
| 16 | `kokumin-nenkin-14days` | national pension enrollment window |
| 17 | `kokuho-shutoku-shoumei-2years` | NHI payment proof |
| 18 | `maina-hoken-2024-12` | MyNumber health insurance |
| 19 | `koyo-hoken-31days-20hours` | employment insurance eligibility |
| 20 | `koyo-hoken-kihon-teate-12months` | unemployment benefit baseline |
| 21 | `koyo-todokede-mhlw` | employer notification |
| 22 | `koyou-keiyaku-rouken-tsuchi` | employment contract / working conditions |
| 23 | `kakutei-shinkoku-deadline-march15` | tax return deadline |
| 24 | `aoiro-shinkoku-65` | blue return deduction |
| 25 | `iryouhi-kojo-200000` | medical expense deduction |
| 26 | `jidou-teate-overview` | child allowance |
| 27 | `ryuugaku-nenkin-tokurei` | student pension special payment |
| 28 | `ryugaku-naitei-tokutei-katsudou` | student job-hunting designated activities |
| 29 | `ryugaku-kishu-katsudo-tokkatsu` | student activity after graduation |
| 30 | `ryugaku-shikakugai-individual-permission` | student permission to engage |
| 31 | `kazoku-taizai-target-status` | dependent eligible statuses |
| 32 | `kazoku-taizai-zairyu-period` | dependent period |
| 33 | `kazoku-yobi-yose-shorui` | dependent COE materials |
| 34 | `houjin-touki-overview` | company registry certificate |
| 35 | `kekkon-todoke-procedure` | marriage notification |
| 36 | `rikon-todoke-procedure` | divorce notification |
| 37 | `shibo-todoke-7days` | death notification |
| 38 | `gaimen-kirikae-process` | foreign license conversion |
| 39 | `gaikokujin-soudan-center` | foreign resident consultation centers |
| 40 | `shuro-shoumeisho-fee-2000` | certificate of authorized employment fee |
| 41 | `shozoku-online-system-todokede` | online affiliation notification |
| 42 | `shussei-todoke-14days` | birth notification |
| 43 | `visa-menjo-69-country` | visa exemption countries |
| 44 | `tanki-taizai-overview` | short-term stay overview |
| 45 | `zairyu-card-carry-obligation` | residence card carry obligation |
| 46 | `zairyu-card-reissue-14days` | residence card reissue |
| 47 | `zairyu-card-validity-renewal` | card validity renewal |
| 48 | `zairyu-shinsei-form-paper-online` | paper / online application forms |
| 49 | `zairyu-online-system` | online residence application system |
| 50 | `zairyu-nintei-shomeisho-application-method` | COE application method |

## Required Loop 1 Output

- FACT source verification table
- DOMAIN bucket verdict table
- implementation patch for safe buckets
- DB sync result
- answer regression result
- materials path regression result
- AQL/QA notes
- Loop 1 report with counts
