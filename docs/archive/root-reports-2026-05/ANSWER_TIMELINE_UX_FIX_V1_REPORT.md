# Answer + Timeline UX Fix v1 Report

## Baseline
- Branch: `codex/answer-timeline-ux-fix-v1`
- Base: `origin/codex/answer-result-ui-v0`
- Started: `2026-04-30T10:13:26Z`

## Goal
- Make the question intake feel like it returns an answer, not like a collection form.
- Put answer conclusions, next steps, status, and boundary notes into the first screen.
- Remove user-visible developer fields from timeline and reminder detail views.
- Make the photo entry faster to understand by adding camera affordance and clearer copy.

## Changes
| Page | Fix | Logic touched |
|---|---|---|
| `/` | Added camera icon to the main photo CTA and the tool list. Reworded question intake to imply an answer result. | UI only |
| Question intake component | Button states now read `整理这个问题` / `正在整理...` / `查看整理结果`. Error copy no longer uses form-submission wording. | Existing `/api/questions` contract unchanged |
| `/answer/[id]` | Reordered first screen: status, title, conclusion, next steps, boundary note, original question. Removed English metadata labels from user-facing sections. | UI only |
| `/timeline` | Replaced raw `policy_match` fallback copy. Missing deadline now shows `暂未记录期限`. | UI only |
| `/timeline/[event_id]` | Removed raw JSON block and raw source record labels. Detail now shows title, status, source, deadline, amount, next steps, and record source. | UI only |
| `/timeline/demo` | Added a static脱敏 detail fixture through the existing dynamic route so UX screenshots can be verified without local DB data. | Demo UI path only |
| `/photo/sample-result` | Added camera icon and changed CTA to `拍一份文书试试`. Fixed fact rows on narrow mobile widths. | UI only |

## Developer Fields Removed From User-Side UI
- `policy_match` no longer appears in empty tracking copy.
- `document` is mapped to `文书识别`.
- `deadline: null` / `amount: null` are represented as `暂未记录期限` / `暂未记录金额`.
- Raw JSON is no longer rendered on reminder detail pages.

## Screenshots
Directory: `docs/visual-report/screenshots/answer-timeline-ux-fix-v1/`

Captured at `320 / 375 / 393 / 430 / 768` for:
- `/`
- `/answer/demo-matched`
- `/answer/demo-draft`
- `/answer/demo-cannot-determine`
- `/timeline`
- `/timeline/demo`
- `/photo/sample-result`
- `/admin/review-lite`

Total screenshots: 40.

## Validation
- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed

## Not Touched
- `app/api/**`
- `lib/db/**`
- `lib/photo/**`
- `lib/stripe/**`
- Authentication logic
- Database schema / migrations

## Notes For Review
- `/timeline/demo` is a static visual fixture for this branch. It does not alter real timeline event fetching or persistence.
- The answer page still uses the demo answer data from `codex/answer-result-ui-v0`; it is ready for CCA to replace with Answer Engine output.
