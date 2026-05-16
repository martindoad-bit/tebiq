# Answer Result UI v0 Report

## Baseline
- Branch: `codex/answer-result-ui-v0`
- Base: `origin/codex/auth-intake-production`
- Note: `origin/codex/answer-engine-v0` was not available at branch creation time, so this pass implements static demo answer pages and UI integration points.
- Started: `2026-04-30T07:36:42Z`

## Scope
| Area | Change | Logic touched |
|---|---|---|
| `/answer/[id]` | Added answer result page with matched / draft / cannot_determine demo states. | No API or DB changes |
| Homepage question intake | Changed submit button to `查看整理结果`, submitting state to `正在整理...`, and added result link state after successful POST. | Existing `/api/questions` contract only consumed |
| `/admin/review-lite` | Reframed cards around question, answer draft, answer_type, answer_level, review_status, summary, sources, and quick review marking. | Existing review POST payload preserved |

## Answer Page Structure
- Title and original question are shown first.
- Answer status is explicit:
  - `已整理`
  - `初步整理，尚未人工复核`
  - `这个情况需要进一步确认`
- Answer level is shown as `L1 一般信息`, `L2 手续路径`, `L3 决策辅助`, `L4 个案判断`.
- Content blocks include summary, sections, next_steps, sources, boundary note, and feedback buttons.
- Feedback buttons show the required confirmation: `已记录。TEBIQ 会根据反馈继续修正内容。`

## Admin Review Lite
- The original question is visually primary when a `questionId` is present.
- Each answer draft card now exposes `answer_type`, `answer_level`, `review_status`, `summary`, and sources before the score form.
- Quick local marking supports `reviewed`, `needs_expert`, and `rejected`.
- The existing save flow is still available and posts to the existing endpoint.

## Screenshots
Directory: `docs/visual-report/screenshots/answer-result-ui-v0/`

- 320: `320-home.png`, `320-answer-demo-matched.png`, `320-answer-demo-draft.png`, `320-answer-demo-cannot-determine.png`, `320-admin-review-lite.png`
- 375: `375-home.png`, `375-answer-demo-matched.png`, `375-answer-demo-draft.png`, `375-answer-demo-cannot-determine.png`, `375-admin-review-lite.png`
- 393: `393-home.png`, `393-answer-demo-matched.png`, `393-answer-demo-draft.png`, `393-answer-demo-cannot-determine.png`, `393-admin-review-lite.png`
- 430: `430-home.png`, `430-answer-demo-matched.png`, `430-answer-demo-draft.png`, `430-answer-demo-cannot-determine.png`, `430-admin-review-lite.png`
- 768: `768-home.png`, `768-answer-demo-matched.png`, `768-answer-demo-draft.png`, `768-answer-demo-cannot-determine.png`, `768-admin-review-lite.png`

## Validation
- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed
- Local screenshot routes returned 200 for `/`, `/answer/demo-matched`, `/answer/demo-draft`, `/answer/demo-cannot-determine`, `/admin/review-lite`.

## Not Touched
- `app/api/**`
- `lib/db/**`
- `lib/photo/**`
- `lib/stripe/**`
- Authentication logic
- Database schema or migrations

## Review Notes
- Demo answer data should be replaced by Answer Engine v0 output when CCA's backend branch is available.
- Current homepage result routing maps existing question match statuses to demo answer pages so the UI can be reviewed without the final engine contract.
