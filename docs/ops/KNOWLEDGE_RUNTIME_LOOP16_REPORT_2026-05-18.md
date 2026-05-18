# Knowledge Runtime Expansion Loop16 — Final Quarantine Safety Bucket

Date: 2026-05-18  
Branch: `codex/knowledge-runtime-loop16`  
Scope: remaining 39 `ai_extracted` fact cards after Loop14 and Loop15

## Goal

Loop16 processed the remaining quarantine tail. The objective was not to force
more answer-runtime promotions, but to decide where each remaining card belongs:

- ordinary answer runtime;
- materials-only support;
- L5 / route-gate support;
- rewrite queue;
- reject / disable;
- unknown.

FACT and DOMAIN both reached the same high-level conclusion: none of these 39
cards should enter answer runtime as-is. Most are useful knowledge assets, but
they mix official facts with practice judgment, route strategy, or unstable
thresholds. Moving them directly to `ai_verified` would reduce answer safety.

## Candidate Set

39 cards reviewed:

`eijuu-bbq-criminal-record`, `eijuu-haigusha-visa`, `eijuu-jukyo-check-tax-shomeisho`, `eijuu-jukyo-period-overseas`, `eijuu-kashikuken-bekkyo`, `eijuu-nenkin-risk`, `eijuu-payment-strict-2024`, `eijuu-shotoku-200man-myth`, `eijuusha-haigusha-divorce`, `gijinkoku-job-mismatch`, `gijinkoku-major-job-match`, `kazoku-taizai-henko`, `kazoku-taizai-shotoku-280`, `kazoku-yobi-naitei-haigusha`, `keiei-kanri-2025-4-requirements`, `keiei-kanri-capital-asset-3000man-criterion`, `keiei-kanri-existing-3year-transition`, `keiei-kanri-jimu-bessho-requirement`, `kodo-senmon-shoku-points`, `koukou-mukyo-shogakukin`, `minashi-sainyuukoku`, `nihonjin-haigusha-divorce-teijusha`, `nihonjin-haigusha-visa`, `nyukoku-kyohi-jiyu`, `overstay-self-report-route`, `overstay-taisho`, `ryugaku-shusseki-ritsu-80`, `sainyukoku-kyoka`, `shakai-hoken-kyotei-bilateral`, `startup-visa-keiei-transition`, `tax-treaty-source-of-truth`, `teijusha-koshikai-vs-koshigai`, `tokutei-katsudo-survival`, `yuigon-koseishousho-jutsu`, `zaijuu-haigusha-6months`, `zairyu-irrelevent-jutsu`, `zairyu-pl-after-shibetsu`, `zairyu-shikaku-torikeshi-jiyu-10`, `zairyu-tokubetsu-kyoka`.

## Bucket Result

| Bucket | Count | Cards |
|---|---:|---|
| `ANSWER_RUNTIME` | 0 | None. FACT and DOMAIN did not approve any original card for direct answer injection. |
| `MATERIALS_ONLY` | 4 | `eijuu-jukyo-check-tax-shomeisho`, `koukou-mukyo-shogakukin`, `shakai-hoken-kyotei-bilateral`, `yuigon-koseishousho-jutsu` |
| `L5_ONLY` | 15 | `eijuu-bbq-criminal-record`, `eijuusha-haigusha-divorce`, `keiei-kanri-capital-asset-3000man-criterion`, `keiei-kanri-existing-3year-transition`, `kodo-senmon-shoku-points`, `minashi-sainyuukoku`, `nihonjin-haigusha-divorce-teijusha`, `nyukoku-kyohi-jiyu`, `overstay-self-report-route`, `overstay-taisho`, `zaijuu-haigusha-6months`, `zairyu-irrelevent-jutsu`, `zairyu-pl-after-shibetsu`, `zairyu-shikaku-torikeshi-jiyu-10`, `zairyu-tokubetsu-kyoka` |
| `NEEDS_REWRITE` | 18 | `eijuu-haigusha-visa`, `eijuu-jukyo-period-overseas`, `eijuu-kashikuken-bekkyo`, `eijuu-nenkin-risk`, `eijuu-shotoku-200man-myth`, `gijinkoku-job-mismatch`, `gijinkoku-major-job-match`, `kazoku-taizai-henko`, `kazoku-taizai-shotoku-280`, `kazoku-yobi-naitei-haigusha`, `keiei-kanri-jimu-bessho-requirement`, `nihonjin-haigusha-visa`, `ryugaku-shusseki-ritsu-80`, `sainyukoku-kyoka`, `startup-visa-keiei-transition`, `tax-treaty-source-of-truth`, `teijusha-koshikai-vs-koshigai`, `tokutei-katsudo-survival` |
| `REJECT` / `disabled` | 1 | `keiei-kanri-2025-4-requirements` |
| `UNKNOWN` | 1 | `eijuu-payment-strict-2024` |

## Actions

### 1. Rejected stale business-manager reform frame

`keiei-kanri-2025-4-requirements` moved from `ai_extracted` to `disabled`.

Reason:

- FACT called the "4 requirements" framing incomplete.
- DOMAIN had already warned that business-manager 2025 reform cards must avoid
  old shortcut framing.
- The safer product path is to use the specific item cards and existing
  business-manager 2025 route gate / L5 signal instead of keeping this broad
  card available for future accidental promotion.

### 2. Materials-only cards retained as non-answer assets

Existing bindings were checked:

| Card | Current material path |
|---|---|
| `eijuu-jukyo-check-tax-shomeisho` | Resident-tax / permanent-residence material entities and topics |
| `shakai-hoken-kyotei-bilateral` | Pension/social-insurance material entity and topic |
| `yuigon-koseishousho-jutsu` | Family-relation document material entity |
| `koukou-mukyo-shogakukin` | Deferred; useful as a future support-program material, but not part of the current 15 core document entities |

No answer runtime promotion was made for these cards.

### 3. L5-only cards kept out of ordinary answer runtime

The 15 L5-only cards remain out of answer runtime. Existing route-gate and L5
coverage already handles the highest-risk families:

- spouse divorce/death/remarriage and status-cancellation signals;
- overstay / departure-order / special-permission signals;
- landing denial / reentry-risk signals;
- business-manager 2025 reform signal;
- pending-change and work-scope signals.

Important implementation note: setting these cards to `needs_review` would make
them visible as hint-only references in the answer UI. Because they are not ready
for user-facing fact references, they remain `ai_extracted` unless a dedicated
L5 registry entry needs their source id.

### 4. Rewrite queue preserved

18 cards stay in rewrite queue. They are valuable, but need to be split into
narrow official facts before any answer-runtime promotion. Common rewrite needs:

- separate official rules from practice strategy;
- remove unsupported numeric thresholds;
- split eligibility facts from approval prediction;
- keep family/divorce/DV/overstay routes in professional handoff instead of
  self-service instructions.

## Current Knowledge Counts

After this loop's card-state change:

| State | Count |
|---|---:|
| `ai_verified` | 218 |
| `human_reviewed` | 5 |
| `ai_extracted` | 38 |
| `disabled` | 8 |
| Total fact cards | 269 |

The 223 runtime-injectable cards (`ai_verified` + `human_reviewed`) remain
unchanged. Loop16 improves safety and ledger clarity rather than runtime volume.

## Validation

Commands run after the state change:

```bash
npm run fact-layer:sync:dry
npm run qa:card-import-audit
npm test
npm run lint
npx tsc --noEmit --pretty false
npm run qa:production-smoke
PRODUCTION_URL=https://tebiq.jp SMOKE_STREAM_TIMEOUT_MS=150000 npm run smoke:production-answer
npm run qa:pre-report-audit
```

Expected acceptance for this loop:

- no sync errors;
- route-gate source asset unresolved count remains only the known AQL-origin asset;
- production materials/routes remain 200;
- production answer smoke remains P0-clean.

## Product Impact

This loop closes the existing quarantine backlog without weakening answer
safety:

- no unsafe runtime promotion;
- one obsolete reform-frame card removed from future promotion candidates;
- materials-only cards remain usable where they help users gather documents;
- L5-only cards stay behind route gates and professional handoff;
- rewrite backlog is explicit and finite.

The main knowledge-runtime frontier is now no longer "what do we do with the old
39 quarantine cards?" The next expansion loops should create rewritten narrow
cards from the `NEEDS_REWRITE` queue and add new high-confidence official-source
cards, especially for materials and common life-admin tasks.

