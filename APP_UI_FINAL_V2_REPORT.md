# App UI Final v2 Report

## Baseline

- Branch: `codex/app-ui-final-v2`
- Base: `origin/main`
- Base commit: `9f2d5a41d136711eefb711aa4c16a15177927b09`
- Date: `2026-04-30`

## Goal

Make the product feel like an app home, not a product explanation page:

- Short header with logo and utility icons.
- One direct product sentence.
- One primary input card.
- Four recent-question chips.
- Three common tool entries.
- Answer page as a practical action card.

## Changes

| Page / area | Change | Logic impact |
| --- | --- | --- |
| `/` | Removed long explanatory hero and replaced it with `材料有问题，问 TEBIQ`. | UI only |
| `/` header | Kept logo + wordmark, added reminder and account icons on the right. | UI only |
| `/` question card | Reduced intake to `你的问题`, a short textarea, `看下一步`, and 4 recent-question chips. | API payload still posts to `/api/questions`; `visa_type` is sent as `null`. |
| `/` quick tools | Rebuilt as 3 icon entries: `拍照`, `续签检查`, `提醒`; subtitles are short. | UI only |
| `/answer/[id]` | Reworked first screen into a task card: status, title, grey question, conclusion, `最紧的两件`. | UI rendering only |
| `/answer/[id]` | Replaced document-like blocks with short sections: `步骤`, `要带什么`, `期限`, `不做会怎样`, `要找专家的情况`. | UI rendering only |
| `/answer/[id]` | Moved source and boundary note to a low-noise bottom section. | UI rendering only |
| `/answer/[id]` | Made customer copy a low-priority collapsible area. | UI only |

## Removed / Avoided Copy

Checked app home and answer UI for the banned phrases:

- `情况入口`
- `TEBIQ 会把你的情况整理成`
- `写一句你的情况`
- `问 AI`
- `智能判断`
- `下一步怎么做`
- `你现在遇到什么情况`
- `情况整理`
- `下一步整理`

No matches remain in the modified UI files.

## Screenshots

Directory:

`docs/visual-report/screenshots/app-ui-final-v2/`

Widths:

- `320`
- `375`
- `393`
- `430`
- `768`

Pages:

- `/`
- `/answer/demo-matched`
- `/answer/demo-draft`
- `/answer/demo-cannot-determine`
- `/photo/sample-result`
- `/check`

Total screenshots: `30`.

## Validation

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed

## Not Touched

- `app/api/**`
- answer engine logic
- auth logic
- database schema / migrations
- Stripe / Resend / Bedrock

## Review Notes

1. The home page is now intentionally sparse. It should feel closer to a utility app launcher than a landing page.
2. The disabled home CTA is grey until the user types; this keeps the primary action visible without pretending a blank input can be submitted.
3. The answer page still depends on existing `actionAnswer` fields. The UI is ready for richer engine output without layout changes.
