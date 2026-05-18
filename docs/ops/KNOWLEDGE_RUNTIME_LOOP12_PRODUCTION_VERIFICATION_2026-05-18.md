# Knowledge Runtime Expansion — Loop12 Production Verification

Date: 2026-05-18
Production SHA: `cb56bba7513a3613bcc2fa1e20f16d9ffff500d4`
Build API: `https://tebiq.jp/api/build-info`

## Deployment

PR #176 (`Knowledge Runtime Loop 12: safe promotes and materials entities`) was merged to `main`.

Production build-info after deploy:

```json
{
  "gitSha": "cb56bba7513a3613bcc2fa1e20f16d9ffff500d4",
  "branch": "main",
  "version": "answer-core-v1.1-llm"
}
```

## DB Sync

`npm run fact-layer:sync` completed after deploy:

```text
fact-layer-sync: scanned=269 upserted=269 errors=0
```

Targeted DB verification confirmed the 10 changed cards matched local state and content hash:

| fact_id | DB state |
|---|---|
| `chintai-hoshou-gaikokujin` | `ai_verified` |
| `ginko-account-gaijin-6months` | `ai_verified` |
| `jutaku-shikikin-rekkin-shuukan` | `ai_verified` |
| `kakkoukin-mortgage-foreigner` | `disabled` |
| `kika-documents-list` | `ai_verified` |
| `kobun-jutaku-jutsu-kushu` | `ai_verified` |
| `nenkin-tsuinou-10years` | `ai_verified` |
| `yobi-yose-shinseki-houmon` | `ai_verified` |
| `zairyu-kikan-5years-default` | `ai_verified` |
| `zairyu-shitsugyo-hosho-pension` | `ai_verified` |

## Production Path Smoke

`npm run qa:production-smoke`:

```text
checked: 70
passed: 70
unexpected_404: 0
hard_fail: 0
```

Targeted new/changed material paths:

| Path | Result |
|---|---|
| `/materials` | 200 |
| `/materials/shikakugai-katsudo-permit` | 200 |
| `/materials/rishokuhyo-koyo-hoken-docs` | 200 |
| `/materials/mynumber-card` | 200 |
| `/materials/bank-account-opening-docs` | 200 |
| `/materials/rental-application-docs` | 200 |
| `/materials/return-home-checkout-docs` | 200 |
| `/quick-reference/part-time-permission` | 200 |
| `/quick-reference/unemployment-benefit-materials` | 200 |
| `/quick-reference/national-pension-after-leaving-materials` | 200 |
| `/quick-reference/bank-account-opening-materials` | 200 |
| `/quick-reference/rental-housing-foreigner-materials` | 200 |
| `/quick-reference/return-home-procedures-materials` | 200 |

## Production Answer Smoke

`PRODUCTION_URL=https://tebiq.jp npm run smoke:production-answer`:

```text
20/20 passed
```

Notable coverage:

- `R6-eijuu-nenkin-history`: still blocks "補缴 erases risk" style answers.
- `R11-hsp1-institution-change`: still blocks "14-day notification lets you start work" answers.
- `R13-spouse-divorce-remarriage`: still treats divorce/remarriage as deep-water rather than simple update advice.
- `N17-business-manager-logo`: still avoids injecting business-manager reform facts into a simple logo/branding change.
- `N18-resident-tax-installment`: still distinguishes installment payment from unpaid tax.

## §5.3 Pre-Report Self-Audit

`npm run qa:pre-report-audit`:

```text
git_status_clean          PASS
npm_lint                  PASS
tsc_noemit                PASS
npm_test                  PASS
production_url_smoke      PASS
OVERALL: PASS (5/5 checks)
```

## Result

Loop12 is fully deployed and verified:

- 9 cards promoted to narrow runtime.
- 1 mortgage card disabled.
- 6 material entities added and reachable in production.
- DB sync completed.
- Production routes passed.
- Production answer smoke passed 20/20.
- §5.3 audit passed 5/5.

Next loop should not continue ordinary promotion blindly. Recommended next work:

1. Loop13: L5-only binding for spouse divorce, overstay, non-permission,経営管理,上陸拒否,定住告示/告示外, and status-cancellation cards.
2. Loop14: rewrite high-value `NEEDS_REWRITE` cards:経営管理 2025,留学出席率,租税条約, startup →経営管理 transition.
