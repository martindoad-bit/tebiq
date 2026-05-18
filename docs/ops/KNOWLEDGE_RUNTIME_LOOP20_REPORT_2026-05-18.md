# Knowledge Runtime Expansion Loop20 — Rewrite Queue Promotion

Date: 2026-05-18  
Branch: `codex/knowledge-runtime-loop20`  
Scope: 5 `NEEDS_REWRITE` cards left by Loop19

## Goal

Loop20 targeted the remaining rewrite queue. The goal was to convert useful but
unsafe or fuzzy cards into narrow, official-source assets, or keep them out of
ordinary runtime if the boundary could not be made safe.

This loop deliberately avoided practice-law strategy. Each promoted card is
limited to an official claim with explicit `must_not_say` boundaries.

## Review Inputs

Three reviewers covered the same 5-card set:

| Reviewer | Role | Key decision |
|---|---|---|
| FACT source verifier | Official-source verification | All 5 cards can be grounded in current official sources if narrowed |
| DOMAIN boundary reviewer | Administrative-scrivener-assistant boundary review | No approval-probability or strategy conclusions; several issues must stay professional-confirmation territory |
| AQL / QA reviewer | Answer quality and product-use review | Promote only if injection blocks prevent common myths and keep next actions cautious |

## Actions

### Promoted To `ANSWER_RUNTIME`

5 cards moved from `ai_extracted` / `NEEDS_REWRITE` to `ai_verified`:

| fact_id | Rewrite result |
|---|---|
| `eijuu-nenkin-risk` | Narrowed to official public-obligation duty, late-payment negative evaluation, and work-status PR page material periods |
| `keiei-kanri-jimu-bessho-requirement` | Narrowed to official business-office requirement, home-office principle, and no one-size office-size answer |
| `kodo-senmon-shoku-points` | Narrowed to HSP1 70-point application/change/update frame and PR 70/80-point shortening frame |
| `eijuu-bbq-criminal-record` | Removed unsupported traffic-offense thresholds / lookback claims; kept official good-conduct and fine/detention/imprisonment language |
| `koukou-mukyo-shogakukin` | Updated to 2026 MEXT high-school tuition-support reform, income-restriction removal, and foreign-student application flows |

Each promoted card now includes an `injection_certain_block`, direct
user-visible evidence, and explicit `must_not_say` instructions.

### Materials / Quick Reference Binding

Added one new material scenario:

| Topic | Purpose |
|---|---|
| `high-school-tuition-support-materials` | Helps foreign families understand 高等学校等就学支援金, school-guided application, and e-Shien / school instruction flow |

`minor-school-enrollment-materials` now links to the new high-school tuition
support topic.

Materials topics increased from 47 to **48**.
Material references increased from 232 to **233**.

## Product Impact

Loop20 improves both answer reliability and Materials Tab thickness:

- 永住 public-obligation answers can now mention late payment without saying
  "paying before application erases the issue."
- 経営管理 office answers no longer imply that virtual / shared / home office is
  generically safe or generically impossible.
- 高度専門職 point answers can explain 70 / 80 point meaning without leaking into
  HSP1 institution-change permission.
- 永住 conduct answers no longer repeat unsupported "5-10 year" or "minor
  traffic violation usually OK" claims.
- 高校就学支援金 is now present in both answer runtime and material navigation,
  using the 2026 MEXT reform page.

## Knowledge Counts After Filesystem Changes

Pre-sync filesystem audit:

| State | Count |
|---|---:|
| `ai_verified` | 238 |
| `human_reviewed` | 5 |
| `ai_extracted` | 18 |
| `disabled` | 8 |
| Total fact cards | 269 |

Runtime-injectable cards after this branch: **243** (`human_reviewed` +
`ai_verified`).

Remaining `ai_extracted` cards are no longer rewrite-queue cards. They are
mostly L5-only, materials-only, or higher-risk route assets that need separate
DOMAIN treatment.

## Validation Before Merge

| Check | Result |
|---|---|
| official source fetch | MEXT 2026 high-school tuition support page confirmed current reform / foreign-student flows |
| fact-layer dry sync | `scanned=269 upserted=0 errors=0` |
| card import audit | filesystem `ai_verified=238`, `ai_extracted=18`, `disabled=8`, `human_reviewed=5`; DB remains Loop19 until sync |
| materials audit | 48 topics, 233 references, no missing references |
| unit tests | 265/265 pass |
| TypeScript | pass |
| lint | pass |

## Remaining Risks

- `eijuu-jukyo-check-tax-shomeisho` remains `ai_extracted`; it was not part of
  this rewrite set because Loop20 focused on the five cards named by Loop19.
- Several remaining `ai_extracted` cards are intentionally L5-only and should
  not be promoted as ordinary answer-runtime facts without route-specific
  DOMAIN work.
- HSP point card is guarded by matcher block-context for HSP1 institution
  change, but production smoke should continue to include the HSP1 "can I start
  new company work?" question after sync.

## Next Loop Direction

Loop21 should start from the remaining 18 `ai_extracted` assets:

1. keep true L5-only route cards out of answer runtime;
2. source-repair or rewrite `eijuu-jukyo-check-tax-shomeisho`;
3. bind useful materials-only cards more deeply into Materials Tab;
4. keep production answer smoke centered on HSP1 institution change, 永住 tax /
   pension, 経営管理 office / transition, and spouse-route questions.
