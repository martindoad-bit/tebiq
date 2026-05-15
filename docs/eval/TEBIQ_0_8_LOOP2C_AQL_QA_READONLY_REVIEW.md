# TEBIQ 0.8 Loop2C AQL/QA Read-Only Review

Generated: 2026-05-15

Owner: AQL/QA subagent, recorded by Codex Production Lead

Scope: read-only review of Loop1/Loop2 documents and deterministic guardrail implementation. This is not DOMAIN legal approval and not release approval.

## 1. Bottom Line

0.8 can currently claim:

- Loop1 P0/P1 families have been converted into deterministic route gates and answer validators.
- Old Loop1 bad answers are now caught by the new validator.
- Admin fail-closed production hotfix has shipped.

0.8 cannot claim:

- release-ready;
- real-generation P0/P1 cleared;
- DOMAIN route maps complete.

The missing proof is provider-backed Loop2B targeted rerun plus AQL close-read.

## 2. Closed Or Engineering-Captured

P0 captured:

- `RUR-037` / J-Find + `資格外活動` employment-start bridge.
- Engineering coverage:
  - `jfind-employment-transition-no-shikakugai-bridge`
  - `answer-jfind-shikakugai-employment-bridge`
- Old 96-case private replay catches `RUR-036` and `RUR-037`.

P1 captured:

- `RUR-035` / HSP1 institution-change answer treating `就労資格証明書` as an alternate route.
- Engineering coverage:
  - `hsp1-institution-change-permission-first`
  - `answer-hsp1-certificate-as-alternate-route`
- The P1 validator is terminal-blocking because the family is release-critical.

Integrity captured:

- high-risk incomplete answer tail;
- missing fixed summary labels;
- DeepSeek `finish_reason=length`;
- follow-up route guardrails through root-context matcher input.

## 3. Remaining Release Blockers

P0:

- Provider-backed Loop2B targeted rerun has not produced usable answers.
- A temporary provider key produced `deepseek_http_401`, so the current rerun attempt is infrastructure failure, not quality evidence.
- Need rerun at least:
  - `RUR-024`, `RUR-036`, `RUR-037`
  - plus the HSP1 / certificate / truncation / `国税その3` canaries in the Loop2B set.

P1:

- AQL must close-read the new generated answers and confirm no release-blocking P1 remains.
- Follow-up generation still needs provider-backed regression; deterministic tests prove matcher inheritance, not model behavior.
- DOMAIN route maps remain incomplete for:
  - J-Find / 特定活動 to HSP / 技人国 transition;
  - HSP1 activity / institution-change boundary;
  - notice taxonomy;
  - 经管转雇佣;
  - spouse / DV cases;
  - materials-shortage before expiry.

## 4. Over-Blocking Risks

The conservative strategy is acceptable before 0.8, but AQL flagged these usability risks:

- HSP1: route gate may make onboarding/training/remote-login discussion too rigid until DOMAIN defines boundaries.
- Pending status change: safe current/previous permitted activity must remain allowed. Current tests cover this canary.
- J-Find: negative guardrail correctly blocks formal employment bridge, but answers must still explain how to check the 指定書 / current permitted activities.
- `就労資格証明書`: keep both affirmative bad fixture and negation-safe fixture so "not a substitute" warnings are not misread as violations.

## 5. Safe Work Without Provider Access

Engineering can still safely continue:

- improve sidecar summary / delta tooling;
- add bad-answer fixtures and false-positive tests;
- harden targeted rerun workflow and provider-auth early abort;
- add follow-up dry-run/import-only fixtures;
- record DOMAIN/FACT gaps as route-map questions rather than deterministic approval conclusions.

Do not use these offline improvements as a substitute for provider-backed Loop2B plus AQL review.
