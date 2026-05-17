# Knowledge Runtime Expansion Goal — Loop 2 Candidates

Date: 2026-05-17  
Worktree: `/Users/martin/Documents/tebiq-knowledge-runtime-goal`  
Branch: `codex/knowledge-runtime-loop2`

## Loop 2 Intent

Loop 1 proved the conservative promotion rule:

```text
DOMAIN can mark a card promotable, but FACT source mismatch blocks runtime.
```

Loop 2 focuses on source repair and material thickness:

1. promote only cards with corrected official source fit;
2. bind material-only cards into Materials Universe;
3. keep practice-sensitive strategy cards quarantined or L5-only;
4. avoid raw quantity inflation.

## Candidate Set

| # | fact_id | Primary direction |
|---:|---|---|
| 1 | `eijuu-letterofunderstanding-2021` | MATERIALS_ONLY / possible runtime if source exact |
| 2 | `eijuu-nenkin-2year-shomei-method` | MATERIALS_ONLY |
| 3 | `hoshou-jin-eijuu` | MATERIALS_ONLY |
| 4 | `jumin-zei-no-shukyou-3types` | MATERIALS_ONLY |
| 5 | `jumin-zei-jan1-criterion` | ANSWER_RUNTIME if source repaired |
| 6 | `kokuho-shutoku-shoumei-2years` | MATERIALS_ONLY |
| 7 | `maina-hoken-2024-12` | MATERIALS_ONLY / source repair |
| 8 | `koyou-keiyaku-rouken-tsuchi` | MATERIALS_ONLY / source repair |
| 9 | `kakutei-shinkoku-deadline-march15` | ANSWER_RUNTIME if source exact |
| 10 | `aoiro-shinkoku-65` | MATERIALS_ONLY |
| 11 | `iryouhi-kojo-200000` | MATERIALS_ONLY |
| 12 | `zairyu-card-carry-obligation` | ANSWER_RUNTIME if source repaired |
| 13 | `zairyu-card-loss-overseas` | L5_ONLY / ANSWER_RUNTIME if source exact |
| 14 | `zairyu-card-return-gimu` | ANSWER_RUNTIME if source exact |
| 15 | `zairyu-shinsei-form-paper-online` | MATERIALS_ONLY |
| 16 | `zairyu-online-system` | MATERIALS_ONLY |
| 17 | `zairyu-hardship-payment` | MATERIALS_ONLY |
| 18 | `zairyu-nintei-shomeisho-application-method` | MATERIALS_ONLY / possible runtime |
| 19 | `zairyu-kekkan-renew-document` | MATERIALS_ONLY |
| 20 | `shussei-todoke-14days` | MATERIALS_ONLY / source repair |
| 21 | `shibo-todoke-7days` | MATERIALS_ONLY / source repair |
| 22 | `kekkon-todoke-procedure` | MATERIALS_ONLY / source repair |
| 23 | `rikon-todoke-procedure` | L5_ONLY / source repair |
| 24 | `kazoku-yobi-yose-shorui` | MATERIALS_ONLY |
| 25 | `kazoku-taizai-zairyu-period` | ANSWER_RUNTIME if source exact |
| 26 | `kazoku-taizai-shussan-shutoku` | ANSWER_RUNTIME / MATERIALS_ONLY if source exact |
| 27 | `ryugaku-naitei-tokutei-katsudou` | L5_ONLY / source repair |
| 28 | `ryugaku-kishu-katsudo-tokkatsu` | L5_ONLY / source repair |
| 29 | `ryugaku-shikakugai-individual-permission` | L5_ONLY |
| 30 | `ryuugaku-nenkin-tokurei` | MATERIALS_ONLY / source repair |
| 31 | `coe-shokai-overview` | NEEDS_REWRITE unless source/claim repaired |
| 32 | `eijuu-renew-not-required` | ANSWER_RUNTIME if source exact |
| 33 | `eijuu-vs-kika-key-diff` | ANSWER_RUNTIME / MATERIALS_ONLY |
| 34 | `eijuu-haigusha-3years-route` | ANSWER_RUNTIME if source exact |
| 35 | `eijuu-haigusha-zairyu-1year` | ANSWER_RUNTIME if source exact |
| 36 | `eijuu-shotoku-haigusha-3year` | ANSWER_RUNTIME if source exact |
| 37 | `eijuu-junior-15-eligibility` | MATERIALS_ONLY |
| 38 | `eijuu-children-direct-route` | ANSWER_RUNTIME if source exact |
| 39 | `eijuu-takeoff-risk` | L5_ONLY / ANSWER_RUNTIME if source exact |
| 40 | `eijuu-jukyo-check-tax-shomeisho` | MATERIALS_ONLY / source repair |
| 41 | `eijuu-after-kika-card` | MATERIALS_ONLY |
| 42 | `koyo-todokede-mhlw` | ANSWER_RUNTIME / MATERIALS_ONLY |
| 43 | `kokumin-kenko-hoken-14days` | ANSWER_RUNTIME if source repaired |
| 44 | `kokumin-nenkin-14days` | ANSWER_RUNTIME if source repaired |
| 45 | `nin-i-keizoku-20days` | MATERIALS_ONLY |
| 46 | `kaiko-yokoku-30days` | ANSWER_RUNTIME / MATERIALS_ONLY |
| 47 | `rousai-hoken-foreign-worker` | ANSWER_RUNTIME / MATERIALS_ONLY |
| 48 | `shussan-ichijikin-50man` | MATERIALS_ONLY |
| 49 | `shussan-teate-3day-deno` | MATERIALS_ONLY |
| 50 | `ikuji-kyugyo-shotoku-67` | MATERIALS_ONLY |

## Hard Rule

Do not promote cards that:

- cite an official URL that does not support the exact claim;
- mix official fact with practice strategy;
- use stale numeric values;
- require individual legal judgment;
- are better represented as `MATERIALS_ONLY` or `L5_ONLY`.
