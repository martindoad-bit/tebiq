# Product UI v1 Report

## Baseline

- Branch: `codex/product-ui-v1`
- Base: `origin/main`
- Base commit: `999bfcdf273d195c23790dac418a507df52ce00c`
- Date: `2026-04-30`

## Goal

Move the entry experience from "tool page" toward "product page":

- Make TEBIQ recognizable with logo image + wordmark.
- Explain the product in the first screen.
- Make the question intake feel like the primary product action, not a collection form.
- Keep the photo entry visible with a camera icon.
- Make answer pages read as next-step instructions, not data fields.

## Modified Scope

| Page / area | Change | Logic impact |
| --- | --- | --- |
| `/` | Added logo image + wordmark to the first screen, added product positioning copy, and kept quick tools below the question intake. | UI only |
| `/` question intake | Reworked the intake into a situation-first panel with identity chips and six popular situations. | API payload unchanged |
| `/` quick tools | Kept the camera / checklist / reminder icons visible and direct. | UI only |
| `/answer/[id]` | Reordered first screen to status, title, user question, one-sentence conclusion, today's first steps, boundary note. | UI rendering only |
| `/answer/[id]` | Removed answer-level and review-status display from the user-facing page. | UI rendering only |
| `/answer/[id]` | Replaced field-like sections with action-card labels: `去哪办理`, `需要准备什么`, `期限和时机`, `不处理可能怎样`, `需要专家确认的情况`, `给客户看的简短说明`. | UI rendering only |
| `/answer/[id]` feedback | Changed the feedback section to `这个整理有帮助吗？` with low-noise buttons. | UI only |
| `/admin/review-lite` | Reduced English/admin noise and made question, answer summary, status, scoring, and review actions easier to scan. | UI only |

## Key Improvements

1. Homepage now says what TEBIQ does before exposing tools: "在日本遇到手续问题，TEBIQ 帮你整理下一步。"
2. The question box now has product semantics: identity chips, popular real questions, and the primary action `整理这个问题`.
3. The answer page now starts with the answer itself: question, conclusion, and today's action, instead of metadata.
4. The answer detail section is structured as a practical action card, matching the user need: what to do, where to go, what to prepare, timing, consequences, and expert-confirmation boundary.
5. Admin review-lite remains simple, but the scan path is clearer for 30-second review.

## Screenshots

Directory:

`docs/visual-report/screenshots/product-ui-v1/`

Captured widths:

- `320`
- `375`
- `393`
- `430`
- `768`

Captured pages:

- `/`
- `/answer/demo-matched`
- `/answer/demo-draft`
- `/answer/demo-cannot-determine`
- `/admin/review-lite`
- `/photo/sample-result`
- `/check`

Total screenshots: `35`.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- `npx tsc --noEmit`: passed

## Not Touched

- `app/api/**`
- `lib/db/**`
- authentication logic
- database schema / migrations
- Stripe / Resend / Bedrock
- core answer engine logic

## Review Notes

1. The homepage still keeps TEBIQ's restrained product voice; it is not a marketing landing page.
2. The answer page depends on the existing `actionAnswer` shape. If CCA later enriches the answer engine with more precise destination/material/timing fields, this UI will display those fields without another layout change.
3. Admin review-lite now has clearer UI labels, but still intentionally exposes backend enum values where they are operational review actions.
