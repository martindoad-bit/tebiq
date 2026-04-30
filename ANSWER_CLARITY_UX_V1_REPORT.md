# Answer Clarity UX v1 Report

## Baseline

- Branch: `codex/answer-clarity-ux-v1`
- Base: `origin/codex/answer-timeline-ux-fix-v1`
- Date: `2026-04-30`
- Scope: user-facing answer clarity, question intake copy, timeline user labels, review-lite answer draft wording.

## Goals

- Make answer pages read like next-step instructions, not schema output.
- Remove the optional email field from the homepage question intake.
- Keep the homepage action model focused on "整理这个问题" and "查看整理结果".
- Keep timeline/detail pages free of developer-facing fields such as raw JSON, `policy_match`, and `document`.
- Preserve product voice: precise, calm, low-noise.

## Changes

| Area | Change | Logic impact |
| --- | --- | --- |
| `/` | Removed the optional email input from the question box. Kept the submit state as `正在整理...` and success link as `查看整理结果`. | No API logic change. `contact_email` is sent as `null`. |
| `/answer/[id]` | Reordered first screen to show status, title, user question, conclusion, next step, and boundary note before details. | Demo data shape extended with optional clarity copy. |
| `/answer/[id]` | Replaced schema-like labels with user-facing sections: `现在要做什么`, `去哪办理`, `需要准备什么`, `期限和时机`, `不处理会怎样`, `需要专家确认的情况`. | UI-only rendering change. |
| `/answer/demo-matched` | Added concrete next-step clarity content for moving-office procedures. | Demo content only. |
| `/answer/demo-draft` | Added draft-state clarity content and kept the review caveat visible. | Demo content only. |
| `/answer/demo-cannot-determine` | Changed status wording to `需要进一步确认` and added first-confirmation guidance. | Demo content only. |
| `/admin/review-lite` | Changed the answer draft preview label from field-like `summary` to `整理摘要`. | UI text only. |
| `/timeline` and `/timeline/demo` | Rechecked user-side wording so raw payloads and developer labels are not exposed. | No timeline data logic change. |

## Answer Page Structure

The answer page now puts practical information first:

1. Status badge
2. Title
3. User question
4. Conclusion
5. Next step
6. Boundary note
7. Detailed next-step sections
8. Sources and feedback

Empty or unavailable detail sections show:

`这部分需要进一步确认。`

## Status Wording

| State | User-facing label |
| --- | --- |
| `matched` | 已整理 |
| `draft` | 初步整理，尚未人工复核 |
| `cannot_determine` | 需要进一步确认 |

The warning state uses a restrained low-noise treatment and does not use red or alarm language.

## Timeline Cleanup Check

Grep check was run for the user-side banned labels:

- `邮箱（可选）`
- `提交问题`
- `已收到`
- `原始结果`
- `raw JSON`
- `JSON.stringify(event.eventPayload`

No matches remain in the checked user-facing answer, intake, timeline, photo sample, or review-lite paths.

## Screenshots

Directory:

`docs/visual-report/screenshots/answer-clarity-ux-v1/`

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
- `/timeline`
- `/timeline/demo`
- `/photo/sample-result`
- `/admin/review-lite`

Total screenshots: `40`.

## Validation

- `npm run lint`: passed
- `npm run build`: passed
- `npx tsc --noEmit`: passed

## Not Touched

- `app/api/**`
- `lib/db/**`
- authentication logic
- database schema or migrations
- Stripe / Resend / Bedrock
- production answer engine logic

## Notes For Review

1. `/answer/demo-*` now demonstrates the intended answer clarity model; real answer output should map into the same human sections when CCA wires production data.
2. `/timeline/demo` remains a user-safe fixture/detail route from the previous branch and does not expose raw JSON.
3. The homepage intake is now answer-oriented, but still intentionally not ChatGPT-like: no "问 AI", no thinking animation, no assistant persona.
