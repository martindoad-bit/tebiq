# TEBIQ 0.8 Loop2L PR And Employment Obligation Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate four additional P1 guardrail families into deterministic route-gate / validator coverage, then run real-user coverage and pre-release local verification. This loop focuses on permanent residence basic requirements, permanent-resident card renewal, 技人国/JLPT overreach, and foreign-worker social-insurance obligations.

## 1. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator finding |
|---|---|---|
| `guardrail-eijuu-shinsei-kihon-yoken` | `pr-basic-requirements-not-years-only` | `answer-pr-years-only-or-public-obligations-irrelevant` |
| `guardrail-eijusha-card-kosin-soko` | `pr-card-renewal-still-required` | `answer-pr-card-renewal-not-needed-or-status-lost` |
| `guardrail-gijinkoku-nihongo-youken` | `gijinkoku-jlpt-not-formal-not-irrelevant` | `answer-gijinkoku-jlpt-fixed-or-irrelevant` |
| `guardrail-shakai-hoken-gaikokujin-gimu` | `foreign-worker-social-insurance-not-optional` | `answer-foreign-worker-social-insurance-optional` |

These are negative safety guardrails only:

- Do not say permanent residence is decided only by years in Japan.
- Do not say tax, pension, health insurance, or other public obligations are irrelevant to permanent residence.
- Do not say permanent-resident card renewal is unnecessary, that the card is valid forever, or that card expiry automatically cancels permanent residence.
- Do not say 技人国 has a fixed JLPT N2/N1 statutory threshold, or that Japanese ability is completely irrelevant when job duties require it.
- Do not say foreign workers can opt out of social insurance or pension merely because they are foreign nationals or because of visa type.

## 2. Engineering Notes

Two route-gate matcher gaps were found by real-user prompts and patched:

- `pr-basic-requirements-not-years-only` now matches practical "1年 / 3年 / 5年" permanent-residence timing questions, not only `3年签` / `5年签` wording.
- `gijinkoku-jlpt-not-formal-not-irrelevant` now matches Chinese surface form `人文知识国际业务`, not only `技人国` / `人文签`.

One validator false-negative was fixed:

- `answer-pr-years-only-or-public-obligations-irrelevant` no longer treats `永住只看年数` as safe merely because the surrounding text later contains `税金年金`.

## 3. Real User Simulator Coverage

Real User Simulator produced 8 realistic prompts.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2L.json
```

Coverage command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2L.json
```

Result:

- 8/8 realistic prompts hit expected route gates.

Dry-run sidecar:

```text
docs/eval/tebiq-0.8-guardrail-rus-loop2l-production-answer-results.json
```

## 4. AQL / QA Review Response

AQL / QA review found no P0 and several P1/P2 engineering gaps. The following were patched:

- Loop2L four high-risk P1 validator findings now enter terminal guardrail policy.
- Social-insurance route matching now covers implicit TEBIQ-context questions where the user only says `会社 / 公司` and social-insurance terms.
- 技人国/JLPT route matching now covers unseparated surface forms such as `技术人文知识国际业务` and `技術人文知識国際業務`.
- Permanent-resident card route matching no longer uses bare `PR` as a trigger; an ordinary credit-card negative control was added.
- Validator patterns now catch softer bad answers such as "补缴完对永住没有影响", "基本就是年数问题", "公司不给社保不影响签证", and wage supplement as social-insurance replacement.

AQL / QA review report:

```text
docs/eval/TEBIQ_0_8_LOOP2L_AQL_QA_REVIEW.md
```

## 5. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
for f in docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS*.json; do npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input="$f" || exit 1; done
npm run build
ADMIN_KEY=local-admin-test EVAL_LAB_ENABLED=1 npm run start -- --hostname 127.0.0.1 --port 3010
```

Results:

- `npm test`: passed, 160/160.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.
- all guardrail real-user coverage packs through Loop2L: passed.
- `npm run build`: passed.
- local production smoke:
  - `/quick-reference`: 200
  - `/internal/eval-lab`: 200
  - `/admin`: 404 without key
  - `/admin?key=wrong`: 404
  - `/admin?key=local-admin-test`: 200
  - `/api/admin/stats`: 404 without key
  - `/api/admin/stats?key=wrong`: 404
  - `/api/admin/stats?key=local-admin-test`: 200
  - `/api/admin/consultations?key=local-admin-test`: 200
  - `/api/admin/cases?key=local-admin-test`: 200
  - `/api/build-info`: 200

Current deterministic coverage:

- route-gate families: 50
- answer-validator findings: 59

## 6. Not Proven

Provider-backed answer generation was not re-run in this loop. This loop proves deterministic route-gate / validator / build / local production smoke only.

Release should still treat provider-backed answer regression and DOMAIN pre-release review as separate gates.

## 7. Follow-Up

Send this report and the Loop2L question pack to AQL/QA for read-only review.

Next engineering loops should choose from FACT Batch024 and DOMAIN pre-release findings, with priority on:

- divorce / custody / child route after spouse-status breakdown;
- 特定活動 designated-document work scope;
- 技能実習失踪後の保護 route;
- HSP point misbelief patterns;
- permanent resident re-entry permit selection.
