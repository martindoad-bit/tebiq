# TEBIQ 0.8 Loop2K AQL / QA Review

Generated: 2026-05-15

Reviewer: AQL / QA sub-agent

Scope: read-only review of Loop2K work / denial guardrail integration.

## Conclusion

Loop2K deterministic protection is ready for provider smoke.

It is not release-ready. Current evidence is local deterministic tests, real-user route-gate coverage, and dry-run sidecar only. Provider-backed answers and AQL close-read are still required.

## Findings

### P0

No new deterministic blocker found.

`short-stay-no-work-no-shikakugai` is correctly treated as P0 protection because short-stay trial work, paid project work, direct employment, and 資格外活動 workarounds can lead directly to unlawful employment risk.

### P1

One over-trigger risk was found:

- `short-stay-no-work-no-shikakugai` used `客户 / クライアント` as a trigger term, which could inject P0 guardrail context into ordinary business meetings or client visits. The prompt wording already distinguished meetings / liaison from paid service delivery, so this was smoke-acceptable, but narrower matching was recommended.

No other P1 implementation issue was found:

- `work-status-side-job-scope-boundary` separates work-status visas from status-based unrestricted categories such as 永住者 / 定住者 / spouse statuses.
- `ssw-job-change-not-free` preserves the possibility of same-business-category transfer while blocking free-transfer and notification-only myths.
- `nonpermission-no-ordinary-appeal-no-grace` blocks ordinary administrative appeal / grace-period myths without declaring reapplication or litigation impossible in every scenario.

### P2

Suggested future edge tests:

- ordinary short-stay business meeting / client visit should not be treated as prohibited work;
- 永住者 side-job questions should not trigger work-status side-job restriction;
- same-business-category 特定技能 transfer should not be framed as impossible;
- post-nonpermission reapplication with denial-reason confirmation should not be mistaken for an appeal/grace-period myth.

## Engineering Response

Applied after AQL review:

- removed `客户 / クライアント` as a standalone short-stay work trigger;
- added narrower short-stay trigger terms for actual work-risk language: `有偿 / 有償 / 项目 / 案件 / プロジェクト`;
- added a regression test that an ordinary short-stay business meeting / client visit does not trigger the P0 short-stay work guardrail.

Verification after patch:

- `npm test`: passed, 145/145.
- Loop2K real-user coverage remains 8/8.

## Provider Smoke

Loop2K can enter provider smoke. Highest-priority close-read cases:

- `TEBIQ-0.8-GR7-RUS-001/002`: short-stay trial work, transportation-only pay, paid project for Japanese client, overseas-account payment;
- `TEBIQ-0.8-GR7-RUS-003/004`: 技人国 / HSP side jobs, freelance, small income, YouTube / online consulting;
- `TEBIQ-0.8-GR7-RUS-005/006`: same-field SSW employer change and cross-sector SSW transfer;
- `TEBIQ-0.8-GR7-RUS-007/008`: nonpermission appeal, post-denial stay, grace-period, reapplication, and special-period myths.

## Release

Do not release based on Loop2K alone. Provider-backed answer evidence and AQL close-read remain required.
