# TEBIQ 0.8 Loop2D FACT Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate safe negative guardrails from FACT Batch 003/004 into deterministic route-gate / validator coverage while provider-backed Loop2B is blocked by provider auth.

## 1. FACT Scan

FACT progress scan:

- completed guardrail cards: 29
- in progress: 0
- needs DOMAIN: 85
- latest completed batch: Batch 004

Progress file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md
```

## 2. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator findings |
|---|---|---|
| `guardrail-shikaku-gai-katsudo-28h-limit` | `student-shikakugai-28h-long-vacation-limit` | `answer-shikakugai-long-vacation-unlimited`; `answer-shikakugai-multiple-jobs-each-28h`; `answer-shikakugai-prohibited-industry-allowed` |
| `guardrail-address-change-dual-obligation` | `address-change-card-window-dual-duty` | `answer-address-change-auto-without-card` |
| `guardrail-minashi-sainyukoku-one-year-limit` | `minashi-reentry-one-year-limit` | `answer-minashi-reentry-unlimited-or-over-one-year`; `answer-short-stay-minashi-reentry-available` |
| `guardrail-zairyu-card-expiry-vs-status-period` | `residence-card-expiry-vs-status-period` | `answer-card-expiry-equals-status-expiry` |
| `guardrail-tokubetsu-kyoka-not-normal-route` | `tokubetsu-kyoka-not-normal-route` | `answer-tokubetsu-kyoka-normal-fallback` |
| `guardrail-tokutei-katsudo-scope-boundary` | `tokutei-katsudo-designation-scope-boundary` | `answer-tokutei-katsudo-catch-all-work` |
| `guardrail-kika-eijuu-different-authority-and-effect` | `kika-eijuu-different-authority-and-effect` | `answer-eijuu-equals-citizenship` |
| `guardrail-third-party-cannot-replace-immigration-duty` | `individual-duty-not-replaced-by-third-party` | `answer-third-party-replaces-individual-notification` |
| `guardrail-status-cancellation-before-expiry` | `status-cancellation-before-expiry-boundary` | `answer-period-remaining-means-no-cancellation` |
| `guardrail-application-truthfulness-no-false-info` | `application-truthfulness-no-false-info` | `answer-false-application-safe-after-permission` |

These are negative safety guardrails only:

- Do not say long vacation means unlimited/full-time work.
- Do not say each part-time job has its own separate 28-hour allowance.
- Do not say prohibited adult/entertainment-side jobs are allowed merely because the user describes the job as serving drinks or hall work.
- Do not say online/mail/proxy住民票 handling automatically satisfies the immigration address duty when the 在留カード presentation fact is unknown.
- Do not say 永住者 can use みなし再入国 for absences over 1 year.
- Do not say 短期滞在 or 3-month-or-less holders can use みなし再入国.
- Do not equate residence-card expiry with status expiry.
- Do not present 在留特別許可 as an ordinary application or fallback after non-permission.
- Do not present 特定活動 as catch-all work permission.
- Do not equate 永住 with Japanese nationality, or route 帰化 to 入管.
- Do not say an employer/school/HR/Hello Work/city-office procedure automatically replaces the foreign resident's own immigration notification/application duty.
- Do not say remaining residence period/card validity prevents status-cancellation risk.
- Do not say false or inaccurate application content becomes safe just because a permission was already granted.

## 3. Not Integrated Yet

Not integrated as deterministic answer outcomes:

- consequence of already exceeding 28h/week or 8h/day;
- exact renewal impact of unauthorized work;
- whether online transfer-in systems with linked card data satisfy ISA notification duty;
- consequence of late address notification.
- exact route after already exceeding the みなし再入国 1-year limit while abroad;
- exact legal consequence of carrying an expired residence card while status is still valid;
- any strategy for 在留特別許可 or deportation proceedings;
- exact designated-activity category boundaries without the user's 指定書 text;
- concrete handling after a false statement or wrong document has already been submitted;
- exact legal/practical effect of a third party's attempted filing without clear authorization/受付 proof;
- cancellation-procedure likelihood in a particular user's remaining-period scenario.

Those remain DOMAIN questions, not ENGINE conclusions.

## 4. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
```

Results:

- `npm test`: passed, 88/88.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.

## 5. Current Blocker

Provider-backed Loop2B is still blocked because the temporary provider credential returned `deepseek_http_401`. This Loop2D work improves deterministic protection, but does not replace the required real-generation rerun and AQL close-read.
