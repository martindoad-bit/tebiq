# Knowledge Runtime Expansion Loop17 — Rewrite Queue Narrowing

Date: 2026-05-18  
Branch: `codex/knowledge-runtime-loop17`  
Scope: Loop16 `NEEDS_REWRITE` queue

## Goal

Loop17 took the 18 cards that Loop16 had marked `NEEDS_REWRITE` and attempted
to turn them into narrower, official-source-backed assets. The rule for this
loop was strict: promote only when the rewritten card could stand as a narrow
runtime fact; otherwise keep it out of answer runtime and preserve it for
materials, L5 handoff, or future source repair.

## Candidate Set

18 cards reviewed from the Loop16 rewrite queue:

`eijuu-haigusha-visa`, `eijuu-jukyo-period-overseas`,
`eijuu-kashikuken-bekkyo`, `eijuu-nenkin-risk`,
`eijuu-shotoku-200man-myth`, `gijinkoku-job-mismatch`,
`gijinkoku-major-job-match`, `kazoku-taizai-henko`,
`kazoku-taizai-shotoku-280`, `kazoku-yobi-naitei-haigusha`,
`keiei-kanri-jimu-bessho-requirement`, `nihonjin-haigusha-visa`,
`ryugaku-shusseki-ritsu-80`, `sainyukoku-kyoka`,
`startup-visa-keiei-transition`, `tax-treaty-source-of-truth`,
`teijusha-koshikai-vs-koshigai`, `tokutei-katsudo-survival`.

## Bucket Result

| Bucket | Count | Cards |
|---|---:|---|
| `ANSWER_RUNTIME` | 4 | `gijinkoku-job-mismatch`, `sainyukoku-kyoka`, `tax-treaty-source-of-truth`, `tokutei-katsudo-survival` |
| `MATERIALS_ONLY` | 3 | `eijuu-haigusha-visa`, `kazoku-taizai-henko`, `nihonjin-haigusha-visa` |
| `L5_ONLY` / safer quarantine | 9 | `eijuu-jukyo-period-overseas`, `eijuu-kashikuken-bekkyo`, `eijuu-nenkin-risk`, `eijuu-shotoku-200man-myth`, `gijinkoku-major-job-match`, `kazoku-taizai-shotoku-280`, `keiei-kanri-jimu-bessho-requirement`, `ryugaku-shusseki-ritsu-80`, `teijusha-koshikai-vs-koshigai` |
| Source repair deferred | 2 | `kazoku-yobi-naitei-haigusha`, `startup-visa-keiei-transition` |
| `REJECT` / `disabled` | 0 | None |

## Runtime Promotions

### `gijinkoku-job-mismatch`

State changed to `ai_verified` and `runtime_bucket: ANSWER_RUNTIME`.

The rewrite removed the earlier unsafe / phantom framing and retained only:

- official 技術・人文知識・国際業務 activity scope;
- 3-month non-activity cancellation-risk framing from ISA;
- 14-day affiliation notification facts;
- explicit non-claim that TEBIQ should not decide whether factory, sales,
  support, or on-site tasks qualify.

### `sainyukoku-kyoka`

State changed to `ai_verified` and `runtime_bucket: ANSWER_RUNTIME`.

The rewrite now only states:

- みなし再入国 is within 1 year, or within the current status period if shorter;
- ordinary re-entry permission may be granted up to 5 years;
- if the person does not re-enter within the valid period, the status is lost;
- airport form operations, fee details, PR special cases, and reacquisition
  strategy remain out of scope.

### `tax-treaty-source-of-truth`

State changed to `ai_verified`.

The card now narrowly covers the NTA treaty-notification filing route:
notification forms are submitted through the payer to the payer's tax office,
generally before the first payment. Country, income type, and attachment
requirements remain individually checked.

### `tokutei-katsudo-survival`

State changed to `ai_verified`.

The card now only states that 特定活動 is an activity individually designated by
the Minister of Justice and that period options exist on the official status
page. It no longer tries to classify all告示 / 告示外 / 指定書 situations.

## Non-Runtime Narrowing

Loop17 also rewrote several unsafe broad cards so that future agents will not
inherit the old overclaiming frames:

- `eijuu-shotoku-200man-myth`: removed fixed income-line advice; kept only the
  independent-livelihood guideline frame.
- `ryugaku-shusseki-ritsu-80`: removed the "80%" hard line; kept attendance,
  compliance, and learning-management risk as review factors.
- `kazoku-taizai-shotoku-280`: removed fixed income and housing/family-size
  inference; kept supporter income/assets documentation.
- `gijinkoku-major-job-match`: removed approval prediction; kept official
  relation / experience facts.
- `eijuu-jukyo-period-overseas`: removed unsupported 3-month / 180-day hard
  lines; kept continued-residence as an individual-check issue.
- `eijuu-kashikuken-bekkyo`: removed fixed 1-year / 3-year / 5-year status
  judgment; kept the guideline phrase that the applicant should currently hold
  the maximum period of stay.
- `keiei-kanri-jimu-bessho-requirement`: removed one-size-fits-all virtual
  office and residence-office claims; kept office existence and use-reality
  concerns as individual checks.
- `eijuu-nenkin-risk`: kept only the official late-payment negative-evaluation
  quote as safe injection text; lookback periods, exemptions, and gap tolerance
  remain unresolved and the card stays quarantined.

## Current Knowledge Counts

After Loop17 file edits:

| State | Count |
|---|---:|
| `ai_verified` | 222 |
| `human_reviewed` | 5 |
| `ai_extracted` | 34 |
| `disabled` | 8 |
| Total fact cards | 269 |

Runtime-injectable cards are now **227** (`ai_verified` + `human_reviewed`).

Important: the production database still showed the Loop16 count
(`ai_verified=218`, `ai_extracted=38`) before this PR. Production DB sync must
run after merge.

## Validation Before Merge

Commands run:

```bash
npm run fact-layer:sync:dry
npm run qa:card-import-audit
npm test
npm run lint
npx tsc --noEmit --pretty false
npm run qa:production-smoke
PRODUCTION_URL=https://tebiq.jp SMOKE_STREAM_TIMEOUT_MS=150000 npm run smoke:production-answer
```

Results:

| Check | Result |
|---|---|
| fact-layer dry sync | `scanned=269 upserted=0 errors=0` |
| card import audit | filesystem `ai_verified=222`, `ai_extracted=34`, `disabled=8`, `human_reviewed=5`; DB still Loop16 until sync |
| route-gate unresolved source assets | 1 known unresolved AQL-origin asset: `aql-rur-037-jfind-employment-bridge` |
| unit tests | 264/264 pass |
| lint | pass |
| TypeScript | pass |
| production URL smoke | 70/70 pass |
| production answer smoke | 25/25 pass |

## Post-Merge Production Validation

PR #191 merged to main as `55ca22ec990b720e599cb1163537aa17e99e2942`.
Vercel production reached that SHA at `builtAt=2026-05-18T07:48:22.815Z`.

Production DB sync was then run:

```bash
npm run fact-layer:sync
```

Result:

```text
fact-layer-sync: scanned=269 upserted=269 errors=0
```

Post-sync audit confirmed filesystem and database are aligned:

| State | Filesystem | Database |
|---|---:|---:|
| `ai_verified` | 222 | 222 |
| `human_reviewed` | 5 | 5 |
| `ai_extracted` | 34 | 34 |
| `disabled` | 8 | 8 |
| Total | 269 | 269 |

Post-merge production checks:

| Check | Result |
|---|---|
| `/api/build-info` | `gitSha=55ca22ec990b720e599cb1163537aa17e99e2942` |
| `npm run qa:card-import-audit` | no missing / extra DB cards |
| `npm run qa:production-smoke` | 70/70 pass |
| `PRODUCTION_URL=https://tebiq.jp SMOKE_STREAM_TIMEOUT_MS=150000 npm run smoke:production-answer` | 25/25 pass |

## Product Impact

Loop17 is a quality-forward expansion loop:

- runtime card count increased from 223 to 227;
- unsafe broad cards were rewritten away from approval prediction and strategy;
- materials-only spouse / family cards remain useful without entering ordinary
  answer injection;
- 永住 tax/pension and income cards are safer but still correctly quarantined;
- the old rewrite queue is no longer a single backlog. The next work should
  focus on source repair candidates and Materials Universe gaps instead of
  forcing high-risk threshold cards into runtime.

## Next Loop Direction

Recommended Loop18 starting point:

1. Source-repair `startup-visa-keiei-transition` and
   `kazoku-yobi-naitei-haigusha`, or explicitly move them to L5-only.
2. Add material bindings for the three MATERIALS_ONLY narrowed cards where the
   product surface can use them safely.
3. Continue building 400+ high-quality assets through new narrow official
   material / life-admin cards, not by promoting unresolved threshold myths.
