# Knowledge Runtime Expansion Goal — Loop 3 Candidates

Date: 2026-05-17  
Worktree: `/Users/martin/Documents/tebiq-knowledge-runtime-goal`  
Branch: `codex/knowledge-runtime-loop3`

## Loop 3 Intent

Loop 3 consumes the `NEEDS_REWRITE / SOURCE_REPAIR` bucket left by Loop 2.

The purpose is not to inflate runtime count. The purpose is to repair cards whose topics are useful, but whose first version either cited the wrong page, mixed material facts with practice strategy, or used a broad claim that the source did not support.

## Candidate Set

| # | fact_id | Loop 2 reason | Loop 3 target |
|---:|---|---|---|
| 1 | `jumin-zei-jan1-criterion` | source/claim mismatch | ANSWER_RUNTIME after local-tax source repair |
| 2 | `maina-hoken-2024-12` | stale/current-operation ambiguity | ANSWER_RUNTIME after current MyNa/qualification-certificate rewrite |
| 3 | `koyou-keiyaku-rouken-tsuchi` | labor fact mixed with visa-material inference | ANSWER_RUNTIME after labor-condition-notice-only rewrite |
| 4 | `zairyu-nintei-shomeisho-application-method` | COE process source mismatch | ANSWER_RUNTIME after ISA COE application method rewrite |
| 5 | `zairyu-kekkan-renew-document` | generic defective-card renewal material | KEEP as MATERIALS_ONLY / no runtime promotion this loop |
| 6 | `shussei-todoke-14days` | municipal source needed | ANSWER_RUNTIME after MOJ family-register source repair |
| 7 | `shibo-todoke-7days` | death notice and residence-card return were mixed | ANSWER_RUNTIME after death notice / card-return split |
| 8 | `kekkon-todoke-procedure` | international-marriage procedure source needed | ANSWER_RUNTIME after MOJ marriage source repair |
| 9 | `ryuugaku-nenkin-tokurei` | pension special-payment source needed | ANSWER_RUNTIME after Japan Pension Service source repair |
| 10 | `coe-shokai-overview` | original COE overview was too broad | ANSWER_RUNTIME after progress-inquiry rewrite |
| 11 | `eijuu-haigusha-3years-route` | PR spouse route needed official guideline framing | ANSWER_RUNTIME after no-guarantee exception-route rewrite |
| 12 | `eijuu-shotoku-haigusha-3year` | tax certificate years needed route-specific source | ANSWER_RUNTIME after spouse/child route material-years rewrite |
| 13 | `eijuu-children-direct-route` | "direct route" wording was unsafe | ANSWER_RUNTIME after 1-year exception-route rewrite |
| 14 | `kazoku-taizai-zairyu-period` | sponsor-period claim needed narrowing | ANSWER_RUNTIME after max-5-years individual designation rewrite |
| 15 | `kazoku-taizai-shussan-shutoku` | newborn status acquisition needed direct source | ANSWER_RUNTIME after ISA 30/60-day source repair |
| 16 | `kaiko-yokoku-30days` | labor source needed exact fit | ANSWER_RUNTIME after MHLW dismissal-notice source repair |
| 17 | `rousai-hoken-foreign-worker` | illegal-work subclaim unsafe for frontstage | ANSWER_RUNTIME after foreign-worker coverage rewrite |

## Explicit Hold

`zairyu-kekkan-renew-document` is not promoted in Loop 3. It remains useful as a future materials-page input, but its current phrasing is too generic for answer injection.

## Hard Rule

Promote only rewritten cards that meet all of these conditions:

- official source supports the exact injected claim;
- card has direct, user-visible evidence;
- card has an `injection_certain_block`;
- no permission/approval guarantee;
- no hidden practice strategy;
- no stale numeric value;
- no route-specific claim presented as universal.
