# Knowledge Runtime Expansion — Loop 4 Materials Binding Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop4-materials`

## Scope

Loop 4 did not promote new answer-runtime fact cards. It converted the Loop 2/3 runtime gains into user-visible Materials Tab depth:

- quick-reference scenario pages now render reusable material entities in a dedicated block;
- Loop 3 promoted facts are bound into relevant material entities and scenario topics;
- no DB sync is required for this loop because changes are static UI/data mapping only.

## Work Completed

### 1. Scenario → Material Entity Bridge

`/quick-reference/[id]` now shows a `这个手续涉及的材料` block when a scenario has reusable material entities.

This makes the product behave less like a flat list of scenarios and more like a reusable materials universe:

- a user reading an application scenario can jump into the concrete document they must obtain;
- the same material entity can serve multiple scenarios;
- future fact-card improvements can deepen one material entity instead of duplicating copy across scenes.

### 2. Loop 3 Fact Bindings Into Materials

Newly promoted Loop 3 facts were attached to existing material entities:

| Material Entity | Added fact ids |
|---|---|
| `juminzei-kazei-shomei` | `jumin-zei-jan1-criterion` |
| `juminzei-nouzei-shomei` | `jumin-zei-jan1-criterion` |
| `nenkin-kiroku` | `ryuugaku-nenkin-tokurei` |
| `koseki-tohon-konin-shusshou` | `kekkon-todoke-procedure`, `shussei-todoke-14days` |

### 3. Loop 3 Fact Bindings Into Scenario Topics

Newly promoted facts were attached to 7 high-value quick-reference topics:

| Topic | Added fact ids |
|---|---|
| `permanent-residence-application-materials` | `eijuu-haigusha-3years-route`, `eijuu-children-direct-route`, `eijuu-shotoku-haigusha-3year` |
| `resident-tax-certificate-materials` | `jumin-zei-jan1-criterion`, `eijuu-shotoku-haigusha-3year` |
| `pension-social-insurance-proof-materials` | `eijuu-nenkin-2year-shomei-method`, `maina-hoken-2024-12`, `kokuho-shutoku-shoumei-2years` |
| `family-stay-renewal-materials` | `kazoku-taizai-zairyu-period`, `kazoku-taizai-shussan-shutoku` |
| `job-change-notification-materials` | `koyou-keiyaku-rouken-tsuchi` |
| `childbirth-allowances-materials` | `shussei-todoke-14days`, `kazoku-taizai-shussan-shutoku` |
| `unemployment-benefit-materials` | `kaiko-yokoku-30days`, `rousai-hoken-foreign-worker` |

## Verification

Local checks completed before commit:

- `npm test` — PASS, 257/257
- `npm run lint` — PASS
- `npx tsc --noEmit --pretty false` — PASS
- `npm run qa:card-import-audit` — PASS
  - filesystem and database both at 269 cards
  - `ai_verified`: 126
  - `human_reviewed`: 5
  - runtime eligible: 131
  - materials references: 107
  - missing material references: 0
- Static entity lookup smoke:
  - `permanent-residence-application-materials` resolves 14 material entities
  - `family-stay-renewal-materials` resolves 7 material entities
  - `job-change-notification-materials` resolves 2 material entities
- Production URL smoke root-cause check:
  - first full smoke hit a transient curl timeout on `/quick-reference`;
  - direct `/quick-reference` probes returned 200 in 5/5 runs, with 2-4s response time;
  - the smoke script was hardened to retry curl transport errors only, while still failing real HTTP 404/5xx responses.

## Current Knowledge Waterline

This loop keeps the runtime fact-card count stable but improves product usage of that layer.

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 126 |
| `human_reviewed` | 5 |
| runtime eligible | 131 |
| `ai_extracted` still quarantined | 135 |
| disabled | 3 |
| material entities | 15 |
| quick-reference topics | 43 |

## Product Impact

Before this loop, Materials Universe existed as `/materials/*`, while many users still entered from `/quick-reference/*`. That made the new material entities easy to miss.

After this loop, the main user path becomes:

1. open a scenario checklist;
2. see the concrete materials involved;
3. jump into reusable material detail pages;
4. return to TEBIQ question flow if the material choice or risk is unclear.

This directly supports the 1.0 goal of making the Materials Tab feel thicker without adding unreviewed legal judgment.

## Remaining Work

Loop 4 does not solve these items:

- no new cards promoted from quarantine;
- material source URL re-crawl still pending;
- 14 known dead URLs from the broader ledger still need repair;
- material entity content still needs deeper DOMAIN/content QA;
- production visual smoke must be run after deploy.
