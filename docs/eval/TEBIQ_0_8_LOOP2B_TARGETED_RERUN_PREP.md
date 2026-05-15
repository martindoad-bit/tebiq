# TEBIQ 0.8 Loop2B Targeted Rerun Prep

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: prepare the provider-backed targeted rerun required after Loop2A hotfix. This document does not contain API keys and does not include full answer text.

## 1. Purpose

Loop2A patched deterministic route gates and validators for the Loop1 AQL blockers.

Loop2B should verify behavior with real generation, but only on the affected families first. Do not spend a full 96-question run until the release-blocking families are clean.

## 2. Targeted Case Set

Command-ready case list:

```text
RUR-006,RUR-024,RUR-036,RUR-037,RUR-035,RUR-039,RUR-090,RUR-041,RUR-019,RUR-023,RUR-029,RUR-054,RUR-065,RUR-085,RUR-018,RUR-031,RUR-087
```

Coverage:

- Pending change / previous-status activity canary: `RUR-006`
- J-Find / employment start / `資格外活動` bridge: `RUR-024`, `RUR-036`, `RUR-037`
- HSP1 institution change: `RUR-035`, `RUR-039`, `RUR-090`
- `就労資格証明書`: `RUR-041`
- High-risk truncation / fixed-label canaries: `RUR-019`, `RUR-023`, `RUR-029`, `RUR-054`, `RUR-065`, `RUR-085`
- 国税その3: `RUR-018`, `RUR-031`, `RUR-087`

## 3. Runner Support Added

Updated:

- `scripts/eval/run-real-user-regression.ts`
- `scripts/eval/summarize-real-user-regression-sidecar.ts`
- `scripts/eval/preflight-provider-env.ts`
- `scripts/eval/run-loop2b-targeted.sh`
- `package.json`

New option:

```text
--ids=RUR-036,RUR-037
```

The option accepts short ids such as `RUR-037` and matches the full id `TEBIQ-0.8-RUR-037`.

Dry-run command executed:

```text
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --run-id=tebiq-0.8-rur-loop2b-targeted --ids=RUR-006,RUR-024,RUR-036,RUR-037,RUR-035,RUR-039,RUR-090,RUR-041,RUR-019,RUR-023,RUR-029,RUR-054,RUR-065,RUR-085,RUR-018,RUR-031,RUR-087
```

Dry-run result:

- items: 17
- sidecar: `docs/eval/tebiq-0.8-rur-loop2b-targeted-production-answer-results.json`

Scenario counts:

| Scenario | Count |
|---|---:|
| 特例期间 | 1 |
| 补件 | 4 |
| J-Skip/HSP/J-Find | 5 |
| 换工作 | 1 |
| 税/年金/健保 | 2 |
| 日配/永配离婚再婚死别 | 1 |
| 经管转技人国/HSP | 1 |
| 材料清单使用 | 2 |

Sidecar summary command:

```text
npx tsx scripts/eval/summarize-real-user-regression-sidecar.ts --input=docs/eval/tebiq-0.8-rur-loop2b-targeted-production-answer-results.json
```

Current dry-run summary:

```text
total=17 completed=0 partial_or_failed=17
```

This is expected before provider-backed execution.

## 4. Provider Environment

Checked without printing secrets:

```text
DEEPSEEK_API_KEY=missing
EVAL_LAB_ENABLED=missing
EVAL_LAB_IMPORT_KEY=missing
DATABASE_URL=present
ADMIN_KEY=missing
```

Because provider/eval env is not present in the local shell or `.env.local`, no real generation rerun was executed in this step.

2026-05-15 follow-up attempt:

- A temporary provider key was supplied out-of-band and used only in the local command environment.
- The key was not written to any file and is not recorded in this report.
- The provider-backed rerun attempted all 17 targeted cases.
- Result: `0/17 completed`.
- Failure shape: `16` cases returned `production_stream_failed: deepseek_http_401`; `1` case returned `production_stream_failed: fetch failed`.

Interpretation:

- This is not answer-quality evidence.
- It only proves the local provider credential/environment was not accepted by the current DeepSeek endpoint.
- Loop2B remains blocked until a valid provider environment is available.

Runner hardening added after this failed attempt:

- `scripts/eval/run-real-user-regression.ts` now aborts remaining cases by default when a provider-auth failure is detected, so future bad-key runs do not spend the whole case set on known infrastructure failure.
- Pass `--no-abort-on-provider-auth-error` only when intentionally collecting full failure telemetry.
- `scripts/eval/summarize-real-user-regression-sidecar.ts` now prints failure/skipped counts, HTTP status counts, and normalized error counts without answer text.
- `scripts/eval/preflight-provider-env.ts` now checks required env and can make a tiny live DeepSeek probe before Loop2B starts.
- `scripts/eval/run-loop2b-targeted.sh` now wraps preflight, targeted execution, sidecar summary, and private AQL export.
- `npm run eval:provider-preflight` and `npm run eval:loop2b-targeted` are available as stable operator commands.

## 5. Command To Run When Env Is Available

Start dev server with safe local env:

```text
DEEPSEEK_API_KEY=<secret> EVAL_LAB_ENABLED=1 ADMIN_KEY=local-admin-test npm run dev -- --hostname 127.0.0.1 --port 3000
```

Then run:

```text
npm run eval:provider-preflight -- --live --base-url=http://127.0.0.1:3000
npm run eval:loop2b-targeted
```

The wrapper exports the private AQL packet to `/tmp/tebiq-0.8-rur-loop2b-targeted-aql.json` by default. To override:

```text
PRIVATE_AQL_OUTPUT=/private/path/tebiq-0.8-rur-loop2b-targeted-aql.json npm run eval:loop2b-targeted
```

## 6. Acceptance For Loop2B

Minimum expected before full 96 rerun:

- `RUR-006`: may continue previous-status/current permitted activity within correct special-period/current-status limits; no false P0 from pending-change gate.
- `RUR-037`: no `資格外活動` employment bridge, no workaround language.
- `RUR-035`: no `就労資格証明書` as an alternate route to HSP1 institution-change permission.
- `RUR-087`: no `国税その3（所得金額用）` label.
- Truncation/fixed-label canaries: no terminal guardrail findings on high-risk cases.
- AQL: 0 P0 and no release-blocking P1 in the targeted set.
