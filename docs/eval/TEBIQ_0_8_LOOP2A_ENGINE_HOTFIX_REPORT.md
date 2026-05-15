# TEBIQ 0.8 Loop2A Engine Hotfix Report

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: targeted engineering hotfix after Loop1 AQL review. This report records only deterministic route-gate / validator changes and local verification. It is not an AQL release approval and not a DOMAIN judgement.

## 1. Trigger

Loop1 AQL blocked 0.8 promotion because `TEBIQ-0.8-RUR-037` remained P0:

- The answer correctly discussed J-Find -> HSP / 技人国 route options.
- But it then offered `J-Find` + `資格外活動許可` as a fallback bridge to start employment while the proper employment-status path was unresolved.
- AQL classified this as too close to a dangerous workaround.

Adjacent issues:

- `RUR-035`: HSP1 institution-change answer mentioned `就労資格証明書` as an alternate confirmation path.
- `RUR-087`: `国税の納税証明書その3` was described as `所得金額用`, which is misleading.

## 2. Changes

### Route Gates

Updated `lib/consultation/route-gates.ts`.

Added:

- `jfind-employment-transition-no-shikakugai-bridge`
- `pending-status-change-current-activity-only`

This gate matches J-Find / 特定活動 + HSP / 技人国 / employment-transition questions and injects the boundary:

- First confirm the target employment status route.
- Do not present `資格外活動許可` as a bridge for formal/substantive employment start.
- If discussing current J-Find activity scope, require checking the 指定書 / permission scope and professional or immigration-window confirmation.

Also tightened:

- `national-tax-certificate-sono3-route`: explicitly says `国税その3` is not income-amount proof.
- `hsp1-institution-change-permission-first`: explicitly says `就労資格証明書` is not a substitute route for HSP1 institution-change permission.

`pending-status-change-current-activity-only` is backed by FACT Batch 003 card `guardrail-shikakugai-during-status-change-pending`. It is a negative guardrail only: filing/receipt of a change application does not expand the permitted activity scope before permission. It must still allow safe answers that say the user may continue activities already permitted under the current/previous status.

### Answer Validator

Updated `lib/consultation/guardrail-validator.ts`.

Added findings:

- `answer-jfind-shikakugai-employment-bridge` — P0, terminal-blocking.
- `answer-pending-change-expands-work-permission` — P0, terminal-blocking.
- `answer-hsp1-certificate-as-alternate-route` — P1, terminal-blocking.
- `answer-sono3-income-proof-label` — P2, non-terminal copy/fact defect.

The HSP1 certificate alternate-route P1 is intentionally terminal-blocking because AQL marked it release-blocking in a critical route family.

### Tests

Updated:

- `lib/consultation/route-gates.test.ts`
- `lib/consultation/guardrail-validator.test.ts`

New coverage:

- `RUR-037`-style J-Find -> HSP / 技人国 route questions trigger the new route gate.
- J-Find full-time/employment-start bridge questions trigger the new route gate.
- Short follow-up inputs inherit the root route family for J-Find employment-transition and pending status-change cases.
- Validator catches `資格外活動` as employment-start bridge.
- Validator catches the same bridge pattern in short follow-up context.
- Validator does not flag explicit warnings against that bridge.
- Validator does not over-block a safe pending-change answer that preserves current/previous permitted activity.
- Validator catches HSP1 `就労資格証明書` alternate-route language.
- Terminal selector blocks the HSP1 alternate-route finding.
- Validator catches `国税その3` described as income-amount proof.

## 3. Verification

Commands run:

```text
npx tsx --test lib/consultation/route-gates.test.ts
npx tsx --test lib/consultation/guardrail-validator.test.ts
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
npx tsx -e "<private Loop1 AQL package replay through new validator>"
```

Results:

- route-gates focused tests: passed as part of `npm test`.
- guardrail-validator focused tests: passed as part of `npm test`.
- `npm test`: passed, 60/60.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- P0 cycle scripts: passed.

Private replay against the old Loop1 AQL package, without printing answer text:

| Case | New route gates | New findings |
|---|---|---|
| `TEBIQ-0.8-RUR-037` | `jfind-employment-transition-no-shikakugai-bridge` | `P0:answer-jfind-shikakugai-employment-bridge` |
| `TEBIQ-0.8-RUR-035` | `hsp1-institution-change-permission-first` | `P1:answer-hsp1-certificate-as-alternate-route` |
| `TEBIQ-0.8-RUR-087` | `national-tax-certificate-sono3-route` | `P2:answer-sono3-income-proof-label` |

Full 96-case private replay through the new validator, without printing answer text:

| Finding | Count | Cases |
|---|---:|---|
| `P0:answer-jfind-shikakugai-employment-bridge` | 2 | `RUR-036`, `RUR-037` |
| `P1:answer-hsp1-certificate-as-alternate-route` | 1 | `RUR-035` |
| `P1:answer-missing-label-暂缓事项` | 1 | `RUR-085` |
| `P1:answer-no-terminal-punctuation` | 4 | `RUR-019`, `RUR-023`, `RUR-029`, `RUR-054` |
| `P2:answer-no-terminal-punctuation` | 4 | `RUR-046`, `RUR-056`, `RUR-060`, `RUR-065` |
| `P2:answer-sono3-income-proof-label` | 1 | `RUR-087` |

False-positive check:

- `RUR-006` says the user can continue the original 技人国 IT activity during pending HSP change within the previous-status/special-period boundary. The pending-change validator was tightened so this safe "continue current activity" answer is not flagged.
- `RUR-037` no longer triggers the HSP1 institution-change route gate after tightening that gate's matcher. The case remains covered by the J-Find employment-transition gate, which is the actual Loop1 P0 family.

## 4. Current Status

Loop2A closes the deterministic engineering gap for the known Loop1 P0 pattern, but it does not certify 0.8.

Still required before any promotion:

- Provider-backed targeted rerun for `RUR-036`, `RUR-037`, `RUR-024`, HSP1 cases, `RUR-041`, truncation/fixed-label canaries, and `RUR-087`.
- AQL review of the rerun outputs.
- DOMAIN review for J-Find / HSP / 技人国 transition route map and HSP1 institution-change route wording.
- Production admin fail-closed smoke after deployment.

## 5. Next Work Order

Recommended Loop2B:

1. Add a targeted rerun fixture set from AQL's required rerun list.
2. If provider key is available, run only the targeted family first, not the full 96.
3. Export private AQL package for Loop2B.
4. Ask AQL to judge whether `RUR-037` P0 is cleared and whether new route-gate wording made answers too rigid or still usable.
