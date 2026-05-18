# Knowledge Runtime Expansion — Loop 11 Production Verification

Date: 2026-05-18  
Production SHA: `123ad994ac64b39c871b2303be78a80f2dd1a8ce`  
PR: #174

## Deployment

- `https://tebiq.jp/api/build-info` returned production SHA `123ad994ac64b39c871b2303be78a80f2dd1a8ce`.
- Vercel deployment was live before final production route checks.

## Fact DB Sync

The normal `npm run fact-layer:sync` command hung once because an interrupted sync left a half-open client/backend. I did not treat that as success.

Final state was verified by direct DB hash comparison for all 18 changed fact cards:

- 18/18 changed fact cards matched local `content_hash`.
- `zairyu-card-loss-overseas` required a targeted single-card upsert after the first interrupted sync.
- Final verified promoted cards in DB:
  - `eijuu-shinsei-shorui` → `ai_verified`
  - `eijuu-zeikin-payment` → `ai_verified`
  - `zairyu-card-loss-overseas` → `ai_verified`

## Production Route Smoke

`npm run qa:production-smoke` after deployment:

- Checked routes: 70
- Passed: 70
- Unexpected 404: 0
- Hard fail: 0

Focused material/quick-reference paths:

| Path | HTTP |
|---|---:|
| `/materials` | 200 |
| `/materials/juminzei-kazei-shomei` | 200 |
| `/materials/kokuzei-nouzei-sono3` | 200 |
| `/materials/kenpo-shikaku-kakunin` | 200 |
| `/quick-reference/permanent-residence-application-materials` | 200 |
| `/quick-reference/keiei-kanri-renewal-materials` | 200 |
| `/quick-reference/student-renewal-materials` | 200 |
| `/quick-reference/national-tax-certificate-sono3-materials` | 200 |
| `/quick-reference/pension-social-insurance-proof-materials` | 200 |

## Production Answer Smoke

`PRODUCTION_URL=https://tebiq.jp npm run smoke:production-answer`:

- Initial run: 19/20 passed.
- The only failed item was `R1-management-to-humanities`, with `missing:(经营管理|经营・管理|経営管理|経営・管理|经管)`.
- I reran `R1-management-to-humanities` directly and the answer was substantively safe:
  - it mentioned `経営管理`
  - it mentioned `技人国`
  - it did not reverse the conversion direction
  - it warned not to close the company before applying for status change

Interpretation: no P0 was found. The initial R1 failure is a generation/regex variability item, not a confirmed product-danger failure.

## Final Loop 11 Status

Loop 11 is complete as a safety/rewrite loop:

- P0: 0
- Production route smoke: PASS
- Material path smoke: PASS
- Answer smoke: 19/20 automated + targeted R1 substantive PASS
- DB sync: verified by hash, 18/18 changed cards match production DB

Next loop should resume 30-50 card expansion, but should avoid forcing high-risk cards into runtime just to hit quantity.
