# TEBIQ 0.8.5 RC60 Provider-Backed Run Results — 2026-05-16

**Status:** raw results / pre-AQL review
**Owner:** Codex Production Lead (autonomous run)
**Pack:** `docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json` (60 questions, 5 buckets)
**Engine:** `answer-core-v1.1-llm` (deepseek-v4-pro via DeepSeek API)

## 1. Run conditions

| Run | When | FACT_LAYER_ENABLED | EVAL_LAB_ENABLED | Output |
|---|---|---|---|---|
| First | 2026-05-16 21:57–22:13 JST | (not set, defaults false) | 1 | `docs/eval/TEBIQ_0_8_5_RC60_RUN_SUMMARY.json` |
| Fact-layer | 2026-05-16 22:20+ JST | true | 1 | `docs/eval/TEBIQ_0_8_5_RC60_RUN_SUMMARY_FACT.json` |

Both runs against local dev server, `/api/internal/eval-lab/tebiq-answer`
endpoint, concurrency 3, all 60 RC60 questions. Pre-existing 0.8 production
SHA `6676652` plus the in-flight branch `codex/post-release-convergence`
changes (matcher / route-gates / validators).

## 2. First-pass headline (FACT_LAYER off)

```
total:                 60
ok (HTTP+completed):   60
fallback:               0  (zero fall-backs to safe baseline; real LLM output)
with_route_gates:      53
with_facts:             0  (fact layer was disabled — expected)
route_gate_misses:      0  (gap-analysis fixes from earlier commit worked)
validator_findings:     6  (see §3)
```

All 60 answers used the canonical labels `先看这里 / 当前判断 / 建议动作 /
暂缓事项`. Average latency ~25–30s per answer.

## 3. Validator findings — all spot-checked, all false positives

The 6 findings:

| starter_tag | finding id | severity | true positive? |
|---|---|---|---|
| B05 result-postcard-permission | answer-postcard-or-exam-complete-equals-permission | P1 | **false positive** — answer says "暂时不要把'收到通知'等同于'可以通过'" |
| B08 pension-exemption-misread | answer-social-insurance-pension-irrelevant | P1 | **false positive** — answer says exemption ≠ unpaid AND PR scrutiny relevant |
| B09 dependent-work-28h | answer-dependent-can-work-without-permit | P1 | **false positive** — answer says "家族滞在本身不允许直接打工，即使每周不超过28小时，也需要先取得資格外活動許可" |
| F01 late-tax-followup | answer-late-payment-remediation-erases-history | P1 | **false positive** — answer says "补缴不能抹去当初延迟缴纳的记录" |
| F08 family-work-vacation-followup | answer-dependent-can-work-without-permit | P1 | **false positive** — answer says no long-vacation special rule for family stay |
| M04 family-stay-sponsor-docs | answer-renewal-change-guaranteed-by-docs | P1 | **false positive** — answer says "即使准备齐了材料，最终许可仍取决于综合审查" |

Root cause (engineering): `validateAnswer()` in
`lib/consultation/guardrail-validator.ts:611` uses `firstMatchWithContext`
to locate the `answerBad` pattern, then tests `safeEvidence` only against
that match's context window — **not** the full answer. When safe evidence
appears earlier or later than the match's narrow context, the validator
fires even though the answer is plainly safe.

For B09 and F08 we confirmed both `answerBad` and `safeEvidence` regexes
match the answer text overall, but the validator still fires. For B05, the
answer pattern "明信片...如果是審査結果...建议直接去窗口" trips the bad
regex because "通知 + 通过" co-occur in negation context that the bad regex
does not understand.

**Action items (Program 5 — Eval Lab quality flywheel, validator
tightening):**

1. Widen `firstMatchWithContext` context window (or test `safeEvidence`
   against the full answer, not just match context).
2. Add negation-aware suppression to high-traffic answerBad regexes
   (e.g. "不要把通知等同于许可" should suppress the bad pattern).
3. Re-run validator over the 6 known cases; expect 0 findings after fix.

No runtime answer change needed — the answers themselves are safe.

## 4. Headline interpretation

If the 6 are confirmed false positives by independent AQL, the first-pass
verdict against the AQL review protocol is:

- P0 = 0
- P1 unresolved = 0 (all 6 attributed to validator/engineering)
- negative-control overmatch creating unsafe instructions = 0
- 60/60 generation completed

That would be **green internal pass** per
`docs/eval/TEBIQ_0_8_5_RC60_AQL_REVIEW_PROTOCOL.json` `green_internal_pass`
criteria, with one engineering follow-up (validator tighten).

**This is NOT a release sign-off.** Independent AQL window must score
each of the 60 answers against the rubric; DOMAIN window must sign off
on the high-risk samples; FACT-layer run (in progress) must show
positive fact-card injection rates.

## 5. Fact-layer second pass (in progress)

A second pass with `FACT_LAYER_ENABLED=true` is running to exercise the
fact-card injection path. Results will be appended to this doc and to
`docs/eval/TEBIQ_0_8_5_RC60_RUN_SUMMARY_FACT.json`.

Expected differences:

- some answers carry `fact_card_ids` from the runtime fact-layer matcher;
- answer wording on certain topics tightens (e.g. 経管 2025 reform, 高度人才,
  税/年金) when relevant cards inject;
- validator finding count may change (positive or negative — fact
  injection can shift wording into or out of the trigger patterns).

## 6. Reproduction commands

```bash
# RC60 with fact layer
ADMIN_KEY=local-admin-test \
  DATABASE_URL='<set from .env.local>' \
  BASE=http://127.0.0.1:3000 \
  CONCURRENCY=3 \
  OUT=docs/eval/TEBIQ_0_8_5_RC60_RUN_SUMMARY_FACT.json \
  node scripts/eval/run-rc60-direct.mjs

# AQL handoff bundle (private, full answer text)
DATABASE_URL='<set from .env.local>' \
  PREFIX=0.8.5-rc60- \
  OUT=/tmp/tebiq-rc60-aql.json \
  npx tsx scripts/eval/export-rc-aql-direct.ts

# Static pre-flight (no DB, no provider)
npm run eval:pack:readiness -- \
  --input=docs/eval/TEBIQ_0_8_5_RC60_EVAL_PACK.json
```

## 7. Open questions for next session

1. Independent AQL run on the 60 answers (text in `/tmp/tebiq-rc60-aql.json`).
2. DOMAIN sign-off on the 14 high-risk DW01–DW12 samples specifically.
3. Validator false-positive tightening (Program 5; not blocking RC ship
   if AQL confirms answers are safe).
4. Re-run on production env once `FACT_LAYER_ENABLED` flag is verified
   for production (currently unknown).
